import { generateEmbedding, generateAnswer } from './openai';
import { getSupabaseAdmin, SearchResult } from './supabase';

export interface SearchResponse {
  answer: string;
  sources: Array<{
    content: string;
    author: string;
    url: string;
    source: string;
  }>;
  bestExpert: {
    author: string;
    relevance: number;
    slackDmLink: string;
  };
}

export async function searchKnowledge(query: string, limit = 10): Promise<SearchResponse> {
  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);

    // Search for similar content using vector similarity
    const { data, error } = await getSupabaseAdmin().rpc('match_knowledge_items', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: limit,
    });

    if (error) {
      console.error('Error searching knowledge base:', error);
      throw new Error('Search failed');
    }

    const results = data as SearchResult[];

    if (results.length === 0) {
      return {
        answer: 'No relevant information found in the knowledge base.',
        sources: [],
        bestExpert: {
          author: 'No expert found',
          relevance: 0,
          slackDmLink: '',
        },
      };
    }

    // Prepare chunks for answer generation
    const relevantChunks = results.map(result => ({
      content: result.content,
      author: result.metadata.author,
      url: result.metadata.url,
      source: result.metadata.source,
    }));

    // Generate answer using OpenAI
    const answer = await generateAnswer(query, relevantChunks);

    return answer;
  } catch (error) {
    console.error('Error in searchKnowledge:', error);
    throw new Error('Search failed');
  }
}

export async function getKnowledgeStats(): Promise<{
  totalItems: number;
  slackItems: number;
  notionItems: number;
  lastUpdated: string;
}> {
  try {
    const { data: totalData, error: totalError } = await getSupabaseAdmin()
      .from('knowledge_items')
      .select('count', { count: 'exact' });

    const { data: slackData, error: slackError } = await getSupabaseAdmin()
      .from('knowledge_items')
      .select('count', { count: 'exact' })
      .eq('metadata->>source', 'slack');

    const { data: notionData, error: notionError } = await getSupabaseAdmin()
      .from('knowledge_items')
      .select('count', { count: 'exact' })
      .eq('metadata->>source', 'notion');

    const { data: lastUpdatedData, error: lastUpdatedError } = await getSupabaseAdmin()
      .from('knowledge_items')
      .select('updated_at')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (totalError || slackError || notionError || lastUpdatedError) {
      throw new Error('Failed to fetch stats');
    }

    return {
      totalItems: totalData?.[0]?.count || 0,
      slackItems: slackData?.[0]?.count || 0,
      notionItems: notionData?.[0]?.count || 0,
      lastUpdated: lastUpdatedData?.[0]?.updated_at || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching knowledge stats:', error);
    return {
      totalItems: 0,
      slackItems: 0,
      notionItems: 0,
      lastUpdated: new Date().toISOString(),
    };
  }
}

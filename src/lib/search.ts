import { generateEmbedding, generateAnswer } from './openai';
import { getSupabaseAdmin, SearchResult } from './supabase';

// Calculate cosine similarity between two vectors
function calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export interface SearchResponse {
  answer: string;
  sources: Array<{
    content: string;
    author: string;
    url: string;
    source: string;
  }>;
  totalCount: number;
  sourceCounts: {
    slack: number;
    notion: number;
  };
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
    let data, error;
    // Use simple text search for now (more reliable)
    const result = await getSupabaseAdmin()
      .from('knowledge_items')
      .select('*')
      .ilike('content', `%${query}%`)
      .limit(limit);
    
    data = result.data?.map(item => ({ ...item, similarity: 0.5 })) || [];
    error = result.error;

    if (error) {
      console.error('Error searching knowledge base:', error);
      // Return empty results instead of throwing error
      return {
        answer: 'Search temporarily unavailable. Please try again later.',
        sources: [],
        totalCount: 0,
        sourceCounts: { slack: 0, notion: 0 },
        bestExpert: {
          author: 'No expert found',
          relevance: 0,
          slackDmLink: '',
        },
      };
    }

    const results = (data || []) as SearchResult[];

    if (results.length === 0) {
      return {
        answer: 'No relevant information found in the knowledge base. Try adding some data through the admin panel first.',
        sources: [],
        totalCount: 0,
        sourceCounts: { slack: 0, notion: 0 },
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
    const answerData = await generateAnswer(query, relevantChunks);

    // Count sources by type
    const sourceCounts = {
      slack: relevantChunks.filter(s => s.source === 'slack').length,
      notion: relevantChunks.filter(s => s.source === 'notion').length,
    };

    // Find best expert (most relevant author)
    const authorRelevance = new Map<string, number>();
    results.forEach(result => {
      const author = result.metadata.author;
      const currentRelevance = authorRelevance.get(author) || 0;
      authorRelevance.set(author, currentRelevance + result.similarity);
    });

    const bestAuthor = Array.from(authorRelevance.entries())
      .sort(([,a], [,b]) => b - a)[0];

    return {
      answer: answerData.answer,
      sources: answerData.sources,
      totalCount: results.length,
      sourceCounts,
      bestExpert: {
        author: bestAuthor ? bestAuthor[0] : 'No expert found',
        relevance: bestAuthor ? bestAuthor[1] : 0,
        slackDmLink: bestAuthor ? `https://slack.com/app_redirect?channel=${bestAuthor[0]}` : '',
      },
    };
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

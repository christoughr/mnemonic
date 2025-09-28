import OpenAI from 'openai';
import { config } from './config';

let openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openai) {
    openai = new OpenAI({
      apiKey: config.openai.apiKey,
    });
  }
  return openai;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await getOpenAI().embeddings.create({
    model: config.openai.embeddingModel,
    input: text,
  });
  
  return response.data[0].embedding;
}

export async function generateAnswer(
  query: string,
  relevantChunks: Array<{
    content: string;
    author: string;
    url: string;
    source: string;
  }>
): Promise<{
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
}> {
  const context = relevantChunks
    .map(chunk => `Author: ${chunk.author}\nContent: ${chunk.content}\nSource: ${chunk.source}`)
    .join('\n\n');

  const prompt = `Based on the following context from Slack messages and Notion pages, provide a concise answer to the user's question.

User Question: ${query}

Context:
${context}

Please provide:
1. A clear, concise answer (2-3 sentences max)
2. Identify the best expert (author with most relevant content)
3. Format your response as JSON with the following structure:
{
  "answer": "your answer here",
  "bestExpert": {
    "author": "expert name",
    "relevance": 0.95
  }
}

Only respond with valid JSON, no additional text.`;

  const response = await getOpenAI().chat.completions.create({
    model: config.openai.chatModel,
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant that provides concise answers based on team knowledge from Slack and Notion. Always respond with valid JSON only.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.3,
  });

  const result = JSON.parse(response.choices[0].message.content || '{}');
  
  // Calculate best expert
  const authorRelevance = relevantChunks.reduce((acc, chunk) => {
    acc[chunk.author] = (acc[chunk.author] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const bestExpertAuthor = Object.entries(authorRelevance)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || relevantChunks[0]?.author || 'Unknown';

  const slackDmLink = `https://slack.com/app_redirect?channel=${relevantChunks.find(c => c.author === bestExpertAuthor)?.url || ''}`;

  return {
    answer: result.answer || 'No relevant information found.',
    sources: relevantChunks,
    bestExpert: {
      author: bestExpertAuthor,
      relevance: result.bestExpert?.relevance || 0.8,
      slackDmLink,
    },
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from '@notionhq/client';
import { config } from './config';
import { generateEmbedding } from './openai';
import { getSupabaseAdmin, KnowledgeItem } from './supabase';

export const notion = new Client({
  auth: config.notion.apiKey,
});

export interface NotionPage {
  id: string;
  title: string;
  content: string;
  url: string;
  lastEditedTime: string;
  author: string;
}

export async function fetchNotionPages(databaseId?: string): Promise<NotionPage[]> {
  try {
    const pages: NotionPage[] = [];

    // Use the search API to get all pages
    const response = await notion.search({
      query: '',
      filter: {
        property: 'object',
        value: 'page',
      },
    } as any);

    for (const page of response.results) {
      if ('properties' in page) {
        const pageContent = await extractPageContent(page.id);
        if (pageContent) {
          pages.push({
            id: page.id,
            title: extractTitle(page),
            content: pageContent,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            url: (page as any).url || '',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            lastEditedTime: (page as any).last_edited_time || new Date().toISOString(),
            author: extractAuthor(page),
          });
        }
      }
    }

    return pages;
  } catch (error) {
    console.error('Error fetching Notion pages:', error);
    return [];
  }
}

async function extractPageContent(pageId: string): Promise<string> {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    } as any);

    let content = '';
    
    for (const block of response.results) {
      if ('type' in block) {
        content += extractTextFromBlock(block) + '\n';
      }
    }

    return content.trim();
  } catch (error) {
    console.error('Error extracting page content:', error);
    return '';
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractTextFromBlock(block: any): string {
  if (!block.type) return '';

  switch (block.type) {
    case 'paragraph':
      return block.paragraph?.rich_text?.map((text: any) => text.plain_text).join('') || '';
    case 'heading_1':
      return block.heading_1?.rich_text?.map((text: any) => text.plain_text).join('') || '';
    case 'heading_2':
      return block.heading_2?.rich_text?.map((text: any) => text.plain_text).join('') || '';
    case 'heading_3':
      return block.heading_3?.rich_text?.map((text: any) => text.plain_text).join('') || '';
    case 'bulleted_list_item':
      return block.bulleted_list_item?.rich_text?.map((text: any) => text.plain_text).join('') || '';
    case 'numbered_list_item':
      return block.numbered_list_item?.rich_text?.map((text: any) => text.plain_text).join('') || '';
    case 'to_do':
      return block.to_do?.rich_text?.map((text: any) => text.plain_text).join('') || '';
    case 'code':
      return block.code?.rich_text?.map((text: any) => text.plain_text).join('') || '';
    default:
      return '';
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractTitle(page: any): string {
  const titleProperty = Object.values(page.properties).find((prop: any) => 
    prop.type === 'title'
  ) as any;
  
  return titleProperty?.title?.map((text: any) => text.plain_text).join('') || 'Untitled';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractAuthor(page: any): string {
  // Try to get author from created_by or last_edited_by
  const createdBy = page.created_by?.name || page.created_by?.id;
  const lastEditedBy = page.last_edited_by?.name || page.last_edited_by?.id;
  
  return lastEditedBy || createdBy || 'Unknown';
}

export async function ingestNotionPages(workspaceId: string, databaseId?: string): Promise<number> {
  const pages = await fetchNotionPages(databaseId);
  let ingestedCount = 0;

  for (const page of pages) {
    try {
      // Generate embedding
      const embedding = await generateEmbedding(page.content);

      // Store in database
      const knowledgeItem: Omit<KnowledgeItem, 'id' | 'created_at' | 'updated_at'> = {
        content: page.content,
        embedding,
        metadata: {
          source: 'notion',
          author: page.author,
          url: page.url,
          timestamp: page.lastEditedTime,
          workspace: workspaceId,
          title: page.title,
        },
      };

      const { error } = await getSupabaseAdmin()
        .from('knowledge_items')
        .insert(knowledgeItem);

      if (error) {
        console.error('Error storing Notion page:', error);
      } else {
        ingestedCount++;
      }
    } catch (error) {
      console.error('Error processing Notion page:', error);
    }
  }

  return ingestedCount;
}
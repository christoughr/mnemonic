import { WebClient } from '@slack/web-api';
import { config } from './config';
import { generateEmbedding } from './openai';
import { getSupabaseAdmin, KnowledgeItem } from './supabase';

export const slack = new WebClient(config.slack.botToken);

export interface SlackMessage {
  text: string;
  user: string;
  channel: string;
  timestamp: string;
  permalink: string;
}

export async function fetchSlackMessages(channelId: string, limit = 1000): Promise<SlackMessage[]> {
  try {
    const result = await slack.conversations.history({
      channel: channelId,
      limit,
    });

    if (!result.messages) return [];

    const messages: SlackMessage[] = [];

    for (const message of result.messages) {
      if (message.type === 'message' && message.text && !message.bot_id && !message.subtype) {
        // Get permalink
        const permalinkResult = await slack.chat.getPermalink({
          channel: channelId,
          message_ts: message.ts || '',
        });

        // Get user info
        const userResult = await slack.users.info({
          user: message.user || '',
        });

        messages.push({
          text: message.text,
          user: userResult.user?.real_name || userResult.user?.name || 'Unknown',
          channel: channelId,
          timestamp: message.ts || '',
          permalink: permalinkResult.permalink || '',
        });
      }
    }

    return messages;
  } catch (error) {
    console.error('Error fetching Slack messages:', error);
    return [];
  }
}

export async function ingestSlackMessages(channelId: string, workspaceId: string): Promise<number> {
  const messages = await fetchSlackMessages(channelId);
  let ingestedCount = 0;

  for (const message of messages) {
    try {
      // Generate embedding
      const embedding = await generateEmbedding(message.text);

      // Store in database
      const knowledgeItem: Omit<KnowledgeItem, 'id' | 'created_at' | 'updated_at'> = {
        content: message.text,
        embedding,
        metadata: {
          source: 'slack',
          author: message.user,
          url: message.permalink,
          timestamp: message.timestamp,
          channel: message.channel,
          workspace: workspaceId,
        },
      };

      const { error } = await getSupabaseAdmin()
        .from('knowledge_items')
        .insert(knowledgeItem);

      if (error) {
        console.error('Error storing Slack message:', error);
      } else {
        ingestedCount++;
      }
    } catch (error) {
      console.error('Error processing Slack message:', error);
    }
  }

  return ingestedCount;
}

export async function getSlackChannels(): Promise<Array<{ id: string; name: string }>> {
  try {
    const result = await slack.conversations.list({
      types: 'public_channel,private_channel',
      exclude_archived: true,
    });

    return result.channels?.map(channel => ({
      id: channel.id!,
      name: channel.name!,
    })) || [];
  } catch (error) {
    console.error('Error fetching Slack channels:', error);
    return [];
  }
}

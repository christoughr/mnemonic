import { NextRequest, NextResponse } from 'next/server';
import { ingestSlackMessages } from '@/lib/slack';

export async function POST(request: NextRequest) {
  try {
    const { channelId, workspaceId } = await request.json();

    if (!channelId || !workspaceId) {
      return NextResponse.json(
        { error: 'channelId and workspaceId are required' },
        { status: 400 }
      );
    }

    const ingestedCount = await ingestSlackMessages(channelId, workspaceId);
    
    return NextResponse.json({
      success: true,
      ingestedCount,
      message: `Successfully ingested ${ingestedCount} messages from Slack`,
    });
  } catch (error) {
    console.error('Slack ingestion API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

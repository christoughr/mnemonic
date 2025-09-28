import { NextRequest, NextResponse } from 'next/server';
import { ingestNotionPages } from '@/lib/notion';

export async function POST(request: NextRequest) {
  try {
    const { workspaceId, databaseId } = await request.json();

    if (!workspaceId) {
      return NextResponse.json(
        { error: 'workspaceId is required' },
        { status: 400 }
      );
    }

    const ingestedCount = await ingestNotionPages(workspaceId, databaseId);
    
    return NextResponse.json({
      success: true,
      ingestedCount,
      message: `Successfully ingested ${ingestedCount} pages from Notion`,
    });
  } catch (error) {
    console.error('Notion ingestion API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { getSlackChannels } from '@/lib/slack';

export async function GET() {
  try {
    const channels = await getSlackChannels();
    
    return NextResponse.json(channels);
  } catch (error) {
    console.error('Slack channels API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

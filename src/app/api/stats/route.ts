import { NextResponse } from 'next/server';
import { getKnowledgeStats } from '@/lib/search';

export async function GET() {
  try {
    const stats = await getKnowledgeStats();
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

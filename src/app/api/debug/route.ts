import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    // Get all knowledge items with their content
    const { data, error } = await getSupabaseAdmin()
      .from('knowledge_items')
      .select('id, content, metadata, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      count: data?.length || 0,
      items: data?.map(item => ({
        id: item.id,
        contentLength: item.content?.length || 0,
        contentPreview: item.content?.substring(0, 100) || 'No content',
        source: item.metadata?.source || 'Unknown',
        author: item.metadata?.author || 'Unknown',
        title: item.metadata?.title || 'No title',
      })) || [],
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

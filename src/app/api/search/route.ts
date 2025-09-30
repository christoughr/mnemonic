import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledge } from '@/lib/search';
import { validateQuery, checkRateLimit, sanitizeInput } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';

    // Rate limiting
    const rateLimit = checkRateLimit(clientIP, 20, 60000); // 20 requests per minute
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '20',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime.toString(),
          }
        }
      );
    }

    // Input validation
    const validation = validateQuery(query);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Sanitize and search
    const sanitizedQuery = sanitizeInput(query);
    const result = await searchKnowledge(sanitizedQuery);
    
    return NextResponse.json(result, {
      headers: {
        'X-RateLimit-Limit': '20',
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': rateLimit.resetTime.toString(),
      }
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

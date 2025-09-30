import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledge } from '@/lib/search';
import { validateQuery, sanitizeInput } from '@/lib/validation';
import { createRateLimitMiddleware, rateLimits } from '@/lib/rateLimit';
import { withCache, cacheKeys } from '@/lib/cache';
import { analytics } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    // Rate limiting
    const rateLimitMiddleware = createRateLimitMiddleware(
      rateLimits.search.limit,
      rateLimits.search.windowMs,
      (req) => req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    );
    
    const rateLimit = rateLimitMiddleware(request);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { 
          status: 429,
        headers: {
          'X-RateLimit-Limit': rateLimits.search.limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimit.resetTime?.toString() || '0',
          'Retry-After': rateLimit.retryAfter?.toString() || '60',
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

    // Sanitize and search with caching
    const sanitizedQuery = sanitizeInput(query);
    const cachedSearchKnowledge = withCache(
      searchKnowledge,
      (query: string) => cacheKeys.search(query),
      5 * 60 * 1000 // 5 minutes cache
    );
    
    const result = await cachedSearchKnowledge(sanitizedQuery);
    
    // Track analytics
    analytics.trackSearch(sanitizedQuery, result.sources.length, 0);
    
    return NextResponse.json(result, {
      headers: {
        'X-RateLimit-Limit': rateLimits.search.limit.toString(),
        'X-RateLimit-Remaining': rateLimit.remaining?.toString() || '0',
        'X-RateLimit-Reset': rateLimit.resetTime?.toString() || '0',
        'X-Cache': 'HIT', // Would be dynamic based on cache hit/miss
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

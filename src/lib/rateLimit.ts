// Rate limiting implementation
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private limits = new Map<string, RateLimitEntry>();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries every minute
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60 * 1000);
  }

  // Check if request is allowed
  isAllowed(
    identifier: string, 
    limit: number, 
    windowMs: number
  ): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = this.limits.get(identifier);

    if (!entry || now > entry.resetTime) {
      // Create new entry or reset expired one
      this.limits.set(identifier, {
        count: 1,
        resetTime: now + windowMs,
      });
      
      return {
        allowed: true,
        remaining: limit - 1,
        resetTime: now + windowMs,
      };
    }

    if (entry.count >= limit) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }

    // Increment count
    entry.count++;
    this.limits.set(identifier, entry);

    return {
      allowed: true,
      remaining: limit - entry.count,
      resetTime: entry.resetTime,
    };
  }

  // Get current status
  getStatus(identifier: string, limit: number, windowMs: number) {
    const entry = this.limits.get(identifier);
    const now = Date.now();

    if (!entry || now > entry.resetTime) {
      return {
        count: 0,
        remaining: limit,
        resetTime: now + windowMs,
      };
    }

    return {
      count: entry.count,
      remaining: Math.max(0, limit - entry.count),
      resetTime: entry.resetTime,
    };
  }

  // Clean up expired entries
  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(key);
      }
    }
  }

  // Destroy the rate limiter
  destroy() {
    clearInterval(this.cleanupInterval);
    this.limits.clear();
  }
}

export const rateLimiter = new RateLimiter();

// Rate limit configurations
export const rateLimits = {
  search: { limit: 10, windowMs: 60 * 1000 }, // 10 searches per minute
  api: { limit: 100, windowMs: 60 * 1000 }, // 100 API calls per minute
  auth: { limit: 5, windowMs: 15 * 60 * 1000 }, // 5 auth attempts per 15 minutes
  ingest: { limit: 3, windowMs: 60 * 1000 }, // 3 ingest operations per minute
};

// Middleware for rate limiting
export function createRateLimitMiddleware(
  limit: number,
  windowMs: number,
  getIdentifier: (req: Request) => string
) {
  return (req: Request) => {
    const identifier = getIdentifier(req);
    const result = rateLimiter.isAllowed(identifier, limit, windowMs);
    
    if (!result.allowed) {
      return {
        success: false,
        error: 'Rate limit exceeded',
        retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
      };
    }
    
    return {
      success: true,
      remaining: result.remaining,
      resetTime: result.resetTime,
    };
  };
}

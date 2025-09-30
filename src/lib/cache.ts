// Simple in-memory cache for API responses
// In production, you'd use Redis or similar

interface CacheEntry {
  data: unknown;
  timestamp: number;
  ttl: number;
}

class Cache {
  private cache = new Map<string, CacheEntry>();
  private maxSize = 1000; // Maximum number of entries

  set(key: string, data: unknown, ttlMs: number = 5 * 60 * 1000) { // 5 minutes default
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    });
  }

  get(key: string): unknown | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Get cache statistics
  getStats(): { total: number; active: number; expired: number; hitRate: number } {
    const now = Date.now();
    let expired = 0;
    let active = 0;

    for (const entry of this.cache.values()) {
      if (now - entry.timestamp > entry.ttl) {
        expired++;
      } else {
        active++;
      }
    }

    return {
      total: this.cache.size,
      active,
      expired,
      hitRate: 0, // Would need to track hits/misses
    };
  }
}

export const cache = new Cache();

// Cache key generators
export const cacheKeys = {
  search: (query: string, filters?: Record<string, unknown>) => 
    `search:${query}:${JSON.stringify(filters || {})}`,
  stats: () => 'stats:all',
  channels: () => 'slack:channels',
  pages: () => 'notion:pages',
};

// Cache wrapper for async functions
export function withCache<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  keyGenerator: (...args: T) => string,
  ttlMs: number = 5 * 60 * 1000
) {
  return async (...args: T): Promise<R> => {
    const key = keyGenerator(...args);
    const cached = cache.get(key);
    
    if (cached !== null) {
      return cached as R;
    }
    
    const result = await fn(...args);
    cache.set(key, result, ttlMs);
    return result;
  };
}

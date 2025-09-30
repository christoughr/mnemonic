// Input validation utilities

// Input sanitization and validation utilities
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
}

export function validateQuery(query: string): { isValid: boolean; error?: string } {
  if (!query || typeof query !== 'string') {
    return { isValid: false, error: 'Query is required and must be a string' };
  }

  const sanitized = sanitizeInput(query);
  
  if (sanitized.length < 2) {
    return { isValid: false, error: 'Query must be at least 2 characters long' };
  }

  if (sanitized.length > 500) {
    return { isValid: false, error: 'Query must be less than 500 characters' };
  }

  return { isValid: true };
}

export function validateWorkspaceId(workspaceId: string): { isValid: boolean; error?: string } {
  if (!workspaceId || typeof workspaceId !== 'string') {
    return { isValid: false, error: 'Workspace ID is required' };
  }

  const sanitized = sanitizeInput(workspaceId);
  
  if (sanitized.length < 5) {
    return { isValid: false, error: 'Workspace ID must be at least 5 characters long' };
  }

  return { isValid: true };
}

export function validateChannelId(channelId: string): { isValid: boolean; error?: string } {
  if (!channelId || typeof channelId !== 'string') {
    return { isValid: false, error: 'Channel ID is required' };
  }

  const sanitized = sanitizeInput(channelId);
  
  if (!sanitized.startsWith('C') && !sanitized.startsWith('G')) {
    return { isValid: false, error: 'Channel ID must start with C or G' };
  }

  return { isValid: true };
}

// Rate limiting (simple in-memory store for demo)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string, 
  limit: number = 10, 
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = identifier;
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetTime: now + windowMs };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count++;
  return { allowed: true, remaining: limit - record.count, resetTime: record.resetTime };
}

// Clean up old rate limit records periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 300000); // Clean up every 5 minutes

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitRecord>();

// Periodic cleanup every 60 seconds
if (typeof setInterval !== "undefined") {
  const cleanup = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store) {
      if (now > record.resetAt) store.delete(key);
    }
  }, 60_000);
  // Allow process to exit
  if (typeof cleanup === "object" && "unref" in cleanup) {
    (cleanup as unknown as { unref(): void }).unref();
  }
}

export async function rateLimitByIp(
  ip: string,
  maxRequests = 30,
  windowMs = 60_000
): Promise<{ success: boolean; remaining: number; resetIn: number }> {
  const now = Date.now();
  const record = store.get(ip);

  if (!record || now > record.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: maxRequests - 1, resetIn: windowMs };
  }

  if (record.count >= maxRequests) {
    const resetIn = record.resetAt - now;
    return { success: false, remaining: 0, resetIn };
  }

  record.count++;
  return {
    success: true,
    remaining: maxRequests - record.count,
    resetIn: record.resetAt - now,
  };
}

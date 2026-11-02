import { getKv, isUnlockRegistryAvailable } from './kvClient.js';

export { isUnlockRegistryAvailable };

type RateLimitResult = { allowed: true } | { allowed: false; retryAfterSeconds: number };

/**
 * Consume a sliding counter in Redis. If Redis is down or misconfigured, fail
 * open so unlock / purchase verification still works.
 */
export async function consumeRateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  if (!isUnlockRegistryAvailable()) {
    return { allowed: true };
  }

  try {
    const kv = getKv();
    const namespaced = `wizard:rl:${key}`;
    const count = await kv.incr(namespaced);
    if (count === 1) {
      await kv.expire(namespaced, windowSeconds);
    }

    if (count > limit) {
      const ttl = await kv.ttl(namespaced);
      return { allowed: false, retryAfterSeconds: Math.max(ttl, 60) };
    }

    return { allowed: true };
  } catch (err) {
    console.error('[rate-limit] Redis unavailable — failing open', err);
    return { allowed: true };
  }
}

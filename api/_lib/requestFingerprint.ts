import { createHmac } from 'node:crypto';
import type { VercelRequest } from '@vercel/node';

export function hashClientFingerprint(req: VercelRequest, secret: string): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    (typeof forwarded === 'string' ? forwarded.split(',')[0]?.trim() : forwarded?.[0]) ||
    req.socket.remoteAddress ||
    'unknown';
  const userAgent = req.headers['user-agent'] ?? 'unknown';

  return createHmac('sha256', secret)
    .update(`${ip}|${userAgent}`)
    .digest('base64url')
    .slice(0, 22);
}

export function hashIpForRateLimit(req: VercelRequest, secret: string): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    (typeof forwarded === 'string' ? forwarded.split(',')[0]?.trim() : forwarded?.[0]) ||
    req.socket.remoteAddress ||
    'unknown';

  return createHmac('sha256', secret).update(ip).digest('base64url').slice(0, 16);
}

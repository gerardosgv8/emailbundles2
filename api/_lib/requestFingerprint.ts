import { createHmac } from 'node:crypto';
import type { VercelRequest } from '@vercel/node';

const STABLE_DEVICE_ID_RE = /^[a-zA-Z0-9_-]{16,128}$/;

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

export function hashStableDeviceId(deviceId: string, secret: string): string {
  return createHmac('sha256', secret)
    .update(`stable-device:${deviceId}`)
    .digest('base64url')
    .slice(0, 22);
}

/** Prefer browser-local device id; fall back to IP+UA for older clients. */
export function resolveWizardDeviceKey(
  req: VercelRequest,
  secret: string,
  clientDeviceId: string | undefined,
): string {
  const trimmed = clientDeviceId?.trim() ?? '';
  if (STABLE_DEVICE_ID_RE.test(trimmed)) {
    return hashStableDeviceId(trimmed, secret);
  }
  return hashClientFingerprint(req, secret);
}

export function hashIpForRateLimit(req: VercelRequest, secret: string): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    (typeof forwarded === 'string' ? forwarded.split(',')[0]?.trim() : forwarded?.[0]) ||
    req.socket.remoteAddress ||
    'unknown';

  return createHmac('sha256', secret).update(ip).digest('base64url').slice(0, 16);
}

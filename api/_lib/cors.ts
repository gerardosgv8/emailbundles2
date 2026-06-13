import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAllowedOrigins } from './env.js';

export function applyCors(req: VercelRequest, res: VercelResponse): boolean {
  const origin = req.headers.origin;
  const allowed = getAllowedOrigins();

  if (origin && allowed.some((o) => origin === o || origin.startsWith(`${o}/`))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (allowed.length === 1) {
    res.setHeader('Access-Control-Allow-Origin', allowed[0]);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }

  return false;
}

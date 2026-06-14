import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors } from './_lib/cors.js';
import { getDownloadAccessDays, getMaxDownloadsPerPurchase } from './_lib/env.js';

/** Public purchase/download limits (matches server env — safe to expose). */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Cache-Control', 'public, max-age=300');

  return res.status(200).json({
    maxDownloads: getMaxDownloadsPerPurchase(),
    accessDays: getDownloadAccessDays(),
  });
}

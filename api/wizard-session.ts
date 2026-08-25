import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors } from './_lib/cors.js';
import { getWizardSessionSecret } from './_lib/env.js';
import { getProduct } from './_lib/products.js';
import { readBearerToken, verifyWizardSessionToken } from './_lib/wizardSession.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = readBearerToken(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ error: 'Missing session' });
  }

  const claims = verifyWizardSessionToken(token, getWizardSessionSecret());
  if (!claims) {
    return res.status(401).json({ error: 'Session expired or invalid' });
  }

  const product = getProduct(claims.productId);

  return res.status(200).json({
    valid: true,
    email: claims.email,
    orderId: claims.orderId,
    productId: claims.productId,
    productName: product?.name ?? claims.productId,
    expiresAt: new Date(claims.exp).toISOString(),
  });
}

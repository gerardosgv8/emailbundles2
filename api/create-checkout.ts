import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors } from './_lib/cors.js';
import { toClientErrorMessage } from './_lib/clientError.js';
import { getLemonSqueezyCheckoutUrl } from './_lib/env.js';
import { getProduct } from './_lib/products.js';

type CheckoutBody = {
  productId?: string;
  email?: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as CheckoutBody;
    const productId = body?.productId?.trim();

    if (!productId) {
      return res.status(400).json({ error: 'productId is required' });
    }

    const product = getProduct(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const checkoutUrl = new URL(getLemonSqueezyCheckoutUrl());
    const email = body.email?.trim();
    if (email) {
      checkoutUrl.searchParams.set('checkout[email]', email);
    }
    checkoutUrl.searchParams.set('checkout[custom][product_id]', product.id);

    return res.status(200).json({ url: checkoutUrl.toString() });
  } catch (err) {
    console.error('[create-checkout]', err);
    return res.status(500).json({
      error: toClientErrorMessage(err, 'Checkout is temporarily unavailable. Please try again.'),
    });
  }
}

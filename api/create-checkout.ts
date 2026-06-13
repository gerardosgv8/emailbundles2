import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors } from './_lib/cors.js';
import { toClientErrorMessage } from './_lib/clientError.js';
import { getSiteUrl } from './_lib/env.js';
import { getProduct, getStripePriceId } from './_lib/products.js';
import { getStripe } from './_lib/stripe.js';

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

    const priceId = getStripePriceId(product);
    const siteUrl = getSiteUrl().replace(/\/$/, '');
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: body.email?.trim() || undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/products?checkout=cancelled`,
      metadata: {
        product_id: product.id,
        bundle_id: product.id,
      },
    });

    if (!session.url) {
      return res.status(500).json({ error: 'Checkout is temporarily unavailable. Please try again.' });
    }

    return res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error('[create-checkout]', err);
    return res.status(500).json({
      error: toClientErrorMessage(err, 'Checkout is temporarily unavailable. Please try again.'),
    });
  }
}

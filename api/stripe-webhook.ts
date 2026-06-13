import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fulfillCheckoutSession } from './_lib/delivery';
import { getStripeWebhookSecret } from './_lib/env';
import { readRawBody } from './_lib/rawBody';
import { getStripe } from './_lib/stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const signature = req.headers['stripe-signature'];
  if (!signature || Array.isArray(signature)) {
    return res.status(400).send('Missing stripe-signature header');
  }

  let event;

  try {
    const rawBody = await readRawBody(req);
    event = getStripe().webhooks.constructEvent(rawBody, signature, getStripeWebhookSecret());
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid webhook';
    console.error('[stripe-webhook] signature error:', message);
    return res.status(400).send(`Webhook Error: ${message}`);
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await fulfillCheckoutSession(session);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('[stripe-webhook] handler error:', err);
    return res.status(500).json({ error: 'Webhook handler failed' });
  }
}

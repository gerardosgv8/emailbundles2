import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors } from './_lib/cors.js';
import { toClientErrorMessage } from './_lib/clientError.js';
import { fulfillCheckoutSession } from './_lib/delivery.js';
import { getStripe } from './_lib/stripe.js';

/**
 * After Stripe redirects back, the success page calls this with session_id.
 * Verifies payment with Stripe and returns a short-lived download URL.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sessionId = typeof req.query.session_id === 'string' ? req.query.session_id : '';

  if (!sessionId) {
    return res.status(400).json({ error: 'session_id is required' });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const delivery = await fulfillCheckoutSession(session);

    return res.status(200).json({
      email: delivery.email,
      transactionId: delivery.transactionId,
      productId: delivery.productId,
      productName: delivery.productName,
      downloadUrl: delivery.downloadUrl,
      emailed: delivery.emailed,
    });
  } catch (err) {
    console.error('[verify-session]', err);
    return res.status(400).json({
      error: toClientErrorMessage(
        err,
        'We could not prepare your download right now. Try refreshing, or contact support with your receipt.',
      ),
    });
  }
}

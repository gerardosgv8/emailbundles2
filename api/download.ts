import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors } from './_lib/cors.js';
import { toClientErrorMessage } from './_lib/clientError.js';
import { fulfillCheckoutSession } from './_lib/delivery.js';
import { getStripe } from './_lib/stripe.js';

/**
 * Verifies a paid Stripe session and redirects the browser to a fresh R2 presigned URL.
 * Top-level navigation avoids cross-origin download quirks in some browsers.
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
    const delivery = await fulfillCheckoutSession(session, { sendEmail: false });

    res.setHeader('Cache-Control', 'no-store');
    return res.redirect(302, delivery.downloadUrl);
  } catch (err) {
    console.error('[download]', err);
    return res.status(400).json({
      error: toClientErrorMessage(
        err,
        'We could not prepare your download right now. Try refreshing the success page, or contact support with your receipt.',
      ),
    });
  }
}

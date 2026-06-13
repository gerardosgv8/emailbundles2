import type Stripe from 'stripe';
import { sendPostPurchaseEmail } from './email.js';
import { getApiBaseUrl, getResendApiKey, getSiteUrl } from './env.js';
import { getProduct } from './products.js';
import { createPresignedDownloadUrl } from './r2.js';
import { getStripe } from './stripe.js';

export type DeliveryResult = {
  email: string;
  transactionId: string;
  productId: string;
  productName: string;
  downloadUrl: string;
  emailed: boolean;
};

export type FulfillOptions = {
  /** Send post-purchase email when Resend is configured (idempotent). Default true. */
  sendEmail?: boolean;
};

function getCustomerEmail(session: Stripe.Checkout.Session): string {
  return session.customer_details?.email ?? session.customer_email ?? '';
}

function getTransactionId(session: Stripe.Checkout.Session): string {
  return typeof session.payment_intent === 'string'
    ? session.payment_intent
    : session.payment_intent?.id ?? session.id;
}

export function getDownloadRedirectUrl(sessionId: string): string {
  const params = new URLSearchParams({ session_id: sessionId });
  return `${getApiBaseUrl()}/api/download?${params}`;
}

function getBrandWizardUrl(productId: string): string {
  const siteUrl = getSiteUrl().replace(/\/$/, '');
  return `${siteUrl}/brand-wizard/${productId}`;
}

/**
 * Sends the post-purchase email once per checkout session.
 * Uses Stripe session metadata (`email_sent_at`) for idempotency.
 */
export async function maybeSendPostPurchaseEmail(
  session: Stripe.Checkout.Session,
  details: {
    email: string;
    productId: string;
    productName: string;
    transactionId: string;
  },
): Promise<boolean> {
  if (!getResendApiKey()) {
    console.log('[email] RESEND_API_KEY not set — skipping post-purchase email');
    return false;
  }

  if (session.metadata?.email_sent_at) {
    console.log(`[email] already sent for session ${session.id}`);
    return true;
  }

  await sendPostPurchaseEmail({
    to: details.email,
    productName: details.productName,
    transactionId: details.transactionId,
    downloadUrl: getDownloadRedirectUrl(session.id),
    brandWizardUrl: getBrandWizardUrl(details.productId),
  });

  const stripe = getStripe();
  await stripe.checkout.sessions.update(session.id, {
    metadata: {
      ...session.metadata,
      email_sent_at: new Date().toISOString(),
    },
  });

  return true;
}

export async function fulfillCheckoutSession(
  session: Stripe.Checkout.Session,
  options: FulfillOptions = {},
): Promise<DeliveryResult> {
  const { sendEmail = true } = options;

  if (session.payment_status !== 'paid') {
    throw new Error(`Checkout session ${session.id} is not paid (status: ${session.payment_status})`);
  }

  const productId = session.metadata?.product_id ?? session.metadata?.bundle_id;
  if (!productId) {
    throw new Error(`Checkout session ${session.id} is missing metadata.product_id`);
  }

  const product = getProduct(productId);
  if (!product) {
    throw new Error(`Unknown product_id "${productId}" in session ${session.id}`);
  }

  const email = getCustomerEmail(session);
  if (!email) {
    throw new Error(`Checkout session ${session.id} has no customer email`);
  }

  const transactionId = getTransactionId(session);
  const downloadUrl = await createPresignedDownloadUrl(product.r2Key);

  let emailed = false;
  if (sendEmail) {
    try {
      emailed = await maybeSendPostPurchaseEmail(session, {
        email,
        productId,
        productName: product.name,
        transactionId,
      });
    } catch (err) {
      console.error('[delivery] Post-purchase email failed:', err);
    }
  }

  console.log(
    `[delivery] ${email} · product=${productId} · tx=${transactionId} · emailed=${emailed}`,
  );

  return {
    email,
    transactionId,
    productId,
    productName: product.name,
    downloadUrl,
    emailed,
  };
}

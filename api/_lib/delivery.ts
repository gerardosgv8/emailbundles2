import type Stripe from 'stripe';
import {
  assertDownloadAllowed,
  ensureDownloadAccessMetadata,
  getDownloadAccessState,
  recordDownload,
} from './downloadAccess.js';
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
  /** Gated API URL — each click counts toward the per-purchase download limit. */
  downloadUrl: string;
  emailed: boolean;
  downloadsRemaining: number;
  maxDownloads: number;
  downloadAccessExpiresAt: string;
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

export function validatePaidCheckoutSession(session: Stripe.Checkout.Session): {
  email: string;
  transactionId: string;
  productId: string;
  productName: string;
  r2Key: string;
} {
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

  return {
    email,
    transactionId: getTransactionId(session),
    productId,
    productName: product.name,
    r2Key: product.r2Key,
  };
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

/**
 * Confirms payment and initializes download access metadata.
 * Does not issue R2 presigned URLs or consume a download attempt.
 */
export async function fulfillCheckoutSession(
  session: Stripe.Checkout.Session,
  options: FulfillOptions = {},
): Promise<DeliveryResult> {
  const { sendEmail = true } = options;
  const order = validatePaidCheckoutSession(session);

  await ensureDownloadAccessMetadata(session);

  const refreshed = await getStripe().checkout.sessions.retrieve(session.id);
  const access = getDownloadAccessState(refreshed);

  let emailed = false;
  if (sendEmail) {
    try {
      emailed = await maybeSendPostPurchaseEmail(refreshed, {
        email: order.email,
        productId: order.productId,
        productName: order.productName,
        transactionId: order.transactionId,
      });
    } catch (err) {
      console.error('[delivery] Post-purchase email failed:', err);
    }
  }

  console.log(
    `[delivery] ${order.email} · product=${order.productId} · tx=${order.transactionId} · emailed=${emailed} · downloads=${access.downloadCount}/${access.maxDownloads}`,
  );

  return {
    email: order.email,
    transactionId: order.transactionId,
    productId: order.productId,
    productName: order.productName,
    downloadUrl: getDownloadRedirectUrl(session.id),
    emailed,
    downloadsRemaining: access.expired ? 0 : access.remaining,
    maxDownloads: access.maxDownloads,
    downloadAccessExpiresAt: access.expiresAt.toISOString(),
  };
}

/**
 * Validates access, records one download, and returns a short-lived R2 presigned URL.
 */
export async function issueDownloadForSession(
  session: Stripe.Checkout.Session,
): Promise<{ presignedUrl: string; downloadsRemaining: number }> {
  const order = validatePaidCheckoutSession(session);
  await ensureDownloadAccessMetadata(session);

  const refreshed = await getStripe().checkout.sessions.retrieve(session.id);
  assertDownloadAllowed(refreshed);

  const access = await recordDownload(refreshed);
  const presignedUrl = await createPresignedDownloadUrl(order.r2Key);

  console.log(
    `[download] ${order.email} · product=${order.productId} · remaining=${access.remaining}/${access.maxDownloads}`,
  );

  return {
    presignedUrl,
    downloadsRemaining: access.remaining,
  };
}

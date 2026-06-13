import type Stripe from 'stripe';
import { sendDownloadEmail } from './email.js';
import { getProduct } from './products.js';
import { createPresignedDownloadUrl } from './r2.js';

export type DeliveryResult = {
  email: string;
  transactionId: string;
  productId: string;
  productName: string;
  downloadUrl: string;
  emailed: boolean;
};

export async function fulfillCheckoutSession(session: Stripe.Checkout.Session): Promise<DeliveryResult> {
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

  const email = session.customer_details?.email ?? session.customer_email ?? '';
  if (!email) {
    throw new Error(`Checkout session ${session.id} has no customer email`);
  }

  const transactionId =
    typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id ?? session.id;

  const downloadUrl = await createPresignedDownloadUrl(product.r2Key);

  let emailed = false;
  try {
    emailed = await sendDownloadEmail({
      to: email,
      productName: product.name,
      downloadUrl,
      transactionId,
    });
  } catch (err) {
    console.error('[delivery] Email failed:', err);
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

/** Maps internal/API errors to safe messages for browsers (never expose env/config details). */

const INTERNAL_PATTERNS = [
  /^Missing environment variable:/i,
  /^Missing STRIPE_PRICE_/i,
  /STRIPE_SECRET_KEY/i,
  /STRIPE_WEBHOOK_SECRET/i,
  /R2_ACCOUNT_ID|R2_ACCESS_KEY|R2_SECRET_ACCESS_KEY|R2_BUCKET_NAME/i,
  /Add the env var in Vercel/i,
  /ECONNREFUSED|ENOTFOUND|getaddrinfo/i,
];

export function toClientErrorMessage(err: unknown, fallback: string): string {
  if (!(err instanceof Error)) {
    return fallback;
  }

  const message = err.message.trim();
  if (!message) {
    return fallback;
  }

  if (INTERNAL_PATTERNS.some((pattern) => pattern.test(message))) {
    return fallback;
  }

  if (/is not paid/i.test(message)) {
    return 'Your payment is still processing. Wait a moment and refresh this page, or check your email for a download link.';
  }

  if (/no customer email/i.test(message)) {
    return 'We could not find an email for this order. Contact support with your Stripe receipt.';
  }

  if (/Unknown product/i.test(message)) {
    return 'This product is no longer available. Contact support if you were charged.';
  }

  if (/missing metadata\.product_id/i.test(message)) {
    return 'This order is missing product details. Contact support with your receipt.';
  }

  if (/Download limit reached/i.test(message)) {
    return 'You have used all downloads included with this purchase. Contact support if you need another copy.';
  }

  if (/Download access expired/i.test(message)) {
    return 'The download window for this purchase has ended. Contact support with your receipt if you still need your files.';
  }

  if (/NoSuchKey|NotFound|AccessDenied|Failed to fetch|specified key does not exist|NoSuchBucket|InvalidAccessKeyId|SignatureDoesNotMatch|R2 object not found/i.test(message)) {
    return 'Your payment went through, but we could not prepare the download. Contact support with your receipt.';
  }

  if (/No such checkout\.session/i.test(message)) {
    return 'This checkout session is invalid or expired. Return to products and try again, or use the link from your receipt email.';
  }

  if (message.length > 160 || message.includes(' at ') || message.includes('Error:')) {
    return fallback;
  }

  return message;
}

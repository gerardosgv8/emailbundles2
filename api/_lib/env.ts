/** Server-side env (Vercel functions only — never import from src/). */

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function optional(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

export function getStripeSecretKey() {
  return required('STRIPE_SECRET_KEY');
}

export function getStripeWebhookSecret() {
  return required('STRIPE_WEBHOOK_SECRET');
}

export function getR2Config() {
  return {
    accountId: required('R2_ACCOUNT_ID'),
    accessKeyId: required('R2_ACCESS_KEY_ID'),
    secretAccessKey: required('R2_SECRET_ACCESS_KEY'),
    bucketName: required('R2_BUCKET_NAME'),
  };
}

export function getSiteUrl() {
  return optional('SITE_URL') ?? 'http://localhost:5174';
}

/** Public API origin for download links in emails (defaults to Vercel deployment URL). */
export function getApiBaseUrl(): string {
  const explicit = optional('API_BASE_URL');
  if (explicit) {
    return explicit.replace(/\/$/, '');
  }

  const vercelUrl = optional('VERCEL_URL');
  if (vercelUrl) {
    return `https://${vercelUrl.replace(/\/$/, '')}`;
  }

  return 'http://localhost:3000';
}

export function getSupportEmail(): string {
  return optional('SUPPORT_EMAIL') ?? 'support@mailcraft.studio';
}

export function getDownloadLinkTtlSeconds() {
  const raw = optional('DOWNLOAD_LINK_TTL_SECONDS');
  const parsed = raw ? Number.parseInt(raw, 10) : 86400;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 86400;
}

/** Short TTL for each R2 presigned redirect (seconds). Default 5 minutes. */
export function getPresignedUrlTtlSeconds() {
  const raw = optional('PRESIGNED_URL_TTL_SECONDS');
  const parsed = raw ? Number.parseInt(raw, 10) : 300;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 300;
}

/** Max successful downloads allowed per Stripe checkout session. Default 5. */
export function getMaxDownloadsPerPurchase() {
  const raw = optional('MAX_DOWNLOADS_PER_PURCHASE');
  const parsed = raw ? Number.parseInt(raw, 10) : 5;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 5;
}

/** Days after purchase that download links remain valid. Default 7. */
export function getDownloadAccessDays() {
  const raw = optional('DOWNLOAD_ACCESS_DAYS');
  const parsed = raw ? Number.parseInt(raw, 10) : 7;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 7;
}

export function getResendApiKey() {
  return optional('RESEND_API_KEY');
}

export function getEmailFrom() {
  return optional('EMAIL_FROM') ?? 'Mailcraft Studio <downloads@mailcraft.studio>';
}

/** Resend dashboard template alias or ID. Set to `local` to use repo HTML fallback. */
export function getResendPurchaseTemplateId() {
  return optional('RESEND_PURCHASE_TEMPLATE_ID') ?? 'mailcraft-studio-intro';
}

export function getAllowedOrigins(): string[] {
  const raw = optional('ALLOWED_ORIGINS');
  if (!raw) {
    return [
      'http://localhost:5174',
      'https://gerardosgv8.github.io',
    ];
  }
  return raw.split(',').map((o) => o.trim()).filter(Boolean);
}

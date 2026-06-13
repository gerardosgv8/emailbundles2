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

export function getDownloadLinkTtlSeconds() {
  const raw = optional('DOWNLOAD_LINK_TTL_SECONDS');
  const parsed = raw ? Number.parseInt(raw, 10) : 86400;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 86400;
}

export function getResendApiKey() {
  return optional('RESEND_API_KEY');
}

export function getEmailFrom() {
  return optional('EMAIL_FROM') ?? 'Mailcraft Studio <downloads@mailcraft.studio>';
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

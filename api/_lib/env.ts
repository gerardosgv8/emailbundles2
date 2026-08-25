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

export {
  getLemonSqueezyApiKey,
  getLemonSqueezyCheckoutUrl,
  getLemonSqueezyMode,
  getLemonSqueezyVariantStarterKit,
  isLiveLemonSqueezyMode,
} from './lemonSqueezyConfig.js';

export function getWizardSessionSecret(): string {
  return required('WIZARD_SESSION_SECRET');
}

export function getWizardMaxDevicesPerOrder(): number {
  const raw = optional('WIZARD_MAX_DEVICES_PER_ORDER');
  const parsed = raw ? Number.parseInt(raw, 10) : 2;
  if (!Number.isFinite(parsed) || parsed < 1 || parsed > 10) {
    return 2;
  }
  return parsed;
}

/** Protects GET /api/wizard-unlock-audit (optional). */
export function getWizardAuditSecret(): string | undefined {
  return optional('WIZARD_AUDIT_SECRET');
}

export function getSiteUrl() {
  return optional('SITE_URL') ?? 'http://localhost:5174';
}

export function getSupportEmail(): string {
  return optional('SUPPORT_EMAIL') ?? 'hello@mailcraft.studio';
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
      'https://www.mailcraft.studio',
      'https://mailcraft.studio',
      'https://gerardosgv8.github.io',
    ];
  }
  return raw.split(',').map((o) => o.trim()).filter(Boolean);
}

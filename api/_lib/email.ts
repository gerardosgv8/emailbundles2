import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  getDownloadLinkTtlSeconds,
  getEmailFrom,
  getResendApiKey,
  getResendPurchaseTemplateId,
  getSiteUrl,
  getSupportEmail,
} from './env.js';

export type PostPurchaseEmailPayload = {
  to: string;
  productName: string;
  transactionId: string;
  downloadUrl: string;
  brandWizardUrl: string;
};

const templateDir = dirname(fileURLToPath(import.meta.url));
let cachedLocalTemplate: string | null = null;

function loadLocalPurchaseEmailTemplate(): string {
  if (!cachedLocalTemplate) {
    cachedLocalTemplate = readFileSync(join(templateDir, 'templates', 'purchase-email.html'), 'utf8');
  }
  return cachedLocalTemplate;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatExpiryHours(): number {
  return Math.round(getDownloadLinkTtlSeconds() / 3600);
}

function renderLocalTemplate(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce(
    (html, [key, value]) => html.replaceAll(`{{${key}}}`, value),
    template,
  );
}

/** Variables passed to the Resend dashboard template (alias: mailcraft-studio-intro). */
export function getResendTemplateVariables(payload: PostPurchaseEmailPayload): Record<string, string> {
  return {
    PRODUCT_NAME: payload.productName,
    TRANSACTION_ID: payload.transactionId,
    DOWNLOAD_URL: payload.downloadUrl,
    BRAND_WIZARD_URL: payload.brandWizardUrl,
    SITE_URL: getSiteUrl().replace(/\/$/, ''),
    SUPPORT_EMAIL: getSupportEmail(),
    EXPIRY_HOURS: String(formatExpiryHours()),
  };
}

function buildLocalPurchaseEmail(payload: PostPurchaseEmailPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Your ${payload.productName} download — Mailcraft Studio`;
  const supportEmail = getSupportEmail();
  const expiryHours = formatExpiryHours();

  const html = renderLocalTemplate(loadLocalPurchaseEmailTemplate(), {
    PRODUCT_NAME: escapeHtml(payload.productName),
    TRANSACTION_ID: escapeHtml(payload.transactionId),
    DOWNLOAD_URL: escapeHtml(payload.downloadUrl),
    BRAND_WIZARD_URL: escapeHtml(payload.brandWizardUrl),
    SITE_URL: escapeHtml(getSiteUrl().replace(/\/$/, '')),
    SUPPORT_EMAIL: escapeHtml(supportEmail),
    EXPIRY_HOURS: String(expiryHours),
  });

  const text = [
    'Thanks for your purchase!',
    '',
    `Product: ${payload.productName}`,
    `Transaction: ${payload.transactionId}`,
    '',
    `Download your files: ${payload.downloadUrl}`,
    '',
    `Open Brand Wizard: ${payload.brandWizardUrl}`,
    '',
    `Download links expire after about ${expiryHours} hours. If the link stops working, contact ${supportEmail} with your receipt.`,
    '',
    `Mailcraft Studio — ${getSiteUrl().replace(/\/$/, '')}`,
  ].join('\n');

  return { subject, html, text };
}

/** Sends post-purchase email via Resend. Throws on API errors. */
export async function sendPostPurchaseEmail(payload: PostPurchaseEmailPayload): Promise<void> {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const supportEmail = getSupportEmail();
  const templateId = getResendPurchaseTemplateId();
  const subject = `Your ${payload.productName} download — Mailcraft Studio`;

  const useLocalTemplate = templateId.toLowerCase() === 'local';

  const body = useLocalTemplate
    ? {
        from: getEmailFrom(),
        to: payload.to,
        reply_to: supportEmail,
        ...buildLocalPurchaseEmail(payload),
      }
    : {
        from: getEmailFrom(),
        to: payload.to,
        reply_to: supportEmail,
        subject,
        template: {
          id: templateId,
          variables: getResendTemplateVariables(payload),
        },
      };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `purchase-${payload.transactionId}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const responseBody = await response.text();
    throw new Error(`Resend API error (${response.status}): ${responseBody}`);
  }

  console.log(
    `[email] sent post-purchase email to ${payload.to} · product=${payload.productName} · template=${templateId}`,
  );
}

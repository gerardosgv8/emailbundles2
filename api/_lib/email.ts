import { getEmailFrom, getResendApiKey } from './env';

type DeliveryEmail = {
  to: string;
  productName: string;
  downloadUrl: string;
  transactionId: string;
};

/** Optional — skips silently if RESEND_API_KEY is not set. */
export async function sendDownloadEmail(payload: DeliveryEmail): Promise<boolean> {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    console.log('[email] RESEND_API_KEY not set — skipping delivery email');
    return false;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: getEmailFrom(),
      to: payload.to,
      subject: `Your ${payload.productName} download`,
      html: `
        <p>Thanks for your purchase!</p>
        <p><strong>Product:</strong> ${payload.productName}</p>
        <p><strong>Transaction:</strong> ${payload.transactionId}</p>
        <p><a href="${payload.downloadUrl}">Download your files</a></p>
        <p>This link expires after a limited time. If it stops working, contact support with your receipt email.</p>
      `,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend API error (${response.status}): ${text}`);
  }

  return true;
}

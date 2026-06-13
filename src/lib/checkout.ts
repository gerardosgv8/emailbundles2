/**
 * Calls Vercel serverless checkout API.
 * Set VITE_API_URL in production when frontend is on GitHub Pages.
 */
import { getApiBase } from './apiBase';
import { safeUserMessage } from './apiError';

export { getApiBase };

export function getPurchaseDownloadUrl(sessionId: string): string {
  const params = new URLSearchParams({ session_id: sessionId });
  return `${getApiBase()}/api/download?${params}`;
}

export async function startCheckout(productId: string, email?: string): Promise<string> {
  const response = await fetch(`${getApiBase()}/api/create-checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, email: email?.trim() || undefined }),
  });

  const data = (await response.json()) as { url?: string; error?: string };

  if (!response.ok || !data.url) {
    throw new Error(safeUserMessage(data.error, 'Could not start checkout. Please try again.'));
  }

  return data.url;
}

export type VerifiedPurchase = {
  email: string;
  transactionId: string;
  productId: string;
  productName: string;
  downloadUrl: string;
  emailed: boolean;
};

export async function verifyPurchaseSession(sessionId: string): Promise<VerifiedPurchase> {
  const params = new URLSearchParams({ session_id: sessionId });
  const response = await fetch(`${getApiBase()}/api/verify-session?${params}`);

  const data = (await response.json()) as VerifiedPurchase & { error?: string };

  if (!response.ok || !data.downloadUrl) {
    throw new Error(
      safeUserMessage(
        data.error,
        'We could not prepare your download right now. Try refreshing, or contact support with your receipt.',
      ),
    );
  }

  return data;
}

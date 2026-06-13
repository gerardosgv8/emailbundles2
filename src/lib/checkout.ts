/**
 * Calls Vercel serverless checkout API.
 * Set VITE_API_URL in production when frontend is on GitHub Pages.
 */
const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';

export async function startCheckout(productId: string, email?: string): Promise<string> {
  const response = await fetch(`${API_BASE}/api/create-checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, email: email?.trim() || undefined }),
  });

  const data = (await response.json()) as { url?: string; error?: string };

  if (!response.ok || !data.url) {
    throw new Error(data.error ?? 'Could not start checkout');
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
  const response = await fetch(`${API_BASE}/api/verify-session?${params}`);

  const data = (await response.json()) as VerifiedPurchase & { error?: string };

  if (!response.ok || !data.downloadUrl) {
    throw new Error(data.error ?? 'Could not verify purchase');
  }

  return data;
}

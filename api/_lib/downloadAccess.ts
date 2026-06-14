import type Stripe from 'stripe';
import { getDownloadAccessDays, getMaxDownloadsPerPurchase } from './env.js';
import { getStripe } from './stripe.js';

export type DownloadAccessState = {
  downloadCount: number;
  maxDownloads: number;
  remaining: number;
  purchaseAt: Date;
  expiresAt: Date;
  expired: boolean;
  exhausted: boolean;
};

function parseDownloadCount(metadata: Stripe.Metadata | null | undefined): number {
  const raw = metadata?.download_count?.trim();
  if (!raw) return 0;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function parsePurchaseAt(session: Stripe.Checkout.Session): Date {
  const fromMetadata = session.metadata?.purchase_at?.trim();
  if (fromMetadata) {
    const parsed = new Date(fromMetadata);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  if (session.created) {
    return new Date(session.created * 1000);
  }

  return new Date();
}

export function getDownloadAccessState(session: Stripe.Checkout.Session): DownloadAccessState {
  const maxDownloads = getMaxDownloadsPerPurchase();
  const downloadCount = parseDownloadCount(session.metadata);
  const purchaseAt = parsePurchaseAt(session);
  const expiresAt = new Date(purchaseAt.getTime() + getDownloadAccessDays() * 24 * 60 * 60 * 1000);
  const expired = Date.now() > expiresAt.getTime();
  const remaining = Math.max(0, maxDownloads - downloadCount);

  return {
    downloadCount,
    maxDownloads,
    remaining,
    purchaseAt,
    expiresAt,
    expired,
    exhausted: remaining <= 0,
  };
}

/** Ensures purchase metadata exists for download limits (idempotent). */
export async function ensureDownloadAccessMetadata(session: Stripe.Checkout.Session): Promise<void> {
  if (session.metadata?.purchase_at && session.metadata?.download_count !== undefined) {
    return;
  }

  const stripe = getStripe();
  await stripe.checkout.sessions.update(session.id, {
    metadata: {
      ...session.metadata,
      purchase_at: session.metadata?.purchase_at ?? new Date(session.created * 1000).toISOString(),
      download_count: session.metadata?.download_count ?? '0',
    },
  });
}

export function assertDownloadAllowed(session: Stripe.Checkout.Session): DownloadAccessState {
  const state = getDownloadAccessState(session);

  if (state.expired) {
    throw new Error(
      `Download access expired for session ${session.id} (limit ${getDownloadAccessDays()} days after purchase)`,
    );
  }

  if (state.exhausted) {
    throw new Error(
      `Download limit reached for session ${session.id} (${state.maxDownloads} downloads per purchase)`,
    );
  }

  return state;
}

/** Records one download attempt and returns the updated access state. */
export async function recordDownload(session: Stripe.Checkout.Session): Promise<DownloadAccessState> {
  const state = assertDownloadAllowed(session);
  const stripe = getStripe();
  const nextCount = state.downloadCount + 1;

  await stripe.checkout.sessions.update(session.id, {
    metadata: {
      ...session.metadata,
      purchase_at: state.purchaseAt.toISOString(),
      download_count: String(nextCount),
      last_download_at: new Date().toISOString(),
    },
  });

  return {
    ...state,
    downloadCount: nextCount,
    remaining: Math.max(0, state.maxDownloads - nextCount),
    exhausted: nextCount >= state.maxDownloads,
  };
}

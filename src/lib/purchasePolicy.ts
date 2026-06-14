import { getApiBase } from './apiBase';

export type PurchasePolicy = {
  maxDownloads: number;
  accessDays: number;
};

let cachedPolicy: PurchasePolicy | null = null;

export async function fetchPurchasePolicy(): Promise<PurchasePolicy> {
  if (cachedPolicy) {
    return cachedPolicy;
  }

  const response = await fetch(`${getApiBase()}/api/purchase-policy`);
  const data = (await response.json()) as PurchasePolicy & { error?: string };

  if (!response.ok || !data.maxDownloads || !data.accessDays) {
    throw new Error(data.error ?? 'Could not load purchase policy');
  }

  cachedPolicy = { maxDownloads: data.maxDownloads, accessDays: data.accessDays };
  return cachedPolicy;
}

export function formatAccessExpiry(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString(undefined, { dateStyle: 'medium' });
}

export function describeDownloadPolicy(policy: PurchasePolicy): string {
  const downloadWord = policy.maxDownloads === 1 ? 'download' : 'downloads';
  const dayWord = policy.accessDays === 1 ? 'day' : 'days';
  return `${policy.maxDownloads} ${downloadWord} within ${policy.accessDays} ${dayWord} of purchase`;
}

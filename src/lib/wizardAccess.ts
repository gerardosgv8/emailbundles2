import { getApiBase } from './apiBase';
import {
  isWizardUnlockIssue,
  WizardUnlockIssueError,
  type WizardUnlockIssue,
} from './wizardUnlockIssue';

export const WIZARD_SESSION_STORAGE_KEY = 'mailcraft-wizard-session-v1';

export type WizardSession = {
  token: string;
  expiresAt: string;
  email: string;
  orderId: string;
  productId: string;
  productName?: string;
};

export function readStoredWizardSession(): WizardSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(WIZARD_SESSION_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as WizardSession;
    if (!parsed.token || !parsed.expiresAt || !parsed.email || !parsed.orderId) {
      return null;
    }

    if (Date.parse(parsed.expiresAt) <= Date.now()) {
      window.sessionStorage.removeItem(WIZARD_SESSION_STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function storeWizardSession(session: WizardSession): void {
  window.sessionStorage.setItem(WIZARD_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearWizardSession(): void {
  window.sessionStorage.removeItem(WIZARD_SESSION_STORAGE_KEY);
}

export async function verifyPurchaseCredentials(
  email: string,
  orderId: string,
): Promise<WizardSession> {
  const response = await fetch(`${getApiBase()}/api/verify-purchase`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, orderId }),
  });

  const data = (await response.json()) as WizardSession & Partial<WizardUnlockIssue>;

  if (!response.ok || !data.token) {
    if (isWizardUnlockIssue(data)) {
      throw new WizardUnlockIssueError(data);
    }
    throw new Error(data.error ?? 'We could not verify that purchase.');
  }

  const session: WizardSession = {
    token: data.token,
    expiresAt: data.expiresAt,
    email: data.email,
    orderId: data.orderId,
    productId: data.productId,
    productName: data.productName,
  };

  storeWizardSession(session);
  return session;
}

export async function validateWizardSession(token: string): Promise<WizardSession | null> {
  const response = await fetch(`${getApiBase()}/api/wizard-session`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as WizardSession & { valid?: boolean };
  if (!data.valid || !data.email || !data.orderId) {
    return null;
  }

  return {
    token,
    expiresAt: data.expiresAt,
    email: data.email,
    orderId: data.orderId,
    productId: data.productId,
    productName: data.productName,
  };
}

export type { WizardUnlockIssue } from './wizardUnlockIssue';

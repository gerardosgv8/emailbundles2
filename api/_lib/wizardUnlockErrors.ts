import type { VercelResponse } from '@vercel/node';

export type WizardUnlockIssueCode =
  | 'VERIFY_NOT_FOUND'
  | 'ORDER_REFUNDED'
  | 'ORDER_NOT_PAID'
  | 'TEST_ORDER_LIVE_MODE'
  | 'WRONG_PRODUCT'
  | 'DEVICE_LIMIT'
  | 'RATE_LIMIT_IP'
  | 'RATE_LIMIT_ORDER'
  | 'MISSING_FIELDS'
  | 'SERVER_ERROR';

export type WizardUnlockIssue = {
  title: string;
  error: string;
  code: WizardUnlockIssueCode;
  supportReference: string;
  hint?: string;
};

export function createSupportReference(code: WizardUnlockIssueCode): string {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `MC-${code}-${suffix}`;
}

export function buildWizardUnlockIssue(
  code: WizardUnlockIssueCode,
  partial: Pick<WizardUnlockIssue, 'title' | 'error'> & { hint?: string },
): WizardUnlockIssue {
  return {
    code,
    supportReference: createSupportReference(code),
    ...partial,
  };
}

export function sendWizardUnlockIssue(
  res: VercelResponse,
  status: number,
  issue: WizardUnlockIssue,
): void {
  console.warn('[verify-purchase]', issue.code, issue.supportReference);
  res.status(status).json(issue);
}

export const WIZARD_UNLOCK_ISSUES = {
  verifyNotFound: () =>
    buildWizardUnlockIssue('VERIFY_NOT_FOUND', {
      title: 'Purchase not found',
      error:
        'We could not match that email and order number to a paid Lemon Squeezy order. Check your receipt and try again.',
      hint: 'Use the exact checkout email and the order # or order id from your Lemon Squeezy receipt.',
    }),
  orderRefunded: () =>
    buildWizardUnlockIssue('ORDER_REFUNDED', {
      title: 'Order refunded',
      error: 'This order was refunded, so wizard access is no longer available.',
      hint: 'If you believe this is a mistake, contact us with your support reference below.',
    }),
  orderNotPaid: () =>
    buildWizardUnlockIssue('ORDER_NOT_PAID', {
      title: 'Payment not completed',
      error: 'This order is not marked as paid yet. Wait a few minutes and try again.',
      hint: 'If you were charged but still see this, contact us with your support reference.',
    }),
  testOrderLiveMode: () =>
    buildWizardUnlockIssue('TEST_ORDER_LIVE_MODE', {
      title: 'Test purchase',
      error:
        'This looks like a Lemon Squeezy test-mode order. Test orders cannot unlock wizards while the store is in live mode.',
      hint: 'Complete a live purchase, or ask us if you are still setting up checkout.',
    }),
  wrongProduct: () =>
    buildWizardUnlockIssue('WRONG_PRODUCT', {
      title: 'Different product',
      error: 'This order does not include the Email Marketing Starter Kit.',
      hint: 'Unlock requires a Starter Kit purchase. Contact us if your receipt shows the wrong product.',
    }),
  deviceLimit: (maxDevices: number) =>
    buildWizardUnlockIssue('DEVICE_LIMIT', {
      title: 'Device limit reached',
      error: `This purchase is already active on the maximum number of devices (${maxDevices}).`,
      hint: 'Try again from a browser you used before, or contact us with the support reference if you are the buyer and keep seeing this.',
    }),
  rateLimitIp: () =>
    buildWizardUnlockIssue('RATE_LIMIT_IP', {
      title: 'Too many attempts',
      error: 'Too many unlock attempts from your network. Please wait about an hour and try again.',
      hint: 'This protects your receipt from guessing attacks. If you need help sooner, contact us with the reference below.',
    }),
  rateLimitOrder: () =>
    buildWizardUnlockIssue('RATE_LIMIT_ORDER', {
      title: 'Too many attempts for this order',
      error: 'Too many unlock attempts for this order number. Please wait about an hour and try again.',
      hint: 'If you are the buyer and keep seeing this, contact us with your support reference.',
    }),
  missingFields: () =>
    buildWizardUnlockIssue('MISSING_FIELDS', {
      title: 'Missing information',
      error: 'Email and order number are both required.',
    }),
  serverError: () =>
    buildWizardUnlockIssue('SERVER_ERROR', {
      title: 'Temporary problem',
      error: 'We could not verify your purchase right now. Please try again in a few minutes.',
      hint: 'If this keeps happening, contact us with your support reference.',
    }),
} as const;

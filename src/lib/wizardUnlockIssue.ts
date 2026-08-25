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

export class WizardUnlockIssueError extends Error {
  readonly issue: WizardUnlockIssue;

  constructor(issue: WizardUnlockIssue) {
    super(issue.error);
    this.name = 'WizardUnlockIssueError';
    this.issue = issue;
  }
}

export function isWizardUnlockIssue(value: unknown): value is WizardUnlockIssue {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const issue = value as WizardUnlockIssue;
  return (
    typeof issue.title === 'string' &&
    typeof issue.error === 'string' &&
    typeof issue.code === 'string' &&
    typeof issue.supportReference === 'string'
  );
}

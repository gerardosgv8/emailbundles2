/** Last line of defense — never show config/env details in the UI. */

const BLOCKED = [
  /missing environment variable/i,
  /STRIPE_|R2_|whsec_|sk_test_|sk_live_/i,
  /env var in vercel/i,
  /ECONNREFUSED|ENOTFOUND/i,
];

export function safeUserMessage(error: string | undefined, fallback: string): string {
  if (!error?.trim()) {
    return fallback;
  }

  if (BLOCKED.some((pattern) => pattern.test(error))) {
    return fallback;
  }

  if (error.length > 200) {
    return fallback;
  }

  return error;
}

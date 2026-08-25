/** Maps internal/API errors to safe messages for browsers (never expose env/config details). */

const INTERNAL_PATTERNS = [
  /^Missing environment variable:/i,
  /LEMONSQUEEZY_API_KEY|LEMONSQUEEZY_API_KEY_LIVE|WIZARD_SESSION_SECRET/i,
  /Add the env var in Vercel/i,
  /ECONNREFUSED|ENOTFOUND|getaddrinfo/i,
];

export function toClientErrorMessage(err: unknown, fallback: string): string {
  if (!(err instanceof Error)) {
    return fallback;
  }

  const message = err.message.trim();
  if (!message) {
    return fallback;
  }

  if (INTERNAL_PATTERNS.some((pattern) => pattern.test(message))) {
    return fallback;
  }

  if (message.length > 160 || message.includes(' at ') || message.includes('Error:')) {
    return fallback;
  }

  return message;
}

/**
 * Resolves the Vercel API origin for checkout, verify-session, and downloads.
 *
 * Priority:
 * 1. VITE_API_URL at build time (.env.production or deploy command)
 * 2. GitHub Pages runtime fallback (when env was missing from an older build)
 * 3. Empty string in dev (Vite proxies /api → localhost:3000)
 */
const PRODUCTION_API_URL = 'https://emailbundles2.vercel.app';

export function getApiBase(): string {
  const fromEnv = (import.meta.env.VITE_API_URL as string | undefined)?.trim().replace(/\/$/, '');
  if (fromEnv) {
    return fromEnv;
  }

  if (import.meta.env.PROD && typeof window !== 'undefined') {
    const { hostname } = window.location;
    if (hostname.endsWith('.github.io') || hostname.endsWith('.github.dev')) {
      return PRODUCTION_API_URL;
    }
  }

  return '';
}

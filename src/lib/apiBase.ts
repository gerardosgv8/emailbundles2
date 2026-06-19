/**
 * Resolves the Vercel API origin for checkout, verify-session, and downloads.
 *
 * Priority:
 * 1. VITE_API_URL at build time (.env.production, .env.development, or deploy command)
 * 2. GitHub Pages runtime fallback (when env was missing from an older build)
 * 3. Local Vite dev → deployed Vercel API (no `vercel dev` required for frontend work)
 * 4. Empty string only when none of the above apply
 */
const PRODUCTION_API_URL = 'https://emailbundles2.vercel.app';

export function getApiBase(): string {
  const fromEnv = (import.meta.env.VITE_API_URL as string | undefined)?.trim().replace(/\/$/, '');
  if (fromEnv) {
    return fromEnv;
  }

  if (typeof window !== 'undefined') {
    const { hostname } = window.location;

    if (hostname.endsWith('.github.io') || hostname.endsWith('.github.dev')) {
      return PRODUCTION_API_URL;
    }

    if (import.meta.env.DEV && (hostname === 'localhost' || hostname === '127.0.0.1')) {
      return PRODUCTION_API_URL;
    }
  }

  return '';
}

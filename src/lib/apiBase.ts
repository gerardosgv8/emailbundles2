/**
 * Resolves the Vercel API origin for storefront API calls.
 */
const PRODUCTION_API_URL = 'https://emailbundles2.vercel.app';

export function getApiBase(): string {
  const fromEnv = (import.meta.env.VITE_API_URL as string | undefined)?.trim().replace(/\/$/, '');
  if (fromEnv) {
    return fromEnv;
  }

  if (typeof window !== 'undefined') {
    const { hostname } = window.location;

    if (
      hostname === 'mailcraft.studio' ||
      hostname === 'www.mailcraft.studio' ||
      hostname.endsWith('.github.io') ||
      hostname.endsWith('.github.dev')
    ) {
      return PRODUCTION_API_URL;
    }

    if (import.meta.env.DEV && (hostname === 'localhost' || hostname === '127.0.0.1')) {
      return PRODUCTION_API_URL;
    }
  }

  return '';
}

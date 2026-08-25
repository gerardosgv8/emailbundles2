/** Public support inbox shown on the Contact page and related CTAs. */
export const SUPPORT_EMAIL = 'hello@mailcraft.studio';

export function supportMailto(subject = 'Mailcraft Studio'): string {
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

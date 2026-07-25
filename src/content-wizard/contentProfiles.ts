/** Profiles skipped by the content wizard (styling, wrappers, icons, surfaces). */
export const CONTENT_SKIP_PROFILES = new Set([
  'CTA_PRIMARY_TD',
  'CTA_SECONDARY_TD',
  'FOOTER_ICON',
  'BADGE_EVENT',
  'BADGE_STEP',
  'BADGE_FEATURE',
  'SURFACE_LIGHT',
  'SURFACE_INFO',
  'SURFACE_WARNING',
]);

export function isContentEditableProfile(profile: string): boolean {
  return !CONTENT_SKIP_PROFILES.has(profile);
}

export function profileToContentKind(profile: string): import('./types').ContentFieldKind | null {
  if (CONTENT_SKIP_PROFILES.has(profile)) return null;

  if (profile.startsWith('HEADING')) return 'text';

  if (
    profile.startsWith('BODY') ||
    profile === 'TIER_TEXT' ||
    profile === 'PROMO_HEADING' ||
    profile === 'FOOTER_COMPANY' ||
    profile === 'FOOTER_ADDRESS' ||
    profile === 'FOOTER_TAGLINE' ||
    profile === 'FOOTER_COPYRIGHT' ||
    profile === 'FOOTER_CONTACT'
  ) {
    return 'rich';
  }

  if (profile === 'CTA_PRIMARY' || profile === 'CTA_SECONDARY') return 'cta';
  if (profile === 'LINK_PRODUCT' || profile === 'FOOTER_LINK' || profile === 'FOOTER_SOCIAL') return 'link';
  if (profile === 'IMAGE_HERO' || profile === 'IMAGE_PRODUCT' || profile === 'LOGO') return 'image';

  return null;
}

export function humanizeElementId(id: string): string {
  return id
    .split('-')
    .map((part) => (/^\d+$/.test(part) ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function sectionForElement(id: string): string {
  if (id === 'logo') return 'Header';
  if (id.startsWith('header-')) return 'Header';
  if (
    id.startsWith('launch-') ||
    id.startsWith('hero-') ||
    id.startsWith('overview-') ||
    id.startsWith('welcome-') ||
    id.startsWith('sale-hero-')
  ) {
    return 'Hero';
  }
  if (id.startsWith('feature-') || id.startsWith('step-')) return 'Features';
  if (id.startsWith('getting-started-')) return 'Getting started';
  if (
    id.startsWith('product-') ||
    id.startsWith('grid-product-') ||
    id.startsWith('arrival-') ||
    id.startsWith('deal-') ||
    id.startsWith('topic-') ||
    id.startsWith('quick-') ||
    id.startsWith('trending-') ||
    id.startsWith('recommendation')
  ) {
    return 'Products';
  }
  if (id.startsWith('event-') || id.startsWith('speaker-')) return 'Event';
  if (id.startsWith('pricing-')) return 'Pricing';
  if (id.startsWith('promo-')) return 'Promotion';
  if (id.startsWith('order-') || id.startsWith('checkout-') || id.startsWith('survey-')) return 'Details';
  if (id.includes('cta') || id.endsWith('-cta')) return 'Calls to action';
  if (id.startsWith('footer-')) return 'Footer';
  return 'General';
}

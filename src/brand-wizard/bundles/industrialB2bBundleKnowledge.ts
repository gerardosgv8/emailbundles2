import {
  INDUSTRIAL_B2B_ELEMENT_REGISTRY,
  INDUSTRIAL_B2B_ELEMENTS_BY_TEMPLATE,
  INDUSTRIAL_B2B_PROFILE_BY_ELEMENT,
  INDUSTRIAL_B2B_TEMPLATE_FILES,
  type BundleElementEntry,
  type ElementApplyProfile,
  type IndustrialB2bTemplateFile,
} from '../apply/industrialB2bElementRegistry';

export type IndustrialB2bTemplateInfo = {
  file: IndustrialB2bTemplateFile;
  id: string;
  name: string;
  elementCount: number;
};

/** Human-readable catalog aligned with FinalBundles/Industrial B2B Bundle. */
const TEMPLATE_CATALOG: Omit<IndustrialB2bTemplateInfo, 'elementCount'>[] = [
  { file: '01_Product_Launch.html', id: '01-product-launch', name: 'Product Launch' },
  { file: '02_Product_Update.html', id: '02-product-update', name: 'Product Update' },
  { file: '03_Products_Horizontal.html', id: '03-products-horizontal', name: 'Products Horizontal' },
  { file: '04_Products_Catalog_Grid.html', id: '04-products-catalog-grid', name: 'Products Catalog Grid' },
  { file: '05_Event_Invitation.html', id: '05-event-invitation', name: 'Event Invitation' },
  { file: '06_Service_Launch.html', id: '06-service-launch', name: 'Service Launch' },
  { file: '07_Product_Enablement_Guide.html', id: '07-product-enablement-guide', name: 'Product Enablement Guide' },
  { file: '08_Promotion.html', id: '08-promotion', name: 'Promotion' },
  { file: '09_Company_Update.html', id: '09-company-update', name: 'Company Update' },
];

export const INDUSTRIAL_B2B_TEMPLATES: IndustrialB2bTemplateInfo[] = TEMPLATE_CATALOG.map((template) => ({
  ...template,
  elementCount: INDUSTRIAL_B2B_ELEMENTS_BY_TEMPLATE[template.file]?.length ?? 0,
}));

/** Maps wizard design tokens to data-element hooks (and special passes). */
export const INDUSTRIAL_B2B_TOKEN_ELEMENTS: Partial<Record<string, string[]>> = {
  brandName: ['footer-company-name'],
  footerCompany: ['footer-company-name'],
  tagline: ['header-kicker'],
  footerTrustLine: ['footer-tagline'],
  footerTagline: ['footer-tagline'],
  copyrightNote: ['footer-copyright'],
  logoUrl: ['logo', 'header-logo'],
  logoAlt: ['logo', 'header-logo'],
  logoWidth: ['logo', 'header-logo'],
  logoHeight: ['logo', 'header-logo'],
  colorHeaderKicker: ['header-kicker', 'header-title'],
  colorHeadingDark: INDUSTRIAL_B2B_ELEMENT_REGISTRY.filter((e) =>
    ['HEADING_SECTION', 'HEADING_FEATURE', 'HEADING_STEP'].includes(e.profile),
  ).map((e) => e.id),
  colorHeadingAlt: ['launch-title', 'hero-title', 'promo-title', 'event-title', 'overview-heading', 'featured-title'],
  colorBody: INDUSTRIAL_B2B_ELEMENT_REGISTRY.filter((e) => e.profile === 'BODY').map((e) => e.id),
  colorBodyAlt: INDUSTRIAL_B2B_ELEMENT_REGISTRY.filter((e) => e.profile === 'BODY_SUBTITLE').map((e) => e.id),
  colorMuted: INDUSTRIAL_B2B_ELEMENT_REGISTRY.filter((e) => e.profile === 'BODY_MUTED').map((e) => e.id),
  colorAccent: ['tier-1', 'tier-2', 'tier-3'],
  colorBgEmail: ['email-surface'],
  colorBgLightGray: ['pricing-container', 'tier-1', 'tier-2', 'tier-3'],
  colorBgInfo: ['featured-insight-container', 'guide-download'],
  colorBgService: ['pricing-title'],
  colorBgPromoDark: ['promo-cta-heading'],
  colorBgWarning: ['important-note-container'],
  colorBgWarningText: ['important-note'],
  colorBgUrgency: ['urgency-note', 'promo-expiry'],
  colorBgUrgencyText: ['urgency-note', 'promo-expiry'],
  colorBadgeEventBg: INDUSTRIAL_B2B_ELEMENT_REGISTRY.filter((e) =>
    ['BADGE_EVENT', 'BADGE_FEATURE'].includes(e.profile),
  ).map((e) => e.id),
  colorBadgeEventText: INDUSTRIAL_B2B_ELEMENT_REGISTRY.filter((e) =>
    ['BADGE_EVENT', 'BADGE_FEATURE'].includes(e.profile),
  ).map((e) => e.id),
  colorBadgeStepBg: INDUSTRIAL_B2B_ELEMENT_REGISTRY.filter((e) => e.profile === 'BADGE_STEP').map((e) => e.id),
  colorBadgeStepText: INDUSTRIAL_B2B_ELEMENT_REGISTRY.filter((e) => e.profile === 'BADGE_STEP').map((e) => e.id),
  colorPromoHighlight: ['promo-cta-heading'],
  btnPrimaryBg: [
    'cta-primary',
    'cta-primary-button',
    'hero-cta',
    'hero-cta-button',
    'primary-cta',
    'primary-cta-button',
    'featured-cta',
    'featured-cta-button',
    'pricing-cta',
    'pricing-cta-button',
    'promo-cta',
    'promo-cta-button',
  ],
  btnPrimaryText: [
    'cta-primary',
    'hero-cta',
    'primary-cta',
    'featured-cta',
    'pricing-cta',
    'promo-cta',
  ],
  btnSecondaryBg: ['cta-secondary', 'cta-secondary-button', 'secondary-cta', 'secondary-cta-button'],
  btnSecondaryText: ['cta-secondary', 'secondary-cta'],
  btnSecondaryBorder: ['cta-secondary', 'cta-secondary-button', 'secondary-cta', 'secondary-cta-button'],
  linkColor: INDUSTRIAL_B2B_ELEMENT_REGISTRY.filter((e) => e.profile === 'LINK_PRODUCT').map((e) => e.id),
  urlBase: [
    'cta-primary',
    'hero-cta',
    'primary-cta',
    'featured-cta',
    'pricing-cta',
    'promo-cta',
  ],
  fontStack: ['font-stack'],
  footerAddress1: ['footer-address'],
  footerAddress2: ['footer-address'],
  footerCountry: ['footer-address'],
  footerEmail: ['footer-contact'],
  footerTextColor: ['footer-address', 'footer-tagline', 'footer-contact', 'footer-copyright'],
  footerHeadingColor: ['footer-company-name'],
  footerLinkColor: [
    'footer-link-privacy',
    'footer-link-terms',
    'footer-link-help',
    'footer-link-unsubscribe',
    'footer-social-facebook',
    'footer-social-twitter',
    'footer-social-instagram',
    'footer-social-linkedin',
    'footer-contact',
  ],
  socialFacebook: ['footer-social-facebook'],
  socialTwitter: ['footer-social-twitter'],
  socialInstagram: ['footer-social-instagram'],
  socialLinkedin: ['footer-social-linkedin'],
  linkPrivacy: ['footer-link-privacy'],
  linkTerms: ['footer-link-terms'],
  linkHelp: ['footer-link-help'],
  linkUnsubscribe: ['footer-link-unsubscribe'],
  layoutRadiusHero: ['hero-image', 'hero-product-image', 'featured-image'],
  layoutRadiusGrid: INDUSTRIAL_B2B_ELEMENT_REGISTRY.filter((e) => e.profile === 'IMAGE_PRODUCT').map((e) => e.id),
};

export function getIndustrialB2bElement(id: string): BundleElementEntry | undefined {
  return INDUSTRIAL_B2B_ELEMENT_REGISTRY.find((entry) => entry.id === id);
}

export function getIndustrialB2bProfile(id: string): ElementApplyProfile | undefined {
  return INDUSTRIAL_B2B_PROFILE_BY_ELEMENT[id];
}

export function getIndustrialB2bElementsForTemplate(file: IndustrialB2bTemplateFile): string[] {
  return INDUSTRIAL_B2B_ELEMENTS_BY_TEMPLATE[file] ?? [];
}

export function getIndustrialB2bElementsForToken(token: string): string[] {
  return INDUSTRIAL_B2B_TOKEN_ELEMENTS[token] ?? [];
}

export const INDUSTRIAL_B2B_TOTAL_ELEMENTS = INDUSTRIAL_B2B_ELEMENT_REGISTRY.length;
export const INDUSTRIAL_B2B_TOTAL_TEMPLATES = INDUSTRIAL_B2B_TEMPLATE_FILES.length;

import {
  EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY,
  EMAIL_MARKETING_STARTER_KIT_ELEMENTS_BY_TEMPLATE,
  EMAIL_MARKETING_STARTER_KIT_PROFILE_BY_ELEMENT,
  EMAIL_MARKETING_STARTER_KIT_TEMPLATE_FILES,
  type ElementApplyProfile,
  type EmailMarketingStarterKitTemplateFile,
  type StarterKitElementEntry,
} from '../apply/emailMarketingStarterKitElementRegistry';

export type StarterKitTemplateInfo = {
  file: EmailMarketingStarterKitTemplateFile;
  id: string;
  name: string;
  elementCount: number;
};

/** Human-readable catalog aligned with FinalBundles/EmailMarketing_StarterKit. */
const TEMPLATE_CATALOG: Omit<StarterKitTemplateInfo, 'elementCount'>[] = [
  { file: 'Welcome_&_Onboarding (3).html', id: 'welcome-onboarding', name: 'Welcome & Onboarding' },
  { file: 'Order_Confirmation_Email (5).html', id: 'order-confirmation', name: 'Order Confirmation' },
  { file: 'Checkout_Abandonment_Email (7).html', id: 'checkout-abandonment', name: 'Checkout Abandonment' },
  { file: 'Back_in_Stock_Notification (3).html', id: 'back-in-stock', name: 'Back in Stock' },
  { file: 'Product_Launch (2).html', id: 'product-launch', name: 'Product Launch' },
  { file: 'Promotional_Campaign (4).html', id: 'promotional-campaign', name: 'Promotional Campaign' },
  {
    file: 'Product_Recommendations_(Horizontal) (4).html',
    id: 'product-recommendations-horizontal',
    name: 'Product Recommendations (Horizontal)',
  },
  {
    file: 'Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html',
    id: 'product-recommendations-grid',
    name: 'Product Recommendations (Grid)',
  },
  { file: 'Feature_Announcement (4).html', id: 'feature-announcement', name: 'Feature Announcement' },
  { file: 'Newsletter_Editorial (5).html', id: 'newsletter-editorial', name: 'Newsletter Editorial' },
  { file: 'Survey_&_Feedback (2).html', id: 'survey-feedback', name: 'Survey & Feedback' },
];

export const EMAIL_MARKETING_STARTER_KIT_TEMPLATES: StarterKitTemplateInfo[] = TEMPLATE_CATALOG.map((template) => ({
  ...template,
  elementCount: EMAIL_MARKETING_STARTER_KIT_ELEMENTS_BY_TEMPLATE[template.file]?.length ?? 0,
}));

/** Maps wizard design tokens to data-element hooks (and special passes). */
export const EMAIL_MARKETING_STARTER_KIT_TOKEN_ELEMENTS: Partial<Record<string, string[]>> = {
  brandName: ['footer-company-name'],
  footerCompany: ['footer-company-name'],
  tagline: ['header-kicker', 'header-tagline', 'header-title'],
  footerTrustLine: ['footer-tagline'],
  footerTagline: ['footer-tagline'],
  copyrightNote: ['footer-copyright'],
  logoUrl: ['logo', 'header-logo'],
  logoAlt: ['logo', 'header-logo'],
  logoWidth: ['logo', 'header-logo'],
  logoHeight: ['logo', 'header-logo'],
  colorHeaderKicker: ['header-kicker', 'header-title', 'header-main-title', 'header-tagline'],
  colorHeadingDark: EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.filter((e) =>
    ['HEADING_SECTION', 'HEADING_FEATURE', 'HEADING_STEP'].includes(e.profile),
  ).map((e) => e.id),
  colorHeadingAlt: [
    'launch-title',
    'hero-title',
    'hero-heading',
    'featured-title',
    'overview-heading',
    'sale-hero-heading',
    'checkout-cta-heading',
    'recommendations-heading',
    'trending-heading',
    'quick-heading',
    'getting-started-heading',
    'pricing-title',
    'product-title',
    'pricing-main',
  ],
  colorBody: EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.filter((e) => e.profile === 'BODY').map((e) => e.id),
  colorBodyAlt: EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.filter((e) => e.profile === 'BODY_SUBTITLE').map(
    (e) => e.id,
  ),
  colorMuted: EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.filter((e) => e.profile === 'BODY_MUTED').map((e) => e.id),
  colorAccent: EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.filter((e) => e.profile === 'BADGE_STEP').map((e) => e.id),
  colorBgEmail: ['email-surface'],
  colorBgLightGray: ['pricing-container', 'order-total-container', 'order-total-container-td'],
  colorBgInfo: ['featured-insight-container', 'support-container'],
  colorBgPromoDark: ['header-sale-banner'],
  colorBgWarning: ['limited-stock-container'],
  colorBgWarningText: ['featured-insight'],
  colorBgUrgency: ['limited-stock-container', 'urgency-note'],
  colorBgUrgencyText: ['urgency-note', 'limited-stock-message'],
  colorBadgeEventBg: EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.filter((e) =>
    ['BADGE_EVENT', 'BADGE_FEATURE'].includes(e.profile),
  ).map((e) => e.id),
  colorBadgeEventText: EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.filter((e) =>
    ['BADGE_EVENT', 'BADGE_FEATURE'].includes(e.profile),
  ).map((e) => e.id),
  colorBadgeStepBg: EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.filter((e) => e.profile === 'BADGE_STEP').map(
    (e) => e.id,
  ),
  colorBadgeStepText: EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.filter((e) => e.profile === 'BADGE_STEP').map(
    (e) => e.id,
  ),
  colorPromoHighlight: ['header-sale-banner'],
  btnPrimaryBg: [
    'cta-primary',
    'cta-primary-button',
    'primary-cta',
    'primary-cta-button',
    'featured-cta',
    'featured-cta-button',
    'pricing-cta',
    'pricing-cta-button',
    'checkout-button',
    'cta-track-order',
    'cta-view-details',
    'survey-cta',
    'view-all-cta',
  ],
  btnPrimaryText: [
    'cta-primary',
    'primary-cta',
    'featured-cta',
    'pricing-cta',
    'checkout-button',
    'cta-track-order',
    'cta-view-details',
    'survey-cta',
    'view-all-cta',
  ],
  btnSecondaryBg: ['cta-secondary', 'cta-secondary-button'],
  btnSecondaryText: ['cta-secondary'],
  btnSecondaryBorder: ['cta-secondary', 'cta-secondary-button'],
  linkColor: EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.filter((e) => e.profile === 'LINK_PRODUCT').map(
    (e) => e.id,
  ),
  urlBase: [
    'cta-primary',
    'primary-cta',
    'featured-cta',
    'pricing-cta',
    'checkout-button',
    'cta-track-order',
    'cta-view-details',
    'survey-cta',
    'view-all-cta',
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
    'contact-support-link',
  ],
  socialFacebook: ['footer-social-facebook'],
  socialTwitter: ['footer-social-twitter'],
  socialInstagram: ['footer-social-instagram'],
  socialLinkedin: ['footer-social-linkedin'],
  linkPrivacy: ['footer-link-privacy'],
  linkTerms: ['footer-link-terms'],
  linkHelp: ['footer-link-help'],
  linkUnsubscribe: ['footer-link-unsubscribe'],
  layoutRadiusHero: ['hero-image'],
  layoutRadiusGrid: EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.filter((e) => e.profile === 'IMAGE_PRODUCT').map(
    (e) => e.id,
  ),
};

export function getEmailMarketingStarterKitElement(id: string): StarterKitElementEntry | undefined {
  return EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.find((entry) => entry.id === id);
}

export function getEmailMarketingStarterKitProfile(id: string): ElementApplyProfile | undefined {
  return EMAIL_MARKETING_STARTER_KIT_PROFILE_BY_ELEMENT[id];
}

export function getEmailMarketingStarterKitElementsForTemplate(
  file: EmailMarketingStarterKitTemplateFile,
): string[] {
  return EMAIL_MARKETING_STARTER_KIT_ELEMENTS_BY_TEMPLATE[file] ?? [];
}

export function getEmailMarketingStarterKitElementsForToken(token: string): string[] {
  return EMAIL_MARKETING_STARTER_KIT_TOKEN_ELEMENTS[token] ?? [];
}

export const EMAIL_MARKETING_STARTER_KIT_TOTAL_ELEMENTS = EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.length;
export const EMAIL_MARKETING_STARTER_KIT_TOTAL_TEMPLATES = EMAIL_MARKETING_STARTER_KIT_TEMPLATE_FILES.length;

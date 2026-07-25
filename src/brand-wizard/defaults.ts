import type { DesignRulesState, WizardStep } from './types';

const STORAGE_KEY = 'mailcraft-studio-design-rules-v2';

export function getStorageKey(bundleId: string): string {
  return `${STORAGE_KEY}-${bundleId}`;
}

export const WIZARD_STEPS: WizardStep[] = [
  { id: 'brand', title: 'Brand identity', desc: 'Company name, taglines, and sender details' },
  { id: 'logo', title: 'Logo', desc: 'Logo URL, dimensions, and alt text' },
  { id: 'colors-core', title: 'Core colors', desc: 'Primary, secondary, and accent palette' },
  { id: 'colors-text', title: 'Text colors', desc: 'Headings, body, and muted text' },
  { id: 'colors-bg', title: 'Surfaces', desc: 'Backgrounds, sections, and dividers' },
  { id: 'colors-badge', title: 'Badges', desc: 'Event icons, steps, and promo highlights' },
  { id: 'buttons', title: 'Buttons & CTAs', desc: 'Primary, secondary, and link styles' },
  { id: 'typography', title: 'Typography', desc: 'Font stack and type scale' },
  { id: 'footer', title: 'Footer', desc: 'Address, social, and legal links' },
  { id: 'layout', title: 'Layout & spacing', desc: 'Width, padding, and radii' },
  { id: 'imagery', title: 'Imagery', desc: 'Image sizes and asset URLs' },
  { id: 'export', title: 'Review & export', desc: 'Checklist and download Design Rules' },
];

const SHARED_CHECKLIST_PREFIX = [
  'Logo URL loads over HTTPS',
  'Primary and secondary button colors meet contrast requirements',
  'Footer includes physical mailing address (CAN-SPAM)',
  'Unsubscribe link uses your ESP merge tag',
  'Support email is monitored',
  'Social and legal URLs are correct (or hidden if unused)',
] as const;

export const CHECKLIST_ITEMS = [
  ...SHARED_CHECKLIST_PREFIX,
  'Spot-check all 9 templates after applying brand changes',
];

export function getWizardSteps(bundleId: string): WizardStep[] {
  return WIZARD_STEPS.map((step) => {
    if (bundleId !== 'email-marketing-starter-kit' || step.id !== 'colors-badge') {
      return step;
    }
    return {
      ...step,
      title: 'Step badges',
      desc: 'Onboarding step numbers in Welcome & Onboarding',
    };
  });
}

export function getChecklistItems(bundleId: string): string[] {
  const templateLine =
    bundleId === 'email-marketing-starter-kit'
      ? 'Spot-check all 11 templates after applying brand changes'
      : 'Spot-check all 9 templates after applying brand changes';

  return [...SHARED_CHECKLIST_PREFIX, templateLine];
}

/** Colors and layout tokens shared across FinalBundles HTML templates. */
const SHARED_TEMPLATE_TOKENS: Omit<
  DesignRulesState,
  | 'checklist'
  | 'brandName'
  | 'legalName'
  | 'tagline'
  | 'footerTrustLine'
  | 'copyrightNote'
  | 'fromName'
  | 'replyToEmail'
  | 'logoUrl'
  | 'logoAlt'
  | 'logoWidth'
  | 'logoHeight'
  | 'logoDarkUrl'
  | 'faviconUrl'
  | 'footerCompany'
  | 'footerAddress1'
  | 'footerAddress2'
  | 'footerCountry'
  | 'footerEmail'
  | 'footerPhone'
  | 'footerTagline'
  | 'socialFacebook'
  | 'socialTwitter'
  | 'socialInstagram'
  | 'socialLinkedin'
  | 'linkPrivacy'
  | 'linkTerms'
  | 'linkHelp'
  | 'linkUnsubscribe'
  | 'urlBase'
  | 'urlQuote'
  | 'urlSupport'
  | 'imgHeroDefault'
  | 'imgCdnBase'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'colorAccent'
  | 'colorHeadingAlt'
  | 'colorBgLightGray'
  | 'colorBgInfo'
  | 'colorBgService'
  | 'colorBgServiceBorder'
  | 'colorBgWarningText'
  | 'colorBadgeEventBg'
  | 'colorBadgeEventText'
  | 'colorBadgeStepBg'
  | 'colorBadgeStepText'
  | 'btnPrimaryBg'
  | 'btnPrimaryText'
  | 'btnSecondaryBg'
  | 'btnSecondaryText'
  | 'btnSecondaryBorder'
  | 'btnPricingBg'
  | 'btnPromoBg'
  | 'linkColor'
  | 'footerHeadingColor'
  | 'footerLinkColor'
  | 'btnPrimaryPadding'
> = {
  colorHeadingDark: '#1f2937',
  colorHeaderKicker: '#1a1a1a',
  colorBody: '#666666',
  colorBodyAlt: '#6b7280',
  colorMuted: '#64748b',
  colorBgEmail: '#ffffff',
  colorBgPromoDark: '#1e293b',
  colorBgWarning: '#fef3c7',
  colorBgWarningBorder: '#fbbf24',
  colorBgUrgency: '#fef2f2',
  colorBgUrgencyBorder: '#fecaca',
  colorBgUrgencyText: '#dc2626',
  colorDivider: '#e5e5e5',
  colorFooterDivider: '#e2e8f0',
  colorPromoHighlight: '#fbbf24',
  btnPrimaryRadius: '8px',
  btnPricingText: '#ffffff',
  btnPromoText: '#ffffff',
  fontStack: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontCustomUrl: '',
  fontCustomName: '',
  footerTextColor: '#64748b',
  layoutMaxWidth: '600px',
  layoutOuterPadding: '20px 0',
  layoutSectionPadding: '40px 30px',
  layoutHorizontalPadding: '30px',
  layoutSpacerStandard: '24px',
  layoutSpacerLarge: '32-40px',
  layoutRadiusButtons: '8px',
  layoutRadiusHero: '12px',
  layoutRadiusGrid: '8px',
  imgHeroWidth: '600px (full bleed)',
  imgFeaturedWidth: '540px max',
  imgGridSize: '250 × 150px',
  imgThumbSize: '150 × 150px',
  imgHeroAspect: '3:2 or 16:9 landscape',
  darkBgOverride: '',
  darkTextOverride: '',
  contrastTarget: '4.5:1 (body text)',
};

function createIndustrialDefaults(): Omit<DesignRulesState, 'checklist'> {
  return {
    ...SHARED_TEMPLATE_TOKENS,
    brandName: '',
    legalName: '',
    tagline: '',
    footerTrustLine: '',
    copyrightNote: '',
    fromName: '',
    replyToEmail: '',
    logoUrl: '',
    logoAlt: '',
    logoWidth: '180px',
    logoHeight: 'auto',
    logoDarkUrl: '',
    faviconUrl: '',
    colorPrimary: '#000000',
    colorSecondary: '#2563eb',
    colorAccent: '#ea580c',
    colorHeadingAlt: '#1e293b',
    colorBgLightGray: '#f8fafc',
    colorBgInfo: '#e0e7ff',
    colorBgService: '#f0f9ff',
    colorBgServiceBorder: '#bae6fd',
    colorBgWarningText: '#92400e',
    colorBadgeEventBg: '#e0e7ff',
    colorBadgeEventText: '#1e40af',
    colorBadgeStepBg: '#fff7ed',
    colorBadgeStepText: '#ea580c',
    btnPrimaryBg: '#000000',
    btnPrimaryText: '#ffffff',
    btnPrimaryPadding: '16px 32px',
    btnSecondaryBg: '#ffffff',
    btnSecondaryText: '#000000',
    btnSecondaryBorder: '#000000',
    btnPricingBg: '#000000',
    btnPromoBg: '#000000',
    linkColor: '#1f2937',
    urlBase: '',
    urlQuote: '',
    urlSupport: '',
    footerCompany: '',
    footerAddress1: '',
    footerAddress2: '',
    footerCountry: '',
    footerEmail: '',
    footerPhone: '',
    footerTagline: '',
    footerHeadingColor: '#1e293b',
    footerLinkColor: '#2563eb',
    socialFacebook: '',
    socialTwitter: '',
    socialInstagram: '',
    socialLinkedin: '',
    linkPrivacy: '',
    linkTerms: '',
    linkHelp: '',
    linkUnsubscribe: '{{unsubscribe_url}}',
    imgGridSize: '250 × 150px',
    imgThumbSize: '150 × 150px',
    imgHeroDefault: '',
    imgCdnBase: '',
  };
}

function createStarterKitDefaults(): Omit<DesignRulesState, 'checklist'> {
  return {
    ...SHARED_TEMPLATE_TOKENS,
    brandName: '',
    legalName: '',
    tagline: '',
    footerTrustLine: '',
    copyrightNote: '',
    fromName: '',
    replyToEmail: '',
    logoUrl: '',
    logoAlt: '',
    logoWidth: '160px',
    logoHeight: 'auto',
    logoDarkUrl: '',
    faviconUrl: '',
    colorPrimary: '#2563eb',
    colorSecondary: '#2563eb',
    colorAccent: '#2563eb',
    colorHeadingAlt: '#1f2937',
    colorBody: '#64748b',
    colorBodyAlt: '#666666',
    colorMuted: '#1f2937',
    colorBgLightGray: '#f1f5f9',
    colorBgInfo: '#e0e7ff',
    colorBgService: '#f1f5f9',
    colorBgServiceBorder: '#e2e8f0',
    colorBgWarningText: '#1f2937',
    colorBgUrgency: '#fef2f2',
    colorBadgeEventBg: '#e6e6e6',
    colorBadgeEventText: '#1e293b',
    colorBadgeStepBg: '#2563eb',
    colorBadgeStepText: '#ffffff',
    btnPrimaryBg: '#2563eb',
    btnPrimaryText: '#ffffff',
    btnPrimaryPadding: '14px 28px',
    btnSecondaryBg: '#ffffff',
    btnSecondaryText: '#2563eb',
    btnSecondaryBorder: '#2563eb',
    btnPricingBg: '#1a1a1a',
    btnPromoBg: '#1e40af',
    linkColor: '#2563eb',
    urlBase: '',
    urlQuote: '',
    urlSupport: '',
    footerCompany: '',
    footerAddress1: '',
    footerAddress2: '',
    footerCountry: '',
    footerEmail: '',
    footerPhone: '',
    footerTagline: '',
    footerHeadingColor: '#1e293b',
    footerLinkColor: '#2563eb',
    socialFacebook: '',
    socialTwitter: '',
    socialInstagram: '',
    socialLinkedin: '',
    linkPrivacy: '',
    linkTerms: '',
    linkHelp: '',
    linkUnsubscribe: '{{unsubscribe_url}}',
    imgGridSize: '300 × 200px',
    imgThumbSize: '270 × 180px',
    imgHeroDefault: '',
    imgCdnBase: '',
  };
}

export function getDefaultDesignRules(bundleId = 'industrial-b2b'): DesignRulesState {
  const checklistItems = getChecklistItems(bundleId);
  const base =
    bundleId === 'email-marketing-starter-kit'
      ? createStarterKitDefaults()
      : createIndustrialDefaults();

  return {
    ...base,
    checklist: checklistItems.map(() => false),
  };
}

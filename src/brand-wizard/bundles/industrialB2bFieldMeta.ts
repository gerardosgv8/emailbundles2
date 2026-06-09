import type { DesignRulesField } from '../types';

export type WizardFieldMeta = {
  usage: string;
  /** Where this token appears in the Industrial B2B HTML files (omit when shared across all 9 templates). */
  templates?: string;
  /** data-element hooks this token applies to (from bundle registry). */
  elements?: string;
};

export const INDUSTRIAL_B2B_FIELD_META: Partial<Record<DesignRulesField, WizardFieldMeta>> = {
  // Brand identity
  brandName: { usage: 'Company name in header, footer, and sender fields' },
  legalName: { usage: 'Legal entity when different from brand name' },
  tagline: { usage: 'Short line under logo in email header' },
  footerTrustLine: { usage: 'Trust badges line above footer address' },
  copyrightNote: { usage: 'Copyright line in footer (year auto on export)' },
  fromName: { usage: 'Default sender display name' },
  replyToEmail: { usage: 'Default reply-to address' },

  // Logo
  logoUrl: { usage: 'Header logo on all templates' },
  logoAlt: { usage: 'Alt text for header logo' },
  logoWidth: { usage: 'Logo display width in header' },
  logoHeight: { usage: 'Logo display height in header' },
  logoDarkUrl: {
    usage: 'Optional logo for dark backgrounds',
    templates: '08_Promotion: dark promo band when logo sits on dark surface',
  },
  faviconUrl: { usage: 'Optional small mark URL' },

  // Core colors
  colorPrimary: { usage: 'Primary buttons, key links, and brand accents' },
  colorSecondary: { usage: 'Product CTAs, inline links, footer legal links' },
  colorAccent: {
    usage: 'Promotional highlights and numbered step badges',
    templates: '07_Product_Enablement_Guide step numbers; 08_Promotion accent highlights',
  },

  // Text colors
  colorHeadingDark: { usage: 'Section titles and H1–H4 headings' },
  colorHeadingAlt: { usage: 'Hero titles and footer company name' },
  colorHeaderKicker: { usage: 'Top-of-email kicker headline' },
  colorBody: { usage: 'Long-form body copy' },
  colorBodyAlt: { usage: 'Descriptions, summaries, and secondary copy' },
  colorMuted: { usage: 'Subtitles, captions, and footer address text' },

  // Surfaces
  colorBgEmail: { usage: 'Outer email body and card background' },
  colorBgLightGray: {
    usage: 'Alternate section background for tier and pricing rows',
    templates: '08_Promotion: pricing tier rows',
  },
  colorBgInfo: {
    usage: 'Info callout and download banner background',
    templates: '07_Product_Enablement_Guide: download banner; insight callout panels',
  },
  colorBgService: {
    usage: 'Service tier panel background',
    templates: '06_Service_Launch: service tier panel',
  },
  colorBgServiceBorder: {
    usage: 'Border on service tier panel',
    templates: '06_Service_Launch: service tier panel border',
  },
  colorBgPromoDark: {
    usage: 'Dark promotional band background',
    templates: '08_Promotion: promo code band and dark CTA section',
  },
  colorBgWarning: { usage: 'Important note callout background' },
  colorBgWarningBorder: { usage: 'Border on warning callout panels' },
  colorBgWarningText: { usage: 'Text on warning callout panels' },
  colorBgUrgency: { usage: 'Limited-time alert background' },
  colorBgUrgencyBorder: { usage: 'Border on urgency alert panels' },
  colorBgUrgencyText: { usage: 'Text on urgency alert panels' },
  colorDivider: {
    usage: 'In-content section divider',
    templates: '04_Products_Catalog_Grid: divider between featured hero and product grid',
  },
  colorFooterDivider: { usage: 'Line above footer block' },

  // Badges
  colorBadgeEventBg: {
    usage: 'Event detail badge background',
    templates: '05_Event_Invitation: DATE, LOC, and AUD icon badges',
  },
  colorBadgeEventText: {
    usage: 'Event detail badge label text',
    templates: '05_Event_Invitation: DATE, LOC, and AUD badge labels',
  },
  colorBadgeStepBg: {
    usage: 'Numbered step badge background',
    templates: '07_Product_Enablement_Guide: numbered enablement steps',
  },
  colorBadgeStepText: {
    usage: 'Numbered step badge text',
    templates: '07_Product_Enablement_Guide: step numbers',
  },
  colorPromoHighlight: {
    usage: 'Promo code text on dark backgrounds',
    templates: '08_Promotion: promo code highlight on dark band',
  },

  // Buttons
  btnPrimaryBg: { usage: 'Filled CTA background (single-button templates and the primary of a pair)' },
  btnPrimaryText: { usage: 'Filled CTA label on primary buttons' },
  btnPrimaryRadius: { usage: 'Corner radius on primary and secondary buttons' },
  btnPrimaryPadding: { usage: 'Padding on primary and secondary buttons' },
  btnSecondaryBg: { usage: 'Outline secondary CTA background' },
  btnSecondaryText: { usage: 'Outline secondary CTA label' },
  btnSecondaryBorder: { usage: 'Outline secondary CTA border' },
  linkColor: {
    usage: 'Inline text link color',
    templates: '03_Products_Horizontal: per-row product text links (no filled buttons)',
  },
  urlBase: { usage: 'Default website URL for CTAs' },
  urlQuote: { usage: 'Quote or contact page URL' },
  urlSupport: { usage: 'Support or help page URL' },

  // Typography
  fontStack: { usage: 'Font family stack for all template text' },
  fontCustomUrl: { usage: 'Optional hosted web font URL' },
  fontCustomName: { usage: 'Optional web font family name' },

  // Footer
  footerCompany: { usage: 'Company name in footer' },
  footerAddress1: { usage: 'Street address line in footer' },
  footerAddress2: { usage: 'City, state, and postal line in footer' },
  footerCountry: { usage: 'Country line in footer' },
  footerEmail: { usage: 'Support email in footer' },
  footerPhone: { usage: 'Optional support phone in footer' },
  footerTagline: { usage: 'Tagline or trust line in footer' },
  footerTextColor: { usage: 'Default footer body text' },
  footerHeadingColor: { usage: 'Footer company name color' },
  footerLinkColor: { usage: 'Footer link color' },
  socialFacebook: { usage: 'Facebook URL in footer social row' },
  socialTwitter: { usage: 'X (Twitter) URL in footer social row' },
  socialInstagram: { usage: 'Instagram URL in footer social row' },
  socialLinkedin: { usage: 'LinkedIn URL in footer social row' },
  linkPrivacy: { usage: 'Privacy policy link in footer' },
  linkTerms: { usage: 'Terms of service link in footer' },
  linkHelp: { usage: 'Help center link in footer' },
  linkUnsubscribe: { usage: 'Unsubscribe merge tag placeholder in footer' },

  // Layout
  layoutMaxWidth: { usage: 'Maximum email content width (typically 600px)' },
  layoutOuterPadding: { usage: 'Padding around outer email wrapper' },
  layoutSectionPadding: { usage: 'Vertical and horizontal padding inside sections' },
  layoutHorizontalPadding: { usage: 'Left and right padding for content columns' },
  layoutSpacerStandard: { usage: 'Standard vertical spacer between blocks' },
  layoutSpacerLarge: { usage: 'Large vertical spacer between major sections' },
  layoutRadiusButtons: { usage: 'Border radius on buttons and card edges' },
  layoutRadiusHero: {
    usage: 'Corner radius on hero product images',
    templates: '01_Product_Launch, 04_Products_Catalog_Grid: hero product image',
  },
  layoutRadiusGrid: {
    usage: 'Corner radius on grid product thumbnails',
    templates: '04_Products_Catalog_Grid: product grid images',
  },

  // Imagery
  imgHeroWidth: { usage: 'Full-bleed hero image width' },
  imgFeaturedWidth: {
    usage: 'Featured product image max width',
    templates: '04_Products_Catalog_Grid: featured hero product block',
  },
  imgGridSize: {
    usage: 'Product grid thumbnail dimensions',
    templates: '04_Products_Catalog_Grid: catalog grid cells',
  },
  imgThumbSize: {
    usage: 'Horizontal catalog thumbnail size',
    templates: '03_Products_Horizontal: row thumbnail images',
  },
  imgHeroAspect: { usage: 'Recommended hero image aspect ratio' },
  imgHeroDefault: { usage: 'Placeholder hero image URL' },
  imgCdnBase: { usage: 'Base URL for hosted image assets' },

  darkBgOverride: { usage: 'Optional dark mode background override' },
  darkTextOverride: { usage: 'Optional dark mode text override' },
  contrastTarget: { usage: 'Minimum contrast ratio target for text' },
};

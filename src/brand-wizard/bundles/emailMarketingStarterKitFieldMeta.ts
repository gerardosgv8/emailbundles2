import type { DesignRulesField } from '../types';
import type { WizardFieldMeta } from './industrialB2bFieldMeta';

export type { WizardFieldMeta };

export const EMAIL_MARKETING_STARTER_KIT_FIELD_META: Partial<Record<DesignRulesField, WizardFieldMeta>> = {
  brandName: { usage: 'Store name in header, footer, and sender fields' },
  legalName: { usage: 'Legal entity when different from brand name' },
  tagline: { usage: 'Short line under logo in email header' },
  footerTrustLine: { usage: 'Trust badges line above footer address (shipping, returns, etc.)' },
  copyrightNote: { usage: 'Copyright line in footer (year auto on export)' },
  fromName: { usage: 'Default sender display name' },
  replyToEmail: { usage: 'Default reply-to address' },

  logoUrl: { usage: 'Header logo on all 11 templates' },
  logoAlt: { usage: 'Alt text for header logo' },
  logoWidth: { usage: 'Logo display width in header' },
  logoHeight: { usage: 'Logo display height in header' },
  logoDarkUrl: {
    usage: 'Optional logo for dark promo bands',
    templates: 'Promotional_Campaign: sale banner when logo sits on dark surface',
  },
  faviconUrl: { usage: 'Optional small mark URL' },

  colorPrimary: { usage: 'Primary buttons, key links, and brand accents' },
  colorSecondary: { usage: 'Product links, inline CTAs, and footer legal links' },
  colorAccent: {
    usage: 'Numbered onboarding steps and promo highlights',
    templates: 'Welcome_&_Onboarding: step numbers; Promotional_Campaign accent badges',
  },

  colorHeadingDark: { usage: 'Section titles, product names, and step headings' },
  colorHeadingAlt: { usage: 'Hero titles, launch headlines, and footer company name' },
  colorHeaderKicker: { usage: 'Top-of-email kicker and pre-header lines' },
  colorBody: { usage: 'Long-form body copy and product descriptions' },
  colorBodyAlt: { usage: 'Subtitles, summaries, and secondary copy' },
  colorMuted: { usage: 'Prices, order summary labels, and footer address text' },

  colorBgEmail: { usage: 'Outer email body and card background' },
  colorBgLightGray: {
    usage: 'Order summary and pricing panel backgrounds',
    templates: 'Order_Confirmation_Email: totals panel; Promotional_Campaign: deal rows',
  },
  colorBgInfo: {
    usage: 'Support and insight callout backgrounds',
    templates: 'Welcome_&_Onboarding: support panel; Feature_Announcement insight blocks',
  },
  colorBgPromoDark: {
    usage: 'Dark promotional band background',
    templates: 'Promotional_Campaign: header sale banner',
  },
  colorBgWarning: { usage: 'Limited stock and alert callout background' },
  colorBgWarningBorder: { usage: 'Border on alert callout panels' },
  colorBgWarningText: { usage: 'Text on insight and alert callout panels' },
  colorBgUrgency: { usage: 'Scarcity and limited-time alert background' },
  colorBgUrgencyBorder: { usage: 'Border on urgency alert panels' },
  colorBgUrgencyText: { usage: 'Text on urgency alert panels' },
  colorDivider: { usage: 'In-content section divider' },
  colorFooterDivider: { usage: 'Line above footer block' },

  colorBadgeEventBg: {
    usage: 'Feature icon badge background',
    templates: 'Feature_Announcement: feature icon circles',
  },
  colorBadgeEventText: {
    usage: 'Feature icon badge label text',
    templates: 'Feature_Announcement: feature icon labels',
  },
  colorBadgeStepBg: {
    usage: 'Numbered step badge background',
    templates: 'Welcome_&_Onboarding: onboarding step numbers',
  },
  colorBadgeStepText: {
    usage: 'Numbered step badge text',
    templates: 'Welcome_&_Onboarding: step numbers',
  },
  colorPromoHighlight: {
    usage: 'Promo code text on dark backgrounds',
    templates: 'Promotional_Campaign: sale banner highlight',
  },

  btnPrimaryBg: { usage: 'Filled CTA background (shop now, complete order, survey, etc.)' },
  btnPrimaryText: { usage: 'Filled CTA label on primary buttons' },
  btnPrimaryRadius: { usage: 'Corner radius on primary and secondary buttons' },
  btnPrimaryPadding: { usage: 'Padding on primary and secondary buttons' },
  btnSecondaryBg: { usage: 'Outline secondary CTA background' },
  btnSecondaryText: { usage: 'Outline secondary CTA label' },
  btnSecondaryBorder: { usage: 'Outline secondary CTA border' },
  linkColor: {
    usage: 'Inline product and editorial text link color',
    templates: 'Product_Recommendations, Newsletter_Editorial: product and read-more links',
  },
  urlBase: { usage: 'Default store URL for CTAs' },
  urlQuote: { usage: 'Contact page URL' },
  urlSupport: { usage: 'Support or help page URL' },

  fontStack: { usage: 'Font family stack for all template text' },
  fontCustomUrl: { usage: 'Optional hosted web font URL' },
  fontCustomName: { usage: 'Optional web font family name' },

  footerCompany: { usage: 'Store name in footer' },
  footerAddress1: { usage: 'Street address line in footer' },
  footerAddress2: { usage: 'City, state, and postal line in footer' },
  footerCountry: { usage: 'Country line in footer' },
  footerEmail: { usage: 'Support email in footer' },
  footerPhone: { usage: 'Optional support phone in footer' },
  footerTagline: { usage: 'Tagline or trust line in footer' },
  footerTextColor: { usage: 'Default footer body text' },
  footerHeadingColor: { usage: 'Footer company name color' },
  footerLinkColor: { usage: 'Footer and support link color' },
  socialFacebook: { usage: 'Facebook URL in footer social row' },
  socialTwitter: { usage: 'X (Twitter) URL in footer social row' },
  socialInstagram: { usage: 'Instagram URL in footer social row' },
  socialLinkedin: { usage: 'LinkedIn URL in footer social row' },
  linkPrivacy: { usage: 'Privacy policy link in footer' },
  linkTerms: { usage: 'Terms of service link in footer' },
  linkHelp: { usage: 'Help center link in footer' },
  linkUnsubscribe: { usage: 'Unsubscribe merge tag placeholder in footer' },

  layoutMaxWidth: { usage: 'Maximum email content width (typically 600px)' },
  layoutOuterPadding: { usage: 'Padding around outer email wrapper' },
  layoutSectionPadding: { usage: 'Vertical and horizontal padding inside sections' },
  layoutHorizontalPadding: { usage: 'Left and right padding for content columns' },
  layoutSpacerStandard: { usage: 'Standard vertical spacer between blocks' },
  layoutSpacerLarge: { usage: 'Large vertical spacer between major sections' },
  layoutRadiusButtons: { usage: 'Border radius on buttons and card edges' },
  layoutRadiusHero: {
    usage: 'Corner radius on hero product images',
    templates: 'Product_Launch, Promotional_Campaign: hero product image',
  },
  layoutRadiusGrid: {
    usage: 'Corner radius on product grid thumbnails',
    templates: 'Product_Recommendations (Grid): product grid images',
  },

  imgHeroWidth: { usage: 'Full-bleed hero image width' },
  imgFeaturedWidth: {
    usage: 'Featured product image max width',
    templates: 'Product_Recommendations (Grid): featured hero product block',
  },
  imgGridSize: {
    usage: 'Product grid thumbnail dimensions',
    templates: 'Product_Recommendations (Grid): catalog grid cells',
  },
  imgThumbSize: {
    usage: 'Horizontal product thumbnail size',
    templates: 'Product_Recommendations (Horizontal): row thumbnail images',
  },
  imgHeroAspect: { usage: 'Recommended hero image aspect ratio' },
  imgHeroDefault: { usage: 'Placeholder hero image URL' },
  imgCdnBase: { usage: 'Base URL for hosted product image assets' },

  darkBgOverride: { usage: 'Optional dark mode background override' },
  darkTextOverride: { usage: 'Optional dark mode text override' },
  contrastTarget: { usage: 'Minimum contrast ratio target for text' },
};

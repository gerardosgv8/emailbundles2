import type { DesignRulesField } from './types';

/**
 * Contextual input placeholders for Brand Wizard text fields.
 * Prefer empty default values + these hints over demo brand copy.
 */
export const FIELD_PLACEHOLDERS: Partial<Record<DesignRulesField, string>> = {
  brandName: 'Your company name',
  legalName: 'Legal entity name, if different',
  tagline: 'Short line under your logo',
  footerTrustLine: 'e.g. Free shipping • Easy returns',
  copyrightNote: `©${new Date().getFullYear()} Your Company Name`,
  fromName: 'Sender name recipients see',
  replyToEmail: 'you@yourcompany.com',

  logoUrl: 'https://…/logo.png',
  logoAlt: 'Company logo',
  logoWidth: 'e.g. 180px',
  logoHeight: 'auto or e.g. 48px',
  logoDarkUrl: 'https://…/logo-on-dark.png',
  faviconUrl: 'https://…/favicon.png',

  urlBase: 'https://www.yourcompany.com',
  urlQuote: 'https://www.yourcompany.com/contact',
  urlSupport: 'https://www.yourcompany.com/support',

  fontStack: "e.g. -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontCustomUrl: 'https://…/your-font.css',
  fontCustomName: 'Your Font Family',

  footerCompany: 'Company name in footer',
  footerAddress1: 'Street address',
  footerAddress2: 'City, ST ZIP',
  footerCountry: 'Country',
  footerEmail: 'support@yourcompany.com',
  footerPhone: '+1 (555) 000-0000',
  footerTagline: 'Short footer line or trust message',

  socialFacebook: 'https://…',
  socialTwitter: 'https://…',
  socialInstagram: 'https://…',
  socialLinkedin: 'https://…',
  socialFacebookText: 'LinkedIn',
  socialTwitterText: 'Instagram',
  socialInstagramText: 'YouTube',
  socialLinkedinText: 'Blog',

  linkPrivacy: 'https://www.yourcompany.com/privacy',
  linkTerms: 'https://www.yourcompany.com/terms',
  linkHelp: 'https://www.yourcompany.com/help',
  linkUnsubscribe: '{{unsubscribe_url}}',

  btnPrimaryRadius: 'e.g. 8px',
  btnPrimaryPadding: 'e.g. 16px 32px',

  layoutMaxWidth: 'e.g. 600px',
  layoutOuterPadding: 'e.g. 20px 0',
  layoutSectionPadding: 'e.g. 40px 30px',
  layoutHorizontalPadding: 'e.g. 30px',
  layoutSpacerStandard: 'e.g. 24px',
  layoutSpacerLarge: 'e.g. 32px',
  layoutRadiusButtons: 'e.g. 8px',
  layoutRadiusHero: 'e.g. 12px',
  layoutRadiusGrid: 'e.g. 8px',

  imgHeroWidth: 'e.g. 600px (full bleed)',
  imgFeaturedWidth: 'e.g. 540px max',
  imgGridSize: 'e.g. 250 × 150px',
  imgThumbSize: 'e.g. 150 × 150px',
  imgHeroAspect: 'e.g. 3:2 or 16:9',
  imgHeroDefault: 'https://…/hero.jpg',
  imgCdnBase: 'https://cdn.yourcompany.com/',

  darkBgOverride: '#0f172a',
  darkTextOverride: '#f8fafc',
  contrastTarget: 'e.g. 4.5:1 (body text)',
};

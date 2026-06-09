/**
 * AUTO-GENERATED — do not edit by hand.
 * Source: FinalBundles/Industrial B2B Bundle/*.html
 * Regenerate: node scripts/sync-industrial-bundle-registry.mjs
 */

export const INDUSTRIAL_B2B_TEMPLATE_FILES = [
  "01_Product_Launch.html",
  "02_Product_Update.html",
  "03_Products_Horizontal.html",
  "04_Products_Catalog_Grid.html",
  "05_Event_Invitation.html",
  "06_Service_Launch.html",
  "07_Product_Enablement_Guide.html",
  "08_Promotion.html",
  "09_Company_Update.html"
] as const;

export type IndustrialB2bTemplateFile = (typeof INDUSTRIAL_B2B_TEMPLATE_FILES)[number];

export type ElementApplyProfile =
  | 'LOGO'
  | 'FOOTER_COMPANY'
  | 'FOOTER_ADDRESS'
  | 'FOOTER_TAGLINE'
  | 'FOOTER_COPYRIGHT'
  | 'FOOTER_CONTACT'
  | 'FOOTER_LINK'
  | 'FOOTER_SOCIAL'
  | 'FOOTER_ICON'
  | 'HEADING_KICKER'
  | 'HEADING_HERO'
  | 'HEADING_SECTION'
  | 'HEADING_FEATURE'
  | 'HEADING_STEP'
  | 'BODY'
  | 'BODY_SUBTITLE'
  | 'BODY_MUTED'
  | 'BODY_WARNING_TEXT'
  | 'BODY_URGENCY_TEXT'
  | 'BODY_INFO_TEXT'
  | 'TIER_TEXT'
  | 'PROMO_HEADING'
  | 'CTA_PRIMARY'
  | 'CTA_PRIMARY_TD'
  | 'CTA_SECONDARY'
  | 'CTA_SECONDARY_TD'
  | 'LINK_PRODUCT'
  | 'BADGE_EVENT'
  | 'BADGE_STEP'
  | 'BADGE_FEATURE'
  | 'IMAGE_HERO'
  | 'IMAGE_PRODUCT'
  | 'SURFACE_LIGHT'
  | 'SURFACE_INFO'
  | 'SURFACE_WARNING';

export type BundleElementEntry = {
  id: string;
  profile: ElementApplyProfile;
  templates: IndustrialB2bTemplateFile[];
};

/** Every data-element hook in the Industrial B2B bundle (151 total). */
export const INDUSTRIAL_B2B_ELEMENT_REGISTRY: BundleElementEntry[] = [
  {
    "id": "cta-primary",
    "profile": "CTA_PRIMARY",
    "templates": [
      "02_Product_Update.html",
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "cta-primary-button",
    "profile": "BODY",
    "templates": [
      "02_Product_Update.html",
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "cta-secondary",
    "profile": "CTA_SECONDARY",
    "templates": [
      "02_Product_Update.html"
    ]
  },
  {
    "id": "cta-secondary-button",
    "profile": "BODY",
    "templates": [
      "02_Product_Update.html"
    ]
  },
  {
    "id": "event-attendees-heading",
    "profile": "HEADING_SECTION",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "event-attendees-icon",
    "profile": "BADGE_EVENT",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "event-attendees-value",
    "profile": "BODY_MUTED",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "event-date-heading",
    "profile": "HEADING_SECTION",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "event-date-icon",
    "profile": "BADGE_EVENT",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "event-date-value",
    "profile": "BODY_MUTED",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "event-location-heading",
    "profile": "HEADING_SECTION",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "event-location-icon",
    "profile": "BADGE_EVENT",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "event-location-value",
    "profile": "BODY_MUTED",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "event-tagline",
    "profile": "BODY_SUBTITLE",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "event-title",
    "profile": "HEADING_HERO",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "feature-1-description",
    "profile": "BODY",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "06_Service_Launch.html"
    ]
  },
  {
    "id": "feature-1-icon",
    "profile": "BADGE_FEATURE",
    "templates": [
      "02_Product_Update.html"
    ]
  },
  {
    "id": "feature-1-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "06_Service_Launch.html"
    ]
  },
  {
    "id": "feature-2-description",
    "profile": "BODY",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "06_Service_Launch.html"
    ]
  },
  {
    "id": "feature-2-icon",
    "profile": "BADGE_FEATURE",
    "templates": [
      "02_Product_Update.html"
    ]
  },
  {
    "id": "feature-2-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "06_Service_Launch.html"
    ]
  },
  {
    "id": "feature-3-description",
    "profile": "BODY",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "06_Service_Launch.html"
    ]
  },
  {
    "id": "feature-3-icon",
    "profile": "BADGE_FEATURE",
    "templates": [
      "02_Product_Update.html"
    ]
  },
  {
    "id": "feature-3-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "06_Service_Launch.html"
    ]
  },
  {
    "id": "featured-body",
    "profile": "BODY",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "featured-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "featured-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "featured-image",
    "profile": "IMAGE_HERO",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "featured-insight",
    "profile": "BODY_WARNING_TEXT",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "featured-insight-container",
    "profile": "SURFACE_INFO",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "featured-title",
    "profile": "HEADING_HERO",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "footer-address",
    "profile": "FOOTER_ADDRESS",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "footer-company-name",
    "profile": "FOOTER_COMPANY",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "footer-contact",
    "profile": "FOOTER_CONTACT",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "footer-copyright",
    "profile": "FOOTER_COPYRIGHT",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "footer-icon-1",
    "profile": "FOOTER_ICON",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "footer-icon-2",
    "profile": "FOOTER_ICON",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "footer-icon-3",
    "profile": "FOOTER_ICON",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "footer-icon-4",
    "profile": "FOOTER_ICON",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "footer-link-help",
    "profile": "FOOTER_LINK",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "footer-link-privacy",
    "profile": "FOOTER_LINK",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "footer-link-terms",
    "profile": "FOOTER_LINK",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "footer-link-unsubscribe",
    "profile": "FOOTER_LINK",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "footer-social-facebook",
    "profile": "FOOTER_SOCIAL",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "footer-social-instagram",
    "profile": "FOOTER_SOCIAL",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "footer-social-linkedin",
    "profile": "FOOTER_SOCIAL",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "footer-social-twitter",
    "profile": "FOOTER_SOCIAL",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "footer-tagline",
    "profile": "FOOTER_TAGLINE",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "getting-started-heading",
    "profile": "HEADING_SECTION",
    "templates": [
      "02_Product_Update.html"
    ]
  },
  {
    "id": "getting-started-highlight",
    "profile": "BODY_SUBTITLE",
    "templates": [
      "02_Product_Update.html"
    ]
  },
  {
    "id": "getting-started-instructions",
    "profile": "BODY",
    "templates": [
      "02_Product_Update.html"
    ]
  },
  {
    "id": "grid-heading",
    "profile": "HEADING_SECTION",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "grid-product-1-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "grid-product-1-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "grid-product-1-price",
    "profile": "BODY",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "grid-product-1-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "grid-product-2-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "grid-product-2-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "grid-product-2-price",
    "profile": "BODY",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "grid-product-2-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "grid-product-3-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "grid-product-3-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "grid-product-3-price",
    "profile": "BODY",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "grid-product-3-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "grid-product-4-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "grid-product-4-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "grid-product-4-price",
    "profile": "BODY",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "grid-product-4-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "guide-download",
    "profile": "BODY_INFO_TEXT",
    "templates": [
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "header-kicker",
    "profile": "HEADING_KICKER",
    "templates": [
      "01_Product_Launch.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "header-subtitle",
    "profile": "BODY_SUBTITLE",
    "templates": [
      "02_Product_Update.html",
      "03_Products_Horizontal.html",
      "04_Products_Catalog_Grid.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html",
      "09_Company_Update.html"
    ]
  },
  {
    "id": "header-title",
    "profile": "HEADING_KICKER",
    "templates": [
      "02_Product_Update.html",
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "hero-compare-price",
    "profile": "BODY",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "hero-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "hero-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "hero-description",
    "profile": "BODY",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "hero-image",
    "profile": "IMAGE_HERO",
    "templates": [
      "01_Product_Launch.html",
      "02_Product_Update.html",
      "05_Event_Invitation.html",
      "06_Service_Launch.html",
      "07_Product_Enablement_Guide.html",
      "08_Promotion.html"
    ]
  },
  {
    "id": "hero-price",
    "profile": "BODY",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "hero-product-image",
    "profile": "IMAGE_HERO",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "hero-title",
    "profile": "HEADING_HERO",
    "templates": [
      "04_Products_Catalog_Grid.html"
    ]
  },
  {
    "id": "important-note",
    "profile": "BODY_WARNING_TEXT",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "important-note-container",
    "profile": "SURFACE_WARNING",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "launch-subtitle",
    "profile": "BODY_SUBTITLE",
    "templates": [
      "01_Product_Launch.html",
      "06_Service_Launch.html"
    ]
  },
  {
    "id": "launch-title",
    "profile": "HEADING_HERO",
    "templates": [
      "01_Product_Launch.html",
      "06_Service_Launch.html"
    ]
  },
  {
    "id": "logo",
    "profile": "LOGO",
    "templates": [
      "02_Product_Update.html",
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "overview-description",
    "profile": "BODY",
    "templates": [
      "02_Product_Update.html",
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "overview-heading",
    "profile": "HEADING_HERO",
    "templates": [
      "02_Product_Update.html",
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "pricing-container",
    "profile": "SURFACE_LIGHT",
    "templates": [
      "01_Product_Launch.html"
    ]
  },
  {
    "id": "pricing-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "01_Product_Launch.html",
      "06_Service_Launch.html"
    ]
  },
  {
    "id": "pricing-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "01_Product_Launch.html",
      "06_Service_Launch.html"
    ]
  },
  {
    "id": "pricing-note",
    "profile": "BODY_MUTED",
    "templates": [
      "01_Product_Launch.html",
      "06_Service_Launch.html"
    ]
  },
  {
    "id": "pricing-title",
    "profile": "HEADING_SECTION",
    "templates": [
      "01_Product_Launch.html",
      "06_Service_Launch.html"
    ]
  },
  {
    "id": "primary-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "primary-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "product-1-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "03_Products_Horizontal.html"
    ]
  },
  {
    "id": "product-1-description",
    "profile": "BODY",
    "templates": [
      "03_Products_Horizontal.html"
    ]
  },
  {
    "id": "product-1-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "03_Products_Horizontal.html"
    ]
  },
  {
    "id": "product-1-price",
    "profile": "BODY",
    "templates": [
      "03_Products_Horizontal.html"
    ]
  },
  {
    "id": "product-1-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "03_Products_Horizontal.html"
    ]
  },
  {
    "id": "product-2-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "03_Products_Horizontal.html"
    ]
  },
  {
    "id": "product-2-description",
    "profile": "BODY",
    "templates": [
      "03_Products_Horizontal.html"
    ]
  },
  {
    "id": "product-2-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "03_Products_Horizontal.html"
    ]
  },
  {
    "id": "product-2-price",
    "profile": "BODY",
    "templates": [
      "03_Products_Horizontal.html"
    ]
  },
  {
    "id": "product-2-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "03_Products_Horizontal.html"
    ]
  },
  {
    "id": "product-3-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "03_Products_Horizontal.html"
    ]
  },
  {
    "id": "product-3-description",
    "profile": "BODY",
    "templates": [
      "03_Products_Horizontal.html"
    ]
  },
  {
    "id": "product-3-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "03_Products_Horizontal.html"
    ]
  },
  {
    "id": "product-3-price",
    "profile": "BODY",
    "templates": [
      "03_Products_Horizontal.html"
    ]
  },
  {
    "id": "product-3-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "03_Products_Horizontal.html"
    ]
  },
  {
    "id": "promo-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "08_Promotion.html"
    ]
  },
  {
    "id": "promo-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "08_Promotion.html"
    ]
  },
  {
    "id": "promo-cta-heading",
    "profile": "PROMO_HEADING",
    "templates": [
      "08_Promotion.html"
    ]
  },
  {
    "id": "promo-expiry",
    "profile": "BODY_URGENCY_TEXT",
    "templates": [
      "08_Promotion.html"
    ]
  },
  {
    "id": "promo-subtitle",
    "profile": "BODY_SUBTITLE",
    "templates": [
      "08_Promotion.html"
    ]
  },
  {
    "id": "promo-title",
    "profile": "HEADING_HERO",
    "templates": [
      "08_Promotion.html"
    ]
  },
  {
    "id": "recommendations-description",
    "profile": "BODY",
    "templates": [
      "03_Products_Horizontal.html"
    ]
  },
  {
    "id": "recommendations-heading",
    "profile": "HEADING_SECTION",
    "templates": [
      "03_Products_Horizontal.html"
    ]
  },
  {
    "id": "secondary-cta",
    "profile": "CTA_SECONDARY",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "secondary-cta-button",
    "profile": "CTA_SECONDARY_TD",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "speaker-1-name",
    "profile": "HEADING_FEATURE",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "speaker-1-title",
    "profile": "BODY_MUTED",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "speaker-2-name",
    "profile": "HEADING_FEATURE",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "speaker-2-title",
    "profile": "BODY_MUTED",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "speakers-heading",
    "profile": "HEADING_SECTION",
    "templates": [
      "05_Event_Invitation.html"
    ]
  },
  {
    "id": "step-1-description",
    "profile": "BODY",
    "templates": [
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "step-1-icon",
    "profile": "BADGE_STEP",
    "templates": [
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "step-1-title",
    "profile": "HEADING_STEP",
    "templates": [
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "step-2-description",
    "profile": "BODY",
    "templates": [
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "step-2-icon",
    "profile": "BADGE_STEP",
    "templates": [
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "step-2-title",
    "profile": "HEADING_STEP",
    "templates": [
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "step-3-description",
    "profile": "BODY",
    "templates": [
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "step-3-icon",
    "profile": "BADGE_STEP",
    "templates": [
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "step-3-title",
    "profile": "HEADING_STEP",
    "templates": [
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "step-4-description",
    "profile": "BODY",
    "templates": [
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "step-4-icon",
    "profile": "BADGE_STEP",
    "templates": [
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "step-4-title",
    "profile": "HEADING_STEP",
    "templates": [
      "07_Product_Enablement_Guide.html"
    ]
  },
  {
    "id": "tier-1",
    "profile": "TIER_TEXT",
    "templates": [
      "08_Promotion.html"
    ]
  },
  {
    "id": "tier-2",
    "profile": "TIER_TEXT",
    "templates": [
      "08_Promotion.html"
    ]
  },
  {
    "id": "tier-3",
    "profile": "TIER_TEXT",
    "templates": [
      "08_Promotion.html"
    ]
  },
  {
    "id": "update-1-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "update-1-summary",
    "profile": "BODY",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "update-1-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "update-2-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "update-2-summary",
    "profile": "BODY",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "update-2-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "update-3-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "update-3-summary",
    "profile": "BODY",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "update-3-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "updates-heading",
    "profile": "HEADING_SECTION",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "updates-subhead",
    "profile": "HEADING_SECTION",
    "templates": [
      "09_Company_Update.html"
    ]
  },
  {
    "id": "urgency-note",
    "profile": "BODY_URGENCY_TEXT",
    "templates": [
      "01_Product_Launch.html"
    ]
  }
];

export const INDUSTRIAL_B2B_KNOWN_ELEMENTS = INDUSTRIAL_B2B_ELEMENT_REGISTRY.map((entry) => entry.id);

export const INDUSTRIAL_B2B_PROFILE_BY_ELEMENT: Record<string, ElementApplyProfile> = Object.fromEntries(
  INDUSTRIAL_B2B_ELEMENT_REGISTRY.map((entry) => [entry.id, entry.profile]),
);

export const INDUSTRIAL_B2B_ELEMENTS_BY_TEMPLATE = Object.fromEntries(
  INDUSTRIAL_B2B_TEMPLATE_FILES.map((file) => [
    file,
    INDUSTRIAL_B2B_ELEMENT_REGISTRY.filter((entry) => entry.templates.includes(file)).map((entry) => entry.id),
  ]),
) as Record<IndustrialB2bTemplateFile, string[]>;

/**
 * AUTO-GENERATED — do not edit by hand.
 * Source: FinalBundles/EmailMarketing_B2B/*.html
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
    "profile": "CTA_PRIMARY_TD",
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
    "profile": "CTA_SECONDARY_TD",
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

export const INDUSTRIAL_B2B_ELEMENTS_BY_TEMPLATE = {
  "01_Product_Launch.html": [
    "logo",
    "header-kicker",
    "hero-image",
    "launch-title",
    "launch-subtitle",
    "feature-1-title",
    "feature-1-description",
    "feature-2-title",
    "feature-2-description",
    "feature-3-title",
    "feature-3-description",
    "pricing-container",
    "pricing-title",
    "pricing-note",
    "pricing-cta-button",
    "pricing-cta",
    "urgency-note",
    "footer-company-name",
    "footer-address",
    "footer-tagline",
    "footer-social-facebook",
    "footer-social-twitter",
    "footer-social-instagram",
    "footer-social-linkedin",
    "footer-link-privacy",
    "footer-link-terms",
    "footer-link-help",
    "footer-link-unsubscribe",
    "footer-icon-1",
    "footer-icon-2",
    "footer-icon-3",
    "footer-icon-4",
    "footer-contact",
    "footer-copyright"
  ],
  "02_Product_Update.html": [
    "logo",
    "header-title",
    "header-subtitle",
    "hero-image",
    "overview-heading",
    "overview-description",
    "feature-1-icon",
    "feature-1-title",
    "feature-1-description",
    "feature-2-icon",
    "feature-2-title",
    "feature-2-description",
    "feature-3-icon",
    "feature-3-title",
    "feature-3-description",
    "getting-started-heading",
    "getting-started-highlight",
    "getting-started-instructions",
    "cta-secondary-button",
    "cta-secondary",
    "cta-primary-button",
    "cta-primary",
    "footer-company-name",
    "footer-address",
    "footer-tagline",
    "footer-social-facebook",
    "footer-social-twitter",
    "footer-social-instagram",
    "footer-social-linkedin",
    "footer-link-privacy",
    "footer-link-terms",
    "footer-link-help",
    "footer-link-unsubscribe",
    "footer-icon-1",
    "footer-icon-2",
    "footer-icon-3",
    "footer-icon-4",
    "footer-contact",
    "footer-copyright"
  ],
  "03_Products_Horizontal.html": [
    "logo",
    "header-kicker",
    "header-subtitle",
    "recommendations-heading",
    "recommendations-description",
    "product-1-image",
    "product-1-title",
    "product-1-description",
    "product-1-price",
    "product-1-cta",
    "product-2-image",
    "product-2-title",
    "product-2-description",
    "product-2-price",
    "product-2-cta",
    "product-3-image",
    "product-3-title",
    "product-3-description",
    "product-3-price",
    "product-3-cta",
    "footer-company-name",
    "footer-address",
    "footer-tagline",
    "footer-social-facebook",
    "footer-social-twitter",
    "footer-social-instagram",
    "footer-social-linkedin",
    "footer-link-privacy",
    "footer-link-terms",
    "footer-link-help",
    "footer-link-unsubscribe",
    "footer-icon-1",
    "footer-icon-2",
    "footer-icon-3",
    "footer-icon-4",
    "footer-contact",
    "footer-copyright"
  ],
  "04_Products_Catalog_Grid.html": [
    "logo",
    "header-kicker",
    "header-subtitle",
    "hero-title",
    "hero-description",
    "hero-product-image",
    "hero-price",
    "hero-compare-price",
    "hero-cta-button",
    "hero-cta",
    "grid-heading",
    "grid-product-1-image",
    "grid-product-1-title",
    "grid-product-1-price",
    "grid-product-1-cta",
    "grid-product-2-image",
    "grid-product-2-title",
    "grid-product-2-price",
    "grid-product-2-cta",
    "grid-product-3-image",
    "grid-product-3-title",
    "grid-product-3-price",
    "grid-product-3-cta",
    "grid-product-4-image",
    "grid-product-4-title",
    "grid-product-4-price",
    "grid-product-4-cta",
    "footer-company-name",
    "footer-address",
    "footer-tagline",
    "footer-social-facebook",
    "footer-social-twitter",
    "footer-social-instagram",
    "footer-social-linkedin",
    "footer-link-privacy",
    "footer-link-terms",
    "footer-link-help",
    "footer-link-unsubscribe",
    "footer-icon-1",
    "footer-icon-2",
    "footer-icon-3",
    "footer-icon-4",
    "footer-contact",
    "footer-copyright"
  ],
  "05_Event_Invitation.html": [
    "logo",
    "header-kicker",
    "hero-image",
    "event-title",
    "event-tagline",
    "event-date-icon",
    "event-date-heading",
    "event-date-value",
    "event-location-icon",
    "event-location-heading",
    "event-location-value",
    "event-attendees-icon",
    "event-attendees-heading",
    "event-attendees-value",
    "speakers-heading",
    "speaker-1-name",
    "speaker-1-title",
    "speaker-2-name",
    "speaker-2-title",
    "primary-cta-button",
    "primary-cta",
    "secondary-cta-button",
    "secondary-cta",
    "important-note-container",
    "important-note",
    "footer-company-name",
    "footer-address",
    "footer-tagline",
    "footer-social-facebook",
    "footer-social-twitter",
    "footer-social-instagram",
    "footer-social-linkedin",
    "footer-link-privacy",
    "footer-link-terms",
    "footer-link-help",
    "footer-link-unsubscribe",
    "footer-icon-1",
    "footer-icon-2",
    "footer-icon-3",
    "footer-icon-4",
    "footer-contact",
    "footer-copyright"
  ],
  "06_Service_Launch.html": [
    "logo",
    "header-kicker",
    "hero-image",
    "launch-title",
    "launch-subtitle",
    "feature-1-title",
    "feature-1-description",
    "feature-2-title",
    "feature-2-description",
    "feature-3-title",
    "feature-3-description",
    "pricing-title",
    "pricing-note",
    "pricing-cta-button",
    "pricing-cta",
    "footer-company-name",
    "footer-address",
    "footer-tagline",
    "footer-social-facebook",
    "footer-social-twitter",
    "footer-social-instagram",
    "footer-social-linkedin",
    "footer-link-privacy",
    "footer-link-terms",
    "footer-link-help",
    "footer-link-unsubscribe",
    "footer-icon-1",
    "footer-icon-2",
    "footer-icon-3",
    "footer-icon-4",
    "footer-contact",
    "footer-copyright"
  ],
  "07_Product_Enablement_Guide.html": [
    "logo",
    "header-title",
    "header-subtitle",
    "hero-image",
    "overview-heading",
    "overview-description",
    "step-1-icon",
    "step-1-title",
    "step-1-description",
    "step-2-icon",
    "step-2-title",
    "step-2-description",
    "step-3-icon",
    "step-3-title",
    "step-3-description",
    "step-4-icon",
    "step-4-title",
    "step-4-description",
    "guide-download",
    "cta-primary-button",
    "cta-primary",
    "footer-company-name",
    "footer-address",
    "footer-tagline",
    "footer-social-facebook",
    "footer-social-twitter",
    "footer-social-instagram",
    "footer-social-linkedin",
    "footer-link-privacy",
    "footer-link-terms",
    "footer-link-help",
    "footer-link-unsubscribe",
    "footer-icon-1",
    "footer-icon-2",
    "footer-icon-3",
    "footer-icon-4",
    "footer-contact",
    "footer-copyright"
  ],
  "08_Promotion.html": [
    "logo",
    "header-kicker",
    "header-subtitle",
    "hero-image",
    "promo-title",
    "promo-subtitle",
    "tier-1",
    "tier-2",
    "tier-3",
    "promo-cta-heading",
    "promo-cta-button",
    "promo-cta",
    "promo-expiry",
    "footer-company-name",
    "footer-address",
    "footer-tagline",
    "footer-social-facebook",
    "footer-social-twitter",
    "footer-social-instagram",
    "footer-social-linkedin",
    "footer-link-privacy",
    "footer-link-terms",
    "footer-link-help",
    "footer-link-unsubscribe",
    "footer-icon-1",
    "footer-icon-2",
    "footer-icon-3",
    "footer-icon-4",
    "footer-contact",
    "footer-copyright"
  ],
  "09_Company_Update.html": [
    "logo",
    "header-kicker",
    "header-subtitle",
    "featured-image",
    "featured-title",
    "featured-body",
    "featured-insight-container",
    "featured-insight",
    "featured-cta-button",
    "featured-cta",
    "updates-heading",
    "updates-subhead",
    "update-1-title",
    "update-1-summary",
    "update-1-cta",
    "update-2-title",
    "update-2-summary",
    "update-2-cta",
    "update-3-title",
    "update-3-summary",
    "update-3-cta",
    "footer-company-name",
    "footer-address",
    "footer-tagline",
    "footer-social-facebook",
    "footer-social-twitter",
    "footer-social-instagram",
    "footer-social-linkedin",
    "footer-link-privacy",
    "footer-link-terms",
    "footer-link-help",
    "footer-link-unsubscribe",
    "footer-icon-1",
    "footer-icon-2",
    "footer-icon-3",
    "footer-icon-4",
    "footer-contact",
    "footer-copyright"
  ]
} as Record<IndustrialB2bTemplateFile, string[]>;

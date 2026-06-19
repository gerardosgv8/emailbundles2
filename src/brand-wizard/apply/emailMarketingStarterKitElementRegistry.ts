/**
 * AUTO-GENERATED — do not edit by hand.
 * Source: FinalBundles/EmailMarketing_StarterKit/*.html
 * Regenerate: node scripts/sync-email-marketing-starter-kit-registry.mjs
 */

export const EMAIL_MARKETING_STARTER_KIT_TEMPLATE_FILES = [
  "Back_in_Stock_Notification (3).html",
  "Checkout_Abandonment_Email (7).html",
  "Feature_Announcement (4).html",
  "Newsletter_Editorial (5).html",
  "Order_Confirmation_Email (5).html",
  "Product_Launch (2).html",
  "Product_Recommendations_(Horizontal) (4).html",
  "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
  "Promotional_Campaign (4).html",
  "Survey_&_Feedback (2).html",
  "Welcome_&_Onboarding (3).html"
] as const;

export type EmailMarketingStarterKitTemplateFile = (typeof EMAIL_MARKETING_STARTER_KIT_TEMPLATE_FILES)[number];

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

export type StarterKitElementEntry = {
  id: string;
  profile: ElementApplyProfile;
  templates: EmailMarketingStarterKitTemplateFile[];
};

/** Every data-element hook in the Email Marketing Starter Kit (176 total). */
export const EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY: StarterKitElementEntry[] = [
  {
    "id": "arrival-1-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "arrival-1-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "arrival-1-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "arrival-1-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "arrival-2-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "arrival-2-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "arrival-2-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "arrival-2-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "arrival-3-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "arrival-3-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "arrival-3-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "arrival-3-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "arrival-4-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "arrival-4-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "arrival-4-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "arrival-4-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "checkout-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "Checkout_Abandonment_Email (7).html"
    ]
  },
  {
    "id": "checkout-cta-heading",
    "profile": "HEADING_HERO",
    "templates": [
      "Checkout_Abandonment_Email (7).html"
    ]
  },
  {
    "id": "checkout-subheading",
    "profile": "HEADING_SECTION",
    "templates": [
      "Checkout_Abandonment_Email (7).html"
    ]
  },
  {
    "id": "contact-support-link",
    "profile": "BODY",
    "templates": [
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "cta-primary",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Feature_Announcement (4).html"
    ]
  },
  {
    "id": "cta-secondary",
    "profile": "CTA_SECONDARY",
    "templates": [
      "Feature_Announcement (4).html"
    ]
  },
  {
    "id": "cta-track-order",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Order_Confirmation_Email (5).html"
    ]
  },
  {
    "id": "cta-view-details",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Order_Confirmation_Email (5).html"
    ]
  },
  {
    "id": "deal-1-compare",
    "profile": "BODY_MUTED",
    "templates": [
      "Promotional_Campaign (4).html"
    ]
  },
  {
    "id": "deal-1-discount",
    "profile": "BODY_MUTED",
    "templates": [
      "Promotional_Campaign (4).html"
    ]
  },
  {
    "id": "deal-1-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Promotional_Campaign (4).html"
    ]
  },
  {
    "id": "deal-1-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Promotional_Campaign (4).html"
    ]
  },
  {
    "id": "deal-2-compare",
    "profile": "BODY_MUTED",
    "templates": [
      "Promotional_Campaign (4).html"
    ]
  },
  {
    "id": "deal-2-discount",
    "profile": "BODY_MUTED",
    "templates": [
      "Promotional_Campaign (4).html"
    ]
  },
  {
    "id": "deal-2-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Promotional_Campaign (4).html"
    ]
  },
  {
    "id": "deal-2-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Promotional_Campaign (4).html"
    ]
  },
  {
    "id": "feature-1-description",
    "profile": "BODY",
    "templates": [
      "Feature_Announcement (4).html",
      "Product_Launch (2).html"
    ]
  },
  {
    "id": "feature-1-icon",
    "profile": "BADGE_FEATURE",
    "templates": [
      "Feature_Announcement (4).html"
    ]
  },
  {
    "id": "feature-1-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Feature_Announcement (4).html",
      "Product_Launch (2).html"
    ]
  },
  {
    "id": "feature-2-description",
    "profile": "BODY",
    "templates": [
      "Feature_Announcement (4).html",
      "Product_Launch (2).html"
    ]
  },
  {
    "id": "feature-2-icon",
    "profile": "BADGE_FEATURE",
    "templates": [
      "Feature_Announcement (4).html"
    ]
  },
  {
    "id": "feature-2-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Feature_Announcement (4).html",
      "Product_Launch (2).html"
    ]
  },
  {
    "id": "feature-3-description",
    "profile": "BODY",
    "templates": [
      "Feature_Announcement (4).html",
      "Product_Launch (2).html"
    ]
  },
  {
    "id": "feature-3-icon",
    "profile": "BADGE_FEATURE",
    "templates": [
      "Feature_Announcement (4).html"
    ]
  },
  {
    "id": "feature-3-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Feature_Announcement (4).html",
      "Product_Launch (2).html"
    ]
  },
  {
    "id": "featured-body",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "featured-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "featured-insight",
    "profile": "BODY_WARNING_TEXT",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "featured-insight-container",
    "profile": "SURFACE_INFO",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "featured-title",
    "profile": "HEADING_HERO",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "footer-address",
    "profile": "FOOTER_ADDRESS",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Launch (2).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "footer-company-name",
    "profile": "FOOTER_COMPANY",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Launch (2).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "footer-contact",
    "profile": "FOOTER_CONTACT",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Launch (2).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "footer-copyright",
    "profile": "FOOTER_COPYRIGHT",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Launch (2).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "footer-icon-1",
    "profile": "FOOTER_ICON",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Launch (2).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "footer-icon-2",
    "profile": "FOOTER_ICON",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Launch (2).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "footer-icon-3",
    "profile": "FOOTER_ICON",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Launch (2).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "footer-icon-4",
    "profile": "FOOTER_ICON",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Launch (2).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "footer-link-help",
    "profile": "FOOTER_LINK",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Launch (2).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "footer-link-privacy",
    "profile": "FOOTER_LINK",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Launch (2).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "footer-link-terms",
    "profile": "FOOTER_LINK",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Launch (2).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "footer-link-unsubscribe",
    "profile": "FOOTER_LINK",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Launch (2).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "footer-social-facebook",
    "profile": "FOOTER_SOCIAL",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Launch (2).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "footer-social-instagram",
    "profile": "FOOTER_SOCIAL",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Launch (2).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "footer-social-linkedin",
    "profile": "FOOTER_SOCIAL",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Launch (2).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "footer-social-twitter",
    "profile": "FOOTER_SOCIAL",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Launch (2).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "footer-tagline",
    "profile": "FOOTER_TAGLINE",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Launch (2).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "getting-started-heading",
    "profile": "HEADING_HERO",
    "templates": [
      "Feature_Announcement (4).html"
    ]
  },
  {
    "id": "getting-started-highlight",
    "profile": "BODY_SUBTITLE",
    "templates": [
      "Feature_Announcement (4).html"
    ]
  },
  {
    "id": "getting-started-instructions",
    "profile": "BODY",
    "templates": [
      "Feature_Announcement (4).html"
    ]
  },
  {
    "id": "header-kicker",
    "profile": "HEADING_KICKER",
    "templates": [
      "Product_Launch (2).html"
    ]
  },
  {
    "id": "header-main-title",
    "profile": "HEADING_KICKER",
    "templates": [
      "Back_in_Stock_Notification (3).html"
    ]
  },
  {
    "id": "header-sale-banner",
    "profile": "PROMO_HEADING",
    "templates": [
      "Promotional_Campaign (4).html"
    ]
  },
  {
    "id": "header-subhead",
    "profile": "HEADING_KICKER",
    "templates": [
      "Back_in_Stock_Notification (3).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "header-subtitle",
    "profile": "HEADING_KICKER",
    "templates": [
      "Feature_Announcement (4).html"
    ]
  },
  {
    "id": "header-tagline",
    "profile": "HEADING_KICKER",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "header-title",
    "profile": "HEADING_KICKER",
    "templates": [
      "Feature_Announcement (4).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Survey_&_Feedback (2).html"
    ]
  },
  {
    "id": "hero-badge",
    "profile": "BADGE_FEATURE",
    "templates": [
      "Promotional_Campaign (4).html"
    ]
  },
  {
    "id": "hero-compare-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "hero-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "hero-heading",
    "profile": "HEADING_HERO",
    "templates": [
      "Promotional_Campaign (4).html"
    ]
  },
  {
    "id": "hero-image",
    "profile": "IMAGE_HERO",
    "templates": [
      "Feature_Announcement (4).html"
    ]
  },
  {
    "id": "hero-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "hero-title",
    "profile": "HEADING_HERO",
    "templates": [
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html"
    ]
  },
  {
    "id": "launch-subtitle",
    "profile": "BODY_SUBTITLE",
    "templates": [
      "Product_Launch (2).html"
    ]
  },
  {
    "id": "launch-title",
    "profile": "HEADING_HERO",
    "templates": [
      "Product_Launch (2).html"
    ]
  },
  {
    "id": "limited-stock-container",
    "profile": "SURFACE_WARNING",
    "templates": [
      "Back_in_Stock_Notification (3).html"
    ]
  },
  {
    "id": "limited-stock-message",
    "profile": "BODY_URGENCY_TEXT",
    "templates": [
      "Back_in_Stock_Notification (3).html"
    ]
  },
  {
    "id": "logo",
    "profile": "LOGO",
    "templates": [
      "Checkout_Abandonment_Email (7).html",
      "Feature_Announcement (4).html",
      "Newsletter_Editorial (5).html",
      "Order_Confirmation_Email (5).html",
      "Product_Recommendations_(Horizontal) (4).html",
      "Product_Recommendations_(Single_Product,_4_Product_Grid) (5).html",
      "Promotional_Campaign (4).html",
      "Survey_&_Feedback (2).html",
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "order-date",
    "profile": "BODY_MUTED",
    "templates": [
      "Order_Confirmation_Email (5).html"
    ]
  },
  {
    "id": "order-total-container",
    "profile": "SURFACE_LIGHT",
    "templates": [
      "Order_Confirmation_Email (5).html"
    ]
  },
  {
    "id": "order-total-container-td",
    "profile": "SURFACE_LIGHT",
    "templates": [
      "Order_Confirmation_Email (5).html"
    ]
  },
  {
    "id": "overview-description",
    "profile": "BODY",
    "templates": [
      "Feature_Announcement (4).html"
    ]
  },
  {
    "id": "overview-heading",
    "profile": "HEADING_HERO",
    "templates": [
      "Feature_Announcement (4).html"
    ]
  },
  {
    "id": "pricing-compare",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Launch (2).html"
    ]
  },
  {
    "id": "pricing-container",
    "profile": "SURFACE_LIGHT",
    "templates": [
      "Product_Launch (2).html"
    ]
  },
  {
    "id": "pricing-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Product_Launch (2).html"
    ]
  },
  {
    "id": "pricing-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "Product_Launch (2).html"
    ]
  },
  {
    "id": "pricing-main",
    "profile": "HEADING_HERO",
    "templates": [
      "Product_Launch (2).html"
    ]
  },
  {
    "id": "pricing-note",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Launch (2).html"
    ]
  },
  {
    "id": "pricing-title",
    "profile": "HEADING_HERO",
    "templates": [
      "Product_Launch (2).html"
    ]
  },
  {
    "id": "primary-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "primary-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "product-1-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-1-description",
    "profile": "BODY",
    "templates": [
      "Checkout_Abandonment_Email (7).html",
      "Order_Confirmation_Email (5).html",
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-1-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-1-name",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Checkout_Abandonment_Email (7).html",
      "Order_Confirmation_Email (5).html"
    ]
  },
  {
    "id": "product-1-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Checkout_Abandonment_Email (7).html",
      "Order_Confirmation_Email (5).html",
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-1-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-2-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-2-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-2-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-2-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-2-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-3-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-3-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-3-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-3-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-3-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-4-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-4-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-4-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-4-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-4-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "product-description",
    "profile": "BODY",
    "templates": [
      "Back_in_Stock_Notification (3).html"
    ]
  },
  {
    "id": "product-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Back_in_Stock_Notification (3).html"
    ]
  },
  {
    "id": "product-title",
    "profile": "HEADING_HERO",
    "templates": [
      "Back_in_Stock_Notification (3).html"
    ]
  },
  {
    "id": "quick-1-summary",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "quick-1-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "quick-2-summary",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "quick-2-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "quick-3-summary",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "quick-3-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "quick-heading",
    "profile": "HEADING_HERO",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "quick-subhead",
    "profile": "HEADING_SECTION",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "read-more-1",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "read-more-2",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "read-more-3",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "recommendations-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "recommendations-heading",
    "profile": "HEADING_HERO",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "sale-hero-description",
    "profile": "BODY",
    "templates": [
      "Promotional_Campaign (4).html"
    ]
  },
  {
    "id": "sale-hero-heading",
    "profile": "HEADING_HERO",
    "templates": [
      "Promotional_Campaign (4).html"
    ]
  },
  {
    "id": "shipping-amount",
    "profile": "BODY_MUTED",
    "templates": [
      "Checkout_Abandonment_Email (7).html",
      "Order_Confirmation_Email (5).html"
    ]
  },
  {
    "id": "shipping-label",
    "profile": "BODY_MUTED",
    "templates": [
      "Order_Confirmation_Email (5).html"
    ]
  },
  {
    "id": "step-1-description",
    "profile": "BODY",
    "templates": [
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "step-1-number",
    "profile": "BADGE_STEP",
    "templates": [
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "step-1-title",
    "profile": "HEADING_STEP",
    "templates": [
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "step-2-description",
    "profile": "BODY",
    "templates": [
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "step-2-number",
    "profile": "BADGE_STEP",
    "templates": [
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "step-2-title",
    "profile": "HEADING_STEP",
    "templates": [
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "step-3-description",
    "profile": "BODY",
    "templates": [
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "step-3-number",
    "profile": "BADGE_STEP",
    "templates": [
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "step-3-title",
    "profile": "HEADING_STEP",
    "templates": [
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "step-4-title",
    "profile": "HEADING_STEP",
    "templates": [
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "subtotal-amount",
    "profile": "BODY_MUTED",
    "templates": [
      "Checkout_Abandonment_Email (7).html",
      "Order_Confirmation_Email (5).html"
    ]
  },
  {
    "id": "subtotal-label",
    "profile": "BODY_MUTED",
    "templates": [
      "Order_Confirmation_Email (5).html"
    ]
  },
  {
    "id": "support-container",
    "profile": "SURFACE_INFO",
    "templates": [
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "support-message",
    "profile": "BODY",
    "templates": [
      "Welcome_&_Onboarding (3).html"
    ]
  },
  {
    "id": "survey-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Survey_&_Feedback (2).html"
    ]
  },
  {
    "id": "survey-description",
    "profile": "BODY",
    "templates": [
      "Survey_&_Feedback (2).html"
    ]
  },
  {
    "id": "tax-amount",
    "profile": "BODY_MUTED",
    "templates": [
      "Checkout_Abandonment_Email (7).html",
      "Order_Confirmation_Email (5).html"
    ]
  },
  {
    "id": "topic-1-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "topic-1-description",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "topic-1-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "topic-2-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "topic-2-description",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "topic-2-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "topic-3-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "topic-3-description",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "topic-3-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "topic-4-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "topic-4-description",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "topic-4-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "total-amount",
    "profile": "BODY_MUTED",
    "templates": [
      "Checkout_Abandonment_Email (7).html",
      "Order_Confirmation_Email (5).html"
    ]
  },
  {
    "id": "total-label",
    "profile": "BODY_MUTED",
    "templates": [
      "Order_Confirmation_Email (5).html"
    ]
  },
  {
    "id": "trending-heading",
    "profile": "HEADING_HERO",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "trending-subhead",
    "profile": "HEADING_SECTION",
    "templates": [
      "Newsletter_Editorial (5).html"
    ]
  },
  {
    "id": "urgency-note",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Launch (2).html"
    ]
  },
  {
    "id": "view-all-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Product_Recommendations_(Horizontal) (4).html"
    ]
  },
  {
    "id": "welcome-description",
    "profile": "BODY",
    "templates": [
      "Welcome_&_Onboarding (3).html"
    ]
  }
];

export const EMAIL_MARKETING_STARTER_KIT_KNOWN_ELEMENTS = EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.map((entry) => entry.id);

export const EMAIL_MARKETING_STARTER_KIT_PROFILE_BY_ELEMENT: Record<string, ElementApplyProfile> = Object.fromEntries(
  EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.map((entry) => [entry.id, entry.profile]),
);

export const EMAIL_MARKETING_STARTER_KIT_ELEMENTS_BY_TEMPLATE = Object.fromEntries(
  EMAIL_MARKETING_STARTER_KIT_TEMPLATE_FILES.map((file) => [
    file,
    EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.filter((entry) => entry.templates.includes(file)).map((entry) => entry.id),
  ]),
) as Record<EmailMarketingStarterKitTemplateFile, string[]>;

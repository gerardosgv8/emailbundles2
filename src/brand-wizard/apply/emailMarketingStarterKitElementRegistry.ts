/**
 * AUTO-GENERATED — do not edit by hand.
 * Source: FinalBundles/EmailMarketing_StarterKit/*.html
 * Regenerate: node scripts/sync-email-marketing-starter-kit-registry.mjs
 */

export const EMAIL_MARKETING_STARTER_KIT_TEMPLATE_FILES = [
  "Back_in_Stock_Notification.html",
  "Checkout_Abandonment_Email.html",
  "Feature_Announcement.html",
  "Image_Powered.html",
  "Newsletter_Editorial.html",
  "Order_Confirmation_Email.html",
  "Product_Recommendations.html",
  "Product_Recommendations_(Vertical).html",
  "Promotional_Campaign.html",
  "Survey_&_Feedback.html",
  "Welcome_&_Onboarding.html"
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

/** Every data-element hook in the Email Marketing Starter Kit (193 total). */
export const EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY: StarterKitElementEntry[] = [
  {
    "id": "arrival-1-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-1-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-1-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-1-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-1-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-1-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-2-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-2-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-2-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-2-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-2-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-2-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-3-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-3-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-3-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-3-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-3-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-3-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-4-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-4-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-4-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-4-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-4-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "arrival-4-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "back-in-stock-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Back_in_Stock_Notification.html"
    ]
  },
  {
    "id": "back-in-stock-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "Back_in_Stock_Notification.html"
    ]
  },
  {
    "id": "checkout-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "Checkout_Abandonment_Email.html"
    ]
  },
  {
    "id": "checkout-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "Checkout_Abandonment_Email.html"
    ]
  },
  {
    "id": "checkout-cta-heading",
    "profile": "HEADING_HERO",
    "templates": [
      "Checkout_Abandonment_Email.html"
    ]
  },
  {
    "id": "checkout-subheading",
    "profile": "HEADING_SECTION",
    "templates": [
      "Checkout_Abandonment_Email.html"
    ]
  },
  {
    "id": "contact-support-link",
    "profile": "BODY",
    "templates": [
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "cta-description",
    "profile": "BODY",
    "templates": [
      "Image_Powered.html"
    ]
  },
  {
    "id": "cta-heading",
    "profile": "HEADING_SECTION",
    "templates": [
      "Image_Powered.html"
    ]
  },
  {
    "id": "cta-primary",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Feature_Announcement.html"
    ]
  },
  {
    "id": "cta-secondary",
    "profile": "CTA_SECONDARY",
    "templates": [
      "Feature_Announcement.html"
    ]
  },
  {
    "id": "cta-track-order",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Order_Confirmation_Email.html"
    ]
  },
  {
    "id": "cta-view-details",
    "profile": "CTA_SECONDARY",
    "templates": [
      "Order_Confirmation_Email.html"
    ]
  },
  {
    "id": "deal-1-compare",
    "profile": "BODY_MUTED",
    "templates": [
      "Promotional_Campaign.html"
    ]
  },
  {
    "id": "deal-1-discount",
    "profile": "BODY_MUTED",
    "templates": [
      "Promotional_Campaign.html"
    ]
  },
  {
    "id": "deal-1-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Promotional_Campaign.html"
    ]
  },
  {
    "id": "deal-1-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Promotional_Campaign.html"
    ]
  },
  {
    "id": "deal-2-compare",
    "profile": "BODY_MUTED",
    "templates": [
      "Promotional_Campaign.html"
    ]
  },
  {
    "id": "deal-2-discount",
    "profile": "BODY_MUTED",
    "templates": [
      "Promotional_Campaign.html"
    ]
  },
  {
    "id": "deal-2-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Promotional_Campaign.html"
    ]
  },
  {
    "id": "deal-2-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Promotional_Campaign.html"
    ]
  },
  {
    "id": "deal-2-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Promotional_Campaign.html"
    ]
  },
  {
    "id": "feature-1-description",
    "profile": "BODY",
    "templates": [
      "Feature_Announcement.html"
    ]
  },
  {
    "id": "feature-1-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Feature_Announcement.html"
    ]
  },
  {
    "id": "feature-2-description",
    "profile": "BODY",
    "templates": [
      "Feature_Announcement.html"
    ]
  },
  {
    "id": "feature-2-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Feature_Announcement.html"
    ]
  },
  {
    "id": "feature-3-description",
    "profile": "BODY",
    "templates": [
      "Feature_Announcement.html"
    ]
  },
  {
    "id": "feature-3-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Feature_Announcement.html"
    ]
  },
  {
    "id": "featured-body",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "featured-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "featured-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "featured-insight",
    "profile": "BODY_WARNING_TEXT",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "featured-insight-container",
    "profile": "SURFACE_INFO",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "featured-title",
    "profile": "HEADING_HERO",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "footer-address",
    "profile": "FOOTER_ADDRESS",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "footer-company-name",
    "profile": "FOOTER_COMPANY",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "footer-contact",
    "profile": "FOOTER_CONTACT",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "footer-copyright",
    "profile": "FOOTER_COPYRIGHT",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "footer-icon-1",
    "profile": "FOOTER_ICON",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "footer-icon-2",
    "profile": "FOOTER_ICON",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "footer-icon-3",
    "profile": "FOOTER_ICON",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "footer-icon-4",
    "profile": "FOOTER_ICON",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "footer-link-help",
    "profile": "FOOTER_LINK",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "footer-link-privacy",
    "profile": "FOOTER_LINK",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "footer-link-terms",
    "profile": "FOOTER_LINK",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "footer-link-unsubscribe",
    "profile": "FOOTER_LINK",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "footer-social-facebook",
    "profile": "FOOTER_SOCIAL",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "footer-social-instagram",
    "profile": "FOOTER_SOCIAL",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "footer-social-linkedin",
    "profile": "FOOTER_SOCIAL",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "footer-social-twitter",
    "profile": "FOOTER_SOCIAL",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "footer-tagline",
    "profile": "FOOTER_TAGLINE",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "getting-started-heading",
    "profile": "HEADING_HERO",
    "templates": [
      "Feature_Announcement.html"
    ]
  },
  {
    "id": "getting-started-highlight",
    "profile": "BODY_SUBTITLE",
    "templates": [
      "Feature_Announcement.html"
    ]
  },
  {
    "id": "getting-started-instructions",
    "profile": "BODY",
    "templates": [
      "Feature_Announcement.html"
    ]
  },
  {
    "id": "header-main-title",
    "profile": "HEADING_KICKER",
    "templates": [
      "Back_in_Stock_Notification.html"
    ]
  },
  {
    "id": "header-subhead",
    "profile": "HEADING_KICKER",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Image_Powered.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "header-subtitle",
    "profile": "HEADING_KICKER",
    "templates": [
      "Feature_Announcement.html"
    ]
  },
  {
    "id": "header-tagline",
    "profile": "HEADING_KICKER",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "header-title",
    "profile": "HEADING_KICKER",
    "templates": [
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "hero-compare-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "hero-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "hero-heading",
    "profile": "HEADING_HERO",
    "templates": [
      "Promotional_Campaign.html"
    ]
  },
  {
    "id": "hero-image",
    "profile": "IMAGE_HERO",
    "templates": [
      "Feature_Announcement.html",
      "Newsletter_Editorial.html",
      "Product_Recommendations.html",
      "Promotional_Campaign.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "hero-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "hero-title",
    "profile": "HEADING_HERO",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "image-1",
    "profile": "IMAGE_HERO",
    "templates": [
      "Image_Powered.html"
    ]
  },
  {
    "id": "image-2",
    "profile": "IMAGE_HERO",
    "templates": [
      "Image_Powered.html"
    ]
  },
  {
    "id": "image-3",
    "profile": "IMAGE_HERO",
    "templates": [
      "Image_Powered.html"
    ]
  },
  {
    "id": "image-4",
    "profile": "IMAGE_HERO",
    "templates": [
      "Image_Powered.html"
    ]
  },
  {
    "id": "image-5",
    "profile": "IMAGE_HERO",
    "templates": [
      "Image_Powered.html"
    ]
  },
  {
    "id": "limited-stock-container",
    "profile": "SURFACE_WARNING",
    "templates": [
      "Back_in_Stock_Notification.html"
    ]
  },
  {
    "id": "limited-stock-message",
    "profile": "BODY_WARNING_TEXT",
    "templates": [
      "Back_in_Stock_Notification.html"
    ]
  },
  {
    "id": "logo",
    "profile": "LOGO",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Checkout_Abandonment_Email.html",
      "Feature_Announcement.html",
      "Image_Powered.html",
      "Newsletter_Editorial.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html",
      "Promotional_Campaign.html",
      "Survey_&_Feedback.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "order-date",
    "profile": "BODY_MUTED",
    "templates": [
      "Order_Confirmation_Email.html"
    ]
  },
  {
    "id": "order-number",
    "profile": "HEADING_SECTION",
    "templates": [
      "Order_Confirmation_Email.html"
    ]
  },
  {
    "id": "order-summary-heading",
    "profile": "HEADING_SECTION",
    "templates": [
      "Checkout_Abandonment_Email.html"
    ]
  },
  {
    "id": "order-total-container",
    "profile": "SURFACE_LIGHT",
    "templates": [
      "Order_Confirmation_Email.html"
    ]
  },
  {
    "id": "order-total-container-td",
    "profile": "SURFACE_LIGHT",
    "templates": [
      "Order_Confirmation_Email.html"
    ]
  },
  {
    "id": "overview-description",
    "profile": "BODY",
    "templates": [
      "Feature_Announcement.html"
    ]
  },
  {
    "id": "overview-heading",
    "profile": "HEADING_HERO",
    "templates": [
      "Feature_Announcement.html"
    ]
  },
  {
    "id": "primary-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Image_Powered.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "primary-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "Image_Powered.html",
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "product-1-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-1-description",
    "profile": "BODY",
    "templates": [
      "Checkout_Abandonment_Email.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-1-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Checkout_Abandonment_Email.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-1-name",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Checkout_Abandonment_Email.html",
      "Order_Confirmation_Email.html"
    ]
  },
  {
    "id": "product-1-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Checkout_Abandonment_Email.html",
      "Order_Confirmation_Email.html",
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-1-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-2-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-2-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-2-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-2-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-2-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-3-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-3-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-3-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-3-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-3-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-4-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-4-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-4-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-4-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-4-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "product-description",
    "profile": "BODY",
    "templates": [
      "Back_in_Stock_Notification.html"
    ]
  },
  {
    "id": "product-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Back_in_Stock_Notification.html",
      "Promotional_Campaign.html"
    ]
  },
  {
    "id": "product-price",
    "profile": "BODY_MUTED",
    "templates": [
      "Back_in_Stock_Notification.html"
    ]
  },
  {
    "id": "product-rec-hero-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "product-rec-hero-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "Product_Recommendations.html"
    ]
  },
  {
    "id": "product-title",
    "profile": "HEADING_HERO",
    "templates": [
      "Back_in_Stock_Notification.html"
    ]
  },
  {
    "id": "promo-main-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Promotional_Campaign.html"
    ]
  },
  {
    "id": "promo-main-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "Promotional_Campaign.html"
    ]
  },
  {
    "id": "quick-1-summary",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "quick-1-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "quick-2-summary",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "quick-2-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "quick-3-summary",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "quick-3-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "quick-heading",
    "profile": "HEADING_HERO",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "quick-subhead",
    "profile": "HEADING_SECTION",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "read-more-1",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "read-more-2",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "read-more-3",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "recommendations-description",
    "profile": "BODY",
    "templates": [
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "recommendations-heading",
    "profile": "HEADING_HERO",
    "templates": [
      "Product_Recommendations.html",
      "Product_Recommendations_(Vertical).html"
    ]
  },
  {
    "id": "sale-hero-description",
    "profile": "BODY",
    "templates": [
      "Promotional_Campaign.html"
    ]
  },
  {
    "id": "sale-hero-heading",
    "profile": "HEADING_HERO",
    "templates": [
      "Promotional_Campaign.html"
    ]
  },
  {
    "id": "shipping-amount",
    "profile": "BODY_MUTED",
    "templates": [
      "Checkout_Abandonment_Email.html",
      "Order_Confirmation_Email.html"
    ]
  },
  {
    "id": "shipping-label",
    "profile": "BODY_MUTED",
    "templates": [
      "Order_Confirmation_Email.html"
    ]
  },
  {
    "id": "step-1-description",
    "profile": "BODY",
    "templates": [
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "step-1-number",
    "profile": "BADGE_STEP",
    "templates": [
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "step-1-title",
    "profile": "HEADING_STEP",
    "templates": [
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "step-2-description",
    "profile": "BODY",
    "templates": [
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "step-2-number",
    "profile": "BADGE_STEP",
    "templates": [
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "step-2-title",
    "profile": "HEADING_STEP",
    "templates": [
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "step-3-description",
    "profile": "BODY",
    "templates": [
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "step-3-number",
    "profile": "BADGE_STEP",
    "templates": [
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "step-3-title",
    "profile": "HEADING_STEP",
    "templates": [
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "step-4-title",
    "profile": "HEADING_STEP",
    "templates": [
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "subtotal-amount",
    "profile": "BODY_MUTED",
    "templates": [
      "Checkout_Abandonment_Email.html",
      "Order_Confirmation_Email.html"
    ]
  },
  {
    "id": "subtotal-label",
    "profile": "BODY_MUTED",
    "templates": [
      "Order_Confirmation_Email.html"
    ]
  },
  {
    "id": "support-container",
    "profile": "SURFACE_LIGHT",
    "templates": [
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "support-message",
    "profile": "BODY",
    "templates": [
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "survey-cta",
    "profile": "CTA_PRIMARY",
    "templates": [
      "Survey_&_Feedback.html"
    ]
  },
  {
    "id": "survey-cta-button",
    "profile": "CTA_PRIMARY_TD",
    "templates": [
      "Survey_&_Feedback.html"
    ]
  },
  {
    "id": "survey-description",
    "profile": "BODY",
    "templates": [
      "Survey_&_Feedback.html"
    ]
  },
  {
    "id": "tax-amount",
    "profile": "BODY_MUTED",
    "templates": [
      "Checkout_Abandonment_Email.html",
      "Order_Confirmation_Email.html"
    ]
  },
  {
    "id": "tax-label",
    "profile": "BODY_MUTED",
    "templates": [
      "Order_Confirmation_Email.html"
    ]
  },
  {
    "id": "topic-1-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "topic-1-description",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "topic-1-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "topic-1-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "topic-2-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "topic-2-description",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "topic-2-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "topic-2-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "topic-3-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "topic-3-description",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "topic-3-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "topic-3-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "topic-4-cta",
    "profile": "LINK_PRODUCT",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "topic-4-description",
    "profile": "BODY",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "topic-4-image",
    "profile": "IMAGE_PRODUCT",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "topic-4-title",
    "profile": "HEADING_FEATURE",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "total-amount",
    "profile": "BODY_MUTED",
    "templates": [
      "Checkout_Abandonment_Email.html",
      "Order_Confirmation_Email.html"
    ]
  },
  {
    "id": "total-label",
    "profile": "BODY_MUTED",
    "templates": [
      "Order_Confirmation_Email.html"
    ]
  },
  {
    "id": "trending-heading",
    "profile": "HEADING_HERO",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "trending-subhead",
    "profile": "HEADING_SECTION",
    "templates": [
      "Newsletter_Editorial.html"
    ]
  },
  {
    "id": "welcome-description",
    "profile": "BODY",
    "templates": [
      "Welcome_&_Onboarding.html"
    ]
  },
  {
    "id": "welcome-heading",
    "profile": "HEADING_SECTION",
    "templates": [
      "Welcome_&_Onboarding.html"
    ]
  }
];

export const EMAIL_MARKETING_STARTER_KIT_KNOWN_ELEMENTS = EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.map((entry) => entry.id);

export const EMAIL_MARKETING_STARTER_KIT_PROFILE_BY_ELEMENT: Record<string, ElementApplyProfile> = Object.fromEntries(
  EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY.map((entry) => [entry.id, entry.profile]),
);

export const EMAIL_MARKETING_STARTER_KIT_ELEMENTS_BY_TEMPLATE = {
  "Back_in_Stock_Notification.html": [
    "logo",
    "header-main-title",
    "header-subhead",
    "product-image",
    "product-title",
    "product-description",
    "product-price",
    "limited-stock-container",
    "limited-stock-message",
    "back-in-stock-cta-button",
    "back-in-stock-cta",
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
  "Checkout_Abandonment_Email.html": [
    "logo",
    "order-summary-heading",
    "product-1-image",
    "product-1-name",
    "product-1-description",
    "product-1-price",
    "subtotal-amount",
    "shipping-amount",
    "tax-amount",
    "total-amount",
    "checkout-cta-heading",
    "checkout-subheading",
    "checkout-cta-button",
    "checkout-button",
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
  "Feature_Announcement.html": [
    "logo",
    "header-title",
    "header-subtitle",
    "hero-image",
    "overview-heading",
    "overview-description",
    "feature-1-title",
    "feature-1-description",
    "feature-2-title",
    "feature-2-description",
    "feature-3-title",
    "feature-3-description",
    "getting-started-heading",
    "getting-started-highlight",
    "getting-started-instructions",
    "cta-secondary",
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
  "Image_Powered.html": [
    "logo",
    "header-title",
    "header-subhead",
    "image-1",
    "image-2",
    "image-3",
    "image-4",
    "image-5",
    "cta-heading",
    "cta-description",
    "primary-cta-button",
    "primary-cta",
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
  "Newsletter_Editorial.html": [
    "logo",
    "header-tagline",
    "hero-image",
    "featured-title",
    "featured-body",
    "featured-insight",
    "featured-insight-container",
    "featured-cta-button",
    "featured-cta",
    "trending-heading",
    "trending-subhead",
    "topic-1-image",
    "topic-1-title",
    "topic-1-description",
    "topic-1-cta",
    "topic-2-image",
    "topic-2-title",
    "topic-2-description",
    "topic-2-cta",
    "topic-3-image",
    "topic-3-title",
    "topic-3-description",
    "topic-3-cta",
    "topic-4-image",
    "topic-4-title",
    "topic-4-description",
    "topic-4-cta",
    "quick-heading",
    "quick-subhead",
    "quick-1-title",
    "quick-1-summary",
    "read-more-1",
    "quick-2-title",
    "quick-2-summary",
    "read-more-2",
    "quick-3-title",
    "quick-3-summary",
    "read-more-3",
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
  "Order_Confirmation_Email.html": [
    "logo",
    "header-title",
    "order-number",
    "order-date",
    "product-1-image",
    "product-1-name",
    "product-1-description",
    "product-1-price",
    "order-total-container",
    "order-total-container-td",
    "subtotal-label",
    "subtotal-amount",
    "shipping-label",
    "shipping-amount",
    "tax-label",
    "tax-amount",
    "total-label",
    "total-amount",
    "cta-track-order",
    "cta-view-details",
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
  "Product_Recommendations.html": [
    "logo",
    "header-title",
    "header-subhead",
    "hero-title",
    "hero-description",
    "hero-image",
    "hero-price",
    "hero-compare-price",
    "product-rec-hero-cta-button",
    "product-rec-hero-cta",
    "recommendations-heading",
    "arrival-1-image",
    "arrival-1-title",
    "arrival-1-description",
    "arrival-1-price",
    "arrival-1-cta-button",
    "arrival-1-cta",
    "arrival-2-image",
    "arrival-2-title",
    "arrival-2-description",
    "arrival-2-price",
    "arrival-2-cta-button",
    "arrival-2-cta",
    "arrival-3-image",
    "arrival-3-title",
    "arrival-3-description",
    "arrival-3-price",
    "arrival-3-cta-button",
    "arrival-3-cta",
    "arrival-4-image",
    "arrival-4-title",
    "arrival-4-description",
    "arrival-4-price",
    "arrival-4-cta-button",
    "arrival-4-cta",
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
  "Product_Recommendations_(Vertical).html": [
    "logo",
    "header-title",
    "header-subhead",
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
    "product-4-image",
    "product-4-title",
    "product-4-description",
    "product-4-price",
    "product-4-cta",
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
  "Promotional_Campaign.html": [
    "logo",
    "hero-heading",
    "hero-image",
    "sale-hero-heading",
    "sale-hero-description",
    "product-image",
    "deal-1-title",
    "deal-1-price",
    "deal-1-compare",
    "deal-1-discount",
    "deal-2-image",
    "deal-2-title",
    "deal-2-price",
    "deal-2-compare",
    "deal-2-discount",
    "promo-main-cta-button",
    "promo-main-cta",
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
  "Survey_&_Feedback.html": [
    "logo",
    "header-title",
    "survey-description",
    "survey-cta-button",
    "survey-cta",
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
  "Welcome_&_Onboarding.html": [
    "logo",
    "header-title",
    "header-subhead",
    "hero-image",
    "welcome-heading",
    "welcome-description",
    "step-1-number",
    "step-1-title",
    "step-1-description",
    "step-2-number",
    "step-2-title",
    "step-2-description",
    "step-3-number",
    "step-3-title",
    "step-3-description",
    "primary-cta-button",
    "primary-cta",
    "support-container",
    "step-4-title",
    "support-message",
    "contact-support-link",
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
} as Record<EmailMarketingStarterKitTemplateFile, string[]>;

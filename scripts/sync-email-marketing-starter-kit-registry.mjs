/**
 * Regenerates emailMarketingStarterKitElementRegistry.ts from
 * FinalBundles/EmailMarketing_StarterKit/*.html
 * Run: node scripts/sync-email-marketing-starter-kit-registry.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const bundleDir = path.join(root, 'FinalBundles/EmailMarketing_StarterKit');
const outFile = path.join(root, 'src/brand-wizard/apply/emailMarketingStarterKitElementRegistry.ts');

const PRIMARY_CTA_IDS = new Set([
  'pricing-cta',
  'primary-cta',
  'featured-cta',
  'cta-primary',
  'cta-track-order',
  'cta-view-details',
  'survey-cta',
  'view-all-cta',
  'checkout-button',
]);

const HERO_TITLE_IDS = new Set([
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
]);

/** @param {string} id */
function classifyElement(id) {
  if (id === 'logo') return 'LOGO';
  if (id === 'footer-company-name') return 'FOOTER_COMPANY';
  if (id === 'footer-address') return 'FOOTER_ADDRESS';
  if (id === 'footer-tagline') return 'FOOTER_TAGLINE';
  if (id === 'footer-copyright') return 'FOOTER_COPYRIGHT';
  if (id === 'footer-contact') return 'FOOTER_CONTACT';
  if (id.startsWith('footer-link-')) return 'FOOTER_LINK';
  if (id.startsWith('footer-social-')) return 'FOOTER_SOCIAL';
  if (id.startsWith('footer-icon-')) return 'FOOTER_ICON';

  if (['header-kicker', 'header-tagline'].includes(id)) return 'HEADING_KICKER';
  if (['header-title', 'header-main-title', 'header-subtitle', 'header-subhead'].includes(id)) {
    return 'HEADING_KICKER';
  }
  if (id === 'header-sale-banner') return 'PROMO_HEADING';

  if (HERO_TITLE_IDS.has(id)) return 'HEADING_HERO';

  if (id.endsWith('-heading') || id === 'checkout-subheading' || id.endsWith('-subhead')) {
    return 'HEADING_SECTION';
  }

  if (id.includes('feature-') && id.endsWith('-title')) return 'HEADING_FEATURE';
  if (id.includes('step-') && id.endsWith('-title')) return 'HEADING_STEP';
  if (id.includes('product-') && (id.endsWith('-title') || id.endsWith('-name'))) return 'HEADING_FEATURE';
  if (id.includes('arrival-') && id.endsWith('-title')) return 'HEADING_FEATURE';
  if (id.includes('deal-') && id.endsWith('-title')) return 'HEADING_FEATURE';
  if (id.includes('topic-') && id.endsWith('-title')) return 'HEADING_FEATURE';
  if (id.includes('quick-') && id.endsWith('-title')) return 'HEADING_FEATURE';

  if (
    [
      'launch-subtitle',
      'header-subtitle',
      'header-subhead',
      'getting-started-highlight',
      'trending-subhead',
      'quick-subhead',
    ].includes(id)
  ) {
    return 'BODY_SUBTITLE';
  }

  if (
    id.endsWith('-description') ||
    id.endsWith('-summary') ||
    id === 'hero-description' ||
    id === 'featured-body' ||
    id === 'overview-description' ||
    id === 'recommendations-description' ||
    id === 'sale-hero-description' ||
    id === 'welcome-description' ||
    id === 'getting-started-instructions' ||
    id === 'survey-description' ||
    id === 'support-message'
  ) {
    return 'BODY';
  }

  if (
    id.endsWith('-price') ||
    id.endsWith('-compare') ||
    id.endsWith('-discount') ||
    id.endsWith('-note') ||
    id.endsWith('-label') ||
    id.endsWith('-amount') ||
    id === 'pricing-note' ||
    id === 'pricing-compare' ||
    id === 'order-date' ||
    id.includes('deal-') && (id.endsWith('-price') || id.endsWith('-compare') || id.endsWith('-discount'))
  ) {
    return 'BODY_MUTED';
  }

  if (id === 'important-note' || id === 'featured-insight') return 'BODY_WARNING_TEXT';
  if (id === 'urgency-note' || id === 'limited-stock-message') return 'BODY_URGENCY_TEXT';
  if (id === 'guide-download') return 'BODY_INFO_TEXT';

  if (id.startsWith('tier-')) return 'TIER_TEXT';

  if (id.endsWith('-cta-button') || id === 'checkout-button') {
    if (id.includes('secondary')) return 'CTA_SECONDARY_TD';
    return 'CTA_PRIMARY_TD';
  }

  if (id === 'cta-secondary') return 'CTA_SECONDARY';
  if (PRIMARY_CTA_IDS.has(id)) return 'CTA_PRIMARY';

  if (id.endsWith('-cta')) {
    if (id.includes('secondary')) return 'CTA_SECONDARY';
    if (
      id.includes('product-') ||
      id.includes('arrival-') ||
      id.includes('topic-') ||
      id.startsWith('read-more-') ||
      id === 'contact-support-link'
    ) {
      return 'LINK_PRODUCT';
    }
    return 'CTA_PRIMARY';
  }

  if (id === 'hero-badge') return 'BADGE_FEATURE';
  if (id.includes('step-') && id.endsWith('-number')) return 'BADGE_STEP';
  if (id.includes('feature-') && id.endsWith('-icon')) return 'BADGE_FEATURE';

  if (id === 'hero-image') return 'IMAGE_HERO';
  if (id.endsWith('-image')) return 'IMAGE_PRODUCT';

  if (id === 'pricing-container' || id === 'order-total-container' || id === 'order-total-container-td') {
    return 'SURFACE_LIGHT';
  }
  if (id === 'featured-insight-container' || id === 'support-container') return 'SURFACE_INFO';
  if (id === 'limited-stock-container') return 'SURFACE_WARNING';

  return 'BODY';
}

const files = fs.readdirSync(bundleDir).filter((f) => f.endsWith('.html')).sort();
/** @type {Record<string, { id: string, profile: string, templates: string[] }>} */
const registry = {};

for (const file of files) {
  const html = fs.readFileSync(path.join(bundleDir, file), 'utf8');
  const re = /data-element="([^"]+)"/g;
  let match;
  while ((match = re.exec(html))) {
    const id = match[1];
    if (!registry[id]) {
      registry[id] = { id, profile: classifyElement(id), templates: [] };
    }
    if (!registry[id].templates.includes(file)) {
      registry[id].templates.push(file);
    }
  }
}

const elements = Object.values(registry).sort((a, b) => a.id.localeCompare(b.id));

const header = `/**
 * AUTO-GENERATED — do not edit by hand.
 * Source: FinalBundles/EmailMarketing_StarterKit/*.html
 * Regenerate: node scripts/sync-email-marketing-starter-kit-registry.mjs
 */
`;

const body = `${header}
export const EMAIL_MARKETING_STARTER_KIT_TEMPLATE_FILES = ${JSON.stringify(files, null, 2)} as const;

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

/** Every data-element hook in the Email Marketing Starter Kit (${elements.length} total). */
export const EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY: StarterKitElementEntry[] = ${JSON.stringify(elements, null, 2)};

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
`;

fs.writeFileSync(outFile, body);

const known = new Set(elements.map((entry) => entry.id));
const missing = [];
for (const file of files) {
  const html = fs.readFileSync(path.join(bundleDir, file), 'utf8');
  const re = /data-element="([^"]+)"/g;
  let match;
  while ((match = re.exec(html))) {
    if (!known.has(match[1])) missing.push({ file, id: match[1] });
  }
}
if (missing.length > 0) {
  console.error('Registry verification failed:', missing);
  process.exit(1);
}

console.log(`Wrote ${elements.length} elements across ${files.length} templates → ${outFile}`);

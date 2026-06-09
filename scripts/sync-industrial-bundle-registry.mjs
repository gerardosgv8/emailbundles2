/**
 * Regenerates industrialB2bElementRegistry.ts from FinalBundles/Industrial B2B Bundle/*.html
 * Run: node scripts/sync-industrial-bundle-registry.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const bundleDir = path.join(root, 'FinalBundles/Industrial B2B Bundle');
const outFile = path.join(root, 'src/brand-wizard/apply/industrialB2bElementRegistry.ts');

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
  if (id === 'header-kicker' || id === 'header-title') return 'HEADING_KICKER';
  if (['launch-title', 'hero-title', 'promo-title', 'event-title', 'overview-heading', 'featured-title'].includes(id)) {
    return 'HEADING_HERO';
  }
  if (id === 'promo-cta-heading') return 'PROMO_HEADING';
  if (id.endsWith('-heading') || id.endsWith('-subhead')) return 'HEADING_SECTION';
  if (id.includes('feature-') && id.endsWith('-title')) return 'HEADING_FEATURE';
  if (id.includes('step-') && id.endsWith('-title')) return 'HEADING_STEP';
  if (id.includes('update-') && id.endsWith('-title')) return 'HEADING_FEATURE';
  if (id.includes('speaker-') && id.endsWith('-name')) return 'HEADING_FEATURE';
  if (id.includes('grid-product-') && id.endsWith('-title')) return 'HEADING_FEATURE';
  if (id.includes('product-') && id.endsWith('-title')) return 'HEADING_FEATURE';
  if (id === 'pricing-title') return 'HEADING_SECTION';
  if (['launch-subtitle', 'promo-subtitle', 'header-subtitle', 'event-tagline', 'getting-started-highlight'].includes(id)) {
    return 'BODY_SUBTITLE';
  }
  if (
    id.endsWith('-description') ||
    id.endsWith('-summary') ||
    id === 'featured-body' ||
    id === 'overview-description' ||
    id === 'recommendations-description' ||
    id === 'getting-started-instructions' ||
    id === 'hero-description'
  ) {
    return 'BODY';
  }
  if (id.endsWith('-value') || (id.includes('speaker-') && id.endsWith('-title')) || id === 'pricing-note') {
    return 'BODY_MUTED';
  }
  if (id.endsWith('-price') || id === 'hero-compare-price') return 'BODY';
  if (id === 'important-note' || id === 'featured-insight') return 'BODY_WARNING_TEXT';
  if (id === 'urgency-note' || id === 'promo-expiry') return 'BODY_URGENCY_TEXT';
  if (id === 'guide-download') return 'BODY_INFO_TEXT';
  if (id.startsWith('tier-')) return 'TIER_TEXT';
  if (id.endsWith('-cta-button')) {
    if (id.includes('secondary')) return 'CTA_SECONDARY_TD';
    return 'CTA_PRIMARY_TD';
  }
  if (['pricing-cta', 'promo-cta', 'cta-primary', 'hero-cta', 'primary-cta', 'featured-cta'].includes(id)) {
    return 'CTA_PRIMARY';
  }
  if (id === 'cta-secondary' || id === 'secondary-cta') return 'CTA_SECONDARY';
  if (id.endsWith('-cta') && id.includes('product-')) return 'LINK_PRODUCT';
  if (id.endsWith('-cta') && id.includes('grid-product-')) return 'LINK_PRODUCT';
  if (id.startsWith('update-') && id.endsWith('-cta')) return 'LINK_PRODUCT';
  if (id.endsWith('-icon') && id.includes('event-')) return 'BADGE_EVENT';
  if (id.endsWith('-icon') && id.includes('step-')) return 'BADGE_STEP';
  if (id.endsWith('-icon') && id.includes('feature-')) return 'BADGE_FEATURE';
  if (id === 'hero-image' || id === 'hero-product-image' || id === 'featured-image') return 'IMAGE_HERO';
  if (id.endsWith('-image')) return 'IMAGE_PRODUCT';
  if (id === 'pricing-container') return 'SURFACE_LIGHT';
  if (id === 'featured-insight-container') return 'SURFACE_INFO';
  if (id === 'important-note-container') return 'SURFACE_WARNING';
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
 * Source: FinalBundles/Industrial B2B Bundle/*.html
 * Regenerate: node scripts/sync-industrial-bundle-registry.mjs
 */
`;

const body = `${header}
export const INDUSTRIAL_B2B_TEMPLATE_FILES = ${JSON.stringify(files, null, 2)} as const;

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

/** Every data-element hook in the Industrial B2B bundle (${elements.length} total). */
export const INDUSTRIAL_B2B_ELEMENT_REGISTRY: BundleElementEntry[] = ${JSON.stringify(elements, null, 2)};

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
`;

fs.writeFileSync(outFile, body);

// Verify registry matches bundle HTML on every sync
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

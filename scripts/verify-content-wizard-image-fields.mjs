/**
 * Ensures Product Recommendations templates expose IMAGE_* hooks as Content Wizard image fields.
 * Run: node scripts/verify-content-wizard-image-fields.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = path.join(
  root,
  'src/brand-wizard/apply/emailMarketingStarterKitElementRegistry.ts',
);
const bundleDir = path.join(root, 'FinalBundles/EmailMarketing_StarterKit');

const CONTENT_SKIP_PROFILES = new Set([
  'CTA_PRIMARY_TD',
  'CTA_SECONDARY_TD',
  'FOOTER_ICON',
  'BADGE_EVENT',
  'BADGE_STEP',
  'BADGE_FEATURE',
  'SURFACE_LIGHT',
  'SURFACE_INFO',
  'SURFACE_WARNING',
]);

function profileToContentKind(profile) {
  if (CONTENT_SKIP_PROFILES.has(profile)) return null;
  if (profile.startsWith('HEADING')) return 'text';
  if (
    profile.startsWith('BODY') ||
    profile === 'TIER_TEXT' ||
    profile === 'PROMO_HEADING' ||
    profile.startsWith('FOOTER_')
  ) {
    return 'rich';
  }
  if (profile === 'CTA_PRIMARY' || profile === 'CTA_SECONDARY') return 'cta';
  if (profile === 'LINK_PRODUCT' || profile === 'FOOTER_LINK' || profile === 'FOOTER_SOCIAL') return 'link';
  if (profile === 'IMAGE_HERO' || profile === 'IMAGE_PRODUCT' || profile === 'LOGO') return 'image';
  return null;
}

function loadRegistry() {
  const src = fs.readFileSync(registryPath, 'utf8');
  const elementsStart = src.indexOf('export const EMAIL_MARKETING_STARTER_KIT_ELEMENTS_BY_TEMPLATE = ');
  const asRecord = src.indexOf('} as Record<', elementsStart);
  if (elementsStart < 0 || asRecord < 0) {
    throw new Error('Could not parse ELEMENTS_BY_TEMPLATE');
  }

  const elementsLiteral = src.slice(
    elementsStart + 'export const EMAIL_MARKETING_STARTER_KIT_ELEMENTS_BY_TEMPLATE = '.length,
    asRecord + 1,
  );
  const elementsByTemplate = Function(`return ${elementsLiteral}`)();

  const profiles = {};
  const regRe = /\{\s*"id": "([^"]+)",\s*"profile": "([^"]+)"/g;
  let m;
  while ((m = regRe.exec(src))) {
    profiles[m[1]] = m[2];
  }

  return { elementsByTemplate, profiles };
}

function contentFieldsForTemplate(elementsByTemplate, profiles, templateFile) {
  const elementIds = elementsByTemplate[templateFile] ?? [];
  const fields = [];

  for (const id of elementIds) {
    const profile = profiles[id];
    if (!profile || CONTENT_SKIP_PROFILES.has(profile)) continue;
    const kind = profileToContentKind(profile);
    if (!kind) continue;
    fields.push({ id, kind, profile });
  }

  return fields;
}

function hooksInHtml(file) {
  const html = fs.readFileSync(path.join(bundleDir, file), 'utf8');
  return [...html.matchAll(/data-element="([^"]+)"/g)].map((match) => match[1]);
}

const { elementsByTemplate, profiles } = loadRegistry();

const checks = [
  {
    file: 'Product_Recommendations.html',
    requiredImageIds: ['logo', 'hero-image', 'arrival-1-image', 'arrival-2-image', 'arrival-3-image', 'arrival-4-image'],
  },
  {
    file: 'Product_Recommendations_(Vertical).html',
    requiredImageIds: ['logo', 'product-1-image', 'product-2-image', 'product-3-image', 'product-4-image'],
  },
];

const failures = [];

for (const { file, requiredImageIds } of checks) {
  const fields = contentFieldsForTemplate(elementsByTemplate, profiles, file);
  const imageFields = fields.filter((field) => field.kind === 'image').map((field) => field.id);
  const htmlHooks = new Set(hooksInHtml(file));

  for (const id of requiredImageIds) {
    if (!imageFields.includes(id)) {
      failures.push(`${file}: registry/UI missing image field "${id}" (profile=${profiles[id] ?? 'missing'})`);
    }
    if (!htmlHooks.has(id)) {
      failures.push(`${file}: HTML missing data-element="${id}"`);
    }
  }
}

if (failures.length) {
  console.error('Failed content wizard image field checks:\n');
  for (const failure of failures) console.error(`  • ${failure}`);
  process.exit(1);
}

console.log('Content wizard image fields OK for Product Recommendations templates.');

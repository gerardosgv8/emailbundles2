/**
 * Validates Industrial B2B base templates before export.
 * Run: node scripts/verify-bundle-templates.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bundleDir = path.join(root, 'FinalBundles/Industrial B2B Bundle');

/** Filled pill CTAs: anchor hook -> required TD wrapper hook */
const FILLED_CTA_PAIRS = [
  ['pricing-cta', 'pricing-cta-button'],
  ['promo-cta', 'promo-cta-button'],
  ['hero-cta', 'hero-cta-button'],
  ['cta-primary', 'cta-primary-button'],
  ['primary-cta', 'primary-cta-button'],
  ['featured-cta', 'featured-cta-button'],
  ['cta-secondary', 'cta-secondary-button'],
  ['secondary-cta', 'secondary-cta-button'],
];

const ANCHOR_PILL_FORBIDDEN = /(?:background-color|border-radius|display\s*:\s*inline-block|padding\s*:\s*\d|margin\s*:\s*\d)/i;
const CSS_GUARD = ':not([data-element$="-cta-button"])';
const BROKEN_STYLE = /(?:!important\s+(?:background-color|font-family|padding|border))|(?:font-weight:\s*\d+\s+font-family)|(?:\d+px\s+font-family)/i;

function extractTag(html, hook) {
  const re = new RegExp(`<[^>]*data-element="${hook}"[^>]*>`, 'i');
  return html.match(re)?.[0] ?? null;
}

function anchorInsideButtonTd(html, anchorHook, buttonHook) {
  const anchorIdx = html.indexOf(`data-element="${anchorHook}"`);
  if (anchorIdx < 0) return true;
  const windowStart = Math.max(0, anchorIdx - 1200);
  const chunk = html.slice(windowStart, anchorIdx);
  return chunk.includes(`data-element="${buttonHook}"`);
}

const files = fs.readdirSync(bundleDir).filter((f) => f.endsWith('.html')).sort();
const errors = [];

for (const file of files) {
  const html = fs.readFileSync(path.join(bundleDir, file), 'utf8');

  if (!html.includes(CSS_GUARD)) {
    errors.push(`${file}: missing preview CSS guard for *-cta-button cells`);
  }

  if (BROKEN_STYLE.test(html)) {
    errors.push(`${file}: contains pre-corrupted style declarations (missing semicolons)`);
  }

  for (const [anchorHook, buttonHook] of FILLED_CTA_PAIRS) {
    if (!html.includes(`data-element="${anchorHook}"`)) continue;

    const anchorTag = extractTag(html, anchorHook);
    if (!anchorTag) continue;

    if (!html.includes(`data-element="${buttonHook}"`)) {
      errors.push(`${file}: ${anchorHook} present but missing ${buttonHook} TD wrapper`);
      continue;
    }

    if (!anchorInsideButtonTd(html, anchorHook, buttonHook)) {
      errors.push(`${file}: ${anchorHook} is not nested inside ${buttonHook}`);
    }

    const styleMatch = anchorTag.match(/style="([^"]*)"/i);
    if (styleMatch && ANCHOR_PILL_FORBIDDEN.test(styleMatch[1])) {
      errors.push(`${file}: ${anchorHook} anchor still has pill styles (move to ${buttonHook} TD)`);
    }

    const buttonTag = extractTag(html, buttonHook);
    if (buttonTag && !/background-color\s*:/i.test(buttonTag)) {
      errors.push(`${file}: ${buttonHook} TD missing background-color`);
    }
    if (buttonTag && !/padding\s*:/i.test(buttonTag)) {
      errors.push(`${file}: ${buttonHook} TD missing padding`);
    }
  }
}

if (errors.length > 0) {
  console.error('Template verification failed:\n');
  for (const err of errors) console.error(`  • ${err}`);
  process.exit(1);
}

console.log(`Verified ${files.length} templates in FinalBundles/Industrial B2B Bundle`);

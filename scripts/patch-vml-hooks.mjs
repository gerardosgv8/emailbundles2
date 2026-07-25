/**
 * Tags brand-relevant Outlook VML roundrects with data-vml-for / data-vml-kind hooks
 * so applyVmlBranding can sync fillcolor with Brand Wizard tokens.
 *
 * Run: node scripts/patch-vml-hooks.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bundleDir = path.join(root, 'FinalBundles/EmailMarketing_StarterKit');

const ROUNDRECT_RE = /<v:roundrect\b([^>]*)>([\s\S]*?)<\/v:roundrect>/gi;

function addAttr(attrs, name, value) {
  if (new RegExp(`${name}=`, 'i').test(attrs)) return attrs;
  return `${attrs.trimEnd()} ${name}="${value}"`;
}

function patchRoundrect(full, attrs, inner, html, offset) {
  if (/data-vml-for=/i.test(attrs)) return full;
  if (/v:imagedata/i.test(inner)) return full;
  if (/fillcolor="#ffffff"/i.test(attrs) && !/href=/i.test(attrs)) return full;

  let hook = inner.match(/data-element="([^"]+)"/i)?.[1] ?? null;
  if (hook === 'featured-insight') hook = 'featured-insight-container';

  let kind = null;
  if (!hook) {
    const after = html.slice(offset + full.length, offset + full.length + 600);
    const nextHook = after.match(/data-element="([^"]+)"/)?.[1] ?? null;

    if (/Track Your Order/i.test(inner)) hook = 'cta-track-order';
    else if (/View Order Details/i.test(inner)) hook = 'cta-view-details';
    else if (/SHOP MEGA SALE|Shop Mega Sale/i.test(inner)) {
      hook = 'promo-main-cta';
      kind = 'cta-primary';
    } else if (/Buy Now/i.test(inner)) {
      hook = 'back-in-stock-cta';
      kind = 'cta-primary';
    } else if (/Shop Now/i.test(inner) && /height:48px/i.test(attrs)) {
      hook = 'product-rec-hero-cta';
      kind = 'cta-primary';
    } else if (/View Details/i.test(inner) && nextHook?.startsWith('arrival-')) {
      hook = nextHook;
      kind = 'cta-primary';
    } else if (/Get Started Now/i.test(inner)) hook = 'primary-cta-button';
    else if (/Read Full Article/i.test(inner)) hook = 'featured-cta';
    else if (/Complete Checkout/i.test(inner)) hook = 'checkout-button';
    else if (/Visit Store/i.test(inner) || nextHook === 'view-all-cta') hook = 'view-all-cta';
  }

  if (!hook) return full;

  let nextAttrs = addAttr(attrs, 'data-vml-for', hook);
  if (kind) nextAttrs = addAttr(nextAttrs, 'data-vml-kind', kind);
  return `<v:roundrect${nextAttrs}>${inner}</v:roundrect>`;
}

let patched = 0;

for (const file of fs.readdirSync(bundleDir).filter((f) => f.endsWith('.html'))) {
  const filePath = path.join(bundleDir, file);
  const html = fs.readFileSync(filePath, 'utf8');
  const next = html.replace(ROUNDRECT_RE, (full, attrs, inner, offset) =>
    patchRoundrect(full, attrs, inner, html, offset),
  );
  if (next !== html) {
    fs.writeFileSync(filePath, next);
    console.log('patched:', file);
    patched += 1;
  } else {
    console.log('unchanged:', file);
  }
}

console.log(`\nDone. ${patched} templates updated.`);

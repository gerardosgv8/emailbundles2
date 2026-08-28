/**
 * Add data-element hooks to product/topic/deal images missing from Content Wizard.
 * Run: node scripts/patch-unhooked-product-images.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const bundleDir = path.join(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'),
  'FinalBundles/EmailMarketing_StarterKit',
);

/** @param {string} html @param {string} alt @param {string} hook */
function hookImgByAlt(html, alt, hook) {
  const re = new RegExp(
    `<img\\b(?![^>]*data-element=)([^>]*\\balt="${alt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*)>`,
    'i',
  );
  return html.replace(re, `<img data-element="${hook}"$1>`);
}

/** @param {string} html @param {string} hook @param {string} vmlFor */
function tagNearbyVmlImagedata(html, hook, vmlFor) {
  const marker = `data-element="${hook}"`;
  const idx = html.indexOf(marker);
  if (idx < 0) return html;

  const windowStart = Math.max(0, idx - 2000);
  const before = html.slice(windowStart, idx);
  const msoStart = before.lastIndexOf('<!--[if mso]>');
  if (msoStart < 0) return html;

  const absStart = windowStart + msoStart;
  const msoEnd = html.indexOf('<![endif]-->', absStart);
  if (msoEnd < 0 || msoEnd > idx) return html;

  const block = html.slice(absStart, msoEnd);
  if (block.includes(`data-vml-for="${vmlFor}"`)) return html;

  const updated = block.replace(
    /<v:roundrect\b/i,
    `<v:roundrect data-vml-for="${vmlFor}"`,
  );
  return html.slice(0, absStart) + updated + html.slice(msoEnd);
}

const patches = [
  {
    file: 'Product_Recommendations.html',
    apply(html) {
      let next = html;
      next = hookImgByAlt(next, 'Wireless Earbuds', 'arrival-1-image');
      next = hookImgByAlt(next, 'Smart Watch', 'arrival-2-image');
      next = hookImgByAlt(next, 'Phone Case', 'arrival-3-image');
      next = hookImgByAlt(next, 'Charging Cable', 'arrival-4-image');
      for (let i = 1; i <= 4; i += 1) {
        next = tagNearbyVmlImagedata(next, `arrival-${i}-image`, `arrival-${i}-image`);
      }
      return next;
    },
  },
  {
    file: 'Newsletter_Editorial.html',
    apply(html) {
      let next = html;
      next = hookImgByAlt(next, 'Sustainability', 'topic-1-image');
      next = hookImgByAlt(next, 'Remote Work', 'topic-2-image');
      next = hookImgByAlt(next, 'AI Technology', 'topic-3-image');
      next = hookImgByAlt(next, 'Financial Growth', 'topic-4-image');
      for (let i = 1; i <= 4; i += 1) {
        next = tagNearbyVmlImagedata(next, `topic-${i}-image`, `topic-${i}-image`);
      }
      return next;
    },
  },
  {
    file: 'Back_in_Stock_Notification.html',
    apply(html) {
      return hookImgByAlt(html, 'Premium Wireless Headphones', 'product-image');
    },
  },
  {
    file: 'Promotional_Campaign.html',
    apply(html) {
      let next = hookImgByAlt(html, 'Gaming Controller', 'deal-2-image');
      return tagNearbyVmlImagedata(next, 'deal-2-image', 'deal-2-image');
    },
  },
];

for (const { file, apply } of patches) {
  const filePath = path.join(bundleDir, file);
  const before = fs.readFileSync(filePath, 'utf8');
  const after = apply(before);
  if (after === before) {
    console.warn(`No changes: ${file}`);
  } else {
    fs.writeFileSync(filePath, after);
    console.log(`Patched: ${file}`);
  }
}

console.log('patch-unhooked-product-images: done');

/**
 * Excludes pill button TDs from blanket dark/light preview background resets.
 * Run: node scripts/patch-bundle-button-preview-css.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bundleDir = path.join(root, 'FinalBundles/Industrial B2B Bundle');

const BUTTON_TD_GUARD = ':not([data-element$="-cta-button"])';

function patchCss(css) {
  let next = css;
  next = next.replace(
    /td:not\(\[data-user-bg-color\]\)/g,
    `td:not([data-user-bg-color])${BUTTON_TD_GUARD}`,
  );
  next = next.replace(
    /td:not\(\[data-user-text-color\]\):not\(\[data-user-bg-color\]\)/g,
    `td:not([data-user-text-color]):not([data-user-bg-color])${BUTTON_TD_GUARD}`,
  );
  return next;
}

const files = fs.readdirSync(bundleDir).filter((f) => f.endsWith('.html'));
for (const file of files) {
  const filePath = path.join(bundleDir, file);
  const html = fs.readFileSync(filePath, 'utf8');
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
  if (!styleMatch) {
    console.warn(`No <style> in ${file}`);
    continue;
  }
  const patchedStyle = patchCss(styleMatch[1]);
  if (patchedStyle === styleMatch[1]) {
    console.log(`unchanged: ${file}`);
    continue;
  }
  const patched = html.replace(styleMatch[0], `<style>${patchedStyle}</style>`);
  fs.writeFileSync(filePath, patched);
  console.log(`patched: ${file}`);
}

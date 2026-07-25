/**
 * Roll back promo/warning/urgency/divider styling-rule hooks from bundle HTML.
 * Run: node scripts/rollback-styling-rules-templates.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const B2B_DIR = path.join(root, 'FinalBundles/EmailMarketing_B2B');
const SK_FILE = path.join(root, 'FinalBundles/EmailMarketing_StarterKit/Product_Launch.html');

const URGENCY_CSS_RE =
  /\s*\/\* Urgency alert panels: beat blanket table\/td resets \*\/[\s\S]*?p\[data-element="promo-expiry"\] \{\s*color: #dc2626 !important;\s*\}/g;

function rollbackHtml(html) {
  let next = html;

  next = next.replace(URGENCY_CSS_RE, '');

  next = next.replace(/ data-element="footer-divider"/g, '');
  next = next.replace(/ data-element="section-divider"/g, '');

  next = next.replace(
    /(<table[^>]*border[^>]*#fecaca[^>]*)(data-user-bg-color="")?/gi,
    (tag) => tag.replace(/\s*data-user-bg-color=""/gi, ''),
  );

  next = next.replace(
    /(<table[^>]*#fecaca[^>]*style=")([^"]*)(")/gi,
    (match, open, style, close) => {
      const updated = style
        .replace(/background-color:\s*#fef2f2\s*!important/gi, 'background-color: #ffffff')
        .replace(/background-color:\s*#fef2f2/gi, 'background-color: #ffffff');
      return `${open}${updated}${close}`;
    },
  );

  next = next.replace(/bgcolor="#fef2f2"/gi, 'bgcolor="#ffffff"');

  next = next.replace(
    /(<tr>\s*<td)([^>]*)(>\s*<p data-element="(?:urgency-note|promo-expiry)")/gi,
    (match, open, attrs, rest) => {
      let tdAttrs = attrs.replace(/\s*data-user-bg-color=""/gi, '');
      if (/background-color:\s*#fef2f2/i.test(tdAttrs)) {
        tdAttrs = tdAttrs.replace(/background-color:\s*#fef2f2\s*!important/gi, '');
        tdAttrs = tdAttrs.replace(/background-color:\s*#fef2f2/gi, '');
        tdAttrs = tdAttrs.replace(/;\s*;/g, ';').replace(/style="\s*;/, 'style="').replace(/style=";\s*/, 'style="');
      }
      return `${open}${tdAttrs}${rest}`;
    },
  );

  next = next.replace(
    /(<p data-element="(?:urgency-note|promo-expiry)"[^>]*)\s*data-user-text-color=""/gi,
    '$1',
  );

  next = next.replace(
    /(<div data-element="important-note-container"[^>]*)\s*data-user-bg-color=""/gi,
    '$1',
  );

  next = next.replace(
    /(<table[^>]*#1e293b[^>]*)\s*data-user-bg-color=""/gi,
    '$1',
  );

  return next;
}

let count = 0;

if (fs.existsSync(B2B_DIR)) {
  for (const file of fs.readdirSync(B2B_DIR).filter((f) => f.endsWith('.html'))) {
    const filePath = path.join(B2B_DIR, file);
    const original = fs.readFileSync(filePath, 'utf8');
    const rolled = rollbackHtml(original);
    if (rolled !== original) {
      fs.writeFileSync(filePath, rolled);
      console.log('rolled back:', file);
      count += 1;
    }
  }
}

if (fs.existsSync(SK_FILE)) {
  const original = fs.readFileSync(SK_FILE, 'utf8');
  const rolled = rollbackHtml(original);
  if (rolled !== original) {
    fs.writeFileSync(SK_FILE, rolled);
    console.log('rolled back: EmailMarketing_StarterKit/Product_Launch.html');
    count += 1;
  }
}

console.log(`\nDone. ${count} template(s) updated.`);

/**
 * Excludes pill button TDs from blanket dark/light preview background resets.
 * Prevents filled CTAs (white text) from becoming white-on-white when preview CSS
 * forces td { background-color: #ffffff !important }.
 *
 * Run: node scripts/patch-bundle-button-preview-css.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bundleDirs = [
  path.join(root, 'FinalBundles/EmailMarketing_StarterKit'),
  path.join(root, 'FinalBundles/EmailMarketing_B2B'),
];

const BUTTON_TD_GUARD =
  ':not(.mc-inline-btn):not([data-brand-btn-variant]):not([data-element$="-cta-button"])';

const TABLE_SURFACE_GUARD =
  ':not([style*="background-color"]):not([data-element$="-container"])';

const TD_SURFACE_GUARD =
  ':not([style*="background-color"]):not([data-element$="-container"]):not([data-element$="-container-td"])';

const SURFACE_INNER_GUARD = ':not([data-in-surface-panel])';

const INFO_PANEL_COLOR = '#e0e7ff';

const INFO_PANEL_IN_MEDIA_CSS = `
      /* Info panels: beat blanket table/td resets (must follow blanket rule) */
      td[data-element="featured-insight-container"] table,
      td[data-element="featured-insight-container"] tr,
      td[data-element="featured-insight-container"] tbody {
        background-color: transparent !important;
      }
      td[data-element="featured-insight-container"],
      td[data-element="featured-insight-container"] p[data-element="featured-insight"] {
        background-color: ${INFO_PANEL_COLOR} !important;
      }`;

const INFO_PANEL_CSS = `
    /* Info insight panels */
    td[data-element="featured-insight-container"],
    td[data-element="featured-insight-container"] p[data-element="featured-insight"] {
      background-color: ${INFO_PANEL_COLOR} !important;
    }
    td[data-element="featured-insight-container"] table,
    td[data-element="featured-insight-container"] tr,
    td[data-element="featured-insight-container"] tbody {
      background-color: transparent !important;
    }`;

const SURFACE_PANEL_CSS = `
    /* Light gray surface panels — paint wrapper cells; nested rows/cells stay transparent */
    table[data-element="pricing-container"],
    table[data-element="order-total-container"],
    table[data-element="support-container"],
    td[data-element="order-total-container-td"] {
      background-color: #f1f5f9 !important;
    }
    table[data-element="pricing-container"] > tbody > tr > td,
    table[data-element="order-total-container"] > tbody > tr > td,
    table[data-element="support-container"] > tbody > tr > td,
    td[data-element="order-total-container-td"] {
      background-color: #f1f5f9 !important;
    }
    table[data-element="pricing-container"] tr,
    table[data-element="order-total-container"] tr,
    table[data-element="support-container"] tr,
    td[data-element="order-total-container-td"] tr,
    table[data-element="pricing-container"] tbody,
    table[data-element="order-total-container"] tbody,
    table[data-element="support-container"] tbody,
    td[data-element="order-total-container-td"] tbody {
      background-color: transparent !important;
    }
    table[data-element="pricing-container"] table td:not([data-brand-btn-variant]),
    table[data-element="order-total-container"] table td:not([data-brand-btn-variant]),
    table[data-element="support-container"] table td:not([data-brand-btn-variant]),
    td[data-element="order-total-container-td"] table td:not([data-brand-btn-variant]) {
      background-color: transparent !important;
    }`;

const TR_BLANKET_PATTERN =
  /, (?:\[data-preview-theme="(?:light|dark)"\] )?tr:not\(\[data-user-bg-color\]\)/g;

const SURFACE_PANEL_IN_MEDIA_CSS = `
      /* Surface panels: beat blanket table/td resets (must follow blanket rule) */
      table[data-element="pricing-container"],
      table[data-element="order-total-container"],
      table[data-element="support-container"],
      td[data-element="order-total-container-td"],
      table[data-element="pricing-container"] > tbody > tr > td,
      table[data-element="order-total-container"] > tbody > tr > td,
      table[data-element="support-container"] > tbody > tr > td,
      td[data-element="order-total-container-td"],
      table[data-element="pricing-container"] table,
      table[data-element="order-total-container"] table,
      table[data-element="support-container"] table,
      td[data-element="order-total-container-td"] table,
      table[data-element="pricing-container"] td:not(.mc-inline-btn):not([data-brand-btn-variant]),
      table[data-element="order-total-container"] td:not(.mc-inline-btn):not([data-brand-btn-variant]),
      table[data-element="support-container"] td:not(.mc-inline-btn):not([data-brand-btn-variant]),
      td[data-element="order-total-container-td"] td:not(.mc-inline-btn):not([data-brand-btn-variant]),
      table[data-element="pricing-container"] tr,
      table[data-element="order-total-container"] tr,
      table[data-element="support-container"] tr,
      td[data-element="order-total-container-td"] tr,
      table[data-element="pricing-container"] tbody,
      table[data-element="order-total-container"] tbody,
      table[data-element="support-container"] tbody,
      td[data-element="order-total-container-td"] tbody {
        background-color: transparent !important;
      }
      table[data-element="pricing-container"],
      table[data-element="order-total-container"],
      table[data-element="support-container"],
      td[data-element="order-total-container-td"],
      table[data-element="pricing-container"] > tbody > tr > td,
      table[data-element="order-total-container"] > tbody > tr > td,
      table[data-element="support-container"] > tbody > tr > td,
      td[data-element="order-total-container-td"] {
        background-color: #f1f5f9 !important;
      }`;

const INFO_PANEL_INJECT_CSS = INFO_PANEL_IN_MEDIA_CSS;

const BLANKET_BG_LINE_LIGHT =
  /body, table:not\(\[data-user-bg-color\]\)[^}]*\{ background-color: #ffffff !important; \}/g;
const BLANKET_BG_LINE_DARK =
  /body, table:not\(\[data-user-bg-color\]\)[^}]*\{ background-color: #0b1220 !important; \}/g;
const PREVIEW_BLANKET_BG_LINE_LIGHT =
  /\[data-preview-theme="light"\] body, \[data-preview-theme="light"\] table:not\(\[data-user-bg-color\]\)[^}]*\{ background-color: #ffffff !important; \}/g;
const PREVIEW_BLANKET_BG_LINE_DARK =
  /\[data-preview-theme="dark"\] body, \[data-preview-theme="dark"\] table:not\(\[data-user-bg-color\]\)[^}]*\{ background-color: #0b1220 !important; \}/g;

const OLD_SURFACE_IN_MEDIA_MARKER =
  '/* Surface panels: nested rows must not inherit blanket tr/td resets */';

const SURFACE_PANEL_PREVIEW_THEME_CSS = `
    /* Surface panels: nested rows must not inherit blanket tr/td resets */
    [data-preview-theme="light"] table[data-element="pricing-container"],
    [data-preview-theme="light"] table[data-element="order-total-container"],
    [data-preview-theme="light"] table[data-element="support-container"],
    [data-preview-theme="light"] td[data-element="order-total-container-td"],
    [data-preview-theme="light"] table[data-element="pricing-container"] > tbody > tr > td,
    [data-preview-theme="light"] table[data-element="order-total-container"] > tbody > tr > td,
    [data-preview-theme="light"] table[data-element="support-container"] > tbody > tr > td,
    [data-preview-theme="light"] td[data-element="order-total-container-td"],
    [data-preview-theme="dark"] table[data-element="pricing-container"],
    [data-preview-theme="dark"] table[data-element="order-total-container"],
    [data-preview-theme="dark"] table[data-element="support-container"],
    [data-preview-theme="dark"] td[data-element="order-total-container-td"],
    [data-preview-theme="dark"] table[data-element="pricing-container"] > tbody > tr > td,
    [data-preview-theme="dark"] table[data-element="order-total-container"] > tbody > tr > td,
    [data-preview-theme="dark"] table[data-element="support-container"] > tbody > tr > td,
    [data-preview-theme="dark"] td[data-element="order-total-container-td"] {
      background-color: #f1f5f9 !important;
    }
    [data-preview-theme="light"] table[data-element="pricing-container"] tr,
    [data-preview-theme="light"] table[data-element="order-total-container"] tr,
    [data-preview-theme="light"] table[data-element="support-container"] tr,
    [data-preview-theme="light"] td[data-element="order-total-container-td"] tr,
    [data-preview-theme="light"] table[data-element="pricing-container"] tbody,
    [data-preview-theme="light"] table[data-element="order-total-container"] tbody,
    [data-preview-theme="light"] table[data-element="support-container"] tbody,
    [data-preview-theme="light"] td[data-element="order-total-container-td"] tbody,
    [data-preview-theme="light"] table[data-element="pricing-container"] table td:not([data-brand-btn-variant]),
    [data-preview-theme="light"] table[data-element="order-total-container"] table td:not([data-brand-btn-variant]),
    [data-preview-theme="light"] table[data-element="support-container"] table td:not([data-brand-btn-variant]),
    [data-preview-theme="light"] td[data-element="order-total-container-td"] table td:not([data-brand-btn-variant]),
    [data-preview-theme="dark"] table[data-element="pricing-container"] tr,
    [data-preview-theme="dark"] table[data-element="order-total-container"] tr,
    [data-preview-theme="dark"] table[data-element="support-container"] tr,
    [data-preview-theme="dark"] td[data-element="order-total-container-td"] tr,
    [data-preview-theme="dark"] table[data-element="pricing-container"] tbody,
    [data-preview-theme="dark"] table[data-element="order-total-container"] tbody,
    [data-preview-theme="dark"] table[data-element="support-container"] tbody,
    [data-preview-theme="dark"] td[data-element="order-total-container-td"] tbody,
    [data-preview-theme="dark"] table[data-element="pricing-container"] table td:not([data-brand-btn-variant]),
    [data-preview-theme="dark"] table[data-element="order-total-container"] table td:not([data-brand-btn-variant]),
    [data-preview-theme="dark"] table[data-element="support-container"] table td:not([data-brand-btn-variant]),
    [data-preview-theme="dark"] td[data-element="order-total-container-td"] table td:not([data-brand-btn-variant]) {
      background-color: transparent !important;
    }`;

const SURFACE_PANEL_MARKER = 'Light gray surface panels';

const SECONDARY_CTA_EXCLUDE =
  ':not([data-brand-btn-variant="secondary"]):not([data-element="cta-secondary"]):not([data-element="secondary-cta"]):not([data-element="cta-view-details"])';

const WHITE_BG_SELECTORS = [
  '*[style*="background-color: #ffffff"]:not([data-user-text-color]):not([data-user-bg-color])',
  '*[style*="background-color:#ffffff"]:not([data-user-text-color]):not([data-user-bg-color])',
  '*[style*="background-color: #fff"]:not([data-user-text-color]):not([data-user-bg-color])',
  '*[style*="background-color:#fff"]:not([data-user-text-color]):not([data-user-bg-color])',
  '*[style*="background-color:white"]:not([data-user-text-color]):not([data-user-bg-color])',
  '*[style*="background-color: rgb(255, 255, 255)"]:not([data-user-text-color]):not([data-user-bg-color])',
  '*[style*="background-color:rgb(255,255,255)"]:not([data-user-text-color]):not([data-user-bg-color])',
  '*[style*="background-color: rgba(255, 255, 255"]:not([data-user-text-color]):not([data-user-bg-color])',
  '*[style*="background-color:rgba(255,255,255"]:not([data-user-text-color]):not([data-user-bg-color])',
];

function stripOldSurfaceInMedia(css) {
  if (!css.includes(OLD_SURFACE_IN_MEDIA_MARKER)) return css;
  return css.replace(
    /\s*\/\* Surface panels: nested rows must not inherit blanket tr\/td resets \*\/[\s\S]*?background-color: transparent !important;\s*\}\s*/,
    '\n',
  );
}

function injectSurfaceAfterBlanket(css) {
  let next = css;
  let changed = false;
  const injectAfterBlanket = (pattern, block) => {
    const updated = next.replace(pattern, (match) => `${match}${block}`);
    if (updated !== next) {
      next = updated;
      changed = true;
    }
  };

  if (!next.includes('/* Surface panels: beat blanket table/td resets')) {
    injectAfterBlanket(BLANKET_BG_LINE_LIGHT, SURFACE_PANEL_IN_MEDIA_CSS);
    injectAfterBlanket(BLANKET_BG_LINE_DARK, SURFACE_PANEL_IN_MEDIA_CSS);
    injectAfterBlanket(PREVIEW_BLANKET_BG_LINE_LIGHT, SURFACE_PANEL_IN_MEDIA_CSS);
    injectAfterBlanket(PREVIEW_BLANKET_BG_LINE_DARK, SURFACE_PANEL_IN_MEDIA_CSS);
  }

  if (!next.includes('/* Info panels: beat blanket table/td resets')) {
    injectAfterBlanket(BLANKET_BG_LINE_LIGHT, INFO_PANEL_INJECT_CSS);
    injectAfterBlanket(BLANKET_BG_LINE_DARK, INFO_PANEL_INJECT_CSS);
    injectAfterBlanket(PREVIEW_BLANKET_BG_LINE_LIGHT, INFO_PANEL_INJECT_CSS);
    injectAfterBlanket(PREVIEW_BLANKET_BG_LINE_DARK, INFO_PANEL_INJECT_CSS);
  }

  if (!next.includes('/* Info insight panels */')) {
    next = `${next.trimEnd()}\n${INFO_PANEL_CSS}\n`;
    changed = true;
  }

  return { css: next, changed };
}

function addSurfaceInnerGuard(css) {
  let next = css;
  let changed = false;

  const tablePatched = next.replace(
    /(table:not\(\[data-user-bg-color\]\)(?::not\([^)]+\))+)(?=, td)/g,
    (match) => (match.includes(SURFACE_INNER_GUARD) ? match : `${match}${SURFACE_INNER_GUARD}`),
  );
  if (tablePatched !== next) {
    next = tablePatched;
    changed = true;
  }

  const tdPatched = next.replace(
    /(td:not\(\[data-user-bg-color\]\)(?::not\([^)]+\))+)(?=\s*\{)/g,
    (match) => (match.includes(SURFACE_INNER_GUARD) ? match : `${match}${SURFACE_INNER_GUARD}`),
  );
  if (tdPatched !== next) {
    next = tdPatched;
    changed = true;
  }

  return { css: next, changed };
}

function patchCss(css) {
  let next = css;
  let changed = false;

  const stripped = stripOldSurfaceInMedia(next);
  if (stripped !== next) {
    next = stripped;
    changed = true;
  }

  const trRemoved = next.replace(TR_BLANKET_PATTERN, '');
  if (trRemoved !== next) {
    next = trRemoved;
    changed = true;
  }

  const { css: withGuard, changed: guardChanged } = addSurfaceInnerGuard(next);
  next = withGuard;
  if (guardChanged) changed = true;

  const { css: withSurfaceAfter, changed: surfaceChanged } = injectSurfaceAfterBlanket(next);
  next = withSurfaceAfter;
  if (surfaceChanged) changed = true;

  if (!next.includes('Surface panels: nested rows must not inherit')) {
    next = next.replace(
      /\[data-preview-theme="light"\]\s*\{/,
      `[data-preview-theme="light"] {${SURFACE_PANEL_PREVIEW_THEME_CSS}`,
    );
    changed = true;
  }

  if (!next.includes(TABLE_SURFACE_GUARD)) {
    const tableNext = next.replace(
      /table:not\(\[data-user-bg-color\]\)/g,
      `table:not([data-user-bg-color])${TABLE_SURFACE_GUARD}`,
    );
    if (tableNext !== next) {
      next = tableNext;
      changed = true;
    }
  }

  const tdButtonPattern =
    /td:not\(\[data-user-bg-color\]\):not\(\.mc-inline-btn\):not\(\[data-brand-btn-variant\]\):not\(\[data-element\$="-cta-button"\]\)/g;
  const tdButtonReplacement = `td:not([data-user-bg-color])${BUTTON_TD_GUARD}${TD_SURFACE_GUARD}`;

  if (!next.includes(TD_SURFACE_GUARD)) {
    const tdNext = next.replace(tdButtonPattern, tdButtonReplacement);
    if (tdNext !== next) {
      next = tdNext;
      changed = true;
    }

    const tdTextNext = next.replace(
      /td:not\(\[data-user-text-color\]\):not\(\[data-user-bg-color\]\):not\(\.mc-inline-btn\):not\(\[data-brand-btn-variant\]\):not\(\[data-element\$="-cta-button"\]\)/g,
      `td:not([data-user-text-color]):not([data-user-bg-color])${BUTTON_TD_GUARD}${TD_SURFACE_GUARD}`,
    );
    if (tdTextNext !== next) {
      next = tdTextNext;
      changed = true;
    }
  }

  if (!next.includes(BUTTON_TD_GUARD)) {
    next = next.replace(
      /td:not\(\[data-user-bg-color\]\)/g,
      `td:not([data-user-bg-color])${BUTTON_TD_GUARD}`,
    );
    next = next.replace(
      /td:not\(\[data-user-text-color\]\):not\(\[data-user-bg-color\]\)/g,
      `td:not([data-user-text-color]):not([data-user-bg-color])${BUTTON_TD_GUARD}`,
    );
    changed = true;
  }

  for (const selector of WHITE_BG_SELECTORS) {
    const guarded = `${selector}${BUTTON_TD_GUARD}`;
    if (!next.includes(guarded)) {
      const selNext = next.replace(selector, guarded);
      if (selNext !== next) {
        next = selNext;
        changed = true;
      }
    }
  }

  if (!next.includes(SURFACE_PANEL_MARKER)) {
    next = `${next.trimEnd()}\n${SURFACE_PANEL_CSS}\n`;
    changed = true;
  }

  if (!next.includes(SECONDARY_CTA_EXCLUDE)) {
    next = next.replace(
      /a\[data-element\*="cta"\]:not\(\[style\*="color"\]\)/g,
      `a[data-element*="cta"]${SECONDARY_CTA_EXCLUDE}:not([style*="color"])`,
    );
    next = next.replace(
      /td\[data-element\*="cta"\] a:not\(\[style\*="color"\]\)/g,
      `td[data-element*="cta"] a${SECONDARY_CTA_EXCLUDE}:not([style*="color"])`,
    );
    changed = true;
  }

  return { css: next, changed, reason: changed ? 'patched' : 'already patched' };
}

function patchDualButtonVariants(html) {
  let next = html;
  let changed = false;

  const primaryReplacements = [
    [
      /(<td align="center" class="mc-inline-btn" style="border-radius: 8px; background-color: #2563eb; padding: 0;">\s*<a[^>]*data-element="cta-track-order")/g,
      '<td align="center" class="mc-inline-btn" data-brand-btn-variant="primary" style="border-radius: 8px; background-color: #2563eb; padding: 0;">\n                    <a data-element="cta-track-order"',
    ],
    [
      /(<td align="center" class="mc-inline-btn" style="border-radius: 8px; background-color: #2563eb; padding: 0;">\s*<a[^>]*data-element="cta-primary")/g,
      '<td align="center" class="mc-inline-btn" data-brand-btn-variant="primary" style="border-radius: 8px; background-color: #2563eb; padding: 0;">\n                    <a data-element="cta-primary"',
    ],
  ];

  const secondaryReplacements = [
    [
      /(<td align="center" class="mc-inline-btn" style="border-radius: 8px; background-color: #ffffff; border: 2px solid #2563eb; padding: 0;">\s*<a[^>]*data-element="cta-view-details")/g,
      '<td align="center" class="mc-inline-btn" data-brand-btn-variant="secondary" style="border-radius: 8px; background-color: #ffffff; border: 2px solid #2563eb; padding: 0;">\n                    <a data-element="cta-view-details"',
    ],
    [
      /(<td align="center" class="mc-inline-btn" style="border-radius: 8px; background-color: #ffffff; border: 2px solid #2563eb; padding: 0;">\s*<a[^>]*data-element="cta-secondary")/g,
      '<td align="center" class="mc-inline-btn" data-brand-btn-variant="secondary" style="border-radius: 8px; background-color: #ffffff; border: 2px solid #2563eb; padding: 0;">\n                    <a data-element="cta-secondary"',
    ],
  ];

  for (const [pattern, replacement] of [...primaryReplacements, ...secondaryReplacements]) {
    const updated = next.replace(pattern, replacement);
    if (updated !== next) {
      next = updated;
      changed = true;
    }
  }

  return { html: next, changed };
}

let cssPatched = 0;
let htmlPatched = 0;

for (const bundleDir of bundleDirs) {
  const files = fs.readdirSync(bundleDir).filter((f) => f.endsWith('.html'));
  for (const file of files) {
    const filePath = path.join(bundleDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
    if (!styleMatch) {
      console.warn(`No <style> in ${file}`);
      continue;
    }

    const { css, changed: cssChanged } = patchCss(styleMatch[1]);
    const { html: htmlWithVariants, changed: htmlChanged } = patchDualButtonVariants(html);

    if (cssChanged) {
      html = htmlWithVariants.replace(styleMatch[0], `<style>${css}</style>`);
      cssPatched++;
    } else {
      html = htmlWithVariants;
    }

    if (htmlChanged) htmlPatched++;

    if (cssChanged || htmlChanged) {
      fs.writeFileSync(filePath, html);
      console.log(`patched: ${path.basename(bundleDir)}/${file}`);
    } else {
      console.log(`unchanged: ${path.basename(bundleDir)}/${file}`);
    }
  }
}

console.log(`\nDone. CSS: ${cssPatched}, dual-button variants: ${htmlPatched}`);

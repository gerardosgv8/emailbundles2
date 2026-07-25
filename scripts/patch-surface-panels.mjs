/**
 * Fixes light-gray surface panels (#f1f5f9) in Email Marketing Starter Kit templates.
 * - Inline !important backgrounds on surface hooks
 * - data-user-bg-color so preview CSS skips blanket resets
 * - Expanded surface-panel CSS (nested tr/tbody transparent)
 *
 * Run: node scripts/patch-surface-panels.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bundleDir = path.join(root, 'FinalBundles/EmailMarketing_StarterKit');
const PANEL_COLOR = '#f1f5f9';

const SURFACE_PANEL_CSS = `
    /* Light gray surface panels — paint wrapper cells; nested rows/cells stay transparent */
    table[data-element="pricing-container"],
    table[data-element="order-total-container"],
    table[data-element="support-container"],
    td[data-element="order-total-container-td"] {
      background-color: ${PANEL_COLOR} !important;
    }
    table[data-element="pricing-container"] > tbody > tr > td,
    table[data-element="order-total-container"] > tbody > tr > td,
    table[data-element="support-container"] > tbody > tr > td,
    td[data-element="order-total-container-td"] {
      background-color: ${PANEL_COLOR} !important;
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

const SURFACE_PANEL_MARKER = 'Light gray surface panels';

const SURFACE_HOOKS = [
  'pricing-container',
  'order-total-container',
  'order-total-container-td',
  'support-container',
];

const SURFACE_ROOT_HOOK_RE =
  /data-element="(pricing-container|order-total-container|support-container|order-total-container-td)"/;

function markInnerSurfaceTags(inner) {
  return inner.replace(/<(table|tr|td|tbody)(\s[^>]*)?>/gi, (match, tag, attrs = '') => {
    if (/data-in-surface-panel/i.test(match)) return match;
    if (/mc-inline-btn|data-brand-btn-variant|data-element\$?=-cta-button/i.test(match)) return match;
    return `<${tag} data-in-surface-panel=""${attrs}>`;
  });
}

function patchSurfaceDescendants(html) {
  let next = html;
  let changed = false;
  let i = 0;

  while (i < next.length) {
    const openIdx = next.indexOf('<', i);
    if (openIdx === -1) break;

    const openTagMatch = next.slice(openIdx).match(/^<(table|td)\b([^>]*)>/i);
    if (!openTagMatch || !SURFACE_ROOT_HOOK_RE.test(openTagMatch[2])) {
      i = openIdx + 1;
      continue;
    }

    const tagName = openTagMatch[1].toLowerCase();
    const contentStart = openIdx + openTagMatch[0].length;
    const tagRe = new RegExp(`<\\/?${tagName}\\b[^>]*>`, 'gi');
    tagRe.lastIndex = contentStart;

    let depth = 1;
    let contentEnd = -1;
    let match;
    while ((match = tagRe.exec(next)) !== null) {
      const token = match[0];
      if (token.startsWith('</')) {
        depth -= 1;
        if (depth === 0) {
          contentEnd = match.index;
          break;
        }
      } else if (!token.endsWith('/>')) {
        depth += 1;
      }
    }

    if (contentEnd === -1) {
      i = contentStart;
      continue;
    }

    const inner = next.slice(contentStart, contentEnd);
    const patchedInner = markInnerSurfaceTags(inner);
    if (patchedInner !== inner) {
      next = `${next.slice(0, contentStart)}${patchedInner}${next.slice(contentEnd)}`;
      changed = true;
    }

    i = contentEnd;
  }

  return { html: next, changed };
}

function upsertBgImportant(style, color) {
  let next = style ?? '';
  const decl = `background-color: ${color} !important`;
  if (/background-color:\s*[^;]+/i.test(next)) {
    next = next.replace(/background-color:\s*[^;]+/i, decl);
  } else {
    next = next.trim() ? `${next.trim().replace(/;\s*$/, '')}; ${decl}` : decl;
  }
  return next.trim();
}

function patchSurfaceElement(openingTag, color) {
  let tag = openingTag;
  if (!/data-user-bg-color/i.test(tag)) {
    tag = tag.replace(/<(\w+)/, '<$1 data-user-bg-color=""');
  }
  const styleMatch = tag.match(/style="([^"]*)"/i);
  if (styleMatch) {
    const newStyle = upsertBgImportant(styleMatch[1], color);
    tag = tag.replace(/style="[^"]*"/i, `style="${newStyle}"`);
  } else {
    tag = tag.replace(/>$/, ` style="background-color: ${color} !important;">`);
  }
  if (tag.startsWith('<table') && !/bgcolor="/i.test(tag)) {
    tag = tag.replace('<table', `<table bgcolor="${color}"`);
  }
  return tag;
}

function patchHtmlBody(html) {
  let next = html;
  let changed = false;

  for (const hook of SURFACE_HOOKS) {
    const re = new RegExp(`<([a-z]+)([^>]*data-element="${hook}"[^>]*)>`, 'gi');
    next = next.replace(re, (match) => {
      const patched = patchSurfaceElement(match, PANEL_COLOR);
      if (patched !== match) changed = true;
      return patched;
    });
  }

  // Direct wrapper td inside surface tables (first row cell)
  for (const hook of ['pricing-container', 'order-total-container', 'support-container']) {
    const re = new RegExp(
      `(data-element="${hook}"[^>]*>[\\s\\S]*?<tr>\\s*<td)([^>]*style=")([^"]*)(")`,
      'i',
    );
    next = next.replace(re, (match, prefix, styleOpen, styleBody, styleClose) => {
      const newStyle = upsertBgImportant(styleBody, PANEL_COLOR);
      const patched = `${prefix}${styleOpen}${newStyle}${styleClose}`;
      if (!patched.includes('data-user-bg-color')) {
        return patched.replace('<td', '<td data-user-bg-color=""');
      }
      return patched;
    });
  }

  return { html: next, changed };
}

function patchStyleBlock(css) {
  const markerIdx = css.indexOf(SURFACE_PANEL_MARKER);
  if (markerIdx === -1) {
    return { css: `${css.trimEnd()}\n${SURFACE_PANEL_CSS}\n`, changed: true };
  }

  const start = css.lastIndexOf('\n', markerIdx);
  const end = css.indexOf('background-color: transparent !important;', markerIdx);
  if (end === -1) {
    return { css, changed: false };
  }
  const blockEnd = css.indexOf('}', end) + 1;
  const next = `${css.slice(0, start)}${SURFACE_PANEL_CSS}\n${css.slice(blockEnd)}`;
  return { css: next, changed: next !== css };
}

let patched = 0;

for (const file of fs.readdirSync(bundleDir).filter((f) => f.endsWith('.html'))) {
  const filePath = path.join(bundleDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
  if (!styleMatch) continue;

  const { css, changed: styleChanged } = patchStyleBlock(styleMatch[1]);
  const bodyParts = html.split('</head>');
  const { html: bodyPatched, changed: bodyChanged } = patchHtmlBody(bodyParts[1] ?? '');
  const { html: bodyWithDescendants, changed: descendantChanged } =
    patchSurfaceDescendants(bodyPatched);

  if (styleChanged || bodyChanged || descendantChanged) {
    html = `${bodyParts[0]}</head>${bodyWithDescendants}`;
    if (styleChanged) {
      html = html.replace(styleMatch[0], `<style>${css}</style>`);
    }
    fs.writeFileSync(filePath, html);
    console.log('patched:', file);
    patched++;
  } else {
    console.log('unchanged:', file);
  }
}

console.log(`\nDone. ${patched} templates updated.`);

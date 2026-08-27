export function setInlineStyle(el: Element, prop: string, value: string, important = false) {
  const target = el instanceof HTMLElement ? el : null;
  if (!target || !value) return;
  target.style.setProperty(prop, value, important ? 'important' : '');
}

export function markUserStyled(el: Element, opts: { bg?: boolean; text?: boolean }) {
  if (opts.bg) el.setAttribute('data-user-bg-color', '');
  if (opts.text) el.setAttribute('data-user-text-color', '');
}

/**
 * Layout / spacing / type metrics. Color and fill toggles must never clear these
 * unless a caller opts in *and* has already written replacements onto the pill surface.
 */
export const STRUCTURAL_STYLE_PROPERTIES = [
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'border-radius',
  'width',
  'height',
  'min-width',
  'max-width',
  'line-height',
  'font-size',
  'font-weight',
  'font-family',
  'display',
  'vertical-align',
  'letter-spacing',
  'white-space',
] as const;

const STRUCTURAL_STYLE_SET = new Set<string>(STRUCTURAL_STYLE_PROPERTIES);

/** Paint tokens that brand apply may rewrite freely. */
export const VISUAL_FILL_STYLE_PROPERTIES = [
  'background-color',
  'border',
  'border-color',
  'border-width',
  'border-style',
] as const;

export function isStructuralStyleProperty(property: string): boolean {
  return STRUCTURAL_STYLE_SET.has(property.toLowerCase());
}

/** Remove inline declarations from a style attribute (email-safe string edit). */
export function removeStylePropertiesFromElement(
  el: Element,
  properties: string[],
  opts: { allowStructural?: boolean } = {},
) {
  const filtered = opts.allowStructural
    ? properties
    : properties.filter((property) => !isStructuralStyleProperty(property));

  if (filtered.length === 0) return;

  let style = el.getAttribute('style') ?? '';
  for (const property of filtered) {
    const escaped = property.replace(/-/g, '\\-');
    // Exact property name only — `border` must not match `border-radius`.
    const re = new RegExp(`(?:^|;)\\s*${escaped}\\s*:\\s*[^;]*`, 'gi');
    style = style.replace(re, '');
  }
  style = style.replace(/^\s*;\s*/, '').replace(/;\s*;/g, ';').trim();
  el.setAttribute('style', style);
}

/**
 * Clear duplicate fill/outline on the link when the wrapper TD owns the pill.
 * Never touches padding, radius, display, fonts, etc.
 */
export function stripAnchorDuplicateFillStyles(anchor: HTMLElement) {
  removeStylePropertiesFromElement(anchor, [...VISUAL_FILL_STYLE_PROPERTIES]);
  upsertStylePropertyOnElement(anchor, 'border', 'none', true);
  upsertStylePropertyOnElement(anchor, 'background-color', 'transparent', true);
}

/** @deprecated Use stripAnchorDuplicateFillStyles — structural props must not be stripped by paint. */
export function stripLegacyAnchorPillStyles(anchor: HTMLElement) {
  stripAnchorDuplicateFillStyles(anchor);
}

export function readInlineStyleProperty(el: Element, property: string): string {
  const style = el.getAttribute('style') ?? '';
  const escaped = property.replace(/-/g, '\\-');
  const match = style.match(new RegExp(`(?:^|;)\\s*${escaped}\\s*:\\s*([^;]+)`, 'i'));
  return match?.[1]?.replace(/\s*!important\s*$/i, '').trim() ?? '';
}

function isEmptyBoxValue(value: string): boolean {
  if (!value) return true;
  return /^0+(?:px|em|rem|%)?(?:\s+0+(?:px|em|rem|%)?){0,3}$/i.test(value.trim());
}

/**
 * Guarantee button padding/radius survive paint updates:
 * 1) Prefer Design Rules geometry
 * 2) Else keep wrapper values
 * 3) Else migrate from the anchor
 * Only then may structural props be cleared from the anchor.
 */
function ensureButtonGeometryOnWrapper(
  wrapper: HTMLTableCellElement,
  anchor: HTMLElement,
  geometry: { padding?: string; radius?: string },
) {
  const wrapperPadding = readInlineStyleProperty(wrapper, 'padding');
  const anchorPadding = readInlineStyleProperty(anchor, 'padding');
  const padding =
    geometry.padding?.trim() ||
    (!isEmptyBoxValue(wrapperPadding) ? wrapperPadding : '') ||
    anchorPadding;

  const wrapperRadius = readInlineStyleProperty(wrapper, 'border-radius');
  const anchorRadius = readInlineStyleProperty(anchor, 'border-radius');
  const radius = geometry.radius?.trim() || wrapperRadius || anchorRadius;

  if (padding) {
    upsertStylePropertyOnElement(wrapper, 'padding', padding, true);
    removeStylePropertiesFromElement(
      anchor,
      ['padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
      { allowStructural: true },
    );
  }

  if (radius) {
    upsertStylePropertyOnElement(wrapper, 'border-radius', radius, true);
    removeStylePropertiesFromElement(anchor, ['border-radius'], { allowStructural: true });
  }
}

/** Rewrite the style attribute string so values persist in serialized HTML (email-safe). */
export function upsertStylePropertyOnElement(
  el: Element,
  property: string,
  value: string,
  important = true,
) {
  if (!value) return;
  const decl = important ? `${property}: ${value} !important` : `${property}: ${value}`;
  let style = el.getAttribute('style') ?? '';
  const escaped = property.replace(/-/g, '\\-');
  const re = new RegExp(`(?:^|;)\\s*${escaped}\\s*:\\s*[^;]*`, 'i');
  if (re.test(style)) {
    style = style.replace(re, (match) => `${match.startsWith(';') ? '; ' : ''}${decl}`);
  } else {
    style = style.trim() ? `${style.trim().replace(/;\s*$/, '')}; ${decl}` : decl;
  }
  el.setAttribute('style', style.trim());
}

export function setColor(el: Element, color: string, important = true) {
  if (!color) return;
  markUserStyled(el, { text: true });
  upsertStylePropertyOnElement(el, 'color', color, important);
}

export function setBackground(el: Element, color: string, important = true) {
  if (!color) return;
  markUserStyled(el, { bg: true });
  upsertStylePropertyOnElement(el, 'background-color', color, important);
  el.setAttribute('bgcolor', color);
}

export function setBorderColor(el: Element, color: string, important = true) {
  if (!color) return;
  upsertStylePropertyOnElement(el, 'border-color', color, important);
}

export function setLinkDecoration(el: Element, decoration = 'none') {
  const apply = (anchor: Element) => {
    upsertStylePropertyOnElement(anchor, 'text-decoration', decoration, true);
  };
  if (el.tagName === 'A') {
    apply(el);
    return;
  }
  el.querySelectorAll('a').forEach(apply);
}

export function setLinkColor(el: Element, color: string) {
  if (!color) return;
  const apply = (anchor: Element) => {
    markUserStyled(anchor, { text: true });
    upsertStylePropertyOnElement(anchor, 'color', color, true);
    setLinkDecoration(anchor);
  };
  if (el.tagName === 'A') {
    apply(el);
    return;
  }
  el.querySelectorAll('a').forEach(apply);
}

export function setTextContent(el: Element, value: string) {
  if (el.tagName === 'IMG') return;
  const anchors = el.querySelectorAll('a');
  if (anchors.length === 1 && el.textContent?.trim() === anchors[0].textContent?.trim()) {
    anchors[0].textContent = value;
    return;
  }
  el.textContent = value;
}

export function setHref(el: Element, value: string) {
  if (!value) return;
  if (el.tagName === 'A') {
    el.setAttribute('href', value);
    return;
  }
  el.querySelectorAll('a').forEach((anchor) => anchor.setAttribute('href', value));
}

export function applyFontFamily(root: Document | Element, fontStack: string) {
  const wrapper = root instanceof Document
    ? root.querySelector('[data-element="email-body"], [data-element="email-wrapper"], body')
    : root;
  if (!wrapper) return;
  setInlineStyle(wrapper, 'font-family', fontStack);
  wrapper.querySelectorAll('td, p, span, a, h1, h2, h3, h4').forEach((node) => {
    if (node instanceof HTMLElement) {
      node.style.fontFamily = fontStack;
    }
  });
}

function isCtaButtonWrapperTd(td: HTMLTableCellElement): boolean {
  const hook = td.getAttribute('data-element') ?? '';
  if (!hook.endsWith('-button')) return false;
  return (
    hook.endsWith('-cta-button') ||
    hook.startsWith('cta-') ||
    hook.includes('-cta-')
  );
}

function isButtonWrapperTd(td: HTMLTableCellElement, forAnchor?: Element): boolean {
  if (isCtaButtonWrapperTd(td)) return true;
  if (td.getAttribute('data-brand-btn-variant')) return true;
  if (td.classList.contains('mc-inline-btn')) return true;
  const hook = td.getAttribute('data-element') ?? '';
  if (hook.includes('button') || hook.includes('cta')) return true;
  const style = td.getAttribute('style') ?? '';
  if (/background-color/i.test(style) && /border-radius/i.test(style)) return true;
  if (forAnchor?.getAttribute('data-element') === 'promo-cta') return true;
  return false;
}

function isAnchorInButtonWrapperTd(node: HTMLElement): boolean {
  if (node.tagName !== 'A') return false;
  const td = findAncestorTd(node);
  return td ? isButtonWrapperTd(td, node) : false;
}

function collectCtaTargets(el: Element): HTMLElement[] {
  const targets: HTMLElement[] = [];
  if (el instanceof HTMLElement) targets.push(el);

  if (el.tagName === 'A') {
    const td = findAncestorTd(el);
    if (td && isButtonWrapperTd(td, el) && !targets.includes(td)) {
      targets.push(td);
    }
  }

  if (el.tagName === 'TD') {
    el.querySelectorAll('a').forEach((anchor) => {
      if (anchor instanceof HTMLElement && !targets.includes(anchor)) {
        targets.push(anchor);
      }
    });
  }

  return targets;
}

function applyStyleToNode(
  node: HTMLElement,
  opts: {
    bg?: string;
    color?: string;
    borderColor?: string;
    variant?: 'primary' | 'secondary';
    padding?: string;
    radius?: string;
  },
) {
  const isTd = node.tagName === 'TD';
  const wrapperTd = isTd ? (node as HTMLTableCellElement) : findAncestorTd(node);
  const anchorInButtonTd = !isTd && isAnchorInButtonWrapperTd(node);
  const geometry = { padding: opts.padding, radius: opts.radius };

  if (opts.variant) node.setAttribute('data-brand-btn-variant', opts.variant);

  // --- Visual tokens only (safe to toggle repeatedly) ---
  if (opts.bg && (isTd || !anchorInButtonTd)) {
    markUserStyled(node, { bg: true });
    upsertStylePropertyOnElement(node, 'background-color', opts.bg, true);
    if (isTd) node.setAttribute('bgcolor', opts.bg);
  }

  if (opts.color && !isTd) {
    markUserStyled(node, { text: true });
    upsertStylePropertyOnElement(node, 'color', opts.color, true);
  }

  if (!isTd) {
    upsertStylePropertyOnElement(node, 'text-decoration', 'none', true);
  }

  if (opts.borderColor && (isTd || !anchorInButtonTd)) {
    upsertStylePropertyOnElement(node, 'border', `2px solid ${opts.borderColor}`, true);
    upsertStylePropertyOnElement(node, 'border-color', opts.borderColor, true);
  }

  // --- Structural tokens: write/migrate, never delete blindly ---
  if (anchorInButtonTd && wrapperTd && wrapperTd !== node) {
    ensureButtonGeometryOnWrapper(wrapperTd, node, geometry);
    stripAnchorDuplicateFillStyles(node);
    return;
  }

  if (opts.padding && (isTd || !anchorInButtonTd)) {
    upsertStylePropertyOnElement(node, 'padding', opts.padding, true);
  }
  if (opts.radius && (isTd || !anchorInButtonTd)) {
    upsertStylePropertyOnElement(node, 'border-radius', opts.radius, true);
  }
}

export function applyPrimaryCta(
  el: Element,
  bg: string,
  text: string,
  variant: 'primary' | 'secondary' = 'primary',
  geometry: { padding?: string; radius?: string } = {},
) {
  if (!bg && !text) return;

  collectCtaTargets(el).forEach((node) => {
    applyStyleToNode(node, {
      bg,
      color: text,
      variant,
      padding: geometry.padding,
      radius: geometry.radius,
    });
  });
}

export function applySecondaryCta(
  el: Element,
  bg: string,
  text: string,
  border: string,
  geometry: { padding?: string; radius?: string } = {},
) {
  if (!bg && !text && !border) return;

  collectCtaTargets(el).forEach((node) => {
    applyStyleToNode(node, {
      bg,
      color: text,
      borderColor: border,
      variant: 'secondary',
      padding: geometry.padding,
      radius: geometry.radius,
    });
  });
}

/** Ensure template links keep flat text styling after brand apply. */
export function applyLinkDecorationPass(doc: Document) {
  doc.querySelectorAll('a[data-element]').forEach((anchor) => {
    upsertStylePropertyOnElement(anchor, 'text-decoration', 'none', true);
  });
}

export function applySurfaceLightPanel(el: Element, color: string) {
  if (!color) return;

  const hook = el.getAttribute('data-element') ?? '';
  setBackground(el, color);

  if (el.tagName === 'TABLE' && hook.endsWith('-container')) {
    el.querySelectorAll(':scope > tbody > tr > td, :scope > tr > td').forEach((td) => {
      setBackground(td, color);
    });
    el.querySelectorAll('tr, tbody').forEach((row) => {
      markUserStyled(row, { bg: true });
      upsertStylePropertyOnElement(row, 'background-color', 'transparent', true);
    });
    el.querySelectorAll('table td').forEach((td) => {
      if (td.getAttribute('data-brand-btn-variant')) return;
      markUserStyled(td, { bg: true });
      upsertStylePropertyOnElement(td, 'background-color', 'transparent', true);
    });
  }

  if (el.tagName === 'TD' && hook.endsWith('-container-td')) {
    el.querySelectorAll('tr, tbody').forEach((row) => {
      markUserStyled(row, { bg: true });
      upsertStylePropertyOnElement(row, 'background-color', 'transparent', true);
    });
    el.querySelectorAll('table td').forEach((td) => {
      if (td.getAttribute('data-brand-btn-variant')) return;
      markUserStyled(td, { bg: true });
      upsertStylePropertyOnElement(td, 'background-color', 'transparent', true);
    });
  }
}

export function applyLogo(
  el: Element,
  src: string,
  alt: string,
  width: string,
  height: string,
  opts: { force?: boolean } = {},
) {
  if (el.tagName !== 'IMG') {
    el.querySelectorAll('img').forEach((img) => {
      if (opts.force || isLikelyLogoImage(img)) {
        applyLogo(img, src, alt, width, height, opts);
      }
    });
    return;
  }
  if (!opts.force && !isLikelyLogoImage(el)) return;
  if (src) el.setAttribute('src', src);
  if (alt) el.setAttribute('alt', alt);
  const widthPx = width.trim();
  const heightPx = height.trim();
  if (widthPx) {
    const numeric = widthPx.replace(/px$/i, '');
    el.setAttribute('width', numeric);
    upsertStylePropertyOnElement(el, 'width', /px$/i.test(widthPx) ? widthPx : `${numeric}px`, false);
  }
  if (heightPx && heightPx !== 'auto') {
    const numeric = heightPx.replace(/px$/i, '');
    el.setAttribute('height', numeric);
    upsertStylePropertyOnElement(el, 'height', /px$/i.test(heightPx) ? heightPx : `${numeric}px`, false);
  } else if (heightPx === 'auto') {
    upsertStylePropertyOnElement(el, 'height', 'auto', false);
  }
}

function readElementPx(el: Element, name: 'width' | 'height'): number {
  const attr = el.getAttribute(name) ?? '';
  const parsePx = (raw: string) => {
    const n = Number.parseFloat(raw.replace(/px$/i, '').trim());
    return Number.isFinite(n) ? n : 0;
  };
  let value = parsePx(attr);
  if (!value) {
    const style = el.getAttribute('style') ?? '';
    const m = style.match(new RegExp(`(?:^|;)\\s*${name}:\\s*([0-9.]+)px`, 'i'));
    if (m) value = parsePx(m[1]);
  }
  return value;
}

/** True header marks are ~160–200×≤90. Heroes/products are larger. */
export function isHeaderLogoSized(el: Element): boolean {
  if (el.tagName !== 'IMG') return false;
  const w = readElementPx(el, 'width');
  const h = readElementPx(el, 'height');
  if (w < 150 || w > 220) return false;
  return h <= 0 || h <= 90;
}

/**
 * Candidate for logo branding. Never trusts a mis-tagged hero just because
 * data-element="logo" — corrupted zips have moved that hook onto 600×400 images.
 */
export function isLikelyLogoImage(el: Element): boolean {
  if (el.tagName !== 'IMG') return false;
  const hook = el.getAttribute('data-element') ?? '';
  if (hook && hook !== 'logo' && hook !== 'header-logo') return false;
  return isHeaderLogoSized(el);
}

/** Repair corrupted templates where logo hooks sit on hero/product images. */
export function healLogoHooks(doc: Document): number {
  let healed = 0;

  // Strip logo hooks from clearly non-logo sizes (heroes/products).
  doc.querySelectorAll('img[data-element="logo"], img[data-element="header-logo"]').forEach((img) => {
    if (isHeaderLogoSized(img)) return;
    const w = readElementPx(img, 'width');
    const h = readElementPx(img, 'height');
    if (w >= 400 || h >= 200) {
      img.setAttribute('data-element', 'hero-image');
    } else {
      img.removeAttribute('data-element');
    }
    healed += 1;
  });

  // Canonical header logo = first header-sized mark in document order.
  const firstHeader = [...doc.querySelectorAll('img')].find((img) => {
    const hook = img.getAttribute('data-element') ?? '';
    if (hook && hook !== 'logo' && hook !== 'header-logo') return false;
    return isHeaderLogoSized(img);
  });

  if (!firstHeader) return healed;

  if (firstHeader.getAttribute('data-element') !== 'logo') {
    firstHeader.setAttribute('data-element', 'logo');
    healed += 1;
  }

  // Remove duplicate logo hooks so product thumbs never keep the logo identity.
  doc.querySelectorAll('img[data-element="logo"], img[data-element="header-logo"]').forEach((img) => {
    if (img === firstHeader) return;
    img.removeAttribute('data-element');
    healed += 1;
  });

  return healed;
}

function readImgTagDimension(tag: string, name: 'width' | 'height'): number {
  const attr = tag.match(new RegExp(`\\b${name}\\s*=\\s*["']?(\\d+)`, 'i'));
  if (attr) return Number.parseFloat(attr[1]);
  const style = tag.match(new RegExp(`(?:^|;|\\s)${name}\\s*:\\s*([0-9.]+)px`, 'i'));
  if (style) return Number.parseFloat(style[1]);
  return 0;
}

function isLogoCandidateImgTag(tag: string): boolean {
  if (/data-element\s*=\s*["'](?!logo\b|header-logo\b)[^"']+["']/i.test(tag)) return false;
  const w = readImgTagDimension(tag, 'width');
  const h = readImgTagDimension(tag, 'height');
  // Size gate always — even for hooked logos (guards corrupted previously-branded zips).
  if (w < 150 || w > 220) return false;
  return h <= 0 || h <= 90;
}

function rewriteImgTagAttr(tag: string, name: string, value: string): string {
  const re = new RegExp(`(\\s${name}\\s*=\\s*)(["'])(.*?)\\2`, 'i');
  if (re.test(tag)) {
    // Use a replacer fn so `$` in URLs is not treated as a replacement pattern.
    return tag.replace(re, (_m, prefix: string, quote: string) => `${prefix}${quote}${value}${quote}`);
  }
  return tag.replace(/<img\b/i, `<img ${name}="${value}"`);
}

/**
 * DOMParser cannot see imgs inside Outlook conditional comments. Rewrite logo
 * candidates in the raw HTML string so MSO and unhooked header marks update too.
 */
export function applyLogoInRawHtml(
  html: string,
  src: string,
  alt: string,
  width: string,
  height: string,
): { html: string; updated: number } {
  if (!src.trim()) return { html, updated: 0 };
  let updated = 0;
  const widthNumeric = width.trim().replace(/px$/i, '');
  const heightNumeric = height.trim().replace(/px$/i, '');
  const next = html.replace(/<img\b[^>]*>/gi, (tag) => {
    if (!isLogoCandidateImgTag(tag)) return tag;
    let out = rewriteImgTagAttr(tag, 'src', src.trim());
    if (alt.trim()) out = rewriteImgTagAttr(out, 'alt', alt.trim());
    if (widthNumeric) {
      out = rewriteImgTagAttr(out, 'width', widthNumeric);
      out = out.replace(/style\s*=\s*(["'])([\s\S]*?)\1/i, (_m, q: string, style: string) => {
        let nextStyle = String(style);
        if (/(?:^|;)\s*width\s*:/i.test(nextStyle)) {
          nextStyle = nextStyle.replace(/(?:^|;)\s*width\s*:\s*[^;]*/i, (decl) =>
            `${decl.startsWith(';') ? ';' : ''} width: ${widthNumeric}px`,
          );
        } else {
          nextStyle = `${nextStyle.trim().replace(/;?\s*$/, '')}; width: ${widthNumeric}px`;
        }
        return `style=${q}${nextStyle.trim()}${q}`;
      });
    }
    if (heightNumeric && heightNumeric !== 'auto') {
      out = rewriteImgTagAttr(out, 'height', heightNumeric);
    }
    updated += 1;
    return out;
  });
  return { html: next, updated };
}

export function setFooterAddress(el: Element, line1: string, line2: string, country: string) {
  const lines = [line1, line2, country].filter(Boolean);
  if (lines.length === 0) return;
  el.innerHTML = lines.join('<br />');
}

export function setFooterContactEmail(el: Element, email: string, linkColor: string) {
  if (!email) return;
  const anchor = el.querySelector('a[href^="mailto:"]');
  if (anchor && anchor.tagName === 'A') {
    anchor.setAttribute('href', `mailto:${email}`);
    anchor.textContent = email;
    if (linkColor) upsertStylePropertyOnElement(anchor, 'color', linkColor, true);
    upsertStylePropertyOnElement(anchor, 'text-decoration', 'none', true);
    return;
  }
  el.innerHTML = `Questions? Contact us at <a href="mailto:${email}" style="color: ${linkColor}; text-decoration: none;">${email}</a>`;
}

export function applyAccentStrong(el: Element, accentColor: string) {
  el.querySelectorAll('strong[style*="color"]').forEach((node) => {
    upsertStylePropertyOnElement(node, 'color', accentColor, false);
  });
}

export function applyPromoHighlightSpan(el: Element, highlightColor: string) {
  el.querySelectorAll('span[style*="color"]').forEach((node) => {
    upsertStylePropertyOnElement(node, 'color', highlightColor, false);
  });
}

export function findAncestorTable(el: Element, maxDepth = 8): HTMLTableElement | null {
  let current: Element | null = el.parentElement;
  let depth = 0;
  while (current && depth < maxDepth) {
    if (current.tagName === 'TABLE') {
      return current as HTMLTableElement;
    }
    current = current.parentElement;
    depth += 1;
  }
  return null;
}

export function findAncestorTd(el: Element, maxDepth = 6): HTMLTableCellElement | null {
  let current: Element | null = el.parentElement;
  let depth = 0;
  while (current && depth < maxDepth) {
    if (current.tagName === 'TD') {
      return current as HTMLTableCellElement;
    }
    current = current.parentElement;
    depth += 1;
  }
  return null;
}

export function applyFontFamilyToDocument(doc: Document, fontStack: string) {
  doc.querySelectorAll('td, p, span, a, h1, h2, h3, h4, li').forEach((node) => {
    upsertStylePropertyOnElement(node, 'font-family', fontStack, false);
  });
}

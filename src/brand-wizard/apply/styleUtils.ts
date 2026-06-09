export function setInlineStyle(el: Element, prop: string, value: string, important = false) {
  const target = el instanceof HTMLElement ? el : null;
  if (!target || !value) return;
  target.style.setProperty(prop, value, important ? 'important' : '');
}

export function markUserStyled(el: Element, opts: { bg?: boolean; text?: boolean }) {
  if (opts.bg) el.setAttribute('data-user-bg-color', '');
  if (opts.text) el.setAttribute('data-user-text-color', '');
}

/** Remove inline declarations from a style attribute (email-safe string edit). */
export function removeStylePropertiesFromElement(el: Element, properties: string[]) {
  let style = el.getAttribute('style') ?? '';
  for (const property of properties) {
    const escaped = property.replace(/-/g, '\\-');
    const re = new RegExp(`(?:^|;)\\s*${escaped}\\s*:\\s*[^;]*`, 'gi');
    style = style.replace(re, '');
  }
  style = style.replace(/^\s*;\s*/, '').replace(/;\s*;/g, ';').trim();
  el.setAttribute('style', style);
}

/** Pill lives on the TD — strip legacy inline-block button chrome from the anchor. */
export function stripLegacyAnchorPillStyles(anchor: HTMLElement) {
  removeStylePropertiesFromElement(anchor, [
    'background-color',
    'padding',
    'border-radius',
    'display',
    'margin',
    'border',
    'border-color',
    'border-width',
    'border-style',
  ]);
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

export function setColor(el: Element, color: string, important = false) {
  if (!color) return;
  upsertStylePropertyOnElement(el, 'color', color, important);
}

export function setBackground(el: Element, color: string, important = false) {
  if (!color) return;
  upsertStylePropertyOnElement(el, 'background-color', color, important);
  el.setAttribute('bgcolor', color);
}

export function setBorderColor(el: Element, color: string, important = false) {
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
  return hook.endsWith('-cta-button');
}

function isAnchorInButtonWrapperTd(node: HTMLElement): boolean {
  if (node.tagName !== 'A') return false;
  const td = findAncestorTd(node);
  return td ? isCtaButtonWrapperTd(td) : false;
}

function isButtonWrapperTd(td: HTMLTableCellElement, forAnchor?: Element): boolean {
  if (isCtaButtonWrapperTd(td)) return true;
  const hook = td.getAttribute('data-element') ?? '';
  if (hook.includes('button') || hook.includes('cta')) return true;
  const style = td.getAttribute('style') ?? '';
  if (/background-color/i.test(style) && /border-radius/i.test(style)) return true;
  if (forAnchor?.getAttribute('data-element') === 'promo-cta') return true;
  return false;
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
  },
) {
  const isTd = node.tagName === 'TD';
  const anchorInButtonTd = !isTd && isAnchorInButtonWrapperTd(node);

  if (opts.variant) node.setAttribute('data-brand-btn-variant', opts.variant);

  if (opts.bg && (isTd || !anchorInButtonTd)) {
    markUserStyled(node, { bg: true });
    upsertStylePropertyOnElement(node, 'background-color', opts.bg, true);
    if (isTd) node.setAttribute('bgcolor', opts.bg);
  }

  if (opts.color && !isTd) {
    markUserStyled(node, { text: true });
    upsertStylePropertyOnElement(node, 'color', opts.color, true);
  }

  if (anchorInButtonTd) {
    stripLegacyAnchorPillStyles(node);
  }

  if (!isTd) {
    upsertStylePropertyOnElement(node, 'text-decoration', 'none', true);
  }

  if (opts.borderColor && (isTd || !anchorInButtonTd)) {
    upsertStylePropertyOnElement(node, 'border-color', opts.borderColor, true);
  }
}

export function applyPrimaryCta(
  el: Element,
  bg: string,
  text: string,
  variant: 'primary' | 'secondary' = 'primary',
) {
  if (!bg && !text) return;

  collectCtaTargets(el).forEach((node) => {
    applyStyleToNode(node, { bg, color: text, variant });
  });
}

export function applySecondaryCta(
  el: Element,
  bg: string,
  text: string,
  border: string,
) {
  if (!bg && !text && !border) return;

  collectCtaTargets(el).forEach((node) => {
    applyStyleToNode(node, {
      bg,
      color: text,
      borderColor: border,
      variant: 'secondary',
    });
  });
}

/** Ensure template links keep flat text styling after brand apply. */
export function applyLinkDecorationPass(doc: Document) {
  doc.querySelectorAll('a[data-element]').forEach((anchor) => {
    upsertStylePropertyOnElement(anchor, 'text-decoration', 'none', true);
  });
}

export function applyLogo(el: Element, src: string, alt: string, width: string, height: string) {
  if (el.tagName !== 'IMG') {
    el.querySelectorAll('img').forEach((img) => applyLogo(img, src, alt, width, height));
    return;
  }
  if (src) el.setAttribute('src', src);
  if (alt) el.setAttribute('alt', alt);
  if (width) el.setAttribute('width', width.replace(/px$/i, ''));
  if (height && height !== 'auto') el.setAttribute('height', height.replace(/px$/i, ''));
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

import type { DesignRulesState } from '../types';

const BRAND_STYLE_ID = 'mailcraft-brand-wizard';

function pick(...values: string[]): string {
  for (const value of values) {
    const trimmed = value.trim();
    if (trimmed) return trimmed;
  }
  return '';
}

function buttonTokens(state: DesignRulesState) {
  const primaryBg = pick(state.btnPrimaryBg, state.colorPrimary);
  const primaryText = pick(state.btnPrimaryText, '#ffffff');
  return {
    primaryBg,
    primaryText,
    secondaryBg: pick(state.btnSecondaryBg, '#ffffff'),
    secondaryText: pick(state.btnSecondaryText, primaryBg, state.colorPrimary),
    secondaryBorder: pick(state.btnSecondaryBorder, primaryBg, state.colorPrimary),
    linkColor: pick(state.linkColor, state.colorSecondary, state.colorPrimary),
    footerLinkColor: pick(state.footerLinkColor, state.linkColor, state.colorSecondary),
  };
}

/** Injected last in <head> so brand tokens beat the template preview/dark-mode stylesheet. */
export function injectBrandStyleOverrides(doc: Document, state: DesignRulesState): boolean {
  const t = buttonTokens(state);
  if (!t.primaryBg) return false;

  const css = `
/* Mailcraft Brand Wizard — primary & secondary filled CTAs only */
a[data-element] {
  text-decoration: none !important;
}
td[data-brand-btn-variant="primary"],
td[data-element$="-cta-button"]:not([data-element*="secondary"]) {
  background-color: ${t.primaryBg} !important;
}
a[data-brand-btn-variant="primary"],
td[data-brand-btn-variant="primary"] a[data-element],
td[data-element$="-cta-button"]:not([data-element*="secondary"]) a[data-element] {
  color: ${t.primaryText} !important;
}
td[data-brand-btn-variant="secondary"],
td[data-element*="secondary-cta-button"] {
  background-color: ${t.secondaryBg} !important;
  border-color: ${t.secondaryBorder} !important;
}
a[data-brand-btn-variant="secondary"],
td[data-element*="secondary-cta-button"] a[data-element],
td[data-element*="cta-secondary-button"] a[data-element] {
  color: ${t.secondaryText} !important;
}
a[data-element$="-cta"][data-element*="product"],
a[data-element^="grid-product-"][data-element$="-cta"],
a[data-element^="update-"][data-element$="-cta"] {
  color: ${t.linkColor} !important;
}
a[data-element^="footer-link-"],
a[data-element^="footer-social-"] {
  color: ${t.footerLinkColor} !important;
}
`.trim();

  doc.getElementById(BRAND_STYLE_ID)?.remove();
  const styleEl = doc.createElement('style');
  styleEl.id = BRAND_STYLE_ID;
  styleEl.textContent = css;
  doc.head?.appendChild(styleEl);
  return true;
}

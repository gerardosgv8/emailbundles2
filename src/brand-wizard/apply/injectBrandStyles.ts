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

  const surfaceGray = state.colorBgLightGray.trim() || '#f8fafc';
  const infoBlue = state.colorBgInfo.trim() || '#e0e7ff';
  const serviceBlue = state.colorBgService.trim() || '#f0f9ff';
  const serviceBorder = state.colorBgServiceBorder.trim() || '#bae6fd';
  const css = `
/* Mailcraft Brand Wizard — primary & secondary filled CTAs only */
a[data-element] {
  text-decoration: none !important;
}
table[data-element="pricing-container"],
table[data-element="order-total-container"],
table[data-element="support-container"],
td[data-element="order-total-container-td"] {
  background-color: ${surfaceGray} !important;
}
table[data-element="pricing-container"] > tbody > tr > td,
table[data-element="order-total-container"] > tbody > tr > td,
table[data-element="support-container"] > tbody > tr > td,
td[data-element="order-total-container-td"] {
  background-color: ${surfaceGray} !important;
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
}
td[data-element="featured-insight-container"],
td[data-element="featured-insight-container"] p[data-element="featured-insight"] {
  background-color: ${infoBlue} !important;
}
td[data-element="featured-insight-container"] table,
td[data-element="featured-insight-container"] tr,
td[data-element="featured-insight-container"] tbody {
  background-color: transparent !important;
}
table:not([data-element="pricing-container"]):has([data-element="pricing-title"]) {
  background-color: ${serviceBlue} !important;
  border: 1px solid ${serviceBorder} !important;
  border-color: ${serviceBorder} !important;
}
table:not([data-element="pricing-container"]):has([data-element="pricing-title"]) > tbody > tr > td {
  background-color: ${serviceBlue} !important;
}
td[data-brand-btn-variant="primary"],
td[data-element$="-cta-button"]:not([data-element*="secondary"]),
td[data-element="cta-primary-button"] {
  background-color: ${t.primaryBg} !important;
}
a[data-brand-btn-variant="primary"],
td[data-brand-btn-variant="primary"] a[data-element],
td[data-element$="-cta-button"]:not([data-element*="secondary"]) a[data-element],
td[data-element="cta-primary-button"] a[data-element] {
  color: ${t.primaryText} !important;
}
td[data-brand-btn-variant="secondary"],
td[data-element*="secondary-cta-button"],
td[data-element*="cta-secondary-button"] {
  background-color: ${t.secondaryBg} !important;
  border: 2px solid ${t.secondaryBorder} !important;
  border-color: ${t.secondaryBorder} !important;
}
a[data-brand-btn-variant="secondary"],
a[data-element="cta-secondary"],
a[data-element="secondary-cta"],
a[data-element="cta-view-details"],
td[data-brand-btn-variant="secondary"] a[data-element],
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

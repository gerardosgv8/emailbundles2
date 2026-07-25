import type { DesignRulesState } from '../types';
import type { ElementApplyProfile } from './industrialB2bElementRegistry';

export type VmlKind = 'cta-primary' | 'cta-secondary' | 'surface-info' | 'badge-step';

type VmlColorSpec = {
  fill: string;
  text?: string;
  stroke?: string;
  strokeWeight?: string;
};

function pick(...values: string[]): string {
  for (const value of values) {
    const trimmed = value.trim();
    if (trimmed) return trimmed;
  }
  return '';
}

function primaryButtonBg(state: DesignRulesState, elementId?: string): string {
  if (elementId === 'featured-cta') {
    return pick(state.btnPromoBg, state.btnPrimaryBg, state.colorPrimary);
  }
  if (elementId === 'pricing-cta' || elementId === 'pricing-cta-button') {
    return pick(state.btnPricingBg, state.btnPrimaryBg, state.colorPrimary);
  }
  return pick(state.btnPrimaryBg, state.colorPrimary);
}

function primaryButtonText(state: DesignRulesState): string {
  return pick(state.btnPrimaryText, '#ffffff');
}

function resolveVmlKind(
  hook: string,
  profileByElement: Record<string, ElementApplyProfile>,
  explicitKind?: string | null,
): VmlKind | null {
  if (explicitKind === 'cta-primary' || explicitKind === 'cta-secondary' || explicitKind === 'surface-info' || explicitKind === 'badge-step') {
    return explicitKind;
  }

  const profile = profileByElement[hook];
  switch (profile) {
    case 'SURFACE_INFO':
      return 'surface-info';
    case 'CTA_PRIMARY':
    case 'CTA_PRIMARY_TD':
      return 'cta-primary';
    case 'CTA_SECONDARY':
    case 'CTA_SECONDARY_TD':
      return 'cta-secondary';
    case 'BADGE_STEP':
      return 'badge-step';
    default:
      break;
  }

  if (hook.includes('cta') || hook.endsWith('-button')) {
    if (hook.includes('secondary') || hook.includes('view-details')) return 'cta-secondary';
    return 'cta-primary';
  }
  if (hook.endsWith('-number')) return 'badge-step';
  if (hook.endsWith('-container')) return 'surface-info';

  return null;
}

export function resolveVmlColors(
  hook: string,
  kind: VmlKind,
  state: DesignRulesState,
): VmlColorSpec | null {
  switch (kind) {
    case 'surface-info':
      return {
        fill: pick(state.colorBgInfo, '#e0e7ff'),
        text: pick(state.linkColor, state.colorSecondary, '#1e40af'),
      };
    case 'cta-primary':
      return {
        fill: primaryButtonBg(state, hook),
        text: primaryButtonText(state),
      };
    case 'cta-secondary':
      return {
        fill: pick(state.btnSecondaryBg, '#ffffff'),
        text: pick(state.btnSecondaryText, state.btnPrimaryBg, state.colorPrimary),
        stroke: pick(state.btnSecondaryBorder, state.btnPrimaryBg, state.colorPrimary),
        strokeWeight: '2px',
      };
    case 'badge-step':
      return {
        fill: pick(state.colorBadgeStepBg, state.colorAccent, '#2563eb'),
        text: pick(state.colorBadgeStepText, '#ffffff'),
      };
    default:
      return null;
  }
}

function upsertHtmlAttr(attrs: string, name: string, value: string): string {
  const re = new RegExp(`${name}="[^"]*"`, 'i');
  if (re.test(attrs)) return attrs.replace(re, `${name}="${value}"`);
  return `${attrs.trimEnd()} ${name}="${value}"`;
}

function upsertInlineStyle(style: string, prop: string, value: string): string {
  const escaped = prop.replace(/-/g, '\\-');
  const re = new RegExp(`(?:^|;)\\s*${escaped}\\s*:\\s*[^;]*`, 'i');
  const decl = `${prop}: ${value}`;
  if (re.test(style)) {
    return style.replace(re, (match) => `${match.startsWith(';') ? '; ' : ''}${decl}`);
  }
  return style.trim() ? `${style.trim().replace(/;\s*$/, '')}; ${decl}` : decl;
}

function paintCenterOrParagraph(inner: string, textColor: string): string {
  let next = inner;
  next = next.replace(
    /(<center\b[^>]*style=")([^"]*)(")/i,
    (_match, open, style, close) => `${open}${upsertInlineStyle(style, 'color', textColor)}${close}`,
  );
  next = next.replace(
    /(<p\b[^>]*style=")([^"]*)(")/i,
    (_match, open, style, close) => `${open}${upsertInlineStyle(style, 'color', textColor)}${close}`,
  );
  return next;
}

function paintRoundrect(attrs: string, inner: string, spec: VmlColorSpec): { attrs: string; inner: string } {
  let nextAttrs = upsertHtmlAttr(attrs, 'fillcolor', spec.fill);

  if (spec.stroke) {
    nextAttrs = upsertHtmlAttr(nextAttrs, 'strokecolor', spec.stroke);
    nextAttrs = upsertHtmlAttr(nextAttrs, 'strokeweight', spec.strokeWeight ?? '2px');
  }

  let nextInner = inner;
  if (spec.text) {
    nextInner = paintCenterOrParagraph(nextInner, spec.text);
  }

  return { attrs: nextAttrs, inner: nextInner };
}

const ROUNDRECT_RE = /<v:roundrect\b([^>]*)>([\s\S]*?)<\/v:roundrect>/gi;

/** String pass for Outlook VML inside MSO conditional comments (invisible to DOMParser). */
export function applyVmlBranding(
  html: string,
  state: DesignRulesState,
  profileByElement: Record<string, ElementApplyProfile>,
): { html: string; updateCount: number } {
  let updateCount = 0;

  const next = html.replace(ROUNDRECT_RE, (full, rawAttrs, inner) => {
    if (/v:imagedata/i.test(inner)) return full;

    const attrs = rawAttrs ?? '';
    const hook =
      attrs.match(/data-vml-for="([^"]+)"/i)?.[1] ??
      inner.match(/data-element="([^"]+)"/i)?.[1] ??
      '';
    if (!hook) return full;

    const resolvedHook = hook === 'featured-insight' ? 'featured-insight-container' : hook;
    const explicitKind = attrs.match(/data-vml-kind="([^"]+)"/i)?.[1] ?? null;
    const kind = resolveVmlKind(resolvedHook, profileByElement, explicitKind);
    if (!kind) return full;

    const spec = resolveVmlColors(resolvedHook, kind, state);
    if (!spec) return full;

    const painted = paintRoundrect(attrs, inner, spec);
    updateCount += 1;
    return `<v:roundrect${painted.attrs}>${painted.inner}</v:roundrect>`;
  });

  return { html: next, updateCount };
}

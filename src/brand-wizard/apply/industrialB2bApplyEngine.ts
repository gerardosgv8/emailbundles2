import type { DesignRulesState } from '../types';
import type { ElementApplyProfile } from './industrialB2bElementRegistry';
import {
  applyAccentStrong,
  applyFontFamilyToDocument,
  applyLogo,
  applyPrimaryCta,
  applyPromoHighlightSpan,
  applySecondaryCta,
  findAncestorTable,
  findAncestorTd,
  setBackground,
  setBorderColor,
  setColor,
  setFooterAddress,
  setFooterContactEmail,
  setHref,
  setLinkColor,
  setTextContent,
  upsertStylePropertyOnElement,
} from './styleUtils';

export type ApplyContext = {
  filePath: string;
  elementId: string;
};

function resolveCopyright(note: string): string {
  const year = new Date().getFullYear();
  if (note.includes('{current year}')) {
    return note.replace('{current year}', String(year));
  }
  return note.replace(/\d{4}/, String(year));
}

function companyName(state: DesignRulesState): string {
  return (state.footerCompany.trim() || state.brandName).trim();
}

function primaryButtonBg(state: DesignRulesState): string {
  return state.btnPrimaryBg.trim() || state.colorPrimary.trim();
}

function primaryButtonText(state: DesignRulesState): string {
  return state.btnPrimaryText.trim() || '#ffffff';
}

function applyParentUrgencySurface(el: Element, state: DesignRulesState) {
  const table = findAncestorTable(el);
  if (!table) return;
  setBackground(table, state.colorBgUrgency);
  setBorderColor(table, state.colorBgUrgencyBorder);
}

function applyParentPromoBand(el: Element, state: DesignRulesState) {
  const table = findAncestorTable(el);
  if (!table) return;
  setBackground(table, state.colorBgPromoDark);
}

function applyParentTierRow(el: Element, state: DesignRulesState) {
  const td = findAncestorTd(el);
  if (!td) return;
  setBackground(td, state.colorBgLightGray);
}

function applyServiceTierPanel(el: Element, state: DesignRulesState, ctx: ApplyContext) {
  if (!ctx.filePath.includes('06_Service_Launch')) return;
  const table = findAncestorTable(el);
  if (!table) return;
  setBackground(table, state.colorBgService);
  setBorderColor(table, state.colorBgServiceBorder);
}

function footerLinkToken(elementId: string): keyof DesignRulesState | null {
  const map: Record<string, keyof DesignRulesState> = {
    'footer-link-privacy': 'linkPrivacy',
    'footer-link-terms': 'linkTerms',
    'footer-link-help': 'linkHelp',
    'footer-link-unsubscribe': 'linkUnsubscribe',
    'footer-social-facebook': 'socialFacebook',
    'footer-social-twitter': 'socialTwitter',
    'footer-social-instagram': 'socialInstagram',
    'footer-social-linkedin': 'socialLinkedin',
  };
  return map[elementId] ?? null;
}

export function applyElementProfile(
  el: Element,
  profile: ElementApplyProfile,
  state: DesignRulesState,
  ctx: ApplyContext,
): boolean {
  switch (profile) {
    case 'LOGO':
      if (!state.logoUrl.trim()) return false;
      applyLogo(el, state.logoUrl, state.logoAlt, state.logoWidth, state.logoHeight);
      return true;

    case 'FOOTER_COMPANY': {
      const name = companyName(state);
      if (!name) return false;
      setTextContent(el, name);
      setColor(el, state.footerHeadingColor);
      return true;
    }

    case 'FOOTER_ADDRESS': {
      if (!state.footerAddress1.trim() && !state.footerAddress2.trim() && !state.footerCountry.trim()) {
        return false;
      }
      setFooterAddress(el, state.footerAddress1, state.footerAddress2, state.footerCountry);
      setColor(el, state.footerTextColor);
      return true;
    }

    case 'FOOTER_TAGLINE': {
      const tagline = state.footerTagline.trim() || state.footerTrustLine.trim();
      if (!tagline) return false;
      setTextContent(el, tagline);
      setColor(el, state.footerTextColor);
      return true;
    }

    case 'FOOTER_COPYRIGHT': {
      const note = resolveCopyright(state.copyrightNote);
      if (!note) return false;
      setTextContent(el, note);
      setColor(el, state.footerTextColor);
      return true;
    }

    case 'FOOTER_CONTACT':
      if (!state.footerEmail.trim()) {
        setColor(el, state.footerTextColor);
        return true;
      }
      setFooterContactEmail(el, state.footerEmail.trim(), state.footerLinkColor);
      setColor(el, state.footerTextColor);
      return true;

    case 'FOOTER_LINK':
    case 'FOOTER_SOCIAL': {
      const token = footerLinkToken(ctx.elementId);
      if (token) {
        const href = String(state[token] ?? '').trim();
        if (href) setHref(el, href);
      }
      setLinkColor(el, state.footerLinkColor);
      return true;
    }

    case 'FOOTER_ICON':
      return true;

    case 'HEADING_KICKER':
      setColor(el, state.colorHeaderKicker);
      return true;

    case 'HEADING_HERO':
      setColor(el, state.colorHeadingAlt);
      return true;

    case 'HEADING_SECTION':
    case 'HEADING_FEATURE':
    case 'HEADING_STEP':
      setColor(el, state.colorHeadingDark);
      applyServiceTierPanel(el, state, ctx);
      return true;

    case 'BODY':
      setColor(el, state.colorBody);
      return true;

    case 'BODY_SUBTITLE':
      setColor(el, state.colorBodyAlt);
      return true;

    case 'BODY_MUTED':
      setColor(el, state.colorMuted);
      return true;

    case 'BODY_WARNING_TEXT':
      if (ctx.elementId === 'featured-insight') {
        setColor(el, state.colorSecondary);
      } else {
        setColor(el, state.colorBgWarningText);
      }
      return true;

    case 'BODY_URGENCY_TEXT':
      setColor(el, state.colorBgUrgencyText);
      applyParentUrgencySurface(el, state);
      return true;

    case 'BODY_INFO_TEXT':
      setColor(el, state.colorSecondary);
      return true;

    case 'TIER_TEXT':
      setColor(el, state.colorBody);
      applyParentTierRow(el, state);
      applyAccentStrong(el, state.colorAccent);
      return true;

    case 'PROMO_HEADING':
      setColor(el, '#ffffff');
      applyParentPromoBand(el, state);
      applyPromoHighlightSpan(el, state.colorPromoHighlight);
      return true;

    case 'CTA_PRIMARY':
      applyPrimaryCta(
        el,
        primaryButtonBg(state),
        primaryButtonText(state),
      );
      if (state.urlBase.trim()) setHref(el, state.urlBase.trim());
      return true;

    case 'CTA_PRIMARY_TD':
      applyPrimaryCta(
        el,
        primaryButtonBg(state),
        primaryButtonText(state),
        'primary',
      );
      return true;

    case 'CTA_SECONDARY':
      applySecondaryCta(
        el,
        state.btnSecondaryBg,
        state.btnSecondaryText,
        state.btnSecondaryBorder,
      );
      return true;

    case 'CTA_SECONDARY_TD':
      applySecondaryCta(
        el,
        state.btnSecondaryBg,
        state.btnSecondaryText,
        state.btnSecondaryBorder,
      );
      return true;

    case 'LINK_PRODUCT':
      setLinkColor(el, state.linkColor);
      return true;

    case 'BADGE_EVENT':
      setBackground(el, state.colorBadgeEventBg);
      setColor(el, state.colorBadgeEventText);
      return true;

    case 'BADGE_STEP':
      setBackground(el, state.colorBadgeStepBg);
      setColor(el, state.colorBadgeStepText);
      return true;

    case 'BADGE_FEATURE':
      setBackground(el, state.colorBadgeEventBg);
      setColor(el, state.colorBadgeEventText);
      return true;

    case 'IMAGE_HERO':
      if (state.layoutRadiusHero.trim()) {
        upsertStylePropertyOnElement(el, 'border-radius', state.layoutRadiusHero, false);
      }
      return true;

    case 'IMAGE_PRODUCT':
      if (state.layoutRadiusGrid.trim()) {
        upsertStylePropertyOnElement(el, 'border-radius', state.layoutRadiusGrid, false);
      }
      return true;

    case 'SURFACE_LIGHT':
      setBackground(el, state.colorBgLightGray);
      return true;

    case 'SURFACE_INFO':
      setBackground(el, state.colorBgInfo);
      setBorderColor(el, state.colorBgServiceBorder);
      return true;

    case 'SURFACE_WARNING':
      setBackground(el, state.colorBgWarning);
      setBorderColor(el, state.colorBgWarningBorder);
      return true;

    default:
      return false;
  }
}

export function applyHeaderLogo(doc: Document, state: DesignRulesState): boolean {
  if (!state.logoUrl.trim()) return false;

  let applied = false;
  doc.querySelectorAll('img').forEach((img) => {
    const hook = img.getAttribute('data-element');
    if (hook === 'logo') {
      applyLogo(img, state.logoUrl, state.logoAlt, state.logoWidth, state.logoHeight);
      applied = true;
      return;
    }
    if (hook) return;
    applyLogo(img, state.logoUrl, state.logoAlt, state.logoWidth, state.logoHeight);
    applied = true;
  });

  return applied;
}

export function applyEmailSurfaces(doc: Document, state: DesignRulesState): number {
  let count = 0;
  if (state.colorBgEmail.trim()) {
    doc.querySelectorAll('body').forEach((body) => {
      setBackground(body, state.colorBgEmail);
      count += 1;
    });
    doc.querySelectorAll('table[width="100%"]').forEach((table) => {
      const style = table.getAttribute('style') ?? '';
      if (/background-color:\s*#f/i.test(style) || /background-color:\s*#e/i.test(style)) {
        setBackground(table, state.colorBgEmail);
        count += 1;
      }
    });
  }
  return count;
}

export function applyGlobalTypography(doc: Document, state: DesignRulesState): boolean {
  if (!state.fontStack.trim()) return false;
  applyFontFamilyToDocument(doc, state.fontStack.trim());
  return true;
}

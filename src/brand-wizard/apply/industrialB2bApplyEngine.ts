import type { DesignRulesState } from '../types';
import type { ElementApplyProfile } from './industrialB2bElementRegistry';
import {
  applyAccentStrong,
  applyFontFamilyToDocument,
  applyLogo,
  applyPrimaryCta,
  applyPromoHighlightSpan,
  applySecondaryCta,
  applySurfaceLightPanel,
  findAncestorTable,
  healLogoHooks,
  isHeaderLogoSized,
  isLikelyLogoImage,
  setBackground,
  setBorderColor,
  setColor,
  setFooterAddress,
  setFooterContactEmail,
  setHref,
  setLinkColor,
  setTextContent,
  removeStylePropertiesFromElement,
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
    'footer-icon-1': 'socialFacebook',
    'footer-icon-2': 'socialTwitter',
    'footer-icon-3': 'socialInstagram',
    'footer-icon-4': 'socialLinkedin',
  };
  return map[elementId] ?? null;
}

function footerSocialTextToken(elementId: string): keyof DesignRulesState | null {
  const map: Record<string, keyof DesignRulesState> = {
    'footer-social-facebook': 'socialFacebookText',
    'footer-social-twitter': 'socialTwitterText',
    'footer-social-instagram': 'socialInstagramText',
    'footer-social-linkedin': 'socialLinkedinText',
    'footer-icon-1': 'socialFacebookText',
    'footer-icon-2': 'socialTwitterText',
    'footer-icon-3': 'socialInstagramText',
    'footer-icon-4': 'socialLinkedinText',
  };
  return map[elementId] ?? null;
}

function socialLinkLabel(href: string): string {
  try {
    const host = new URL(href).hostname.replace(/^www\./i, '');
    return host || href;
  } catch {
    return href;
  }
}

function setSocialSlotVisible(el: Element, visible: boolean) {
  if (visible) {
    removeStylePropertiesFromElement(el, ['display'], { allowStructural: true });
  } else {
    upsertStylePropertyOnElement(el, 'display', 'none', true);
  }
  const td = el.parentElement;
  if (td && td.tagName === 'TD') {
    if (visible) {
      removeStylePropertiesFromElement(td, ['display'], { allowStructural: true });
    } else {
      upsertStylePropertyOnElement(td, 'display', 'none', true);
    }
  }
  const tr = td?.parentElement;
  if (tr && tr.tagName === 'TR') {
    const anyVisible = [...tr.querySelectorAll('a[data-element^="footer-social-"], a[data-element^="footer-icon-"]')].some(
      (anchor) => !/display\s*:\s*none/i.test(anchor.getAttribute('style') ?? ''),
    );
    if (anyVisible) {
      removeStylePropertiesFromElement(tr, ['display'], { allowStructural: true });
    } else {
      upsertStylePropertyOnElement(tr, 'display', 'none', true);
    }
  }
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
      // Skip mis-tagged heroes/products that incorrectly carry data-element="logo".
      if (el.tagName === 'IMG' && !isHeaderLogoSized(el)) return false;
      applyLogo(el, state.logoUrl, state.logoAlt, state.logoWidth, state.logoHeight, { force: true });
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

    case 'FOOTER_LINK': {
      const token = footerLinkToken(ctx.elementId);
      if (token) {
        const href = String(state[token] ?? '').trim();
        if (href) setHref(el, href);
      }
      setLinkColor(el, state.footerLinkColor);
      return true;
    }

    case 'FOOTER_SOCIAL': {
      const token = footerLinkToken(ctx.elementId);
      const textToken = footerSocialTextToken(ctx.elementId);
      const href = token ? String(state[token] ?? '').trim() : '';
      const customText = textToken ? String(state[textToken] ?? '').trim() : '';
      if (href) {
        setHref(el, href);
        setTextContent(el, customText || socialLinkLabel(href));
        setSocialSlotVisible(el, true);
      } else {
        setSocialSlotVisible(el, false);
      }
      setLinkColor(el, state.footerLinkColor);
      return true;
    }

    case 'FOOTER_ICON': {
      const token = footerLinkToken(ctx.elementId);
      const textToken = footerSocialTextToken(ctx.elementId);
      const href = token ? String(state[token] ?? '').trim() : '';
      const customText = textToken ? String(state[textToken] ?? '').trim() : '';
      if (href) {
        setHref(el, href);
        if (customText) setTextContent(el, customText);
        setSocialSlotVisible(el, true);
      } else {
        setSocialSlotVisible(el, false);
      }
      setLinkColor(el, state.footerLinkColor);
      return true;
    }

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
        setColor(el, state.linkColor);
        return true;
      }
      return false;

    case 'BODY_URGENCY_TEXT':
      return false;

    case 'BODY_INFO_TEXT':
      setColor(el, state.colorSecondary);
      return true;

    case 'TIER_TEXT':
      setColor(el, state.colorBody);
      applyAccentStrong(el, state.colorAccent);
      return true;

    case 'PROMO_HEADING':
      setColor(el, '#ffffff');
      applyPromoHighlightSpan(el, state.colorPromoHighlight);
      return true;

    case 'CTA_PRIMARY': {
      let bg = primaryButtonBg(state);
      const text = primaryButtonText(state);
      const geometry = {
        padding: state.btnPrimaryPadding.trim() || undefined,
        radius: state.btnPrimaryRadius.trim() || undefined,
      };
      if (ctx.elementId === 'pricing-cta' || ctx.elementId === 'pricing-cta-button') {
        bg = state.btnPricingBg.trim() || bg;
      } else if (ctx.elementId === 'featured-cta') {
        bg = state.btnPromoBg.trim() || bg;
      }
      applyPrimaryCta(el, bg, text, 'primary', geometry);
      if (state.urlBase.trim()) setHref(el, state.urlBase.trim());
      return true;
    }

    case 'CTA_PRIMARY_TD': {
      let bg = primaryButtonBg(state);
      const text = primaryButtonText(state);
      const geometry = {
        padding: state.btnPrimaryPadding.trim() || undefined,
        radius: state.btnPrimaryRadius.trim() || undefined,
      };
      if (ctx.elementId === 'pricing-cta-button') {
        bg = state.btnPricingBg.trim() || bg;
      }
      applyPrimaryCta(el, bg, text, 'primary', geometry);
      return true;
    }

    case 'CTA_SECONDARY':
      applySecondaryCta(
        el,
        state.btnSecondaryBg,
        state.btnSecondaryText,
        state.btnSecondaryBorder,
        {
          padding: state.btnPrimaryPadding.trim() || undefined,
          radius: state.btnPrimaryRadius.trim() || undefined,
        },
      );
      return true;

    case 'CTA_SECONDARY_TD':
      applySecondaryCta(
        el,
        state.btnSecondaryBg,
        state.btnSecondaryText,
        state.btnSecondaryBorder,
        {
          padding: state.btnPrimaryPadding.trim() || undefined,
          radius: state.btnPrimaryRadius.trim() || undefined,
        },
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
      applySurfaceLightPanel(el, state.colorBgLightGray);
      return true;

    case 'SURFACE_INFO':
      setBackground(el, state.colorBgInfo);
      setBorderColor(el, state.colorBgServiceBorder);
      return true;

    default:
      return false;
  }
}

export function applyHeaderLogo(doc: Document, state: DesignRulesState): boolean {
  if (!state.logoUrl.trim()) return false;

  healLogoHooks(doc);

  const targets = new Set<Element>();

  doc.querySelectorAll('img[data-element="logo"], img[data-element="header-logo"]').forEach((img) => {
    if (isHeaderLogoSized(img)) targets.add(img);
  });

  // Always brand the first real header-sized mark (covers lost hooks / older zips).
  const firstHeader = [...doc.querySelectorAll('img')].find((img) => isLikelyLogoImage(img));
  if (firstHeader) targets.add(firstHeader);

  if (targets.size === 0) return false;

  targets.forEach((img) => {
    applyLogo(img, state.logoUrl, state.logoAlt, state.logoWidth, state.logoHeight, { force: true });
  });
  return true;
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

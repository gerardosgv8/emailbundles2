import { allTemplatesLabel, buildTemplateReference } from './buildTemplateReference';
import { INDUSTRIAL_B2B_FIELD_META } from './bundles/industrialB2bFieldMeta';
import {
  getIndustrialB2bElementsForToken,
  INDUSTRIAL_B2B_TOTAL_TEMPLATES,
} from './bundles/industrialB2bBundleKnowledge';
import { EMAIL_MARKETING_STARTER_KIT_FIELD_META } from './bundles/emailMarketingStarterKitFieldMeta';
import {
  getEmailMarketingStarterKitElementsForToken,
  EMAIL_MARKETING_STARTER_KIT_TOTAL_TEMPLATES,
} from './bundles/emailMarketingStarterKitBundleKnowledge';
import { INDUSTRIAL_B2B_ELEMENT_REGISTRY } from './apply/industrialB2bElementRegistry';
import { EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY } from './apply/emailMarketingStarterKitElementRegistry';
import { FIELD_PLACEHOLDERS } from './fieldPlaceholders';
import type { DesignRulesField } from './types';
import type { WizardFieldMeta } from './bundles/industrialB2bFieldMeta';

/** Fields with no element hooks that still apply bundle-wide in templates. */
const ALL_TEMPLATE_FIELDS = new Set<DesignRulesField>([
  'fontStack',
  'fontCustomUrl',
  'fontCustomName',
  'layoutMaxWidth',
  'layoutOuterPadding',
  'layoutSectionPadding',
  'layoutHorizontalPadding',
  'layoutSpacerStandard',
  'layoutSpacerLarge',
  'layoutRadiusButtons',
  'btnPrimaryRadius',
  'btnPrimaryPadding',
  'imgHeroWidth',
  'imgHeroAspect',
  'imgHeroDefault',
  'imgCdnBase',
  'colorBgEmail',
  'legalName',
  'fromName',
  'replyToEmail',
  'footerPhone',
  'urlQuote',
  'urlSupport',
  'darkBgOverride',
  'darkTextOverride',
  'contrastTarget',
]);

/** Logo fields apply everywhere; template preview links add noise without helping. */
const HIDE_TEMPLATE_REF_FIELDS = new Set<DesignRulesField>([
  'logoUrl',
  'logoAlt',
  'logoWidth',
  'logoHeight',
  'logoDarkUrl',
  'faviconUrl',
]);

/** Resolve hooks when a token shares the same targets as another. */
const HOOK_ALIASES: Partial<Record<DesignRulesField, DesignRulesField>> = {
  footerTrustLine: 'footerTagline',
  btnPromoText: 'btnPromoBg',
  btnPricingText: 'btnPricingBg',
};

function formatElements(hooks: string[]): string | undefined {
  if (hooks.length === 0) return undefined;
  return hooks.length <= 8 ? hooks.join(', ') : `${hooks.slice(0, 6).join(', ')} +${hooks.length - 6} more`;
}

function resolveHooks(
  fieldKey: DesignRulesField,
  getTokenHooks: (token: string) => string[],
): string[] {
  const direct = getTokenHooks(fieldKey);
  if (direct.length > 0) return direct;
  const alias = HOOK_ALIASES[fieldKey];
  if (alias) return getTokenHooks(alias);
  return [];
}

function enrichFieldMeta(
  base: WizardFieldMeta | undefined,
  hooks: string[],
  registry: readonly { id: string; templates: readonly string[] }[],
  totalTemplateCount: number,
  fieldKey: DesignRulesField,
): WizardFieldMeta | undefined {
  if (!base) return undefined;

  const hideTemplates = HIDE_TEMPLATE_REF_FIELDS.has(fieldKey);
  const autoTemplates = hideTemplates
    ? undefined
    : buildTemplateReference(hooks, registry, totalTemplateCount);
  const templates = hideTemplates
    ? undefined
    : base.templates ??
      autoTemplates ??
      (ALL_TEMPLATE_FIELDS.has(fieldKey) ? allTemplatesLabel(totalTemplateCount) : undefined);
  const elements = formatElements(hooks);

  const { templates: _ignoredTemplates, ...baseWithoutTemplates } = base;

  return {
    ...baseWithoutTemplates,
    ...(templates ? { templates } : {}),
    ...(elements ? { elements } : {}),
    ...(base.placeholder || FIELD_PLACEHOLDERS[fieldKey]
      ? { placeholder: base.placeholder ?? FIELD_PLACEHOLDERS[fieldKey] }
      : {}),
  };
}

export function getFieldMeta(bundleId: string, fieldKey: DesignRulesField): WizardFieldMeta | undefined {
  if (bundleId === 'industrial-b2b') {
    const hooks = resolveHooks(fieldKey, getIndustrialB2bElementsForToken);
    return enrichFieldMeta(
      INDUSTRIAL_B2B_FIELD_META[fieldKey],
      hooks,
      INDUSTRIAL_B2B_ELEMENT_REGISTRY,
      INDUSTRIAL_B2B_TOTAL_TEMPLATES,
      fieldKey,
    );
  }

  if (bundleId === 'email-marketing-starter-kit') {
    const hooks = resolveHooks(fieldKey, getEmailMarketingStarterKitElementsForToken);
    return enrichFieldMeta(
      EMAIL_MARKETING_STARTER_KIT_FIELD_META[fieldKey],
      hooks,
      EMAIL_MARKETING_STARTER_KIT_ELEMENT_REGISTRY,
      EMAIL_MARKETING_STARTER_KIT_TOTAL_TEMPLATES,
      fieldKey,
    );
  }

  return undefined;
}

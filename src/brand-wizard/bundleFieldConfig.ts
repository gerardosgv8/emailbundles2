import type { DesignRulesField } from './types';

/** Styling-rule tokens removed from the wizard (templates keep inline styles only). */
export const REMOVED_STYLING_RULE_FIELDS = [
  'colorBgPromoDark',
  'colorBgWarning',
  'colorBgWarningBorder',
  'colorBgWarningText',
  'colorBgUrgency',
  'colorBgUrgencyBorder',
  'colorBgUrgencyText',
  'colorDivider',
  'colorFooterDivider',
] as const satisfies readonly DesignRulesField[];

/** Wizard color/text fields hidden per bundle when no template hooks use them. */
export const BUNDLE_HIDDEN_FIELDS: Partial<Record<string, readonly DesignRulesField[]>> = {
  'industrial-b2b': [...REMOVED_STYLING_RULE_FIELDS],
  'email-marketing-starter-kit': [
    'colorBgService',
    'colorBgServiceBorder',
    'colorPromoHighlight',
    'colorBadgeEventBg',
    'colorBadgeEventText',
    ...REMOVED_STYLING_RULE_FIELDS,
  ],
};

/** Extra fields shown only for specific bundles (within an existing step). */
export const BUNDLE_EXTRA_BUTTON_FIELDS: Partial<Record<string, readonly DesignRulesField[]>> = {
  'email-marketing-starter-kit': ['btnPricingBg', 'btnPromoBg'],
};

export function isFieldHiddenForBundle(bundleId: string, fieldKey: DesignRulesField): boolean {
  return BUNDLE_HIDDEN_FIELDS[bundleId]?.includes(fieldKey) ?? false;
}

export function getExtraButtonFieldsForBundle(bundleId: string): readonly DesignRulesField[] {
  return BUNDLE_EXTRA_BUTTON_FIELDS[bundleId] ?? [];
}

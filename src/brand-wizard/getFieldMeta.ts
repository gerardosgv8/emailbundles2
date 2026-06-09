import { INDUSTRIAL_B2B_FIELD_META } from './bundles/industrialB2bFieldMeta';
import { getIndustrialB2bElementsForToken } from './bundles/industrialB2bBundleKnowledge';
import type { DesignRulesField } from './types';
import type { WizardFieldMeta } from './bundles/industrialB2bFieldMeta';

export function getFieldMeta(bundleId: string, fieldKey: DesignRulesField): WizardFieldMeta | undefined {
  if (bundleId === 'industrial-b2b') {
    const base = INDUSTRIAL_B2B_FIELD_META[fieldKey];
    if (!base) return undefined;
    const hooks = getIndustrialB2bElementsForToken(fieldKey);
    if (hooks.length === 0) return base;
    return {
      ...base,
      elements: hooks.length <= 8 ? hooks.join(', ') : `${hooks.slice(0, 6).join(', ')} +${hooks.length - 6} more`,
    };
  }
  return undefined;
}

import { INDUSTRIAL_B2B_FIELD_META } from './bundles/industrialB2bFieldMeta';
import { getIndustrialB2bElementsForToken } from './bundles/industrialB2bBundleKnowledge';
import { EMAIL_MARKETING_STARTER_KIT_FIELD_META } from './bundles/emailMarketingStarterKitFieldMeta';
import { getEmailMarketingStarterKitElementsForToken } from './bundles/emailMarketingStarterKitBundleKnowledge';
import type { DesignRulesField } from './types';
import type { WizardFieldMeta } from './bundles/industrialB2bFieldMeta';

function enrichFieldMeta(base: WizardFieldMeta | undefined, hooks: string[]): WizardFieldMeta | undefined {
  if (!base) return undefined;
  if (hooks.length === 0) return base;
  return {
    ...base,
    elements: hooks.length <= 8 ? hooks.join(', ') : `${hooks.slice(0, 6).join(', ')} +${hooks.length - 6} more`,
  };
}

export function getFieldMeta(bundleId: string, fieldKey: DesignRulesField): WizardFieldMeta | undefined {
  if (bundleId === 'industrial-b2b') {
    return enrichFieldMeta(INDUSTRIAL_B2B_FIELD_META[fieldKey], getIndustrialB2bElementsForToken(fieldKey));
  }

  if (bundleId === 'email-marketing-starter-kit') {
    return enrichFieldMeta(
      EMAIL_MARKETING_STARTER_KIT_FIELD_META[fieldKey],
      getEmailMarketingStarterKitElementsForToken(fieldKey),
    );
  }

  return undefined;
}

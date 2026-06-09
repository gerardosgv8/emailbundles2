/**
 * Legacy re-exports — apply logic now lives in industrialB2bElementRegistry + industrialB2bApplyEngine.
 * Regenerate registry: node scripts/sync-industrial-bundle-registry.mjs
 */
export {
  INDUSTRIAL_B2B_ELEMENT_REGISTRY,
  INDUSTRIAL_B2B_ELEMENTS_BY_TEMPLATE,
  INDUSTRIAL_B2B_KNOWN_ELEMENTS,
  INDUSTRIAL_B2B_PROFILE_BY_ELEMENT,
  INDUSTRIAL_B2B_TEMPLATE_FILES,
} from './industrialB2bElementRegistry';

export type { BundleElementEntry, ElementApplyProfile, IndustrialB2bTemplateFile } from './industrialB2bElementRegistry';

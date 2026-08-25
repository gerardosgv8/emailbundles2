import { STOREFRONT_BUNDLE_ID } from '../data/templateBundles';

const ENHANCED_SUFFIX = '-enhanced';

/** Strip legacy `-enhanced` suffix from route param. */
export function parseWizardBundleId(routeBundleId: string | undefined): string | null {
  if (!routeBundleId?.trim()) return null;
  if (routeBundleId.endsWith(ENHANCED_SUFFIX)) {
    const bundleId = routeBundleId.slice(0, -ENHANCED_SUFFIX.length);
    return bundleId || null;
  }
  return routeBundleId;
}

export function isLegacyEnhancedRoute(routeBundleId: string | undefined): boolean {
  return Boolean(routeBundleId?.endsWith(ENHANCED_SUFFIX));
}

export function wizardPath(bundleId: string): string {
  return `/brand-wizard/${bundleId}`;
}

/** Brand Wizard entry for the storefront kit (skips bundle picker). */
export function storefrontBrandWizardPath(): string {
  return wizardPath(STOREFRONT_BUNDLE_ID);
}

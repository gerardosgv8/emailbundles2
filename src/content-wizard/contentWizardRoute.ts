import { STOREFRONT_BUNDLE_ID } from '../data/templateBundles';

export function contentWizardPath(bundleId: string): string {
  return `/content-wizard/${bundleId}`;
}

export function contentWizardTemplatePath(bundleId: string, templateSlug: string): string {
  return `/content-wizard/${bundleId}/${templateSlug}`;
}

export function parseContentWizardBundleId(routeBundleId: string | undefined): string | null {
  if (!routeBundleId?.trim()) return null;
  return routeBundleId;
}

/** Content Wizard entry for the storefront kit (skips bundle picker). */
export function storefrontContentWizardPath(): string {
  return contentWizardPath(STOREFRONT_BUNDLE_ID);
}

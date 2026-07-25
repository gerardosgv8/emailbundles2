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

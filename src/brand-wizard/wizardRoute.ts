const ENHANCED_SUFFIX = '-enhanced';

export type WizardRoute = {
  bundleId: string;
  enhanced: boolean;
};

/** Parse `/brand-wizard/:bundleId` — `industrial-b2b-enhanced` → enhanced apply mode. */
export function parseWizardRoute(routeBundleId: string | undefined): WizardRoute | null {
  if (!routeBundleId?.trim()) return null;
  if (routeBundleId.endsWith(ENHANCED_SUFFIX)) {
    const bundleId = routeBundleId.slice(0, -ENHANCED_SUFFIX.length);
    return bundleId ? { bundleId, enhanced: true } : null;
  }
  return { bundleId: routeBundleId, enhanced: false };
}

export function wizardPath(bundleId: string, enhanced = false): string {
  return `/brand-wizard/${bundleId}${enhanced ? ENHANCED_SUFFIX : ''}`;
}

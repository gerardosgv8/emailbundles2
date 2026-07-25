type RegistryEntry = {
  id: string;
  templates: readonly string[];
};

function formatHookList(hooks: string[]): string {
  if (hooks.length <= 3) return hooks.join(', ');
  return `${hooks.slice(0, 2).join(', ')} +${hooks.length - 2}`;
}

/** Builds a wizard "Template:" line from registry hooks (e.g. `01_Product_Launch: pricing-container`). */
export function buildTemplateReference(
  hooks: string[],
  registry: readonly RegistryEntry[],
  totalTemplateCount: number,
): string | undefined {
  if (hooks.length === 0 || totalTemplateCount <= 0) return undefined;

  const byId = new Map(registry.map((entry) => [entry.id, entry]));
  const templateToHooks = new Map<string, string[]>();

  for (const hook of hooks) {
    const entry = byId.get(hook);
    if (!entry) continue;
    for (const file of entry.templates) {
      const existing = templateToHooks.get(file) ?? [];
      if (!existing.includes(hook)) existing.push(hook);
      templateToHooks.set(file, existing);
    }
  }

  const templateFiles = [...templateToHooks.keys()].sort();
  if (templateFiles.length === 0) return undefined;

  if (templateFiles.length === totalTemplateCount) {
    const coversAllHooks = templateFiles.every((file) => {
      const fileHooks = templateToHooks.get(file) ?? [];
      return hooks.every((hook) => fileHooks.includes(hook));
    });
    if (coversAllHooks || hooks.length > 8) {
      return `All ${totalTemplateCount} templates`;
    }
  }

  const segments = templateFiles.map((file) => {
    const key = file.replace(/\.html$/, '');
    const fileHooks = [...(templateToHooks.get(file) ?? [])].sort();
    if (fileHooks.length === 0) return key;
    return `${key}: ${formatHookList(fileHooks)}`;
  });

  if (segments.length <= 5) return segments.join('; ');

  return templateFiles.map((file) => file.replace(/\.html$/, '')).join(', ');
}

export function allTemplatesLabel(totalTemplateCount: number): string {
  return `All ${totalTemplateCount} templates`;
}

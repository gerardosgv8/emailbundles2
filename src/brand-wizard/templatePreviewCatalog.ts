import { EMAIL_MARKETING_STARTER_KIT_TEMPLATES } from './bundles/emailMarketingStarterKitBundleKnowledge';
import { INDUSTRIAL_B2B_TEMPLATES } from './bundles/industrialB2bBundleKnowledge';

export type TemplatePreviewBundleId = 'industrial-b2b' | 'email-marketing-starter-kit';

type TemplatePreviewEntry = {
  /** Key as it appears in field-meta template strings */
  key: string;
  /** Screenshot filename (without directory) */
  screenshot: string;
  /** Human-readable label for links and modal title */
  label: string;
};

const B2B_ENTRIES: TemplatePreviewEntry[] = INDUSTRIAL_B2B_TEMPLATES.map(({ file, name }) => {
  const key = file.replace(/\.html$/, '');
  return {
    key,
    screenshot: `${key}.png`,
    label: name,
  };
});

const B2C_SCREENSHOT_OVERRIDES: Record<string, string> = {
  'Welcome_&_Onboarding': 'Welcome_Onboarding.png',
};

const B2C_ENTRIES: TemplatePreviewEntry[] = [
  ...EMAIL_MARKETING_STARTER_KIT_TEMPLATES.map(({ file, name }) => {
    const key = file.replace(/\.html$/, '').replace(/ \(\d+\)$/, '');
    return {
      key,
      screenshot: B2C_SCREENSHOT_OVERRIDES[key] ?? `${key}.png`,
      label: name,
    };
  }),
  {
    key: 'Product_Recommendations (Grid)',
    screenshot: 'Product_Recommendations.png',
    label: 'Product Recommendations (Grid)',
  },
  {
    key: 'Product_Recommendations (Vertical)',
    screenshot: 'Product_Recommendations_(Horizontal).png',
    label: 'Product Recommendations (Vertical)',
  },
  {
    key: 'Product_Recommendations',
    screenshot: 'Product_Recommendations.png',
    label: 'Product Recommendations',
  },
];

const CATALOG_BY_BUNDLE: Record<TemplatePreviewBundleId, TemplatePreviewEntry[]> = {
  'industrial-b2b': B2B_ENTRIES,
  'email-marketing-starter-kit': dedupeByKey([
    ...B2C_ENTRIES,
  ]),
};

function dedupeByKey(entries: TemplatePreviewEntry[]): TemplatePreviewEntry[] {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.key)) return false;
    seen.add(entry.key);
    return true;
  });
}

function previewFolder(bundleId: TemplatePreviewBundleId): string {
  return bundleId === 'industrial-b2b' ? 'b2b' : 'b2c';
}

export function isTemplatePreviewBundle(bundleId: string): bundleId is TemplatePreviewBundleId {
  return bundleId === 'industrial-b2b' || bundleId === 'email-marketing-starter-kit';
}

export function getTemplatePreviewKeys(bundleId: TemplatePreviewBundleId): string[] {
  return [...CATALOG_BY_BUNDLE[bundleId]]
    .sort((a, b) => b.key.length - a.key.length)
    .map((entry) => entry.key);
}

export function getTemplatePreviewLabel(bundleId: TemplatePreviewBundleId, key: string): string {
  const entry = CATALOG_BY_BUNDLE[bundleId].find((item) => item.key === key);
  return entry?.label ?? key.replace(/_/g, ' ');
}

export function getTemplatePreviewImageUrl(bundleId: TemplatePreviewBundleId, key: string): string | undefined {
  const entry = CATALOG_BY_BUNDLE[bundleId].find((item) => item.key === key);
  if (!entry) return undefined;
  const base = import.meta.env.BASE_URL;
  const folder = previewFolder(bundleId);
  const file = entry.screenshot.split('/').map(encodeURIComponent).join('/');
  return `${base}images/template-previews/${folder}/${file}`;
}

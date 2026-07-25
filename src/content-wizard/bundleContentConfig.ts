import {
  INDUSTRIAL_B2B_ELEMENTS_BY_TEMPLATE,
  INDUSTRIAL_B2B_PROFILE_BY_ELEMENT,
} from '../brand-wizard/apply/industrialB2bElementRegistry';
import {
  EMAIL_MARKETING_STARTER_KIT_ELEMENTS_BY_TEMPLATE,
  EMAIL_MARKETING_STARTER_KIT_PROFILE_BY_ELEMENT,
} from '../brand-wizard/apply/emailMarketingStarterKitElementRegistry';
import { INDUSTRIAL_B2B_TEMPLATES } from '../brand-wizard/bundles/industrialB2bBundleKnowledge';
import { EMAIL_MARKETING_STARTER_KIT_TEMPLATES } from '../brand-wizard/bundles/emailMarketingStarterKitBundleKnowledge';

export type ContentBundleTemplate = {
  file: string;
  slug: string;
  name: string;
  elementCount: number;
};

type ContentBundleConfig = {
  templates: ContentBundleTemplate[];
  elementsByTemplate: Record<string, string[]>;
  profileByElement: Record<string, string>;
};

const BUNDLE_CONTENT_CONFIG: Record<string, ContentBundleConfig> = {
  'industrial-b2b': {
    templates: INDUSTRIAL_B2B_TEMPLATES.map((t) => ({
      file: t.file,
      slug: t.id,
      name: t.name,
      elementCount: t.elementCount,
    })),
    elementsByTemplate: INDUSTRIAL_B2B_ELEMENTS_BY_TEMPLATE,
    profileByElement: INDUSTRIAL_B2B_PROFILE_BY_ELEMENT,
  },
  'email-marketing-starter-kit': {
    templates: EMAIL_MARKETING_STARTER_KIT_TEMPLATES.map((t) => ({
      file: t.file,
      slug: t.id,
      name: t.name,
      elementCount: t.elementCount,
    })),
    elementsByTemplate: EMAIL_MARKETING_STARTER_KIT_ELEMENTS_BY_TEMPLATE,
    profileByElement: EMAIL_MARKETING_STARTER_KIT_PROFILE_BY_ELEMENT,
  },
};

export function isContentWizardBundle(bundleId: string): boolean {
  return bundleId in BUNDLE_CONTENT_CONFIG;
}

export function getContentBundleConfig(bundleId: string): ContentBundleConfig {
  const config = BUNDLE_CONTENT_CONFIG[bundleId];
  if (!config) {
    throw new Error(`Content wizard is not configured for bundle "${bundleId}".`);
  }
  return config;
}

export function getContentBundleTemplates(bundleId: string): ContentBundleTemplate[] {
  return getContentBundleConfig(bundleId).templates;
}

export function resolveTemplateFile(bundleId: string, templateSlug: string): string | undefined {
  return getContentBundleTemplates(bundleId).find((t) => t.slug === templateSlug)?.file;
}

export function resolveTemplateSlug(bundleId: string, templateFile: string): string | undefined {
  return getContentBundleTemplates(bundleId).find((t) => t.file === templateFile)?.slug;
}

export function matchTemplateFileFromUploadName(bundleId: string, fileName: string): string | undefined {
  const base = fileName.replace(/^.*[/\\]/, '').replace(/-branded\.html?$/i, '.html');
  const templates = getContentBundleTemplates(bundleId);
  const exact = templates.find((t) => t.file === base);
  if (exact) return exact.file;
  const lower = base.toLowerCase();
  return templates.find((t) => t.file.toLowerCase() === lower)?.file;
}

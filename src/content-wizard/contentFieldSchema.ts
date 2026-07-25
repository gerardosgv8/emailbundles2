import { getContentBundleConfig } from './bundleContentConfig';
import {
  humanizeElementId,
  isContentEditableProfile,
  profileToContentKind,
  sectionForElement,
} from './contentProfiles';
import type { ContentFieldDef, ContentSection, TemplateVisibilityState } from './types';

export function getContentFieldsForTemplate(bundleId: string, templateFile: string): ContentFieldDef[] {
  const { elementsByTemplate, profileByElement } = getContentBundleConfig(bundleId);
  const elementIds = elementsByTemplate[templateFile] ?? [];

  const fields: ContentFieldDef[] = [];

  for (const id of elementIds) {
    const profile = profileByElement[id];
    if (!profile || !isContentEditableProfile(profile)) continue;

    const kind = profileToContentKind(profile);
    if (!kind) continue;

    fields.push({
      id,
      kind,
      label: humanizeElementId(id),
      section: sectionForElement(id),
      profile,
    });
  }

  return fields;
}

export function groupContentFields(fields: ContentFieldDef[]): ContentSection[] {
  const bySection = new Map<string, ContentFieldDef[]>();
  const sectionOrder: string[] = [];

  for (const field of fields) {
    if (!bySection.has(field.section)) {
      sectionOrder.push(field.section);
      bySection.set(field.section, []);
    }
    bySection.get(field.section)!.push(field);
  }

  return sectionOrder.map((title) => ({
    id: title.toLowerCase().replace(/\s+/g, '-'),
    title,
    fields: bySection.get(title) ?? [],
  }));
}

export function emptyValueForField(field: ContentFieldDef): import('./types').ContentFieldValue {
  switch (field.kind) {
    case 'cta':
    case 'link':
      return { text: '', href: '' };
    case 'image':
      return { src: '', alt: '' };
    default:
      return '';
  }
}

export function buildEmptyContentState(fields: ContentFieldDef[]): import('./types').TemplateContentState {
  return Object.fromEntries(fields.map((field) => [field.id, emptyValueForField(field)]));
}

export function buildDefaultVisibility(fields: ContentFieldDef[]): TemplateVisibilityState {
  return Object.fromEntries(fields.map((field) => [field.id, true]));
}

export function buildEmptyContentStore(fields: ContentFieldDef[]): import('./types').TemplateContentStore {
  return {
    values: buildEmptyContentState(fields),
    visibility: buildDefaultVisibility(fields),
  };
}

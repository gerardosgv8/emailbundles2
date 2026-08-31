import { getContentBundleConfig } from './bundleContentConfig';
import {
  humanizeElementId,
  isContentEditableProfile,
  productIndexesInElements,
  profileToContentKind,
  sectionForElement,
} from './contentProfiles';
import type { ContentFieldDef, ContentSection, TemplateVisibilityState } from './types';

/** Template-specific field labels where generic hook names are unclear in the UI. */
const TEMPLATE_FIELD_LABELS: Partial<Record<string, Partial<Record<string, string>>>> = {
  'Product_Recommendations.html': {
    'hero-image': 'Featured product image',
  },
};

function fieldLabel(templateFile: string, id: string, omitProductIndex: boolean): string {
  return (
    TEMPLATE_FIELD_LABELS[templateFile]?.[id] ??
    humanizeElementId(id, { omitProductIndex })
  );
}

function labelAmountPairIds(elementId: string): { base: string; labelId: string; amountId: string } | null {
  if (elementId.endsWith('-label')) {
    const base = elementId.slice(0, -'-label'.length);
    return { base, labelId: elementId, amountId: `${base}-amount` };
  }
  if (elementId.endsWith('-amount')) {
    const base = elementId.slice(0, -'-amount'.length);
    return { base, labelId: `${base}-label`, amountId: elementId };
  }
  return null;
}

/** HTML hooks that belong to a content field (synthetic labelValue ids expand to both parts). */
export function contentFieldHookIds(field: ContentFieldDef): string[] {
  if (field.kind === 'labelValue' && field.labelElementId && field.valueElementId) {
    return [field.labelElementId, field.valueElementId];
  }
  return [field.id];
}

export function getContentFieldsForTemplate(bundleId: string, templateFile: string): ContentFieldDef[] {
  const { elementsByTemplate, profileByElement } = getContentBundleConfig(bundleId);
  const elementIds = elementsByTemplate[templateFile] ?? [];
  const idSet = new Set(elementIds);
  const omitProductIndex = productIndexesInElements(elementIds).size <= 1;

  const pairedBases = new Set<string>();
  for (const id of elementIds) {
    const pair = labelAmountPairIds(id);
    if (!pair) continue;
    if (idSet.has(pair.labelId) && idSet.has(pair.amountId)) {
      pairedBases.add(pair.base);
    }
  }

  const fields: ContentFieldDef[] = [];
  const emittedPairs = new Set<string>();

  for (const id of elementIds) {
    const pair = labelAmountPairIds(id);
    if (pair && pairedBases.has(pair.base)) {
      if (emittedPairs.has(pair.base)) continue;
      emittedPairs.add(pair.base);

      const amountProfile = profileByElement[pair.amountId];
      if (!amountProfile || !isContentEditableProfile(amountProfile)) continue;

      fields.push({
        id: pair.base,
        kind: 'labelValue',
        label: fieldLabel(templateFile, pair.base, omitProductIndex),
        section: sectionForElement(pair.amountId),
        profile: amountProfile,
        labelElementId: pair.labelId,
        valueElementId: pair.amountId,
      });
      continue;
    }

    const profile = profileByElement[id];
    if (!profile || !isContentEditableProfile(profile)) continue;

    const kind = profileToContentKind(profile);
    if (!kind) continue;

    fields.push({
      id,
      kind,
      label: fieldLabel(templateFile, id, omitProductIndex),
      section: sectionForElement(id),
      profile,
    });
  }

  return fields;
}

/** Group contiguous fields that share a section, preserving template top-to-bottom order. */
export function groupContentFields(fields: ContentFieldDef[]): ContentSection[] {
  const sections: ContentSection[] = [];

  for (const field of fields) {
    const last = sections[sections.length - 1];
    if (last && last.title === field.section) {
      last.fields.push(field);
      continue;
    }

    sections.push({
      id: `${field.section.toLowerCase().replace(/\s+/g, '-')}-${sections.length}`,
      title: field.section,
      fields: [field],
    });
  }

  return sections;
}

export function emptyValueForField(field: ContentFieldDef): import('./types').ContentFieldValue {
  switch (field.kind) {
    case 'cta':
    case 'link':
      return { text: '', href: '' };
    case 'image':
      return { src: '', alt: '', href: '' };
    case 'labelValue':
      return { label: '', value: '' };
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

import { contentFieldHookIds, getContentFieldsForTemplate } from './contentFieldSchema';
import { profileToContentKind } from './contentProfiles';
import { getContentBundleConfig } from './bundleContentConfig';
import { extractVisibilityFromHtml } from './contentVisibility';
import type {
  ContentFieldDef,
  ContentFieldValue,
  TemplateContentState,
  TemplateVisibilityState,
} from './types';

function readText(el: Element): string {
  if (el.tagName === 'IMG') return '';
  return (el.innerHTML ?? '').trim();
}

function readPlainText(el: Element | null): string {
  return (el?.textContent ?? '').replace(/\s+/g, ' ').trim();
}

function readCtaOrLink(el: Element): { text: string; href: string } {
  const anchor = el.tagName === 'A' ? el : el.querySelector('a');
  if (!anchor) {
    return { text: el.textContent?.trim() ?? '', href: '' };
  }
  return {
    text: anchor.textContent?.trim() ?? '',
    href: anchor.getAttribute('href') ?? '',
  };
}

function readImage(el: Element): { src: string; alt: string; href: string } {
  const img = el.tagName === 'IMG' ? el : el.querySelector('img');
  if (!img) return { src: '', alt: '', href: '' };

  const parentAnchor = img.closest('a');
  const href =
    parentAnchor?.getAttribute('href') ??
    img.getAttribute('data-href') ??
    '';

  return {
    src: img.getAttribute('src') ?? '',
    alt: img.getAttribute('alt') ?? '',
    href,
  };
}

function extractElementValue(el: Element, kind: ReturnType<typeof profileToContentKind>): ContentFieldValue | null {
  if (!kind) return null;

  switch (kind) {
    case 'text':
    case 'rich':
      return readText(el);
    case 'cta':
    case 'link':
      return readCtaOrLink(el);
    case 'image':
      return readImage(el);
    default:
      return null;
  }
}

function extractFieldValue(
  doc: Document,
  field: ContentFieldDef,
  profileByElement: Record<string, string>,
): ContentFieldValue | null {
  if (field.kind === 'labelValue' && field.labelElementId && field.valueElementId) {
    const labelEl = doc.querySelector(`[data-element="${field.labelElementId}"]`);
    const valueEl = doc.querySelector(`[data-element="${field.valueElementId}"]`);
    if (!labelEl && !valueEl) return null;
    return {
      label: readPlainText(labelEl),
      value: readPlainText(valueEl),
    };
  }

  const el = doc.querySelector(`[data-element="${field.id}"]`);
  if (!el) return null;

  const profile = profileByElement[field.id] ?? field.profile;
  const kind = profileToContentKind(profile) ?? field.kind;
  if (kind === 'labelValue') return null;
  return extractElementValue(el, kind);
}

export function extractContentFromHtml(
  html: string,
  bundleId: string,
  templateFile: string,
): { values: TemplateContentState; visibility: TemplateVisibilityState } {
  const { profileByElement } = getContentBundleConfig(bundleId);
  const fields = getContentFieldsForTemplate(bundleId, templateFile);
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const values: TemplateContentState = {};

  for (const field of fields) {
    const value = extractFieldValue(doc, field, profileByElement);
    if (value !== null) {
      values[field.id] = value;
    }
  }

  const visibilitySeedIds = fields.flatMap((field) => contentFieldHookIds(field));
  const rawVisibility = extractVisibilityFromHtml(doc, visibilitySeedIds);
  const visibility: TemplateVisibilityState = {};
  for (const field of fields) {
    const hooks = contentFieldHookIds(field);
    visibility[field.id] = hooks.every((hookId) => rawVisibility[hookId] !== false);
  }

  return { values, visibility };
}

export function detectTemplateFileFromHtml(html: string, bundleId: string): string | undefined {
  const { elementsByTemplate } = getContentBundleConfig(bundleId);
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const found = new Set<string>();

  doc.querySelectorAll('[data-element]').forEach((el) => {
    const id = el.getAttribute('data-element');
    if (id) found.add(id);
  });

  if (found.size === 0) return undefined;

  let bestFile: string | undefined;
  let bestScore = 0;

  for (const [file, elementIds] of Object.entries(elementsByTemplate)) {
    const score = elementIds.filter((id) => found.has(id)).length;
    if (score > bestScore) {
      bestScore = score;
      bestFile = file;
    }
  }

  return bestScore >= 3 ? bestFile : undefined;
}

import { getContentFieldsForTemplate } from './contentFieldSchema';
import { profileToContentKind } from './contentProfiles';
import { getContentBundleConfig } from './bundleContentConfig';
import { extractVisibilityFromHtml } from './contentVisibility';
import type { ContentFieldValue, TemplateContentState, TemplateVisibilityState } from './types';

function readText(el: Element): string {
  if (el.tagName === 'IMG') return '';
  return (el.innerHTML ?? '').trim();
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

function readImage(el: Element): { src: string; alt: string } {
  const img = el.tagName === 'IMG' ? el : el.querySelector('img');
  if (!img) return { src: '', alt: '' };
  return {
    src: img.getAttribute('src') ?? '',
    alt: img.getAttribute('alt') ?? '',
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

export function extractContentFromHtml(
  html: string,
  bundleId: string,
  templateFile: string,
): { values: TemplateContentState; visibility: TemplateVisibilityState } {
  const { profileByElement } = getContentBundleConfig(bundleId);
  const fields = getContentFieldsForTemplate(bundleId, templateFile);
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const values: TemplateContentState = {};
  const fieldIds = fields.map((field) => field.id);

  for (const field of fields) {
    const el = doc.querySelector(`[data-element="${field.id}"]`);
    if (!el) continue;

    const profile = profileByElement[field.id] ?? field.profile;
    const kind = profileToContentKind(profile) ?? field.kind;
    const value = extractElementValue(el, kind);
    if (value !== null) {
      values[field.id] = value;
    }
  }

  return {
    values,
    visibility: extractVisibilityFromHtml(doc, fieldIds),
  };
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

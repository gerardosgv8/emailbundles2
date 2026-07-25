import { setHref, setTextContent } from '../brand-wizard/apply/styleUtils';
import { getContentFieldsForTemplate } from './contentFieldSchema';
import { applyVisibilityToDocument } from './contentVisibility';
import type { ContentApplyReport, ContentFieldValue, TemplateContentState, TemplateVisibilityState } from './types';

function setRichContent(el: Element, html: string) {
  if (el.tagName === 'IMG') return;

  const anchor = el.tagName === 'A' ? el : null;
  if (anchor) {
    anchor.innerHTML = html;
    return;
  }

  const innerAnchor = el.querySelector(':scope > a:only-child');
  if (innerAnchor && el.childElementCount === 1 && el.textContent?.trim() === innerAnchor.textContent?.trim()) {
    innerAnchor.innerHTML = html;
    return;
  }

  el.innerHTML = html;
}

function applyCtaOrLink(el: Element, value: { text: string; href: string }) {
  const anchor = el.tagName === 'A' ? el : el.querySelector('a');
  if (anchor) {
    if (value.text) anchor.textContent = value.text;
    if (value.href) setHref(anchor, value.href);
    return;
  }
  if (value.text) setTextContent(el, value.text);
  if (value.href) setHref(el, value.href);
}

function applyImage(el: Element, value: { src: string; alt: string }) {
  const img = el.tagName === 'IMG' ? el : el.querySelector('img');
  if (!img) return;
  if (value.src) img.setAttribute('src', value.src);
  if (value.alt) img.setAttribute('alt', value.alt);
}

function applyFieldValue(el: Element, kind: string, value: ContentFieldValue): boolean {
  if (typeof value === 'string') {
    if (!value.trim()) return false;
    if (kind === 'rich') {
      setRichContent(el, value);
    } else {
      setTextContent(el, value);
    }
    return true;
  }

  if ('href' in value && 'text' in value) {
    if (!value.text.trim() && !value.href.trim()) return false;
    applyCtaOrLink(el, value);
    return true;
  }

  if ('src' in value && 'alt' in value) {
    if (!value.src.trim() && !value.alt.trim()) return false;
    applyImage(el, value);
    return true;
  }

  return false;
}

export function applyContentToHtml(
  html: string,
  values: TemplateContentState,
  bundleId: string,
  templateFile: string,
  visibility: TemplateVisibilityState = {},
): { html: string; report: ContentApplyReport } {
  const fields = getContentFieldsForTemplate(bundleId, templateFile);
  const kindById = Object.fromEntries(fields.map((f) => [f.id, f.kind]));
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const touched = new Set<string>();
  let updateCount = 0;

  for (const [elementId, value] of Object.entries(values)) {
    const kind = kindById[elementId];
    if (!kind) continue;

    for (const el of doc.querySelectorAll(`[data-element="${elementId}"]`)) {
      if (applyFieldValue(el, kind, value)) {
        touched.add(elementId);
        updateCount += 1;
      }
    }
  }

  updateCount += applyVisibilityToDocument(doc, visibility);
  for (const [elementId, visible] of Object.entries(visibility)) {
    if (!visible) touched.add(elementId);
  }

  const hasHtmlShell = /<html[\s>]/i.test(html);
  const serialized = hasHtmlShell
    ? `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`
    : doc.body.innerHTML;

  return {
    html: serialized,
    report: {
      templateFile,
      updateCount,
      touchedElements: [...touched].sort(),
    },
  };
}

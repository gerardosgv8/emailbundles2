import { setHref, setTextContent } from '../brand-wizard/apply/styleUtils';
import { contentFieldHookIds, getContentFieldsForTemplate } from './contentFieldSchema';
import { applyVisibilityToDocument } from './contentVisibility';
import type {
  ContentApplyReport,
  ContentFieldDef,
  ContentFieldValue,
  TemplateContentState,
  TemplateVisibilityState,
} from './types';

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

function applyImage(el: Element, value: { src: string; alt: string; href?: string }) {
  const img = el.tagName === 'IMG' ? el : el.querySelector('img');
  if (!img) return;
  if (value.src) img.setAttribute('src', value.src);
  if (value.alt) img.setAttribute('alt', value.alt);

  const href = value.href?.trim() ?? '';
  if (!href) return;

  const parentAnchor = img.closest('a');
  if (parentAnchor) {
    setHref(parentAnchor, href);
  }
}

/** MSO conditionals are HTML comments — sync VML roundrect href near an image hook in raw markup. */
function syncVmlImageHref(html: string, elementId: string, href: string): string {
  const marker = `data-element="${elementId}"`;
  const idx = html.indexOf(marker);
  if (idx < 0) return html;

  const windowStart = Math.max(0, idx - 1800);
  const before = html.slice(windowStart, idx);
  const msoRel = before.lastIndexOf('<!--[if mso]>');
  if (msoRel < 0) return html;

  const msoStart = windowStart + msoRel;
  const msoEnd = html.indexOf('<![endif]-->', msoStart);
  if (msoEnd < 0 || msoEnd > idx) return html;

  const block = html.slice(msoStart, msoEnd);
  if (!/v:imagedata/i.test(block) || !/<v:roundrect\b/i.test(block)) return html;

  const updated = block.replace(/<v:roundrect\b([^>]*)>/i, (_full, attrs: string) => {
    if (/\bhref\s*=/i.test(attrs)) {
      return `<v:roundrect${attrs.replace(/\bhref\s*=\s*("[^"]*"|'[^']*')/i, ` href="${href}"`)}>`;
    }
    return `<v:roundrect href="${href}"${attrs}>`;
  });

  return html.slice(0, msoStart) + updated + html.slice(msoEnd);
}

/** MSO conditionals are HTML comments — sync v:imagedata src near an image hook in raw markup. */
function syncVmlImageSrc(html: string, elementId: string, src: string): string {
  const marker = `data-element="${elementId}"`;
  const idx = html.indexOf(marker);
  if (idx < 0) return html;

  const windowStart = Math.max(0, idx - 1800);
  const before = html.slice(windowStart, idx);
  const msoRel = before.lastIndexOf('<!--[if mso]>');
  if (msoRel < 0) return html;

  const msoStart = windowStart + msoRel;
  const msoEnd = html.indexOf('<![endif]-->', msoStart);
  if (msoEnd < 0 || msoEnd > idx) return html;

  const block = html.slice(msoStart, msoEnd);
  if (!/v:imagedata/i.test(block)) return html;

  const updated = block.replace(/<v:imagedata\b([^>]*)\/?>/i, (_full, attrs: string) => {
    if (/\bsrc\s*=/i.test(attrs)) {
      return `<v:imagedata${attrs.replace(/\bsrc\s*=\s*("[^"]*"|'[^']*')/i, ` src="${src}"`)} />`;
    }
    return `<v:imagedata src="${src}"${attrs} />`;
  });

  return html.slice(0, msoStart) + updated + html.slice(msoEnd);
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

  if ('src' in value && 'alt' in value) {
    if (!value.src.trim() && !value.alt.trim() && !value.href.trim()) return false;
    applyImage(el, value);
    return true;
  }

  if ('href' in value && 'text' in value) {
    if (!value.text.trim() && !value.href.trim()) return false;
    applyCtaOrLink(el, value);
    return true;
  }

  return false;
}

function applyLabelValueField(
  doc: Document,
  field: ContentFieldDef,
  value: ContentFieldValue,
): boolean {
  if (typeof value !== 'object' || value === null || !('label' in value) || !('value' in value)) {
    return false;
  }
  if (!field.labelElementId || !field.valueElementId) return false;
  if (!value.label.trim() && !value.value.trim()) return false;

  let updated = false;
  if (value.label.trim()) {
    for (const el of doc.querySelectorAll(`[data-element="${field.labelElementId}"]`)) {
      setTextContent(el, value.label);
      updated = true;
    }
  }
  if (value.value.trim()) {
    for (const el of doc.querySelectorAll(`[data-element="${field.valueElementId}"]`)) {
      setTextContent(el, value.value);
      updated = true;
    }
  }
  return updated;
}

function expandVisibilityForHooks(
  fields: ContentFieldDef[],
  visibility: TemplateVisibilityState,
): TemplateVisibilityState {
  const expanded: TemplateVisibilityState = {};
  for (const field of fields) {
    if (!(field.id in visibility)) continue;
    const visible = visibility[field.id];
    for (const hookId of contentFieldHookIds(field)) {
      expanded[hookId] = visible;
    }
  }
  // Preserve any raw hook keys already present.
  for (const [id, visible] of Object.entries(visibility)) {
    if (!(id in expanded)) expanded[id] = visible;
  }
  return expanded;
}

export function applyContentToHtml(
  html: string,
  values: TemplateContentState,
  bundleId: string,
  templateFile: string,
  visibility: TemplateVisibilityState = {},
): { html: string; report: ContentApplyReport } {
  const fields = getContentFieldsForTemplate(bundleId, templateFile);
  const fieldById = Object.fromEntries(fields.map((f) => [f.id, f]));
  const kindById = Object.fromEntries(fields.map((f) => [f.id, f.kind]));
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const touched = new Set<string>();
  let updateCount = 0;

  for (const [elementId, value] of Object.entries(values)) {
    const kind = kindById[elementId];
    if (!kind) continue;
    const field = fieldById[elementId];

    if (kind === 'labelValue' && field) {
      if (applyLabelValueField(doc, field, value)) {
        touched.add(elementId);
        updateCount += 1;
      }
      continue;
    }

    for (const el of doc.querySelectorAll(`[data-element="${elementId}"]`)) {
      if (applyFieldValue(el, kind, value)) {
        touched.add(elementId);
        updateCount += 1;
      }
    }
  }

  const hookVisibility = expandVisibilityForHooks(fields, visibility);
  updateCount += applyVisibilityToDocument(doc, hookVisibility);
  for (const [elementId, visible] of Object.entries(visibility)) {
    if (!visible) touched.add(elementId);
  }

  const hasHtmlShell = /<html[\s>]/i.test(html);
  let serialized = hasHtmlShell
    ? `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`
    : doc.body.innerHTML;

  for (const [elementId, value] of Object.entries(values)) {
    if (kindById[elementId] !== 'image') continue;
    if (typeof value !== 'object' || value === null) continue;
    if ('href' in value) {
      const href = value.href.trim();
      if (href) serialized = syncVmlImageHref(serialized, elementId, href);
    }
    if ('src' in value) {
      const src = value.src.trim();
      if (src) serialized = syncVmlImageSrc(serialized, elementId, src);
    }
  }

  return {
    html: serialized,
    report: {
      templateFile,
      updateCount,
      touchedElements: [...touched].sort(),
    },
  };
}

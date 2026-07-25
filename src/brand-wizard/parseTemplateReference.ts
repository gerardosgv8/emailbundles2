import {
  getTemplatePreviewKeys,
  getTemplatePreviewLabel,
  isTemplatePreviewBundle,
  type TemplatePreviewBundleId,
} from './templatePreviewCatalog';

export type TemplateRefSegment =
  | { type: 'text'; value: string }
  | { type: 'template'; key: string; label: string };

function appendText(segments: TemplateRefSegment[], value: string) {
  if (!value) return;
  const last = segments[segments.length - 1];
  if (last?.type === 'text') {
    last.value += value;
    return;
  }
  segments.push({ type: 'text', value });
}

function findNextTemplateIndex(raw: string, from: number, keys: string[]): number {
  let next = -1;
  for (const key of keys) {
    const idx = raw.indexOf(key, from);
    if (idx !== -1 && (next === -1 || idx < next)) {
      next = idx;
    }
  }
  return next;
}

export function parseTemplateReference(bundleId: string, raw: string): TemplateRefSegment[] {
  if (!isTemplatePreviewBundle(bundleId) || !raw.trim()) {
    return [{ type: 'text', value: raw }];
  }

  const keys = getTemplatePreviewKeys(bundleId);
  const segments: TemplateRefSegment[] = [];
  let cursor = 0;

  while (cursor < raw.length) {
    const matchedKey = keys.find((key) => raw.startsWith(key, cursor));

    if (matchedKey) {
      segments.push({
        type: 'template',
        key: matchedKey,
        label: getTemplatePreviewLabel(bundleId as TemplatePreviewBundleId, matchedKey),
      });
      cursor += matchedKey.length;
      continue;
    }

    const nextTemplate = findNextTemplateIndex(raw, cursor + 1, keys);
    const end = nextTemplate === -1 ? raw.length : nextTemplate;
    appendText(segments, raw.slice(cursor, end));
    cursor = end;
  }

  return segments.length > 0 ? segments : [{ type: 'text', value: raw }];
}

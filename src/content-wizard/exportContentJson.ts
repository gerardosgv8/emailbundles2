import type { ContentFieldDef, TemplateContentState, TemplateVisibilityState } from './types';

export const CONTENT_JSON_FILENAME = 'CONTENT.json';

export function exportContentJson(
  templateFile: string,
  templateName: string,
  fields: ContentFieldDef[],
  values: TemplateContentState,
  visibility: TemplateVisibilityState,
): string {
  const payload = {
    templateFile,
    templateName,
    exportedAt: new Date().toISOString(),
    fields: fields.map((field) => ({
      id: field.id,
      label: field.label,
      kind: field.kind,
      section: field.section,
      visible: visibility[field.id] ?? true,
      value: values[field.id] ?? null,
    })),
  };
  return JSON.stringify(payload, null, 2);
}

export function filledTemplateFilename(templateFile: string): string {
  return templateFile.replace(/\.html?$/i, '-filled.html');
}

export function downloadFilledTemplate(options: { html: string; templateFile: string }) {
  const filename = filledTemplateFilename(options.templateFile);
  const blob = new Blob([options.html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

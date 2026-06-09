import JSZip from 'jszip';
import type { DesignRulesState } from '../types';
import { applyBrandToHtml, summarizeReport, type ApplyReport } from './applyBrandToHtml';

export type ApplyBundleResult = {
  blob: Blob;
  filename: string;
  report: ApplyReport;
};

function isHtmlPath(path: string): boolean {
  return /\.html?$/i.test(path) && !path.startsWith('__MACOSX/') && !path.includes('/._');
}

function outputName(inputName: string): string {
  const base = inputName.replace(/\.(html?|zip)$/i, '');
  return `${base}-branded.zip`;
}

export async function applyBrandToUpload(
  file: File,
  state: DesignRulesState,
): Promise<ApplyBundleResult> {
  const lowerName = file.name.toLowerCase();

  if (lowerName.endsWith('.html') || lowerName.endsWith('.htm')) {
    const html = await file.text();
    const { html: brandedHtml, fileResult } = applyBrandToHtml(html, state, file.name);
    const zip = new JSZip();
    const brandedName = file.name.replace(/\.html?$/i, '-branded.html');
    zip.file(brandedName, brandedHtml);
    const blob = await zip.generateAsync({ type: 'blob' });
    return {
      blob,
      filename: outputName(file.name),
      report: summarizeReport([fileResult]),
    };
  }

  if (!lowerName.endsWith('.zip')) {
    throw new Error('Upload an .html template or a .zip bundle.');
  }

  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const outZip = new JSZip();
  const fileResults = [];

  const htmlPaths = Object.keys(zip.files).filter(
    (path) => !zip.files[path].dir && isHtmlPath(path),
  );

  if (htmlPaths.length === 0) {
    throw new Error('No HTML templates found in this zip. Include .html files with data-element hooks.');
  }

  for (const [path, entry] of Object.entries(zip.files)) {
    if (entry.dir) continue;

    if (isHtmlPath(path)) {
      const html = await entry.async('string');
      const { html: brandedHtml, fileResult } = applyBrandToHtml(html, state, path);
      outZip.file(path, brandedHtml);
      fileResults.push(fileResult);
      continue;
    }

    const binary = await entry.async('uint8array');
    outZip.file(path, binary);
  }

  const blob = await outZip.generateAsync({ type: 'blob' });
  return {
    blob,
    filename: outputName(file.name),
    report: summarizeReport(fileResults),
  };
}

export function downloadBrandedBundle(result: ApplyBundleResult) {
  const url = URL.createObjectURL(result.blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = result.filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

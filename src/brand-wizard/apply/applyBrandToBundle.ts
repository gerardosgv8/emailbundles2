import JSZip from 'jszip';
import type { DesignRulesState } from '../types';
import { exportDesignRules } from '../exportDesignRules';
import { applyBrandToHtml, summarizeReport, type ApplyReport } from './applyBrandToHtml';

export const DESIGN_RULES_FILENAME = 'DESIGN_RULES.md';

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

function appendDesignRules(zip: JSZip, state: DesignRulesState): void {
  zip.file(DESIGN_RULES_FILENAME, exportDesignRules(state));
}

export async function applyBrandToUpload(
  file: File,
  state: DesignRulesState,
  bundleId: string,
): Promise<ApplyBundleResult> {
  const lowerName = file.name.toLowerCase();

  if (lowerName.endsWith('.html') || lowerName.endsWith('.htm')) {
    const html = await file.text();
    const { html: brandedHtml, fileResult } = applyBrandToHtml(html, state, bundleId, file.name);
    const zip = new JSZip();
    const brandedName = file.name.replace(/\.html?$/i, '-branded.html');
    zip.file(brandedName, brandedHtml);
    appendDesignRules(zip, state);
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
      const { html: brandedHtml, fileResult } = applyBrandToHtml(html, state, bundleId, path);
      outZip.file(path, brandedHtml);
      fileResults.push(fileResult);
      continue;
    }

    if (path.replace(/\\/g, '/').endsWith(DESIGN_RULES_FILENAME)) {
      continue;
    }

    const binary = await entry.async('uint8array');
    outZip.file(path, binary);
  }

  appendDesignRules(outZip, state);
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

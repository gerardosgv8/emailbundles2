import type { DesignRulesState } from '../types';
import {
  INDUSTRIAL_B2B_ELEMENT_REGISTRY,
  INDUSTRIAL_B2B_KNOWN_ELEMENTS,
  INDUSTRIAL_B2B_PROFILE_BY_ELEMENT,
} from './industrialB2bElementRegistry';
import {
  applyElementProfile,
  applyEmailSurfaces,
  applyGlobalTypography,
  applyHeaderLogo,
} from './industrialB2bApplyEngine';
import { injectBrandStyleOverrides } from './injectBrandStyles';
import { applyLinkDecorationPass } from './styleUtils';

export type FileApplyResult = {
  path: string;
  updateCount: number;
  touchedElements: string[];
  unmappedElements: string[];
};

export type ApplyReport = {
  files: FileApplyResult[];
  totalUpdates: number;
  warnings: string[];
};

function collectUnmappedElements(doc: Document): string[] {
  const found = new Set<string>();
  doc.querySelectorAll('[data-element]').forEach((el) => {
    const name = el.getAttribute('data-element');
    if (name && !INDUSTRIAL_B2B_KNOWN_ELEMENTS.includes(name)) {
      found.add(name);
    }
  });
  return [...found].sort();
}

export function applyBrandToHtml(html: string, state: DesignRulesState, filePath = 'template.html'): {
  html: string;
  fileResult: FileApplyResult;
} {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const touched = new Set<string>();
  let updateCount = 0;

  for (const entry of INDUSTRIAL_B2B_ELEMENT_REGISTRY) {
    const profile = INDUSTRIAL_B2B_PROFILE_BY_ELEMENT[entry.id];
    if (!profile) continue;

    for (const el of doc.querySelectorAll(`[data-element="${entry.id}"]`)) {
      if (applyElementProfile(el, profile, state, { filePath, elementId: entry.id })) {
        updateCount += 1;
        touched.add(entry.id);
      }
    }
  }

  if (applyHeaderLogo(doc, state)) {
    updateCount += 1;
    touched.add('header-logo');
  }

  updateCount += applyEmailSurfaces(doc, state);
  if (state.colorBgEmail.trim()) {
    touched.add('email-surface');
  }

  if (applyGlobalTypography(doc, state)) {
    updateCount += 1;
    touched.add('font-stack');
  }

  if (injectBrandStyleOverrides(doc, state)) {
    updateCount += 1;
    touched.add('brand-style-block');
  }

  applyLinkDecorationPass(doc);
  touched.add('link-decoration');

  doc.documentElement.setAttribute('data-mailcraft-branded', '');

  const unmappedElements = collectUnmappedElements(doc);
  const hasHtmlShell = /<html[\s>]/i.test(html);
  const serialized = hasHtmlShell
    ? `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`
    : doc.body.innerHTML;

  return {
    html: serialized,
    fileResult: {
      path: filePath,
      updateCount,
      touchedElements: [...touched].sort(),
      unmappedElements,
    },
  };
}

export function summarizeReport(files: FileApplyResult[]): ApplyReport {
  const warnings: string[] = [
    'Review Outlook VML button blocks after applying brand colors.',
    'Send test emails before launching to your full list.',
  ];

  const allUnmapped = [...new Set(files.flatMap((file) => file.unmappedElements))];
  if (allUnmapped.length > 0) {
    warnings.unshift(
      `Found ${allUnmapped.length} data-element hook(s) not in the apply map: ${allUnmapped.slice(0, 6).join(', ')}${allUnmapped.length > 6 ? '…' : ''}`,
    );
  }

  return {
    files,
    totalUpdates: files.reduce((sum, file) => sum + file.updateCount, 0),
    warnings,
  };
}

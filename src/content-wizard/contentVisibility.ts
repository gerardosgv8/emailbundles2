import {
  removeStylePropertiesFromElement,
  upsertStylePropertyOnElement,
} from '../brand-wizard/apply/styleUtils';

export const CONTENT_HIDDEN_ATTR = 'data-content-hidden';

function countUniqueHooks(root: Element): number {
  return new Set(
    [...root.querySelectorAll('[data-element]')]
      .map((node) => node.getAttribute('data-element'))
      .filter(Boolean),
  ).size;
}

function findButtonTd(el: Element): HTMLTableCellElement | null {
  let node: Element | null = el;
  while (node) {
    if (node.tagName === 'TD') {
      const hook = node.getAttribute('data-element') ?? '';
      if (hook.includes('button') || hook.endsWith('-cta-button')) {
        return node as HTMLTableCellElement;
      }
    }
    node = node.parentElement;
  }
  return null;
}

/** Pick the layout node to hide so spacing collapses cleanly in table-based email HTML. */
export function resolveContentHideTarget(el: Element): HTMLElement {
  const hook = el.getAttribute('data-element') ?? '';

  if (hook.includes('cta') && !hook.endsWith('-button')) {
    const anchor = el.tagName === 'A' ? el : el.querySelector('a');
    const buttonTd = anchor ? findButtonTd(anchor) : findButtonTd(el);
    if (buttonTd) {
      let hostTr: Element | null = buttonTd.closest('tr');
      while (hostTr) {
        const rowCells = hostTr.querySelectorAll(':scope > td, :scope > th');
        if (rowCells.length > 1) {
          for (const cell of rowCells) {
            if (cell.contains(buttonTd)) return cell as HTMLElement;
          }
        }

        const parentTable = hostTr.parentElement?.closest('table');
        const wrapperTd = parentTable?.closest('td');
        if (wrapperTd) {
          const outerTr = wrapperTd.closest('tr');
          const outerCells = outerTr?.querySelectorAll(':scope > td, :scope > th') ?? [];
          if (outerCells.length > 1) {
            return wrapperTd as HTMLElement;
          }
        }

        hostTr = hostTr.parentElement?.closest('tr') ?? null;
      }
      return buttonTd;
    }
  }

  if (el.tagName === 'IMG' || hook.endsWith('-image') || hook === 'logo') {
    const row = el.closest('tr');
    if (row && countUniqueHooks(row) <= 2) {
      return row as HTMLElement;
    }
    const cell = el.closest('td');
    if (cell && countUniqueHooks(cell) === 1) {
      return cell as HTMLElement;
    }
  }

  if (hook.endsWith('-icon')) {
    return el as HTMLElement;
  }

  const row = el.closest('tr');
  if (row) {
    const hooksInRow = countUniqueHooks(row);
    if (hooksInRow === 1) {
      return row as HTMLElement;
    }

    const cell = el.closest('td');
    if (cell && countUniqueHooks(cell) === 1) {
      return cell as HTMLElement;
    }
  }

  return el as HTMLElement;
}

export function isContentHidden(el: Element): boolean {
  const target = resolveContentHideTarget(el);
  if (target.getAttribute(CONTENT_HIDDEN_ATTR) === 'true') return true;
  const style = target.getAttribute('style') ?? '';
  return /display\s*:\s*none/i.test(style);
}

export function applyContentVisibility(el: Element, visible: boolean): void {
  const target = resolveContentHideTarget(el);
  el.setAttribute(CONTENT_HIDDEN_ATTR, visible ? 'false' : 'true');

  if (visible) {
    target.removeAttribute(CONTENT_HIDDEN_ATTR);
    removeStylePropertiesFromElement(target, ['display']);
    if (target !== el) {
      removeStylePropertiesFromElement(el, ['display']);
    }
    return;
  }

  target.setAttribute(CONTENT_HIDDEN_ATTR, 'true');
  upsertStylePropertyOnElement(target, 'display', 'none', true);
}

export function extractVisibilityFromHtml(
  doc: Document,
  elementIds: string[],
): Record<string, boolean> {
  const visibility: Record<string, boolean> = {};

  for (const id of elementIds) {
    const el = doc.querySelector(`[data-element="${id}"]`);
    visibility[id] = el ? !isContentHidden(el) : true;
  }

  return visibility;
}

export function applyVisibilityToDocument(
  doc: Document,
  visibility: Record<string, boolean>,
): number {
  let count = 0;

  for (const [elementId, visible] of Object.entries(visibility)) {
    if (visible) continue;
    for (const el of doc.querySelectorAll(`[data-element="${elementId}"]`)) {
      applyContentVisibility(el, false);
      count += 1;
    }
  }

  for (const [elementId, visible] of Object.entries(visibility)) {
    if (!visible) continue;
    for (const el of doc.querySelectorAll(`[data-element="${elementId}"]`)) {
      if (isContentHidden(el)) {
        applyContentVisibility(el, true);
        count += 1;
      }
    }
  }

  return count;
}

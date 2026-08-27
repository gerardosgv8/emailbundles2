import {
  removeStylePropertiesFromElement,
  upsertStylePropertyOnElement,
} from '../brand-wizard/apply/styleUtils';

export const CONTENT_HIDDEN_ATTR = 'data-content-hidden';
const CONTENT_PREV_STYLE_ATTR = 'data-content-prev-style';

const LAYOUT_TAGS = new Set(['TR', 'TD', 'TH', 'TABLE', 'DIV', 'TBODY']);

function countUniqueHooks(root: Element): Set<string> {
  const hooks = new Set<string>();
  const self = root.getAttribute('data-element');
  if (self) hooks.add(self);
  for (const node of root.querySelectorAll('[data-element]')) {
    const id = node.getAttribute('data-element');
    if (id) hooks.add(id);
  }
  return hooks;
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

function isDisplayNone(el: Element): boolean {
  return /display\s*:\s*none/i.test(el.getAttribute('style') ?? '');
}

function parseIndexedBlockHook(
  hook: string,
): { kind: 'step' | 'feature'; index: string; part: string } | null {
  const match = hook.match(/^(step|feature)-(\d+)-(title|description|number|icon)$/);
  if (!match) return null;
  return {
    kind: match[1] as 'step' | 'feature',
    index: match[2],
    part: match[3],
  };
}

/** Title/description toggles for the same step or feature share one show/hide state. */
export function linkedVisibilityIds(fieldId: string): string[] {
  const parsed = parseIndexedBlockHook(fieldId);
  if (!parsed) return [fieldId];
  if (parsed.part !== 'title' && parsed.part !== 'description') return [fieldId];
  return [`${parsed.kind}-${parsed.index}-title`, `${parsed.kind}-${parsed.index}-description`];
}

/**
 * Find the outer step/feature <tr> that wraps both the text fields and the
 * companion badge (number/icon), including padding cells.
 */
export function findIndexedContentBlock(
  el: Element,
  kind: 'step' | 'feature',
  index: string,
): HTMLElement | null {
  const doc = el.ownerDocument;
  if (!doc) return null;

  const companions = [
    ...doc.querySelectorAll(`[data-element="${kind}-${index}-number"]`),
    ...doc.querySelectorAll(`[data-element="${kind}-${index}-icon"]`),
  ];
  if (companions.length === 0) return null;

  let node: Element | null = el;
  while (node) {
    if (node.tagName === 'TR' && companions.some((companion) => node!.contains(companion))) {
      return node as HTMLElement;
    }
    node = node.parentElement;
  }

  return null;
}

/** Hooks that belong together for exclusive-container climbing (CTA + button TD, label + amount). */
function relatedHooksFor(hook: string): Set<string> {
  const related = new Set<string>([hook]);

  if (hook.endsWith('-button')) {
    related.add(hook.replace(/-button$/, ''));
  } else {
    related.add(`${hook}-button`);
  }

  if (hook.endsWith('-label')) {
    related.add(hook.replace(/-label$/, '-amount'));
  } else if (hook.endsWith('-amount')) {
    related.add(hook.replace(/-amount$/, '-label'));
  }

  return related;
}

function relatedNodesIn(container: Element, hook: string): Element[] {
  const related = relatedHooksFor(hook);
  const nodes = [...container.querySelectorAll('[data-element]')].filter((node) =>
    related.has(node.getAttribute('data-element') ?? ''),
  );
  const selfHook = container.getAttribute('data-element');
  if (selfHook && related.has(selfHook)) nodes.push(container);
  // Prefer outermost related nodes so nested CTA/button text is not double-counted.
  return nodes.filter((node) => !nodes.some((other) => other !== node && other.contains(node)));
}

function containerOnlyHasRelatedHooks(container: Element, hook: string): boolean {
  const related = relatedHooksFor(hook);
  const hooks = countUniqueHooks(container);
  if (hooks.size === 0) return false;
  if (![...hooks].every((id) => related.has(id))) return false;

  const relatedNodes = relatedNodesIn(container, hook);
  for (const img of container.querySelectorAll('img')) {
    if (!relatedNodes.some((node) => node === img || node.contains(img))) return false;
  }

  const strip = (value: string) => value.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
  const containerText = strip(container.textContent ?? '');
  if (!containerText) return true;

  let relatedText = '';
  for (const node of relatedNodes) relatedText += node.textContent ?? '';
  relatedText = strip(relatedText);
  if (!relatedText) return false;
  if (containerText === relatedText) return true;
  if (!containerText.includes(relatedText)) return false;

  const leftover = strip(containerText.split(relatedText).join(''));
  return leftover.length <= 1;
}

function setTargetVisibility(target: HTMLElement, visible: boolean): void {
  if (visible) {
    target.removeAttribute(CONTENT_HIDDEN_ATTR);
    const prev = target.getAttribute(CONTENT_PREV_STYLE_ATTR);
    if (prev !== null) {
      if (prev.trim()) target.setAttribute('style', prev);
      else target.removeAttribute('style');
      target.removeAttribute(CONTENT_PREV_STYLE_ATTR);
      return;
    }
    removeStylePropertiesFromElement(
      target,
      [
        'display',
        'max-height',
        'overflow',
        'height',
        'font-size',
        'line-height',
        'mso-hide',
        'padding',
        'margin',
        'border',
        'border-width',
      ],
      { allowStructural: true },
    );
    return;
  }

  if (!target.hasAttribute(CONTENT_PREV_STYLE_ATTR)) {
    target.setAttribute(CONTENT_PREV_STYLE_ATTR, target.getAttribute('style') ?? '');
  }

  target.setAttribute(CONTENT_HIDDEN_ATTR, 'true');
  upsertStylePropertyOnElement(target, 'display', 'none', true);
  upsertStylePropertyOnElement(target, 'max-height', '0', true);
  upsertStylePropertyOnElement(target, 'overflow', 'hidden', true);
  upsertStylePropertyOnElement(target, 'height', '0', true);
  upsertStylePropertyOnElement(target, 'font-size', '0', true);
  upsertStylePropertyOnElement(target, 'line-height', '0', true);
  upsertStylePropertyOnElement(target, 'mso-hide', 'all', true);
  upsertStylePropertyOnElement(target, 'padding', '0', true);
  upsertStylePropertyOnElement(target, 'margin', '0', true);
  upsertStylePropertyOnElement(target, 'border', '0', true);
  upsertStylePropertyOnElement(target, 'border-width', '0', true);
}

/**
 * When every editable text field in a step/feature row is hidden, collapse the
 * whole row (badge + padding). Otherwise keep the row and rely on per-field hides.
 */
function applyIndexedBlockCollapse(
  doc: Document,
  visibility: Record<string, boolean>,
): number {
  const blockKeys = new Set<string>();

  for (const elementId of Object.keys(visibility)) {
    const parsed = parseIndexedBlockHook(elementId);
    if (!parsed) continue;
    if (parsed.part !== 'title' && parsed.part !== 'description') continue;
    blockKeys.add(`${parsed.kind}:${parsed.index}`);
  }

  let count = 0;

  for (const key of blockKeys) {
    const [kind, index] = key.split(':') as ['step' | 'feature', string];
    const titleId = `${kind}-${index}-title`;
    const descriptionId = `${kind}-${index}-description`;
    const members = [titleId, descriptionId].filter((id) => id in visibility);
    if (members.length === 0) continue;

    const seed =
      doc.querySelector(`[data-element="${titleId}"]`) ??
      doc.querySelector(`[data-element="${descriptionId}"]`);
    if (!seed) continue;

    const block = findIndexedContentBlock(seed, kind, index);
    if (!block) continue;

    const allHidden = members.every((id) => visibility[id] === false);
    const blockHidden =
      block.getAttribute(CONTENT_HIDDEN_ATTR) === 'true' || isDisplayNone(block);

    if (allHidden) {
      if (!blockHidden) count += 1;
      setTargetVisibility(block, false);
      continue;
    }

    if (blockHidden) {
      setTargetVisibility(block, true);
      count += 1;
    }
  }

  return count;
}

/**
 * When every field for a numbered product/topic card is hidden, collapse the
 * whole card cell (including unhooked images and padding).
 */
function applyProductCardCollapse(
  doc: Document,
  visibility: Record<string, boolean>,
): number {
  const groups = new Map<string, string[]>();

  for (const elementId of Object.keys(visibility)) {
    const match = elementId.match(
      /^(arrival|product|deal|topic|quick|grid-product|speaker|update)-(\d+)-/,
    );
    if (!match) continue;
    const key = `${match[1]}-${match[2]}`;
    const list = groups.get(key) ?? [];
    list.push(elementId);
    groups.set(key, list);
  }

  let count = 0;

  for (const [key, members] of groups) {
    if (members.length === 0) continue;
    const allHidden = members.every((id) => visibility[id] === false);
    const seed = doc.querySelector(`[data-element="${members[0]}"]`);
    if (!seed) continue;

    let card: HTMLElement | null = null;
    let node: Element | null = seed;
    while (node && node.tagName !== 'BODY') {
      if (node.tagName === 'TD' || node.tagName === 'TH') {
        const hooks = countUniqueHooks(node);
        if ([...hooks].every((id) => id.startsWith(`${key}-`))) {
          card = node as HTMLElement;
          const parentRow = node.parentElement;
          const siblingCells = parentRow
            ? [...parentRow.children].filter((child) => child.tagName === 'TD' || child.tagName === 'TH')
            : [];
          // Prefer the column cell in a multi-column product row.
          if (siblingCells.length > 1) break;
        }
      }
      node = node.parentElement;
    }

    if (!card) continue;

    const cardHidden =
      card.getAttribute(CONTENT_HIDDEN_ATTR) === 'true' || isDisplayNone(card);

    if (allHidden) {
      if (!cardHidden) count += 1;
      setTargetVisibility(card, false);
    } else if (cardHidden) {
      setTargetVisibility(card, true);
      count += 1;
    }
  }

  return count;
}

function isCollapsed(el: Element): boolean {
  return el.getAttribute(CONTENT_HIDDEN_ATTR) === 'true' || isDisplayNone(el);
}

function isInsideCollapsed(el: Element, stopAt: Element | null = null): boolean {
  let node: Element | null = el;
  while (node && node !== stopAt) {
    if (isCollapsed(node)) return true;
    node = node.parentElement;
  }
  return false;
}

function getDepth(el: Element): number {
  let depth = 0;
  let node: Element | null = el;
  while (node) {
    depth += 1;
    node = node.parentElement;
  }
  return depth;
}

function isSpacerLike(el: Element): boolean {
  if (el.querySelector('img')) return false;
  if (countUniqueHooks(el).size > 0) return false;
  const text = (el.textContent ?? '').replace(/\u00a0/g, ' ').replace(/\s+/g, '').trim();
  return text.length === 0;
}

function isChromeHook(id: string): boolean {
  return (
    id.endsWith('-button') ||
    id.endsWith('-number') ||
    id.endsWith('-icon') ||
    id.endsWith('-container') ||
    id.endsWith('-container-td')
  );
}

/**
 * True when every tracked content hook in the container is hidden and no visible
 * unhooked media remains outside already-collapsed subtrees.
 */
function isFullyHiddenContainer(container: Element, visibility: Record<string, boolean>): boolean {
  const hooks = countUniqueHooks(container);
  const tracked = [...hooks].filter((id) => id in visibility);

  if (tracked.length > 0) {
    if (!tracked.every((id) => visibility[id] === false)) return false;
  } else if (hooks.size > 0) {
    if (![...hooks].every(isChromeHook)) return false;
  } else {
    return isSpacerLike(container);
  }

  for (const img of container.querySelectorAll('img')) {
    if (!isInsideCollapsed(img, container.parentElement)) return false;
  }

  return true;
}

function hideAdjacentSpacers(container: HTMLElement): number {
  let count = 0;
  let next = container.nextElementSibling;
  while (next && isSpacerLike(next)) {
    if (!isCollapsed(next)) {
      setTargetVisibility(next as HTMLElement, false);
      count += 1;
    }
    next = next.nextElementSibling;
  }
  return count;
}

/**
 * After individual cards/fields are hidden, collapse parent rows/tables that now
 * contain only hidden content (grid margins, section padding, spacer blocks).
 */
function applyFullyHiddenAncestorCollapse(
  doc: Document,
  visibility: Record<string, boolean>,
): number {
  const hiddenIds = Object.entries(visibility)
    .filter(([, visible]) => !visible)
    .map(([id]) => id);
  if (hiddenIds.length === 0) return 0;

  const candidates = new Set<HTMLElement>();
  for (const id of hiddenIds) {
    const seed = doc.querySelector(`[data-element="${id}"]`);
    if (!seed) continue;
    let node: Element | null = seed.parentElement;
    while (node && node.tagName !== 'BODY' && node.tagName !== 'HTML') {
      if (LAYOUT_TAGS.has(node.tagName)) candidates.add(node as HTMLElement);
      node = node.parentElement;
    }
  }

  const ordered = [...candidates].sort((a, b) => getDepth(a) - getDepth(b));
  let count = 0;

  for (const container of ordered) {
    if (isCollapsed(container)) continue;
    if (!isFullyHiddenContainer(container, visibility)) continue;

    setTargetVisibility(container, false);
    count += 1;
    count += hideAdjacentSpacers(container);
  }

  return count;
}

/** Pick the layout node to hide so spacing collapses cleanly in table-based email HTML. */
export function resolveContentHideTarget(el: Element): HTMLElement {
  const hook = el.getAttribute('data-element') ?? '';

  // Climb to the outermost exclusive layout wrapper (row/table/padding cell).
  let best: HTMLElement = el as HTMLElement;
  let node: Element | null = el.parentElement;

  while (node && node.tagName !== 'BODY' && node.tagName !== 'HTML') {
    if (LAYOUT_TAGS.has(node.tagName)) {
      if (containerOnlyHasRelatedHooks(node, hook)) {
        best = node as HTMLElement;
      } else {
        break;
      }
    }
    node = node.parentElement;
  }

  // If the CTA anchor lives in a button TD, prefer climbing from that TD when needed.
  if ((hook.includes('cta') || hook.endsWith('-cta')) && !hook.endsWith('-button')) {
    const anchor = el.tagName === 'A' ? el : el.querySelector('a');
    const buttonTd = anchor ? findButtonTd(anchor) : findButtonTd(el);
    if (buttonTd && !best.contains(buttonTd) && buttonTd.contains(best)) {
      let ctaBest: HTMLElement = buttonTd;
      let ctaNode: Element | null = buttonTd.parentElement;
      while (ctaNode && ctaNode.tagName !== 'BODY') {
        if (LAYOUT_TAGS.has(ctaNode.tagName)) {
          if (containerOnlyHasRelatedHooks(ctaNode, hook)) ctaBest = ctaNode as HTMLElement;
          else break;
        }
        ctaNode = ctaNode.parentElement;
      }
      best = ctaBest;
    }
  }

  return best;
}

export function isContentHidden(el: Element): boolean {
  let node: Element | null = el;
  while (node) {
    if (node.getAttribute(CONTENT_HIDDEN_ATTR) === 'true' || isDisplayNone(node)) {
      return true;
    }
    node = node.parentElement;
  }

  const target = resolveContentHideTarget(el);
  if (target !== el && (target.getAttribute(CONTENT_HIDDEN_ATTR) === 'true' || isDisplayNone(target))) {
    return true;
  }

  return false;
}

export function applyContentVisibility(el: Element, visible: boolean): void {
  const target = resolveContentHideTarget(el);
  el.setAttribute(CONTENT_HIDDEN_ATTR, visible ? 'false' : 'true');

  if (visible) {
    setTargetVisibility(target, true);
    if (target !== el && el.getAttribute(CONTENT_HIDDEN_ATTR) === 'false') {
      // Ensure the hooked node itself is not left collapsed from an earlier pass.
      if (el.hasAttribute(CONTENT_PREV_STYLE_ATTR)) {
        setTargetVisibility(el as HTMLElement, true);
      } else {
        removeStylePropertiesFromElement(el, ['display'], { allowStructural: true });
      }
    }
    return;
  }

  setTargetVisibility(target, false);
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

  count += applyIndexedBlockCollapse(doc, visibility);
  count += applyProductCardCollapse(doc, visibility);
  count += applyFullyHiddenAncestorCollapse(doc, visibility);

  return count;
}

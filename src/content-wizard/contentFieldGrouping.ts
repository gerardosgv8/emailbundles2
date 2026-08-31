import type { ContentFieldDef } from './types';

const PRODUCT_BLOCK_PREFIX = /^(arrival|product|deal|topic|quick|grid-product)-(\d+)-/;

export type ProductFieldBlock = {
  id: string;
  title: string;
  fields: ContentFieldDef[];
};

export type SectionFieldLayout =
  | { kind: 'flat'; fields: ContentFieldDef[] }
  | { kind: 'product-blocks'; lead: ContentFieldDef[]; blocks: ProductFieldBlock[] };

function blockTitle(prefix: string, index: string): string {
  switch (prefix) {
    case 'arrival':
    case 'product':
    case 'grid-product':
      return `Product ${index}`;
    case 'deal':
      return `Deal ${index}`;
    case 'topic':
      return `Topic ${index}`;
    case 'quick':
      return `Quick pick ${index}`;
    default:
      return `Item ${index}`;
  }
}

function fieldSortRank(field: ContentFieldDef): number {
  if (field.kind === 'image') return 0;
  if (field.kind === 'text') return 1;
  if (field.kind === 'rich') return 2;
  if (field.kind === 'cta' || field.kind === 'link') return 3;
  return 4;
}

/** Group catalog grid rows (arrival/product/deal/topic) into labeled blocks with image fields first. */
export function layoutSectionFields(sectionTitle: string, fields: ContentFieldDef[]): SectionFieldLayout {
  if (sectionTitle !== 'Products') {
    return { kind: 'flat', fields };
  }

  const lead: ContentFieldDef[] = [];
  const blockMap = new Map<string, ContentFieldDef[]>();
  const blockOrder: string[] = [];

  for (const field of fields) {
    const match = field.id.match(PRODUCT_BLOCK_PREFIX);
    if (!match) {
      lead.push(field);
      continue;
    }

    const key = `${match[1]}-${match[2]}`;
    if (!blockMap.has(key)) {
      blockMap.set(key, []);
      blockOrder.push(key);
    }
    blockMap.get(key)!.push(field);
  }

  if (blockOrder.length === 0) {
    return { kind: 'flat', fields };
  }

  const blocks = blockOrder.map((key) => {
    const [prefix, index] = key.split('-');
    const blockFields = [...(blockMap.get(key) ?? [])].sort(
      (a, b) => fieldSortRank(a) - fieldSortRank(b),
    );
    return {
      id: key,
      title: blockTitle(prefix, index),
      fields: blockFields,
    };
  });

  return { kind: 'product-blocks', lead, blocks };
}

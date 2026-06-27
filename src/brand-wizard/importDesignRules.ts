import type { DesignRulesField, DesignRulesState } from './types';

export type ImportDesignRulesResult = {
  partial: Partial<Omit<DesignRulesState, 'checklist'>>;
  checklist?: boolean[];
  stats: {
    fieldsMatched: number;
    fieldsSkipped: string[];
    warnings: string[];
  };
};

type ImportableField = Exclude<DesignRulesField, 'checklist'>;

const FIELD_LABELS: Record<string, ImportableField> = {
  'brand / company name': 'brandName',
  'legal entity name': 'legalName',
  'short tagline': 'tagline',
  'footer trust line': 'footerTrustLine',
  'copyright line': 'copyrightNote',
  'default "from" name': 'fromName',
  'default reply-to email': 'replyToEmail',
  'logo url': 'logoUrl',
  'logo alt text': 'logoAlt',
  'display width': 'logoWidth',
  'display height': 'logoHeight',
  'logo url (dark background)': 'logoDarkUrl',
  'favicon / small mark url': 'faviconUrl',
  'company name': 'footerCompany',
  'address line 1': 'footerAddress1',
  'address line 2': 'footerAddress2',
  country: 'footerCountry',
  'support email': 'footerEmail',
  'support phone': 'footerPhone',
  'footer tagline': 'footerTagline',
  'footer text color': 'footerTextColor',
  'footer heading color': 'footerHeadingColor',
  'footer link color': 'footerLinkColor',
  'font stack': 'fontStack',
  'custom web font url': 'fontCustomUrl',
  'custom web font name': 'fontCustomName',
  'email max width': 'layoutMaxWidth',
  'outer padding': 'layoutOuterPadding',
  'section padding': 'layoutSectionPadding',
  'content horizontal padding': 'layoutHorizontalPadding',
  'standard vertical spacer': 'layoutSpacerStandard',
  'large vertical spacer': 'layoutSpacerLarge',
  'border radius: buttons and cards': 'layoutRadiusButtons',
  'border radius: hero product image': 'layoutRadiusHero',
  'border radius: grid product images': 'layoutRadiusGrid',
  'hero image width': 'imgHeroWidth',
  'featured product width': 'imgFeaturedWidth',
  'grid product size': 'imgGridSize',
  'horizontal catalog thumb': 'imgThumbSize',
  'preferred hero aspect': 'imgHeroAspect',
  'default hero image url': 'imgHeroDefault',
  'image cdn / asset base url': 'imgCdnBase',
  'dark mode background override': 'darkBgOverride',
  'dark mode text override': 'darkTextOverride',
  'minimum contrast ratio target': 'contrastTarget',
  'base website url': 'urlBase',
  'quote / contact url': 'urlQuote',
  'support / help url': 'urlSupport',
};

const TOKEN_FIELDS: Record<string, ImportableField> = {
  primary: 'colorPrimary',
  secondary: 'colorSecondary',
  accent: 'colorAccent',
  'heading dark': 'colorHeadingDark',
  'heading alt': 'colorHeadingAlt',
  'header kicker': 'colorHeaderKicker',
  'body text': 'colorBody',
  'body text alt': 'colorBodyAlt',
  'muted / subtitle': 'colorMuted',
  'email background': 'colorBgEmail',
  'section: light gray': 'colorBgLightGray',
  'section: info blue': 'colorBgInfo',
  'section: service blue': 'colorBgService',
  'section: promo dark': 'colorBgPromoDark',
  'section: warning': 'colorBgWarning',
  'section: urgency': 'colorBgUrgency',
  divider: 'colorDivider',
  'footer divider': 'colorFooterDivider',
  'event badge background': 'colorBadgeEventBg',
  'event badge text': 'colorBadgeEventText',
  'step badge background': 'colorBadgeStepBg',
  'step badge text': 'colorBadgeStepText',
  'promo highlight text': 'colorPromoHighlight',
};

const PLATFORM_FIELDS: Record<string, ImportableField> = {
  facebook: 'socialFacebook',
  'x (twitter)': 'socialTwitter',
  twitter: 'socialTwitter',
  instagram: 'socialInstagram',
  linkedin: 'socialLinkedin',
};

const LEGAL_FIELDS: Record<string, ImportableField> = {
  'privacy policy': 'linkPrivacy',
  'terms of service': 'linkTerms',
  'help center': 'linkHelp',
  unsubscribe: 'linkUnsubscribe',
};

const SUBSECTION_ALIASES: Record<string, string> = {
  'primary button': 'primary-btn',
  'secondary button *(outline)*': 'secondary-btn',
  'secondary button': 'secondary-btn',
  'text links *(inline, product cards)*': 'text-links',
  'text links': 'text-links',
  'default cta destination': 'cta-urls',
};

function normalizeLabel(raw: string): string {
  return raw
    .replace(/\*\*/g, '')
    .replace(/\*[^*]*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function normalizeSubsection(raw: string): string {
  return SUBSECTION_ALIASES[normalizeLabel(raw)] ?? normalizeLabel(raw);
}

function parseTableRow(line: string): string[] {
  const trimmed = line.trim();
  if (!trimmed.startsWith('|')) return [];
  return trimmed
    .slice(1, trimmed.endsWith('|') ? -1 : undefined)
    .split('|')
    .map((cell) => cell.trim());
}

function cleanValue(raw: string): string {
  let value = raw.trim();
  if (!value) return '';
  if (/^\*\(/.test(value)) return '';

  const backtickMatch = value.match(/^`(.+)`$/);
  if (backtickMatch) value = backtickMatch[1];

  return value.replace(/\\(\|)/g, '$1').trim();
}

function extractHex(raw: string): string | null {
  const match = raw.match(/#([0-9A-Fa-f]{6})\b/);
  return match ? `#${match[1]}` : null;
}

function assignField(
  partial: Partial<Omit<DesignRulesState, 'checklist'>>,
  field: ImportableField,
  value: string,
): boolean {
  if (!value) return false;
  partial[field] = value as DesignRulesState[ImportableField];
  return true;
}

function resolveButtonField(
  subsection: string,
  label: string,
  rawValue: string,
): { field: ImportableField; value: string } | null {
  if (subsection === 'primary-btn') {
    if (label === 'background') return { field: 'btnPrimaryBg', value: extractHex(rawValue) ?? cleanValue(rawValue) };
    if (label === 'text color') return { field: 'btnPrimaryText', value: extractHex(rawValue) ?? cleanValue(rawValue) };
    if (label === 'border radius') return { field: 'btnPrimaryRadius', value: cleanValue(rawValue) };
    if (label === 'padding') return { field: 'btnPrimaryPadding', value: cleanValue(rawValue) };
  }
  if (subsection === 'secondary-btn') {
    if (label === 'background') return { field: 'btnSecondaryBg', value: extractHex(rawValue) ?? cleanValue(rawValue) };
    if (label === 'text color') return { field: 'btnSecondaryText', value: extractHex(rawValue) ?? cleanValue(rawValue) };
    if (label === 'border') {
      const hex = extractHex(rawValue);
      return hex ? { field: 'btnSecondaryBorder', value: hex } : null;
    }
    if (label === 'border radius') return { field: 'btnPrimaryRadius', value: cleanValue(rawValue) };
    if (label === 'padding') return { field: 'btnPrimaryPadding', value: cleanValue(rawValue) };
  }
  if (subsection === 'text-links' && label === 'color') {
    const hex = extractHex(rawValue) ?? cleanValue(rawValue);
    return hex ? { field: 'linkColor', value: hex } : null;
  }
  if (subsection === 'cta-urls') {
    const field = FIELD_LABELS[label];
    if (field && (field === 'urlBase' || field === 'urlQuote' || field === 'urlSupport')) {
      return { field, value: cleanValue(rawValue) };
    }
  }
  return null;
}

function parseEmbeddedSurfaceColors(
  token: string,
  usage: string,
  partial: Partial<Omit<DesignRulesState, 'checklist'>>,
): number {
  let count = 0;
  const hexes = [...usage.matchAll(/#([0-9A-Fa-f]{6})/g)].map((m) => `#${m[1]}`);

  if (token === 'section: service blue' && hexes[0]) {
    if (assignField(partial, 'colorBgServiceBorder', hexes[0])) count += 1;
  }
  if (token === 'section: warning') {
    if (hexes[0] && assignField(partial, 'colorBgWarningBorder', hexes[0])) count += 1;
    if (hexes[1] && assignField(partial, 'colorBgWarningText', hexes[1])) count += 1;
  }
  if (token === 'section: urgency') {
    if (hexes[0] && assignField(partial, 'colorBgUrgencyBorder', hexes[0])) count += 1;
    if (hexes[1] && assignField(partial, 'colorBgUrgencyText', hexes[1])) count += 1;
  }

  return count;
}

export function importDesignRules(markdown: string): ImportDesignRulesResult {
  const partial: Partial<Omit<DesignRulesState, 'checklist'>> = {};
  const skipped: string[] = [];
  const warnings: string[] = [];
  let fieldsMatched = 0;
  let checklist: boolean[] | undefined;

  let subsection = '';
  const seenSkipped = new Set<string>();

  for (const line of markdown.split(/\r?\n/)) {
    if (line.startsWith('### ')) {
      subsection = normalizeSubsection(line.slice(4));
      continue;
    }

    const checklistMatch = line.match(/^- \[([ xX])\]\s+/);
    if (checklistMatch) {
      checklist = checklist ?? [];
      checklist.push(checklistMatch[1].toLowerCase() === 'x');
      continue;
    }

    if (!line.trim().startsWith('|') || /^\|\s*-+\s*\|/.test(line)) continue;

    const cells = parseTableRow(line);
    if (cells.length < 2) continue;

    const label = normalizeLabel(cells[0]);
    if (['field', 'token', 'platform', 'link', 'hex', 'value', 'usage', 'url'].includes(label)) {
      continue;
    }

    if (cells.length >= 3) {
      const token = label;
      const hex = extractHex(cells[1]) ?? cleanValue(cells[1]);
      const usage = cells[2] ?? '';
      const field = TOKEN_FIELDS[token];

      if (field && hex && assignField(partial, field, hex)) {
        fieldsMatched += 1;
      }
      fieldsMatched += parseEmbeddedSurfaceColors(token, usage, partial);

      if (!field && token && !seenSkipped.has(token)) {
        seenSkipped.add(token);
        skipped.push(token);
      }
      continue;
    }

    const rawValue = cells[1];
    const value = cleanValue(rawValue);
    const buttonField = resolveButtonField(subsection, label, rawValue);
    if (buttonField && assignField(partial, buttonField.field, buttonField.value)) {
      fieldsMatched += 1;
      continue;
    }

    if (label === 'decoration' || label === 'font size' || label === 'font weight') {
      continue;
    }

    if (PLATFORM_FIELDS[label]) {
      if (assignField(partial, PLATFORM_FIELDS[label], value)) fieldsMatched += 1;
      continue;
    }

    if (LEGAL_FIELDS[label]) {
      if (assignField(partial, LEGAL_FIELDS[label], value)) fieldsMatched += 1;
      continue;
    }

    const field = FIELD_LABELS[label];
    if (field) {
      if (assignField(partial, field, value)) fieldsMatched += 1;
      continue;
    }

    if (label && !seenSkipped.has(label)) {
      seenSkipped.add(label);
      skipped.push(label);
    }
  }

  if (fieldsMatched === 0) {
    warnings.push('No recognizable design tokens were found. Use a DESIGN_RULES.md exported from Mailcraft Studio.');
  } else if (skipped.length > 0) {
    warnings.push(`${skipped.length} table row${skipped.length === 1 ? '' : 's'} could not be mapped (template notes and reference sections are ignored).`);
  }

  return { partial, checklist, stats: { fieldsMatched, fieldsSkipped: skipped, warnings } };
}

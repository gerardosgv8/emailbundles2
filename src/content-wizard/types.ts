export type ContentFieldKind = 'text' | 'rich' | 'cta' | 'link' | 'image';

export type CtaContentValue = {
  text: string;
  href: string;
};

export type LinkContentValue = {
  text: string;
  href: string;
};

export type ImageContentValue = {
  src: string;
  alt: string;
};

export type ContentFieldValue = string | CtaContentValue | LinkContentValue | ImageContentValue;

/** Field copy keyed by data-element id. */
export type TemplateContentState = Record<string, ContentFieldValue>;

/** true = shown in exported email (default). */
export type TemplateVisibilityState = Record<string, boolean>;

export type TemplateContentStore = {
  values: TemplateContentState;
  visibility: TemplateVisibilityState;
};

export type ContentFieldDef = {
  id: string;
  kind: ContentFieldKind;
  label: string;
  section: string;
  profile: string;
};

export type ContentSection = {
  id: string;
  title: string;
  fields: ContentFieldDef[];
};

export type ContentApplyReport = {
  templateFile: string;
  updateCount: number;
  touchedElements: string[];
};

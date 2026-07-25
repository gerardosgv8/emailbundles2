import type { ContentFieldDef, ContentFieldValue, TemplateContentState, TemplateVisibilityState } from '../types';

type Props = {
  field: ContentFieldDef;
  value: ContentFieldValue;
  visible: boolean;
  onChange: (fieldId: string, value: ContentFieldValue) => void;
  onVisibleChange: (fieldId: string, visible: boolean) => void;
};

function stringValue(value: ContentFieldValue): string {
  return typeof value === 'string' ? value : '';
}

function ctaValue(value: ContentFieldValue): { text: string; href: string } {
  if (typeof value === 'object' && value !== null && 'text' in value && 'href' in value) {
    return value;
  }
  return { text: '', href: '' };
}

function imageValue(value: ContentFieldValue): { src: string; alt: string } {
  if (typeof value === 'object' && value !== null && 'src' in value && 'alt' in value) {
    return value;
  }
  return { src: '', alt: '' };
}

function FieldVisibilityToggle({
  fieldId,
  visible,
  onVisibleChange,
}: {
  fieldId: string;
  visible: boolean;
  onVisibleChange: (fieldId: string, visible: boolean) => void;
}) {
  return (
    <label className="content-visibility-toggle" htmlFor={`${fieldId}-visible`}>
      <input
        id={`${fieldId}-visible`}
        type="checkbox"
        checked={visible}
        onChange={(e) => onVisibleChange(fieldId, e.target.checked)}
      />
      <span>{visible ? 'Shown in email' : 'Hidden in email'}</span>
    </label>
  );
}

export function ContentFieldInput({ field, value, visible, onChange, onVisibleChange }: Props) {
  const hiddenClass = visible ? '' : ' content-field--hidden';

  if (field.kind === 'cta' || field.kind === 'link') {
    const v = ctaValue(value);
    return (
      <div className={`content-field content-field--cta${hiddenClass}`}>
        <div className="content-field-head">
          <label>{field.label}</label>
          <FieldVisibilityToggle fieldId={field.id} visible={visible} onVisibleChange={onVisibleChange} />
        </div>
        <div className="field-grid">
          <div className="field full">
            <label htmlFor={`${field.id}-text`}>Label</label>
            <input
              id={`${field.id}-text`}
              type="text"
              value={v.text}
              placeholder="Button or link text"
              onChange={(e) => onChange(field.id, { ...v, text: e.target.value })}
            />
          </div>
          <div className="field full">
            <label htmlFor={`${field.id}-href`}>URL</label>
            <input
              id={`${field.id}-href`}
              type="url"
              value={v.href}
              placeholder="https://"
              onChange={(e) => onChange(field.id, { ...v, href: e.target.value })}
            />
          </div>
        </div>
      </div>
    );
  }

  if (field.kind === 'image') {
    const v = imageValue(value);
    return (
      <div className={`content-field content-field--image${hiddenClass}`}>
        <div className="content-field-head">
          <label>{field.label}</label>
          <FieldVisibilityToggle fieldId={field.id} visible={visible} onVisibleChange={onVisibleChange} />
        </div>
        <div className="field-grid">
          <div className="field full">
            <label htmlFor={`${field.id}-src`}>Image URL</label>
            <input
              id={`${field.id}-src`}
              type="url"
              value={v.src}
              placeholder="https://"
              onChange={(e) => onChange(field.id, { ...v, src: e.target.value })}
            />
          </div>
          <div className="field full">
            <label htmlFor={`${field.id}-alt`}>Alt text</label>
            <input
              id={`${field.id}-alt`}
              type="text"
              value={v.alt}
              placeholder="Describe the image"
              onChange={(e) => onChange(field.id, { ...v, alt: e.target.value })}
            />
          </div>
        </div>
      </div>
    );
  }

  const isRich = field.kind === 'rich';

  return (
    <div className={`content-field${isRich ? ' content-field--rich' : ''}${hiddenClass}`}>
      <div className="content-field-head">
        <label htmlFor={field.id}>
          {field.label}
          {isRich ? <span className="hint"> HTML allowed (e.g. &lt;strong&gt;)</span> : null}
        </label>
        <FieldVisibilityToggle fieldId={field.id} visible={visible} onVisibleChange={onVisibleChange} />
      </div>
      {isRich ? (
        <textarea
          id={field.id}
          rows={4}
          value={stringValue(value)}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      ) : (
        <input
          id={field.id}
          type="text"
          value={stringValue(value)}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )}
    </div>
  );
}

function defaultValue(field: ContentFieldDef): ContentFieldValue {
  if (field.kind === 'text' || field.kind === 'rich') return '';
  if (field.kind === 'image') return { src: '', alt: '' };
  return { text: '', href: '' };
}

export function ContentSectionCard({
  title,
  fields,
  values,
  visibility,
  onChange,
  onVisibleChange,
}: {
  title: string;
  fields: ContentFieldDef[];
  values: TemplateContentState;
  visibility: TemplateVisibilityState;
  onChange: (fieldId: string, value: ContentFieldValue) => void;
  onVisibleChange: (fieldId: string, visible: boolean) => void;
}) {
  if (fields.length === 0) return null;

  return (
    <div className="w-card content-section-card">
      <h3>{title}</h3>
      <div className="content-field-list">
        {fields.map((field) => (
          <ContentFieldInput
            key={field.id}
            field={field}
            value={values[field.id] ?? defaultValue(field)}
            visible={visibility[field.id] ?? true}
            onChange={onChange}
            onVisibleChange={onVisibleChange}
          />
        ))}
      </div>
    </div>
  );
}

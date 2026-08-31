import type { ContentFieldDef, ContentFieldValue, TemplateContentState, TemplateVisibilityState } from '../types';
import { layoutSectionFields } from '../contentFieldGrouping';

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

function imageValue(value: ContentFieldValue): { src: string; alt: string; href: string } {
  if (typeof value === 'object' && value !== null && 'src' in value && 'alt' in value) {
    return {
      src: value.src,
      alt: value.alt,
      href: 'href' in value ? value.href : '',
    };
  }
  return { src: '', alt: '', href: '' };
}

function labelValue(value: ContentFieldValue): { label: string; value: string } {
  if (typeof value === 'object' && value !== null && 'label' in value && 'value' in value) {
    return value;
  }
  return { label: '', value: '' };
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
  const inputId = `${fieldId}-visible`;

  return (
    <label
      className={`content-visibility-toggle${visible ? ' is-on' : ' is-off'}`}
      htmlFor={inputId}
    >
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        checked={visible}
        aria-checked={visible}
        onChange={(e) => onVisibleChange(fieldId, e.target.checked)}
      />
      <span className="content-visibility-switch" aria-hidden="true">
        <span className="content-visibility-switch-thumb" />
      </span>
      <span className="content-visibility-label">{visible ? 'Shown in email' : 'Hidden in email'}</span>
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
          <div className="field full">
            <label htmlFor={`${field.id}-href`}>Link URL</label>
            <input
              id={`${field.id}-href`}
              type="url"
              value={v.href}
              placeholder="https:// (opens when the image is clicked)"
              onChange={(e) => onChange(field.id, { ...v, href: e.target.value })}
            />
          </div>
        </div>
      </div>
    );
  }

  if (field.kind === 'labelValue') {
    const v = labelValue(value);
    return (
      <div className={`content-field content-field--label-value${hiddenClass}`}>
        <div className="content-field-head">
          <label>{field.label}</label>
          <FieldVisibilityToggle fieldId={field.id} visible={visible} onVisibleChange={onVisibleChange} />
        </div>
        <div className="field-grid">
          <div className="field full">
            <label htmlFor={`${field.id}-label`}>Label</label>
            <input
              id={`${field.id}-label`}
              type="text"
              value={v.label}
              placeholder="Subtotal:"
              onChange={(e) => onChange(field.id, { ...v, label: e.target.value })}
            />
          </div>
          <div className="field full">
            <label htmlFor={`${field.id}-value`}>Value</label>
            <input
              id={`${field.id}-value`}
              type="text"
              value={v.value}
              placeholder="$0.00"
              onChange={(e) => onChange(field.id, { ...v, value: e.target.value })}
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
  if (field.kind === 'image') return { src: '', alt: '', href: '' };
  if (field.kind === 'labelValue') return { label: '', value: '' };
  return { text: '', href: '' };
}

export function ContentSectionCard({
  title,
  fields,
  values,
  visibility,
  onChange,
  onVisibleChange,
  warning,
}: {
  title: string;
  fields: ContentFieldDef[];
  values: TemplateContentState;
  visibility: TemplateVisibilityState;
  onChange: (fieldId: string, value: ContentFieldValue) => void;
  onVisibleChange: (fieldId: string, visible: boolean) => void;
  warning?: string;
}) {
  if (fields.length === 0) return null;

  const layout = layoutSectionFields(title, fields);

  const renderField = (field: ContentFieldDef) => (
    <ContentFieldInput
      key={field.id}
      field={field}
      value={values[field.id] ?? defaultValue(field)}
      visible={visibility[field.id] ?? true}
      onChange={onChange}
      onVisibleChange={onVisibleChange}
    />
  );

  return (
    <div className="w-card content-section-card">
      <h3>{title}</h3>
      {warning ? <p className="content-section-warning">{warning}</p> : null}
      <div className="content-field-list">
        {layout.kind === 'flat' ? (
          layout.fields.map(renderField)
        ) : (
          <>
            {layout.lead.map(renderField)}
            {layout.blocks.map((block) => (
              <div key={block.id} className="content-product-block">
                <h4 className="content-product-block-title">{block.title}</h4>
                <div className="content-product-block-fields">{block.fields.map(renderField)}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

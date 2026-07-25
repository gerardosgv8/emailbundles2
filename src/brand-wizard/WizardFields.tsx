import type { ReactNode } from 'react';
import { TemplateRef } from './components/TemplateRef';
import type { DesignRulesField, DesignRulesState } from '../brand-wizard/types';

interface TextFieldProps {
  bundleId: string;
  fieldKey: DesignRulesField;
  label: string;
  hint?: string;
  usage?: string;
  templates?: string;
  full?: boolean;
  type?: 'text' | 'email' | 'url';
  placeholder?: string;
  value: string;
  onChange: (key: DesignRulesField, value: string) => void;
}

export function TextField({
  bundleId,
  fieldKey,
  label,
  hint,
  usage,
  templates,
  full,
  type = 'text',
  placeholder,
  value,
  onChange,
}: TextFieldProps) {
  return (
    <div className={`field${full ? ' full' : ''}`}>
      <label htmlFor={fieldKey}>
        {label}
        {hint ? <span className="hint"> {hint}</span> : null}
      </label>
      {usage ? <p className="field-usage">{usage}</p> : null}
      {templates ? <TemplateRef bundleId={bundleId} templates={templates} /> : null}
      <input
        id={fieldKey}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(fieldKey, e.target.value)}
      />
    </div>
  );
}

interface ColorFieldProps {
  bundleId: string;
  fieldKey: DesignRulesField;
  label: string;
  usage?: string;
  templates?: string;
  value: string;
  onChange: (key: DesignRulesField, value: string) => void;
}

export function ColorField({ bundleId, fieldKey, label, usage, templates, value, onChange }: ColorFieldProps) {
  const normalized = value || '#000000';

  const handleColor = (hex: string) => {
    onChange(fieldKey, hex);
  };

  const handleHex = (raw: string) => {
    let hex = raw.startsWith('#') ? raw : `#${raw}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      onChange(fieldKey, hex);
    } else {
      onChange(fieldKey, raw);
    }
  };

  return (
    <div className="color-token">
      <div className="color-token-info">
        <strong>{label}</strong>
        {usage ? <small>{usage}</small> : null}
        {templates ? <TemplateRef bundleId={bundleId} templates={templates} className="field-template-ref field-template-ref--compact" /> : null}
      </div>
      <div className="color-row">
        <input
          type="color"
          value={normalized.length === 7 ? normalized : '#000000'}
          onChange={(e) => handleColor(e.target.value)}
        />
        <input
          type="text"
          value={value}
          maxLength={7}
          aria-label={`${label} hex value`}
          onChange={(e) => handleHex(e.target.value)}
        />
      </div>
    </div>
  );
}

interface WizardCardProps {
  title: string;
  children: ReactNode;
}

export function WizardCard({ title, children }: WizardCardProps) {
  return (
    <div className="w-card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export type SetField = <K extends DesignRulesField>(key: K, value: DesignRulesState[K]) => void;

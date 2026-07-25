import { useState } from 'react';
import { parseTemplateReference } from '../parseTemplateReference';
import {
  getTemplatePreviewImageUrl,
  isTemplatePreviewBundle,
  type TemplatePreviewBundleId,
} from '../templatePreviewCatalog';
import { TemplatePreviewModal } from './TemplatePreviewModal';

type Props = {
  bundleId: string;
  templates: string;
  className?: string;
};

export function TemplateRef({ bundleId, templates, className = 'field-template-ref' }: Props) {
  const [preview, setPreview] = useState<{ title: string; imageUrl: string } | null>(null);

  if (!templates) return null;

  const segments = parseTemplateReference(bundleId, templates);
  const canPreview = isTemplatePreviewBundle(bundleId);

  const openPreview = (key: string, label: string) => {
    if (!canPreview) return;
    const imageUrl = getTemplatePreviewImageUrl(bundleId as TemplatePreviewBundleId, key);
    if (!imageUrl) return;
    setPreview({ title: label, imageUrl });
  };

  return (
    <>
      <p className={className}>
        <span className="field-template-ref-label">Template:</span>{' '}
        {segments.map((segment, index) => {
          if (segment.type === 'text') {
            return <span key={`text-${index}`}>{segment.value}</span>;
          }

          if (!canPreview) {
            return <span key={`template-${index}`}>{segment.label}</span>;
          }

          return (
            <button
              key={`template-${index}`}
              type="button"
              className="template-ref-link"
              onClick={() => openPreview(segment.key, segment.label)}
            >
              {segment.label}
            </button>
          );
        })}
      </p>

      {preview ? (
        <TemplatePreviewModal
          open
          title={preview.title}
          imageUrl={preview.imageUrl}
          onClose={() => setPreview(null)}
        />
      ) : null}
    </>
  );
}

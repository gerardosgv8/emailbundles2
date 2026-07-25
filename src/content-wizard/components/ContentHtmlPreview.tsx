import { useMemo, useState } from 'react';
import { applyContentToHtml } from '../applyContentToHtml';
import { ContentPreviewModal } from './ContentPreviewModal';
import type { TemplateContentState, TemplateVisibilityState } from '../types';

type Props = {
  sourceHtml: string | null;
  bundleId: string;
  templateFile: string;
  templateName: string;
  values: TemplateContentState;
  visibility: TemplateVisibilityState;
};

export function ContentHtmlPreview({
  sourceHtml,
  bundleId,
  templateFile,
  templateName,
  values,
  visibility,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const previewHtml = useMemo(() => {
    if (!sourceHtml) return null;
    try {
      return applyContentToHtml(sourceHtml, values, bundleId, templateFile, visibility).html;
    } catch {
      return null;
    }
  }, [sourceHtml, values, visibility, bundleId, templateFile]);

  return (
    <>
      <div className="w-card content-html-preview">
        <h3>Live preview</h3>
        <p className="card-note content-preview-note">
          {previewHtml
            ? 'Open a full-size preview with your latest edits applied.'
            : 'Upload your template HTML above to enable preview.'}
        </p>

        {previewHtml ? (
          <button
            type="button"
            className="content-preview-open-btn"
            onClick={() => setModalOpen(true)}
          >
            <span className="content-preview-open-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            <span className="content-preview-open-label">View live preview</span>
            <span className="content-preview-open-hint">{templateName}</span>
          </button>
        ) : (
          <div className="content-preview-placeholder" aria-hidden="true">
            <span>No preview yet</span>
          </div>
        )}
      </div>

      {previewHtml ? (
        <ContentPreviewModal
          open={modalOpen}
          title={`${templateName} preview`}
          previewHtml={previewHtml}
          onClose={() => setModalOpen(false)}
        />
      ) : null}
    </>
  );
}

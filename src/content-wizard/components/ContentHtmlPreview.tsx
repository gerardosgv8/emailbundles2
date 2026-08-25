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
        <div className="content-preview-head">
          <div>
            <h3>Live preview</h3>
            <p className="card-note content-preview-note">
              {previewHtml
                ? 'Updates as you edit fields. Expand for a larger view.'
                : 'Upload your template HTML above to enable preview.'}
            </p>
          </div>
          {previewHtml ? (
            <button
              type="button"
              className="w-btn content-preview-expand-btn"
              onClick={() => setModalOpen(true)}
            >
              Expand
            </button>
          ) : null}
        </div>

        {previewHtml ? (
          <div className="content-preview-live">
            <iframe
              title={`${templateName} live preview`}
              className="content-preview-live-frame"
              sandbox="allow-same-origin"
              srcDoc={previewHtml}
            />
          </div>
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

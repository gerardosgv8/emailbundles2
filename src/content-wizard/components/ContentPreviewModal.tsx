import { useEffect, useId, useRef } from 'react';

type Props = {
  open: boolean;
  title: string;
  previewHtml: string;
  onClose: () => void;
};

export function ContentPreviewModal({ open, title, previewHtml, onClose }: Props) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="wizard-modal-root content-preview-modal-root" role="presentation" onClick={onClose}>
      <div
        className="wizard-modal content-preview-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="content-preview-modal-head">
          <h2 id={titleId} className="wizard-modal-title content-preview-modal-title">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="content-preview-modal-close"
            aria-label="Close preview"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <p className="content-preview-modal-note">Scroll vertically to review the full email.</p>

        <div className="content-preview-modal-body">
          <iframe
            title={title}
            className="content-preview-modal-frame"
            sandbox="allow-same-origin"
            srcDoc={previewHtml}
          />
        </div>
      </div>
    </div>
  );
}

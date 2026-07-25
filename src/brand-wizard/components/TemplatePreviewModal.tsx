import { useEffect, useId, useRef } from 'react';

type Props = {
  open: boolean;
  title: string;
  imageUrl: string;
  onClose: () => void;
};

export function TemplatePreviewModal({ open, title, imageUrl, onClose }: Props) {
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
    <div className="wizard-modal-root template-preview-modal-root" role="presentation" onClick={onClose}>
      <div
        className="wizard-modal template-preview-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="template-preview-modal-head">
          <h2 id={titleId} className="wizard-modal-title template-preview-modal-title">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="template-preview-modal-close"
            aria-label="Close preview"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <p className="template-preview-modal-note">Scroll to review the full template layout.</p>

        <div className="template-preview-modal-body">
          <img src={imageUrl} alt={`${title} email template preview`} className="template-preview-modal-image" />
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { applyContentToHtml } from '../applyContentToHtml';
import { matchTemplateFileFromUploadName } from '../bundleContentConfig';
import { detectTemplateFileFromHtml, extractContentFromHtml } from '../extractContentFromHtml';
import { downloadFilledTemplate } from '../exportContentJson';
import type { ContentApplyReport, TemplateContentState, TemplateVisibilityState } from '../types';

type Props = {
  bundleId: string;
  templateFile: string;
  values: TemplateContentState;
  visibility: TemplateVisibilityState;
  sourceHtml: string | null;
  uploadName: string | null;
  onSourceHtmlChange: (html: string | null, uploadName?: string | null) => void;
  onExtracted: (values: TemplateContentState, visibility: TemplateVisibilityState) => void;
};

export function ContentApplyPanel({
  bundleId,
  templateFile,
  values,
  visibility,
  sourceHtml,
  uploadName,
  onSourceHtmlChange,
  onExtracted,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ContentApplyReport | null>(null);

  useEffect(() => {
    setError(null);
    setReport(null);
    setDragging(false);
    if (inputRef.current) inputRef.current.value = '';
  }, [templateFile]);

  const hiddenCount = Object.values(visibility).filter((visible) => !visible).length;

  const readFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setReport(null);

    const lower = file.name.toLowerCase();
    if (!lower.endsWith('.html') && !lower.endsWith('.htm')) {
      setError('Upload an .html template from your bundle.');
      return;
    }

    setBusy(true);
    try {
      const html = await file.text();
      const matchedByName = matchTemplateFileFromUploadName(bundleId, file.name);
      const matchedByHooks = detectTemplateFileFromHtml(html, bundleId);
      const resolved = matchedByName ?? matchedByHooks;

      if (resolved && resolved !== templateFile) {
        setError(
          `This file looks like "${resolved}". Switch to that template in the sidebar, or upload ${templateFile}.`,
        );
        return;
      }

      if (!resolved) {
        setError(`Could not match this file to ${templateFile}. Upload the correct template HTML.`);
        return;
      }

      const extracted = extractContentFromHtml(html, bundleId, templateFile);
      onSourceHtmlChange(html, file.name);
      onExtracted(extracted.values, extracted.visibility);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not read the template file.');
    } finally {
      setBusy(false);
    }
  };

  const handleDownload = () => {
    if (!sourceHtml) {
      setError('Upload your template HTML first so Mailcraft can merge your copy into it.');
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const { html, report: applyReport } = applyContentToHtml(
        sourceHtml,
        values,
        bundleId,
        templateFile,
        visibility,
      );
      setReport(applyReport);
      downloadFilledTemplate({ html, templateFile });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not generate download.');
    } finally {
      setBusy(false);
    }
  };

  const compact = Boolean(sourceHtml);

  return (
    <div
      className={`w-card apply-bundle-panel content-apply-panel${compact ? ' content-apply-panel--compact' : ''}`}
    >
      {!compact ? (
        <>
          <h3>Apply &amp; download</h3>
          <p className="card-note">
            Upload the matching <code>{templateFile}</code> from your bundle. Hidden elements export with{' '}
            <code>display: none</code> on their layout row or cell so spacing collapses.
          </p>
        </>
      ) : null}

      <div
        className={`apply-bundle-dropzone${dragging ? ' apply-bundle-dropzone--active' : ''}${uploadName ? ' apply-bundle-dropzone--filled' : ''}${compact ? ' apply-bundle-dropzone--compact' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void readFile(e.dataTransfer.files?.[0]);
        }}
      >
        {compact ? (
          <button
            type="button"
            className="content-apply-replace-btn"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            title={uploadName ?? templateFile}
          >
            Replace file
          </button>
        ) : uploadName ? (
          <>
            <span>Loaded</span>
            <strong title={uploadName}>{uploadName}</strong>
          </>
        ) : (
          <p>Drop template .html here</p>
        )}
        {!compact ? (
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => inputRef.current?.click()} disabled={busy}>
            Browse file
          </button>
        ) : null}
        <input
          ref={inputRef}
          type="file"
          accept=".html,.htm,text/html"
          hidden
          onChange={(e) => void readFile(e.target.files?.[0])}
        />
      </div>

      {!compact && hiddenCount > 0 ? (
        <p className="card-note content-hidden-note">
          {hiddenCount} element{hiddenCount === 1 ? '' : 's'} will be hidden in the exported email.
        </p>
      ) : null}

      <div className="content-apply-actions">
        <button type="button" className="btn btn-primary" onClick={handleDownload} disabled={busy || !sourceHtml}>
          Download filled .html
        </button>
      </div>

      {error ? <p className="apply-bundle-error">{error}</p> : null}
      {!compact && report ? (
        <p className="apply-bundle-success">
          Updated {report.updateCount} element{report.updateCount === 1 ? '' : 's'} across{' '}
          {report.touchedElements.length} hook{report.touchedElements.length === 1 ? '' : 's'}.
        </p>
      ) : null}
    </div>
  );
}

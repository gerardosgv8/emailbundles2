import { useCallback, useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import type { DesignRulesState } from '../types';
import { applyBrandToUpload, downloadBrandedBundle, type ApplyBundleResult } from '../apply/applyBrandToBundle';
import { isBrandApplyBundle } from '../apply/applyBrandToHtml';

const ACCEPTED_EXTENSIONS = ['.html', '.htm', '.zip'];

type Props = {
  state: DesignRulesState;
  bundleId: string;
};

function isAcceptedFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));
}

export function ApplyBundlePanel({ state, bundleId }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApplyBundleResult | null>(null);

  const selectFile = useCallback((file: File | undefined) => {
    if (!file) return;
    if (!isAcceptedFile(file)) {
      setSelectedFile(null);
      setResult(null);
      setError('Use a .html template or .zip bundle.');
      return;
    }
    setSelectedFile(file);
    setResult(null);
    setError(null);
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    selectFile(event.target.files?.[0]);
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    setDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    selectFile(event.dataTransfer.files?.[0]);
  };

  const handleApply = async () => {
    if (!selectedFile) {
      setError('Drop a template .html file or bundle .zip, or browse to choose one.');
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const applied = await applyBrandToUpload(selectedFile, state, bundleId);
      setResult(applied);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not apply brand to upload.');
    } finally {
      setBusy(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    downloadBrandedBundle(result);
  };

  if (!isBrandApplyBundle(bundleId)) {
    return null;
  }

  return (
    <div className="w-card apply-bundle-panel">
      <h3>Apply brand to templates</h3>
      <p className="card-note">
        Drop or upload a single .html template or a full bundle .zip. Mailcraft maps your wizard
        tokens to elements marked with <code>data-element</code> and returns a branded download
        with <code>DESIGN_RULES.md</code> included. Filled CTAs use <strong>Primary bg</strong> and <strong>Primary text</strong> (one button per
        template). Templates with two buttons also use <strong>Secondary</strong> tokens for the
        outline button.
      </p>

      <div
        className={`apply-bundle-dropzone${dragging ? ' apply-bundle-dropzone--active' : ''}${selectedFile ? ' apply-bundle-dropzone--filled' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Drop a template file or click to browse"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".html,.htm,.zip,application/zip"
          onChange={handleFileChange}
          className="apply-bundle-file"
          tabIndex={-1}
          aria-hidden="true"
        />
        <span className="apply-bundle-dropzone-icon" aria-hidden="true">↓</span>
        {selectedFile ? (
          <>
            <strong>{selectedFile.name}</strong>
            <span>Drop a new file to replace, or click to browse</span>
          </>
        ) : (
          <>
            <strong>Drag and drop your bundle here</strong>
            <span>or click to browse · .html or .zip</span>
          </>
        )}
      </div>

      <div className="apply-bundle-controls">
        <button type="button" className="w-btn w-btn-primary" disabled={busy || !selectedFile} onClick={handleApply}>
          {busy ? 'Applying…' : 'Apply brand'}
        </button>
      </div>

      {error ? <p className="apply-bundle-error">{error}</p> : null}

      {result ? (
        <div className="apply-bundle-report">
          <p className="apply-bundle-summary">
            Applied <strong>{result.report.totalUpdates}</strong> update
            {result.report.totalUpdates === 1 ? '' : 's'} across{' '}
            <strong>{result.report.files.length}</strong> file
            {result.report.files.length === 1 ? '' : 's'}.
          </p>
          <ul className="apply-bundle-file-list">
            {result.report.files.map((file) => (
              <li key={file.path}>
                <strong>{file.path}</strong>
                <span>{file.updateCount} updates</span>
                {file.touchedElements.length > 0 ? (
                  <span className="apply-bundle-hooks">{file.touchedElements.join(', ')}</span>
                ) : null}
              </li>
            ))}
          </ul>
          {result.report.warnings.map((warning) => (
            <p key={warning} className="apply-bundle-warning">{warning}</p>
          ))}
          <button type="button" className="w-btn w-btn-success" onClick={handleDownload}>
            ↓ Download {result.filename} (includes DESIGN_RULES.md)
          </button>
        </div>
      ) : null}
    </div>
  );
}

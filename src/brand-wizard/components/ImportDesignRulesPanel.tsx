import { useCallback, useRef, useState, type ChangeEvent } from 'react';
import { importDesignRules, type ImportDesignRulesResult } from '../importDesignRules';

type Props = {
  onReadyToImport: (result: ImportDesignRulesResult, fileName: string) => void;
};

export function ImportDesignRulesPanel({ onReadyToImport }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<ImportDesignRulesResult | null>(null);
  const [busy, setBusy] = useState(false);

  const parseFile = useCallback(
    async (file: File) => {
      if (!file.name.toLowerCase().endsWith('.md')) {
        setFileName(null);
        setPreview(null);
        setError('Choose a Markdown file (.md), such as DESIGN_RULES.md.');
        return;
      }

      setBusy(true);
      setError(null);
      try {
        const markdown = await file.text();
        if (!/design rules|brand identity/i.test(markdown)) {
          setPreview(null);
          setFileName(file.name);
          setError('This file does not look like a Mailcraft DESIGN_RULES.md export.');
          return;
        }

        const result = importDesignRules(markdown);
        if (result.stats.fieldsMatched === 0) {
          setPreview(null);
          setFileName(file.name);
          setError(result.stats.warnings[0] ?? 'No design tokens could be imported from this file.');
          return;
        }

        setFileName(file.name);
        setPreview(result);
      } catch {
        setError('Could not read that file.');
        setPreview(null);
        setFileName(null);
      } finally {
        setBusy(false);
      }
    },
    [],
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void parseFile(file);
    event.target.value = '';
  };

  const handleImportClick = () => {
    if (!preview || !fileName) return;
    onReadyToImport(preview, fileName);
  };

  return (
    <div className="w-card import-design-rules-panel">
      <h3>Import existing design rules</h3>
      <p className="card-note">
        Upload a <code>DESIGN_RULES.md</code> file (from a previous export or from a branded bundle
        zip) to fill every wizard field automatically instead of starting from scratch.
      </p>

      <div className="import-design-rules-controls">
        <input
          ref={inputRef}
          type="file"
          accept=".md,text/markdown"
          onChange={handleFileChange}
          className="apply-bundle-file"
          tabIndex={-1}
          aria-hidden="true"
        />
        <button
          type="button"
          className="w-btn"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          {busy ? 'Reading…' : 'Choose DESIGN_RULES.md'}
        </button>
        {fileName ? <span className="import-design-rules-filename">{fileName}</span> : null}
      </div>

      {error ? <p className="apply-bundle-error">{error}</p> : null}

      {preview ? (
        <div className="import-design-rules-preview">
          <p className="apply-bundle-summary">
            Found <strong>{preview.stats.fieldsMatched}</strong> design token
            {preview.stats.fieldsMatched === 1 ? '' : 's'}
            {preview.checklist?.length
              ? ` and ${preview.checklist.filter(Boolean).length} of ${preview.checklist.length} checklist items`
              : ''}
            .
          </p>
          {preview.stats.warnings.map((warning) => (
            <p key={warning} className="apply-bundle-warning">
              {warning}
            </p>
          ))}
          <button type="button" className="w-btn w-btn-primary" onClick={handleImportClick}>
            Import into wizard
          </button>
        </div>
      ) : null}
    </div>
  );
}

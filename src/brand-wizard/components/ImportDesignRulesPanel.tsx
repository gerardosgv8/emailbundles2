import { useCallback, useState, type ChangeEvent } from 'react';
import { importDesignRules, type ImportDesignRulesResult } from '../importDesignRules';

type Props = {
  onReadyToImport: (result: ImportDesignRulesResult, fileName: string) => void;
};

export function ImportDesignRulesPanel({ onReadyToImport }: Props) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<ImportDesignRulesResult | null>(null);
  const [busy, setBusy] = useState(false);

  const parseFile = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.md')) {
      setFileName(null);
      setPreview(null);
      setError('Use a .md file (e.g. DESIGN_RULES.md).');
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const markdown = await file.text();
      if (!/design rules|brand identity/i.test(markdown)) {
        setPreview(null);
        setFileName(file.name);
        setError('Not a Mailcraft DESIGN_RULES.md export.');
        return;
      }

      const result = importDesignRules(markdown);
      if (result.stats.fieldsMatched === 0) {
        setPreview(null);
        setFileName(file.name);
        setError(result.stats.warnings[0] ?? 'No tokens found in this file.');
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
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void parseFile(file);
  };

  const handleImportClick = () => {
    if (!preview || !fileName) return;
    onReadyToImport(preview, fileName);
  };

  return (
    <div className="preview-import-block">
      <p className="preview-import-label">Import DESIGN_RULES.md</p>
      <p className="preview-import-hint">
        Load a previous export or the .md from a branded bundle zip to fill all wizard fields.
      </p>

      <label className="preview-import-file-label">
        <span className="preview-import-file-button">{busy ? 'Reading…' : 'Choose file'}</span>
        <input
          type="file"
          accept=".md,text/markdown"
          className="preview-import-file-input"
          disabled={busy}
          onChange={handleFileChange}
        />
        <span className="preview-import-file-name">
          {fileName ?? 'No file chosen'}
        </span>
      </label>

      {error ? <p className="preview-import-error">{error}</p> : null}

      {preview ? (
        <div className="preview-import-ready">
          <p className="preview-import-summary">
            <strong>{preview.stats.fieldsMatched}</strong> tokens ready
            {preview.checklist?.length
              ? ` · ${preview.checklist.filter(Boolean).length}/${preview.checklist.length} checklist`
              : ''}
          </p>
          {preview.stats.warnings.map((warning) => (
            <p key={warning} className="preview-import-warning">
              {warning}
            </p>
          ))}
          <button type="button" className="w-btn w-btn-primary preview-import-btn" onClick={handleImportClick}>
            Import into wizard
          </button>
        </div>
      ) : null}
    </div>
  );
}

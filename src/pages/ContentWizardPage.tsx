import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { getTemplateBundle } from '../data/templateBundles';
import { groupContentFields } from '../content-wizard/contentFieldSchema';
import {
  contentWizardPath,
  contentWizardTemplatePath,
  parseContentWizardBundleId,
} from '../content-wizard/contentWizardRoute';
import {
  getContentBundleTemplates,
  isContentWizardBundle,
  resolveTemplateFile,
} from '../content-wizard/bundleContentConfig';
import { ContentApplyPanel } from '../content-wizard/components/ContentApplyPanel';
import { ContentHtmlPreview } from '../content-wizard/components/ContentHtmlPreview';
import { ContentSectionCard } from '../content-wizard/components/ContentFields';
import { useTemplateContentState } from '../content-wizard/useTemplateContentState';
import { WizardConfirmModal } from '../brand-wizard/components/WizardConfirmModal';
import type { TemplateContentState, TemplateVisibilityState } from '../content-wizard/types';
import '../styles/brand-wizard.css';

function isFieldFilled(value: unknown): boolean {
  if (typeof value === 'string') return value.trim().length > 0;
  if (value && typeof value === 'object') {
    if ('text' in value && 'href' in value) {
      return Boolean((value as { text: string; href: string }).text.trim() || (value as { text: string; href: string }).href.trim());
    }
    if ('src' in value && 'alt' in value) {
      return Boolean((value as { src: string; alt: string }).src.trim() || (value as { src: string; alt: string }).alt.trim());
    }
  }
  return false;
}

export function ContentWizardPage() {
  const { bundleId: routeBundleId, templateSlug } = useParams<{ bundleId: string; templateSlug?: string }>();
  const bundleId = parseContentWizardBundleId(routeBundleId);
  const bundle = bundleId ? getTemplateBundle(bundleId) : undefined;

  if (!bundleId || !bundle || !bundle.wizardAvailable || !isContentWizardBundle(bundleId)) {
    return <Navigate to="/content-wizard" replace />;
  }

  const templates = getContentBundleTemplates(bundleId);
  const activeTemplate = templateSlug ? templates.find((t) => t.slug === templateSlug) : undefined;

  if (templateSlug && !activeTemplate) {
    return <Navigate to={contentWizardPath(bundleId)} replace />;
  }

  if (!activeTemplate) {
    return <ContentWizardTemplatePicker bundle={bundle} templates={templates} />;
  }

  return <ContentWizardEditor bundle={bundle} template={activeTemplate} templates={templates} />;
}

function ContentWizardTemplatePicker({
  bundle,
  templates,
}: {
  bundle: NonNullable<ReturnType<typeof getTemplateBundle>>;
  templates: ReturnType<typeof getContentBundleTemplates>;
}) {
  return (
    <main className="container section content-wizard-picker">
      <div className="page-hero">
        <p>
          <Link to="/content-wizard">← All bundles</Link>
        </p>
        <h1>{bundle.name}</h1>
        <p>Pick a template to edit its copy. Each layout has its own set of content fields.</p>
      </div>

      <div className="content-template-grid">
        {templates.map((template) => (
          <Link
            key={template.slug}
            to={contentWizardTemplatePath(bundle.id, template.slug)}
            className="card content-template-card"
          >
            <h3>{template.name}</h3>
            <p className="content-template-file">{template.file}</p>
            <p className="content-template-meta">{template.elementCount} mapped elements</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

function ContentWizardEditor({
  bundle,
  template,
  templates,
}: {
  bundle: NonNullable<ReturnType<typeof getTemplateBundle>>;
  template: ReturnType<typeof getContentBundleTemplates>[number];
  templates: ReturnType<typeof getContentBundleTemplates>;
}) {
  const navigate = useNavigate();
  const templateFile = resolveTemplateFile(bundle.id, template.slug) ?? template.file;
  const { fields, values, visibility, setFieldValue, setFieldVisible, mergeExtracted, resetFields, savedAt } =
    useTemplateContentState(bundle.id, templateFile);
  const sections = useMemo(() => groupContentFields(fields), [fields]);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [sourceHtml, setSourceHtml] = useState<string | null>(null);

  useEffect(() => {
    setSourceHtml(null);
  }, [templateFile]);

  const filledCount = useMemo(
    () => fields.filter((field) => isFieldFilled(values[field.id])).length,
    [fields, values],
  );

  const hiddenCount = useMemo(
    () => fields.filter((field) => visibility[field.id] === false).length,
    [fields, visibility],
  );

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleExtracted = useCallback(
    (extractedValues: TemplateContentState, extractedVisibility: TemplateVisibilityState) => {
      mergeExtracted(extractedValues, extractedVisibility);
      showToast(`Imported copy from ${Object.keys(extractedValues).length} fields`);
    },
    [mergeExtracted, showToast],
  );

  const confirmReset = () => {
    resetFields();
    setResetModalOpen(false);
    showToast('Content fields cleared');
  };

  return (
    <>
      <div className="wizard-app content-wizard-app">
        <aside className="sidebar">
          <Link to={contentWizardPath(bundle.id)} className="wizard-bundle-back">
            ← All templates
          </Link>

          <div className="wizard-sidebar-desktop">
            <h1>{bundle.name}</h1>
            <p className="sub">Template content · {template.name}</p>
            <nav aria-label="Templates">
              {templates.map((item) => {
                const cls = item.slug === template.slug ? 'active' : '';
                return (
                  <Link
                    key={item.slug}
                    to={contentWizardTemplatePath(bundle.id, item.slug)}
                    className={`nav-item nav-item-link ${cls}`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="wizard-sidebar-mobile">
            <div className="wizard-mobile-head">
              <h1>{template.name}</h1>
            </div>
            <label className="wizard-step-picker">
              <span className="wizard-step-picker-label">Template</span>
              <select
                className="wizard-step-picker-select"
                value={template.slug}
                aria-label="Switch template"
                onChange={(e) => {
                  navigate(contentWizardTemplatePath(bundle.id, e.target.value));
                }}
              >
                {templates.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </aside>

        <main className="wizard-main">
          <div className="main-header">
            <div>
              <h2>{template.name}</h2>
              <p>
                Edit copy for <code>{template.file}</code>. Use the toggle on each field to show or
                hide it in the exported email without breaking layout spacing.
              </p>
            </div>
            <div className="toolbar">
              {savedAt ? <span className="save-indicator">Saved locally · {savedAt}</span> : null}
              <span className="save-indicator content-progress">
                {filledCount}/{fields.length} filled
                {hiddenCount > 0 ? ` · ${hiddenCount} hidden` : ''}
              </span>
              <button type="button" className="w-btn" onClick={() => setResetModalOpen(true)}>
                Clear fields
              </button>
            </div>
          </div>

          {sections.map((section) => (
            <ContentSectionCard
              key={section.id}
              title={section.title}
              fields={section.fields}
              values={values}
              visibility={visibility}
              onChange={setFieldValue}
              onVisibleChange={setFieldVisible}
            />
          ))}
        </main>

        <aside className="preview-panel content-wizard-panel">
          <ContentApplyPanel
            bundleId={bundle.id}
            templateFile={templateFile}
            values={values}
            visibility={visibility}
            sourceHtml={sourceHtml}
            onSourceHtmlChange={setSourceHtml}
            onExtracted={handleExtracted}
          />
          <ContentHtmlPreview
            sourceHtml={sourceHtml}
            bundleId={bundle.id}
            templateFile={templateFile}
            templateName={template.name}
            values={values}
            visibility={visibility}
          />
          <div className="w-card content-wizard-tip">
            <h3>Brand styling</h3>
            <p className="card-note">
              Colors, fonts, and footer tokens live in the{' '}
              <Link to={`/brand-wizard/${bundle.id}`}>Brand Wizard</Link>. You can fill copy here
              first and brand after, or brand first and then fill content. Either order works.
            </p>
          </div>
        </aside>
      </div>

      <div className={`wizard-toast${toast ? ' show' : ''}`}>{toast}</div>

      <WizardConfirmModal
        open={resetModalOpen}
        title="Clear all content fields?"
        variant="danger"
        confirmLabel="Clear fields"
        cancelLabel="Keep my copy"
        onCancel={() => setResetModalOpen(false)}
        onConfirm={confirmReset}
        description={
          <>
            <p>
              All content values for <strong>{template.name}</strong> will be cleared in this
              browser. Upload your template again to re-import copy from HTML.
            </p>
          </>
        }
      />
    </>
  );
}

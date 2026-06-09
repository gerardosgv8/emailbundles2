import { useCallback, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getTemplateBundle } from '../data/templateBundles';
import { parseWizardRoute, wizardPath } from '../brand-wizard/wizardRoute';
import { WIZARD_STEPS } from '../brand-wizard/defaults';
import { downloadDesignRules } from '../brand-wizard/exportDesignRules';
import { useDesignRulesState } from '../brand-wizard/useDesignRulesState';
import { getFieldMeta } from '../brand-wizard/getFieldMeta';
import { ApplyBundlePanel } from '../brand-wizard/components/ApplyBundlePanel';
import { WizardConfirmModal } from '../brand-wizard/components/WizardConfirmModal';
import { ColorField, TextField, WizardCard, type SetField } from '../brand-wizard/WizardFields';
import type { DesignRulesField, DesignRulesState } from '../brand-wizard/types';
import '../styles/brand-wizard.css';

const EXPORT_CHECKLIST = [
  'Logo URL loads over HTTPS',
  'Button colors meet contrast requirements',
  'Footer has physical mailing address (CAN-SPAM)',
  'Unsubscribe uses ESP merge tag',
  'Support email is monitored',
  'Social & legal URLs are correct',
  'All 9 templates spot-checked',
];

function fieldMeta(bundleId: string, fieldKey: DesignRulesField) {
  const meta = getFieldMeta(bundleId, fieldKey);
  return meta ? { usage: meta.usage, templates: meta.templates, elements: meta.elements } : {};
}

function WizardPreview({ state }: { state: DesignRulesState }) {
  const d = state;
  const swatches: { label: string; color: string }[] = [
    { label: 'Primary', color: d.colorPrimary },
    { label: 'Secondary', color: d.colorSecondary },
    { label: 'Accent', color: d.colorAccent },
    { label: 'Heading', color: d.colorHeadingDark },
    { label: 'Body', color: d.colorBody },
    { label: 'Muted', color: d.colorMuted },
    { label: 'Info panel', color: d.colorBgInfo },
    { label: 'Warning', color: d.colorBgWarning },
    { label: 'Urgency', color: d.colorBgUrgency },
  ];

  return (
    <aside className="preview-panel">
      <h3>Live preview</h3>
      <div className="preview-email">
        <div className="p-header" style={{ background: d.colorBgEmail }}>
          <img src={d.logoUrl} alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div style={{ fontWeight: 700, fontSize: 18, color: d.colorHeaderKicker }}>{d.brandName}</div>
          <div style={{ fontSize: 13, color: d.colorMuted, marginTop: 4 }}>{d.tagline}</div>
        </div>
        <div className="p-body" style={{ background: d.colorBgEmail, fontFamily: d.fontStack }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: d.colorHeadingDark }}>Section heading</div>
          <div style={{ fontSize: 14, color: d.colorBody, margin: '8px 0 12px', lineHeight: 1.5 }}>
            Sample body copy showing how your text colors work together in an email template.
          </div>
          <div className="preview-btns">
            <span style={{ background: d.btnPrimaryBg, color: d.btnPrimaryText }}>Primary</span>
            <span style={{ background: d.btnSecondaryBg, color: d.btnSecondaryText, border: `2px solid ${d.btnSecondaryBorder}` }}>Secondary</span>
          </div>
          <div style={{ background: d.colorBgInfo, padding: 10, borderRadius: 8, fontSize: 12, color: d.colorPrimary }}>
            Info callout panel
          </div>
        </div>
        <div className="p-footer" style={{ color: d.footerTextColor }}>
          <strong style={{ color: d.footerHeadingColor }}>{d.footerCompany}</strong>
          <br />
          {d.footerAddress1}
          <br />
          {d.footerTagline}
          <br />
          <a href="#" style={{ color: d.footerLinkColor }}>{d.footerEmail}</a>
        </div>
      </div>
      <p className="swatch-heading">Palette reference</p>
      <div className="swatch-list">
        {swatches.map(({ label, color }) => (
          <div key={label} className="swatch-item" title={`${label}: ${color}`}>
            <div className="swatch" style={{ background: color }} aria-hidden="true" />
            <div className="swatch-meta">
              <span className="swatch-label">{label}</span>
              <span className="swatch-hex">{color}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function StepContent({
  bundleId,
  stepId,
  state,
  setField,
  setChecklistItem,
  onExport,
  enhanced,
}: {
  bundleId: string;
  stepId: string;
  state: DesignRulesState;
  setField: SetField;
  setChecklistItem: (index: number, checked: boolean) => void;
  onExport: () => void;
  enhanced: boolean;
}) {
  const m = (fieldKey: DesignRulesField) => fieldMeta(bundleId, fieldKey);
  const set = setField as (key: DesignRulesField, value: string) => void;

  switch (stepId) {
    case 'brand':
      return (
        <WizardCard title="Company & sender">
          <div className="field-grid">
            <TextField fieldKey="brandName" label="Brand / company name" {...m('brandName')} value={state.brandName} onChange={set} />
            <TextField fieldKey="legalName" label="Legal entity name" hint="if different" {...m('legalName')} value={state.legalName} onChange={set} />
            <TextField fieldKey="tagline" label="Short tagline" full {...m('tagline')} value={state.tagline} onChange={set} />
            <TextField fieldKey="footerTrustLine" label="Footer trust line" full {...m('footerTrustLine')} value={state.footerTrustLine} onChange={set} />
            <TextField fieldKey="copyrightNote" label="Copyright line" hint="year auto on export" full {...m('copyrightNote')} value={state.copyrightNote} onChange={set} />
            <TextField fieldKey="fromName" label="Default From name" {...m('fromName')} value={state.fromName} onChange={set} />
            <TextField fieldKey="replyToEmail" label="Reply-to email" type="email" {...m('replyToEmail')} value={state.replyToEmail} onChange={set} />
          </div>
        </WizardCard>
      );

    case 'logo':
      return (
        <>
          <WizardCard title="Logo assets">
            <div className="field-grid">
              <TextField fieldKey="logoUrl" label="Logo URL" type="url" full {...m('logoUrl')} value={state.logoUrl} onChange={set} />
              <TextField fieldKey="logoAlt" label="Logo alt text" {...m('logoAlt')} value={state.logoAlt} onChange={set} />
              <TextField fieldKey="logoWidth" label="Display width" {...m('logoWidth')} value={state.logoWidth} onChange={set} />
              <TextField fieldKey="logoHeight" label="Display height" {...m('logoHeight')} value={state.logoHeight} onChange={set} />
              <TextField fieldKey="logoDarkUrl" label="Logo (dark background)" type="url" hint="optional" {...m('logoDarkUrl')} value={state.logoDarkUrl} onChange={set} />
              <TextField fieldKey="faviconUrl" label="Favicon URL" type="url" hint="optional" {...m('faviconUrl')} value={state.faviconUrl} onChange={set} />
            </div>
          </WizardCard>
          <div className="w-card">
            <p className="card-note">Use HTTPS PNG or JPG. Keep under ~100 KB. Transparent background recommended.</p>
          </div>
        </>
      );

    case 'colors-core':
      return (
        <WizardCard title="Core brand colors">
          <ColorField fieldKey="colorPrimary" label="Primary" {...m('colorPrimary')} value={state.colorPrimary} onChange={set} />
          <ColorField fieldKey="colorSecondary" label="Secondary" {...m('colorSecondary')} value={state.colorSecondary} onChange={set} />
          <ColorField fieldKey="colorAccent" label="Accent" {...m('colorAccent')} value={state.colorAccent} onChange={set} />
        </WizardCard>
      );

    case 'colors-text':
      return (
        <WizardCard title="Text colors">
          <ColorField fieldKey="colorHeadingDark" label="Heading dark" {...m('colorHeadingDark')} value={state.colorHeadingDark} onChange={set} />
          <ColorField fieldKey="colorHeadingAlt" label="Heading alt" {...m('colorHeadingAlt')} value={state.colorHeadingAlt} onChange={set} />
          <ColorField fieldKey="colorHeaderKicker" label="Header kicker" {...m('colorHeaderKicker')} value={state.colorHeaderKicker} onChange={set} />
          <ColorField fieldKey="colorBody" label="Body text" {...m('colorBody')} value={state.colorBody} onChange={set} />
          <ColorField fieldKey="colorBodyAlt" label="Body alt" {...m('colorBodyAlt')} value={state.colorBodyAlt} onChange={set} />
          <ColorField fieldKey="colorMuted" label="Muted / subtitle" {...m('colorMuted')} value={state.colorMuted} onChange={set} />
        </WizardCard>
      );

    case 'colors-bg':
      return (
        <WizardCard title="Backgrounds & surfaces">
          <p className="card-note">Shared tokens apply across all nine templates. Template-specific tokens show which HTML file they map to.</p>
          <ColorField fieldKey="colorBgEmail" label="Email background" {...m('colorBgEmail')} value={state.colorBgEmail} onChange={set} />
          <ColorField fieldKey="colorBgLightGray" label="Light gray section" {...m('colorBgLightGray')} value={state.colorBgLightGray} onChange={set} />
          <ColorField fieldKey="colorBgInfo" label="Info blue" {...m('colorBgInfo')} value={state.colorBgInfo} onChange={set} />
          <ColorField fieldKey="colorBgService" label="Service blue" {...m('colorBgService')} value={state.colorBgService} onChange={set} />
          <ColorField fieldKey="colorBgServiceBorder" label="Service border" {...m('colorBgServiceBorder')} value={state.colorBgServiceBorder} onChange={set} />
          <ColorField fieldKey="colorBgPromoDark" label="Promo dark" {...m('colorBgPromoDark')} value={state.colorBgPromoDark} onChange={set} />
          <ColorField fieldKey="colorBgWarning" label="Warning bg" {...m('colorBgWarning')} value={state.colorBgWarning} onChange={set} />
          <ColorField fieldKey="colorBgWarningBorder" label="Warning border" {...m('colorBgWarningBorder')} value={state.colorBgWarningBorder} onChange={set} />
          <ColorField fieldKey="colorBgWarningText" label="Warning text" {...m('colorBgWarningText')} value={state.colorBgWarningText} onChange={set} />
          <ColorField fieldKey="colorBgUrgency" label="Urgency bg" {...m('colorBgUrgency')} value={state.colorBgUrgency} onChange={set} />
          <ColorField fieldKey="colorBgUrgencyBorder" label="Urgency border" {...m('colorBgUrgencyBorder')} value={state.colorBgUrgencyBorder} onChange={set} />
          <ColorField fieldKey="colorBgUrgencyText" label="Urgency text" {...m('colorBgUrgencyText')} value={state.colorBgUrgencyText} onChange={set} />
          <ColorField fieldKey="colorDivider" label="Divider" {...m('colorDivider')} value={state.colorDivider} onChange={set} />
          <ColorField fieldKey="colorFooterDivider" label="Footer divider" {...m('colorFooterDivider')} value={state.colorFooterDivider} onChange={set} />
        </WizardCard>
      );

    case 'colors-badge':
      return (
        <WizardCard title="Badges & highlights">
          <ColorField fieldKey="colorBadgeEventBg" label="Event badge bg" {...m('colorBadgeEventBg')} value={state.colorBadgeEventBg} onChange={set} />
          <ColorField fieldKey="colorBadgeEventText" label="Event badge text" {...m('colorBadgeEventText')} value={state.colorBadgeEventText} onChange={set} />
          <ColorField fieldKey="colorBadgeStepBg" label="Step badge bg" {...m('colorBadgeStepBg')} value={state.colorBadgeStepBg} onChange={set} />
          <ColorField fieldKey="colorBadgeStepText" label="Step badge text" {...m('colorBadgeStepText')} value={state.colorBadgeStepText} onChange={set} />
          <ColorField fieldKey="colorPromoHighlight" label="Promo highlight" {...m('colorPromoHighlight')} value={state.colorPromoHighlight} onChange={set} />
        </WizardCard>
      );

    case 'buttons':
      return (
        <>
          <WizardCard title="Primary & secondary">
            <ColorField fieldKey="btnPrimaryBg" label="Primary bg" {...m('btnPrimaryBg')} value={state.btnPrimaryBg} onChange={set} />
            <ColorField fieldKey="btnPrimaryText" label="Primary text" {...m('btnPrimaryText')} value={state.btnPrimaryText} onChange={set} />
            <ColorField fieldKey="btnSecondaryBg" label="Secondary bg" {...m('btnSecondaryBg')} value={state.btnSecondaryBg} onChange={set} />
            <ColorField fieldKey="btnSecondaryText" label="Secondary text" {...m('btnSecondaryText')} value={state.btnSecondaryText} onChange={set} />
            <ColorField fieldKey="btnSecondaryBorder" label="Secondary border" {...m('btnSecondaryBorder')} value={state.btnSecondaryBorder} onChange={set} />
            <div className="field-grid" style={{ marginTop: '1rem' }}>
              <TextField fieldKey="btnPrimaryRadius" label="Border radius" {...m('btnPrimaryRadius')} value={state.btnPrimaryRadius} onChange={set} />
              <TextField fieldKey="btnPrimaryPadding" label="Padding" {...m('btnPrimaryPadding')} value={state.btnPrimaryPadding} onChange={set} />
            </div>
          </WizardCard>
          <WizardCard title="Links">
            <div className="field-grid">
              <ColorField fieldKey="linkColor" label="Text link color" {...m('linkColor')} value={state.linkColor} onChange={set} />
              <TextField fieldKey="urlBase" label="Base website URL" type="url" full {...m('urlBase')} value={state.urlBase} onChange={set} />
              <TextField fieldKey="urlQuote" label="Quote / contact URL" type="url" {...m('urlQuote')} value={state.urlQuote} onChange={set} />
              <TextField fieldKey="urlSupport" label="Support URL" type="url" {...m('urlSupport')} value={state.urlSupport} onChange={set} />
            </div>
          </WizardCard>
        </>
      );

    case 'typography':
      return (
        <WizardCard title="Fonts">
          <div className="field-grid">
            <TextField fieldKey="fontStack" label="Font stack" full {...m('fontStack')} value={state.fontStack} onChange={set} />
            <TextField fieldKey="fontCustomUrl" label="Custom font URL" type="url" hint="optional" {...m('fontCustomUrl')} value={state.fontCustomUrl} onChange={set} />
            <TextField fieldKey="fontCustomName" label="Custom font name" hint="optional" {...m('fontCustomName')} value={state.fontCustomName} onChange={set} />
          </div>
        </WizardCard>
      );

    case 'footer':
      return (
        <>
          <WizardCard title="Contact & address">
            <div className="field-grid">
              <TextField fieldKey="footerCompany" label="Company name" {...m('footerCompany')} value={state.footerCompany} onChange={set} />
              <TextField fieldKey="footerAddress1" label="Address line 1" {...m('footerAddress1')} value={state.footerAddress1} onChange={set} />
              <TextField fieldKey="footerAddress2" label="Address line 2" {...m('footerAddress2')} value={state.footerAddress2} onChange={set} />
              <TextField fieldKey="footerCountry" label="Country" {...m('footerCountry')} value={state.footerCountry} onChange={set} />
              <TextField fieldKey="footerEmail" label="Support email" type="email" {...m('footerEmail')} value={state.footerEmail} onChange={set} />
              <TextField fieldKey="footerPhone" label="Support phone" hint="optional" {...m('footerPhone')} value={state.footerPhone} onChange={set} />
              <TextField fieldKey="footerTagline" label="Footer tagline" full {...m('footerTagline')} value={state.footerTagline} onChange={set} />
              <ColorField fieldKey="footerTextColor" label="Footer text" {...m('footerTextColor')} value={state.footerTextColor} onChange={set} />
              <ColorField fieldKey="footerHeadingColor" label="Footer heading" {...m('footerHeadingColor')} value={state.footerHeadingColor} onChange={set} />
              <ColorField fieldKey="footerLinkColor" label="Footer links" {...m('footerLinkColor')} value={state.footerLinkColor} onChange={set} />
            </div>
          </WizardCard>
          <WizardCard title="Social links">
            <div className="field-grid">
              <TextField fieldKey="socialFacebook" label="Facebook" type="url" {...m('socialFacebook')} value={state.socialFacebook} onChange={set} />
              <TextField fieldKey="socialTwitter" label="X (Twitter)" type="url" {...m('socialTwitter')} value={state.socialTwitter} onChange={set} />
              <TextField fieldKey="socialInstagram" label="Instagram" type="url" {...m('socialInstagram')} value={state.socialInstagram} onChange={set} />
              <TextField fieldKey="socialLinkedin" label="LinkedIn" type="url" {...m('socialLinkedin')} value={state.socialLinkedin} onChange={set} />
            </div>
          </WizardCard>
          <WizardCard title="Legal links">
            <div className="field-grid">
              <TextField fieldKey="linkPrivacy" label="Privacy Policy" type="url" {...m('linkPrivacy')} value={state.linkPrivacy} onChange={set} />
              <TextField fieldKey="linkTerms" label="Terms of Service" type="url" {...m('linkTerms')} value={state.linkTerms} onChange={set} />
              <TextField fieldKey="linkHelp" label="Help Center" type="url" {...m('linkHelp')} value={state.linkHelp} onChange={set} />
              <TextField fieldKey="linkUnsubscribe" label="Unsubscribe merge tag" {...m('linkUnsubscribe')} value={state.linkUnsubscribe} onChange={set} />
            </div>
          </WizardCard>
        </>
      );

    case 'layout':
      return (
        <WizardCard title="Layout tokens">
          <div className="field-grid">
            <TextField fieldKey="layoutMaxWidth" label="Email max width" {...m('layoutMaxWidth')} value={state.layoutMaxWidth} onChange={set} />
            <TextField fieldKey="layoutOuterPadding" label="Outer padding" {...m('layoutOuterPadding')} value={state.layoutOuterPadding} onChange={set} />
            <TextField fieldKey="layoutSectionPadding" label="Section padding" {...m('layoutSectionPadding')} value={state.layoutSectionPadding} onChange={set} />
            <TextField fieldKey="layoutHorizontalPadding" label="Horizontal padding" {...m('layoutHorizontalPadding')} value={state.layoutHorizontalPadding} onChange={set} />
            <TextField fieldKey="layoutSpacerStandard" label="Standard spacer" {...m('layoutSpacerStandard')} value={state.layoutSpacerStandard} onChange={set} />
            <TextField fieldKey="layoutSpacerLarge" label="Large spacer" {...m('layoutSpacerLarge')} value={state.layoutSpacerLarge} onChange={set} />
            <TextField fieldKey="layoutRadiusButtons" label="Button radius" {...m('layoutRadiusButtons')} value={state.layoutRadiusButtons} onChange={set} />
            <TextField fieldKey="layoutRadiusHero" label="Hero image radius" {...m('layoutRadiusHero')} value={state.layoutRadiusHero} onChange={set} />
            <TextField fieldKey="layoutRadiusGrid" label="Grid image radius" {...m('layoutRadiusGrid')} value={state.layoutRadiusGrid} onChange={set} />
          </div>
        </WizardCard>
      );

    case 'imagery':
      return (
        <WizardCard title="Image specs">
          <div className="field-grid">
            <TextField fieldKey="imgHeroWidth" label="Hero width" {...m('imgHeroWidth')} value={state.imgHeroWidth} onChange={set} />
            <TextField fieldKey="imgFeaturedWidth" label="Featured product width" {...m('imgFeaturedWidth')} value={state.imgFeaturedWidth} onChange={set} />
            <TextField fieldKey="imgGridSize" label="Grid product size" {...m('imgGridSize')} value={state.imgGridSize} onChange={set} />
            <TextField fieldKey="imgThumbSize" label="Catalog thumb size" {...m('imgThumbSize')} value={state.imgThumbSize} onChange={set} />
            <TextField fieldKey="imgHeroAspect" label="Hero aspect ratio" {...m('imgHeroAspect')} value={state.imgHeroAspect} onChange={set} />
            <TextField fieldKey="imgHeroDefault" label="Default hero URL" type="url" full {...m('imgHeroDefault')} value={state.imgHeroDefault} onChange={set} />
            <TextField fieldKey="imgCdnBase" label="CDN base URL" type="url" full {...m('imgCdnBase')} value={state.imgCdnBase} onChange={set} />
          </div>
        </WizardCard>
      );

    case 'export':
      return (
        <>
          <WizardCard title="Pre-flight checklist">
            <ul className="checklist">
              {EXPORT_CHECKLIST.map((label, i) => (
                <li key={label}>
                  <input
                    type="checkbox"
                    checked={state.checklist[i] ?? false}
                    onChange={(e) => setChecklistItem(i, e.target.checked)}
                  />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </WizardCard>
          <WizardCard title="Element mapping reference">
            <table className="ref-table">
              <thead>
                <tr><th>Token</th><th>data-element</th></tr>
              </thead>
              <tbody>
                <tr><td>Logo</td><td><code>logo</code></td></tr>
                <tr><td>Primary CTA</td><td><code>cta-primary</code>, <code>hero-cta</code></td></tr>
                <tr><td>Footer</td><td><code>footer-company-name</code>, <code>footer-address</code></td></tr>
              </tbody>
            </table>
          </WizardCard>
          {enhanced ? <ApplyBundlePanel state={state} bundleId={bundleId} /> : null}
          <div className="w-card export-cta">
            <p>Download your completed design rules as Markdown.</p>
            {!enhanced ? (
              <p className="card-note" style={{ marginTop: 0 }}>
                Need to apply brand tokens directly to HTML templates?{' '}
                <Link to={wizardPath(bundleId, true)}>Open the enhanced wizard</Link> to upload
                .html or .zip files.
              </p>
            ) : (
              <p className="card-note" style={{ marginTop: 0 }}>
                Export-only workflow?{' '}
                <Link to={wizardPath(bundleId, false)}>Switch to the standard wizard</Link>.
              </p>
            )}
            <button type="button" className="w-btn w-btn-success" style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }} onClick={onExport}>
              ↓ Export DESIGN_RULES.md
            </button>
          </div>
        </>
      );

    default:
      return null;
  }
}

export function BrandWizardPage() {
  const { bundleId: routeBundleId } = useParams<{ bundleId: string }>();
  const route = parseWizardRoute(routeBundleId);
  const bundle = route ? getTemplateBundle(route.bundleId) : undefined;

  if (!route || !bundle || !bundle.wizardAvailable) {
    return <Navigate to="/brand-wizard" replace />;
  }

  return <BrandWizardEditor bundle={bundle} enhanced={route.enhanced} />;
}

function BrandWizardEditor({
  bundle,
  enhanced,
}: {
  bundle: NonNullable<ReturnType<typeof getTemplateBundle>>;
  enhanced: boolean;
}) {
  const { state, setField, setChecklistItem, resetDefaults, savedAt } = useDesignRulesState(bundle.id);
  const [currentStep, setCurrentStep] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const step = WIZARD_STEPS[currentStep];

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleExport = useCallback(() => {
    downloadDesignRules(state);
    showToast('DESIGN_RULES.md downloaded');
  }, [state, showToast]);

  const handleReset = () => {
    setResetModalOpen(true);
  };

  const confirmReset = () => {
    resetDefaults();
    setResetModalOpen(false);
    showToast('Defaults restored');
  };

  const goNext = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      showToast('Review complete. Export your .md file when you are ready.');
    }
  };

  return (
    <>
      <div className="wizard-app">
        <aside className="sidebar">
          <Link to="/brand-wizard" className="wizard-bundle-back">← All bundles</Link>

          <div className="wizard-sidebar-desktop">
            <h1>{bundle.name}</h1>
            <p className="sub">
              {enhanced
                ? 'Define brand tokens, apply to templates, and export DESIGN_RULES.md'
                : 'Define brand tokens, preview, and export DESIGN_RULES.md'}
            </p>
            {enhanced ? (
              <span className="wizard-mode-badge wizard-mode-badge--enhanced">Enhanced · apply to HTML</span>
            ) : (
              <span className="wizard-mode-badge">Standard · export .md</span>
            )}
            <nav aria-label="Wizard steps">
              {WIZARD_STEPS.map((s, i) => {
                const cls = i === currentStep ? 'active' : i < currentStep ? 'done' : '';
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`nav-item ${cls}`}
                    onClick={() => setCurrentStep(i)}
                  >
                    <span className="nav-num">{i + 1}</span>
                    {s.title}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="wizard-sidebar-mobile">
            <div className="wizard-mobile-head">
              <h1>{bundle.name}</h1>
              {enhanced ? (
                <span className="wizard-mode-badge wizard-mode-badge--enhanced">Enhanced</span>
              ) : (
                <span className="wizard-mode-badge">Standard</span>
              )}
            </div>
            <label className="wizard-step-picker">
              <span className="wizard-step-picker-label">
                Step {currentStep + 1} of {WIZARD_STEPS.length}
              </span>
              <select
                className="wizard-step-picker-select"
                value={currentStep}
                aria-label="Jump to wizard step"
                onChange={(e) => setCurrentStep(Number(e.target.value))}
              >
                {WIZARD_STEPS.map((s, i) => (
                  <option key={s.id} value={i}>
                    {i + 1}. {s.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </aside>

        <main className="wizard-main">
          <div className="main-header">
            <div>
              <h2>{step.title}</h2>
              <p>{step.desc}</p>
            </div>
            <div className="toolbar">
              {savedAt ? <span className="save-indicator">Saved locally · {savedAt}</span> : null}
              <button type="button" className="w-btn" onClick={handleReset}>Reset defaults</button>
              <button type="button" className="w-btn w-btn-success" onClick={handleExport}>Export .md</button>
            </div>
          </div>

          <StepContent
            bundleId={bundle.id}
            stepId={step.id}
            state={state}
            setField={setField}
            setChecklistItem={setChecklistItem}
            onExport={handleExport}
            enhanced={enhanced}
          />

          <div className="step-actions">
            <button type="button" className="w-btn" disabled={currentStep === 0} onClick={() => setCurrentStep((s) => s - 1)}>
              ← Previous
            </button>
            <button type="button" className="w-btn w-btn-primary" onClick={goNext}>
              {currentStep === WIZARD_STEPS.length - 1 ? 'Finish' : 'Next →'}
            </button>
          </div>
        </main>

        <WizardPreview state={state} />
      </div>

      <div className={`wizard-toast${toast ? ' show' : ''}`}>{toast}</div>

      <WizardConfirmModal
        open={resetModalOpen}
        title="Reset to defaults?"
        variant="danger"
        confirmLabel="Reset defaults"
        cancelLabel="Keep my changes"
        onCancel={() => setResetModalOpen(false)}
        onConfirm={confirmReset}
        description={
          <>
            <p>
              All wizard fields and checklist progress for <strong>{bundle.name}</strong> will be
              replaced with the starter design rules.
            </p>
            <p className="wizard-modal-note">
              Your current values are stored locally until you confirm. After reset, you will need to
              re-enter any custom brand settings manually.
            </p>
          </>
        }
      />
    </>
  );
}

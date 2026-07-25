import { Link } from 'react-router-dom';
import { TEMPLATE_BUNDLES } from '../data/templateBundles';
import { contentWizardPath } from '../content-wizard/contentWizardRoute';

export function ContentWizardSelectPage() {
  return (
    <main className="container section">
      <div className="page-hero">
        <h1>Content Wizard</h1>
        <p>
          Step two of the Mailcraft path. Pick a layout, enter headings, body, CTAs, and images,
          then download filled HTML. Brand tokens stay put. You skip hand-edits in the markup.
        </p>
      </div>

      <div className="bundle-select-grid">
        {TEMPLATE_BUNDLES.map((bundle) => (
          <article
            key={bundle.id}
            className={`card bundle-select-card${bundle.wizardAvailable ? '' : ' bundle-select-card--soon'}`}
          >
            <div className="bundle-select-card-head">
              <h3>{bundle.name}</h3>
              {bundle.wizardAvailable ? (
                <span className="bundle-select-badge bundle-select-badge--ready">Wizard ready</span>
              ) : (
                <span className="bundle-select-badge">Coming soon</span>
              )}
            </div>
            <p>{bundle.description}</p>
            {bundle.templateCount ? (
              <p className="bundle-select-meta">{bundle.templateCount} templates</p>
            ) : null}
            <ul className="product-features">
              <li>Per-template copy fields</li>
              <li>Headings, body, CTAs &amp; images</li>
              <li>Export filled .html template</li>
            </ul>
            {bundle.wizardAvailable ? (
              <div className="bundle-select-actions bundle-select-actions--dual">
                <Link to={contentWizardPath(bundle.id)} className="btn btn-primary">
                  Open Content Wizard
                </Link>
              </div>
            ) : (
              <button type="button" className="btn btn-secondary" disabled>
                Wizard coming soon
              </button>
            )}
          </article>
        ))}
      </div>

      <p className="text-center mt-8" style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
        Need colors and fonts instead?{' '}
        <Link to="/brand-wizard">Open Brand Wizard</Link>
        {' · '}
        <Link to="/products">Browse products</Link>
      </p>
    </main>
  );
}

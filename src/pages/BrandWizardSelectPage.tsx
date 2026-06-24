import { Link } from 'react-router-dom';
import { TEMPLATE_BUNDLES } from '../data/templateBundles';
import { wizardPath } from '../brand-wizard/wizardRoute';

export function BrandWizardSelectPage() {
  return (
    <main className="container section">
      <div className="page-hero">
        <h1>Brand Design Wizard</h1>
        <p>
          Choose the template bundle you want to brand. Define your tokens, apply them to your HTML
          templates or bundle .zip, and export DESIGN_RULES.md for your team.
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
              {bundle.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            {bundle.wizardAvailable ? (
              <div className="bundle-select-actions">
                <Link to={wizardPath(bundle.id)} className="btn btn-primary">
                  Open Brand Wizard
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
        Don&apos;t have a bundle yet?{' '}
        <Link to="/products">Browse products</Link>
      </p>
    </main>
  );
}

import { Link } from 'react-router-dom';
import { BrandWizardGuide } from '../docs/BrandWizardGuide';
import { ContentWizardGuide } from '../docs/ContentWizardGuide';
import { DocCallout } from '../docs/DocPrimitives';

const STEPS = [
  [1, 'Download and extract', 'Get your bundle and unzip the production HTML templates on your machine.'],
  [2, 'Brand the pack', 'Use the Brand Design Wizard to set tokens and apply them across the zip.'],
  [3, 'Fill the send', 'Use the Content Wizard to update headlines, body, CTAs, and images for one layout.'],
  [4, 'Paste into your ESP', 'Paste the filled HTML, wire merge tags, and send a test before launch.'],
] as const;

const NAV = [
  { href: '#getting-started', label: 'Getting started' },
  { href: '#brand-wizard', label: 'Brand Design Wizard' },
  { href: '#content-wizard', label: 'Content Wizard' },
  { href: '#structure', label: 'Template structure' },
  { href: '#customization', label: 'Customization' },
  { href: '#esp', label: 'ESP integration' },
  { href: '#troubleshooting', label: 'Troubleshooting' },
] as const;

export function DocsPage() {
  return (
    <main className="container">
      <div className="page-hero">
        <h1>Documentation</h1>
        <p>
          Follow the Mailcraft path: Brand Wizard, Content Wizard, ESP upload, and common fixes.
          Expand a section when you’re ready to work through it step by step.
        </p>
      </div>

      <div className="docs-layout">
        <aside className="docs-nav">
          <strong className="docs-nav-label">On this page</strong>
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </aside>

        <div>
          <section className="doc-section" id="getting-started">
            <h2>Getting started</h2>
            <div className="card">
              {STEPS.map(([n, title, desc]) => (
                <div key={n} className="step-row">
                  <span className="step-num">{n}</span>
                  <div>
                    <strong>{title}</strong>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: 'var(--muted)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <DocCallout tone="tip">
              Always test templates in multiple email clients before sending. Use Litmus or Email
              on Acid for comprehensive QA.
            </DocCallout>
          </section>

          <BrandWizardGuide />
          <ContentWizardGuide />

          <section className="doc-section" id="structure">
            <h2>Template structure</h2>
            <div className="card">
              <p>
                Each template uses a <strong>600px table-based layout</strong> with modular
                sections marked by HTML comments (e.g. <code>Component start Header</code>).
                Editable regions use <code>data-element</code> attributes for the wizards and
                visual builder.
              </p>
              <ul className="feature-list" style={{ marginTop: '1rem' }}>
                <li>Header with logo and kicker</li>
                <li>Hero image or product block</li>
                <li>Content sections (features, CTAs, grids)</li>
                <li>Footer with address, legal links, and CAN-SPAM compliance</li>
              </ul>
            </div>
          </section>

          <section className="doc-section" id="customization">
            <h2>Customization</h2>
            <div className="card">
              <p>
                Colors and fonts ship as inline styles. For one-off edits, search for hex values
                in the HTML. For team-wide branding, use the{' '}
                <a href="#brand-wizard">Brand Design Wizard</a> and export{' '}
                Design Rules file. For campaign copy only, use the{' '}
                <a href="#content-wizard">Content Wizard</a>.
              </p>
            </div>
          </section>

          <section className="doc-section" id="esp">
            <h2>ESP integration</h2>
            <div className="card">
              <p>Paste full HTML into your ESP template editor. For Salesforce, Klaviyo, and Mailchimp:</p>
              <ul className="feature-list">
                <li>Upload images to your ESP CDN and update image URLs</li>
                <li>Replace merge tags (e.g. unsubscribe links) with ESP-specific syntax</li>
                <li>Send a test to Gmail, Outlook, and Apple Mail before launch</li>
              </ul>
            </div>
          </section>

          <section className="doc-section" id="troubleshooting">
            <h2>Troubleshooting</h2>
            <div className="card">
              <dl className="faq-list" style={{ margin: 0 }}>
                <div className="faq-item">
                  <dt>Images not showing</dt>
                  <dd>Use absolute HTTPS URLs. Relative paths break in most ESPs.</dd>
                </div>
                <div className="faq-item">
                  <dt>Extra spacing in Outlook</dt>
                  <dd>
                    Avoid margins on table rows; use padding on <code>&lt;td&gt;</code> cells
                    instead.
                  </dd>
                </div>
                <div className="faq-item">
                  <dt>Buttons look wrong in Outlook</dt>
                  <dd>Ensure VML fallback blocks are present for bulletproof buttons.</dd>
                </div>
              </dl>
            </div>
            <p className="doc-cross-links">
              Wizard-specific fixes live under{' '}
              <a href="#bw-faq">Brand Design Wizard → Troubleshooting</a> and{' '}
              <a href="#cw-faq">Content Wizard → Troubleshooting</a>.
            </p>
          </section>

          <section className="doc-section doc-section-feedback" id="docs-feedback">
            <div className="card card-muted">
              <h2 style={{ fontSize: '1.15rem', margin: '0 0 0.5rem' }}>Was this helpful?</h2>
              <p style={{ margin: '0 0 1rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
                Feedback widgets will land here so we can improve outdated steps. For now, start
                from the wizards or browse the FAQ.
              </p>
              <div className="doc-feedback-actions">
                <button type="button" className="btn btn-secondary btn-sm" disabled title="Coming soon">
                  👍 Helpful
                </button>
                <button type="button" className="btn btn-secondary btn-sm" disabled title="Coming soon">
                  👎 Not helpful
                </button>
                <Link to="/faq" className="btn btn-primary btn-sm">
                  Browse FAQ
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

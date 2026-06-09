import { Link } from 'react-router-dom';

const STEPS = [
  [1, 'Download and extract', 'Download the template bundle and extract all files to your local machine.'],
  [2, 'Choose your template', 'Browse the gallery and select the template that best fits your campaign.'],
  [3, 'Customize content', 'Edit text, images, and colors to match your brand guidelines.'],
  [4, 'Upload to ESP', 'Copy the HTML code and paste it into your email service provider.'],
] as const;

export function DocsPage() {
  return (
    <main className="container">
      <div className="page-hero">
        <h1>Documentation</h1>
        <p>Complete guide to implementing, customizing, and troubleshooting your email templates.</p>
      </div>

      <div className="docs-layout">
        <aside className="docs-nav">
          <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>On this page</strong>
          <a href="#getting-started">Getting started</a>
          <a href="#structure">Template structure</a>
          <a href="#customization">Customization</a>
          <a href="#esp">ESP integration</a>
          <a href="#troubleshooting">Troubleshooting</a>
          <a href="#brand-wizard">Brand wizard</a>
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
            <div className="tip-box">
              <strong>Pro tip</strong>
              <p style={{ margin: '0.35rem 0 0', fontSize: '0.9rem', color: '#1e40af' }}>Always test templates in multiple email clients before sending. Use Litmus or Email on Acid for comprehensive QA.</p>
            </div>
          </section>

          <section className="doc-section" id="structure">
            <h2>Template structure</h2>
            <div className="card">
              <p>Each template uses a <strong>600px table-based layout</strong> with modular sections marked by HTML comments (e.g. <code>Component start Header</code>). Editable regions use <code>data-element</code> attributes for the visual builder.</p>
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
              <p>Colors and fonts are applied via inline styles. Search for hex values or swap brand tokens from your <code>DESIGN_RULES.md</code> file.</p>
              <p style={{ marginTop: '1rem' }}>Use the <Link to="/brand-wizard">Brand Design Wizard</Link> to define primary colors, logo URL, footer info, and button styles, then export a markdown spec for your team.</p>
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
                  <dd>Avoid margins on table rows; use padding on <code>&lt;td&gt;</code> cells instead.</dd>
                </div>
                <div className="faq-item">
                  <dt>Buttons look wrong in Outlook</dt>
                  <dd>Ensure VML fallback blocks are present for bulletproof buttons.</dd>
                </div>
              </dl>
            </div>
          </section>

          <section className="doc-section" id="brand-wizard">
            <h2>Brand Design Wizard</h2>
            <div className="card card-muted">
              <p>Define your baseline brand identity with color pickers, logo settings, footer details, and typography, then export <code>DESIGN_RULES.md</code>.</p>
              <Link to="/brand-wizard" className="btn btn-primary" style={{ marginTop: '1rem' }}>Open Brand Wizard</Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

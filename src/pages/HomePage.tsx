import { Link } from 'react-router-dom';
import { TESTIMONIALS } from '../data/testimonials';
import { FAQ_CATEGORIES } from '../data/faq';

const PREVIEW_TESTIMONIALS = TESTIMONIALS.slice(0, 3);
const PREVIEW_FAQS = FAQ_CATEGORIES[0].items.slice(0, 2).concat(FAQ_CATEGORIES[1].items.slice(0, 2));

const FEATURES = [
  ['Save time', 'Launch campaigns in minutes instead of days. Skip the long design and QA cycles.'],
  ['Look professional', 'Modern, conversion-focused designs that elevate your brand.'],
  ['Easy implementation', 'Clean code, commented, and ESP-ready for Salesforce, Klaviyo, Mailchimp.'],
  ['Fully responsive', 'Mobile-first layouts tested across devices and clients.'],
];

const TUTORIALS = [
  'Interior design company email',
  'Ecommerce store email',
  'Product launch email',
];

const HIGHLIGHTS = [
  ['Bulletproof buttons', 'VML buttons for Outlook and standard anchors for other clients so CTAs look consistent everywhere.'],
  ['Table-based layout', 'Hybrid table layout & inline CSS to maximize compatibility across ESPs and clients.'],
  ['ESP compatibility', 'Copy-paste ready for Salesforce Marketing Cloud, Klaviyo, Mailchimp, HubSpot, and more.'],
];

const DOCS = [
  ['Getting started', 'Open the template, edit copy & images, and upload to your ESP.'],
  ['Customization', 'Change colors, fonts, and sections. All styles are inlined and commented.'],
  ['Troubleshooting', 'Common fixes for images, spacing, and Outlook rendering quirks.'],
];

export function HomePage() {
  return (
    <main>
      <section className="hero-split">
        <div className="hero-copy">
          <div className="hero-copy-inner">
            <h1>Craft Beautiful Email Templates in Minutes</h1>
            <p>Professional email templates that work everywhere. No coding required. Build, customize, and export stunning emails that convert.</p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg">Browse template bundles</Link>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="email-mockup glass-card">
            <div className="email-mockup-bar" />
            <div className="email-mockup-body">
              <div className="email-mockup-logo">MS</div>
              <h3>Your next campaign</h3>
              <p>ESP-ready HTML that renders consistently across clients.</p>
              <Link to="/products" className="email-mockup-cta">Start Now</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container grid-2">
          <div>
            <h2 className="section-title">Stop wasting hours designing emails from scratch</h2>
            <p>Outlook breaks designs, inconsistent branding dilutes trust, and slow QA cycles stall campaigns. Our bundle solves those problems with pre-tested templates tailored for eCommerce and B2B use cases.</p>
            <ul className="feature-list">
              <li>Pre-tested across major clients (Outlook, Gmail, Apple Mail)</li>
              <li>Modular sections for flexible layouts</li>
              <li>Inline CSS &amp; table-based structure for ESP compatibility</li>
            </ul>
          </div>
          <div className="card card-muted">
            <h4>Templates included</h4>
            <ul className="feature-list">
              <li>Welcome series • Abandoned cart • Product launch</li>
              <li>Sale / Promotion • Order confirmation • Shipping update</li>
              <li>Re-engagement • Feedback request • Holiday campaigns</li>
            </ul>
            <Link to="#templates" className="btn btn-primary" style={{ marginTop: '1.25rem' }}>View gallery</Link>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container grid-2">
          <div>
            <p className="showcase-badge">See it in action</p>
            <h2 className="section-title">The experience of building a template, end to end</h2>
            <p>Watch teams go from a blank canvas to a polished, client-ready email. Structure, styling, and checks all happen in one builder.</p>
            <ul className="feature-list">
              <li>Interior design company email · <Link to="/docs">Watch tutorial</Link></li>
              <li>Ecommerce store email · <Link to="/docs">Watch tutorial</Link></li>
              <li>Product launch email · <Link to="/docs">Watch tutorial</Link></li>
            </ul>
          </div>
          <div className="video-frame">Template builder preview</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Key benefits</h2>
          <div className="grid-4 mt-8" style={{ marginTop: '1.5rem' }}>
            {FEATURES.map(([title, desc]) => (
              <div key={title} className="card">
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="templates">
        <div className="container">
          <h2 className="section-title">View Tutorials</h2>
          <p className="section-lead">All templates come as editable HTML files with modular sections.</p>
          <div className="grid-3">
            {TUTORIALS.map((name) => (
              <article key={name} className="card template-card">
                <div className="template-thumb">{name}</div>
                <div className="card-body">
                  <h5>{name}</h5>
                  <p>Watch tutorial</p>
                </div>
              </article>
            ))}
          </div>
          <p className="text-center mt-8">
            <Link to="/products" className="btn btn-primary btn-lg">Browse products</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Technical highlights</h2>
          <div className="grid-3" style={{ marginTop: '1.5rem' }}>
            {HIGHLIGHTS.map(([title, desc]) => (
              <div key={title} className="card">
                <h5>{title}</h5>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white" id="docs-preview">
        <div className="container">
          <h2 className="section-title">Documentation &amp; Support</h2>
          <p className="section-lead">Step-by-step guides to import, edit, and send templates. Includes screenshots and troubleshooting tips.</p>
          <div className="grid-3">
            {DOCS.map(([title, desc]) => (
              <div key={title} className="card card-muted">
                <h5>{title}</h5>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <Link to="/docs" className="btn btn-secondary">Full documentation</Link>
            <Link to="/brand-wizard" className="btn btn-primary" style={{ marginLeft: '0.5rem' }}>Brand Design Wizard</Link>
          </p>
        </div>
      </section>

      <section className="section" id="testimonials">
        <div className="container">
          <div className="section-head-inline">
            <h2 className="section-title" style={{ margin: 0 }}>What customers say</h2>
            <Link to="/testimonials" className="btn btn-secondary btn-sm">View all stories</Link>
          </div>
          <div className="grid-3" style={{ marginTop: '1.5rem' }}>
            {PREVIEW_TESTIMONIALS.map((item) => (
              <blockquote key={item.id} className="card">
                <p>&ldquo;{item.quote.length > 120 ? `${item.quote.slice(0, 120)}…` : item.quote}&rdquo;</p>
                <footer style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                  {item.name}, {item.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white" id="faq">
        <div className="container faq-list">
          <div className="section-head-inline">
            <h2 className="section-title" style={{ margin: 0 }}>Frequently asked questions</h2>
            <Link to="/faq" className="btn btn-secondary btn-sm">View all FAQs</Link>
          </div>
          <dl style={{ marginTop: '1.5rem' }}>
            {PREVIEW_FAQS.map((item) => (
              <div key={item.id} className="faq-item">
                <dt>{item.question}</dt>
                <dd>{item.answer.length > 160 ? `${item.answer.slice(0, 160)}…` : item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" id="get-started">
        <div className="container">
          <div className="card cta-card text-center">
            <h3 className="section-title" style={{ fontSize: '1.25rem' }}>Ready to define your brand?</h3>
            <p style={{ margin: '0 0 1.5rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
              Use the Brand Design Wizard to set colors, logo, footer details, and typography, then export DESIGN_RULES.md for your team.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link to="/brand-wizard" className="btn btn-primary btn-lg">Open Brand Wizard</Link>
              <Link to="/products" className="btn btn-secondary btn-lg">Browse products</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

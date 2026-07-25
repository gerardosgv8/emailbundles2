import { Link } from 'react-router-dom';
import { getFaqHomePreview } from '../data/faq';

const PREVIEW_FAQS = getFaqHomePreview();

const AUDIENCE = [
  [
    'Agencies',
    'Onboard a client brand once, apply it across the pack, then fill each send without rebuilding markup from scratch.',
  ],
  [
    'Freelancers & designers',
    'Deliver branded HTML faster. Export Design Rules so the client (or your future self) has one brand reference.',
  ],
  [
    'In-house marketers',
    'Keep logo, colors, and footer consistent while campaign copy changes every week. Brand and content stay separate on purpose.',
  ],
];

const WORKFLOW = [
  [
    '1',
    'Pick a bundle',
    'Choose Industrial B2B (9 templates) or the Email Marketing Starter Kit (11 templates) for the campaigns you actually send.',
  ],
  [
    '2',
    'Brand the pack',
    'Enter logo, colors, buttons, and footer in the Brand Wizard. Apply those tokens to a template zip in one pass.',
  ],
  [
    '3',
    'Fill the send',
    'Open the Content Wizard. Drop in headlines, body, CTAs, and images for one layout. Brand tokens stay untouched.',
  ],
  [
    '4',
    'Export & Send',
    'Grab your production-ready HTML, paste it into your ESP, and launch with total confidence across Gmail, Outlook, and Apple Mail.',
  ],
];

const MECHANISM = [
  [
    'Production HTML, not a mock',
    'Table-based layouts with inline styles and Outlook-friendly button fallbacks. What you customize is what you send.',
  ],
  [
    'Brand Wizard',
    'Define design tokens once. Apply them across the zip. Export Design Rules as your team’s brand handoff.',
  ],
  [
    'Content Wizard',
    'Fill campaign fields through forms. Hide optional blocks for this send. Download filled .html without hunting through markup.',
  ],
  [
    'ESP-ready output',
    'Paste the full file into Klaviyo, Mailchimp, HubSpot, Salesforce, or any platform that accepts custom HTML.',
  ],
];

const HIGHLIGHTS = [
  [
    'Outlook-aware CTAs',
    'VML fallbacks stay in the markup so primary buttons keep their shape in desktop Outlook.',
  ],
  [
    'Hooks the wizards understand',
    'Commented sections and data-element attributes let Brand and Content Wizards target the right nodes.',
  ],
  [
    'Clear split: design vs copy',
    'Brand tokens and campaign fields never fight each other. Change one without undoing the other.',
  ],
];

const DOCS = [
  ['Brand Design Wizard', 'Set tokens, apply a zip, export Design Rules.'],
  ['Content Wizard', 'Fill headings, body, and CTAs, then download filled HTML.'],
  ['ESP & troubleshooting', 'Upload tips, merge tags, images, and client quirks.'],
];

export function HomePage() {
  return (
    <main>
      <section className="hero-split">
        <div className="hero-copy">
          <div className="hero-copy-inner">
            <p className="hero-eyebrow">Mailcraft Studio</p>
            <h1>Ship high-quality emails in minutes</h1>
            <p>
              Production HTML templates plus Brand and Content Wizards. Brand the pack once, fill
              your campaign copy through forms, and download ESP-ready HTML. What used to take an
              afternoon of markup edits becomes a short, repeatable path.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg">
                Browse bundles
              </Link>
              <Link to="/brand-wizard" className="btn btn-secondary btn-lg">
                Try Brand Wizard
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="email-mockup glass-card">
            <div className="email-mockup-bar" />
            <div className="email-mockup-body">
              <h3>Minutes, not markup marathons</h3>
              <p>
                Brand once. Fill the send. Paste into your ESP. Same three steps every campaign.
              </p>
              <Link to="/docs#brand-wizard" className="email-mockup-cta">
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container grid-2">
          <div>
            <h2 className="section-title">The Plug-and-Play System for Professional Email Templates</h2>
            <p>
              You know the loop: open nine HTML files, paste the logo, chase hex codes, rewrite the
              footer, fix the button Outlook broke, and repeat it all next week.
            </p>
            <p>
              Templates alone don’t fix that. A repeatable brand and content engine does.
            </p>
            <ul className="feature-list">
              <li>
                <strong>One-Click Brand Pass:</strong> Update your brand system across the entire
                bundle, skipping the one-file-at-a-time grind.
              </li>
              <li>
                <strong>Structured Campaign Copy:</strong> Drop copy into dedicated fields. No
                fragile find-and-replace in messy HTML markup.
              </li>
              <li>
                <strong>Launch-Ready Frameworks:</strong> Production-ready layouts engineered for
                product launches, lifecycles, promos, and updates.
              </li>
            </ul>
          </div>
          <div className="card card-muted">
            <h4>What’s in a bundle</h4>
            <ul className="feature-list">
              <li>9 or 11 production HTML templates (by pack)</li>
              <li>Brand Design Wizard with zip apply and Design Rules export</li>
              <li>Content Wizard with filled .html download</li>
              <li>Docs for ESP upload, merge tags, and common fixes</li>
            </ul>
            <Link to="/products" className="btn btn-primary" style={{ marginTop: '1.25rem' }}>
              See pricing and packs
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <h2 className="section-title">How the system works</h2>
          <p className="section-lead">
            Four steps. Design and content stay separate on purpose, so branding stays consistent
            while each campaign stays quick to assemble.
          </p>
          <div className="grid-4 mc-stagger" style={{ marginTop: '1.5rem' }}>
            {WORKFLOW.map(([num, title, desc]) => (
              <div key={title} className="card card-quiet">
                <span className="workflow-step-num" aria-hidden="true">{num}</span>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <div className="hero-actions mt-8" style={{ justifyContent: 'center' }}>
            <Link to="/brand-wizard" className="btn btn-primary">
              Start with Brand Wizard
            </Link>
            <Link to="/content-wizard" className="btn btn-secondary">
              Or open Content Wizard
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Built for people who ship email for a living</h2>
          <div className="grid-3 mc-stagger" style={{ marginTop: '1.5rem' }}>
            {AUDIENCE.map(([title, desc]) => (
              <div key={title} className="card card-quiet">
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white" id="templates">
        <div className="container">
          <h2 className="section-title">The pieces that make the mechanism work</h2>
          <p className="section-lead">
            Every feature maps to a concrete outcome: fewer markup edits, consistent brand, faster
            path from brief to ESP.
          </p>
          <div className="grid-4 mc-stagger" style={{ marginTop: '1.5rem' }}>
            {MECHANISM.map(([title, desc]) => (
              <div key={title} className="card card-quiet">
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div>
            <p className="showcase-badge">Wizards</p>
            <h2 className="section-title">Brand Styles and Campaign Copy, Engineered by Design</h2>
            <p>
              The Brand Design Wizard locks logo, palette, buttons, and footer, then applies them
              to your templates. The Content Wizard handles headlines, body, CTAs, and images for
              the send you’re shipping next. You don’t undo brand work when copy changes.
            </p>
            <ul className="feature-list">
              <li>
                Brand Wizard guide · <Link to="/docs#brand-wizard">Read it</Link>
              </li>
              <li>
                Content Wizard guide · <Link to="/docs#content-wizard">Read it</Link>
              </li>
              <li>
                Full documentation · <Link to="/docs">Open docs</Link>
              </li>
            </ul>
          </div>
          <div className="video-frame" aria-hidden="true">
            Brand once. Fill copy. ESP.
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">Under the hood</h2>
          <p className="section-lead">
            The wizards sit on real production HTML. No throwaway mockups between you and the send.
          </p>
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

      <section className="section" id="docs-preview">
        <div className="container">
          <h2 className="section-title">Docs that follow the same path</h2>
          <p className="section-lead">
            Branding, filling copy, ESP upload, and the fixes you’ll hit on day two.
          </p>
          <div className="grid-3">
            {DOCS.map(([title, desc]) => (
              <div key={title} className="card card-muted">
                <h5>{title}</h5>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <div className="hero-actions mt-8" style={{ justifyContent: 'center' }}>
            <Link to="/docs" className="btn btn-secondary">
              Full documentation
            </Link>
            <Link to="/faq" className="btn btn-primary">
              Browse FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials section saved for later. See TestimonialsPage + data/testimonials.ts */}

      <section className="section section-white" id="faq">
        <div className="container faq-list">
          <div className="section-head-inline">
            <h2 className="section-title" style={{ margin: 0 }}>
              Frequently asked questions
            </h2>
            <Link to="/faq" className="btn btn-secondary btn-sm">
              View all FAQs
            </Link>
          </div>
          <dl style={{ marginTop: '1.5rem' }}>
            {PREVIEW_FAQS.map((item) => (
              <div key={item.id} className="faq-item">
                <dt>
                  <Link to={`/faq#${item.id}`}>{item.question}</Link>
                </dt>
                <dd>{item.answer.length > 140 ? `${item.answer.slice(0, 140)}…` : item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" id="get-started">
        <div className="container">
          <div className="card cta-card text-center">
            <h3 className="section-title" style={{ fontSize: '1.25rem' }}>
              Ready to ship your next email in minutes?
            </h3>
            <p style={{ margin: '0 0 1.5rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
              Pick a pack, brand it once, fill the send, and download ESP-ready HTML. Industrial B2B
              or Email Marketing Starter Kit. $79.99 per bundle.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link to="/products" className="btn btn-primary btn-lg">
                Browse bundles
              </Link>
              <Link to="/brand-wizard" className="btn btn-secondary btn-lg">
                Try Brand Wizard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

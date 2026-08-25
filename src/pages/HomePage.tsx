import { Link } from 'react-router-dom';
import { getFaqHomePreview } from '../data/faq';
import { storefrontBrandWizardPath } from '../brand-wizard/wizardRoute';
import { storefrontContentWizardPath } from '../content-wizard/contentWizardRoute';
import { assetUrl } from '../lib/assetUrl';
import { resolveWizardHref } from '../lib/wizardNav';
import { useWizardAccess } from '../wizard-access/WizardAccessProvider';

const PREVIEW_FAQS = getFaqHomePreview();

const AUDIENCE = [
  {
    title: 'Agencies',
    desc: 'Onboard a client brand once, apply it across the pack, then fill each send without rebuilding markup from scratch.',
    icon: 'agencies' as const,
  },
  {
    title: 'Freelancers & designers',
    desc: 'Deliver branded HTML faster. Export Design Rules so the client (or your future self) has one brand reference.',
    icon: 'freelancers' as const,
  },
  {
    title: 'In-house marketers',
    desc: 'Keep logo, colors, and footer consistent while campaign copy changes every week. Brand and content stay separate on purpose.',
    icon: 'marketers' as const,
  },
];

function AudienceIcon({ name }: { name: (typeof AUDIENCE)[number]['icon'] }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: '0 0 28 28',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true as const,
  };

  if (name === 'agencies') {
    return (
      <svg {...common}>
        <path
          d="M5 23V9.5L14 5l9 4.5V23"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M10 23V14h8v9" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M12.5 17h3M12.5 20h3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === 'freelancers') {
    return (
      <svg {...common}>
        <path
          d="M7 21l1.2-4.2L18.8 6.2a2.1 2.1 0 0 1 3 3L11.2 19.8 7 21z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M16.5 8.5l3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M6 24h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="4.5" y="7" width="19" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M4.5 11.5h19" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="8.5" cy="9.2" r="0.9" fill="currentColor" />
      <circle cx="11.5" cy="9.2" r="0.9" fill="currentColor" />
      <path
        d="M10 16.5l2.2 2.2 5.3-5.3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SYSTEM = [
  [
    '1',
    'Pick the kit',
    'Get the Email Marketing Starter Kit (11 templates). You’re working in production HTML: table layouts, inline styles, Outlook-friendly CTAs, not a mock that dies at send time.',
  ],
  [
    '2',
    'Brand the pack',
    'Set logo, colors, buttons, and footer once in Brand Wizard. Apply those tokens across the zip in one pass, then export Design Rules so the brand handoff isn’t tribal knowledge.',
  ],
  [
    '3',
    'Fill the send',
    'Open Content Wizard and drop in headlines, body, CTAs, and images through forms. Hide optional blocks for this campaign. Brand tokens stay untouched on purpose.',
  ],
  [
    '4',
    'Export & send',
    'Download the filled HTML and paste it into Klaviyo, Mailchimp, HubSpot, Salesforce, or any ESP that accepts custom HTML. Same path every week.',
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
  const { status } = useWizardAccess();
  const isAuthenticated = status === 'authenticated';
  const brandWizardTo = resolveWizardHref(storefrontBrandWizardPath(), isAuthenticated);
  const contentWizardTo = resolveWizardHref(storefrontContentWizardPath(), isAuthenticated);

  return (
    <main>
      <section className="hero-split">
        <div className="hero-copy">
          <div className="hero-copy-inner">
            <p className="hero-eyebrow">Mailcraft Studio</p>
            <h1>Design high-quality emails in minutes</h1>
            <p>
              Production HTML templates plus Brand and Content Wizards. Brand the pack once, fill
              your campaign copy through forms, and download ESP-ready HTML. What used to take an
              afternoon of markup edits becomes a short, repeatable path.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg btn-glow">
                View the kit
              </Link>
              <Link to={brandWizardTo} className="btn btn-secondary btn-lg">
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
          <div>
            <div className="video-frame video-frame-natural">
              <video
                src={assetUrl('images/Walkthrough.mp4')}
                autoPlay
                loop
                muted
                playsInline
                aria-label="Walkthrough of branding and filling email templates in Mailcraft Studio"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted" id="templates">
        <div className="container">
          <h2 className="section-title">How the system works</h2>
          <p className="section-lead">
            Four steps from bundle to ESP. Brand and content stay separate so design stays consistent
            while each campaign stays quick to assemble, and what you customize is what you send.
          </p>
          <div className="grid-4 mc-stagger" style={{ marginTop: '1.5rem' }}>
            {SYSTEM.map(([num, title, desc]) => (
              <div key={title} className="card card-quiet">
                <span className="workflow-step-num" aria-hidden="true">{num}</span>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <div className="hero-actions mt-8" style={{ justifyContent: 'center' }}>
            <Link to={brandWizardTo} className="btn btn-primary">
              Start with Brand Wizard
            </Link>
            <Link to={contentWizardTo} className="btn btn-secondary">
              Or open Content Wizard
            </Link>
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
          <div className="image-placeholder" aria-hidden="true">
            Image placeholder
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title text-center">Built for people who ship email for a living</h2>
          <div className="grid-3 mc-stagger" style={{ marginTop: '1.5rem' }}>
            {AUDIENCE.map(({ title, desc, icon }) => (
              <div key={title} className="card card-quiet audience-card">
                <div className="audience-icon" aria-hidden="true">
                  <AudienceIcon name={icon} />
                </div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
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
              Pick the Email Marketing Starter Kit, brand it once, fill the send, and download
              ESP-ready HTML. $79.99.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link to="/products" className="btn btn-primary btn-lg">
                View the kit
              </Link>
              <Link to={brandWizardTo} className="btn btn-secondary btn-lg">
                Try Brand Wizard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

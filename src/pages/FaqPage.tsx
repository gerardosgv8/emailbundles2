import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AccordionGroup } from '../components/Accordion';
import { FAQ_CATEGORIES, FAQ_QUICK_LINKS } from '../data/faq';
import { storefrontBrandWizardPath } from '../brand-wizard/wizardRoute';
import { storefrontContentWizardPath } from '../content-wizard/contentWizardRoute';
import { resolveWizardHref } from '../lib/wizardNav';
import { useWizardAccess } from '../wizard-access/WizardAccessProvider';

export function FaqPage() {
  const [query, setQuery] = useState('');
  const { status } = useWizardAccess();
  const isAuthenticated = status === 'authenticated';
  const brandWizardTo = resolveWizardHref(storefrontBrandWizardPath(), isAuthenticated);
  const contentWizardTo = resolveWizardHref(storefrontContentWizardPath(), isAuthenticated);

  const matchCount = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ_CATEGORIES.reduce((sum, cat) => sum + cat.items.length, 0);
    return FAQ_CATEGORIES.reduce(
      (sum, cat) =>
        sum
        + cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q),
        ).length,
      0,
    );
  }, [query]);

  const hasResults = matchCount > 0;

  return (
    <main>
      <section className="page-banner page-banner-faq">
        <div className="container">
          <p className="page-eyebrow">Help center</p>
          <h1>Frequently asked questions</h1>
          <p className="page-banner-lead">
            Answers on branding the pack, filling the send, ESP upload, and sending. Search or
            browse a category to jump straight to a fix.
          </p>
          <div className="faq-search-wrap">
            <label htmlFor="faq-search" className="sr-only">
              Search FAQs
            </label>
            <input
              id="faq-search"
              type="search"
              className="faq-search"
              placeholder="Search… e.g. Outlook, unsubscribe, Content Wizard"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            <span className="faq-search-meta">
              {query.trim()
                ? `${matchCount} result${matchCount === 1 ? '' : 's'}`
                : `${matchCount} questions`}
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-page-layout">
          <aside className="faq-sidebar">
            <strong className="faq-sidebar-label">Categories</strong>
            <nav aria-label="FAQ categories">
              {FAQ_QUICK_LINKS.map(({ id, title }) => (
                <a key={id} href={`#${id}`}>
                  {title}
                </a>
              ))}
            </nav>
            <div className="faq-sidebar-card">
              <strong>Still need help?</strong>
              <p>
                Full walkthroughs live in Documentation. For order or download issues, include
                your receipt in your message.
              </p>
              <Link to="/docs" className="btn btn-primary btn-sm">
                View documentation
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-sm faq-sidebar-secondary">
                Contact
              </Link>
            </div>
          </aside>

          <div className="faq-main">
            {!hasResults ? (
              <div className="card card-muted faq-empty">
                <h2>No matches found</h2>
                <p>
                  Try Outlook, unsubscribe, Brand Wizard, Content Wizard, download, or mobile.
                </p>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setQuery('')}>
                  Clear search
                </button>
              </div>
            ) : (
              <AccordionGroup categories={FAQ_CATEGORIES} filter={query} />
            )}
          </div>
        </div>
      </section>

      <section className="section section-white" id="faq-escalation">
        <div className="container">
          <div className="card faq-escalation-card">
            <div>
              <h2>Still need help?</h2>
              <p>
                If your question isn’t listed, check the docs for step-by-step wizard guides, or
                contact us with what you tried and your order number (if you have one).
              </p>
            </div>
            <div className="faq-escalation-actions">
              <Link to="/docs" className="btn btn-primary">
                Read documentation
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Contact
              </Link>
            </div>
          </div>

          <div className="grid-3" style={{ marginTop: '1.5rem' }}>
            <div className="card card-muted">
              <h3>Brand Design Wizard</h3>
              <p>Apply logo, colors, and footer tokens across a template bundle.</p>
              <Link to={brandWizardTo} className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>
                Open Brand Wizard
              </Link>
            </div>
            <div className="card card-muted">
              <h3>Content Wizard</h3>
              <p>Fill headlines, body, and CTAs, then download filled HTML.</p>
              <Link to={contentWizardTo} className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>
                Open Content Wizard
              </Link>
            </div>
            <div className="card card-muted">
              <h3>Email Marketing Starter Kit</h3>
              <p>Eleven production templates for welcome, cart recovery, launches, and more.</p>
              <Link to="/products" className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>
                View product
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

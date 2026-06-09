import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AccordionGroup } from '../components/Accordion';
import { FAQ_CATEGORIES, FAQ_QUICK_LINKS } from '../data/faq';

export function FaqPage() {
  const [query, setQuery] = useState('');

  const matchCount = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ_CATEGORIES.reduce((sum, cat) => sum + cat.items.length, 0);
    return FAQ_CATEGORIES.reduce(
      (sum, cat) => sum + cat.items.filter(
        (item) => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q),
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
            Everything you need to know about templates, customization, ESP setup, and the Brand Design Wizard.
          </p>
          <div className="faq-search-wrap">
            <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
            <input
              id="faq-search"
              type="search"
              className="faq-search"
              placeholder="Search questions… e.g. Outlook, Klaviyo, mobile"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="faq-search-meta">
              {query.trim() ? `${matchCount} result${matchCount === 1 ? '' : 's'}` : `${matchCount} articles`}
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
                <a key={id} href={`#${id}`}>{title}</a>
              ))}
            </nav>
            <div className="faq-sidebar-card">
              <strong>Still need help?</strong>
              <p>Our documentation covers setup, customization, and troubleshooting in depth.</p>
              <Link to="/docs" className="btn btn-primary btn-sm">View documentation</Link>
            </div>
          </aside>

          <div className="faq-main">
            {!hasResults ? (
              <div className="card card-muted faq-empty">
                <h2>No matches found</h2>
                <p>Try a different keyword like Outlook, merge tags, mobile, or brand wizard.</p>
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

      <section className="section section-white">
        <div className="container">
          <div className="grid-3">
            <div className="card card-muted">
              <h3>Documentation</h3>
              <p>Step-by-step guides for importing, editing, and sending templates.</p>
              <Link to="/docs" className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>Read docs</Link>
            </div>
            <div className="card card-muted">
              <h3>Brand Design Wizard</h3>
              <p>Define colors, logo, footer, and typography, then export DESIGN_RULES.md.</p>
              <Link to="/brand-wizard" className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>Open wizard</Link>
            </div>
            <div className="card card-muted">
              <h3>Template bundles</h3>
              <p>eCommerce, B2B, and starter packs built for real campaigns.</p>
              <Link to="/products" className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>View products</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

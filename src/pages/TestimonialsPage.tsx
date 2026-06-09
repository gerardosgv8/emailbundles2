import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  INDUSTRY_LABELS,
  TESTIMONIALS,
  TESTIMONIAL_STATS,
  TRUSTED_BY,
  type Testimonial,
} from '../data/testimonials';

type IndustryFilter = Testimonial['industry'] | 'all';

function initials(name: string) {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="testimonial-card">
      {item.metric ? <span className="testimonial-metric">{item.metric}</span> : null}
      <blockquote>
        <p>&ldquo;{item.quote}&rdquo;</p>
      </blockquote>
      <footer className="testimonial-author">
        <span className="testimonial-avatar" aria-hidden="true">{initials(item.name)}</span>
        <div>
          <strong>{item.name}</strong>
          <span>{item.role}, {item.company}</span>
          <span className="testimonial-industry">{INDUSTRY_LABELS[item.industry]}</span>
        </div>
      </footer>
    </article>
  );
}

export function TestimonialsPage() {
  const [filter, setFilter] = useState<IndustryFilter>('all');
  const featured = TESTIMONIALS.find((t) => t.featured) ?? TESTIMONIALS[0];

  const filtered = useMemo(
    () => (filter === 'all' ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.industry === filter)),
    [filter],
  );

  const filters: { id: IndustryFilter; label: string }[] = [
    { id: 'all', label: 'All industries' },
    { id: 'ecommerce', label: 'eCommerce' },
    { id: 'b2b', label: 'B2B' },
    { id: 'agency', label: 'Agency' },
    { id: 'saas', label: 'SaaS' },
  ];

  return (
    <main>
      <section className="page-banner page-banner-testimonials">
        <div className="container">
          <p className="page-eyebrow">Customer stories</p>
          <h1>Teams ship faster with Mailcraft</h1>
          <p className="page-banner-lead">
            From two-person startups to enterprise field marketing teams, see how people cut design time,
            fix Outlook issues, and launch campaigns with confidence.
          </p>
        </div>
      </section>

      <section className="section section-white">
        <div className="container stats-row">
          {TESTIMONIAL_STATS.map(({ value, label }) => (
            <div key={label} className="stat-card">
              <span className="stat-value">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className="featured-testimonial">
            <div className="featured-testimonial-content">
              <span className="featured-badge">Featured story</span>
              {featured.metric ? <span className="testimonial-metric">{featured.metric}</span> : null}
              <blockquote>
                <p>&ldquo;{featured.quote}&rdquo;</p>
              </blockquote>
              <footer className="testimonial-author">
                <span className="testimonial-avatar testimonial-avatar-lg" aria-hidden="true">
                  {initials(featured.name)}
                </span>
                <div>
                  <strong>{featured.name}</strong>
                  <span>{featured.role}, {featured.company}</span>
                </div>
              </footer>
            </div>
            <aside className="featured-testimonial-aside" aria-label="Results summary">
              <h2>Why it worked</h2>
              <ul className="feature-list">
                <li>Salesforce-ready HTML with no layout breaks on import</li>
                <li>Product launch series deployed in one afternoon</li>
                <li>Measurable CTR improvement within 30 days</li>
              </ul>
            </aside>
          </article>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-head-row">
            <div>
              <h2 className="section-title">More customer stories</h2>
              <p className="section-lead">Filter by industry to find stories relevant to your team.</p>
            </div>
            <div className="filter-pills" role="tablist" aria-label="Filter testimonials">
              {filters.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={filter === id}
                  className={`filter-pill${filter === id ? ' active' : ''}`}
                  onClick={() => setFilter(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="testimonial-grid">
            {filtered.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container text-center">
          <p className="showcase-badge">Trusted by marketing teams at</p>
          <div className="logo-cloud">
            {TRUSTED_BY.map((name) => (
              <span key={name} className="logo-cloud-item">{name}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card cta-card text-center">
            <h2 className="section-title" style={{ fontSize: '1.35rem' }}>Ready to see it yourself?</h2>
            <p style={{ margin: '0 0 1.5rem', color: 'var(--muted)' }}>
              Define your brand with the wizard, pick a bundle, and ship your next campaign this week.
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

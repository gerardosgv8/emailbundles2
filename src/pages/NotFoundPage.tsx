import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="not-found">
      <div className="not-found-inner">
        <div className="card not-found-card">
          <p className="not-found-code">404</p>
          <h1>Page not found</h1>
          <p className="not-found-lead">
            This link may be broken, or the page may have moved. Try one of the destinations below.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary btn-lg">
              Back to home
            </Link>
            <Link to="/products" className="btn btn-secondary btn-lg">
              Browse products
            </Link>
          </div>
          <nav className="not-found-links" aria-label="Helpful links">
            <Link to="/docs">Documentation</Link>
            <Link to="/brand-wizard">Brand Wizard</Link>
            <Link to="/faq">FAQ</Link>
          </nav>
        </div>
      </div>
    </main>
  );
}

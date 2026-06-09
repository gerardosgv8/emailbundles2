import { Link } from 'react-router-dom';
import { TEMPLATE_BUNDLES } from '../data/templateBundles';

export function ProductsPage() {
  return (
    <main className="container section">
      <div className="page-hero">
        <h1>Products</h1>
        <p>Template bundles and tools for teams who ship email campaigns without reinventing the wheel.</p>
      </div>

      <div className="product-grid">
        {TEMPLATE_BUNDLES.map((product) => (
          <article key={product.id} className="card product-card">
            <h3 style={{ margin: '0 0 0.5rem' }}>{product.name}</h3>
            <p>{product.description}</p>
            <p className="product-price">{product.price}</p>
            <ul className="product-features">
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            {product.wizardAvailable ? (
              <Link to={`/brand-wizard/${product.id}`} className="btn btn-primary">Get started</Link>
            ) : (
              <Link to="/brand-wizard" className="btn btn-primary">Get started</Link>
            )}
          </article>
        ))}

        <article className="card product-card">
          <h3 style={{ margin: '0 0 0.5rem' }}>Mailcraft Pro</h3>
          <p>Visual builder, saved templates, and component library access.</p>
          <p className="product-price">$19/mo</p>
          <ul className="product-features">
            <li>Drag-and-drop editor</li>
            <li>All template bundles</li>
            <li>Export HTML</li>
            <li>Priority support</li>
          </ul>
          <Link to="/brand-wizard" className="btn btn-primary">Get started</Link>
        </article>
      </div>

      <p className="text-center mt-8" style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
        Checkout and dynamic pricing will connect to the backend when ready.
      </p>
    </main>
  );
}

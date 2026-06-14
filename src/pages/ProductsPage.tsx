import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DownloadAccessNotice } from '../components/DownloadAccessNotice';
import { TEMPLATE_BUNDLES } from '../data/templateBundles';
import { startCheckout } from '../lib/checkout';
import { describeDownloadPolicy, fetchPurchasePolicy, type PurchasePolicy } from '../lib/purchasePolicy';

function BuyButton({ productId, label = 'Buy now' }: { productId: string; label?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async () => {
    setBusy(true);
    setError(null);
    try {
      const url = await startCheckout(productId);
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout unavailable');
      setBusy(false);
    }
  };

  return (
    <div className="product-buy">
      <button type="button" className="btn btn-primary" disabled={busy} onClick={handleBuy}>
        {busy ? 'Redirecting…' : label}
      </button>
      {error ? <p className="product-buy-error">{error}</p> : null}
    </div>
  );
}

export function ProductsPage() {
  const [policy, setPolicy] = useState<PurchasePolicy | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchPurchasePolicy()
      .then((result) => {
        if (!cancelled) setPolicy(result);
      })
      .catch(() => {
        /* Non-blocking — footer falls back to generic copy */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="container section">
      <div className="page-hero">
        <h1>Products</h1>
        <p>Template bundles and tools for teams who ship email campaigns without reinventing the wheel.</p>
      </div>

      <div className="product-grid">
        {TEMPLATE_BUNDLES.map((product) => (
          <article key={product.id} className="card product-card">
            <div className="product-card-image">
              <img src={product.imageUrl} alt={product.imageAlt} loading="lazy" />
            </div>
            <div className="product-card-body">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="product-price">{product.price}</p>
              <ul className="product-features">
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="product-card-actions">
                {product.checkoutProductId ? (
                  <BuyButton productId={product.checkoutProductId} />
                ) : null}
                {product.wizardAvailable ? (
                  <Link to={`/brand-wizard/${product.id}`} className="btn btn-secondary">
                    Brand Wizard
                  </Link>
                ) : (
                  <Link to="/brand-wizard" className="btn btn-secondary">
                    Brand Wizard
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {policy ? <DownloadAccessNotice policy={policy} variant="info" /> : null}

      <p className="products-checkout-note">
        Secure checkout powered by Stripe.
        {policy ? (
          <>
            {' '}
            After payment, downloads are delivered via personal links — {describeDownloadPolicy(policy)}.
          </>
        ) : (
          <> Downloads are delivered via time-limited personal links after payment.</>
        )}
      </p>
    </main>
  );
}

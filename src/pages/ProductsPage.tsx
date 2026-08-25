import { useState } from 'react';
import { TEMPLATE_BUNDLES } from '../data/templateBundles';
import { getApiBase } from '../lib/apiBase';

function BuyButton({
  productId = 'email-marketing-starter-kit',
  label = 'Buy now',
}: {
  productId?: string;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async () => {
    setBusy(true);
    setError(null);

    try {
      const response = await fetch(`${getApiBase()}/api/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error ?? 'Checkout is temporarily unavailable.');
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout is temporarily unavailable.');
      setBusy(false);
    }
  };

  return (
    <div className="product-buy">
      <button type="button" className="btn btn-primary btn-lg" onClick={handleBuy} disabled={busy}>
        {busy ? 'Opening checkout…' : label}
      </button>
      {error ? <p className="product-buy-error">{error}</p> : null}
    </div>
  );
}

export function ProductsPage() {
  const product = TEMPLATE_BUNDLES[0];

  if (!product) {
    return (
      <main className="container section">
        <div className="page-hero">
          <h1>Products</h1>
          <p>No products are available right now. Check back soon.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container section products-page">
      <div className="page-hero products-page-hero">
        <p className="products-eyebrow">Template kit</p>
        <h1>{product.name}</h1>
        <p>
          Production HTML plus Brand and Content Wizards. Brand the zip once, fill the send, and
          download HTML you paste into your ESP.
        </p>
      </div>

      <article className="product-featured">
        <div className="product-featured-media">
          <img src={product.imageUrl} alt={product.imageAlt} loading="lazy" />
        </div>
        <div className="product-featured-body">
          <p className="product-featured-desc">{product.description}</p>
          <p className="product-price">{product.price}</p>
          <ul className="product-features">
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="product-featured-actions">
            {product.checkoutProductId ? (
              <BuyButton productId={product.checkoutProductId} />
            ) : null}
          </div>
        </div>
      </article>

      <p className="products-checkout-note">
        Secure checkout powered by Lemon Squeezy. After payment, check the receipt email from
        Lemon Squeezy for your files.
      </p>
    </main>
  );
}

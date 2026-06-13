import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { verifyPurchaseSession, type VerifiedPurchase } from '../lib/checkout';

export function PurchaseSuccessPage() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id') ?? '';
  const [purchase, setPurchase] = useState<VerifiedPurchase | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setError('Missing checkout session. Return to products and try again.');
      setLoading(false);
      return;
    }

    let cancelled = false;

    verifyPurchaseSession(sessionId)
      .then((result) => {
        if (!cancelled) setPurchase(result);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not verify your purchase.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <main className="container section">
      <div className="page-hero">
        <h1>Thank you for your purchase</h1>
        {loading ? (
          <p>Verifying your payment and preparing your download…</p>
        ) : error ? (
          <>
            <p style={{ color: '#b45309' }}>{error}</p>
            <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Back to products
            </Link>
          </>
        ) : purchase ? (
          <>
            <p>
              <strong>{purchase.productName}</strong> is ready. We sent a link to{' '}
              <strong>{purchase.email}</strong>
              {purchase.emailed ? '' : ' (email delivery is optional — use the button below)'}.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
              Transaction ID: <code>{purchase.transactionId}</code>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
              <a href={purchase.downloadUrl} className="btn btn-primary btn-lg">
                Download your files
              </a>
              <Link to="/brand-wizard" className="btn btn-secondary btn-lg">
                Open Brand Wizard
              </Link>
            </div>
            <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
              Download links expire after a limited time. Keep your receipt email for support.
            </p>
          </>
        ) : null}
      </div>
    </main>
  );
}

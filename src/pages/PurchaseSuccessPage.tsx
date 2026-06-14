import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { DownloadAccessNotice } from '../components/DownloadAccessNotice';
import { safeUserMessage } from '../lib/apiError';
import { getPurchaseDownloadUrl, verifyPurchaseSession, type VerifiedPurchase } from '../lib/checkout';
import { type PurchasePolicy } from '../lib/purchasePolicy';

const VERIFY_ERROR_FALLBACK =
  'We could not prepare your download right now. Try refreshing, or contact support with your receipt.';

function purchasePolicyFromOrder(purchase: VerifiedPurchase): PurchasePolicy | null {
  if (purchase.maxDownloads == null) {
    return null;
  }

  return {
    maxDownloads: purchase.maxDownloads,
    accessDays: purchase.downloadAccessDays ?? 7,
  };
}

export function PurchaseSuccessPage() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id') ?? '';
  const [purchase, setPurchase] = useState<VerifiedPurchase | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadPurchase = (id: string) => {
    setLoading(true);
    setError(null);
    setPurchase(null);

    return verifyPurchaseSession(id)
      .then((result) => setPurchase(result))
      .catch((err) => {
        const raw = err instanceof Error ? err.message : undefined;
        setError(safeUserMessage(raw, VERIFY_ERROR_FALLBACK));
      })
      .finally(() => setLoading(false));
  };

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
          const raw = err instanceof Error ? err.message : undefined;
          setError(safeUserMessage(raw, VERIFY_ERROR_FALLBACK));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const policy = purchase ? purchasePolicyFromOrder(purchase) : null;

  return (
    <main className="container section">
      <div className="page-hero purchase-success">
        <h1>{error ? 'Almost there' : 'Thank you for your purchase'}</h1>
        {loading ? (
          <p>Verifying your payment and preparing your download…</p>
        ) : error ? (
          <>
            <p className="purchase-success-error">{error}</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
              If you were charged, your receipt email may still include a download link once processing
              finishes.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
              {sessionId ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => loadPurchase(sessionId)}
                  disabled={loading}
                >
                  {loading ? 'Checking…' : 'Try again'}
                </button>
              ) : null}
              <Link to="/products" className="btn btn-secondary">
                Back to products
              </Link>
            </div>
          </>
        ) : purchase ? (
          <>
            <p className="purchase-success-lead">
              <strong>{purchase.productName}</strong> is ready.
              {purchase.emailed ? (
                <>
                  {' '}
                  We sent a download link to <strong>{purchase.email}</strong> — check your inbox
                  (and spam folder).
                </>
              ) : (
                <>
                  {' '}
                  Use the button below to download your files
                  {purchase.email ? (
                    <>
                      {' '}
                      for <strong>{purchase.email}</strong>
                    </>
                  ) : null}
                  .
                </>
              )}
            </p>

            {policy ? (
              <DownloadAccessNotice
                policy={policy}
                downloadsRemaining={purchase.downloadsRemaining}
                accessExpiresAt={purchase.downloadAccessExpiresAt}
                variant="success"
              />
            ) : null}

            <p className="purchase-success-meta">
              Transaction ID: <code>{purchase.transactionId}</code>
            </p>

            <div className="purchase-success-actions">
              {purchase.downloadsRemaining === 0 ? (
                <span className="btn btn-primary btn-lg" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                  Download limit reached
                </span>
              ) : (
                <a
                  href={getPurchaseDownloadUrl(sessionId)}
                  className="btn btn-primary btn-lg"
                  rel="noopener noreferrer"
                >
                  Download your files
                </a>
              )}
              <Link to="/brand-wizard" className="btn btn-secondary btn-lg">
                Open Brand Wizard
              </Link>
            </div>

            <p className="purchase-success-footnote">
              Need another copy later? Use the link in your receipt email before your access window ends.
              Keep your transaction ID handy for support.
            </p>
          </>
        ) : null}
      </div>
    </main>
  );
}

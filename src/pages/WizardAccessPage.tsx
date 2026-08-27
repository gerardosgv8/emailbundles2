import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { storefrontBrandWizardPath } from '../brand-wizard/wizardRoute';
import { WizardUnlockIssueAlert } from '../components/WizardUnlockIssueAlert';
import { verifyPurchaseCredentials, type WizardUnlockIssue } from '../lib/wizardAccess';
import { WizardUnlockIssueError } from '../lib/wizardUnlockIssue';
import { useWizardAccess } from '../wizard-access/WizardAccessProvider';

function resolveReturnTo(raw: string | null): string {
  if (!raw?.startsWith('/')) {
    return storefrontBrandWizardPath();
  }
  if (raw.startsWith('/wizard-access')) {
    return storefrontBrandWizardPath();
  }
  return raw;
}

export function WizardAccessPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { status, session, logout, setSession } = useWizardAccess();
  const returnTo = resolveReturnTo(params.get('returnTo'));

  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [busy, setBusy] = useState(false);
  const [issue, setIssue] = useState<WizardUnlockIssue | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      navigate(returnTo, { replace: true });
    }
  }, [status, navigate, returnTo]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setIssue(null);
    setError(null);

    try {
      const next = await verifyPurchaseCredentials(email, orderId);
      setSession(next);
      navigate(returnTo, { replace: true });
    } catch (err) {
      if (err instanceof WizardUnlockIssueError) {
        setIssue(err.issue);
      } else {
        setError(err instanceof Error ? err.message : 'We could not verify that purchase.');
      }
    } finally {
      setBusy(false);
    }
  };

  if (status === 'loading') {
    return (
      <main className="container section">
        <p>Loading…</p>
      </main>
    );
  }

  if (status === 'authenticated' && session) {
    return (
      <main className="container section">
        <div className="card wizard-access-card">
          <h1>Wizard access active</h1>
          <p>
            Signed in as <strong>{session.email}</strong> (order #{session.orderId}).
          </p>
          <div className="wizard-access-actions">
            <Link to={storefrontBrandWizardPath()} className="btn btn-primary">
              Open Brand Wizard
            </Link>
            <button type="button" className="btn btn-secondary" onClick={logout}>
              Sign out
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="page-banner page-banner-contact">
        <div className="container">
          <p className="page-eyebrow">Buyers only</p>
          <h1>Unlock the wizards</h1>
          <p className="page-banner-lead">
            Enter the email and order number from your Lemon Squeezy receipt. Access lasts 7 days
            per browser (up to 2 browsers stay registered; unlocking on a new one replaces the
            oldest). Do not share your receipt.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container wizard-access-layout">
          <form className="card wizard-access-card" onSubmit={handleSubmit}>
            <h2>Verify your purchase</h2>
            <p className="wizard-access-lead">
              Use the same email you entered at checkout. Order number is in your receipt (numeric
              order id or order #).
            </p>

            <div className="form-grid">
              <label className="wizard-access-label" htmlFor="wizard-email">
                Email
              </label>
              <input
                id="wizard-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <label className="wizard-access-label" htmlFor="wizard-order">
                Order number
              </label>
              <input
                id="wizard-order"
                type="text"
                autoComplete="off"
                required
                placeholder="From your Lemon Squeezy receipt"
                value={orderId}
                onChange={(event) => setOrderId(event.target.value)}
              />
            </div>

            {issue ? <WizardUnlockIssueAlert issue={issue} /> : null}
            {!issue && error ? <p className="wizard-access-error">{error}</p> : null}

            <div className="wizard-access-actions">
              <button type="submit" className="btn btn-primary" disabled={busy}>
                {busy ? 'Verifying…' : 'Unlock wizards'}
              </button>
              <Link to="/products" className="btn btn-secondary">
                Buy the kit
              </Link>
            </div>
          </form>

          <aside className="card card-muted wizard-access-aside">
            <h2>Need help?</h2>
            <ul>
              <li>
                <Link to="/faq">FAQ</Link> covers wizard basics.
              </li>
              <li>
                <Link to="/contact">Contact</Link> if verification fails but you were charged.
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}

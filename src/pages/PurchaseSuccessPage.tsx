import { Link } from 'react-router-dom';
import { wizardAccessPath } from '../components/WizardGate';
import { storefrontBrandWizardPath } from '../brand-wizard/wizardRoute';

export function PurchaseSuccessPage() {
  const unlockPath = wizardAccessPath(storefrontBrandWizardPath());

  return (
    <main className="container section">
      <div className="page-hero purchase-success">
        <h1>Thank you for your purchase</h1>
        <p className="purchase-success-lead">
          Check the email from Lemon Squeezy for your receipt and files. To use the Brand and
          Content Wizards, unlock access with the same email and order number from that receipt.
        </p>
        <div className="purchase-success-actions">
          <Link to={unlockPath} className="btn btn-primary btn-lg">
            Unlock wizards
          </Link>
          <Link to="/contact" className="btn btn-secondary btn-lg">
            Contact
          </Link>
        </div>
        <p className="purchase-success-footnote">
          Wizard access lasts 7 days per browser (up to 2 browsers stay registered; a new one
          replaces the oldest). Keep your receipt
          private and{' '}
          <Link to="/contact">contact us</Link> if you need help.
        </p>
      </div>
    </main>
  );
}

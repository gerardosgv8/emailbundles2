import { Link } from 'react-router-dom';
import { storefrontBrandWizardPath } from '../brand-wizard/wizardRoute';
import { storefrontContentWizardPath } from '../content-wizard/contentWizardRoute';
import { resolveWizardHref } from '../lib/wizardNav';
import { useWizardAccess } from '../wizard-access/WizardAccessProvider';

export function Footer() {
  const year = new Date().getFullYear();
  const { status } = useWizardAccess();
  const isAuthenticated = status === 'authenticated';

  const brandWizardTo = resolveWizardHref(storefrontBrandWizardPath(), isAuthenticated);
  const contentWizardTo = resolveWizardHref(storefrontContentWizardPath(), isAuthenticated);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h5 className="footer-brand">
            <span className="logo-mark" aria-hidden="true" />
            Mailcraft Studio
          </h5>
          <p>
            Brand the pack once. Fill the send. Paste into your ESP. Production HTML plus Brand and
            Content Wizards.
          </p>
        </div>
        <div>
          <h6>Resources</h6>
          <ul>
            <li><Link to="/docs">Documentation</Link></li>
            <li><Link to={brandWizardTo}>Brand Design Wizard</Link></li>
            <li><Link to={contentWizardTo}>Content Wizard</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/wizard-access">Unlock wizards</Link></li>
          </ul>
        </div>
        <div>
          <h6>Legal</h6>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Refund Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          &copy; {year} Mailcraft Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import { SUPPORT_EMAIL, supportMailto } from '../data/contact';

export function ContactPage() {
  return (
    <main>
      <section className="page-banner page-banner-contact">
        <div className="container">
          <p className="page-eyebrow">Help</p>
          <h1>Contact</h1>
          <p className="page-banner-lead">
            Questions about the kit, a download, or the wizards? Email us and include what you
            already tried. For orders, add your receipt or transaction ID.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">
          <div className="card contact-panel">
            <h2>Email us</h2>
            <p>
              Write to <a href={supportMailto()}>{SUPPORT_EMAIL}</a>. We read every message. For a
              missing zip, include the checkout email and transaction ID from your receipt.
            </p>
            <a className="btn btn-primary" href={supportMailto()}>
              Email {SUPPORT_EMAIL}
            </a>
          </div>

          <aside className="contact-aside">
            <div className="card contact-aside-card">
              <h2>Before you write</h2>
              <ul>
                <li>
                  <Link to="/faq">FAQ</Link> covers downloads, Outlook, and wizard basics.
                </li>
                <li>
                  <Link to="/docs">Documentation</Link> has step-by-step Brand and Content Wizard
                  guides.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

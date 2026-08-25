import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { storefrontBrandWizardPath } from '../brand-wizard/wizardRoute';
import { storefrontContentWizardPath } from '../content-wizard/contentWizardRoute';
import { resolveWizardHref } from '../lib/wizardNav';
import { useWizardAccess } from '../wizard-access/WizardAccessProvider';

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { status } = useWizardAccess();
  const isAuthenticated = status === 'authenticated';

  const brandWizardTo = resolveWizardHref(storefrontBrandWizardPath(), isAuthenticated);
  const contentWizardTo = resolveWizardHref(storefrontContentWizardPath(), isAuthenticated);

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/products', label: 'Products' },
    { to: brandWizardTo, label: 'Brand Wizard' },
    { to: contentWizardTo, label: 'Content Wizard' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
    { to: '/docs', label: 'Docs' },
  ];

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="site-header" id="site-header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            <span className="logo-mark" aria-hidden="true" />
            Mailcraft Studio
          </Link>
          <nav className="nav-desktop" aria-label="Main">
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {label}
              </NavLink>
            ))}
            <Link to="/products" className="btn btn-primary btn-sm">
              View the kit
            </Link>
          </nav>
          <button
            type="button"
            className="nav-toggle"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>
      {!open ? null : (
        <div
          className="nav-overlay"
          role="presentation"
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
        />
      )}
      <aside className={`nav-drawer${open ? ' open' : ''}`} aria-hidden={!open}>
        <div className="nav-drawer-head">
          <strong>Menu</strong>
          <button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>&times;</button>
        </div>
        <nav className="nav-drawer-links">
          {navLinks.map(({ to, label }) => (
            <Link key={label} to={to}>{label}</Link>
          ))}
          <Link to="/products" className="btn btn-primary">
            View the kit
          </Link>
        </nav>
      </aside>
    </>
  );
}

import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
  { to: '/brand-wizard', label: 'Brand Wizard' },
  { to: '/content-wizard', label: 'Content Wizard' },
  // { to: '/testimonials', label: 'Testimonials' }, // saved for later
  { to: '/faq', label: 'FAQ' },
  { to: '/docs', label: 'Docs' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {label}
              </NavLink>
            ))}
            <Link to="/products" className="btn btn-primary btn-sm">
              Browse bundles
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
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to}>{label}</Link>
          ))}
          <Link to="/products" className="btn btn-primary">
            Browse bundles
          </Link>
        </nav>
      </aside>
    </>
  );
}

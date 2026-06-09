import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
  { to: '/brand-wizard', label: 'Brand Wizard' },
  { to: '/testimonials', label: 'Testimonials' },
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
            <span className="logo-mark">MS</span>
            <span className="logo-text">Mailcraft Studio</span>
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
        </nav>
      </aside>
    </>
  );
}

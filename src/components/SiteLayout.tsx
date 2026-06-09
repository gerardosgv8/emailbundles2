import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export function SiteLayout() {
  const { pathname } = useLocation();
  const isWizard = /^\/brand-wizard\/[^/]+$/.test(pathname);

  return (
    <>
      <Header />
      <Outlet />
      {isWizard ? null : <Footer />}
    </>
  );
}

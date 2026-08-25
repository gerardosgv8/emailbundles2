import { Navigate, useLocation } from 'react-router-dom';
import { useWizardAccess } from '../wizard-access/WizardAccessProvider';

export function wizardAccessPath(returnTo?: string): string {
  if (!returnTo || returnTo === '/wizard-access') {
    return '/wizard-access';
  }
  return `/wizard-access?returnTo=${encodeURIComponent(returnTo)}`;
}

export function WizardGate({ children }: { children: React.ReactNode }) {
  const { status } = useWizardAccess();
  const location = useLocation();

  if (status === 'loading') {
    return (
      <main className="container section wizard-access-loading">
        <p>Checking wizard access…</p>
      </main>
    );
  }

  if (status === 'unauthenticated') {
    return <Navigate to={wizardAccessPath(location.pathname)} replace />;
  }

  return children;
}

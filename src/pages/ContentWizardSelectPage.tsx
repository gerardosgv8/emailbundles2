import { Navigate } from 'react-router-dom';
import { storefrontContentWizardPath } from '../content-wizard/contentWizardRoute';

/** Bundle picker retired while only one kit is offered — jump straight into the wizard. */
export function ContentWizardSelectPage() {
  return <Navigate to={storefrontContentWizardPath()} replace />;
}

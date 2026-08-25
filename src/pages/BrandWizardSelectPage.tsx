import { Navigate } from 'react-router-dom';
import { storefrontBrandWizardPath } from '../brand-wizard/wizardRoute';

/** Bundle picker retired while only one kit is offered — jump straight into the wizard. */
export function BrandWizardSelectPage() {
  return <Navigate to={storefrontBrandWizardPath()} replace />;
}

import { wizardAccessPath } from '../components/WizardGate';

export function resolveWizardHref(targetPath: string, isAuthenticated: boolean): string {
  return isAuthenticated ? targetPath : wizardAccessPath(targetPath);
}

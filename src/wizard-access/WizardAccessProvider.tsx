import {
  clearWizardSession,
  readStoredWizardSession,
  validateWizardSession,
  type WizardSession,
} from '../lib/wizardAccess';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type WizardAccessState = {
  status: 'loading' | 'authenticated' | 'unauthenticated';
  session: WizardSession | null;
  refresh: () => Promise<void>;
  logout: () => void;
  setSession: (session: WizardSession) => void;
};

const WizardAccessContext = createContext<WizardAccessState | null>(null);

export function WizardAccessProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<WizardAccessState['status']>('loading');
  const [session, setSessionState] = useState<WizardSession | null>(null);

  const refresh = useCallback(async () => {
    const stored = readStoredWizardSession();
    if (!stored) {
      setSessionState(null);
      setStatus('unauthenticated');
      return;
    }

    const validated = await validateWizardSession(stored.token);
    if (!validated) {
      clearWizardSession();
      setSessionState(null);
      setStatus('unauthenticated');
      return;
    }

    const merged = { ...stored, ...validated, token: stored.token };
    setSessionState(merged);
    setStatus('authenticated');
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const logout = useCallback(() => {
    clearWizardSession();
    setSessionState(null);
    setStatus('unauthenticated');
  }, []);

  const setSession = useCallback((next: WizardSession) => {
    setSessionState(next);
    setStatus('authenticated');
  }, []);

  const value = useMemo(
    () => ({ status, session, refresh, logout, setSession }),
    [status, session, refresh, logout, setSession],
  );

  return <WizardAccessContext.Provider value={value}>{children}</WizardAccessContext.Provider>;
}

export function useWizardAccess(): WizardAccessState {
  const context = useContext(WizardAccessContext);
  if (!context) {
    throw new Error('useWizardAccess must be used within WizardAccessProvider');
  }
  return context;
}

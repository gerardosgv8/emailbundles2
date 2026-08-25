import { useEffect, type ReactNode } from 'react';
import { applyThemeToDocument, getSystemTheme } from './theme';

/** Keeps the document theme in sync with the OS appearance preference. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const sync = () => {
      applyThemeToDocument(getSystemTheme());
    };

    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return children;
}

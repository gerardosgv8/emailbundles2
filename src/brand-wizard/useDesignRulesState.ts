import { useCallback, useEffect, useState } from 'react';
import { getChecklistItems, getDefaultDesignRules, getStorageKey } from './defaults';
import type { DesignRulesField, DesignRulesState } from './types';

function loadState(bundleId: string): DesignRulesState {
  try {
    const raw = localStorage.getItem(getStorageKey(bundleId));
    const defaults = getDefaultDesignRules(bundleId);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<DesignRulesState>;
      const checklistItems = getChecklistItems(bundleId);
      return {
        ...defaults,
        ...parsed,
        checklist:
          parsed.checklist?.length === checklistItems.length ? parsed.checklist : defaults.checklist,
      };
    }
  } catch {
    /* ignore */
  }
  return getDefaultDesignRules(bundleId);
}

export function useDesignRulesState(bundleId: string) {
  const [state, setState] = useState<DesignRulesState>(() => loadState(bundleId));
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    setState(loadState(bundleId));
    setSavedAt(null);
  }, [bundleId]);

  useEffect(() => {
    localStorage.setItem(getStorageKey(bundleId), JSON.stringify(state));
    setSavedAt(new Date().toLocaleTimeString());
  }, [bundleId, state]);

  const setField = useCallback(<K extends DesignRulesField>(key: K, value: DesignRulesState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setChecklistItem = useCallback((index: number, checked: boolean) => {
    setState((prev) => {
      const checklist = [...prev.checklist];
      checklist[index] = checked;
      return { ...prev, checklist };
    });
  }, []);

  const resetDefaults = useCallback(() => {
    setState(getDefaultDesignRules(bundleId));
  }, [bundleId]);

  return { state, setField, setChecklistItem, resetDefaults, savedAt };
}

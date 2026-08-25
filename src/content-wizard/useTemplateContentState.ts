import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildDefaultVisibility,
  buildEmptyContentState,
  buildEmptyContentStore,
  getContentFieldsForTemplate,
} from './contentFieldSchema';
import { linkedVisibilityIds } from './contentVisibility';
import type {
  ContentFieldValue,
  TemplateContentState,
  TemplateContentStore,
  TemplateVisibilityState,
} from './types';

function storageKey(bundleId: string, templateFile: string): string {
  return `mailcraft-content-v2-${bundleId}-${templateFile}`;
}

function isLegacyFlatState(parsed: unknown): parsed is TemplateContentState {
  if (!parsed || typeof parsed !== 'object') return false;
  if ('values' in parsed || 'visibility' in parsed) return false;
  return true;
}

function loadStore(bundleId: string, templateFile: string): TemplateContentStore {
  const fields = getContentFieldsForTemplate(bundleId, templateFile);
  const empty = buildEmptyContentStore(fields);

  try {
    const raw = localStorage.getItem(storageKey(bundleId, templateFile));
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as TemplateContentStore | TemplateContentState;

    if (isLegacyFlatState(parsed)) {
      return { values: { ...empty.values, ...parsed }, visibility: empty.visibility };
    }

    return {
      values: { ...empty.values, ...parsed.values },
      visibility: { ...empty.visibility, ...parsed.visibility },
    };
  } catch {
    return empty;
  }
}

export function useTemplateContentState(bundleId: string, templateFile: string) {
  const fields = useMemo(
    () => getContentFieldsForTemplate(bundleId, templateFile),
    [bundleId, templateFile],
  );

  const [store, setStore] = useState<TemplateContentStore>(() => loadStore(bundleId, templateFile));
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    setStore(loadStore(bundleId, templateFile));
    setSavedAt(null);
  }, [bundleId, templateFile]);

  useEffect(() => {
    localStorage.setItem(storageKey(bundleId, templateFile), JSON.stringify(store));
    setSavedAt(new Date().toLocaleTimeString());
  }, [bundleId, templateFile, store]);

  const setFieldValue = useCallback((fieldId: string, value: ContentFieldValue) => {
    setStore((prev) => ({
      ...prev,
      values: { ...prev.values, [fieldId]: value },
    }));
  }, []);

  const setFieldVisible = useCallback((fieldId: string, visible: boolean) => {
    setStore((prev) => {
      const nextVisibility = { ...prev.visibility, [fieldId]: visible };
      for (const linkedId of linkedVisibilityIds(fieldId)) {
        if (linkedId in prev.visibility) {
          nextVisibility[linkedId] = visible;
        }
      }
      return {
        ...prev,
        visibility: nextVisibility,
      };
    });
  }, []);

  const mergeExtracted = useCallback(
    (values: TemplateContentState, visibility?: TemplateVisibilityState) => {
      setStore((prev) => ({
        values: { ...prev.values, ...values },
        visibility: visibility ? { ...prev.visibility, ...visibility } : prev.visibility,
      }));
    },
    [],
  );

  const resetFields = useCallback(() => {
    setStore(buildEmptyContentStore(fields));
  }, [fields]);

  return {
    fields,
    values: store.values,
    visibility: store.visibility,
    setFieldValue,
    setFieldVisible,
    mergeExtracted,
    resetFields,
    savedAt,
  };
}

export { buildDefaultVisibility, buildEmptyContentState };

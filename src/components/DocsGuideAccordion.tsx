import { useEffect, useId, useState, type ReactNode } from 'react';

export type DocsGuideSection = {
  id: string;
  title: string;
  children: ReactNode;
  /** Open this panel by default */
  defaultOpen?: boolean;
};

type ItemProps = {
  section: DocsGuideSection;
  open: boolean;
  onToggle: () => void;
};

function DocsGuideItem({ section, open, onToggle }: ItemProps) {
  const panelId = useId();
  const triggerId = useId();

  return (
    <div className={`docs-guide-item${open ? ' open' : ''}`} id={section.id}>
      <button
        type="button"
        className="docs-guide-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        id={triggerId}
        onClick={onToggle}
      >
        <span>{section.title}</span>
        <span className="docs-guide-icon" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="docs-guide-panel"
        hidden={!open}
      >
        {section.children}
      </div>
    </div>
  );
}

type Props = {
  sections: DocsGuideSection[];
  /** Allow more than one panel open at a time (default: true for docs skimming) */
  allowMultiple?: boolean;
};

function initialOpenIds(sections: DocsGuideSection[]): Set<string> {
  const fromDefaults = sections.filter((s) => s.defaultOpen).map((s) => s.id);
  if (typeof window === 'undefined') return new Set(fromDefaults);
  const hash = window.location.hash.replace(/^#/, '');
  if (hash && sections.some((s) => s.id === hash)) {
    return new Set([...fromDefaults, hash]);
  }
  return new Set(fromDefaults);
}

export function DocsGuideAccordion({ sections, allowMultiple = true }: Props) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => initialOpenIds(sections));

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (!hash || !sections.some((s) => s.id === hash)) return;
      setOpenIds((current) => {
        if (current.has(hash)) return current;
        const next = new Set(allowMultiple ? current : []);
        next.add(hash);
        return next;
      });
      window.requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ block: 'start' });
      });
    };

    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [sections, allowMultiple]);

  const toggle = (id: string) => {
    setOpenIds((current) => {
      const next = new Set(allowMultiple ? current : []);
      if (current.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="docs-guide-accordion">
      {sections.map((section) => (
        <DocsGuideItem
          key={section.id}
          section={section}
          open={openIds.has(section.id)}
          onToggle={() => toggle(section.id)}
        />
      ))}
    </div>
  );
}

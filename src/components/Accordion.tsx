import { useEffect, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import type { FaqItem, FaqRelatedLink } from '../data/faq';

type FeedbackVote = 'yes' | 'no' | null;

function FaqFeedback({ itemId }: { itemId: string }) {
  const [vote, setVote] = useState<FeedbackVote>(null);

  return (
    <div className="faq-feedback">
      {vote ? (
        <p className="faq-feedback-thanks" role="status">
          Thanks. Your feedback helps us improve this answer.
        </p>
      ) : (
        <>
          <span className="faq-feedback-label">Was this helpful?</span>
          <div className="faq-feedback-actions">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setVote('yes')}
              aria-label={`Mark ${itemId} as helpful`}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setVote('no')}
              aria-label={`Mark ${itemId} as not helpful`}
            >
              No
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function RelatedLinks({ links }: { links: FaqRelatedLink[] }) {
  return (
    <ul className="faq-related">
      {links.map((link) => (
        <li key={link.to + link.label}>
          {link.to.startsWith('/') ? (
            <Link to={link.to}>{link.label}</Link>
          ) : (
            <a href={link.to}>{link.label}</a>
          )}
        </li>
      ))}
    </ul>
  );
}

interface AccordionItemProps {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, open, onToggle }: AccordionItemProps) {
  const panelId = useId();
  const triggerId = useId();

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${item.id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.location.hash = item.id;
    }
  };

  return (
    <div className={`accordion-item${open ? ' open' : ''}`} id={item.id}>
      <button
        type="button"
        className="accordion-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        id={triggerId}
        onClick={onToggle}
      >
        <span>{item.question}</span>
        <span className="accordion-icon" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="accordion-panel"
        hidden={!open}
      >
        <p>{item.answer}</p>
        {item.related?.length ? <RelatedLinks links={item.related} /> : null}
        <div className="faq-panel-footer">
          <FaqFeedback itemId={item.id} />
          <button type="button" className="faq-permalink" onClick={copyLink}>
            Copy link
          </button>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: FaqItem[];
  defaultOpenId?: string | null;
}

export function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  useEffect(() => {
    if (defaultOpenId && items.some((item) => item.id === defaultOpenId)) {
      setOpenId(defaultOpenId);
    }
  }, [defaultOpenId, items]);

  const toggle = (id: string) => {
    setOpenId((current) => {
      const next = current === id ? null : id;
      if (next) {
        window.history.replaceState(null, '', `#${next}`);
      }
      return next;
    });
  };

  return (
    <div className="accordion">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          open={openId === item.id}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  );
}

interface AccordionGroupProps {
  categories: {
    id: string;
    title: string;
    description: string;
    items: FaqItem[];
  }[];
  filter?: string;
}

export function AccordionGroup({ categories, filter = '' }: AccordionGroupProps) {
  const normalizedFilter = filter.trim().toLowerCase();
  const [hashId, setHashId] = useState<string | null>(() =>
    typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') || null : null,
  );

  useEffect(() => {
    const syncHash = () => setHashId(window.location.hash.replace(/^#/, '') || null);
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  useEffect(() => {
    if (!hashId) return;
    const el = document.getElementById(hashId);
    if (!el) return;
    window.requestAnimationFrame(() => {
      el.scrollIntoView({ block: 'start' });
    });
  }, [hashId]);

  return (
    <div className="accordion-group">
      {categories.map((category) => {
        const items = normalizedFilter
          ? category.items.filter(
              (item) =>
                item.question.toLowerCase().includes(normalizedFilter)
                || item.answer.toLowerCase().includes(normalizedFilter),
            )
          : category.items;

        if (items.length === 0) return null;

        const hashInCategory = hashId && items.some((item) => item.id === hashId);
        const defaultOpenId = hashInCategory ? hashId : null;

        return (
          <section key={category.id} className="faq-category" id={category.id}>
            <div className="faq-category-head">
              <h2>{category.title}</h2>
              <p>{category.description}</p>
            </div>
            <Accordion items={items} defaultOpenId={defaultOpenId} />
          </section>
        );
      })}
    </div>
  );
}

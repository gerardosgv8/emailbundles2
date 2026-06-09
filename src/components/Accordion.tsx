import { useId, useState } from 'react';

interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}

function AccordionItem({ id, question, answer, open, onToggle }: AccordionItemProps) {
  const panelId = useId();

  return (
    <div className={`accordion-item${open ? ' open' : ''}`}>
      <button
        type="button"
        className="accordion-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        id={id}
        onClick={onToggle}
      >
        <span>{question}</span>
        <span className="accordion-icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={id}
        className="accordion-panel"
        hidden={!open}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { id: string; question: string; answer: string }[];
  defaultOpenId?: string;
}

export function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? items[0]?.id ?? null);

  return (
    <div className="accordion">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          question={item.question}
          answer={item.answer}
          open={openId === item.id}
          onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
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
    items: { id: string; question: string; answer: string }[];
  }[];
  filter?: string;
}

export function AccordionGroup({ categories, filter = '' }: AccordionGroupProps) {
  const normalizedFilter = filter.trim().toLowerCase();

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

        return (
          <section key={category.id} className="faq-category" id={category.id}>
            <div className="faq-category-head">
              <h2>{category.title}</h2>
              <p>{category.description}</p>
            </div>
            <Accordion items={items} defaultOpenId={items[0]?.id} />
          </section>
        );
      })}
    </div>
  );
}

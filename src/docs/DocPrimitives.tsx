import type { ReactNode } from 'react';

/** Match on-screen UI labels exactly in docs steps. */
export function Ui({ children }: { children: ReactNode }) {
  return <span className="doc-ui">{children}</span>;
}

type CalloutTone = 'tip' | 'warning' | 'prereq' | 'outcome';

const CALLOUT_LABEL: Record<CalloutTone, string> = {
  tip: 'Pro tip',
  warning: 'Warning',
  prereq: 'Before you start',
  outcome: 'You’ll know it worked when',
};

export function DocCallout({
  tone,
  title,
  children,
}: {
  tone: CalloutTone;
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className={`doc-callout doc-callout-${tone}`} role="note">
      <strong className="doc-callout-title">{title ?? CALLOUT_LABEL[tone]}</strong>
      <div className="doc-callout-body">{children}</div>
    </aside>
  );
}

export function DocVideoPlaceholder({
  title,
  duration = 'Coming soon',
}: {
  title: string;
  duration?: string;
}) {
  return (
    <figure className="doc-video-placeholder">
      <div className="doc-video-frame" aria-hidden="true">
        <span className="doc-video-play">▶</span>
        <span className="doc-video-duration">{duration}</span>
      </div>
      <figcaption>
        <span className="doc-video-label">Video</span>
        {title}
      </figcaption>
    </figure>
  );
}

export function DocSteps({ children }: { children: ReactNode }) {
  return <ol className="doc-steps">{children}</ol>;
}

export function DocStep({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <li className="doc-step">
      {title ? <strong className="doc-step-title">{title}</strong> : null}
      <div className="doc-step-body">{children}</div>
    </li>
  );
}

export function DocFaqList({
  items,
}: {
  items: { q: string; a: ReactNode }[];
}) {
  return (
    <dl className="faq-list doc-faq-list">
      {items.map((item) => (
        <div key={item.q} className="faq-item">
          <dt>{item.q}</dt>
          <dd>{item.a}</dd>
        </div>
      ))}
    </dl>
  );
}

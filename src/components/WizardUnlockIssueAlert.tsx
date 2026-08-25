import { Link } from 'react-router-dom';
import type { WizardUnlockIssue } from '../lib/wizardUnlockIssue';

export function WizardUnlockIssueAlert({ issue }: { issue: WizardUnlockIssue }) {
  return (
    <div className="wizard-access-issue" role="alert">
      <p className="wizard-access-issue-title">{issue.title}</p>
      <p className="wizard-access-issue-message">{issue.error}</p>
      {issue.hint ? <p className="wizard-access-issue-hint">{issue.hint}</p> : null}
      <dl className="wizard-access-issue-meta">
        <div>
          <dt>Issue code</dt>
          <dd>
            <code>{issue.code}</code>
          </dd>
        </div>
        <div>
          <dt>Support reference</dt>
          <dd>
            <code>{issue.supportReference}</code>
          </dd>
        </div>
      </dl>
      <p className="wizard-access-issue-footnote">
        Include both codes when you{' '}
        <Link to="/contact">contact us</Link> so we can find this attempt quickly.
      </p>
    </div>
  );
}

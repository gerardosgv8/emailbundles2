import { describeDownloadPolicy, formatAccessExpiry, type PurchasePolicy } from '../lib/purchasePolicy';

type DownloadAccessNoticeProps = {
  policy: PurchasePolicy;
  /** When set, shows per-order remaining count (success page). */
  downloadsRemaining?: number;
  accessExpiresAt?: string;
  variant?: 'success' | 'info';
  /** Hide the one-line summary (e.g. when copy appears elsewhere on the page). */
  showSummary?: boolean;
};

export function DownloadAccessNotice({
  policy,
  downloadsRemaining,
  accessExpiresAt,
  variant = 'info',
  showSummary = true,
}: DownloadAccessNoticeProps) {
  const exhausted = downloadsRemaining === 0;
  const showRemaining = downloadsRemaining != null;

  return (
    <aside
      className={`download-access-notice download-access-notice--${variant}${exhausted ? ' download-access-notice--exhausted' : ''}`}
      aria-label="Download access information"
    >
      <p className="download-access-notice__title">Download access</p>
      <ul className="download-access-notice__list">
        <li>
          {showRemaining ? (
            <>
              <strong>{downloadsRemaining}</strong> of <strong>{policy.maxDownloads}</strong>{' '}
              {policy.maxDownloads === 1 ? 'download' : 'downloads'} remaining
            </>
          ) : (
            <>
              <strong>{policy.maxDownloads}</strong>{' '}
              {policy.maxDownloads === 1 ? 'download' : 'downloads'} included per purchase
            </>
          )}
        </li>
        <li>
          Access window: <strong>{policy.accessDays}</strong>{' '}
          {policy.accessDays === 1 ? 'day' : 'days'} from purchase
          {accessExpiresAt ? (
            <>
              {' '}
              (until <strong>{formatAccessExpiry(accessExpiresAt)}</strong>)
            </>
          ) : null}
        </li>
        <li>Each download click uses one attempt — save the ZIP to your device.</li>
        <li>Links are personal to your order. Please do not share them.</li>
      </ul>
      {!showRemaining && showSummary ? (
        <p className="download-access-notice__summary">{describeDownloadPolicy(policy)}</p>
      ) : exhausted ? (
        <p className="download-access-notice__summary">
          You have used all downloads for this order. Contact support with your transaction ID if you
          need help.
        </p>
      ) : null}
    </aside>
  );
}

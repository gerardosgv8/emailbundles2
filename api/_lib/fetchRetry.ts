/** Lightweight fetch with retries for transient network failures. */

const RETRYABLE = /fetch failed|ECONNRESET|ETIMEDOUT|EAI_AGAIN|ENOTFOUND|socket|network|aborted/i;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchWithRetry(
  input: string,
  init: RequestInit | undefined,
  options: { label: string; attempts?: number } = { label: 'upstream' },
): Promise<Response> {
  const attempts = options.attempts ?? 3;
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fetch(input, init);
    } catch (err) {
      lastError = err;
      const message = err instanceof Error ? err.message : String(err);
      const retryable = RETRYABLE.test(message);
      console.error(`[${options.label}] fetch attempt ${attempt}/${attempts} failed`, message);
      if (!retryable || attempt === attempts) {
        break;
      }
      await delay(250 * attempt);
    }
  }

  const detail = lastError instanceof Error ? lastError.message : 'unknown network error';
  throw new Error(`${options.label} unreachable (${detail})`);
}

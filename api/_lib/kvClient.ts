import { createClient, type VercelKV } from '@vercel/kv';

function restCredentials(): { url: string; token: string } | null {
  const url =
    process.env.KV_REST_API_URL?.trim() ||
    process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token =
    process.env.KV_REST_API_TOKEN?.trim() ||
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!url || !token) {
    return null;
  }

  return { url, token };
}

export function isUnlockRegistryAvailable(): boolean {
  return restCredentials() !== null;
}

let client: VercelKV | null = null;

export function getKv(): VercelKV {
  if (client) {
    return client;
  }

  const creds = restCredentials();
  if (!creds) {
    throw new Error('Unlock registry is not configured (Redis / KV missing).');
  }

  client = createClient(creds);
  return client;
}

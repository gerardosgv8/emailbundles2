import { createHmac, timingSafeEqual } from 'node:crypto';

export type WizardSessionClaims = {
  email: string;
  orderId: string;
  productId: string;
  exp: number;
};

const DEFAULT_SESSION_DAYS = 7;

function sessionTtlMs(): number {
  const raw = process.env.WIZARD_SESSION_DAYS?.trim();
  const days = raw ? Number.parseInt(raw, 10) : DEFAULT_SESSION_DAYS;
  if (!Number.isFinite(days) || days < 1 || days > 90) {
    return DEFAULT_SESSION_DAYS * 24 * 60 * 60 * 1000;
  }
  return days * 24 * 60 * 60 * 1000;
}

function encodeBase64Url(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function decodeBase64Url(value: string): string {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function signPayload(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

export function createWizardSessionToken(
  claims: Omit<WizardSessionClaims, 'exp'>,
  secret: string,
): { token: string; expiresAt: string } {
  const exp = Date.now() + sessionTtlMs();
  const body = encodeBase64Url(JSON.stringify({ ...claims, exp }));
  const signature = signPayload(body, secret);
  return {
    token: `${body}.${signature}`,
    expiresAt: new Date(exp).toISOString(),
  };
}

export function verifyWizardSessionToken(token: string, secret: string): WizardSessionClaims | null {
  const [body, signature] = token.split('.');
  if (!body || !signature) {
    return null;
  }

  const expected = signPayload(body, secret);
  const actualBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (actualBuf.length !== expectedBuf.length || !timingSafeEqual(actualBuf, expectedBuf)) {
    return null;
  }

  try {
    const claims = JSON.parse(decodeBase64Url(body)) as WizardSessionClaims;
    if (
      typeof claims.email !== 'string' ||
      typeof claims.orderId !== 'string' ||
      typeof claims.productId !== 'string' ||
      typeof claims.exp !== 'number'
    ) {
      return null;
    }
    if (claims.exp <= Date.now()) {
      return null;
    }
    return claims;
  } catch {
    return null;
  }
}

export function readBearerToken(authHeader: string | undefined): string | null {
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.slice('Bearer '.length).trim();
  return token || null;
}

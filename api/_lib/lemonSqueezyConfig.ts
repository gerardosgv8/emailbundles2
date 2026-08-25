/** Lemon Squeezy mode + credentials. Flip `LEMONSQUEEZY_MODE=live` on Vercel to go live. */

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function optional(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

export type LemonSqueezyMode = 'test' | 'live';

/** Default test checkout (Email Marketing Starter Kit). */
export const LEMON_SQUEEZY_STARTER_KIT_CHECKOUT_URL_TEST =
  'https://mailcraftstudio.lemonsqueezy.com/checkout/buy/bdef8cc4-db85-402e-8504-723f5bedd9fb';

export function getLemonSqueezyMode(): LemonSqueezyMode {
  const raw = optional('LEMONSQUEEZY_MODE')?.toLowerCase();
  return raw === 'live' ? 'live' : 'test';
}

export function isLiveLemonSqueezyMode(): boolean {
  return getLemonSqueezyMode() === 'live';
}

export function getLemonSqueezyApiKey(): string {
  if (isLiveLemonSqueezyMode()) {
    return required('LEMONSQUEEZY_API_KEY_LIVE');
  }
  return required('LEMONSQUEEZY_API_KEY');
}

export function getLemonSqueezyVariantStarterKit(): string | undefined {
  if (isLiveLemonSqueezyMode()) {
    return optional('LEMONSQUEEZY_VARIANT_STARTER_KIT_LIVE') ?? optional('LEMONSQUEEZY_VARIANT_STARTER_KIT');
  }
  return optional('LEMONSQUEEZY_VARIANT_STARTER_KIT');
}

export function getLemonSqueezyCheckoutUrl(): string {
  if (isLiveLemonSqueezyMode()) {
    return required('LEMONSQUEEZY_CHECKOUT_URL_LIVE');
  }
  return optional('LEMONSQUEEZY_CHECKOUT_URL') ?? LEMON_SQUEEZY_STARTER_KIT_CHECKOUT_URL_TEST;
}

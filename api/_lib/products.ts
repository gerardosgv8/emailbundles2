import { optional } from './env';

/**
 * Maps storefront product ids → Stripe Price ID + R2 object key.
 * Set STRIPE_PRICE_* in Vercel env to match your Stripe Dashboard prices.
 */

export type ProductDefinition = {
  id: string;
  name: string;
  r2Key: string;
  stripePriceEnvVar: string;
};

export const PRODUCTS: ProductDefinition[] = [
  {
    id: 'industrial-b2b',
    name: 'Industrial B2B Bundle',
    r2Key: 'industrial-b2b.zip',
    stripePriceEnvVar: 'STRIPE_PRICE_INDUSTRIAL_B2B',
  },
];

export function getProduct(productId: string): ProductDefinition | undefined {
  return PRODUCTS.find((p) => p.id === productId);
}

export function getStripePriceId(product: ProductDefinition): string {
  const priceId = optional(product.stripePriceEnvVar);
  if (!priceId) {
    throw new Error(
      `Missing ${product.stripePriceEnvVar} for product "${product.id}". Create a Stripe Price and add the env var in Vercel.`,
    );
  }
  return priceId;
}

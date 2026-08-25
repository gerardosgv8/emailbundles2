/**
 * Maps storefront product ids → Lemon Squeezy checkout.
 */

import {
  getLemonSqueezyCheckoutUrl,
  LEMON_SQUEEZY_STARTER_KIT_CHECKOUT_URL_TEST,
} from './lemonSqueezyConfig.js';

export const STOREFRONT_PRODUCT_ID = 'email-marketing-starter-kit';

export const LEMON_SQUEEZY_STARTER_KIT_CHECKOUT_URL = LEMON_SQUEEZY_STARTER_KIT_CHECKOUT_URL_TEST;

export type ProductDefinition = {
  id: string;
  name: string;
  lemonSqueezyCheckoutUrl: string;
};

export const PRODUCTS: ProductDefinition[] = [
  {
    id: STOREFRONT_PRODUCT_ID,
    name: 'Email Marketing Starter Kit',
    lemonSqueezyCheckoutUrl: getLemonSqueezyCheckoutUrl(),
  },
];

export function getProduct(productId: string): ProductDefinition | undefined {
  return PRODUCTS.find((p) => p.id === productId);
}

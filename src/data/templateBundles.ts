import { assetUrl } from '../lib/assetUrl';

export type TemplateBundle = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  imageUrl: string;
  imageAlt: string;
  templateCount?: number;
  wizardAvailable: boolean;
  /** When set, Products page shows Buy → Stripe Checkout for this id (see api/_lib/products.ts). */
  checkoutProductId?: string;
};

export const TEMPLATE_BUNDLES: TemplateBundle[] = [
  {
    id: 'industrial-b2b',
    name: 'Industrial B2B Bundle',
    price: '$89',
    description: 'Nine templates for product launches, events, company updates, and more.',
    features: ['Product & service launches', 'Event invitations', 'Catalog grids', 'Brand Design Wizard compatible'],
    imageUrl: assetUrl('images/products/industrial-b2b.svg'),
    imageAlt: 'Preview of Industrial B2B email templates',
    templateCount: 9,
    wizardAvailable: true,
    checkoutProductId: 'industrial-b2b',
  },
  {
    id: 'ecommerce',
    name: 'eCommerce Email Bundle',
    price: '$79',
    description: 'Complete set of conversion-focused templates for online stores.',
    features: ['Checkout & order emails', 'Promotional campaigns', 'Product recommendations', 'Lifetime updates'],
    imageUrl: assetUrl('images/products/ecommerce.svg'),
    imageAlt: 'Preview of eCommerce email templates',
    wizardAvailable: false,
  },
];

export function getTemplateBundle(bundleId: string | undefined): TemplateBundle | undefined {
  if (!bundleId) return undefined;
  return TEMPLATE_BUNDLES.find((bundle) => bundle.id === bundleId);
}

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
  /** When set, Products page shows Buy for this id (Lemon Squeezy checkout). */
  checkoutProductId?: string;
};

export const TEMPLATE_BUNDLES: TemplateBundle[] = [
  {
    id: 'email-marketing-starter-kit',
    name: 'Email Marketing Starter Kit',
    price: '$79.99',
    description:
      'Eleven production HTML templates for welcome, cart recovery, launches, promos, newsletters, and visual stories. Pair with Brand and Content Wizards so branding and campaign copy follow one clear path into your ESP.',
    features: [
      '11 production HTML templates',
      'Brand Wizard: one look across every send',
      'Content Wizard: campaign fields, filled HTML',
      'Lifecycle layouts for store and product flows',
    ],
    imageUrl: assetUrl('images/products/email-marketing-starter-kit.png'),
    imageAlt: 'Preview of Email Marketing Starter Kit templates',
    templateCount: 11,
    wizardAvailable: true,
    checkoutProductId: 'email-marketing-starter-kit',
  },
];

/** The kit currently offered on the storefront (wizards deep-link here). */
export const STOREFRONT_BUNDLE_ID = TEMPLATE_BUNDLES[0].id;

export function getTemplateBundle(bundleId: string | undefined): TemplateBundle | undefined {
  if (!bundleId) return undefined;
  return TEMPLATE_BUNDLES.find((bundle) => bundle.id === bundleId);
}

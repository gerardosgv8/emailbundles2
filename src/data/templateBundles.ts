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
    price: '$79.99',
    description:
      'Nine production HTML templates for launches, events, catalogs, and company updates. Brand Wizard applies your identity across the zip. Content Wizard fills each campaign so you skip hand-editing every file.',
    features: [
      '9 production HTML templates',
      'Brand Wizard: apply tokens across the pack',
      'Content Wizard: fill copy, download .html',
      'Outlook-aware CTAs and modular hooks',
    ],
    imageUrl: assetUrl('images/products/industrial-b2b.png'),
    imageAlt: 'Preview of Industrial B2B email templates',
    templateCount: 9,
    wizardAvailable: true,
    checkoutProductId: 'industrial-b2b',
  },
  {
    id: 'email-marketing-starter-kit',
    name: 'Email Marketing Starter Kit',
    price: '$79.99',
    description:
      'Eleven production HTML templates for welcome, cart recovery, launches, promos, and newsletters. Pair with Brand and Content Wizards so branding and campaign copy follow one clear path into your ESP.',
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

export function getTemplateBundle(bundleId: string | undefined): TemplateBundle | undefined {
  if (!bundleId) return undefined;
  return TEMPLATE_BUNDLES.find((bundle) => bundle.id === bundleId);
}

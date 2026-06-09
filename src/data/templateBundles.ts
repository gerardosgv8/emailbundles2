export type TemplateBundle = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  templateCount?: number;
  wizardAvailable: boolean;
};

export const TEMPLATE_BUNDLES: TemplateBundle[] = [
  {
    id: 'industrial-b2b',
    name: 'Industrial B2B Bundle',
    price: '$89',
    description: 'Nine templates for product launches, events, company updates, and more.',
    features: ['Product & service launches', 'Event invitations', 'Catalog grids', 'Brand Design Wizard compatible'],
    templateCount: 9,
    wizardAvailable: true,
  },
  {
    id: 'ecommerce',
    name: 'eCommerce Email Bundle',
    price: '$79',
    description: 'Complete set of conversion-focused templates for online stores.',
    features: ['Checkout & order emails', 'Promotional campaigns', 'Product recommendations', 'Lifetime updates'],
    wizardAvailable: false,
  },
  {
    id: 'free-flow-starter',
    name: 'Free Flow Starter',
    price: 'Free',
    description: 'Essential templates to get started with professional email design.',
    features: ['Welcome & onboarding', 'Newsletter editorial', 'Feature announcements', 'Community support'],
    wizardAvailable: false,
  },
];

export function getTemplateBundle(bundleId: string | undefined): TemplateBundle | undefined {
  if (!bundleId) return undefined;
  return TEMPLATE_BUNDLES.find((bundle) => bundle.id === bundleId);
}

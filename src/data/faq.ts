export interface FaqRelatedLink {
  label: string;
  to: string;
}

export interface FaqItem {
  id: string;
  question: string;
  /** Lead with a direct answer in the first sentence. */
  answer: string;
  related?: FaqRelatedLink[];
}

export interface FaqCategory {
  id: string;
  title: string;
  description: string;
  items: FaqItem[];
}

/**
 * Curated top FAQs (~18). Prefer real friction points over exhaustive coverage.
 * Deep docs live under /docs. Link out instead of duplicating long guides.
 */
export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    description: 'First download, setup, and what to expect.',
    items: [
      {
        id: 'how-do-i-start',
        question: 'How do I get started after I download a bundle?',
        answer:
          'You can brand and fill the whole pack at once, or edit a single HTML file by hand. For the pack path: open Brand Wizard to apply logo, colors, and footer across the zip, then use Content Wizard to drop in campaign copy and download filled HTML. Prefer manual edits? Extract the zip, open the file that matches your campaign, swap copy and images, and paste the full HTML into your ESP. Host images on HTTPS and send a test before your full list.',
        related: [
          { label: 'Brand Design Wizard', to: '/brand-wizard/email-marketing-starter-kit' },
          { label: 'Content Wizard', to: '/content-wizard/email-marketing-starter-kit' },
          { label: 'Getting started guide', to: '/docs#getting-started' },
        ],
      },
      {
        id: 'need-html',
        question: 'Do I need to know HTML to use these templates?',
        answer:
          'A little HTML familiarity helps, but you can update most text and images without writing code. Styles are inlined and commented. For brand colors and logos across a whole pack, use the Brand Design Wizard. For campaign copy, use the Content Wizard.',
        related: [
          { label: 'Brand Design Wizard', to: '/brand-wizard/email-marketing-starter-kit' },
          { label: 'Content Wizard', to: '/content-wizard/email-marketing-starter-kit' },
        ],
      },
      {
        id: 'brand-vs-content',
        question: 'What’s the difference between Brand Wizard and Content Wizard?',
        answer:
          'Brand Wizard sets look and feel (logo, colors, buttons, footer identity) and can apply those tokens to a template zip. Content Wizard fills headings, body, CTAs, and images for one layout at a time. Best order: brand first, then content.',
        related: [
          { label: 'Brand Wizard docs', to: '/docs#brand-wizard' },
          { label: 'Content Wizard docs', to: '/docs#content-wizard' },
        ],
      },
      {
        id: 'test-before-send',
        question: 'Should I test before I send to my list?',
        answer:
          'Yes, always. Send tests to Gmail, Outlook, and Apple Mail at minimum. For high-stakes campaigns, use Litmus or Email on Acid. Templates are pre-tested, but your images, merge tags, and ESP can still introduce quirks.',
        related: [{ label: 'ESP integration tips', to: '/docs#esp' }],
      },
    ],
  },
  {
    id: 'templates',
    title: 'Templates & branding',
    description: 'Customization, mobile, Outlook, and images.',
    items: [
      {
        id: 'customize-brand',
        question: 'Can I change colors and fonts to match my brand?',
        answer:
          'Yes. Search for hex values in the HTML, or define tokens in the Brand Design Wizard and apply them to your zip. Export Design Rules so your team shares one brand reference.',
        related: [
          { label: 'Open Brand Wizard', to: '/brand-wizard/email-marketing-starter-kit' },
          { label: 'Customization overview', to: '/docs#customization' },
        ],
      },
      {
        id: 'mobile',
        question: 'Will these emails work on mobile?',
        answer:
          'Yes. Templates use responsive, mobile-first patterns with fluid widths and stacked columns. Still send a phone test. Your ESP and image sizes can affect real devices.',
      },
      {
        id: 'outlook-buttons',
        question: 'Why do my buttons look wrong in Outlook?',
        answer:
          'Outlook desktop uses a different rendering engine than most clients. Keep the VML fallback blocks in the HTML. Those “bulletproof” buttons are what make CTAs look consistent. Don’t strip them when editing.',
        related: [{ label: 'Troubleshooting', to: '/docs#troubleshooting' }],
      },
      {
        id: 'images-not-showing',
        question: 'Why aren’t my images showing?',
        answer:
          'Use absolute HTTPS URLs. Relative paths break in almost every ESP. Host assets on your ESP CDN or a reliable HTTPS server, and keep logos lean (under ~100 KB).',
        related: [{ label: 'Troubleshooting', to: '/docs#troubleshooting' }],
      },
    ],
  },
  {
    id: 'wizards',
    title: 'Brand & Content wizards',
    description: 'Applying design tokens and campaign copy.',
    items: [
      {
        id: 'apply-brand-zip',
        question: 'How do I apply my brand to a whole zip of templates?',
        answer:
          'Open Brand Wizard, choose your bundle, fill the token steps, then on Review & export upload the zip and click Apply brand. Download the branded package. It includes your Design Rules file.',
        related: [
          { label: 'Apply brand guide', to: '/docs#bw-apply' },
          { label: 'Open Brand Wizard', to: '/brand-wizard/email-marketing-starter-kit' },
        ],
      },
      {
        id: 'wizard-access',
        question: 'How do I unlock the Brand and Content Wizards after purchase?',
        answer:
          'Wizards are for buyers only. Go to Unlock wizards (or follow the link on your purchase success page), enter the email and order number from your Lemon Squeezy receipt, and access lasts 30 days in this browser tab. Files still arrive by email from Lemon Squeezy; unlocking only gates the online wizards.',
        related: [
          { label: 'Unlock wizards', to: '/wizard-access' },
          { label: 'Contact', to: '/contact' },
        ],
      },
      {
        id: 'wizard-storage',
        question: 'Where does the Brand Wizard save my progress?',
        answer:
          'In your browser only (localStorage), keyed by bundle. Nothing is uploaded to a server. Clearing site data or using Reset defaults wipes those values, so keep an exported Design Rules file as backup.',
        related: [{ label: 'Import Design Rules', to: '/docs#bw-import' }],
      },
      {
        id: 'fill-copy',
        question: 'How do I fill campaign copy without editing HTML by hand?',
        answer:
          'Use Content Wizard: pick the layout, edit fields, upload the matching HTML, then download the filled file. Toggle Shown / Hidden in email to drop optional blocks for this send.',
        related: [
          { label: 'Content Wizard guide', to: '/docs#content-wizard' },
          { label: 'Open Content Wizard', to: '/content-wizard/email-marketing-starter-kit' },
        ],
      },
      {
        id: 'content-needs-brand',
        question: 'Can I use the Content Wizard on branded HTML?',
        answer:
          'Yes, and that’s the recommended path. Apply brand tokens first, then upload that branded HTML in Content Wizard so copy updates keep your colors and logo.',
        related: [{ label: 'Brand vs Content', to: '/docs#cw-vs-brand' }],
      },
    ],
  },
  {
    id: 'esp',
    title: 'ESP & sending',
    description: 'Platforms, merge tags, compliance, and inbox placement.',
    items: [
      {
        id: 'which-esp',
        question: 'Which email platforms can I use these with?',
        answer:
          'Any ESP that accepts custom HTML, including Salesforce Marketing Cloud, Klaviyo, Mailchimp, HubSpot, Braze, and Customer.io. Paste the full HTML, update image URLs, and swap merge tags for your platform’s syntax.',
        related: [{ label: 'ESP integration', to: '/docs#esp' }],
      },
      {
        id: 'unsubscribe',
        question: 'How do I set up unsubscribe links?',
        answer:
          'Replace footer placeholders like {{unsubscribe_url}} with your ESP’s merge tag (for example Klaviyo or Mailchimp unsubscribe tags). Never hard-code a static unsubscribe URL.',
        related: [{ label: 'ESP integration', to: '/docs#esp' }],
      },
      {
        id: 'can-spam',
        question: 'Are these templates CAN-SPAM compliant?',
        answer:
          'They include the right placeholders for physical address, company name, and unsubscribe, but you must fill in real business details and wire correct merge tags. Compliance depends on your completed footer and list practices.',
      },
      {
        id: 'deliverability',
        question: 'Will these templates hurt my deliverability?',
        answer:
          'Clean HTML alone doesn’t determine inbox placement. Keep a healthy text/image balance, host images on reputable domains, avoid huge file sizes, and maintain list hygiene. Authentication (SPF/DKIM/DMARC) still matters more than layout.',
      },
    ],
  },
  {
    id: 'purchases',
    title: 'Purchases & support',
    description: 'Downloads, licensing, refunds, and getting help.',
    items: [
      {
        id: 'downloads',
        question: 'How do downloads work after I purchase?',
        answer:
          'After checkout, Lemon Squeezy emails your receipt. Save the zip locally. If the files are missing, contact us with the email you used at checkout and your receipt.',
        related: [{ label: 'Contact', to: '/contact' }],
      },
      {
        id: 'client-work',
        question: 'Can I use templates for client projects?',
        answer:
          'Yes, for agencies and freelancers building client campaigns. You may not redistribute raw template files as a competing product or resell the bundle itself. One license covers your organization’s use.',
      },
      {
        id: 'refunds',
        question: 'What if I need a refund?',
        answer:
          'If templates don’t meet the documented compatibility standards and we can’t resolve it, contact us within 14 days of purchase for a review. Digital product terms are covered in our Refund Policy.',
        related: [{ label: 'Contact', to: '/contact' }],
      },
      {
        id: 'still-stuck',
        question: 'Where do I go if I’m still stuck?',
        answer:
          'Start with Documentation for step-by-step wizard and ESP guides, then this FAQ for quick answers. If you still need help, use the Contact page with your order number and what you already tried.',
        related: [
          { label: 'Contact', to: '/contact' },
          { label: 'Documentation', to: '/docs' },
          { label: 'Brand Wizard troubleshooting', to: '/docs#bw-faq' },
          { label: 'Content Wizard troubleshooting', to: '/docs#cw-faq' },
        ],
      },
    ],
  },
];

/** High-friction questions featured on the homepage FAQ preview. */
export const FAQ_HOME_PREVIEW_IDS = [
  'how-do-i-start',
  'brand-vs-content',
  'which-esp',
  'outlook-buttons',
] as const;

export const FAQ_QUICK_LINKS = FAQ_CATEGORIES.map(({ id, title }) => ({ id, title }));

export function findFaqItem(id: string): FaqItem | undefined {
  for (const category of FAQ_CATEGORIES) {
    const match = category.items.find((item) => item.id === id);
    if (match) return match;
  }
  return undefined;
}

export function getFaqHomePreview(): FaqItem[] {
  return FAQ_HOME_PREVIEW_IDS.map((id) => findFaqItem(id)).filter(
    (item): item is FaqItem => Boolean(item),
  );
}

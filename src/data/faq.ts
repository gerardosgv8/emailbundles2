export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  description: string;
  items: FaqItem[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    description: 'Downloads, setup, and your first send.',
    items: [
      {
        id: 'what-is-mailcraft',
        question: 'What is Mailcraft Studio?',
        answer: 'Mailcraft Studio is a collection of production-ready HTML email templates and design tools built for marketers and developers. Each bundle includes table-based, ESP-compatible templates with inline CSS, modular sections, and documentation to help you ship campaigns faster.',
      },
      {
        id: 'how-to-start',
        question: 'How do I get started with a template bundle?',
        answer: 'Download the bundle, open the HTML file for your campaign type, customize text and images to match your brand, then paste the full HTML into your ESP template editor. Our docs walk through each step, from asset hosting to test sends.',
      },
      {
        id: 'need-html',
        question: 'Do I need to know HTML to use these templates?',
        answer: 'Basic familiarity helps, but it is not required. Copy and image swaps are straightforward. Styles are inlined and commented, and the Brand Design Wizard helps you define colors, fonts, and footer details without hunting through the code.',
      },
      {
        id: 'test-before-send',
        question: 'Should I test before sending to my list?',
        answer: 'Always. Send tests to Gmail, Outlook, and Apple Mail at minimum. For high-stakes campaigns, use Litmus or Email on Acid for broader client coverage. Our templates are pre-tested, but your ESP and image URLs can introduce client-specific quirks.',
      },
    ],
  },
  {
    id: 'templates',
    title: 'Templates & customization',
    description: 'Editing, branding, and layout flexibility.',
    items: [
      {
        id: 'customize-colors',
        question: 'Can I customize colors and fonts?',
        answer: 'Yes. Search for hex values in the HTML or apply tokens from your DESIGN_RULES.md file. The Brand Design Wizard exports a complete brand spec with primary colors, button styles, typography, and footer details that maps to data-element regions in each template.',
      },
      {
        id: 'modular-sections',
        question: 'Are templates modular?',
        answer: 'Yes. Sections are marked with HTML comments (e.g. Component start Header) and data-element attributes. You can reorder, duplicate, or remove blocks like hero sections, feature lists, product grids, CTAs, and footers without rebuilding from scratch.',
      },
      {
        id: 'mobile',
        question: 'Will templates work on mobile devices?',
        answer: 'Yes. Templates use responsive, mobile-first patterns with fluid widths, stacked columns, and touch-friendly button sizing. We test across common mobile clients including iOS Mail and the Gmail app.',
      },
      {
        id: 'outlook',
        question: 'How do you handle Outlook rendering?',
        answer: 'Outlook desktop uses Word’s rendering engine, which breaks many modern CSS patterns. Our templates use hybrid table layouts, inline styles, and VML fallbacks for bulletproof buttons so CTAs look consistent in Outlook and other clients.',
      },
      {
        id: 'images',
        question: 'What about images, sizes, and hosting?',
        answer: 'Use absolute HTTPS URLs hosted on your ESP CDN or a reliable asset server. Hero images work best at 600px wide (3:2 or 16:9 landscape). Keep logos under ~100 KB. Relative paths break in most ESPs.',
      },
    ],
  },
  {
    id: 'esp',
    title: 'ESP & delivery',
    description: 'Platform compatibility and merge tags.',
    items: [
      {
        id: 'compatible-platforms',
        question: 'Which email platforms are supported?',
        answer: 'Templates work with any ESP that accepts custom HTML, including Salesforce Marketing Cloud, Klaviyo, Mailchimp, HubSpot, Braze, and Customer.io. Paste the full HTML into the template editor and replace merge tags with your platform’s syntax.',
      },
      {
        id: 'merge-tags',
        question: 'How do unsubscribe and merge tags work?',
        answer: 'Placeholders like {{unsubscribe_url}} are included in footers. Swap them for your ESP’s merge syntax before sending (e.g. Klaviyo’s {% unsubscribe %} or Mailchimp’s *|UNSUB|*). Never hard-code unsubscribe links.',
      },
      {
        id: 'can-spam',
        question: 'Are templates CAN-SPAM compliant?',
        answer: 'Footers include placeholders for physical mailing address, company name, and unsubscribe links. Those are required for CAN-SPAM and GDPR-friendly sends. Fill in your real business address and wire the correct unsubscribe merge tags.',
      },
      {
        id: 'deliverability',
        question: 'Will these templates hurt deliverability?',
        answer: 'Template HTML alone does not determine inbox placement, but clean code helps. Avoid excessive image-only emails, keep total HTML size reasonable, host images on reputable domains, and maintain list hygiene. Our templates use text/HTML balance-friendly structures.',
      },
    ],
  },
  {
    id: 'brand-wizard',
    title: 'Brand Design Wizard',
    description: 'Defining and exporting your brand tokens.',
    items: [
      {
        id: 'what-is-wizard',
        question: 'What does the Brand Design Wizard do?',
        answer: 'It is a step-by-step tool for defining your baseline brand identity: logo URL, color palette, button styles, typography, footer details, and layout tokens. Progress auto-saves locally, and you can export a complete DESIGN_RULES.md file for your team.',
      },
      {
        id: 'wizard-storage',
        question: 'Where is my wizard progress saved?',
        answer: 'In your browser’s localStorage, keyed by bundle. Data stays on your device and nothing is sent to a server. Clear browser data or use Reset defaults to start fresh.',
      },
      {
        id: 'wizard-export',
        question: 'How do I use the exported DESIGN_RULES.md?',
        answer: 'Share it with designers and developers as the single source of truth for brand tokens. When editing templates, map each token to matching data-element regions in the HTML. The export includes an element mapping reference and a pre-flight checklist.',
      },
      {
        id: 'wizard-bundles',
        question: 'Is the wizard tied to a specific bundle?',
        answer: 'Each bundle gets its own wizard. Pick your bundle on the Brand Wizard page before you start. The Industrial B2B wizard is live now, and more bundles are on the way.',
      },
    ],
  },
  {
    id: 'support',
    title: 'Support & licensing',
    description: 'Updates, usage rights, and help.',
    items: [
      {
        id: 'download-access',
        question: 'How do downloads work after I purchase?',
        answer: 'After checkout you receive a personal download link by email and on the success page. Each purchase includes a limited number of download attempts within a set number of days from the order date. Save the ZIP to your device — links are tied to your order and should not be shared. If you run out of attempts or the access window ends, contact support with your receipt.',
      },
      {
        id: 'updates',
        question: 'Do bundles include updates?',
        answer: 'Paid bundles include lifetime updates for the template version you purchased. When we ship improvements like bug fixes, client compatibility patches, or new sections, you get access to the latest files.',
      },
      {
        id: 'client-work',
        question: 'Can I use templates for client projects?',
        answer: 'Yes, for agencies and freelancers building campaigns for clients. You may not redistribute the raw template files as a competing product or resell the bundle itself. Each license covers your organization’s use.',
      },
      {
        id: 'refunds',
        question: 'What is your refund policy?',
        answer: 'If templates do not meet the documented compatibility standards and we cannot resolve the issue, contact support within 14 days of purchase for a review. Digital product terms are outlined in our Refund Policy page.',
      },
      {
        id: 'get-help',
        question: 'Where can I get help if I am stuck?',
        answer: 'Start with the Documentation page. It covers structure, customization, ESP integration, and troubleshooting. For Outlook spacing, broken images, and button issues, see the troubleshooting section. Community support is available for Free Flow Starter users.',
      },
    ],
  },
];

export const FAQ_QUICK_LINKS = FAQ_CATEGORIES.map(({ id, title }) => ({ id, title }));

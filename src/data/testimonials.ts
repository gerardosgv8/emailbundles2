export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  industry: 'ecommerce' | 'b2b' | 'agency' | 'saas';
  metric?: string;
  featured?: boolean;
}

export const TESTIMONIAL_STATS = [
  { value: '500+', label: 'Marketing teams' },
  { value: '18%', label: 'Avg. CTR lift reported' },
  { value: '9', label: 'Templates per bundle' },
  { value: '4.9/5', label: 'Customer satisfaction' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'marcos',
    quote: 'The templates imported flawlessly into Salesforce Marketing Cloud. We swapped our product launch series in an afternoon and saw CTR climb 18% within the first month.',
    name: 'Marcos Delgado',
    role: 'eCommerce Manager',
    company: 'Northline Supply Co.',
    industry: 'ecommerce',
    metric: '+18% CTR',
    featured: true,
  },
  {
    id: 'priya',
    quote: 'No more Outlook nightmares. The VML buttons are rock-solid and our legal team finally stopped flagging broken layouts in review.',
    name: 'Priya Shah',
    role: 'Marketing Lead',
    company: 'Helix Analytics',
    industry: 'saas',
    metric: 'Zero Outlook tickets',
  },
  {
    id: 'jorge',
    quote: 'Fast to implement and look polished. Perfect for our two-person marketing team. We went from blank canvas to shipped campaign in under three hours.',
    name: 'Jorge Mendez',
    role: 'Founder',
    company: 'Studio Arc',
    industry: 'agency',
    metric: '3 hr turnaround',
  },
  {
    id: 'elena',
    quote: 'The Industrial B2B bundle matched our brand tone out of the box. The Brand Design Wizard gave us a DESIGN_RULES.md our whole team could follow without guessing hex codes.',
    name: 'Elena Whitfield',
    role: 'Director of Communications',
    company: 'ForgeLine Industrial',
    industry: 'b2b',
    metric: 'Brand rollout in 1 week',
  },
  {
    id: 'david',
    quote: 'We use Klaviyo for lifecycle flows. Copy-paste worked first try. No broken tables, no stripped styles. That alone saved us two sprint cycles.',
    name: 'David Chen',
    role: 'Lifecycle Marketing Manager',
    company: 'Meridian Home',
    industry: 'ecommerce',
    metric: '2 sprints saved',
  },
  {
    id: 'sarah',
    quote: 'Our agency ships email for twelve clients. Modular sections mean we reuse headers and footers while swapping hero blocks per brand. Huge efficiency win.',
    name: 'Sarah Okonkwo',
    role: 'Creative Director',
    company: 'Brightpath Digital',
    industry: 'agency',
    metric: '12 client brands',
  },
  {
    id: 'tom',
    quote: 'Event invitation and company update templates were exactly what our field marketing team needed. Clean, professional, and compliant footers built in.',
    name: 'Tom Richardson',
    role: 'Field Marketing Manager',
    company: 'Apex Manufacturing',
    industry: 'b2b',
    metric: 'CAN-SPAM ready',
  },
  {
    id: 'mia',
    quote: 'Mobile rendering was our biggest pain point. These templates actually look intentional on iPhone Mail, not just shrunk desktop layouts.',
    name: 'Mia Torres',
    role: 'Growth Marketer',
    company: 'Pulse SaaS',
    industry: 'saas',
    metric: 'Mobile-first QA passed',
  },
  {
    id: 'james',
    quote: 'Documentation is unusually good for a template bundle. Our junior marketer updated copy and images without pinging engineering once.',
    name: 'James O\'Brien',
    role: 'Marketing Operations',
    company: 'Cartwell Retail',
    industry: 'ecommerce',
  },
];

export const INDUSTRY_LABELS: Record<Testimonial['industry'], string> = {
  ecommerce: 'eCommerce',
  b2b: 'B2B',
  agency: 'Agency',
  saas: 'SaaS',
};

export const TRUSTED_BY = [
  'Northline Supply',
  'Helix Analytics',
  'ForgeLine Industrial',
  'Brightpath Digital',
  'Meridian Home',
  'Apex Manufacturing',
];

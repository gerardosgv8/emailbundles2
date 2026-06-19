/**
 * Normalize Email Marketing Starter Kit to Harbor & Home brand + Welcome template styling.
 * Run: node scripts/build-email-marketing-starter-kit.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bundleDir = path.join(root, 'FinalBundles/EmailMarketing_StarterKit');
const referencePath = path.join(bundleDir, 'Welcome_&_Onboarding (3).html');

const YEAR = new Date().getFullYear();

const BRAND = {
  name: 'Harbor & Home',
  tagline: 'Curated essentials for everyday living',
  email: 'hello@harborandhome.com',
  address: '4820 Market Street&lt;br /&gt;Portland, OR 97205&lt;br /&gt;United States',
  footerTagline: 'Secure checkout • Free shipping $75+ • Easy returns',
};

const IMG = {
  logo: 'https://www.fmt.se/wp-content/uploads/2023/02/logo-placeholder-image.png',
  hero: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=300&fit=crop&q=80',
  hero540: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=540&h=360&fit=crop&q=80',
  lifestyle: [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1616046220941-74bdeed604c0?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1602874801006-7cc5de3f516c?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop&q=80',
  ],
  product270: [
    'https://images.unsplash.com/photo-1602874801006-7cc5de3f516c?w=270&h=180&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=270&h=180&fit=crop&q=80',
  ],
  product300: [
    'https://images.unsplash.com/photo-1602874801006-7cc5de3f516c?w=300&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1616046220941-74bdeed604c0?w=300&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop&q=80',
  ],
  product150: [
    'https://images.unsplash.com/photo-1602874801006-7cc5de3f516c?w=150&h=150&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop&q=80',
    'https://images.unsplash.com/photo-1616046220941-74bdeed604c0?w=150&h=150&fit=crop&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&h=150&fit=crop&q=80',
  ],
  thumb250: [
    'https://images.unsplash.com/photo-1616046220941-74bdeed604c0?w=250&h=150&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=250&h=150&fit=crop&q=80',
    'https://images.unsplash.com/photo-1608245447165-039f21875d55?w=250&h=150&fit=crop&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=250&h=150&fit=crop&q=80',
  ],
  featured400: 'https://images.unsplash.com/photo-1602874801006-7cc5de3f516c?w=400&q=80',
};

const PRODUCTS = [
  { name: 'Cedar & Sage Candle Set', price: '$28.00', compare: '$42.00', short: 'Candle Set' },
  { name: 'Stoneware Dinner Bowl Set', price: '$64.00', compare: '$89.00', short: 'Bowl Set' },
  { name: 'Organic Linen Throw Blanket', price: '$89.00', compare: '$120.00', short: 'Linen Throw' },
  { name: 'Botanical Hand Soap Trio', price: '$24.00', compare: '$36.00', short: 'Soap Trio' },
];

function extractThemeCss(html) {
  const m = html.match(/<style>\s*(\/\* Dark\/light mode[\s\S]*?)<\/style>/);
  return m ? m[1].trim() : null;
}

const THEME_CSS = extractThemeCss(fs.readFileSync(referencePath, 'utf8'));

function replaceAll(html, pairs) {
  let out = html;
  for (const [from, to] of pairs) {
    if (typeof from === 'string') out = out.split(from).join(to);
    else out = out.replace(from, to);
  }
  return out;
}

function normalizeColors(html) {
  const colorMap = [
    ['#1a1a1a', '#1f2937'],
    ['#1e40af', '#2563eb'],
    ['#3b82f6', '#2563eb'],
    ['#333333', '#1f2937'],
    ['#333', '#1f2937'],
    ['#666666', '#64748b'],
    ['#666', '#64748b'],
    ['#efefef', '#f1f5f9'],
    ['#fcf9f2', '#ffffff'],
    ['#f8fafc', '#ffffff'],
    ['#fafafa', '#f1f5f9'],
    ['#f9fafb', '#f1f5f9'],
    ['#e5e7eb', '#e2e8f0'],
    ['#577d4a', '#1f2937'],
    ['fillcolor="#1e40af"', 'fillcolor="#2563eb"'],
    ['strokecolor="#1e40af"', 'strokecolor="#2563eb"'],
    ['border-radius: 6px', 'border-radius: 8px'],
    ['border-radius: 0px', 'border-radius: 8px'],
    ['border-radius: 0;', 'border-radius: 8px;'],
    [/max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px/g, 'max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px'],
  ];
  return replaceAll(html, colorMap);
}

function normalizeBrand(html) {
  let out = html;
  const legacyBrands = ['Leaf Organic', 'Next Audio', 'KIVIK & CO.', 'KIVIK &amp; CO.'];
  for (const legacy of legacyBrands) {
    out = out.split(legacy).join(BRAND.name);
  }
  out = out.replace(/Your Company Name/g, BRAND.name);
  out = out.replace(/Your Brand/g, BRAND.name);
  out = out.replace(/support@yourcompany\.com/g, BRAND.email);
  out = out.replace(
    /123 Main Street&lt;br \/&gt;City, State 12345&lt;br \/&gt;United States/g,
    BRAND.address,
  );
  out = out.replace(
    /Secure checkout • Fast delivery • Easy returns/g,
    BRAND.footerTagline,
  );
  out = out.replace(/©\s*2026 Your Company Name/g, `©${YEAR} ${BRAND.name}`);
  out = out.replace(/©2026 Your Company Name/g, `©${YEAR} ${BRAND.name}`);
  out = out.replace(/© 2026 Your Company Name/g, `©${YEAR} ${BRAND.name}`);
  return out;
}

function normalizeImages(html) {
  let out = html;
  // Remove broken github asset URLs
  out = out.replace(/https:\/\/github\.com\/gersegal\/[^"'\s&]+/g, IMG.logo);

  const unsplashReplacements = [
    ['photo-1551434678-e076c223a692', 'photo-1441986300917-64674bd600d8'],
    ['photo-1505740420928-5e560c06d30e', 'photo-1602874801006-7cc5de3f516c'],
    ['photo-1523275335684-37898b6baf30', 'photo-1556909114-f6e7ad7d3136'],
    ['photo-1546868871-7041f2a55e12', 'photo-1616046220941-74bdeed604c0'],
    ['photo-1574944985070-8f3ebc6b79d2', 'photo-1596462502278-27bfdc403348'],
    ['photo-1542291026-7eec264c27ff', 'photo-1602874801006-7cc5de3f516c'],
    ['photo-1598300042247-d088f8ab3a91', 'photo-1556909114-f6e7ad7d3136'],
    ['photo-1460925895917-afdab827c52f', 'photo-1616046220941-74bdeed604c0'],
    ['photo-1507003211169-0a1dd7228f2d', 'photo-1556909114-f6e7ad7d3136'],
    ['photo-1559136555-9303baea8ebd', 'photo-1586023492125-27b2c045efd7'],
    ['photo-1551288049-bebda4e38f71', 'photo-1596462502278-27bfdc403348'],
    ['photo-1512389142860-9c449e58a543', 'photo-1616046220941-74bdeed604c0'],
  ];
  for (const [oldId, newId] of unsplashReplacements) {
    out = out.replaceAll(oldId, newId);
  }

  // Standardize logo src in header imgs (180 width)
  out = out.replace(
    /(<img[^>]*width="180"[^>]*src=")[^"]+(")/gi,
    `$1${IMG.logo}$2`,
  );

  return out;
}

function injectThemeCss(html) {
  if (!THEME_CSS) return html;
  let out = html.replace(/<style>[\s\S]*?<\/style>/g, '');
  return out.replace('</head>', `  <style>\n    ${THEME_CSS}\n  </style>\n</head>`);
}

const CONTENT_BY_FILE = {
  'Welcome_&_Onboarding (3).html': [
    ['Welcome to Our Platform', `Welcome to ${BRAND.name}`],
    ['Welcome aboard!', 'Welcome to Harbor & Home'],
    ["We're thrilled to have you join our community", BRAND.tagline],
    ['Welcome to our platform', 'Harbor & Home retail store'],
    ["Let's get you started", 'Start shopping smarter'],
    ["Hi there! We're excited to have you on board. Our platform is designed to help you achieve your goals faster and more efficiently. Here's what you can do to get the most out of your experience:", `Thanks for joining ${BRAND.name}. Discover thoughtfully made goods for your kitchen, home, and everyday rituals — with new arrivals each season.`],
    ['Subheader 1', 'Create your account'],
    ['Add your information to personalize your experience', 'Save your sizes, addresses, and wishlist for faster checkout.'],
    ['Subheader 2', 'Browse new arrivals'],
    ['Take a tour of our platform and discover powerful tools', 'Explore bestsellers in candles, kitchenware, textiles, and bath essentials.'],
    ['Subheader 3', 'Enjoy member perks'],
    ['Join discussions and learn from other users', 'Get early access to sales, free shipping updates, and styling tips.'],
    ['Get Started Now', 'Shop New Arrivals'],
    ['Subheader 4', 'Need a hand?'],
    ['Our support team is here to help you every step of the way.', 'Our customer care team can help with orders, returns, and product questions.'],
    ['Contact Support →', 'Contact Us →'],
  ],
  'Promotional_Campaign (4).html': [
    ['MEGA SALE - Up to 70% Off Everything!', 'Spring Home Sale — Up to 40% Off'],
    ['🔥 MEGA SALE - LIMITED TIME ONLY 🔥', 'SPRING HOME SALE — LIMITED TIME'],
    ['70% OFF', '40% OFF'],
    ['EVERYTHING!', 'SELECT HOME ESSENTIALS'],
    ['Mega Sale Products', 'Harbor & Home spring sale'],
    ["Don't Miss This Epic Sale!", 'Refresh every room for less'],
    ["Our biggest sale of the year is here! Save up to 70% on thousands of products across all categories. Limited time offer - don't wait!", 'Save on candles, kitchenware, linens, and bath favorites. Online and in-store — ends Sunday at midnight.'],
    ['Wireless Bluetooth Speaker', PRODUCTS[0].name],
    ['$47.99', '$16.80'],
    ['$159.99', PRODUCTS[0].compare],
    ['Pro Gaming Controller', PRODUCTS[1].name],
    ['Shop Mega Sale Now', 'Shop the Sale'],
    ['SHOP MEGA SALE NOW', 'SHOP THE SALE'],
  ],
  'Order_Confirmation_Email (5).html': [
    ['Order Confirmed - Thank You for Your Purchase', 'Order Confirmed — Harbor & Home'],
    ['Wireless Headphones', PRODUCTS[0].short],
    ['Premium Wireless Headphones', PRODUCTS[0].name],
    ['$199.99', PRODUCTS[0].price],
    ['Track Your Order', 'Track Your Order'],
  ],
  'Checkout_Abandonment_Email (7).html': [
    ['Complete Your Checkout', 'Your cart is waiting'],
    ['Shopping Cart', BRAND.name],
    ['Premium Wireless Headphones', PRODUCTS[0].name],
    ['Complete Checkout', 'Complete Checkout'],
    ['Items in your cart are selling fast', 'Good news — we saved your items'],
  ],
  'Image_Powered_3.html': [
    ['Visual Story - Image Powered Experience', 'Harbor & Home — Visual Story'],
    ['Visual Story', 'Life at Harbor & Home'],
    ['Experience our story through images', BRAND.tagline],
    ['Story Image 1', 'Candles & home fragrance'],
    ['Story Image 2', 'Kitchen essentials'],
    ['Story Image 3', 'Textiles & throws'],
    ['Story Image 4', 'Bath & body'],
    ['Story Image 5', 'Seasonal favorites'],
  ],
  'Product_Recommendations_4_Product_Grid_.html': [
    ['New Arrivals Logo', BRAND.name],
    ['Smart Speaker', 'Featured collection'],
    ['Wireless Earbuds', PRODUCTS[0].short],
    ['Smart Watch', PRODUCTS[1].short],
    ['Phone Case', PRODUCTS[2].short],
    ['Charging Cable', PRODUCTS[3].short],
    ['Shop All New Arrivals', 'Shop All Favorites'],
  ],
  'Product_Recommendations_Horizontal_2.html': [
    ['Store Logo', BRAND.name],
    ['Premium Headphones', PRODUCTS[0].name],
    ['Smart Watch', PRODUCTS[1].name],
    ['Wireless Charger', PRODUCTS[2].name],
    ['USB-C Hub', PRODUCTS[3].name],
    ['Picked for you', 'Recommended for you'],
    ['View Product', 'Shop Now'],
  ],
  'Product_Recommendations_Single_Product_.html': [
    ['Smart Speaker', 'Featured this week'],
    ['Pro Wireless Earbuds', PRODUCTS[0].name],
    ['Smart Fitness Watch', PRODUCTS[1].name],
    ['Protective Phone Case', PRODUCTS[2].name],
    ['Fast Charging Cable', PRODUCTS[3].name],
    ['Shop the Collection', 'Shop the Collection'],
  ],
  'Newsletter_Editorial_only_article_.html': [
    ['Business Weekly Logo', BRAND.name],
    ['Digital Transformation', 'The art of a well-styled shelf'],
    ['BUSINESS WEEKLY', 'HARBOR & HOME'],
    ['The Future of Digital Transformation', '5 ways to refresh your space on a budget'],
    ['How companies are adapting to the new digital landscape and what it means for your business strategy.', 'Simple styling tricks using trays, textiles, and scent to make everyday corners feel intentional.'],
    ['Read Full Article', 'Read the Story'],
    ['Sustainability', 'Kitchen refresh'],
    ['Remote Work', 'Cozy textiles'],
    ['AI Technology', 'Bath rituals'],
    ['Financial Growth', 'Seasonal hosting'],
  ],
  'Newsletter_Editorial_Trending_Topics_.html': [
    ['Business Weekly Logo', BRAND.name],
    ['BUSINESS WEEKLY', 'HARBOR & HOME'],
    ['Trending Topics', 'Trending at Harbor & Home'],
    ['Digital Transformation', 'Weekend pantry reset'],
    ['Sustainability', 'Linen care guide'],
    ['Remote Work', 'Table setting ideas'],
    ['AI Technology', 'Candle pairing tips'],
  ],
};

function applyFileContent(html, filename) {
  const pairs = CONTENT_BY_FILE[filename] ?? [];
  let out = html;
  for (const [from, to] of pairs) {
    out = out.split(from).join(to);
  }

  // Product name grid replacements (numbered)
  const productPatterns = [
    [/Wireless Earbuds|Wireless Bluetooth Speaker|Premium Headphones|Pro Wireless Earbuds/g, PRODUCTS[0].name],
    [/Smart Watch|Pro Gaming Controller|Gaming Controller/g, PRODUCTS[1].name],
    [/Phone Case|Wireless Charger|Protective Phone Case/g, PRODUCTS[2].name],
    [/Charging Cable|USB-C Hub|Fast Charging Cable/g, PRODUCTS[3].name],
  ];
  for (const [re, name] of productPatterns) {
    out = out.replace(re, name);
  }

  return out;
}

function fixProductImages(html) {
  let i = 0;
  let out = html.replace(/data-element="product-\d+-image"[^>]*src="[^"]+"/g, (match) => {
    const url = IMG.product150[i % IMG.product150.length];
    i += 1;
    return match.replace(/src="[^"]+"/, `src="${url}"`);
  });

  out = out.replace(/(<img[^>]*width="150"[^>]*src=")([^"]+)("[^>]*>)/g, (match, prefix, src, suffix) => {
    if (src.includes('logo-placeholder') || src.includes('github.com')) {
      const url = IMG.product150[i % IMG.product150.length];
      i += 1;
      return `${prefix}${url}${suffix}`;
    }
    return match;
  });

  return out;
}

function normalizeImagePowered(html) {
  let i = 0;
  return html.replace(/data-element="image-\d+"[^>]*src="[^"]+"/g, (match) => {
    const url = IMG.lifestyle[i % IMG.lifestyle.length];
    i += 1;
    return match.replace(/src="[^"]+"/, `src="${url}"`);
  }).replace(/v:imagedata src="[^"]+"/g, (match) => {
    const url = IMG.lifestyle[i % IMG.lifestyle.length];
    i += 1;
    return match.replace(/src="[^"]+"/, `src="${url}"`);
  });
}

function processFile(filename) {
  const filePath = path.join(bundleDir, filename);
  let html = fs.readFileSync(filePath, 'utf8');

  html = injectThemeCss(html);
  html = normalizeColors(html);
  html = normalizeBrand(html);
  html = normalizeImages(html);
  html = fixProductImages(html);
  html = applyFileContent(html, filename);

  if (filename === 'Image_Powered_3.html') {
    html = html.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/g, '');
    html = normalizeImagePowered(html);
    html = html.replace(/background-color: #f8fafc/g, 'background-color: #ffffff');
  }

  html = html.replace(
    /Free shipping on orders over \$50/g,
    'Free shipping on orders over $75',
  );

  // Alt text cleanup
  html = html.replace(/alt="Wireless Speaker"/g, `alt="${PRODUCTS[0].short}"`);
  html = html.replace(/alt="Wireless Headphones"/g, `alt="${PRODUCTS[0].short}"`);
  html = html.replace(/alt="Gaming Controller"/g, `alt="${PRODUCTS[1].short}"`);
  html = html.replace(/Hydration Cream/g, PRODUCTS[3].name);
  html = html.replace(/\$199\.99/g, PRODUCTS[0].price);
  html = html.replace(/\$249\.99/g, PRODUCTS[1].price);
  html = html.replace(/\$89\.99/g, PRODUCTS[2].price);
  html = html.replace(/\$129\.99/g, PRODUCTS[3].price);
  html = html.replace(
    /<title>Business Weekly[^<]*<\/title>/g,
    '<title>Harbor &amp; Home Journal</title>',
  );

  fs.writeFileSync(filePath, html);
  console.log(`updated: ${filename}`);
}

const files = fs.readdirSync(bundleDir).filter((f) => f.endsWith('.html'));
for (const file of files) {
  processFile(file);
}

console.log(`\nDone — ${files.length} templates normalized for ${BRAND.name}.`);

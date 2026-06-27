/**
 * Aligns Unsplash images with ForgeLine Industrial B2B template copy.
 * Run: node scripts/fix-industrial-b2b-bundle-2-images.mjs [bundleDir]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultDir = '/Users/gerardo/Downloads/Industrial B2B Bundle 2';
const bundleDir = process.argv[2] ?? defaultDir;

/** Verified Unsplash URLs (HTTP 200) — matched to template/product meaning. */
const IMG = {
  /** Technician at industrial equipment — Titan 9000 hero */
  pump: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop&q=80',
  /** Technician at pump / process equipment — horizontal catalog thumb */
  pumpThumb: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop&q=80',
  /** Industrial piping / mechanical assembly — valve thumb */
  valveThumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&q=80',
  pumpHeroGrid: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=540&h=360&fit=crop&q=80',

  /** Industrial machinery / flow equipment — ForgeGate valve */
  valve: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop&q=80',
  valveGrid: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=250&h=150&fit=crop&q=80',

  /** Factory production floor — LineFlow conveyor */
  conveyor: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=400&fit=crop&q=80',

  /** HVAC / air handling — AirHandler 500 */
  hvac: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop&q=80',
  hvacGrid: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=250&h=150&fit=crop&q=80',

  /** Safety / PPE gear — SafeGuard */
  ppe: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&q=80',
  ppeGrid: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=250&h=150&fit=crop&q=80',

  /** Overhead hoist / lifting — LiftMax */
  hoist: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=400&fit=crop&q=80',
  hoistGrid: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=250&h=150&fit=crop&q=80',

  /** SCADA / control panel — firmware update */
  controlPanel: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop&q=80',

  /** Conference / summit — event invitation */
  conference: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&q=80',

  /** Field service technician — TotalCare */
  technician: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop&q=80',

  /** Pump commissioning / mechanical install */
  installation: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&q=80',

  /** Warehouse / MRO parts inventory — volume promo */
  warehouse: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop&q=80',

  /** Manufacturing floor expansion — company update */
  factoryExpansion: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop&q=80',
  factoryFeatured: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=540&h=360&fit=crop&q=80',
};

/** Per-file: [data-element or role] → image key + alt text */
const FILE_PLAN = {
  '01_Product_Launch.html': [
    { element: 'hero-image', url: IMG.pump, alt: 'Titan Series 9000 industrial centrifugal pump and process piping' },
  ],
  '02_Product_Update.html': [
    { element: 'hero-image', url: IMG.controlPanel, alt: 'Titan Series pump control panel and firmware diagnostics' },
  ],
  '03_Products_Horizontal.html': [
    { element: 'product-1-image', url: IMG.pumpThumb, alt: 'Titan 9000 Centrifugal Pump skid package' },
    { element: 'product-2-image', url: IMG.valveThumb, alt: 'ForgeGate Pro Ball Valve assembly' },
    { element: 'product-3-image', url: IMG.ppe, alt: 'SafeGuard Industrial PPE Kit' },
  ],
  '04_Products_Catalog_Grid.html': [
    { element: 'hero-product-image', url: IMG.pumpHeroGrid, alt: 'Titan 9000 Pump Package skid installation' },
    { element: 'grid-product-1-image', url: IMG.valveGrid, alt: 'ForgeGate industrial ball valve' },
    { element: 'grid-product-2-image', url: IMG.hvacGrid, alt: 'AirHandler 500 industrial HVAC unit' },
    { element: 'grid-product-3-image', url: IMG.ppeGrid, alt: 'SafeGuard industrial PPE safety kit' },
    { element: 'grid-product-4-image', url: IMG.hoistGrid, alt: 'LiftMax industrial hoist system' },
  ],
  '05_Event_Invitation.html': [
    { element: 'hero-image', url: IMG.conference, alt: 'ForgeLine Industrial Summit 2026 conference session' },
  ],
  '06_Service_Launch.html': [
    { element: 'hero-image', url: IMG.technician, alt: 'ForgeLine TotalCare field service technician' },
  ],
  '07_Product_Enablement_Guide.html': [
    { element: 'hero-image', url: IMG.installation, alt: 'Titan 9000 pump commissioning and mechanical alignment' },
  ],
  '08_Promotion.html': [
    { element: 'hero-image', url: IMG.warehouse, alt: 'Industrial MRO parts warehouse and inventory' },
  ],
  '09_Company_Update.html': [
    { element: 'featured-image', url: IMG.factoryFeatured, alt: 'ForgeLine Cleveland manufacturing facility expansion' },
  ],
};

function htmlAttrUrl(url) {
  return url.replace(/&/g, '&amp;');
}

function replaceImgSrc(html, element, url, alt) {
  const escaped = element.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const encodedUrl = htmlAttrUrl(url);
  const imgRe = new RegExp(`<img\\b[^>]*\\bdata-element="${escaped}"[^>]*>`, 'i');
  const match = html.match(imgRe);
  if (!match) {
    throw new Error(`Could not find img with data-element="${element}"`);
  }

  let tag = match[0];
  tag = tag.replace(/\bsrc="[^"]*"/i, `src="${encodedUrl}"`);
  tag = tag.replace(/\balt="[^"]*"/i, `alt="${alt}"`);
  return html.replace(match[0], tag);
}

async function verifyUrl(url) {
  const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
  if (res.status === 405 || res.status === 501) {
    const getRes = await fetch(url, { method: 'GET', redirect: 'follow' });
    return getRes.ok;
  }
  return res.ok;
}

async function verifyAllUrls() {
  const urls = new Set();
  for (const plan of Object.values(FILE_PLAN)) {
    for (const { url } of plan) urls.add(url);
  }
  const failed = [];
  for (const url of urls) {
    const ok = await verifyUrl(url);
    if (!ok) failed.push(url);
  }
  if (failed.length) {
    console.error('Broken image URLs detected:');
    for (const url of failed) console.error('  ', url);
    process.exit(1);
  }
  console.log(`Verified ${urls.size} image URLs.\n`);
}

if (!fs.existsSync(bundleDir)) {
  console.error('Bundle directory not found:', bundleDir);
  process.exit(1);
}

await verifyAllUrls();

let updated = 0;
for (const [file, plan] of Object.entries(FILE_PLAN)) {
  const filePath = path.join(bundleDir, file);
  if (!fs.existsSync(filePath)) {
    console.warn('Skip missing:', file);
    continue;
  }
  let html = fs.readFileSync(filePath, 'utf8');
  for (const { element, url, alt } of plan) {
    html = replaceImgSrc(html, element, url, alt);
    console.log(`  ${file} → ${element}`);
  }
  fs.writeFileSync(filePath, html);
  updated += 1;
}

console.log(`\nUpdated images in ${updated} templates → ${bundleDir}`);

/**
 * Guards Brand Wizard CTA style policy: color/fill toggles must not wipe structure.
 * Run: node scripts/verify-cta-style-safety.mjs
 */
import assert from 'node:assert/strict';

const STRUCTURAL = new Set([
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'border-radius',
  'width',
  'height',
  'min-width',
  'max-width',
  'line-height',
  'font-size',
  'font-weight',
  'font-family',
  'display',
  'vertical-align',
  'letter-spacing',
  'white-space',
]);

function filterRemovals(properties, allowStructural = false) {
  return allowStructural
    ? properties
    : properties.filter((property) => !STRUCTURAL.has(property.toLowerCase()));
}

function removeFromStyle(style, properties, allowStructural = false) {
  let next = style;
  for (const property of filterRemovals(properties, allowStructural)) {
    const escaped = property.replace(/-/g, '\\-');
    next = next.replace(new RegExp(`(?:^|;)\\s*${escaped}\\s*:\\s*[^;]*`, 'gi'), '');
  }
  return next.replace(/^\s*;\s*/, '').replace(/;\s*;/g, ';').trim();
}

const sample =
  'display: inline-block; color: #2563eb; font-size: 16px; font-weight: 600; border-radius: 8px; padding: 14px 30px; line-height: 22px; border: none !important; background-color: #fff';

// Color/fill cleanup must preserve structure (the bug we hit).
const afterPaint = removeFromStyle(sample, [
  'background-color',
  'padding',
  'border-radius',
  'display',
  'margin',
  'border',
  'border-color',
  'border-width',
  'border-style',
]);

assert.match(afterPaint, /padding:\s*14px 30px/i, 'padding must survive paint cleanup');
assert.match(afterPaint, /border-radius:\s*8px/i, 'border-radius must survive paint cleanup');
assert.match(afterPaint, /display:\s*inline-block/i, 'display must survive paint cleanup');
assert.match(afterPaint, /font-size:\s*16px/i, 'font-size must survive paint cleanup');
assert.doesNotMatch(afterPaint, /background-color/i, 'fill may be cleared');

// Explicit structural relocate is allowed only with the opt-in flag.
const afterRelocate = removeFromStyle(
  sample,
  ['padding', 'border-radius'],
  true,
);
assert.doesNotMatch(afterRelocate, /padding:/i);
assert.doesNotMatch(afterRelocate, /border-radius:/i);

// `border` removal must not eat `border-radius`.
const borderOnly = removeFromStyle('border: 2px solid #000; border-radius: 8px; padding: 10px', [
  'border',
]);
assert.match(borderOnly, /border-radius:\s*8px/i);
assert.match(borderOnly, /padding:\s*10px/i);

console.log('verify-cta-style-safety: ok');

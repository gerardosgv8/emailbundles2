/**
 * Vercel dashboard overrides sometimes run raw `vite build` (not npm scripts).
 * Copying node_modules/.bin/vite to /usr/local/bin breaks relative imports — install globally instead.
 */
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

if (process.env.VERCEL !== '1') {
  process.exit(0);
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const viteRange = pkg.dependencies?.vite ?? pkg.devDependencies?.vite ?? '7.1.7';
const version = viteRange.replace(/^[^\d]*/, '') || '7.1.7';

try {
  execSync(`npm install -g vite@${version}`, { stdio: 'inherit' });
  execSync('vite --version', { stdio: 'inherit' });
  console.log(`ensure-vercel-vite: vite@${version} available globally`);
} catch (err) {
  console.warn('ensure-vercel-vite: global vite install failed:', err?.message ?? err);
  process.exit(0);
}

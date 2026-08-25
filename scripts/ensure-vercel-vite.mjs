/**
 * Vercel dashboard / git deploys sometimes run raw `vite build` (not npm scripts),
 * so `vite` is not on PATH. Prefer a shim that points at the local package.
 */
import { chmodSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

if (process.env.VERCEL !== '1') {
  process.exit(0);
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const viteJs = join(root, 'node_modules/vite/bin/vite.js');

if (!existsSync(viteJs)) {
  console.warn('ensure-vercel-vite: local vite not installed, skip shim');
  process.exit(0);
}

const shim = `#!/bin/sh
exec node ${JSON.stringify(viteJs)} "$@"
`;

const destDirs = ['/usr/local/bin', '/usr/bin', join(root, 'node_modules/.bin')];

for (const dir of destDirs) {
  try {
    mkdirSync(dir, { recursive: true });
    const dest = join(dir, 'vite');
    writeFileSync(dest, shim, { encoding: 'utf8' });
    chmodSync(dest, 0o755);
    console.log(`ensure-vercel-vite: wrote shim ${dest}`);
  } catch (err) {
    console.warn(`ensure-vercel-vite: could not write ${dir}:`, err?.message ?? err);
  }
}

try {
  execSync('vite --version', { stdio: 'inherit' });
} catch {
  console.warn('ensure-vercel-vite: vite still not on PATH (harmless if buildCommand is npm run vercel-build)');
}

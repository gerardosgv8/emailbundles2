/**
 * Vercel dashboard overrides sometimes run raw `vite build` (not npm scripts).
 * That fails with exit 127 when `vite` is not on PATH — link it during install on Vercel.
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
const viteRange = pkg.dependencies?.vite ?? pkg.devDependencies?.vite;
const version = viteRange?.replace(/^[^\d]*/, '') ?? '7.1.7';
const spec = `vite@${version}`;

try {
  execSync('npm link vite', { cwd: root, stdio: 'inherit' });
  console.log('ensure-vercel-vite: linked vite for shell PATH');
} catch {
  try {
    execSync(`npm install -g ${spec}`, { stdio: 'inherit' });
    console.log(`ensure-vercel-vite: installed ${spec} globally`);
  } catch (err) {
    console.warn('ensure-vercel-vite: could not expose vite on PATH:', err?.message ?? err);
  }
}

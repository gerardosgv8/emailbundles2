/**
 * Vercel dashboard overrides sometimes run raw `vite build` (not via npm scripts).
 * That fails with exit 127 because node_modules/.bin is not on PATH.
 * Install vite globally during postinstall so either build path works.
 */
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

if (process.env.VERCEL !== '1') {
  process.exit(0);
}

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const viteRange = pkg.dependencies?.vite ?? pkg.devDependencies?.vite;

if (!viteRange) {
  console.log('ensure-vite-cli: no vite dependency, skipping');
  process.exit(0);
}

const version = viteRange.replace(/^[^\d]*/, '');
const spec = version ? `vite@${version}` : 'vite';

try {
  execSync('npm link vite', { cwd: root, stdio: 'inherit' });
  console.log('ensure-vite-cli: linked vite for shell PATH');
} catch {
  try {
    execSync(`npm install -g ${spec}`, { stdio: 'inherit' });
    console.log(`ensure-vite-cli: installed ${spec} globally`);
  } catch (err) {
    console.warn('ensure-vite-cli: could not expose vite on PATH (non-fatal):', err?.message ?? err);
  }
}

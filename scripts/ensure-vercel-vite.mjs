/**
 * Vercel dashboard overrides sometimes run raw `vite build` (not npm scripts).
 * Symlink node_modules/.bin/vite onto PATH so that command succeeds if triggered.
 */
import { execSync } from 'node:child_process';
import { accessSync, chmodSync, constants, copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

if (process.env.VERCEL !== '1') {
  process.exit(0);
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const localVite = join(root, 'node_modules', '.bin', 'vite');

if (!existsSync(localVite)) {
  console.warn('ensure-vercel-vite: node_modules/.bin/vite missing after install');
  process.exit(0);
}

try {
  chmodSync(localVite, 0o755);
} catch {
  /* ignore */
}

const pathTargets = ['/usr/local/bin/vite', '/usr/bin/vite'].filter((target) => {
  try {
    const dir = dirname(target);
    accessSync(dir, constants.W_OK);
    return true;
  } catch {
    return false;
  }
});

for (const target of pathTargets) {
  try {
    copyFileSync(localVite, target);
    chmodSync(target, 0o755);
    console.log(`ensure-vercel-vite: installed vite shim at ${target}`);
    process.exit(0);
  } catch {
    /* try next */
  }
}

try {
  execSync('npm link vite', { cwd: root, stdio: 'inherit' });
  console.log('ensure-vercel-vite: linked vite via npm link');
} catch (err) {
  console.warn('ensure-vercel-vite: could not expose vite on PATH:', err?.message ?? err);
}

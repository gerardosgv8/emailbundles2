/**
 * Unified build entry — Vercel runs the stub; local/CI runs the full React app.
 */
import { execSync } from 'node:child_process';

if (process.env.VERCEL === '1') {
  execSync('node scripts/vercel-stub-dist.mjs', { stdio: 'inherit' });
} else {
  execSync('npx tsc --noEmit && npx vite --config config/vite.config.ts build', {
    stdio: 'inherit',
    shell: true,
  });
}

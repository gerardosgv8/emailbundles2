import { defineConfig } from 'vite';

/**
 * Vercel stub only — if the dashboard runs `vite build`, this builds public/ → dist/.
 * Full React app: npm run dev | npm run build:gh-pages (config/vite.config.ts).
 */
export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});

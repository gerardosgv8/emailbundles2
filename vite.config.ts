import { defineConfig } from 'vite';

/**
 * Vercel stub only — if the dashboard runs `vite build`, this builds vercel-public/ → dist/.
 * Full React app: npm run dev | npm run build:gh-pages (config/vite.config.ts).
 * Do not put index.html in /public — Vite copies it over the SPA on GitHub Pages.
 */
export default defineConfig({
  root: 'vercel-public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});

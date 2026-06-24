import { defineConfig } from 'vite';

/**
 * Vercel deploy stub only — builds public/index.html → dist/ (redirect to GitHub Pages).
 * Full React app: npm run dev | npm run build:gh-pages (uses config/vite.config.ts).
 */
export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});

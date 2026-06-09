# Mailcraft Studio

React marketing site + Brand Design Wizard for production-ready HTML email templates.

## Stack

- **Frontend:** Vite + React 19 + React Router
- **Brand Wizard:** React route at `/brand-wizard` (standalone HTML fallback in `brand-wizard/index.html`)
- **Legacy PHP:** `index.php`, `docs.php`, etc. kept for reference. Use the React app for local dev.

## Quick start

```bash
cd /Users/gerardo/Documents/VS_Studio/MailcraftStudio
npm install
npm run dev
```

Open [http://localhost:5174](http://localhost:5174)

### Production build

```bash
npm run build
npm run preview
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page (hero, features, FAQ, testimonials) |
| `/docs` | Documentation |
| `/products` | Product catalog (static for now) |
| `/testimonials` | Customer stories and results |
| `/faq` | Searchable FAQ with categories |
| `/brand-wizard` | Interactive brand token wizard → export `DESIGN_RULES.md` |

## Brand wizard

The wizard auto-saves to `localStorage` under key `mailcraft-studio-design-rules-v1`. Export produces a full `DESIGN_RULES.md` compatible with the Industrial B2B bundle.

A standalone copy also exists at `brand-wizard/index.html` (works without a dev server):

```bash
open brand-wizard/index.html
```

The same wizard ships with the Industrial B2B bundle at `newBundles3/FinalBundles/Industrial B2B bundle/Design_Rules/brand-wizard.html`.

## Structure

```
MailcraftStudio/
├── src/
│   ├── pages/           # Home, Docs, Products, BrandWizard
│   ├── components/      # Header, Footer, SiteLayout
│   ├── brand-wizard/    # Types, defaults, export, hooks
│   └── styles/          # site.css, brand-wizard.css
├── brand-wizard/        # Standalone HTML fallback
├── index.html           # Vite entry
└── legacy PHP files     # index.php, docs.php, … (optional)
```

## Next steps (backend)

1. Add product checkout when ready
2. Run `sql/schema.sql` when MySQL is wired up
3. Optional: persist Brand Wizard exports to a `design_rules` table

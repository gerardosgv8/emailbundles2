# Stripe + R2 delivery backend (Option A)

Lightweight serverless checkout and secure ZIP delivery for Mailcraft Studio.

**Stack:** Vercel Functions · Stripe Checkout · Cloudflare R2 · optional Resend email

---

## Architecture

```
[Products page] ──POST /api/create-checkout──> Stripe Checkout
                                                      │
                         checkout.session.completed   ▼
              [Stripe] ──────────────────────> /api/stripe-webhook
                                                      │
                                                      ▼
                                            R2 pre-signed URL (+ email)
                                                      │
[Success page] ──GET /api/verify-session──> download link for buyer
```

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/create-checkout` | POST | Start Stripe Checkout (`{ productId, email? }`) |
| `/api/stripe-webhook` | POST | Stripe webhook — fulfill on payment |
| `/api/verify-session` | GET | `?session_id=` — verify payment + return download URL |

ZIP files live in **R2 only**. Buyers get **time-limited pre-signed URLs** — never public bucket links.

---

## Project layout

```
api/
├── _lib/
│   ├── cors.ts          # CORS for GitHub Pages → Vercel API
│   ├── delivery.ts      # Fulfillment: metadata → R2 link + email
│   ├── email.ts         # Optional Resend delivery
│   ├── env.ts           # Env helpers
│   ├── products.ts      # product_id → Stripe Price + R2 key
│   ├── r2.ts            # Pre-signed URLs
│   ├── rawBody.ts       # Webhook signature verification
│   └── stripe.ts
├── create-checkout.ts
├── stripe-webhook.ts
└── verify-session.ts
vercel.json
.env.example
```

Add products in `api/_lib/products.ts` and matching env vars (`STRIPE_PRICE_*`).

---

## Setup checklist

### 1. Stripe

1. Create a **Product** + **Price** for Industrial B2B (or use Payment Link metadata in Dashboard only if you skip `create-checkout`).
2. Copy **Price ID** → `STRIPE_PRICE_INDUSTRIAL_B2B` in Vercel.
3. **Developers → API keys** → `STRIPE_SECRET_KEY`.
4. **Developers → Webhooks → Add endpoint**
   - URL: `https://YOUR-PROJECT.vercel.app/api/stripe-webhook`
   - Event: `checkout.session.completed`
   - Copy signing secret → `STRIPE_WEBHOOK_SECRET`

### 2. Cloudflare R2

1. Create bucket (e.g. `mailcraft-products`).
2. Upload `industrial-b2b.zip` (must match `r2Key` in `products.ts`).
3. **R2 → Manage R2 API tokens** → Access Key ID + Secret.
4. Set `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`.

### 3. Vercel

1. Import GitHub repo.
2. Add all env vars from `.env.example`.
3. Set `SITE_URL` to your live storefront (GitHub Pages or Vercel URL).
4. Set `ALLOWED_ORIGINS` to your frontend origin(s).
5. Deploy.

### 4. Frontend env (GitHub Pages)

In `.env.production` or Vercel build env:

```
VITE_API_URL=https://YOUR-PROJECT.vercel.app
```

Rebuild and deploy the site so checkout calls the API.

### 5. Post-purchase email (Resend)

1. Create account at [resend.com](https://resend.com) and **verify your sending domain**.
2. Create an API key → `RESEND_API_KEY` in Vercel.
3. Set `EMAIL_FROM` to an address on that domain (e.g. `Mailcraft Studio <downloads@yourdomain.com>`).
4. Set `SUPPORT_EMAIL` for reply-to on purchase emails.
5. Set `API_BASE_URL` to your Vercel API URL (used for download links in email).
6. Ensure Stripe webhook is configured (see §1) — **`checkout.session.completed`** triggers the email.
7. The success page also attempts delivery as a fallback; emails are **idempotent** (one per session).

Flow:

```
Stripe payment → webhook → fulfill + Resend email (download + Brand Wizard links)
Success page   → verify-session → same fulfillment (skips email if already sent)
```

---

## Local development

```bash
cp .env.example .env.local   # fill keys (test mode)
npm install
npm run dev                    # Vite frontend :5174

# In another terminal — Vercel dev runs api/ routes:
npx vercel dev
```

Use Stripe CLI to forward webhooks locally:

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

---

## Purchase log

- **Stripe Dashboard** — customers, payments, metadata (`product_id`), transaction IDs (zero extra code).
- **Vercel function logs** — `[delivery]` lines with email + tx id.
- Optional later: Google Sheets / Upstash / Neon from the webhook (see conversation notes).

---

## Security notes

- Webhook verifies `stripe-signature` before fulfilling.
- R2 objects are private; only pre-signed URLs are issued.
- `DOWNLOAD_LINK_TTL_SECONDS` limits link sharing (default 24h).
- Never commit `.env` or expose `STRIPE_SECRET_KEY` in the frontend.

---

## Adding a new product

1. Upload `{product-id}.zip` to R2.
2. Add entry to `api/_lib/products.ts`.
3. Create Stripe Price → env `STRIPE_PRICE_*`.
4. Add `checkoutProductId` on the bundle in `src/data/templateBundles.ts`.

# Lemon Squeezy migration guide (Mailcraft Studio)

> **Reusable scaffold:** see [`/Users/gerardo/Documents/VS_Studio/LemonSqueezy_apps_boilerplate`](file:///Users/gerardo/Documents/VS_Studio/LemonSqueezy_apps_boilerplate) (separate from this product repo).

Checkout is **Lemon Squeezy hosted buy link**. Stripe Checkout, webhooks, and R2 download delivery were removed. **Buyers unlock the Brand and Content Wizards** with email + order number verified against the Lemon Squeezy API.

Lemon Squeezy docs: [Help](https://docs.lemonsqueezy.com/help) · [Checkout](https://docs.lemonsqueezy.com/help/checkout) · [API](https://docs.lemonsqueezy.com/api)

---

## Current architecture

```
[GitHub Pages /products]
        Buy now → Lemon Squeezy hosted checkout
                     │
                     ▼
           Lemon Squeezy confirmation + receipt email (files)
                     │
[/purchase/success] thank-you + "Unlock wizards" CTA
                     │
[/wizard-access] email + order # → POST /api/verify-purchase
                     │
         Lemon Squeezy Orders API (paid, not refunded, variant match)
                     │
         HMAC session token (30 days) → sessionStorage
                     │
[Brand / Content Wizards] gated by WizardGate + Bearer validation
```

| Concern | Owner |
|---|---|
| Card / Apple Pay / tax / receipt / files | Lemon Squeezy |
| Buy URL | `LEMON_SQUEEZY_STARTER_KIT_CHECKOUT_URL` |
| Wizard buyer gate | Vercel `POST /api/verify-purchase`, `GET /api/wizard-session` |
| Storefront + wizards UI | GitHub Pages (Vite) |
| Serverless API | Vercel |

---

## Vercel environment variables (required)

| Variable | Purpose |
|---|---|
| `LEMONSQUEEZY_MODE` | `test` (default) or `live` — **single switch** for API key, checkout URL, and variant |
| `LEMONSQUEEZY_API_KEY` | Test mode API key (wizard verify) |
| `LEMONSQUEEZY_API_KEY_LIVE` | Live mode API key (set before go-live) |
| `LEMONSQUEEZY_CHECKOUT_URL_LIVE` | Live hosted checkout URL (required when `LEMONSQUEEZY_MODE=live`) |
| `LEMONSQUEEZY_VARIANT_STARTER_KIT` | Test variant id (optional; locks wizard unlock to Starter Kit) |
| `LEMONSQUEEZY_VARIANT_STARTER_KIT_LIVE` | Live variant id (recommended when live) |
| `WIZARD_SESSION_SECRET` | Long random string; HMAC-signs wizard session tokens |
| `SITE_URL` | `https://www.mailcraft.studio` |
| `ALLOWED_ORIGINS` | CORS allowlist for GitHub Pages + custom domain |

Generate `WIZARD_SESSION_SECRET` once (e.g. `openssl rand -base64 48`) and set it in Vercel Production + Preview.

### Test mode (current)

Keep `LEMONSQUEEZY_MODE=test` (or unset). Vercel uses:

- `LEMONSQUEEZY_API_KEY` → wizard verification against **test** orders
- Default test checkout URL in code (override with `LEMONSQUEEZY_CHECKOUT_URL` if needed)
- `LEMONSQUEEZY_VARIANT_STARTER_KIT` → optional test variant lock

Buy button and wizard unlock both read config from the **Vercel API** — no GitHub Pages redeploy needed when switching mode.

### Go live checklist

When you are ready for real sales, complete these steps **in order**:

1. **Lemon Squeezy dashboard** → switch to **Live mode** (bottom-left toggle).
2. **Copy product to live** if needed (Products → ⋮ → Copy to Live Mode). Live checkout URLs and variant ids **differ** from test.
3. **Vercel → emailbundles2 → Environment Variables** — set for **Production** (and Preview if you use it):

   | Variable | Value |
   |---|---|
   | `LEMONSQUEEZY_API_KEY_LIVE` | Live API key (Settings → API, while dashboard is in Live mode) |
   | `LEMONSQUEEZY_CHECKOUT_URL_LIVE` | Live hosted buy link (Product → Share → checkout URL) |
   | `LEMONSQUEEZY_VARIANT_STARTER_KIT_LIVE` | Live variant id (Product → variant → id in URL or API) |
   | `LEMONSQUEEZY_MODE` | `live` |

4. **Redeploy Vercel** (or push a commit). Env-only changes may need a redeploy to apply to functions.
5. **Smoke test**
   - `/products` → Buy now → live Lemon Squeezy checkout (not test banner)
   - Complete a small live purchase (or use LS test card in live if available)
   - `/wizard-access` → unlock with receipt email + order number
6. **Do not redeploy GitHub Pages** for the mode switch — Buy uses `POST /api/create-checkout`, which picks the URL from `LEMONSQUEEZY_MODE`.

**What the code does automatically when `LEMONSQUEEZY_MODE=live`:**

| Behavior | Test | Live |
|---|---|---|
| Wizard verify API key | `LEMONSQUEEZY_API_KEY` | `LEMONSQUEEZY_API_KEY_LIVE` |
| Checkout URL | test default / `LEMONSQUEEZY_CHECKOUT_URL` | `LEMONSQUEEZY_CHECKOUT_URL_LIVE` |
| Variant check | `LEMONSQUEEZY_VARIANT_STARTER_KIT` | `LEMONSQUEEZY_VARIANT_STARTER_KIT_LIVE` |
| Test orders unlock wizards | Yes | **No** (rejected) |

To roll back to testing, set `LEMONSQUEEZY_MODE=test` and redeploy Vercel.

---

## Security notes

- **Never** expose `LEMONSQUEEZY_API_KEY` or `WIZARD_SESSION_SECRET` to the frontend.
- Verification uses generic error copy + short delay on failure (reduces email/order enumeration).
- Session tokens are HMAC-SHA256 with `timingSafeEqual`; **7-day** TTL; stored in **sessionStorage** (tab-scoped).
- Optional hardening: Vercel Firewall rate limit on `POST /api/verify-purchase`.

### Anti-sharing (Option A — implemented)

Each purchase can unlock wizards on **up to 2 devices** (configurable). Sessions last **7 days** per browser. Requires **Upstash Redis** via the Vercel Marketplace (Vercel KV is discontinued).

| Control | What it does |
|---|---|
| Device cap | New browser fingerprint blocked after 2 devices registered for that order |
| Same device re-unlock | Does **not** consume a slot (buyer can clear sessionStorage and unlock again on the same laptop) |
| Rate limits | 20 attempts / hour / IP; 10 / hour / order |
| Audit trail | Redis stores device hashes + blocked attempts per order |

**How to tell if credentials are being shared**

You cannot prove intent, but these **signals** are stored automatically:

1. **`deniedAttempts` > 0** — a third (or more) device tried to unlock after the cap.
2. **Multiple distinct blocked device hashes** — several different people attempted with the same receipt.
3. **Vercel function logs** — `[wizard-unlock] device cap hit — possible credential sharing` with `orderId`.

**Investigate an order** (after setting `WIZARD_AUDIT_SECRET` on Vercel):

```bash
curl "https://emailbundles2.vercel.app/api/wizard-unlock-audit?orderId=ORDER_ID" \
  -H "Authorization: Bearer YOUR_WIZARD_AUDIT_SECRET"
```

Response includes `sharingSignals.likelySharing` and human-readable `notes`. Device keys are one-way hashes (IP + browser), not raw PII.

**User-facing issue codes** (shown on `/wizard-access` with a support reference):

| Code | Meaning |
|---|---|
| `VERIFY_NOT_FOUND` | Email + order did not match a paid order |
| `ORDER_REFUNDED` | Order was refunded |
| `ORDER_NOT_PAID` | Payment not completed yet |
| `TEST_ORDER_LIVE_MODE` | Test purchase while store is in live mode |
| `WRONG_PRODUCT` | Order is not the Starter Kit |
| `DEVICE_LIMIT` | More than 2 devices tried to unlock |
| `RATE_LIMIT_IP` | Too many attempts from this network |
| `RATE_LIMIT_ORDER` | Too many attempts for this order |
| `SERVER_ERROR` | Temporary server problem |

Each response includes `supportReference` like `MC-DEVICE_LIMIT-A1B2C3` for Contact / support.

### Connect Upstash Redis (device limits)

**Vercel KV is gone.** New stores are created as **Upstash Redis** from the Marketplace. You will not see a “KV” card.

Device caps and rate limits need Redis. Until it is connected, unlock still works but **without** the 2-device limit.

1. Open [Upstash Redis on the Vercel Marketplace](https://vercel.com/marketplace/upstash) and click **Install** (or **Add**).
2. Choose to let Vercel manage Upstash (simplest) or connect an existing Upstash account.
3. Create a Redis database:
   - Name: `mailcraft-wizard`
   - Region: close to `iad1` / US East if possible
   - Plan: **Free** is enough for wizard unlocks
4. **Connect** it to project **emailbundles2**, environments **Production** and **Preview**.
5. Confirm these env vars appeared on the project (Vercel injects them). Either pair is valid:
   - `KV_REST_API_URL` + `KV_REST_API_TOKEN` (what some Marketplace Redis stores still inject)
   - `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`
6. **Redeploy** Production so functions pick up the new env vars.
7. **Verify:** unlock from two different browsers with a test order; a third should show **Device limit reached** (`DEVICE_LIMIT`).

From the project instead: **emailbundles2 → Storage / Marketplace** → browse storage → **Redis** → **Upstash**.

Optional: set `WIZARD_AUDIT_SECRET` (long random string) to use `GET /api/wizard-unlock-audit?orderId=…` for sharing investigation.

---

## What was removed

- Stripe checkout, webhooks, `session_id` verify/download
- Cloudflare R2 presigned downloads and `@aws-sdk/*` dependencies
- Public unauthenticated wizard routes (redirect to `/wizard-access`)

## What stays optional (not on buy path)

- `api/_lib/email.ts` / Resend helpers — unused unless you add a post-purchase webhook email later
- `api/create-checkout` — returns the LS hosted URL (Buy button uses the URL directly)

---

## Legacy sections below

The remainder of this file documents the original Stripe → Lemon Squeezy cutover plan and R2 download design. **That R2 path is no longer planned.** Keep for historical reference only.


```
[GitHub Pages /products]
        POST /api/create-checkout { productId }
                     │
                     ▼
           Lemon Squeezy Checkout
        redirect: /purchase/success?order_id={order_id}
                     │
              order_created webhook
                     ▼
         POST /api/lemonsqueezy-webhook
                     │
         persist order (download limits) in KV/DB
         send Resend email with /api/download?order_id=
                     │
[Success page] GET /api/verify-order?order_id=
[Download]     GET /api/download?order_id=
                     │
              R2 presigned URL (unchanged)
```

Do **not** attach the ZIP as a public Lemon Squeezy file if we keep R2. LS receipts should point at our gated `/api/download` link (or we keep Resend as the only download mail).

---

## What stays (do not migrate)

- Cloudflare R2 bucket, keys, `r2Key` mapping for the starter kit ZIP
- Download policy: `DOWNLOAD_ACCESS_DAYS`, `MAX_DOWNLOADS_PER_PURCHASE`, `PRESIGNED_URL_TTL_SECONDS`
- `api/_lib/r2.ts`, most of `api/_lib/email.ts` / Resend template
- GitHub Pages frontend, Brand / Content Wizards
- `SITE_URL`, `ALLOWED_ORIGINS`, `API_BASE_URL`, `VITE_API_URL`
- Product catalog id `email-marketing-starter-kit` in `src/data/templateBundles.ts`

## What must migrate (replace)

| Stripe today | Lemon Squeezy after |
|---|---|
| Checkout Session | Checkout (hosted or overlay) + **Order** |
| `session_id` | `order_id` (numeric string from LS) |
| Price ID `price_…` | **Variant ID** (and Store ID) |
| `STRIPE_SECRET_KEY` | LS **API key** |
| `STRIPE_WEBHOOK_SECRET` | LS **webhook signing secret** |
| `checkout.session.completed` | `order_created` (plus `order_refunded`) |
| Limits on session metadata | Our **order store** (KV/DB) — LS has no equivalent of Stripe session metadata we write |

**New dependency:** a durable store for `{ orderId, email, productId, downloadCount, purchaseAt, emailedAt }`. Options: Vercel KV, Redis, Postgres, or similar. Do not put counters only in LS custom data; webhooks can replay and we need atomic increment on download.

---

## Information needed from the Lemon Squeezy account

Collect these before writing code. Use **test mode** first, then repeat for **live**.

### Store

| Need | Where in Lemon Squeezy | Env / config |
|---|---|---|
| **Store ID** | Settings → Stores (numeric) | `LEMONSQUEEZY_STORE_ID` |
| **Store slug / domain** | Store settings | docs / support copy only |
| Test mode vs live | Toggle in dashboard | separate API keys and webhook endpoints |

Activate the store, verify identity, set tax category for a **digital download**, and confirm prohibited-product / payout status so live charges are allowed. See [Getting started](https://docs.lemonsqueezy.com/help/getting-started).

### Product

| Need | Where | Env / config |
|---|---|---|
| **Product ID** | Products → Starter Kit | optional logging |
| **Variant ID** | Product → variant (the $79.99 one-time variant) | `LEMONSQUEEZY_VARIANT_STARTER_KIT` |
| Product name / price | Must match storefront `$79.99` and tax inclusive/exclusive | `api/_lib/products.ts` + Products page |
| File attachment | Leave **empty** if R2 remains source of truth | — |
| **Checkout (buy) link** | Product → Share / checkout | `https://mailcraftstudio.lemonsqueezy.com/checkout/buy/bdef8cc4-db85-402e-8504-723f5bedd9fb` (wired in the storefront) |
| Redirect / confirmation URL | Product or checkout overlay settings, also set in API checkout | `SITE_URL/purchase/success?order_id=` |

Create one product: **Email Marketing Starter Kit**. One variant, one-time payment, not a subscription.

Optional later: **license keys** on the variant if wizards become buyer-gated ([Licensing](https://docs.lemonsqueezy.com/help/licensing)).

### API

| Need | Where | Env |
|---|---|---|
| **API key (test)** | Settings → API | `LEMONSQUEEZY_API_KEY` (`sk_test_…` style from LS) |
| **API key (live)** | Same, live mode | same env name on production Vercel only |
| API version | Header `Accept: application/vnd.api+json` | in client helper |

Never expose this key in Vite / GitHub Pages.

### Webhooks

| Need | Where | Env |
|---|---|---|
| **Signing secret** | Settings → Webhooks → endpoint | `LEMONSQUEEZY_WEBHOOK_SECRET` |
| Endpoint URL | `https://emailbundles2.vercel.app/api/lemonsqueezy-webhook` | dashboard |
| Events | At minimum `order_created`, `order_refunded` | dashboard |

Also subscribe to `order_updated` only if you need status changes beyond created/refunded.

Verify `X-Signature` on every request ([Signing requests](https://docs.lemonsqueezy.com/help/webhooks/signing-requests)).

### Checkout / branding (optional but needed for polish)

| Need | Where | Used for |
|---|---|---|
| Overlay vs hosted checkout | Checkout settings / Lemon.js | whether we keep `create-checkout` or embed Lemon.js |
| Checkout link or overlay settings | Product share / checkout | fallback if API checkout is unused |
| Custom data fields | Checkout API `checkout_data.custom` | pass `product_id` + `bundle_id` |
| Receipt email customization | Emails / receipts | put gated download URL or disable LS file download ([Receipt emails](https://docs.lemonsqueezy.com/help/checkout/customizing-receipt-emails)) |
| Button / overlay theme | Checkout overlay | match Mailcraft colors |
| PayPal / extra methods | Payments | confirm they are acceptable for this SKU |

### Test vs live checklist (copy into a password manager)

```
TEST
  Store ID:
  Variant ID (Starter Kit):
  API key:
  Webhook signing secret:
  Webhook URL: https://…/api/lemonsqueezy-webhook  (or Vercel preview)

LIVE
  Store ID:          (often same store, live mode)
  Variant ID:
  API key:
  Webhook signing secret:
  Webhook URL: https://emailbundles2.vercel.app/api/lemonsqueezy-webhook
```

You need **two** webhook secrets if test and live endpoints differ.

---

## Files that must be updated

### Backend (Vercel `api/`)

| File | Change |
|---|---|
| `api/_lib/products.ts` | Map `email-marketing-starter-kit` → LS variant env, not `STRIPE_PRICE_*` |
| `api/_lib/env.ts` | `getLemonSqueezyApiKey`, webhook secret, store/variant ids; drop Stripe getters after cutover |
| `api/_lib/stripe.ts` | Delete after Stripe sunset (keep during overlap) |
| `api/create-checkout.ts` | Create LS checkout; return `{ url }`. Redirect success to `order_id` |
| `api/stripe-webhook.ts` | Keep until Stripe windows expire; add `api/lemonsqueezy-webhook.ts` |
| `api/_lib/rawBody.ts` | Reuse for LS signature (raw body required) |
| `api/_lib/delivery.ts` | Fulfill from LS order payload, not Stripe session |
| `api/_lib/downloadAccess.ts` | Read/write counts from **order store**, not `stripe.checkout.sessions.update` |
| `api/verify-session.ts` | Accept `order_id` (alias `session_id` during overlap) or add `api/verify-order.ts` |
| `api/download.ts` | Key downloads by `order_id`; keep `session_id` for old Stripe buyers |
| `api/_lib/clientError.ts` | LS error patterns; stop leaking API keys |
| `api/_lib/email.ts` | Download URL query `order_id` |
| `package.json` | Add LS SDK or `fetch` to `https://api.lemonsqueezy.com/v1`; remove `stripe` after sunset |

### Frontend

| File | Change |
|---|---|
| `src/lib/checkout.ts` | Success/download query param `order_id`; `verifyPurchaseSession` → verify order |
| `src/pages/PurchaseSuccessPage.tsx` | Read `order_id` (and `session_id` fallback) |
| `src/pages/ProductsPage.tsx` | “Powered by Lemon Squeezy” (or MoR wording), not Stripe |
| `src/data/faq.ts` | Refunds, receipts, tax, download support → LS + our email |
| Docs / Home only if they mention Stripe checkout |

### Config / ops

| File | Change |
|---|---|
| `.env.example` | LS vars; comment Stripe as legacy |
| Vercel project env | Test + production secrets (below) |
| `Log/stripe-delivery-scaffolding.md` | Leave as historical; this file is the new source of truth |
| `vercel.json` | No Stripe-specific routes; new webhook path is just another `/api/*` function |

`src/lib/checkout.ts` `startCheckout(productId)` can stay. Only the **server** behind `/api/create-checkout` switches providers.

---

## Environment variables

### Add (Lemon Squeezy)

```
LEMONSQUEEZY_API_KEY=
LEMONSQUEEZY_WEBHOOK_SECRET=
LEMONSQUEEZY_STORE_ID=
LEMONSQUEEZY_VARIANT_STARTER_KIT=

# If using Vercel KV / Redis for order access state:
KV_REST_API_URL=
KV_REST_API_TOKEN=
```

### Keep

```
R2_*                    SITE_URL
ALLOWED_ORIGINS         DOWNLOAD_ACCESS_DAYS
MAX_DOWNLOADS_PER_PURCHASE
PRESIGNED_URL_TTL_SECONDS
RESEND_API_KEY          EMAIL_FROM
SUPPORT_EMAIL           RESEND_PURCHASE_TEMPLATE_ID
API_BASE_URL            VITE_API_URL
```

### Remove after Stripe sunset

```
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_EMAIL_MARKETING_STARTER_KIT
```

During overlap, keep Stripe env on Vercel so `/api/download?session_id=` still verifies old sessions.

---

## Custom data we must send on every checkout

Lemon Squeezy checkout (API or overlay) should include:

```json
{
  "product_id": "email-marketing-starter-kit",
  "bundle_id": "email-marketing-starter-kit"
}
```

Webhook handler must trust **paid order + variant id**, then map variant → `r2Key`. Custom data is a convenience, not the only check.

---

## Existing Stripe buyers

- New buys → Lemon Squeezy.
- Old Stripe `session_id` links work until `DOWNLOAD_ACCESS_DAYS` (and a support buffer).
- Do **not** import Stripe customers into LS for this SKU; they already have (or had) the ZIP.
- Do not disable the Stripe webhook or delete Stripe Price until those windows and any disputes are closed.
- Overlap API: download accepts `order_id` **or** `session_id`.

LS “migrate from Stripe” tooling is aimed at products/subscribers. This shop is a **cutover**, not a customer import.

---

## Implementation order

1. Create LS store + test product/variant; copy IDs and test API key (table above).
2. Add order store (KV).
3. Implement `create-checkout` → LS checkout URL (feature flag `PAYMENTS_PROVIDER=lemonsqueezy|stripe`).
4. Implement `lemonsqueezy-webhook` (`order_created`, `order_refunded`).
5. Point success page at `order_id`; keep `session_id` fallback.
6. Test mode buy → email → 3 downloads / 7 days → refund blocks download.
7. Live product + live webhook + live API key on Vercel production.
8. Flip flag to Lemon Squeezy; one live order end-to-end.
9. After Stripe windows expire: delete Stripe routes, SDK, env, dashboard webhook.

Suggested first PR (code): flag + LS checkout + webhook + KV, Stripe still default.

---

## Test plan

- [ ] Test checkout opens LS, cancel returns to `/products?checkout=cancelled`
- [ ] Paid test order lands on `/purchase/success?order_id=…` with download CTA
- [ ] Resend (or LS receipt) contains gated `/api/download?order_id=`
- [ ] Download increments remaining; 4th click (if max is 3) is rejected
- [ ] After `DOWNLOAD_ACCESS_DAYS`, download rejected
- [ ] Refunded order cannot download
- [ ] Duplicate `order_created` does not double-email
- [ ] Old `/purchase/success?session_id=` still works until sunset
- [ ] Copy no longer says Stripe on Products / success / FAQ

---

## Dashboard settings to confirm (not just secrets)

- Production **webhook** URL is the Vercel API host, not GitHub Pages
- Test and live webhooks are different secrets
- Store is **activated** and payouts enabled before live traffic
- Variant currency/price matches the Products page
- No public file on the variant (avoids ungated ZIP)
- Redirect URL should be `https://www.mailcraft.studio/purchase/success?order_id=` (apex `mailcraft.studio` is equivalent; GitHub redirects between www and apex)

---

## Out of scope for this cutover

- Wizard buyer gating (pin from earlier; LS license keys can be a later phase)
- Recurring billing
- Multi-product catalog (only starter kit is sold)
- Moving the ZIP into Lemon Squeezy file hosting (possible later; not required)

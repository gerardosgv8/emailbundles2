# Bundle Scaffolding Plan

Boilerplate for adding new Mailcraft template bundles. Templates can differ in **design and content**, but all bundles use the **same centralized Brand Wizard** (shared brand tokens) and must follow the **element alignment rules** so apply/export works.

**Start here for element fixes:** [wizard-element-alignment.md](./wizard-element-alignment.md) — buttons, hooks, preview CSS, apply order, verify scripts.

Use [new-bundle-checklist.md](./templates/new-bundle-checklist.md) per bundle when shipping.

---

## 1. Core principle: different designs, unified wizard

Brand elements are largely the same across template packs (primary color, headings, body text, buttons, footer, font stack). **One Brand Wizard** serves all bundles; each bundle adds its own HTML templates plus registry/apply dispatch.

```
┌─────────────────────────────────────────────┐
│  Brand Wizard (centralized)                 │
│  Shared steps · shared tokens               │
│  State keyed by bundleId in localStorage    │
└────────────────────┬────────────────────────┘
                     │ DesignRulesState
                     ▼
┌─────────────────────────────────────────────┐
│  Per-bundle apply layer                     │
│  Registry: hooks → profiles → tokens        │
└────────────────────┬────────────────────────┘
                     ▼
         ┌───────────┴───────────┐
         ▼                       ▼
   Industrial B2B HTML     Future bundle HTML
   (any layout)             (any layout)
```

**Per bundle:** templates, `data-element` hooks, generated registry, apply engine branch, field meta (which hooks each token hits in **that** pack).

**Shared:** wizard UI, token schema, button/link/typography/color fields, apply primitives (`styleUtils`), zip export flow.

### What varies freely (design & content)

| Dimension | Examples |
|-----------|----------|
| Visual design | Minimal vs editorial vs bold promo |
| Layout | Grids, timelines, single-column, etc. |
| Content & template count | 5–15 templates; bundle-specific copy |
| Hook names | `flash-hero-title` vs `launch-title` — classified by **profile** |
| Field meta hints | “Used in templates 03, 07” for this bundle’s catalog |

### What must align (see [wizard-element-alignment.md](./wizard-element-alignment.md))

| Requirement | Summary |
|-------------|---------|
| Filled CTAs | TD (`*-cta-button`) + anchor; primary/secondary tokens only |
| Preview CSS | Exclude `*-cta-button` TDs from blanket bg resets |
| Inline styles | Valid semicolons; verify script catches corruption |
| `data-element` hooks | Every brandable region; sync registry after changes |
| Apply order | Elements → logo → surfaces → typography → inject CSS → links |

**Rule of thumb:** creative layout is free; **brand plumbing** must match the alignment log.

---

## 2. What a “bundle” is

A bundle is a **closed set of HTML templates** plus **registry/apply wiring** into the **shared Brand Wizard** token set.

| Layer | Role |
|-------|------|
| **Templates** | `FinalBundles/{Bundle Name}/` — any design |
| **Element alignment** | Hooks, profiles, button TD pattern — [wizard-element-alignment.md](./wizard-element-alignment.md) |
| **Registry + apply** | Per-bundle hook map and engine branch |
| **Wizard** | Centralized tokens; field meta documents which hooks this bundle uses |

---

## 3. Target folder layout

```
MailcraftStudio/
├── FinalBundles/
│   └── {Bundle Display Name}/          # e.g. "Retail D2C Bundle"
│       ├── 01_....html
│       ├── 02_....html
│       └── ...
├── Log/
│   ├── README.md
│   ├── bundle-scaffolding-plan.md      # this file
│   └── {bundle-id}/                    # per-bundle notes + checklist copy
│       └── checklist.md
├── scripts/
│   ├── sync-{bundleId}-registry.mjs    # generate element registry
│   ├── verify-{bundleId}-templates.mjs # structural HTML validation
│   └── patch-{bundleId}-preview-css.mjs  # optional; button TD CSS guards
└── src/
    ├── data/templateBundles.ts         # product catalog + wizardAvailable flag
    └── brand-wizard/
        ├── bundles/
        │   ├── {bundleId}FieldMeta.ts        # which shared wizard fields hit this bundle
        │   └── {bundleId}BundleKnowledge.ts
        └── apply/
            ├── {bundleId}ElementRegistry.ts   # AUTO-GENERATED — do not hand-edit
            ├── {bundleId}ApplyEngine.ts
            └── applyBrandToHtml.ts          # dispatches by bundleId (today: industrial only)
```

**Naming conventions**

| Thing | Pattern | Example |
|-------|---------|---------|
| Bundle id (code) | kebab-case | `retail-d2c` |
| Bundle folder | Title Case | `FinalBundles/Retail D2C Bundle/` |
| Template files | `{NN}_{Snake_Case}.html` | `01_Flash_Sale.html` |
| TS modules | camelCase + bundle prefix | `retailD2cApplyEngine.ts` |

---

## 4. Template authoring rules (wizard contract)

These rules are **not** about making every bundle look like Industrial B2B. They are the minimum structure so **any** design survives the wizard apply pass and exports clean HTML.

### 4.1 `data-element` hooks

- Every brandable region gets a **stable, unique** `data-element="..."` attribute.
- Hooks are the contract between HTML and the wizard. Renaming a hook requires re-syncing the registry.
- Prefer semantic names: `header-kicker`, `hero-title`, `footer-company-name`, `product-2-cta`.

**Naming patterns** (used by the registry classifier):

| Pattern | Typical profile |
|---------|-----------------|
| `footer-*` | Footer text / links / social |
| `*-heading`, `*-title` | Headings |
| `*-description`, `*-summary` | Body copy |
| `*-cta-button` on `<td>` | Filled button cell (primary or secondary TD) |
| `*-cta` on `<a>` | Button label or text link |
| `*-icon` (event/step/feature) | Badge / icon chips |
| `*-image` | Product / hero images |

### 4.2 Filled CTA pattern (TD + anchor)

**Reference:** `08_Promotion.html`, `06_Service_Launch.html`.

```html
<td data-element="promo-cta-button"
    bgcolor="#1e40af"
    align="center"
    style="background-color: #1e40af !important; border-radius: 8px !important; padding: 18px 36px !important">
  <a data-element="promo-cta" href="#"
     style="text-decoration: none; color: #ffffff; font-size: 18px; font-weight: 600; ...">
    Shop Promotional Catalog
  </a>
</td>
```

| Element | Owns |
|---------|------|
| **TD** (`*-cta-button`) | `background-color`, `padding`, `border-radius`, `border`, `bgcolor` |
| **Anchor** (`*-cta`) | `color`, `font-size`, `font-weight`, `font-family`, `line-height`, `text-decoration` |

**Do not** put pill chrome on the anchor (`background-color`, `padding`, `display: inline-block`, etc.). The apply engine strips legacy pill styles from anchors, but correct source HTML avoids fighting the engine.

**Button token model (current):**

- One filled CTA per template → **Primary** bg + text
- Two filled CTAs → **Primary** + **Secondary** (outline on secondary TD)
- Text-only product/update links → **Link** color token (not button tokens)

There are no separate pricing/promo button tokens in the wizard or apply pipeline.

**Known anchor ↔ TD pairs** (extend per bundle in verify script):

```
pricing-cta      ↔ pricing-cta-button
promo-cta        ↔ promo-cta-button
hero-cta         ↔ hero-cta-button
cta-primary      ↔ cta-primary-button
cta-secondary    ↔ cta-secondary-button
primary-cta      ↔ primary-cta-button
secondary-cta    ↔ secondary-cta-button
featured-cta     ↔ featured-cta-button
```

TD hooks must end with `-cta-button`. Secondary TDs should include `secondary` in the hook name so the classifier assigns `CTA_SECONDARY_TD`.

### 4.3 Preview CSS block

Each template includes a `<style>` block for in-app / dark-mode preview. Required patterns:

1. **User-brand markers** — preview rules skip nodes with `data-user-bg-color` / `data-user-text-color` (set by apply).
2. **Button TD guard** — blanket TD background resets must exclude pill cells:

```css
td:not([data-user-bg-color]):not([data-element$="-cta-button"])
```

3. **CTA/link exceptions** — text links and button anchors are excluded from generic color resets where needed.

Run `patch-{bundleId}-preview-css.mjs` when adding preview CSS to a new batch of templates (adapt from Industrial B2B script).

### 4.4 Inline style hygiene

- Always terminate declarations with `;` before the next property.
- Prefer `!important` on colors/surfaces that must survive client resets.
- Avoid corrupted merges like `font-weight: 600 font-family: ...` — the verify script rejects these.

### 4.5 Logo

- Prefer `data-element="logo"` on the header `<img>` when the bundle uses a logo hook.
- Fallback: apply engine also targets unlabeled header `<img>` elements.

### 4.6 Outlook / VML

If templates use VML bulletproof buttons, note them in bundle docs. Apply report reminds users to spot-check VML after branding.

---

## 5. Apply pipeline (preserve this order)

When wiring a new apply engine, keep the **same sequence** as Industrial B2B — order was tuned to fix real bugs:

```
1. Per-element registry loop     → applyElementProfile() for each hook
2. Header logo pass              → applyHeaderLogo()
3. Email surfaces                → body / wrapper backgrounds
4. Global typography             → font-family on text nodes (non-!important)
5. injectBrandStyleOverrides()   → <style id="mailcraft-brand-wizard"> in <head>
6. Link decoration pass          → text-decoration: none on a[data-element]
7. Mark html[data-mailcraft-branded] and serialize with <!DOCTYPE html>
```

**Why typography before injected CSS:** injected head styles must win over template preview/dark-mode rules for buttons and links.

**Style mutation primitive:** use `upsertStylePropertyOnElement()` in `styleUtils.ts` — string-based style attribute edits survive HTML serialization (unlike relying only on `element.style`).

**Semicolon fix:** `upsertStylePropertyOnElement` must preserve leading `;` when replacing mid-string properties. Do not regress this.

---

## 6. Shared vs bundle-specific code

### Shared (platform infrastructure)

| File | Role |
|------|------|
| `src/brand-wizard/WizardFields.tsx` | Reusable field UI (color, text, etc.) |
| `src/brand-wizard/useDesignRulesState.ts` | Persist state per `bundleId` (isolated localStorage) |
| `src/brand-wizard/apply/styleUtils.ts` | CTA TD+anchor helpers, style upsert, footer helpers |
| `src/brand-wizard/apply/injectBrandStyles.ts` | Head CSS for CTAs/links (extend selectors per bundle if needed) |
| `src/brand-wizard/apply/applyBrandToBundle.ts` | Zip / single-file I/O |
| `src/brand-wizard/types.ts` | Shared `DesignRulesState` token schema |
| `src/brand-wizard/defaults.ts` | Wizard steps, starter defaults, checklist |
| `src/brand-wizard/exportDesignRules.ts` | DESIGN_RULES.md export |
| `src/pages/BrandWizardPage.tsx` | Centralized wizard UI |
| `src/pages/BrandWizardSelectPage.tsx` | Bundle picker → same wizard, per-bundle saved state |

### Per bundle

| File | Role |
|------|------|
| `FinalBundles/{Bundle Name}/*.html` | Templates |
| `scripts/sync-{bundleId}-registry.mjs` | Scan HTML → generate registry |
| `scripts/verify-{bundleId}-templates.mjs` | Structural validation |
| `src/brand-wizard/apply/{bundleId}ElementRegistry.ts` | **Generated** hook map |
| `src/brand-wizard/apply/{bundleId}ApplyEngine.ts` | Profile → token switch + template-specific branches |
| `src/brand-wizard/bundles/{bundleId}FieldMeta.ts` | Which shared wizard fields hit this catalog |
| `src/brand-wizard/bundles/{bundleId}BundleKnowledge.ts` | Template catalog + token→element map |

### App touchpoints (small edits each bundle)

| File | Change |
|------|--------|
| `src/data/templateBundles.ts` | Add bundle entry, `wizardAvailable: true` |
| `src/brand-wizard/getFieldMeta.ts` | Dispatch field meta for bundle’s hook catalog |
| `src/brand-wizard/apply/applyBrandToHtml.ts` | Dispatch registry + engine by `bundleId` |
| `src/brand-wizard/components/ApplyBundlePanel.tsx` | Enable apply for this `bundleId` |
| `src/brand-wizard/exportDesignRules.ts` | Bundle-specific export sections |
| `package.json` | Add `sync:{bundleId}`, `verify:{bundleId}` scripts |

---

## 7. Phase-by-phase workflow

### Phase A — Design & HTML (templates)

1. Define bundle scope: audience, **visual direction**, template count, naming prefix (`01`–`0N`).
2. Create `FinalBundles/{Bundle Name}/`.
3. **Design freely** — layout, sections, imagery, copy. No requirement to mirror Industrial B2B structure.
4. Add `data-element` hooks to every **brandable** node (colors, type, logo, footer, buttons, links).
5. Implement filled CTAs as TD + anchor pairs (§4.2) — padding/radius on TD can match your design.
6. Add preview CSS with button TD guards (§4.3).
7. Manual spot-check in browser / ESP preview.

**Exit gate:** templates render correctly **before** any wizard apply. Design sign-off is separate from wizard sign-off.

---

### Phase B — Registry & validation (scripts)

1. Copy `scripts/sync-industrial-bundle-registry.mjs` → `sync-{bundleId}-registry.mjs`.
2. Point `bundleDir` and `outFile` at the new bundle.
3. Extend `classifyElement()` for bundle-specific hook names (badges, surfaces, promo bands, etc.).
4. Run sync → generates `{bundleId}ElementRegistry.ts`.
5. Copy `scripts/verify-bundle-templates.mjs` → `verify-{bundleId}-templates.mjs`.
6. Update `FILLED_CTA_PAIRS` and any bundle-specific rules.
7. Run verify until all templates pass.

**Exit gate:** `npm run verify:{bundleId}` green.

```bash
# Add to package.json
"sync:retail-d2c": "node scripts/sync-retail-d2c-registry.mjs",
"verify:retail-d2c": "node scripts/verify-retail-d2c-templates.mjs",
"sync:bundle:retail-d2c": "npm run sync:retail-d2c && npm run verify:retail-d2c"
```

---

### Phase C — Apply engine

1. Copy `industrialB2bApplyEngine.ts` → `{bundleId}ApplyEngine.ts`.
2. Wire imports to the new registry.
3. Adjust `applyElementProfile()` cases only where profiles differ.
4. Add **template-specific branches** sparingly (e.g. Industrial’s `06_Service_Launch` tier panel) — prefer profile-based logic.
5. Update `applyBrandToHtml.ts` to accept `bundleId` and dispatch.
6. Extend `injectBrandStyles.ts` selectors only if new hook patterns need head CSS backup.

**Exit gate:** apply a single template + full zip; no corrupted inline styles; buttons keep bg on TD; anchors keep text color.

Post-apply smoke checks:

- No `font-weight: N font-family` (missing semicolon)
- No `!important background-color` (missing semicolon after prior property)
- Primary/secondary colors appear on correct TD/anchor pair
- `data-user-bg-color` / `data-user-text-color` present on branded nodes

---

### Phase D — Wizard & bundle wiring

1. Add bundle to `src/data/templateBundles.ts` (`wizardAvailable: true`).
2. `{bundleId}FieldMeta.ts` — which **shared** wizard fields map to this bundle’s templates.
3. `{bundleId}BundleKnowledge.ts` — template catalog + token→hook map.
4. Wire `getFieldMeta.ts`, `applyBrandToHtml.ts` dispatch, `ApplyBundlePanel`.
5. Update export checklist template count if not 9.

**Exit gate:** same centralized wizard brands this bundle’s zip correctly; field hints reference this catalog.

See [wizard-element-alignment.md](./wizard-element-alignment.md) for element rules.

---

### Phase E — Ship & maintain

1. Document bundle in `Log/{bundle-id}/` (decisions, hook glossary, known ESP caveats).
2. Marketing copy: `ProductsPage`, FAQ, testimonials if needed.
3. Final QA matrix: each template × light/dark preview × apply × spot-check in Gmail/Outlook if possible.
4. Tag release / update README bundle list.

**Ongoing:** when HTML hooks change → `npm run sync:{bundleId}` → commit generated registry → `npm run verify:{bundleId}`.

---

## 8. Element profiles (starting set)

Industrial B2B uses ~30 profiles. New bundles should start from this set and only add profiles when a hook truly needs different token logic.

| Profile | Typical tokens |
|---------|----------------|
| `LOGO` | Logo URL / width |
| `HEADING_*` | Heading color, font |
| `BODY*` | Body / muted / subtitle / urgency text |
| `CTA_PRIMARY` / `CTA_PRIMARY_TD` | btnPrimaryText / btnPrimaryBg |
| `CTA_SECONDARY` / `CTA_SECONDARY_TD` | btnSecondaryText / btnSecondaryBg + border |
| `LINK_PRODUCT` | linkColor |
| `FOOTER_*` | Footer text, links, social |
| `BADGE_*` | Badge bg/text tokens |
| `SURFACE_*` | Light / info / warning panel backgrounds |
| `IMAGE_*` | Border radius on images (where applied) |

Add a new profile only when an existing one would apply the wrong tokens — e.g. a bundle with a unique “quote callout” that must use a different color than body or warning text.

**Mapping diverse UI to profiles (examples):**

| Your design | Hook example | Profile |
|-------------|--------------|---------|
| Large retail hero headline | `flash-hero-title` | `HEADING_HERO` |
| SaaS feature card title | `feature-card-2-title` | `HEADING_FEATURE` |
| Newsletter article link | `story-1-cta` | `LINK_PRODUCT` |
| Rounded pill “Shop now” | `shop-cta` + `shop-cta-button` | `CTA_PRIMARY` + `CTA_PRIMARY_TD` |
| Ghost/outline “Learn more” | `learn-cta` + `learn-cta-button` | `CTA_SECONDARY` + `CTA_SECONDARY_TD` |
| Date chip on event email | `event-date-icon` | `BADGE_EVENT` |
| Step number in onboarding | `step-3-icon` | `BADGE_STEP` |

Same wizard tokens, completely different HTML.

---

## 9. Lessons from Industrial B2B (do not repeat mistakes)

| Topic | Rule |
|-------|------|
| Button structure | Pill on TD, typography on anchor |
| Button tokens | Primary + secondary only; no pricing/promo button fields |
| Style upsert | Preserve semicolons; use `upsertStylePropertyOnElement` |
| Apply order | Typography before injected CSS; injection last in head |
| Preview CSS | Exclude `*-cta-button` TDs from blanket bg resets |
| Legacy anchors | `stripLegacyAnchorPillStyles()` cleans old inline-block buttons on apply |
| Registry drift | Never hand-edit generated registry; re-sync from HTML |
| Unmapped hooks | Apply report warns on `data-element` not in registry — fix or classify |
| Layout tokens | `layoutMaxWidth`, `btnPrimaryRadius`, etc. are mostly documentation today; only image radii are applied programmatically |
| Deprecated state fields | `btnPricing*` / `btnPromo*` may exist in types for old saves but are unused |

---

## 10. Multi-bundle refactor (as bundle #2 ships)

Extract dispatch helpers so the **same wizard** can apply to multiple bundle registries/engines:

1. **`applyBrandToHtml(..., bundleId)`** — registry/engine factory
2. **Parameterized sync/verify** — `--bundle=retail-d2c` or per-bundle scripts
3. **`getBundleModule(bundleId)`** — field meta, knowledge, engine, registry
4. **`ApplyBundlePanel`** — any bundle with `wizardAvailable`

Element alignment rules stay identical — see [wizard-element-alignment.md](./wizard-element-alignment.md).

---

## 11. Quick reference — Industrial B2B file map

Use as copy source when scaffolding bundle #2.

| Concern | Path |
|---------|------|
| Templates | `FinalBundles/Industrial B2B Bundle/*.html` |
| Sync script | `scripts/sync-industrial-bundle-registry.mjs` |
| Verify script | `scripts/verify-bundle-templates.mjs` |
| Preview CSS patch | `scripts/patch-bundle-button-preview-css.mjs` |
| Registry (generated) | `src/brand-wizard/apply/industrialB2bElementRegistry.ts` |
| Apply engine | `src/brand-wizard/apply/industrialB2bApplyEngine.ts` |
| Orchestrator | `src/brand-wizard/apply/applyBrandToHtml.ts` |
| Style helpers | `src/brand-wizard/apply/styleUtils.ts` |
| Head CSS injection | `src/brand-wizard/apply/injectBrandStyles.ts` |
| Field meta | `src/brand-wizard/bundles/industrialB2bFieldMeta.ts` |
| Bundle knowledge | `src/brand-wizard/bundles/industrialB2bBundleKnowledge.ts` |
| Catalog entry | `src/data/templateBundles.ts` |
| Wizard UI | `src/pages/BrandWizardPage.tsx` |
| Apply UI | `src/brand-wizard/components/ApplyBundlePanel.tsx` |
| Zip export | `src/brand-wizard/apply/applyBrandToBundle.ts` |

---

## 12. Definition of done (new bundle)

**Design:** bundle has its own visual identity and content — not a reskin of Industrial B2B.

**This bundle’s templates:**

- [ ] All templates in `FinalBundles/{Bundle Name}/`
- [ ] [wizard-element-alignment.md](./wizard-element-alignment.md) checklist complete
- [ ] `verify:{bundleId}` passes
- [ ] Apply produces valid HTML on every template
- [ ] Centralized wizard + apply panel work for this bundle
- [ ] Field meta documents which hooks this catalog uses

When in doubt, match Industrial B2B **element plumbing** — document bundle-specific hooks in `Log/{bundle-id}/`.

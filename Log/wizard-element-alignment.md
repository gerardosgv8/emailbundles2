# Wizard Element Alignment — Improvement Log

Instructions for scaffolding **new template bundles** so HTML elements align with the **centralized Brand Wizard** and brand apply works reliably on export.

**Model:** One unified wizard (shared brand tokens: colors, typography, logo, footer, buttons, links). Bundles differ in **design and layout**, but hook → profile → token mapping must follow the rules below.

**Reference bundle:** Industrial B2B — `FinalBundles/Industrial B2B Bundle/`  
**Validate before ship:** `npm run verify:templates` · `npm run sync:bundle`

---

## 1. Centralized wizard, per-bundle templates

```
┌─────────────────────────────────────────────┐
│  Brand Wizard (unified)                     │
│  Same steps · same tokens · all bundles     │
│  Saved per bundle: …-design-rules-v1-{id}   │
└────────────────────┬────────────────────────┘
                     │ DesignRulesState
                     ▼
┌─────────────────────────────────────────────┐
│  Apply layer (per bundle)                   │
│  Registry + engine for that bundle’s hooks  │
└────────────────────┬────────────────────────┘
                     ▼
        Bundle HTML (any design)
```

Brand elements are the same across industries (primary color, heading color, button fill, footer, font stack). The wizard stays one experience; each bundle adds its own templates + registry + apply engine dispatch.

---

## 2. Buttons — the main fix (TD + anchor)

### Problem we fixed

Old templates put the full “pill” on the `<a>` (`background-color`, `padding`, `display: inline-block`). After apply:

- Button colors fought preview CSS and disappeared in dark mode
- Background was applied to the anchor while preview rules blanked anchor backgrounds
- Inline styles could corrupt (missing semicolons) when the engine rewrote properties

### Correct pattern (required for all filled CTAs)

**Reference templates:** `06_Service_Launch.html`, `08_Promotion.html`

```html
<td data-element="promo-cta-button"
    bgcolor="#1e40af"
    align="center"
    style="background-color: #1e40af !important; border-radius: 8px !important; padding: 18px 36px !important">
  <a data-element="promo-cta" href="#"
     style="text-decoration: none; color: #ffffff; font-size: 18px; font-weight: 600; font-family: …; line-height: 24px">
    Shop Promotional Catalog
  </a>
</td>
```

| Element | `data-element` suffix | Owns |
|---------|----------------------|------|
| **TD** | `*-cta-button` | `background-color`, `padding`, `border-radius`, `border`, `bgcolor` |
| **Anchor** | `*-cta` (or `primary-cta`, `hero-cta`, etc.) | `color`, `font-size`, `font-weight`, `font-family`, `line-height`, `text-decoration` |

**Anchor must NOT have:** `background-color`, `padding`, `border-radius`, `display: inline-block`, `margin` (pill chrome).

**TD must have:** `background-color`, `padding`, and `bgcolor` attribute (Outlook).

### Wizard tokens (buttons step)

| Template buttons | Wizard tokens |
|------------------|---------------|
| One filled CTA | **Primary** bg + **Primary** text |
| Two filled CTAs | **Primary** + **Secondary** (outline/ghost on secondary TD) |
| Text-only links (`product-1-cta`, etc.) | **Link** color — not button tokens |

Removed from wizard/apply: separate pricing/promo button fields. `pricing-cta`, `promo-cta`, `hero-cta`, etc. all use **Primary** tokens.

### Known anchor ↔ TD pairs (extend per bundle in verify script)

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

TD hooks should end with `-cta-button`. Secondary TDs should include `secondary` in the hook name.

---

## 3. Apply engine behavior (buttons)

**Files:** `styleUtils.ts`, `industrialB2bApplyEngine.ts`, `injectBrandStyles.ts`

When apply runs on a CTA anchor:

1. **`collectCtaTargets()`** — also finds the parent `*-cta-button` TD
2. **Primary/secondary** — sets `data-brand-btn-variant` on TD + anchor; bg on **TD**, color on **anchor**
3. **`stripLegacyAnchorPillStyles()`** — removes old pill properties from anchors inside button TDs (backward compat for old HTML)
4. **`markUserStyled()`** — sets `data-user-bg-color` / `data-user-text-color` so preview CSS skips branded nodes
5. **`injectBrandStyleOverrides()`** — injects `<style id="mailcraft-brand-wizard">` in `<head>` as a backup layer for TD backgrounds and anchor text colors

Registry profiles for buttons:

| Profile | Token source |
|---------|--------------|
| `CTA_PRIMARY` | `btnPrimaryText` on anchor |
| `CTA_PRIMARY_TD` | `btnPrimaryBg` on TD |
| `CTA_SECONDARY` | `btnSecondaryText` on anchor |
| `CTA_SECONDARY_TD` | `btnSecondaryBg` + border on TD |
| `LINK_PRODUCT` | `linkColor` on text links |

Sync script classifies: `*-cta-button` → TD profiles; listed anchor hooks → `CTA_PRIMARY` / `CTA_SECONDARY`.

---

## 4. Apply pipeline order (do not reorder)

**File:** `applyBrandToHtml.ts`

```
1. Registry loop     → applyElementProfile() per data-element
2. Header logo       → applyHeaderLogo()
3. Email surfaces    → body / wrapper backgrounds
4. Global typography → font-family on text nodes
5. injectBrandStyles → <style id="mailcraft-brand-wizard"> in <head>
6. Link decoration   → text-decoration: none on a[data-element]
7. Serialize HTML    → <!DOCTYPE html> + data-mailcraft-branded on <html>
```

Typography before injected CSS; injected CSS **last** so brand tokens beat template preview/dark-mode rules.

---

## 5. Inline style semicolon fix

### Problem

`upsertStylePropertyOnElement()` could drop semicolons when replacing a property mid-string, producing invalid CSS in exported HTML:

```
font-weight: 600 font-family: …        ← broken
padding: 16px !important background-color: …  ← broken
```

### Fix

**File:** `styleUtils.ts` — when replacing a match, preserve a leading `;` if the regex match included it.

### Prevention

- Base templates: always terminate declarations with `;`
- Verify script rejects pre-corrupted patterns (`scripts/verify-bundle-templates.mjs`)
- Apply uses string-based `upsertStylePropertyOnElement`, not only `element.style`, so serialized HTML keeps values

---

## 6. Preview CSS guards (button TDs)

### Problem

Template `<style>` blocks reset all `td` backgrounds for dark/light preview. That wiped branded button TD backgrounds.

### Fix

Blanket TD background rules must exclude pill cells:

```css
td:not([data-user-bg-color]):not([data-element$="-cta-button"])
```

Apply to every preview block that sets TD backgrounds (`prefers-color-scheme`, `[data-preview-theme="dark"]`, etc.).

**Script:** `scripts/patch-bundle-button-preview-css.mjs` (run when adding preview CSS to a new bundle; adapt bundle path).

**Verify:** fails if any template is missing `:not([data-element$="-cta-button"])`.

---

## 7. `data-element` hooks (all brandable regions)

Every region that should receive wizard tokens needs a stable hook:

- Headings, body, footer, logo, badges, surfaces, images (where radii apply), CTAs, links

**Workflow for new bundle:**

1. Add hooks to HTML
2. `npm run sync:registry` (or bundle-specific sync script) → generates element registry
3. Extend `classifyElement()` for bundle-specific hook names → **profiles**
4. Unmapped hooks → warning in apply report

Hooks can be named for your design (`flash-hero-title`); the **profile** (`HEADING_HERO`) connects them to shared wizard tokens.

---

## 8. Scaffolding checklist — new bundle templates

Use this when building or refactoring templates so they align with the wizard.

### Buttons

- [ ] Every **filled** CTA uses TD (`*-cta-button`) + anchor (`*-cta`) pair
- [ ] Pill styles only on TD; anchor is typography + text color only
- [ ] TD has `bgcolor` + `background-color` + `padding` + `border-radius`
- [ ] Secondary buttons: TD hook includes `secondary`; border on TD
- [ ] Text product/update links: anchor only, no button TD — use link token

### Styles & preview

- [ ] All inline `style` attributes use valid semicolons
- [ ] Preview CSS uses `:not([data-element$="-cta-button"])` on TD bg resets
- [ ] No corrupted style patterns in source HTML

### Hooks & registry

- [ ] `data-element` on every brandable node
- [ ] Sync script run; registry committed
- [ ] Classifier maps all CTA hooks to correct profiles
- [ ] `npm run verify:templates` passes

### Apply smoke test

- [ ] Apply brand from wizard → export zip
- [ ] Open each HTML file: buttons show primary/secondary colors
- [ ] No missing semicolons in `style` attributes post-apply
- [ ] `data-user-bg-color` / `data-user-text-color` on branded nodes

---

## 9. Commands & files

| Action | Command / file |
|--------|----------------|
| Verify template structure | `npm run verify:templates` |
| Regenerate registry + verify | `npm run sync:bundle` |
| Template source | `FinalBundles/{Bundle Name}/*.html` |
| Registry generator | `scripts/sync-industrial-bundle-registry.mjs` |
| Template validator | `scripts/verify-bundle-templates.mjs` |
| Preview CSS patch | `scripts/patch-bundle-button-preview-css.mjs` |
| Style upsert / CTA helpers | `src/brand-wizard/apply/styleUtils.ts` |
| Apply orchestrator | `src/brand-wizard/apply/applyBrandToHtml.ts` |
| Head CSS injection | `src/brand-wizard/apply/injectBrandStyles.ts` |

---

## 10. Common mistakes (avoid on new bundles)

| Mistake | Symptom | Fix |
|---------|---------|-----|
| Pill on `<a>` only | Buttons vanish or wrong in preview/export | Move chrome to `*-cta-button` TD |
| Missing preview CSS guard | Button TD goes transparent in dark preview | Add `:not([data-element$="-cta-button"])` |
| Hook not in registry | Apply warning; token not applied | Re-sync registry; fix classifier |
| Missing semicolons in source | Verify fails or export CSS breaks | Fix inline styles; rely on fixed upsert |
| Pricing/promo button tokens | N/A — removed | Use Primary for all filled CTAs |
| Typography after inject CSS | Preview overrides brand fonts/colors on buttons | Keep apply order in §4 |

---

## 11. Industrial B2B template inventory (filled CTAs)

| Template | Filled buttons |
|----------|----------------|
| 01, 06, 07, 08, 04, 09 | 1 × primary |
| 02, 05 | Primary + secondary |
| 03 | Text links only |

All nine templates pass `verify-bundle-templates.mjs` with the improvements above.

When scaffolding bundle #2+, copy these **element rules**, not Industrial’s layout. Run the same verify/sync pattern against the new bundle directory.

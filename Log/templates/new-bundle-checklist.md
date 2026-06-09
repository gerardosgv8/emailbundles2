# New Bundle Checklist — {BUNDLE_DISPLAY_NAME}

**Bundle id:** `{bundle-id}`  
**Template count:** `{N}`  
**Started:** `{date}`

Copy to `Log/{bundle-id}/checklist.md`.  
**Element rules:** [wizard-element-alignment.md](../wizard-element-alignment.md)

---

## Phase 0 — Alignment review

- [ ] Read [wizard-element-alignment.md](../wizard-element-alignment.md)
- [ ] Listed filled CTAs vs text-link CTAs per template
- [ ] Confirmed templates use centralized wizard tokens (primary/secondary/links)

---

## Phase A — Templates

- [ ] `FinalBundles/{Bundle Display Name}/` created
- [ ] Filled CTAs: TD (`*-cta-button`) + anchor — pill on TD only
- [ ] Preview CSS: `:not([data-element$="-cta-button"])` on TD bg resets
- [ ] Valid semicolons in all inline styles
- [ ] `data-element` on every brandable region

---

## Phase B — Registry & verify

- [ ] `sync-{bundle-id}-registry.mjs` + `verify-{bundle-id}-templates.mjs`
- [ ] `npm run verify:{bundle-id}` passes
- [ ] Registry committed

---

## Phase C — Apply

- [ ] `{bundleId}ApplyEngine.ts` + dispatch in `applyBrandToHtml.ts`
- [ ] Apply zip smoke test — buttons, colors, no broken styles

---

## Phase D — Wizard wiring

- [ ] `templateBundles.ts` entry (`wizardAvailable: true`)
- [ ] `{bundleId}FieldMeta.ts` + `{bundleId}BundleKnowledge.ts`
- [ ] `ApplyBundlePanel` enabled for `{bundle-id}`
- [ ] Centralized wizard brands this bundle end-to-end

---

## Phase E — Ship

- [ ] All `{N}` templates spot-checked post-apply
- [ ] `Log/{bundle-id}/` notes if needed

---

## Template inventory

| # | File | Filled CTAs | Notes |
|---|------|-------------|-------|
| 01 | | | |
| … | | | |

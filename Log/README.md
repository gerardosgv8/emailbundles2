# Mailcraft Studio — Bundle Development Log

Playbooks for template bundles that share the **centralized Brand Wizard** and apply brand tokens reliably across different designs.

| Document | Purpose |
|----------|---------|
| **[wizard-element-alignment.md](./wizard-element-alignment.md)** | **Start here** — button fixes, hooks, preview CSS, apply order, verify checklist |
| [bundle-scaffolding-plan.md](./bundle-scaffolding-plan.md) | Broader scaffolding: folders, phases, shared vs per-bundle code |
| [new-bundle-checklist.md](./templates/new-bundle-checklist.md) | Copy per bundle when shipping |

**Reference bundle:** Industrial B2B — `FinalBundles/Industrial B2B Bundle/`

```bash
npm run verify:templates   # Template element structure
npm run sync:bundle        # Registry sync + verify
```

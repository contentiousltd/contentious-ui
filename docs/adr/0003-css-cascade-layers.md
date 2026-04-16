# ADR-0003: CSS cascade layers for specificity control

**Status:** Accepted
**Date:** 2026-04-16

## Context

As component styles, token mappings, utility classes, and element resets accumulate in a shared package, specificity conflicts become a growing problem. A utility class like `.flex` shouldn't need `!important` to override a component's `display` property. A theme token shouldn't accidentally lose to an element default.

Without explicit ordering, the cascade resolves specificity by source order — which is fragile and order-dependent.

## Decision

Use CSS `@layer` to declare an explicit cascade priority order at the top of every import chain:

```css
@layer tokens, theme, base, components, utilities;
```

This is declared once in `layers.css` and imported before everything else. Each CSS file places its rules into the appropriate named layer:

| Layer | Priority | Purpose |
|-------|----------|---------|
| `tokens` | Lowest | Raw values — palette, spacing, motion. Never overrides anything. |
| `theme` | ↑ | Semantic mapping — `--background: var(--limestone-300)`. |
| `base` | ↑ | Element defaults — `body`, `h1–h6`. Scoped to element selectors. |
| `components` | ↑ | Component classes — `c-button`, `type-*`. Class selectors. |
| `utilities` | Highest | Layout helpers — `.flex`, `.gap-md`. Always win, by design. |

Rules outside any layer have higher priority than all layered rules — used for global resets and `@keyframes`.

## Consequences

**Good:**
- A `.flex` utility wins over a component's layout without `!important`
- Theme tokens can be overridden by a product theme without selector tricks
- The priority order is explicit, readable, and self-documenting
- Matches how `contentious-astro` structures its CSS

**Neutral:**
- `layers.css` must be imported before any other package CSS, otherwise the layer order is determined by first declaration — which could be unexpected.
- Browsers without `@layer` support (pre-2022) fall back to source order, which is the same as the current behaviour. No polyfill needed for the target audience.

**Watch for:**
- Third-party CSS (Radix UI, any reset) that is not wrapped in a layer will have higher specificity than all layered rules. Wrap third-party imports before the layer declaration where possible, or use a dedicated unlayered block.

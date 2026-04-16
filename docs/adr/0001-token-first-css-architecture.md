# ADR-0001: Token-first CSS architecture

**Status:** Accepted
**Date:** 2026-04-16

## Context

The Contentious ecosystem has four projects — `contentious-astro`, `voicetoneandstyle`, `contenthealthcheck`, and `contentmaturity` — each sharing the same brand DNA but implementing it independently:

- 187 colour tokens duplicated four times (in different formats)
- Typography defined in three separate places
- Button styles copy-pasted across repositories
- `contentious-astro` (the design authority) builds beautiful, maintainable UIs with zero Tailwind — proving the pattern works

This creates maintenance overhead and drift: a palette update requires changes in four places, and the projects have already started diverging.

## Decision

Consolidate all design tokens, typography, and component styles into `@contentious/ui` using a structured, layered CSS architecture.

**File structure:**

```
src/styles/
  layers.css        — @layer order declaration
  tokens.css        — Colours + spacing + radii + shadows + z-index + motion
  base.css          — @font-face + body/heading defaults
  typography.css    — Type scale + type-* classes + prose
  components.css    — Component classes (c-button, c-badge, c-card, etc.)
  utilities.css     — Layout, spacing, colour utility classes
  themes/
    voice-tone-style.css
    content-maturity.css
    content-health.css
    contentious-site.css
  all.css           — Convenience import
```

**Naming:** Component classes use the `c-` prefix with BEM modifiers (`c-button`, `c-button--primary`, `c-card__header`) to namespace against utilities and avoid collisions.

**Tailwind removal:** The `contentious-astro` site proves Tailwind is not needed. It is the source of the bad patterns (utility soup, CVA complexity, HSL-channel format constraint). Removing it is part of the migration — Phases 3–4 of the implementation plan.

## Consequences

**Good:**
- Single source of truth for all design tokens
- Consuming projects import from the package rather than defining their own
- Changes to the palette propagate everywhere
- The architecture mirrors `contentious-astro` — the proven, working design authority

**Neutral:**
- CHC and CM still use Tailwind. They adopt the package in Phase 5+, which is a separate migration effort.
- The Tailwind preset stays in the package temporarily for backward compatibility.

**Watch for:**
- Import order matters — `layers.css` must come before everything else.
- Vite's CSS handling with `@layer` needs verification (no PostCSS Tailwind plugin).

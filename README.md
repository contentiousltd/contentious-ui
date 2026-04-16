# @contentious/ui

Shared design system for the Contentious product suite. Provides brand tokens, typography, component CSS classes, and React components used across Voice Tone & Style, Content Maturity, and Content Health Check.

The canonical design reference is [style.contentious.ltd](https://style.contentious.ltd) (powered by `contentious-astro`).

---

## CSS architecture

The package uses CSS cascade layers for predictable specificity. Import order matters.

### Layer order

```
tokens → theme → base → components → utilities
```

| Layer | File | Purpose |
|-------|------|---------|
| `tokens` | `tokens.css` | Raw design decisions: hex palette, spacing, motion, layout |
| `theme` | `themes/*.css` | Semantic mapping: `--background`, `--primary` → token values |
| `base` | `base.css` | `@font-face`, body/heading element defaults |
| `components` | `components.css` | `c-button`, `c-card`, `type-*` classes |
| `utilities` | `utilities.css` | `.flex`, `.grid`, `.gap-md`, layout helpers |

See [docs/adr/0003-css-cascade-layers.md](docs/adr/0003-css-cascade-layers.md) for the rationale.

### Importing in a project

```css
/* Establish layer order first */
@import "@contentious/ui/styles/layers.css";

/* Raw tokens */
@import "@contentious/ui/styles/tokens.css";

/* Fonts and element defaults */
@import "@contentious/ui/styles/base.css";

/* Product theme (semantic token mapping) */
@import "@contentious/ui/styles/themes/voice-tone-style.css";

/* Typography, components, utilities (when available) */
@import "@contentious/ui/styles/typography.css";
@import "@contentious/ui/styles/components.css";
@import "@contentious/ui/styles/utilities.css";
```

Or use the convenience entry point once all layers are complete:

```css
@import "@contentious/ui/styles/all.css";
@import "@contentious/ui/styles/themes/voice-tone-style.css";
```

---

## Colour tokens

Eleven brand colour families, each with 17 shades (100–900 in 50-step intervals). All values are hex, matching the upstream `contentious-astro/design-tokens.css`.

| Family | Character |
|--------|-----------|
| `limestone` | Warm cream neutral — primary surface colour |
| `gloaming` | Warm charcoal — primary text colour |
| `sorbet` | Warm salmon — VTS signature colour |
| `fire` | Coral red — CM/CHC signature, error states |
| `sunshine` | Golden yellow — warnings, accents |
| `wave` | Teal/cyan — info states, charts |
| `sapling` | Soft green — success states |
| `coffee` | Warm brown |
| `amber` | Warm orange |
| `olive` | Yellow-green |
| `lichen` | Cool pale neutral |

### Token naming

```css
--{family}-{shade}   /* e.g. --sorbet-500, --limestone-300 */
```

### Semantic aliases (cross-product)

```css
--star-1 through --star-5   /* Score gradient: fire → amber → sunshine → olive → sapling */
--success-subtle / --success-text
--warning-subtle / --warning-text
--error-subtle   / --error-text
--info-subtle    / --info-text
```

### Semantic tokens (per theme)

Each theme maps these to palette tokens:

```css
--background        --foreground
--card              --card-foreground
--primary           --primary-foreground
--secondary         --secondary-foreground
--muted             --muted-foreground
--accent            --accent-foreground
--destructive       --destructive-foreground
--border            --input            --ring
--chart-1 through --chart-5
```

See [docs/tokens.md](docs/tokens.md) for the full token reference.

---

## Spacing

```css
--space-xs:      0.25rem  /*  4px */
--space-sm:      0.5rem   /*  8px */
--space-sm-plus: 0.75rem  /* 12px */
--space-md:      1rem     /* 16px */
--space-lg:      1.5rem   /* 24px */
--space-xl:      2rem     /* 32px */
--space-2xl:     3rem     /* 48px */
--space-3xl:     4rem     /* 64px */
--space-4xl:     6rem     /* 96px */
--space-5xl:     8rem     /* 128px */
--space-6xl:     10rem    /* 160px */
```

---

## Motion tokens

```css
--duration-instant:      100ms
--duration-fast:         200ms
--duration-normal:       350ms
--duration-slow:         500ms
--duration-glacial:      800ms
--duration-fast-exit:    150ms   /* 75% of fast */
--duration-normal-exit:  250ms   /* 75% of normal */

--ease-out:    cubic-bezier(0.16, 1, 0.3, 1)    /* entering */
--ease-in:     cubic-bezier(0.7, 0, 0.84, 0)    /* leaving */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)   /* toggling */
```

---

## Theme files

A theme maps semantic tokens to palette tokens for a specific product. See [docs/theming.md](docs/theming.md).

| File | Product | Primary | Surfaces |
|------|---------|---------|---------|
| `themes/voice-tone-style.css` | Voice Tone & Style | sorbet | limestone |
| `themes/content-maturity.css` | Content Maturity | fire | lichen |

---

## TypeScript utilities

```ts
import { ColorScheme } from '@contentious/ui/types/design-tokens';
import { getCssVar, isDarkScheme, getScoreColour, getStatusColour, CHART_COLOURS } from '@contentious/ui/lib/colors';
```

See [src/types/design-tokens.ts](src/types/design-tokens.ts) and [src/lib/colors.ts](src/lib/colors.ts).

---

## React components

```ts
import { Button, Card, Badge, ... } from '@contentious/ui';
```

Components are based on Radix UI primitives, styled with Contentious brand tokens. See `src/components/` for individual component documentation.

---

## Fonts

Bely (regular, bold, italic) and Bely Display are included in `fonts/` and declared in `base.css`. No separate font loading is needed when importing the package CSS.

---

## Further reading

- [Token reference](docs/tokens.md)
- [Theming guide](docs/theming.md)
- [Architecture decisions](docs/adr/README.md)
- [Changelog](CHANGELOG.md)

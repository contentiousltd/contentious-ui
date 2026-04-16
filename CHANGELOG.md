# Changelog

All notable changes to `@contentious/ui` are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Most recent changes first.

---

## [Unreleased]

### Added

- **`tokens.css`** — canonical hex-format design token file in `@layer tokens`. Covers: full brand palette (11 colours × 17 shades), semantic colour aliases (status, star ratings), spacing scale (xs–6xl, including 12px), borders and radii, shadow scale, motion tokens (durations, easing), z-index scale, and layout tokens. Hex values match the upstream palette in `contentious-astro/design-tokens.css`.
- **`layers.css`** — `@layer` order declaration: `tokens, theme, base, components, utilities`. Import first to establish cascade priority.
- **`base.css`** — `@font-face` declarations for Bely (regular, bold, italic) and Bely Display, `@layer base` element defaults (body background/colour/font, heading font-family), and animation keyframes (loading ring, rotating ring, mobile menu slide/fade).
- **`themes/voice-tone-style.css`** — semantic token mapping for VTS (sorbet primary, limestone surfaces).
- **`themes/content-maturity.css`** — semantic token mapping for Content Maturity (fire primary, lichen surfaces).
- **`src/types/design-tokens.ts`** — `ColorScheme`, `BorderStyle`, `SectionLayout`, `SectionVariant`, `DeviceType` types ported from `contentious-astro`.
- **`src/lib/colors.ts`** — colour utility functions: `getCssVar()`, `isDarkScheme()`, `getScoreColour()`, `CHART_COLOURS`, `getStatusColour()`. Ported and updated from `contentious-astro` and CHC local copy. All functions return CSS variable references (not HSL strings or Tailwind classes).
- **`typography.css`** — Contentious responsive typography system in `@layer tokens` (type scale and weight tokens), `@layer base` (responsive `--text-multiplier` breakpoints), `@layer components` (`type-*` utility classes and `.display-heading`), and unlayered `.prose` styles for article content. Extracted from `voicetoneandstyle/client/src/index.css`. `hsl(var(--x))` colour references updated to plain `var(--x)` to match hex token format.
- **`components.css`** — Component classes in `@layer components`. Button variants + sizes (Phase 3). Brand layout components: `c-section`, `c-section-header`, `c-feature-card` (Phase 4). Shadcn-derived components: `c-accordion`, `c-card`, `c-error` — full CSS replacements for the Tailwind utilities previously baked into these components (Phase 5).
- **`base.css`** — Modern CSS reset added to `@layer base`, replacing Tailwind's Preflight. Accordion open/close keyframes (`accordion-down`, `accordion-up`) added to support Radix's `--radix-accordion-content-height` variable. Covers `.btn` base, all variant classes (`.btn-primary`, `.btn-outline`, `.btn-outline-light`, `.btn-secondary`, `.btn-ghost`, `.btn-link`, `.btn-destructive`), and size modifiers (`.btn-sm`, `.btn-lg`, `.btn-icon`). Extracted from `voicetoneandstyle/client/src/index.css`. Hover opacity variants replaced from `hsl(var(--x) / 0.85)` to `color-mix(in srgb, var(--x) 85%, transparent)` for hex token compatibility.

### Changed

- **`accordion.tsx`** — converted from Tailwind utilities to `c-accordion` BEM classes. Removed `flex`, `flex-1`, `items-center`, `py-4`, `font-medium`, `transition-all`, `hover:underline`, `[&[data-state=open]>svg]:rotate-180`, `overflow-hidden`, `text-sm`, `data-[state=...]` animate utilities.
- **`card.tsx`** — converted from Tailwind utilities to `c-card` BEM classes. Removed `rounded-lg`, `border`, `bg-card`, `text-card-foreground`, `shadow-sm`, `flex`, `flex-col`, `space-y-1.5`, `p-6`, `text-2xl`, `font-semibold`, `leading-none`, `tracking-tight`, `text-sm`.
- **`ErrorBoundary.tsx`** — converted from Tailwind utilities to `c-error` BEM classes.
- **`Section.tsx`** — `bg` prop now accepts a CSS value (`"var(--sorbet-900)"`) instead of a Tailwind class name (`"bg-sorbet-900"`). Renders with `style={{ backgroundColor: bg }}`.
- **`SectionHeader.tsx`** — converted from Tailwind utilities to `c-section-header` BEM classes. Removed `text-4xl`, `text-xl`, `font-display`, `max-w-xl`, `mx-auto`, `text-center` utilities.
- **`FeatureCard.tsx`** — converted from Tailwind utilities to `c-feature-card` BEM classes. Removed `border-0`, `rounded-xl`, `p-8`, `font-display`, `text-2xl`, `font-normal`, `text-lg`, `leading-relaxed` utilities.

- **`palette.css` removed** — replaced by `tokens.css` (palette and semantic tokens) and `base.css` (fonts and element defaults).
- **Theme files** — `@layer base` updated to `@layer theme` to match declared layer order.

---

## [0.1.0] — Initial release

Shared UI component library extracted from `voicetoneandstyle`. Includes shadcn/ui components re-styled with Contentious brand tokens, Bely font files, and a Tailwind preset.

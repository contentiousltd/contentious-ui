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

### Changed

- **`palette.css` removed** — replaced by `tokens.css` (palette and semantic tokens) and `base.css` (fonts and element defaults).
- **Theme files** — `@layer base` updated to `@layer theme` to match declared layer order.

---

## [0.1.0] — Initial release

Shared UI component library extracted from `voicetoneandstyle`. Includes shadcn/ui components re-styled with Contentious brand tokens, Bely font files, and a Tailwind preset.

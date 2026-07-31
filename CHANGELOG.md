# Changelog

All notable changes to `@contentious/ui` are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Most recent changes first.

---

## [Unreleased]

_Nothing yet._

## [0.7.3] – 2026-08-01

### Fixed

- **The semantic and product-signature layers never reached a Tailwind 4 consumer.** Both door files pulled the design system in with `@import url("…")`. That is valid CSS, and Vite followed it, but **Tailwind 4 follows only the bare-string form and drops `url()` silently** – no warning, no error. So a product that imported `styles/semantic.css` and `styles/products.css` got neither: `--surface-hover`, `--text-strong`, `--accent`, `--scrim-*` and every `[data-product]` block were simply absent, and any utility referencing them resolved to nothing. It surfaced in Content Health Check's Tailwind 4 cutover, where it had been invisible under Tailwind 3 an hour earlier.
- **`type-roles.css` is now imported at the door too**, because the design system's own `semantic.css` pulls it in with the same `url()` form. Without it `--label-font-size`, the `--type-*` shorthands and the whole `--t-*` scale resolve to nothing under Tailwind 4 – the same defect v0.7.0's split was written to fix, arriving by a different route. Raised in `GAPS.md` for the design system's own files, which still use `url()` and would break the same way if loaded directly under Tailwind 4.
- **`./skills/*` is now an export.** The design system tree was reachable on disk but not by specifier, which left no supported way to import it deliberately.

### Changed

- The `products.css` header no longer warns against importing into a shadcn product. That was true before v0.7.0 and is now actively misleading: the `--accent` collision is settled, and the file is safe provided the consumer runs the rename codemod with it.

## [0.7.2] – 2026-08-01

### Fixed

- **The bridge's `--spacing-*` keys silently redefined every t-shirt `max-w-*`.** Tailwind 4 resolves `max-w-<key>` and `w-<key>` from `--spacing-*` when a key of that name exists, in preference to its own `--container-*` scale. Our spacing names are t-shirt sizes, so all of them collided: `--spacing-3xl` turned `max-w-3xl` from 48rem into **4rem**. Content Health Check hit it the moment it moved to Tailwind 4 — body copy wrapping one word per line, 64 `max-w-*` usages affected, and only `max-w-7xl` unscathed because there is no `--space-7xl`. Content Maturity would have hit it identically.
- **The conflict is inherent, so the fix is to stop emitting them.** Tailwind's spacing namespace assumes numeric keys; `p-lg` and `max-w-lg` cannot both be correct. `max-w-*` wins — it is Tailwind's own vocabulary and used across every product, whereas the named spacing utilities (`p-lg`, `gap-md`) were used by **zero** bridge consumers: 0 in CHC, 0 in CM. contentious.ltd uses names like `gap-md`, but they are hand-written CSS classes in its own `global.css` (`.gap-md { gap: var(--space-md) }`) — it has no Tailwind dependency at all, so it neither generates those utilities nor loads this bridge. It is already consuming spacing the way this change pushes everyone toward. Spacing is reached as `var(--space-lg)` in CSS, which is what the design system's own `components.css` already does.

## [0.7.1] – 2026-08-01

### Fixed

- **The `tailwindcss` peer dependency was `^3.4.0`, which blocked the upgrade the bridge exists to enable.** `styles/tailwind4.css` shipped in v0.5.0 specifically so a product could move to Tailwind 4 and delete its private palette copy, but the peer range still said Tailwind 3 – so the moment a consumer installed `tailwindcss@4`, npm failed with `ERESOLVE`. Found while upgrading Content Health Check; it would have hit Content Maturity identically, and it fails on a clean `npm ci` rather than on the developer's machine, so CI is where it would have surfaced. Now `^3.4.0 || ^4.0.0`, since the package genuinely supports both: the bridge is additive and Tailwind 3 consumers simply don't import it.

### Changed

- **The full rsync export landed**, superseding the targeted MCP pull that carried the accent decision. It confirmed the MCP-applied token files were byte-identical, and brought two things the partial could not have known to fetch: **five hover states in the design system's `components.css` move from `--surface-raised` to `--surface-hover`** (`.c-menu__item`, `.c-switcher`, `.c-mburger`, `.c-msheet__x` and the switcher's open state), which is the accent decision following through into the components that raised it; and the readme's signature-set count corrected to **29** in both places it appears, resolving the 25-vs-28-vs-29 disagreement.
- `.c-row:hover` and `.c-button--ghost:hover` are **deliberately still** `var(--limestone-450)`. That is the open gap Claude Design raised while answering – fixing it means either a 30th signature token or deriving the row step from the card, and it wants its own brief. Unchanged here on purpose.
- **`.DS_Store` is untracked and gitignored.** Three were committed historically, and one was swept into the v0.7.0 release commit by a `git add -A`.

## [0.7.0] – 2026-07-31

Implements [`provenance/Accent decision 2026-07-31.html`](docs/design-system-sync.md), which answers the brief in [`docs/design-brief-accent-2026-07-31.md`](docs/design-brief-accent-2026-07-31.md).

### Changed

- **BREAKING – shadcn's `--accent` / `--accent-foreground` are renamed to `--surface-hover` / `--text-on-hover`.** `--accent` meant two opposite things: the design system's primary interactive colour, and shadcn's recessive hover surface. The design system keeps the name. Three reasons, and the third is the one that settles it: `accent` is one of the six signature dimensions, so the dimension and the token have to share a name; shadcn's use is the anomaly (there the loud colour is `--primary`); and **the value was wrong too** – "hover is a background step, not a colour shift" is a settled rule, and `--accent: sunshine-500` painted hover in a brand colour, which that rule forbids. Because the bridge already resolved `bg-accent` to fire-500, there was **no shipping appearance to preserve on either side**, so this is a correction that happened to need a new name rather than a migration. **Migration:** in a shadcn-based product, `bg-accent` → `bg-surface-hover` and `text-accent-foreground` → `text-on-hover` across roughly ten component files. Find-and-replace, no judgement. Content Health Check and Content Maturity each have ten; Voice Tone & Style and the website have no shadcn layer.
- **The signature set grows to 29: `--surface-hover` joins the ground group**, and every product declares it. It is deliberately **not** an alias of `--surface-raised`, which was the first answer and was wrong on half the suite: VTS sets raised and menu to the same `sorbet-800`, so a menu row would hover to the colour it already sits on, and contentious.ltd's raised is `lichen-300`, the alternating band, so rows would hover to a green. Raised is a *band*; hover is a *step off the surface being hovered* – two jobs that coincide only on CHC's ground, which is why the conflation survived a first reading. Values: CHC, CM and the website take `limestone-600`; VTS takes `sorbet-750`, which **lightens**. `--text-on-hover` is not in the set – it equals `--text-strong` in every product and exists only so the codemod stays mechanical.
- **All four theme files drop their shadcn `--accent` pair.** VTS had one too and it had no shadcn layer to serve, so it was silently re-pointing the design system's `--accent` to `sorbet-400` and overriding its own signature. There are now **zero token-name collisions** between the theme files and the semantic and signature layers, verified by name intersection.

### Added

- **`tokens/type-roles.css` – the importable half of the type layer**, which closes the defect 0.6.0 shipped with. `semantic.css` sets `--label-font-size: var(--t-label)` and the `--type-*` shorthands off `--t-*`, but `--t-*` lived in `typography.css`, which consumers can't import because it also carries the density inputs. The roles now sit in their own file, `semantic.css` imports it directly rather than assuming a consumer loaded it, and `--u` carries `19px` / `1` fallbacks so a consumer importing it alone renders at app density rather than not at all. `typography.css` keeps `--base-font-size` and `--text-multiplier` as prototyping defaults and every existing import path is unchanged.
- Bridge gains `bg-surface-hover` and `text-on-hover`; `--color-accent-foreground` is gone. 243 literal / 45 themed.

### Known issues

- **Two literal limestone stops in the design system's `components.css` break on a dark ground.** `.c-row:hover` and `.c-button--ghost:hover` are `var(--limestone-450)` outright, which is the correct documented list-row step on CHC, CM and the website, and hovers a dark row to near-white on VTS. Raised by Claude Design while answering the accent decision and deliberately kept out of it, since fixing it properly means either a 30th signature token or deriving the row step from the card. It has never shown, because VTS runs no design-system components yet. Tracked in `GAPS.md`; find it before VTS adopts, not after.

## [0.6.0] – 2026-07-31

### Added

- **`tokens/products.css` – the product signature layer**, arriving with the 31 July design export, and **`styles/products.css`** as the consumer door onto it (same pattern as `semantic.css`: an import, not a copy, so there is one file rather than two that drift). It re-points a closed set of tokens under `[data-product="chc|cm|vts|contentious"]` – grounds, hairlines, text, accent, `--level-empty` – and everything outside that set is the family resemblance and never varies. It exists because this system began as the Content Health Check system, so CHC's expression sat in `semantic.css` as though it *were* the system, and any product that did not deliberately deviate landed on CHC. **Settled in structure, provisional in value**: only the CHC block is transcribed from shipping code, so reconcile a product against its production CSS before treating a hex as canonical. Import it *after* `semantic.css` – `[data-product]` and `:root` have identical specificity, so source order is the only thing deciding the winner – and set `data-product` on `<html>`, not `<body>`, so portalled dialogs and popovers inherit it. A product that sets nothing renders exactly as before.
- **`--text-inset` and `--text-inset-strong`** – text on a light island inside a page that may be dark (top bar, secondary nav, form fields). On a light-ground product they equal `--text-body`/`--text-strong`; on Voice, Tone and Style, which runs light chrome over a dark page, they are the only thing between you and white-on-white. Chrome and field markup references these, never `--text-body`.

### Fixed

- **The Tailwind 4 bridge froze all 25 signature colours at Content Health Check's values**, which would have defeated the layer above at the utility level: `bg-surface-page` emitted `#F2F2E7` for every product, so Voice, Tone and Style rendered CHC's cream instead of `sorbet-850`. The generator decided themed-ness by first-writer-wins, and `semantic.css` is always read before a product-scoped file, so a token declared there and re-pointed elsewhere was recorded as suite-constant. Themed-ness is now **sticky** – any product-scoped re-point marks the token, whoever declared it first – and `products.css` counts as product-scoped alongside `themes/`. Bridge goes from 266 literal / 19 themed to **243 literal / 44 themed**. The 25 that moved consequently no longer take an opacity modifier (`bg-surface-card/50` renders opaque); reach for a numbered shade instead. Raw family stops are untouched and still take modifiers, which is what Content Health Check's ~200 opacity usages actually depend on.

### Changed

- **Density is settled, and it is no longer a free number.** It is derived from deployment mode rather than chosen per product: **19px for every app** (reserved deployment), **24px for marketing** (banded). So ADR-0011's knob list keeps all three entries – density, accent, mark – and gains a constraint, which is what makes a theme file setting 21px visibly wrong to a reviewer. In practice one value changed: `themes/content-health-check.css` moves **18px to 19px**. 19 over 18 was decided on cost rather than taste – neither has a design argument, 19 is the base the component CSS was actually eyeballed against, and CHC does not consume this package yet, so its 18px rendered on no screen. Content Maturity, Voice Tone & Style and the website were already at the prescribed values; all four theme files now record *why*, which none of them did before.
- **`semantic.css` drops four literal body sizes.** `--text-lede`, `--text-body-size`, `--text-support` and `--text-hint` were a second type scale living alongside the `--t-*` roles, and only one of the two responded to density. Verified unreferenced in this package, the design system tree and all four consumer repos before removal, so they are gone rather than rewired. There is one app type scale and it is `--t-*`.
- **`--label-font-size` derives from `--t-label`** instead of a hard-coded 11px, so the metadata voice breathes with density like every other size. **See Known issues.**
- **`colors.css` records each family's rationale inline**, verbatim from style.contentious.ltd, plus one hard rule: no two adjacent stops may sit closer than **1.0 L** in OKLCH, the threshold the eye reads on a flat area. Consequently `limestone-150 / 250 / 350 / 450` are documented as **aliases of the stop below, not steps** – the honest account of the `-400`/`-450` collision CHC hit. No colour value changed anywhere in this release.

### Decided, no code change

- **OKLCH: rejected.** Neither a format conversion nor a re-derivation of the ramps; hex stays the storage format and [ADR-0002](docs/adr/0002-hex-over-hsl-colour-format.md) is reaffirmed rather than superseded. The usual argument for it does not survive checking: Tailwind 4.3 emits `color-mix(in srgb, …)` regardless of source format, and our palette replaces Tailwind's entirely, so we inherit nothing from their choice. OKLCH is kept as the space to *review* a ramp in. Re-deriving the ramps remains the only real fix for the limestone light end, and it is a visible brand change, so it stays undone deliberately.

### Known issues

- **`--accent` is defined twice with two different meanings**, and importing `products.css` into a shadcn-based product makes the collision decisive. shadcn's `--accent` (in `themes/*.css`) is the muted hover/selected background; the design system's is the primary interactive colour. A product importing both gets solid primary-action orange on every stock shadcn hover state – 10 components in CHC. This predates the signature layer, which merely surfaced it. `semantic.css` alone is safe. Guarded by a warning at the top of `styles/products.css` and tracked in `GAPS.md` as the decision Claude Design owns; it is the `.c-card` collision one layer down.
- **`--label-font-size` resolves to nothing across the package boundary.** `semantic.css` is importable and `tokens/typography.css` (where `--t-label` lives) is not, so `--t-label` is undefined for consumers, the declaration is invalid at computed-value time, and mono metadata labels fall back to the inherited size. No consumer references the token today, so nothing is broken yet; it bites when the design system's own components arrive, since `Menu`, `SecondaryNav`, `Metric` and `ListRow` all use it. The fix is the `typography.css` split already tracked in `GAPS.md`.

## [0.5.0] – 2026-07-31

### Removed

- **The deprecated `--transition-*` aliases are gone**, as 0.4.0 said they would be. They existed to give contentious.ltd runway, and the site migrated to `--marketing-transition-*` in the same change, so the runway was never needed – which is the better outcome: the trap is removed rather than documented, and nothing downstream has to remember the rule. App code uses `--motion-state` / `--motion-reveal` / `--motion-exit`.

### Added

- **`styles/tailwind4.css` – the Tailwind 4 bridge**, generated by `npm run generate:tailwind4` and verified in CI with `--check`. Tailwind only builds a utility for a name it knows, and it learns names from `@theme`; our tokens are plain custom properties, so without this a product on Tailwind gets no `bg-fire-500` at all. That absence is why Content Health Check and Content Maturity each grew a private palette copy, and this is what lets them delete it. Import it after the token layers; add tokens at source and re-run, never hand-edit the output.
- **The bridge emits two blocks, and the split is load-bearing.** Tailwind can only build an opacity modifier when it can *see* the colour: given `--color-x: var(--y)` it emits a working utility whose `/50` is **silently dropped** – a fully opaque block, no warning – while a literal gets `color-mix()`. So the 266 suite-constant colours are resolved to literals and take modifiers (`bg-gloaming-500/10` → `color-mix(in srgb, #4F4D4B 10%, transparent)`), and the 19 a product theme re-points stay as `var()` so theming keeps working, at the cost of not taking a modifier. This matters for the CHC cutover specifically: it has roughly 200 opacity usages, which is the difference between a working migration and a page of solid blocks. Verified by compiling against Tailwind 4.3.
- **Type utilities keep the names products already write** – `font-display` resolves to `--font-heading-display` and `font-sans`/`font-serif` both resolve to the body face, since Bely is a serif. Deriving utility names from token names would have renamed `font-display` across ~100 files in CHC for no gain.

## [0.4.0] – 2026-07-31

### Changed

- **BREAKING – the shadcn card is now `.c-frame`, and `.c-card` belongs to the app's data surface.** `.c-card` was defined twice inside `@layer components`, once here and once in the design system, with source order silently deciding the winner. They were never two dialects of one component: this package's was the shadcn Card – bordered, shadowed, floating – and the design system's is the app's data surface, whose defining rule is *no border and no shadow*. Picking a winner would have bordered every data surface in Content Health Check or unbordered every marketing card, so they are named apart instead. The bordered container is `.c-frame` (`__header` / `__title` / `__description` / `__content` / `__footer`), which is what `--radius-frame` already described, and `.c-feature-card` composes onto it. **Migration: `.c-card` → `.c-frame` in markup and CSS** – `Card` in React is unchanged, only the classes it emits. Its shadow also stops using pure black, which appears nowhere in this palette.
- **`--transition-*` renamed to `--marketing-transition-*`.** These durations (300ms / 800ms / 1.5s / 3s) are the Astro site's scale and they are correct for it – 800ms on a hero fade is right, and pulling the site to the app's 350ms would visibly break it. The problem was purely the name: `--transition-fast` is the obvious thing to reach for and it is 300ms, four times too slow for a hover. App UI uses `--motion-state` (200ms) / `--motion-reveal` (350ms) / `--motion-exit` (150ms) from the semantic layer. **`--transition-*` still work as deprecated aliases and are removed in 0.5.0.**
- **`--warning-text` moves from `sunshine-900` to `amber-800`.** `sunshine-900` is a mid-tone orange that fails AA at label sizes on every surface in this palette. The chip tones had already solved this (`--chip-warn-fg: amber-800`) and the standalone token never followed. Warning text and warning chip text are now the same ink.
- **The role of this package.** `@contentious/ui` is now the home of the design system, of which the shipping React and CSS exports are one expression – rather than a code library that happens to carry tokens. Design is originated by Claude Design and implemented by Claude Code; where the plain CSS and a React component disagree on an exact value, the CSS is the reference.

### Added

- **Scrim tokens – `--scrim-modal` (80%), `--scrim-panel` (34%), `--scrim-color`.** A documented two-step rather than one value, because the two are doing different jobs, and *blocking* is what picks one: modal when you must answer before the page is usable again (dialogs, destructive prompts), panel for a layer over a page that is still there (a nav sheet you can read behind). A sheet is not modal by virtue of being a sheet. Colour is the warm near-black, never pure black.
- **Email type tokens – `--font-email-serif`, `--font-email-mono`.** Email keeps the serif identity: Georgia is already the web fallback, so a mail client and a browser without Bely render the same document, and in an inbox of system sans a serif is the distinctive choice. One face – Bely Display is not attempted, since a display cut that never loads leaves the heading in Georgia anyway. These are the source for a build step that bakes the stacks in literally; email cannot read a custom property.
- **Status text tokens – `--info-text`, `--good-text`, `--danger-text`** alongside the corrected `--warning-text`, each matching its chip foreground, so the next standalone status colour isn't invented.
- **`MobileNav`** joins the design system, with its pattern guideline.

- **`skills/contentious-design/`** – the Contentious design system now lives in this repository as a Claude Code skill: semantic tokens with their reasoning, a plain-CSS implementation of every component, `<Name>.prompt.md` rules for each, 17 specimen cards, the UI kit, concept illustrations and the licensed Bely cuts. Symlinked from `~/.claude/skills/contentious-design`, so it is available in every repository in the suite from one checkout. See [ADR-0004](docs/adr/0004-design-system-as-a-skill.md).

- **`styles/semantic.css`** – the semantic layer is now reachable by consumers as `@contentious/ui/styles/semantic.css`: 81 tokens giving the vocabulary the raw palette can't (`--surface-*`, `--rule-*`, `--text-*`, `--accent-*`, `--level-*`, `--data-*`, chip tones, switch and type roles). The file holds no definitions of its own – it imports the design system's `semantic.css` into `@layer theme`, so there is one file rather than a copy that drifts. Purely additive: nothing referenced these names before, so no rendering changes anywhere.

- **`npm run check:design-sync`** – verifies the design system tree matches the stamp left by the last export. Fails on a hand-edit inside `skills/` (which the next export would silently destroy), on a `SKILL.md` description that stops naming the product family (which makes the skill get skipped in sibling repos), and on a missing file that `src/styles/semantic.css` imports. `docs/design-system-sync.md` records how the sync works and what is currently open.

## [0.2.0]

### Changed

- **`typography.css`** – `--base-font-size` raised from `19px` to `24px`. 24px is now the canonical brand default, matching how the Contentious website renders. Products that render at the previous 19px size (Voice Tone and Style, Content Maturity) now declare `--base-font-size: 19px` explicitly in their theme files as documented deviations from the brand standard. **Breaking for consumers who inherited the 19px default without declaring it**: such consumers must either adopt 24px (the new brand default) or add an explicit override in their theme file.
- **`themes/voice-tone-style.css`** – adds explicit `--base-font-size: 19px` override so VTS continues to render at 19px after the brand default change.
- **`themes/content-maturity.css`** – adds explicit `--base-font-size: 19px` override for the same reason.
- **`accordion.tsx`** – converted from Tailwind utilities to `c-accordion` BEM classes. Removed `flex`, `flex-1`, `items-center`, `py-4`, `font-medium`, `transition-all`, `hover:underline`, `[&[data-state=open]>svg]:rotate-180`, `overflow-hidden`, `text-sm`, `data-[state=...]` animate utilities.
- **`card.tsx`** – converted from Tailwind utilities to `c-card` BEM classes. Removed `rounded-lg`, `border`, `bg-card`, `text-card-foreground`, `shadow-sm`, `flex`, `flex-col`, `space-y-1.5`, `p-6`, `text-2xl`, `font-semibold`, `leading-none`, `tracking-tight`, `text-sm`.
- **`ErrorBoundary.tsx`** – converted from Tailwind utilities to `c-error` BEM classes.
- **`Section.tsx`** – `bg` prop now accepts a CSS value (`"var(--sorbet-900)"`) instead of a Tailwind class name (`"bg-sorbet-900"`). Renders with `style={{ backgroundColor: bg }}`.
- **`SectionHeader.tsx`** – converted from Tailwind utilities to `c-section-header` BEM classes. Removed `text-4xl`, `text-xl`, `font-display`, `max-w-xl`, `mx-auto`, `text-center` utilities.
- **`FeatureCard.tsx`** – converted from Tailwind utilities to `c-feature-card` BEM classes. Removed `border-0`, `rounded-xl`, `p-8`, `font-display`, `text-2xl`, `font-normal`, `text-lg`, `leading-relaxed` utilities.
- **`palette.css` removed** – replaced by `tokens.css` (palette and semantic tokens) and `base.css` (fonts and element defaults).
- **Theme files** – `@layer base` updated to `@layer theme` to match declared layer order.

### Added

- **`themes/contentious-website.css`** – theme file for the contentious.ltd product. Minimal: the website expresses the brand most directly and inherits all brand defaults. Placeholder for future website-specific overrides.
- **`tokens.css`** – canonical hex-format design token file in `@layer tokens`. Covers: full brand palette (11 colours × 17 shades), semantic colour aliases (status, star ratings), spacing scale (xs–6xl, including 12px), borders and radii, shadow scale, motion tokens (durations, easing), z-index scale, and layout tokens. Hex values match the upstream palette in `contentious-astro/design-tokens.css`.
- **`layers.css`** – `@layer` order declaration: `tokens, theme, base, components, utilities`. Import first to establish cascade priority.
- **`base.css`** – `@font-face` declarations for Bely (regular, bold, italic) and Bely Display, `@layer base` element defaults (body background/colour/font, heading font-family), and animation keyframes (loading ring, rotating ring, mobile menu slide/fade).
- **`themes/voice-tone-style.css`** – semantic token mapping for VTS (sorbet primary, limestone surfaces).
- **`themes/content-maturity.css`** – semantic token mapping for Content Maturity (fire primary, lichen surfaces).
- **`src/types/design-tokens.ts`** – `ColorScheme`, `BorderStyle`, `SectionLayout`, `SectionVariant`, `DeviceType` types ported from `contentious-astro`.
- **`src/lib/colors.ts`** – colour utility functions: `getCssVar()`, `isDarkScheme()`, `getScoreColour()`, `CHART_COLOURS`, `getStatusColour()`. Ported and updated from `contentious-astro` and CHC local copy. All functions return CSS variable references (not HSL strings or Tailwind classes).
- **`typography.css`** – Contentious responsive typography system in `@layer tokens` (type scale and weight tokens), `@layer base` (responsive `--text-multiplier` breakpoints), `@layer components` (`type-*` utility classes and `.display-heading`), and unlayered `.prose` styles for article content. Extracted from `voicetoneandstyle/client/src/index.css`. `hsl(var(--x))` colour references updated to plain `var(--x)` to match hex token format.
- **`components.css`** – Component classes in `@layer components`. Button variants + sizes (Phase 3). Brand layout components: `c-section`, `c-section-header`, `c-feature-card` (Phase 4). Shadcn-derived components: `c-accordion`, `c-card`, `c-error` – full CSS replacements for the Tailwind utilities previously baked into these components (Phase 5).
- **`base.css`** – Modern CSS reset added to `@layer base`, replacing Tailwind's Preflight. Accordion open/close keyframes (`accordion-down`, `accordion-up`) added to support Radix's `--radix-accordion-content-height` variable. Covers `.btn` base, all variant classes (`.btn-primary`, `.btn-outline`, `.btn-outline-light`, `.btn-secondary`, `.btn-ghost`, `.btn-link`, `.btn-destructive`), and size modifiers (`.btn-sm`, `.btn-lg`, `.btn-icon`). Extracted from `voicetoneandstyle/client/src/index.css`. Hover opacity variants replaced from `hsl(var(--x) / 0.85)` to `color-mix(in srgb, var(--x) 85%, transparent)` for hex token compatibility.

### Fixed

- **Button box-model parity** – `.btn` base now declares `border: 1px solid transparent` (was `border: none`). Variants like `.btn-outline-light` set the border colour without changing the border width, so filled and outline variants share an identical box model. Previously the 1px border on outline variants shrank the content box by 2px under `box-sizing: border-box`, causing subpixel disagreement on text vertical-centring between filled and outline buttons placed side-by-side.

---

## [0.1.0] – Initial release

Shared UI component library extracted from `voicetoneandstyle`. Includes shadcn/ui components re-styled with Contentious brand tokens, Bely font files, and a Tailwind preset.

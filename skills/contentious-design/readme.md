# Contentious Design System

The design system behind **Content Health Check** (contenthealthcheck.com) and the wider Contentious product family – contentious.ltd, contentmaturity.com, voicetoneandstyle.com.

Content Health Check audits a website’s content: it discovers a client’s **estate**, builds an **inventory** of URLs, promotes the pages worth monitoring into a **watchlist**, and scores them into **results**. Agencies hold **clients**; clients hold **projects**; a project is one website. Everything in the app is scoped to a single live project.

## Sources

Built from the design work in this project – pattern explorations argued out screen by screen, each one resolving a real defect in the live product. There is no external Figma file or codebase attached; the values here were set in these documents and are the canonical reference:

| Document | What it decided |
| --- | --- |
| `Label chips.html` | One chip geometry, six tones; card placement |
| `Navigation pattern.html` | One secondary nav; side nav and button tabs retired |
| `Nav hierarchy.html` | Project cluster grouping + context stand-down |
| `Admin - Monitoring.html` | The six data-display patterns |
| `Toggle switch.html` | Neutral-off switch; solid vs tint accent |
| `Project switcher v2.html` | Switcher scaled to account shape |
| `Account menu.html` | Menu panel surface, row density |
| `Account - Clients & People.html`, `Your clients.html` | The aligned list |
| `Inventory - Estate Discovery.html`, `Analysis - Catalogue & Runs.html` | Estate/inventory/catalogue screens (not yet on the component library) |

Fonts are the licensed **Bely** and **Bely Display** cuts in `fonts/` – no substitution was needed. Logos and concept illustrations are in `images/`.

---

## CONTENT FUNDAMENTALS

**Second person, present tense, active voice.** "You’re on the Agency plan." "Everything below belongs to this project." Never "the user", never "please", never marketing-first person plural unless the sentence is genuinely about Contentious.

**Sentence case everywhere** – headings, buttons, tabs, labels. Title Case is reserved for proper nouns. Mono labels are the one exception: uppercased by CSS, written sentence case in source.

**British English.** Analyse, colour, organisation, prioritise. Currency in £ unless the figure is a real dollar API cost.

**State the state, not the action.** Switch labels read "Banner is hidden", never "Hide banner". Empty states say what’s absent, not what to do about it.

**Say the consequence.** Copy earns its place by telling you something you couldn’t infer: "Leave this empty and the banner stays hidden even when the switch is on." "Only changed pages are re-scored, so an unchanged estate costs nothing." Never "Enter your banner text below."

**Pair every number with its source.** "$41.28" alone is a fact; "3,074 calls · $0.0134 each" is useful. Round to the precision someone can act on – `$41.28`, not `$41.2847`.

**Explain the model once, quietly, in place.** One 12px sentence at the foot of a menu beats a modal. Explanatory copy lives where the confusion happens, and it is never permanent chrome – a tooltip is preferred to a label, and a tooltip is preferred to a coachmark.

**No emoji.** No exclamation marks. No "Oops". No "Let’s get started". Errors state what failed and what to do: "5 are Firecrawl timeouts."

**Voice under pressure:** dry, specific, slightly understated. "Anything over 10% is worth investigating." "Nobody learns a data model while trying to run their first audit."

---

## VISUAL FOUNDATIONS

### The level ramp

The framework scores each criterion out of five stars, so the score ramp has five rungs: **fire → amber → sunshine → olive → sapling** (`--level-1` to `--level-5`). The brand guide fixes two of them — amber is the level 2 colour, olive the level 4.

**These five are reserved for scores.** Not a categorical palette: an orange bar in a "top sections" chart reads as level 2 whether you mean it or not. Categorical bars use one colour (`--categorical`); ordered process stages use a wave ramp with fire for failure (`--process-*`).

Band thresholds (`--score-band-*`) are provisional at 90/80/70/60 and should be replaced with the framework's real star boundaries.

### Colour
Eleven families, seventeen stops each (100 lightest → 900 darkest, in 50s); the brand true colour is the 500 stop. Only three families do structural work:

- **Limestone** – every surface. Warm cream, never white. Page 500, chrome 400, cards 300, raised blocks 600, menu panels 150.
- **Gloaming** – all text, and the inverse surface for tooltips. Warm charcoal, never pure black.
- **Fire** – the accent. **Solid fire = active or primary** (buttons, the active tab underline, the on state of a switch). **Fire tint = status** (chips, Danger zone). These never swap; that division is what lets one family be both accent and alarm without ambiguity.

Sunshine (warn), wave (info, series bars) and sapling (good) carry meaning. Coffee, olive, amber and sorbet are chart colour only.

**Pure white and pure black appear nowhere.** A white panel reads as a system alert against this palette.

**Data colour is the strictest rule in the system.** Numbers are `--data-default` (gloaming-800). Colour is reserved: sapling for good news, fire for needs-action, gloaming-400 for a genuine zero. Accent-by-default spends the alarm colour on nothing.

### Type
**Bely** throughout – body, headings and UI all share one serif, which is unusual and is the strongest thing about the identity. **Bely Display** is a single 400 cut used only for page titles and metric values, never below 30px; `font-synthesis-weight: none` is set globally so browsers can’t fake a bold and thicken the ink.

Mono is the metadata voice: system UI monospace at **10px, 0.09em, uppercase, gloaming-450 floor**. It labels; it never carries content. 9px at gloaming-300 is the most common defect in review.

Scale in use: page title 44–50 Display · section heading 21 Bely · row title 17 · body 15 · UI 14 · secondary 13 · mono label 10.

### Surfaces, borders, shadow
**One surface depth per page.** A slab inside a slab is always wrong – the single most common structural defect. Groups are made by a hairline rule and the space around them, not by a box: a section is a 1px limestone-700 rule with a heading above it, 42px clear above and 18px below.

Cards and data surfaces have **no border and no shadow**. Rows inside one surface are separated by limestone-600 hairlines. Shadows mean only "this floats above the page" – `--shadow-md` for tooltips, `--shadow-lg` for menus.

Radii: 3 chip · 6 control · 8 surface · 10 frame. **Never full-radius on a label** – a pill reads as a button.

### Layout
Content max 1200px, 28–40px gutters. App chrome is fixed-height and never wraps: brand lockup, tabs and nav items all carry `white-space: nowrap`. Sibling groups are laid out with flex/grid and `gap`, never inline whitespace.

The top bar’s project cluster – switcher plus its four sections – is one contiguous group immediately after the wordmark. The avatar sits alone on the right.

### Motion, hover, press, focus
`--transition-fast` (180ms) for state changes, `--transition-base` (280ms) for reveals and opacity. No bounce, no spring, no entrance animation. The only looping animation in the system is the 1.6s chip dot pulse, reserved for genuinely live states.

Hover is a **background step, not a colour shift**: transparent → limestone-600 for menu rows and controls; limestone-450 for list rows. Row actions and settings cogs are hidden at rest and revealed on hover. Destructive rows hover to a fire tint.

Focus is `--focus-ring` (fire-350) at 2px with 2px offset. Browser-default blue is the only non-palette colour that ever appears and it is always a bug.

Disabled greys out completely (limestone-750 on gloaming-350). A washed-out accent button reads as weak, not unavailable.

### Imagery and texture
No gradients, no blur, no glass, no grain, no full-bleed photography in the app. The only illustration is the flat, warm, hand-drawn PNG set in `images/` – used for concepts (estate, inventory, catalogue, analysis), never as decoration on a metric.

### Charts
Bar over donut, always: a 9px stacked `CompositionBar` for part-of-total, a `MicroSeries` bar sparkline for trend. No axes, no gridlines, no tooltips, no legends floating free of their values. Donuts are reserved for content freshness on the estate pages, where the metaphor earns itself.

---

## ICONOGRAPHY

**No icon library.** UI icons are hand-written inline SVG at 14–16px, 1.2px stroke, `currentColor`, matching the stroke weight of the type. There are about a dozen in total (user, card, cog, sign-out, plus, chevron) and they live inline in the components that use them – `ICON` in `ui_kits/content-health-check/Shell.jsx` is the working set.

**Concept illustrations** are the flat PNGs in `images/` – `estate`, `inventory`, `catalogue`, `analysis`, `heartbeat`, `layers`, `clipboard`, `bottles`, `cos-circle`. Use these for the four-tier explainer cards and empty states. Do not draw new ones; ask.

**Icons are all-or-nothing within a container.** Never mix iconned and icon-less rows in one menu.

**No emoji, no unicode glyphs as icons.** The one exception is the arrow in link text ("Export CSV →", "← Back to Oxfam 2"), which is typographic rather than iconographic.

**Logo:** `images/contentious-monogram.png` for the app lockup, `images/contentious-logo.png` for the full wordmark. The app lockup is monogram + product name in Bely 700 at 20px.

---

## Index

| Path | What’s there |
| --- | --- |
| `styles.css` | The entry point. `@import` list only – link this one file. |
| `tokens/` | `fonts` `colors` `typography` `spacing` `effects` `semantic` |
| `tokens/semantic.css` | **Start here.** The decisions as tokens: surfaces, hairlines, data colour, chip tones, switch, type roles. |
| `components/components.css` | Plain-CSS implementation of every component. Link `styles.css` and use the classes – no build step, no React. |
| `components/core/` | Chip, Button, Switch, Field, Card, StarRating |
| `components/data/` | Metric, MetricBand, SectionHeader, CompositionBar, MicroSeries, ListRow + ListTable, ScoreGauge, ScoreHistory, CriterionCard, ResultCard, ProcessBar |
| `components/navigation/` | TopBar + Avatar, SecondaryNav, SegmentedControl, Menu, Tooltip, ProjectSwitcher, PageHeader, Breadcrumb, AppFooter |
| `Design system.html` | **The readable reference.** Every component demonstrated, every rule with its reasoning. Start here. |
| `Screen audit.html` | Live screens against the system: what the app knows that the system didn't. |
| `Style guide audit.html` | This system against the brand guide at style.contentious.ltd. |
| `guidelines/` | 17 foundation specimen cards – colour, type, spacing, patterns, brand |
| `ui_kits/content-health-check/` | Click-through kit: Account, Billing, Project settings, Admin |
| `images/`, `fonts/` | Logos, concept illustrations, Bely webfonts |
| Root `*.html` | The original pattern explorations, kept as the argument behind each rule |

Each component directory has `<Name>.prompt.md` with usage and the rules that matter. Read those before designing a screen – most of them exist because something shipped wrong first.

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>`, `is-<state>`, inside `@layer components`.

Every size in `components/components.css` is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. The app runs at `--text-multiplier: 0.75` against the library's 24px base, giving 18px body. **No literal font-size, padding or gap appears in the stylesheet**, so density is one number rather than sixty.

Container width follows content shape: `--width-prose` for long-form reading, 1080px for standard pages, `--width-content` (1280px) for tables and dashboards.

Motion uses `--motion-state` / `--motion-reveal` / `--motion-exit`. Never `--transition-*` — the library owns those names at different values.

## Two implementations, deliberately

Every component exists twice and the two must stay in step:

- **`components/components.css`** – BEM-ish classes (`.chip.chip--warn`, `.metric__value--bad`, `.topbar__cluster.is-standdown`). Use this for static HTML, prototypes, decks and anything without a build step. It’s what the UI kit and the specimen cards run on.
- **`components/**/*.jsx`** – the React components, with `.d.ts` props contracts. Use these in production code.

If you change one, change the other. The CSS is the reference for exact values.

## Intentional additions

- **`Field`** consolidates input, textarea and select. The source pages styled these three separately with identical shells; one component avoids three drifting copies.
- **`ListTable` / `ListRow`** were extracted from the clients and people lists rather than defined as a primitive up front. They encode the aligned-list decision, which replaced a stack of per-group cards.

## Not yet on the component library

Estate, Inventory, Watchlist and Results are designed in the root-level HTML files but not rebuilt as UI-kit screens. The Results page also uses horizontal tabs consistent with `SecondaryNav`, but hasn’t been audited against this system.

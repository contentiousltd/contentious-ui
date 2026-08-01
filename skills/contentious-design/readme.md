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
| `Mobile nav.html` | Mobile sheet: context / work / account, its motion, and the site-page sub-panel |
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

**No em dashes, ever.** Not in UI copy, not in marketing, not in email. An em dash is almost always a colon, a full stop, a comma or a pair of brackets that hasn't been chosen yet, and choosing is the work: a colon when the second half explains the first, a full stop when it's a separate thought, brackets for a genuine aside. Where a dash genuinely reads best, it is the **spaced en dash** – this one – which is the house parenthetical throughout this document. En dash also for numeric ranges (90–100); the mid-dot (·) for mono metadata. This rule is mechanically checkable, so it gets checked in review.

**No emoji.** No exclamation marks. No "Oops". No "Let’s get started". Errors state what failed and what to do: "5 are Firecrawl timeouts."

**Voice under pressure:** dry, specific, slightly understated. "Anything over 10% is worth investigating." "Nobody learns a data model while trying to run their first audit."

---

## VISUAL FOUNDATIONS

### The level ramp

The framework scores each criterion out of five stars, so the score ramp has five rungs: **fire → amber → sunshine → olive → sapling** (`--level-1` to `--level-5`). The brand guide fixes two of them — amber is the level 2 colour, olive the level 4.

**These five are reserved for scores.** Not a categorical palette: an orange bar in a "top sections" chart reads as level 2 whether you mean it or not. Categorical bars use one colour (`--categorical`); ordered process stages use a wave ramp with fire for failure (`--process-*`).

Band thresholds (`--score-band-*`) are provisional at 90/80/70/60 and should be replaced with the framework's real star boundaries.

### Product signatures

This system began as the Content Health Check system, which is why CHC's expression — limestone ground, fire accent, gloaming text — sat in `semantic.css` as though it were the system itself. Any product that didn't deliberately deviate landed on CHC. **`tokens/products.css` is where one product stops looking like another**, and where the shared/individual split is finally written down.

A signature has six dimensions, in order of how much work they do: **deployment mode** · **ground** · **illustration register** · **accent** · **display presence** · **density**.

**Deployment comes before colour**, and there are two modes. *Reserved* — every app — means one accent and everything else carrying information. *Banded* is contentious.ltd alone: whole sections at a brand colour's 500 stop, full bleed, hue rotating page to page, torn-paper edges between them. The band hue is deliberately **not** a token; it is an editorial choice per page, and tokenising it would turn a decision into a default. Two consequences worth knowing. The studio site displays no scores, so the ramp's 500-stop reservation doesn't bind it — full-bleed sunshine can't be misread as level 2. And the studio site is the only place the brand's **texture** lives; the app rule (no gradient, blur, glass or grain) is unchanged, and an app that grows a torn edge is a defect, not a family resemblance.

A product overrides a **closed set of 30 tokens** in `products.css` and nothing else, anywhere. Everything outside that set is the family resemblance and never varies: Bely and Bely Display and all `--type-*` roles, the spacing scale, radii, motion, chip geometry, the score ramp and its bands, `--data-*`, `--link-underline`, one-surface-depth, hairlines-not-boxes. That core is strong enough to carry hard divergence above it.

Four rules matter more than the rest. No two products share the same (deployment, ground, accent) triple, and products sold in one conversation — CM and CHC — must differ on *ground*. Across deployment modes the mode is enough, which is how contentious.ltd shares limestone with CHC and is never mistakable for it. A partial signature silently inherits CHC, so set all 29 or none. Where a product mixes light and dark — VTS runs a light nav bar over a dark page — `--text-inset` / `--text-inset-strong` carry the text on the light island, and chrome and field markup must reference those rather than `--text-body`. The score ramp's 500-stop reservation binds only products that **display scores**; for those, accents come from outside the five ramp families (wave is the last free one) or from a ramp family at 700 or darker. And **diverge at the front door, converge inside**: a signed-in results page *should* feel like a signed-in CHC page — two marketing sites looking alike is the actual cost. `--signature-app-ground` records which way a product went.

**Settled in structure, provisional in value.** The dimensions, deployment modes, closed set, invariant core and allocation rules are agreed and safe to cite. The specific stops in each product block are a first proposal — only the CHC block is transcribed from shipping code — so reconcile each product against its production CSS before treating a hex as canonical, and correct it in `products.css` rather than in product code.

See `guidelines/pattern-product-signatures.html` for the four current signatures side by side, the recipe for adding the next one, and the open items — chiefly which sorbet stop VTS actually ships. Nothing is missing from the palette — an earlier draft of this layer claimed a twelfth family was needed and that was wrong.

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

Mono is the metadata voice: system UI monospace at **`--t-label`, 0.09em, uppercase, gloaming-450 floor**. It labels; it never carries content. 9px at gloaming-300 is the most common defect in review.

**One scale, derived.** Every app size is a `--t-*` step off `--base-font-size`; there are no literal px sizes outside chip geometry. The roles live in `tokens/type-roles.css` and the two density inputs in `tokens/typography.css`, split so that `semantic.css` — which resolves `--label-font-size` and every `--type-*` shorthand through `--t-*` — can be imported by a consumer without the scale going undefined. Resolved at the 19px app base and, in the second column, the 24px marketing base: mono label 12/15 · hint 15/19 · UI 17/21 · body 19/24 · row 20/25 · lede 21/26 · section 24/30 · metric 33/41 · page title 46/58. An earlier version of this readme listed a 15px-body scale that no token implemented — that scale is gone, along with the four literal `--text-*-size` tokens in `semantic.css` that were its last trace.

### Surfaces, borders, shadow
**One surface depth per page.** A slab inside a slab is always wrong – the single most common structural defect. Groups are made by a hairline rule and the space around them, not by a box: a section is a 1px limestone-700 rule with a heading above it, 42px clear above and 18px below.

**Scrims come in two depths and blocking decides which.** `--scrim-modal` (80%) for anything you must answer before the page works again; `--scrim-panel` (34%) for a layer over a page that is still there – the mobile sheet, a drawer you can read behind. A sheet is not modal by virtue of being a sheet.

Cards and data surfaces have **no border and no shadow**. Rows inside one surface are separated by limestone-600 hairlines. Shadows mean only "this floats above the page" – `--shadow-md` for tooltips, `--shadow-lg` for menus.

Radii: **3 chip · 6 control and surface · 12 frame** – three steps, mapped onto the library’s `--border-radius-sm/md/lg`. A surface rounds the same as a control; the fill tells them apart, not the corner. **Never full-radius on a label** – a pill reads as a button.

### Layout
Content max 1200px, 28–40px gutters. App chrome is fixed-height and never wraps: brand lockup, tabs and nav items all carry `white-space: nowrap`. Sibling groups are laid out with flex/grid and `gap`, never inline whitespace.

The top bar’s project cluster – switcher plus its four sections – is one contiguous group immediately after the wordmark. The avatar sits alone on the right.

Below the chrome breakpoint the same hierarchy becomes `MobileNav`: the project collapses to a context block, the four sections keep their funnel order with the current one marked, and the account realm pins to the bottom of the sheet on `--surface-chrome`. Never a flat list of equal rows.

### Motion, hover, press, focus
Which motion token you take is decided by **what animates**, not by feel: `--motion-state` (200ms) when only colour changes, `--motion-state-slow` (350ms) when geometry moves, `--motion-overlay` (350ms) when an overlay arrives, `--motion-exit` (150ms) when anything leaves. `--motion-reveal` is **600ms** and belongs to scroll-triggered reveals on marketing and banded surfaces only — a reveal is something you scrolled to, an overlay is something you asked for and are waiting on. These are canonical; the library’s `--transition-*` are a marketing scale and never appear in app code. No bounce, no spring, no entrance animation on page content – a list does not fade in. **Overlays are the exception and the only one:** a menu, tooltip or the mobile sheet animates in on `--motion-reveal` and out on `--motion-exit`, because the movement is what says “this is a layer above the page” rather than a page you navigated to. The only looping animation in the system is the 1.6s chip dot pulse, reserved for genuinely live states.

Hover is a **background step, not a colour shift**: transparent → `--surface-hover` for menu rows and controls (limestone-600 in CHC); `--surface-hover-row` (limestone-450 in CHC) for list rows and other large in-page surfaces — the full step would take a limestone-300 row darker than the limestone-500 page. A hover step moves toward `--surface-page` and never past it. Both are signature token each product declares, and it is neutral — a step off the surface being hovered, never the raised band, which is a lichen band on the studio site and the same sorbet stop as the menu on VTS. `--surface-hover` and `--text-on-hover` are also the names shadcn's `--accent` / `--accent-foreground` pair takes here — that collision is settled in `provenance/Accent decision 2026-07-31.html`: `--accent` in this system means the primary interactive colour and keeps the name. Row actions and settings cogs are hidden at rest and revealed on hover. Destructive rows hover to a fire tint.

Focus is `--focus-ring` at 2px with 2px offset, and it is **wave, not the accent** — fire-350 measured 2.06:1 against limestone-500, and fire already means primary, star-1 and danger. Two legal values in the whole suite: `--focus-ring-on-light` (wave-650) and `--focus-ring-on-dark` (wave-450). A region whose lightness runs opposite to its page flips it with `data-surface="inverse"` / `"inset"`. Browser-default blue is the only non-palette colour that ever appears and it is always a bug.

Disabled greys out completely (limestone-750 on gloaming-350). A washed-out accent button reads as weak, not unavailable.

### Imagery and texture
No gradients, no blur, no glass, no grain, no full-bleed photography **on working surfaces** – the ones carrying tables, metrics, charts and forms. **The rule is scoped to what a surface is for, not to which side of the login it sits on.** Marketing and informational surfaces may use `--wash-section`, a subtle two-stop diagonal tonal wash applied per full-width section: the homepage, and reading surfaces inside the app like CM's Framework page. It keeps a page of stacked sections from reading as flat stripes, and because the ramp runs diagonally a washed section meeting a flat one gives a divide that is legible at one edge of the screen and merges at the other. The test is whether the person is reading or working – in checkable form, does this surface carry a table, metric, chart or form? If yes, no wash. Second constraint: **tone may move, hue may not** – two stops, one family, and subtle enough not to read as a colour change on its own. **The pair is authored per product**, alongside the other ground tokens, not derived from `--surface-page`/`--surface-raised`: a pair of stops N apart is not a fixed amount of contrast, since the ramps aren't perceptually even and limestone's light end is aliased. A wash is not a band: a band is opaque, one stop, and means something. The only illustration is the flat, warm, hand-drawn PNG set in `images/` – used for concepts (estate, inventory, catalogue, analysis), never as decoration on a metric.

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
| `tokens/` | `fonts` `colors` `type-roles` `typography` `spacing` `effects` `semantic` `products` |
| `tokens/products.css` | **Product signatures.** The closed 30-token set each product may override, the allocation rules, and the recipe for adding the next product. |
| `tokens/type-roles.css` | The type roles: faces, line heights, `--u` and the `--t-*` scale. Importable on its own; `semantic.css` pulls it in. |
| `tokens/typography.css` | The two density inputs (`--base-font-size`, `--text-multiplier`) as prototyping defaults, plus the roles above. A theme overrides both. |
| `tokens/semantic.css` | **Start here.** The decisions as tokens: surfaces, hairlines, data colour, chip tones, switch, type roles. |
| `components/components.css` | Plain-CSS implementation of every component. Link `styles.css` and use the classes – no build step, no React. |
| `components/core/` | Chip, Button, Switch, Field, Card, StarRating |
| `components/data/` | Metric, MetricBand, SectionHeader, CompositionBar, MicroSeries, ListRow + ListTable, ScoreGauge, ScoreHistory, CriterionCard, ResultCard, ProcessBar |
| `components/navigation/` | TopBar + Avatar, SecondaryNav, SegmentedControl, Menu, Tooltip, ProjectSwitcher, MobileNav, PageHeader, Breadcrumb, AppFooter |
| `Design system.html` | **The readable reference.** Every component demonstrated, every rule with its reasoning. Start here. |
| `Screen audit.html` | Live screens against the system: what the app knows that the system didn't. |
| `Style guide audit.html` | This system against the brand guide at style.contentious.ltd. |
| `guidelines/` | 18 foundation specimen cards – colour, type, spacing, patterns, brand |
| `ui_kits/content-health-check/` | Click-through kit: Account, Billing, Project settings, Admin |
| `images/`, `fonts/` | Logos, concept illustrations, Bely webfonts |
| Root `*.html` | The original pattern explorations, kept as the argument behind each rule |

Each component directory has `<Name>.prompt.md` with usage and the rules that matter. Read those before designing a screen – most of them exist because something shipped wrong first.

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>`, `is-<state>`, inside `@layer components`.

`--base-font-size` is density, and it is **derived from deployment mode, not chosen per product**: 19px for every app, 24px for marketing surfaces. See the Density note at the foot of `tokens/products.css`. `--text-multiplier` is the library's responsive step (1 / 1.1 / 1.2 by breakpoint), **not** a density knob: setting it to 0.75 would take that 18px down to 13.5px and flatten the responsive behaviour. Assign neither in this system.

Container width follows content shape: `--width-prose` for long-form reading, 1080px for standard pages, `--width-content` (1280px) for tables and dashboards.

Motion uses `--motion-state` / `--motion-state-slow` / `--motion-overlay` / `--motion-exit` (200 / 350 / 350 / 150ms). `--motion-reveal` (600ms) is marketing reveals only. Never `--transition-*` — those are the marketing site's durations, up to 4× longer.

**Component vocabulary.** This CSS *is* the component layer, per ADR-0011: where the library and this system named the same thing differently, one name survives. Grammar is always `c-block__element--modifier`, so `.btn-destructive` becomes `.c-button--danger`. Element words come from the library where the library is more explicit, so `.c-card__sub` is now `.c-card__description`. And `.c-card` means the app's borderless data surface: the shadcn-derived bordered, shadowed card is a different component and takes a different name (`.c-frame`, matching `--radius-frame`).

**Themed utilities keep the token name verbatim** — `--surface-card` is `bg-surface-card`, `--text-strong` is `text-text-strong`, `--focus-ring` is `ring-focus-ring`. Every `--text-*` token stutters and that is correct; `.text-on-hover` emits nothing. Opacity modifiers work as of Tailwind 4.3.3 and are still almost always wrong: on a surface it is glass, on text it is an undeclared text level. Use `--scrim-*` or `--nav-context-standdown`.

**Mono is two roles.** `--font-mono` (system stack) is the app's metadata voice — labels, chips, numeric columns. `--font-mono-brand` (Courier) is code, which is what the brand guide reserves mono for. Mono is a family trait and is not in the signature set.

**Email** has its own literal type stack — see the Email block at the foot of `tokens/fonts.css`. Georgia serif, one face, no Bely Display.

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

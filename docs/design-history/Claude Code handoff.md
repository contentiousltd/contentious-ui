# Working with this design system in Claude Code

Drop this file into the **Contentious UI** repo as `CLAUDE.md` (or merge it into the existing one). It tells Claude Code where the truth lives and what not to invent.

---

## Two repos, two jobs

| | Contentious UI repo | This project |
| --- | --- | --- |
| **Owns** | Shipping code. Real components, real props, real tests. | Visual truth and the reasoning behind it. |
| **Answers** | "What is the API?" | "What should this look like, and why?" |
| **Consumed by** | The apps, at build time. | A designer or an agent, before writing code. |

Neither replaces the other, and the failure mode is treating the repo as complete because it compiles. A component library with no documented tone scale, no data-colour rule and no "never full-radius on a label" will drift, because every developer has to re-derive intent from whatever screen they happened to look at last.

**Rule of thumb:** if the question is *how do I call it*, the repo wins. If the question is *what should it look like, when do I use it, what does this colour mean*, this system wins.

---

## What to port into the repo, in order

### 1. Tokens — port the semantic layer, NOT the whole folder

**Do not replace the repo's `tokens.css`.** Its palette is already identical, and its motion, spacing, layout, radius and z-index scales are the ones in production — this project has adopted them, not the reverse.

What the repo does *not* have, and should gain, is `tokens/semantic.css`: the surface names, hairline names, chip tones, switch tokens and type roles. Port that one file into the theme layer.

Two things this project deliberately does **not** define, so they can never be ported by accident: `--transition-*` (the repo owns those; use `--motion-*` here) and the `--star-*` ramp values (aliased from the repo, not redefined).

Two things to preserve when porting:

- **The comments.** `tokens/semantic.css` explains *why* each decision is what it is. Those comments are the most valuable part of the file — they're what stops someone "tidying" `--label-color` back to gloaming-400 and quietly failing contrast on every label in the product.
- **The provisional markers.** `--score-band-*` is provisionally 90/80/70/60 and says so. Don't let that ship as though it were decided — and note the repo's `getScoreColour` takes a 1–5 score, so this banding covers only the 0–100 scores on Watchlist and the headline gauge.

### 2. The `.prompt.md` files — port them next to their components

Each component directory has `<Name>.prompt.md`: a one-line "what and when", a usage example, then the rules that matter. **These are written for an agent to read before writing code**, and they're the highest-value thing here that a conventional repo doesn't have.

They read like this:

> Never colour the off track with the accent. Filling the track is how a switch says "active", so off has to give it up — otherwise the only difference between states is which side a circle sits on.

That's a rule plus the reason. Claude Code follows rules with reasons far more reliably than bare assertions, because it can tell when a new situation is or isn't covered.

### 3. `components/components.css` — port as-is into `@layer components`

Already written to the repo's conventions: `c-<block>__<element>--<modifier>` naming, `is-<state>` for states, wrapped in `@layer components`. It should drop in beside `src/styles/components.css` without edits.

**Every size is a multiple of `--u`**, one unit of body text: `calc(var(--base-font-size) * var(--text-multiplier))`. There are no literal font sizes, paddings or gaps in the file. Set `--text-multiplier: 0.75` in the CHC theme and the whole system lands at 18px body; change that one number and everything scales proportionally.

Do not reintroduce literal pixel sizes when extending it. That's what made the last density change a sixty-number pass instead of a one-line one.

If you'd rather not maintain two implementations, keep the CSS and generate the React from it rather than the reverse — the CSS is the one with exact values.

### 4. The twelve components that don't exist yet

`StarRating`, `ScoreGauge`, `ScoreHistory`, `CriterionCard`, `ResultCard`, `Metric`, `MetricBand`, `CompositionBar`, `MicroSeries`, `ListRow`, `ProjectSwitcher`, `Breadcrumb`, `AppFooter`.

**Do not port the other eleven.** Chip, Button, Switch, Field, Card, Menu, SecondaryNav, Tooltip, PageHeader, SectionHeader and ProcessBar all duplicate shipping exports — each one says so at the foot of its own `.prompt.md`. Apply their rules to the library's existing component instead of creating a parallel one.

### 5. `readme.md` and `Design system.html` — reference, don't port

Link to them. `Design system.html` is the readable reference and it's meant to be *opened*, not parsed.

---

## What Claude Code should be told

Put this in the repo's `CLAUDE.md`:

```md
## Design system

Visual truth lives in the Contentious design system project, not in this repo.
Before building or changing any UI:

1. Read `<Name>.prompt.md` next to the component. It states when to use it and
   the rules that matter. Follow them.
2. Use tokens, never raw values. `var(--surface-card)`, not `#F8F8F2`.
   If no token fits, ask — don't add a hex code.
3. The five `--level-*` colours mean a SCORE and nothing else. Never use them
   as a categorical palette. Categorical bars use `--categorical`; process
   stages use `--process-*`.
4. Quantities are neutral (`--data-default`). Colour is reserved: `--data-good`,
   `--data-bad`, `--data-zero`. Never accent-by-default.
5. One surface depth per page. Never a card inside a card — use a hairline.
6. Copy: British English, sentence case, spaced en dashes (never em dashes),
   curly apostrophes. State the state, not the action.
7. There is exactly one secondary navigation component. No side rails.

If a design decision isn't covered, say so rather than inventing one.
```

That last line matters more than it looks. The most expensive thing an agent does to a design system is fill a gap plausibly and silently.

---

## The workflow that works

**Design first, in the design system.** When something new is needed — a component, a screen, a variant — build and argue it there, where it can be seen and compared. Then hand the resolved version to Claude Code to implement. Going the other way round produces code that works and looks wrong, and then the design system documents the accident.

**Give Claude Code the whole component directory, not a screenshot.** `.jsx` + `.d.ts` + `.prompt.md` together carry the API, the props contract and the intent. A screenshot carries none of them, and reconstructing values from pixels is where 5px becomes 4px.

**When Claude Code implements something new, bring it back.** The screen audit found ten components in the live app that weren't in the system — including the star rating, which is the product's core primitive. That gap opened because implementation ran ahead of documentation. A round trip after each piece of work keeps it closed.

---

## Connect this project to the repo

If you connect GitHub, I can read the Contentious UI repo directly and:

- **Diff it against this system** — which tokens exist under different names, which components have drifted, what's in the repo that isn't documented here.
- **Write the port** as real files in the repo's existing conventions, rather than you copying by hand.
- **Find the star asset** and any other icons, so the placeholder SVGs can be replaced with the real ones.
- **Check the lexicon** — whether estate, inventory, watchlist and results are defined terms in code, and whether they match the marketing site.

That's the fastest route to the two staying in step. Ask me and I'll prompt you to authorise it.

---

## Blocking — needs a decision before code lands

- **The star asset.** `StarRating` ships a stand-in inline SVG. It needs the app's real star shape — the system forbids unicode glyphs, so don't substitute one.
- **Mono for UI labels.** The repo already sets `--font-mono: 'Courier New'`, so the brand's code-only rule is live in shipping code while the app uses mono as its metadata voice throughout. Recommendation: add `--font-mono-ui` to the library. Until then `--font-mono` here stays on the system stack and `--font-mono-brand` holds Courier, referenced by nothing.

## Safe to do now

- Add `scoreToStars()` to `src/lib/colors.ts` beside `getScoreColour`, banding at 20/40/60/80 — a 1–5 rating as a percentage. Confirmed.

- Fix `--warning-text` — it is sunshine-900 in the repo and fails AA at label sizes. Every app inherits it.
- Take the warm shadow tint (`rgba(38,36,35,·)`) into the repo, keeping the repo's geometry.
- Set `--text-multiplier: 0.75` in the CHC theme.
- Port `tokens/semantic.css`, `components/components.css` and the `.prompt.md` files.

## Not started

- **Results tabs** sit in the page body; the nav pattern says the chrome strip. Decide before more work lands on that page.
- **The Report page** should be `--width-prose`, not full width. Long analytical prose at 1080px is a hard read.
- **Estate, Inventory, Watchlist and Results** aren't rebuilt on the component library — the four biggest surfaces in the product.
- **Estate's nested slab** and its two competing section-header styles. Cosmetic, cheap.
- **The categorical bars** on Estate still use the star ramp, which makes an orange bar imply level 2. That's the one finding where the current design actively misleads.

## Every decision, with its reasoning

Read these in the design system project rather than working from this summary:

| Document | What it settles |
| --- | --- |
| `Design system.html` | The readable reference. Every component, every rule, wrong/right pairs. |
| `Repo reconciliation.html` | This system against the library. Read before porting anything. |
| `Screen audit.html` | The live screens against the system — including the ten components the app had and the system didn't. |
| `Style guide audit.html` | This system against style.contentious.ltd. |
| `Type scale options.html` | Why 0.75, shown at four densities. |
| `github.md` | Sync state and the screen map. |

---

## Read this first

`Repo reconciliation.html` is the diff between this system and `@contentious/ui` at `main`. It supersedes anything above that contradicts it. Headlines:

- The score ramp already exists as `--star-1..5`. Use those names.
- `--transition-fast` means 300ms in the repo and 180ms was assumed here. Never use it from this system's components.
- `--warning-text` is sunshine-900 in the repo and fails AA at small sizes.
- `--base-font-size` is 24px there, scaling to 28.8px. The app has been diverging by a third.
- Roughly half the components here duplicate the repo's shadcn primitives. Write rules against those instead of porting duplicates.

`github.md` records the sync state.

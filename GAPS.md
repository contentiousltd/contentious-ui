# Gaps

Things the design system does not answer yet.

**Raising a gap must be cheaper than filling one.** That is the whole point of this
file. The July 2026 audit found five products had each invented a local answer to the
same handful of questions, and the cause was not disagreement — it was that inventing
took a minute and asking had no channel at all. So: append a line here and carry on.
It never blocks a task.

Two rules:

- **Look first.** Most apparent gaps are not gaps. The foundations usually exist and
  the failure is not going to look — check `skills/contentious-design/` (the readme,
  `tokens/semantic.css`, and the relevant `<Name>.prompt.md`) and the style guide at
  style.contentious.ltd before adding a line. "It is not a gap if you haven't looked."
- **Describe the decision you needed, not the code you wrote.** A gap is a question
  for Claude Design. If you shipped something in the meantime, say so and where, so it
  can be replaced rather than discovered later.

Claude Design reads this file and answers gaps in the design system itself; answered
gaps are removed here when the export that resolves them lands. Do not answer them
in this file, and do not answer them in product code.

## Open

- **Is density actually a per-product knob, or should it be one suite value?** Raised by
  Julius, 31 July 2026, and worth settling **before Content Health Check adopts the package
  (chc-367)**, because that is the moment CHC declares a density for real for the first time.

  The current spread reads as drift rather than intent, and neither theme file records a
  reason:

  | Product | Declared | Where the number came from |
  |---|---|---|
  | Voice Tone & Style | 19px | The library's own pre-0.2.0 default, pinned so nothing moved when the brand base went to 24px. Not chosen for VTS. |
  | Content Maturity (and Maturity Tool, which uses its theme) | 19px | Same. |
  | Content Health Check | 18px | Reverse-engineered from CHC's `body { font-size: 1.1rem }` — 17.6px, rounded. |
  | contentious.ltd | 24px | The brand default, and the only one that was actually decided. |

  Two facts make this cheap to settle now. **18px has never rendered anywhere** — CHC does
  not consume the package and never declares `--base-font-size`, so that value governs
  nothing today. And **CHC's real reading size is already ~19px**: only `body` is 17.6px,
  while `p`, `li` and `div` all override to `1.2rem` (19.2px). Moving CHC to 19 would be
  writing down what it already does, not changing direction.

  Two candidate shapes:
  - **One app density (19px) + marketing (24px).** Two values, a legible rule — apps are
    dense because they hold tables and inventories, marketing is loose because it is
    reading material.
  - **One value everywhere.** Simpler still, but pulling contentious.ltd from 24px to 19px
    is a large, visible change to the public site, so this needs to be wanted rather than
    fallen into.

  **The structural consequence, whichever wins:** ADR-0011 lists a product theme's knobs as
  *density, accent, mark*. If density stops being a product choice, that list shrinks to
  accent and mark, and the theme files get correspondingly harder to misuse. That is an
  argument for consolidating, not against — but it means the answer should say explicitly
  whether density remains a knob that products *may* set and simply agree today, or stops
  being a knob at all.

  Note the parallel scale while you are in here: `tokens/semantic.css` also hardcodes
  `--text-body-size: 16px` / `--text-lede: 18px` / `--text-support: 15px` / `--text-hint:
  14px` in literal pixels, alongside the `--u`-derived `--t-*` roles. Two type scales in
  one file, only one of which responds to density.

---

The two below were found while wiring in the answers to
[docs/design-brief-2026-07-31.md](docs/design-brief-2026-07-31.md), and both block the
same thing: making the design system's `components.css` this package's component layer.
The `.c-card` collision that blocked it is resolved (the bordered container is now
`.c-frame`), so the name is free — but the import itself still can't be turned on.

- **`tokens/typography.css` can't be imported the way `semantic.css` is.** The design
  system's component CSS sizes everything in `--u` and the `--t-*` roles, which live in
  that file — but so do standalone defaults that must not ship to consumers:
  `--base-font-size: 18px` (Content Health Check's density) and `--text-multiplier: 1`
  (which would flatten the library's responsive 1 / 1.1 / 1.2 step). Importing it would
  force CHC's density on the 24px website and the 19px products. Needs the same split
  `semantic.css` got: the roles in an importable file, the standalone defaults kept for
  prototyping. Same shape as the `colors.css` item below.
- **`.c-section` and `.c-section-header` collide, exactly as `.c-card` did.** The answers
  recorded these as marketing-only with no app equivalent, but the design system defines
  both: here `.c-section` is a marketing page section (`padding: 5rem 0`), there it is app
  section spacing (`margin-top: calc(var(--u) * 2.33)`). Importing today would silently add
  top margin to every section on the marketing site and Maturity Tool. Needs the same
  treatment `.c-card` got — decide which meaning keeps the name, and rename the other.

## Noted, not blocking

- **Maturity Tool never loads the semantic layer.** Its `index.html` links `layers`,
  `tokens`, `base`, the theme, `typography` and `components`, but not `semantic.css`, so
  none of the design system's decisions (surfaces, scrims, chip tones, data colour) reach
  it. Its `build.mjs` also copies only `src/styles` and `fonts`, so the `@import` in
  `semantic.css` would 404 if it were linked — that has to be fixed in the same change.

## Answered

Answered 31 July 2026 in `provenance/Design brief answers 2026-07-31.html` and applied in
the export + v0.4.0. Kept here for one release so the reasoning is findable, then deleted.

- **`--warning-text` fails AA** → `amber-800`, matching `--chip-warn-fg`. There is one
  warning colour and where it sits doesn't change it. `--info-text` / `--good-text` /
  `--danger-text` recorded alongside it so the next one isn't invented.
- **Email-safe type stack** → Georgia, one face, no Bely Display. The serif identity is
  kept: in an inbox of system sans it is the distinctive choice, not the compromise, and a
  display cut that never loads leaves the heading in Georgia anyway. `--font-email-serif` /
  `--font-email-mono` in `tokens/fonts.css` as the source for the build step.
- **No scrim token** → a documented two-step, because the two scrims are doing different
  jobs: `--scrim-modal` (80%) when you must answer before the page is usable,
  `--scrim-panel` (34%) for a layer over a page that is still there. Blocking is what picks
  one; a sheet is not modal by virtue of being a sheet.
- **The radius ramp disagrees with itself** → the prose was wrong, the tokens were right.
  Three steps: 3 chip · 6 control and surface · 12 frame. A surface and a control round by
  the same amount; what distinguishes them is the fill, not the corner.
- **Two motion scales** → the app scale (200 state / 350 reveal / 150 exit) is canonical,
  and the marketing durations are not wrong, just for something else. Renamed to
  `--marketing-transition-*` rather than realigned, with `--transition-*` kept as
  deprecated aliases until 0.5.0.
- **`.c-card` defined twice** → they were two different components, not two dialects. The
  bordered, shadowed shadcn container became `.c-frame`; `.c-card` is the app's borderless
  data surface. See the two open items above for what remains.

## Answered

_(Nothing yet — the file is new. Entries move here with the export that resolved them,
then get deleted once every consumer is on that release.)_

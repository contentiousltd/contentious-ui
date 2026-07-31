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

Both of these were found while wiring in the answers to
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

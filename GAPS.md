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

- **`@import url(...)` in the design system's own CSS is invisible to Tailwind 4.** Found by
  Claude Code, 1 August 2026, while moving Content Health Check to Tailwind 4. Both forms
  are valid CSS, but Tailwind 4 follows only the bare-string form (`@import "x.css"`) and
  drops the `url()` form **silently** — no warning, no error, the tokens simply never
  exist.

  `skills/contentious-design/styles.css` and `tokens.css` use the `url()` form throughout,
  and so does `tokens/semantic.css` where it pulls in `type-roles.css`. That last one bit:
  `--label-font-size`, every `--type-*` shorthand and the whole `--t-*` scale resolved to
  nothing in a Tailwind 4 consumer, which is the same defect the type-roles split was
  written to fix, arriving by a different route.

  **Worked around, not fixed.** `@contentious/ui`'s door files now use the bare-string form
  and import `type-roles.css` explicitly, which is why they hold today. The design system's
  own files still use `url()`, so anything loading `styles.css` directly — a specimen page,
  a UI kit, a prototype — is fine in a browser and would break under Tailwind 4.

  **The ask:** switch `@import url('x')` to `@import 'x'` throughout the design system. It
  is mechanical, changes nothing in a browser, and removes a trap that fails silently. If
  there is a reason the `url()` form is preferred there, say so and we will keep the
  workaround at the door instead.

- **Two literal limestone stops in `components.css` break on a dark ground.** Raised by
  Claude Design, 31 July 2026, while answering the accent decision, and deliberately kept
  out of it. `.c-row:hover` and `.c-button--ghost:hover` are `var(--limestone-450)`
  outright. On CHC, CM and the studio site that is correct and is the documented list-row
  step. **On VTS it hovers a dark row to near-white.** It has never shown, because VTS
  runs no design-system components yet.

  Fixing it properly means either a 30th signature token (`--surface-hover-row`, which
  every product would then have to declare) or deriving the row step from the card. That
  is a real argument and it wants its own brief. **Find it before VTS adopts, not after.**

  Related but distinct from `--surface-hover`, which is now settled: that one is the step
  for menus and controls; this is the step for a list row inside a card.

---

The one below was found while wiring in the answers to
[docs/design-brief-2026-07-31.md](docs/design-brief-2026-07-31.md), and it is the last
thing blocking one goal: making the design system's `components.css` this package's
component layer. The `.c-card` collision that blocked it is resolved (the bordered
container is now `.c-frame`) and the `typography.css` split has now shipped, so this is
what remains.

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

Answered 31 July 2026 in the product-signatures export and applied in `src/` the same day:

- **Should the palette move to OKLCH?** → **No.** Neither a format conversion nor a
  re-derivation of the ramps. ADR-UI-0002 stands and hex remains the storage format;
  verified on applying the export that not one hex changed. OKLCH is kept as the space to
  *review* a ramp in, with one hard rule written into `colors.css`: no two adjacent stops
  may sit closer than 1.0 L. That is what the limestone light end failed, and it is now
  documented rather than re-spaced — `150 / 250 / 350 / 450` are **aliases, not steps**,
  which is the honest account of the `-400`/`-450` collision CHC hit.
- **Is density a per-product knob?** → **Yes, but no longer a free one.** It is derived
  from deployment mode: reserved (every app) 19px, banded/marketing 24px. So ADR-0011's
  knob list keeps all three entries — density, accent, mark — and gains a constraint,
  which is the opposite of the list shrinking and is what makes a theme setting 21px
  visibly wrong to a reviewer. 19 over CHC's 18 decided on cost, not taste: neither has a
  design argument, 19 is the base the component CSS was eyeballed against, and adopting
  it changes one theme file that renders on no screen today. Applied in all four themes,
  each of which now records the reason it previously lacked.

Answered 31 July 2026 in `provenance/Accent decision 2026-07-31.html`, applied in v0.7.0:

- **Which meaning keeps `--accent`?** → **The design system's.** shadcn's
  `--accent` / `--accent-foreground` become `--surface-hover` / `--text-on-hover`. Three
  reasons, and the third settles it: `accent` is one of the six signature dimensions, so
  the dimension and the token have to share a name; shadcn's use is the anomaly (in
  shadcn the loud colour is `--primary`, and `--accent` is a recessive hover surface,
  which is the opposite of what the word means in every brand vocabulary); and **the
  value was wrong too**. "Hover is a background step, not a colour shift" is a settled
  rule, and `--accent: sunshine-500` paints hover in a brand colour, which that rule
  forbids. Since the bridge already resolved `bg-accent` to fire-500, no shipping
  appearance existed on either side – so it is a correction that happens to need a new
  name, not a migration.
- **Does the closed set grow?** → **Yes, to 29**, and `--surface-hover` joins the
  **ground** group, not the accent one. The first answer made it an alias of
  `--surface-raised` and was wrong on half the suite: VTS sets raised and menu to the
  same `sorbet-800`, so a row would hover to the colour it already sits on, and
  contentious.ltd's raised is the lichen band, so rows would hover to a green. Raised is
  a band; hover is a step off the surface being hovered, and only CHC's ground makes them
  coincide. `--text-on-hover` is **not** in the set – it equals `--text-strong` in every
  product and exists only so the shadcn codemod stays mechanical.
- **The `tokens/typography.css` split** → **done**, in the same export. `type-roles.css`
  holds the roles and is importable alone; `semantic.css` imports it itself, so
  `--label-font-size` and the `--type-*` shorthands now hold across the package boundary.
  `typography.css` keeps `--base-font-size` and `--text-multiplier` as prototyping
  defaults, and every existing import path still works.

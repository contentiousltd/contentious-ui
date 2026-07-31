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

- **`--accent` means two different things, and `products.css` makes the collision
  decisive.** Found by Claude Code, 31 July 2026, while wiring the signature layer into
  the package. This is the `.c-card` collision one layer down, with the same shape: two
  systems, one name, source order silently picking the winner.

  | Where | Value | What it means |
  |---|---|---|
  | `src/styles/themes/*.css` | `sunshine-500` | **shadcn's** accent — the muted hover / selected background, paired with `--accent-foreground` |
  | `tokens/semantic.css`, re-pointed per product in `tokens/products.css` | `fire-500` (CHC) | **the design system's** accent — the primary interactive colour, paired with `--accent-hover`, `--accent-link`, `--accent-marker` |

  They are not two dialects of one token; they are opposites. One is deliberately
  recessive (a hover tint behind a menu item), the other is the loudest colour on the
  page. A product importing both gets solid primary-action orange on every stock shadcn
  hover and selected state — in CHC that is **10 components**: `dropdown-menu`, `select`,
  `command`, `context-menu`, `menubar`, `sidebar`, `calendar`, `dialog`,
  `navigation-menu`, `toggle`. `bg-accent/50` compounds it, rendering fully opaque now
  that the token is themed.

  The collision predates the signature layer — the bridge already resolved `bg-accent` to
  fire-500, so shadcn's accent was losing quietly. What `products.css` changes is that it
  now loses *loudly and per product*, which is the useful part: it surfaced.

  **The decision needed:** which meaning keeps the name `--accent`, and what the other
  becomes. `.c-card` → `.c-frame` is the precedent, and the same argument applies — picking
  a winner without renaming just moves the damage. Worth noting the design system's set is
  the one with the coherent family (`--accent-hover`, `--accent-link`, `--accent-marker`,
  `--accent-link-hover`), while shadcn's is a two-token pair that products could rename
  locally to something like `--muted-hover` — but that is a suite decision, not CHC's.

  **Blocks chc-367** in its current shape: CHC cannot import `products.css` until this is
  settled. `semantic.css` alone is safe, so the cutover can proceed without the signature
  layer if the decision takes a while. Guarded in the meantime by a warning at the top of
  `src/styles/products.css`.

---

The two below were found while wiring in the answers to
[docs/design-brief-2026-07-31.md](docs/design-brief-2026-07-31.md), and both block the
same thing: making the design system's `components.css` this package's component layer.
The `.c-card` collision that blocked it is resolved (the bordered container is now
`.c-frame`), so the name is free — but the import itself still can't be turned on.

- **`tokens/typography.css` can't be imported the way `semantic.css` is — and as of the
  31 July export this now breaks a token consumers already ship.** The design
  system's component CSS sizes everything in `--u` and the `--t-*` roles, which live in
  that file — but so do standalone defaults that must not ship to consumers:
  `--base-font-size` and `--text-multiplier: 1` (which would flatten the library's
  responsive 1 / 1.1 / 1.2 step). Importing it would force one density on the 24px
  website and the 19px apps. Needs the same split `semantic.css` got: the roles in an
  importable file, the standalone defaults kept for prototyping.

  **What changed on 31 July:** `semantic.css` now sets `--label-font-size: var(--t-label)`
  — correctly, since a hard-coded 11px did not move with density. But `semantic.css` *is*
  importable and `typography.css` is not, so across the package boundary `--t-label` is
  undefined, the declaration is invalid at computed-value time, and every mono metadata
  label falls back to the inherited size. Inside the skill tree it is fine, because
  `styles.css` loads both. This is the first token to cross the boundary and land
  broken; it reaches VTS and Maturity Tool on their next bump and CHC at chc-367. The
  split is no longer just what unblocks `components.css` — it is a live defect.
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
  re-derivation of the ramps. ADR-0002 stands and hex remains the storage format;
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

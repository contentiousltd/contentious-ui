# Keeping the design system in sync

`skills/contentious-design/` is authored in the Claude Design project and arrives here
by export. This file records how that works, what is currently true about the copy in
the repo, and what is still open. See [ADR-0004](adr/0004-design-system-as-a-skill.md)
for why the design system lives here at all.

**This file exists outside `skills/` deliberately.** An export replaces that directory
wholesale, so anything written inside it is destroyed on the next sync. Notes, decisions
and corrections go here instead.

---

## One writer per file

The sync is a **full replacement of `skills/contentious-design/`, not a merge**. That is
only safe if exactly one party writes there.

| Path | Writer | Rule |
| --- | --- | --- |
| `skills/contentious-design/**` | Claude Design | Replaced wholesale on export. Claude Code does not edit it. |
| `src/`, `docs/`, `package.json`, build config | Claude Code | Claude Design reads these for reconciliation; it cannot commit. |

**One documented exception:** the `description:` field in `SKILL.md`. That is not design
content — it is the trigger that decides whether an agent invokes the skill at all, and
a narrow description means the skill gets skipped in the repo that needed it. Either
party may set it, and `npm run check:design-sync` fails if it stops naming the family.
Everything else in that tree belongs to Claude Design.

Claude Design's GitHub access is **read-only as a capability**, not a scope setting, so
it cannot commit even if granted org permissions. The loop is: Claude Design authors,
Claude Code commits.

## Reducing how often an export is needed

An export is the expensive, human step, so keep it for work that genuinely originates in
the design project:

- **New or revised design** — a component, a token, a rule. Needs an export.
- **A correction Claude Design spots by reading this repo** — it can read freely,
  including privately. It reports; Claude Code fixes in place; Claude Design re-reads.
  **No export needed.** The `--text-multiplier` error below was found exactly this way.
- **Anything about wiring, build, packaging or versions** — Claude Code's, never an export.

## Staleness

`npm run check:design-sync` records and verifies a manifest hash of the skill tree.

- It fails if the tree no longer matches its recorded stamp, which catches hand-edits
  inside `skills/` — including well-meant ones.
- It fails if `SKILL.md`'s description stops naming the product family.
- Re-stamp deliberately with `npm run check:design-sync -- --update` immediately after
  applying an export, never to silence a failure.

The stamp lives in `docs/design-system-stamp.json`.

---

## Current state of the copy in this repo

**The committed copy is the pre-correction export of 30 July 2026 and carries one known
error.**

**Ignore every instruction to set `--text-multiplier: 0.75`.** It appears in
`readme.md:147`, `components/components.css:9` and `:18`, `Button.prompt.md`,
`Chip.prompt.md`, `Switch.prompt.md`, and twice in `Claude Code handoff.md` including
"Set `--text-multiplier: 0.75` in the CHC theme".

`--text-multiplier` is not a density knob. It is the library's **responsive step**, set
to 1 / 1.1 / 1.2 by breakpoint in `src/styles/typography.css` under `@layer base`, and
`themes/content-health-check.css` already ships `--base-font-size: 18px`. Setting the
multiplier to 0.75 would multiply that 18px down to **13.5px body text** and flatten the
responsive behaviour at the same time.

The CSS itself survives, because those are `var()` fallbacks and both variables are
defined once the library loads. The hazard is entirely in the prose. The correct form
assigns neither: `--u: calc(var(--base-font-size) * var(--text-multiplier))`.

Found by Claude Design reading this repo, 30 July 2026. Clears on the next export.

## Wiring that depends on the skill tree

`src/styles/semantic.css` contains no definitions of its own — it is
`@import url("../../skills/contentious-design/tokens/semantic.css") layer(theme)`, so
consumers reach the semantic layer as `@contentious/ui/styles/semantic.css` and there is
one file rather than a copy that drifts.

**If `tokens/semantic.css` is moved or renamed in an export, that import breaks
silently.** `check:design-sync` asserts the file exists.

## Decisions

**One suite skill, settled 30 July 2026.** Not a shared core plus per-product skills.
Around twenty of the twenty-five components are already generic (Button, Card, Chip,
Field, ListRow, Metric, PageHeader, TopBar, Tooltip and the rest); only StarRating,
ScoreGauge, ScoreHistory, CriterionCard and ResultCard are Content Health Check's, and
the foundations were always suite-level. Splitting would reintroduce the
multiple-sources-of-truth problem ADR-0004 exists to remove. Mark product-specific
components as such inside the one skill instead.

## Open

1. **The component layer collides.** `.c-card` is defined twice — `src/styles/components.css:243`
   and `skills/contentious-design/components/components.css` — both inside
   `@layer components`, so source order silently decides the winner. The vocabularies
   differ too: the library says `.c-card__description` and `.c-button-destructive`, the
   design system says `.c-card__sub` and `.c-button--danger`. Either the design system's
   CSS becomes the library's component layer and the shadcn-derived classes migrate onto
   it, or it stays prototype-only and scoped so it cannot collide while the library's
   React is updated to match it component by component. **Claude Design's call.**
2. **`tokens/colors.css` duplicates the library's palette.** Verified identical: 187
   shared names, **zero value disagreements**, nothing defined there that the library
   lacks (the library has five more — `--star-1..5`). It cannot simply import
   `src/styles/tokens.css`, because that file is one `@layer tokens` block carrying
   spacing, motion, layout and z-index as well as colour, and pulling those in could
   change how the specimen pages render. Either the library splits colour into its own
   file, or `colors.css` becomes a pointer at that split.
3. **Weight.** `skills/contentious-design/images/` is 17MB of the 19MB installed, and
   `inventory.png` alone is 4.9MB — in a package four repos install from GitHub. The
   text that matters is about 400KB. Compressed illustrations would make an export a
   small, reviewable diff rather than a chore, which is what keeps the sync happening.
4. **The Bely cuts exist twice** — top-level `fonts/` and `skills/contentious-design/fonts/`,
   which adds `Bely-BoldItalic`. Confirmed identical otherwise.

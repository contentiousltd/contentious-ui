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

## Applying an export

The Claude Design project is split by change-rate, and only one of its three folders
travels:

| Folder there | Goes where | How often |
| --- | --- | --- |
| `design-system/` | `skills/contentious-design/` | Every export. This is the skill. |
| `provenance/` | `docs/design-history/` | Once. Finished arguments behind settled rules. |
| `explorations/` | nowhere | Never. Superseded work, historical interest only. |
| `uploads/` | nowhere | Never. Working screenshots. |

**Promotion runs one way.** Something is argued out in `explorations/`, and only once it
is settled does it move into `design-system/`. Nothing moves back. So the presence of a
component or rule in `design-system/` is itself the signal that it is decided — which is
what makes "export that folder, wholesale, no judgement call" a safe instruction rather
than a risky one.

**Download `design-system/` and copy it wholesale.** There is no judgement call about
what's in scope — that's the point of the split, and it's what keeps the export small
enough to actually happen. Roughly 2.3MB, down from 19MB, after the illustrations were
resampled to 512px.

```bash
rsync -a --delete --delete-excluded \
  --exclude 'fonts/' --exclude 'uploads/' --exclude '.DS_Store' --exclude '.thumbnail' \
  "<download>/design-system/" skills/contentious-design/
# restore the family-wide description if the export reverted it (see below)
npm run check:design-sync -- --update
```

`--delete` is deliberate: an export is a replacement, not a merge, so a file removed
upstream must disappear here too. That is also why nothing of ours may live in that tree.

**`--delete-excluded` is not optional.** Without it, `--exclude` protects a matching
directory in the *destination* from deletion as well as skipping it at the source, so a
previously-committed `fonts/` survives every future export untouched. That happened on
the first apply.

**Expect to restore the description.** The `description:` in `SKILL.md` is authored in
the design project, so an export overwrites it with whatever is there — and on the first
apply it reverted to a Content Health Check-shaped one. `check:design-sync` catches it;
re-apply the family-wide text before re-stamping.

Two exclusions, both by rule rather than judgement, both enforced by the check:

- **`fonts/`** — the repo's top-level `fonts/` is authoritative. `tokens/fonts.css`
  lists `../../../fonts/` first (which resolves to it from
  `skills/contentious-design/tokens/`) and `../fonts/` only as a fallback, so a browser
  falls through on a 404 and the same file renders correctly whether the skill is in
  this repo or standing alone in the design project.

  **This only holds while the authoritative set is a superset of what `fonts.css`
  declares.** On the first apply it wasn't: `fonts.css` declares five faces and the
  repo had four, so `Bely-BoldItalic` would have 404'd on both paths and the browser
  would have synthesised a fake oblique — which the system forbids outright, since
  `font-synthesis-weight: none` is set globally to stop faked ink. The cut was promoted
  into `fonts/` and the shared cuts were verified byte-identical. If a future export
  declares a new face, add it to `fonts/` in the same way.
- **`uploads/`** — working screenshots, not system.

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

**The `--text-multiplier: 0.75` error is CLEARED as of the applied export (verified
31 July 2026).** `readme.md:147` and `Design system.html:284` now both state the correct
rule — "nothing here should ever assign it a density value" — and the instruction is
gone from `components.css` and the `.prompt.md` files. The only surviving mentions are in
`docs/design-history/`, which is provenance rather than instruction: those files record
what was proposed at the time and are deliberately not corrected.

The explanation is kept below because the reasoning still matters when reading the
history, and because it is the clearest statement of what the two knobs do.

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
3. ~~**Weight.**~~ **Closed 30 July 2026.** Illustrations resampled 2048px → 512px
   (16.7MB → 2.1MB), three unreferenced files dropped, and the project split so only
   `design-system/` travels. Export weight is about 2.3MB, from 19MB — small enough to
   review as a diff, which is what keeps the sync happening.
4. ~~**The Bely cuts exist twice.**~~ **Closed 30 July 2026** by excluding
   `design-system/fonts/` from the export, with `tokens/fonts.css` resolving to the
   repo's top-level `fonts/` first and its local copy only as a standalone fallback.

   **Until the next export is applied, `check:design-sync` fails on this**, because the
   committed copy still carries `fonts/` and its `tokens/fonts.css` still points only at
   `../fonts/`. Deleting the directory ahead of the export would break the specimen
   pages. The failure is accurate — the repo is stale — and it clears on the next apply.

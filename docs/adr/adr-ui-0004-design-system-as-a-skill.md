# ADR-UI-0004: The design system lives here, as a skill

**Status:** Accepted
**Date:** 2026-07-30

## Context

Visual truth for the Contentious family had fragmented into three parallel sources:
the brand style guide at `style.contentious.ltd` (built from `contentious-astro`),
this package, and a design system developed separately in a Claude Design project.
Content Health Check had a fourth — a stale vendored fork of this package, plus 80KB
of local design documentation describing components it doesn't consume.

None of them was wrong. They accumulated because there was no mechanism that made
drift visible, and because the design guidance that existed was not reachable at the
moment someone was writing UI code.

The practical consequence was persistent, expensive drift: agents working in product
repos filled perceived gaps with invented design rather than consulting foundations
that, in almost every case, already answered the question. Instructions in each repo's
`CLAUDE.md` did not prevent this. They are read once at the start of a session,
describe documents in other folders, and lose to the path of least resistance.

The Claude Design project produced a complete system — semantic tokens with their
reasoning, a plain-CSS implementation of every component, `.prompt.md` rules stating
what to do and why, 17 specimen cards, and the licensed Bely cuts. It was already
packaged as a Claude Code skill.

## Decision

**The design system lives in this repository, at `skills/contentious-design/`, and is
consumed as a Claude Code skill.**

`~/.claude/skills/contentious-design` is a symlink to that directory, so the skill is
available in every repository in the suite — every product, the website, and anything
built later — from a single checkout, with no per-repo installation.

This changes the character of the package. `@contentious/ui` is no longer only a code
library that happens to carry tokens; it is the home of the design system, of which
the shipping React and CSS exports are one expression. That is a deliberate
reweighting, not an accident of filing.

Three consequences follow directly, and are part of the decision:

1. **One source of truth, not four.** `skills/contentious-design/tokens/` and
   `components/components.css` are intended to become the files the package's theme
   layer imports, rather than copies that must be kept in step. The style guide at
   `style.contentious.ltd` already renders `tokens.css` directly rather than
   duplicating it; that pattern extends to the semantic layer and to components.
2. **Design is originated by Claude Design, implemented by Claude Code.** Claude Design
   owns what things look like and why, and writes the rules. Claude Code implements to
   spec and keeps the React exports in step with the CSS. Claude Code does not
   originate visual decisions.

   Claude Design's GitHub access is **read-only as a capability** — it can read this
   repository, including privately, but cannot commit. So the loop is: Claude Design
   authors, Claude Code commits. That is the better arrangement anyway, because it
   keeps this repo's workflow — a `CHANGELOG` entry per change, an ADR where the
   reasoning matters, one commit per logical change — with the party that can run git.
   It also means the design system reaches the repo by export until that changes, and
   an export is a full replacement of `skills/contentious-design/`, not a merge.
3. **The CSS is the reference implementation.** Where the plain CSS and any React
   component disagree on an exact value, the CSS wins. The skill's `components/*.jsx`
   are prototypes for static mocks and are never imported by a product.

Updates arrive as commits to this repository, so a stale copy is visible in a diff
rather than invisible on someone's laptop.

## Consequences

**Good:**
- The design system is reachable from every repo in the suite by copying nothing.
- Guidance is versioned, diffable and backed up, instead of living in a Downloads folder.
- Products consuming `@contentious/ui` receive the design system in `node_modules` as a
  side effect, because the package is consumed as source from GitHub with no build step.
- Rules sit next to the components they govern, stated with their reasoning, which is
  the form agents follow most reliably.
- Claude Design can write to it directly if its GitHub connection is authorised,
  removing the export-and-copy step entirely.

**Neutral:**
- The repository grows by roughly 19MB, mostly concept illustrations in
  `skills/contentious-design/images/`. Because products install this package from
  GitHub, that cost is paid at every `npm install` in every consuming repo.
- The skill carries its own copy of the Bely webfonts, duplicating the top-level
  `fonts/` directory (the skill's set adds `Bely-BoldItalic`).

**Watch for:**
- **A skill still has to be invoked.** Availability is not consultation. This decision
  removes the excuse of the guidance being hard to find; it does not by itself stop an
  agent skipping it. Product repos should enforce consultation mechanically — CHC does
  this with a `PreToolUse` hook on UI file edits.
- **Two implementations of every component** (plain CSS and prototype JSX), plus the
  package's shipping React exports. This is the most likely thing to rot. The mitigation
  is the rule above: the CSS is the reference, and the prototype JSX never ships.
- **The skill description governs when it is invoked**, so it must name the whole
  family or it gets skipped in the repo it was needed in. Settled 2026-07-30: **one
  suite skill**, not a shared core plus per-product skills. Around twenty of its
  twenty-five components are already generic (Button, Card, Chip, Field, ListRow,
  Metric, PageHeader, TopBar, Tooltip and the rest); only the five scoring primitives
  are Content Health Check's, and the foundations were always suite-level. Splitting
  would reintroduce the multiple-sources-of-truth problem this ADR exists to remove.
  Mark product-specific components as such inside the one skill instead.
- The unoptimised illustrations (several over 3MB) should be compressed before this
  package is installed by many more repos.

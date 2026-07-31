# Design brief: `--accent` means two things – 31 July 2026

> **ANSWERED, same day**, in `provenance/Accent decision 2026-07-31.html`, and shipped in
> v0.7.0. **Candidate 1**: the design system keeps `--accent`; shadcn's pair becomes
> `--surface-hover` / `--text-on-hover`. The closed set **grows to 29** – `--surface-hover`
> joins the *ground* group, not the accent one, and is declared per product rather than
> aliased to `--surface-raised` (which would have left VTS with no hover state at all).
> The answer also carried a third reason this brief missed: shadcn's `sunshine-500` was
> not just the wrong *name*, it was the wrong *value* – hover is a background step, not a
> colour shift. Kept for the record; see `GAPS.md` for the settled summary.

**For Claude Design.** One decision, and it is the only thing now standing between two
products and the package. Written by Claude Code; nothing here is a decision, only a
request for one.

This is the `.c-card` collision one layer down, and the 0.4.0 answer to that one is the
precedent this asks you to apply again: they were not two dialects of one thing, so they
were named apart rather than reconciled.

---

## The collision

`--accent` is defined in both systems, with meanings that are close to opposite.

| | Where | Value | What it means | Its family |
|---|---|---|---|---|
| **A** | `tokens/semantic.css:43`, re-pointed per product in `tokens/products.css:141` | `fire-500` (CHC) | **The primary interactive colour.** The loudest thing on the page. | `--accent-hover`, `--accent-marker`, `--accent-link`, `--accent-link-hover` |
| **B** | `src/styles/themes/*.css` (CHC `:32`, CM `:27`, VTS) | `sunshine-500` | **shadcn's muted hover / selected background.** Deliberately recessive, sits *behind* a menu item. | `--accent-foreground` |

Both land in `@layer theme`, at `:root` and `[data-product]` respectively – identical
specificity (0,1,0). **Source order alone decides the winner**, which is the same failure
mode `.c-card` had.

**It is the only collision.** I compared every token name defined in `semantic.css` plus
`products.css` against all four theme files: `--accent` is the sole overlap, and the
website theme has none at all. So this is one decision, not the first of a series.

### What it does today

The bridge already resolved `bg-accent` to fire-500, so meaning B was quietly losing
before any of this – shadcn hover states were being painted in the primary action colour
without anyone noticing. What changed on 31 July is that `products.css` re-points
`--accent` per product, which makes the loss loud and product-specific instead of silent.

Concretely, a product importing both gets solid primary-action orange on every stock
shadcn hover and selected state:

| Product | shadcn components affected | Notes |
|---|---|---|
| Content Health Check | **10** – `calendar`, `command`, `context-menu`, `dialog`, `dropdown-menu`, `menubar`, `navigation-menu`, `select`, `sidebar`, `toggle` | Blocks chc-367 from taking the signature layer |
| Content Maturity | **10** – the same set | Paused, and held paused pending this answer |
| Voice, Tone & Style | 0 | No shadcn layer, so unaffected either way |
| contentious.ltd | 0 | No collision in its theme at all |

`bg-accent/50` compounds it: now that the token is themed it emits as `var()`, so the
opacity modifier is dropped and it renders fully opaque.

### Why it can't be answered in product code

A product could re-point `--accent` locally, but that is exactly the "invent a local
answer" pattern the July audit found five times over, and it would put a product-specific
colour decision outside `products.css` – which the signature layer's own contract
forbids. Rule 1: *a product overrides tokens in THIS FILE ONLY.*

---

## The two candidates

### Candidate 1 – the design system keeps `--accent`; shadcn's pair is renamed

`--accent` / `--accent-foreground` in the theme files become something naming what they
actually are: a hover/selected surface.

- **Cost:** roughly 10 component files per product mechanically reclassed
  (`bg-accent` → `bg-<new>`, `text-accent-foreground` → …), plus two lines in each theme
  file. CHC and CM only; VTS and the website unaffected. It is find-and-replace, not
  judgement.
- **For:** meaning A owns a coherent family of five tokens that all read correctly with
  the `accent-` prefix; meaning B is a two-token pair. Renaming the pair leaves the
  larger, more self-consistent vocabulary intact.
- **For:** `accent` is one of the six named signature dimensions in `products.css`. Under
  this option the dimension and the token keep the same name.
- **Question it raises for you:** the natural name is a *surface* one, since that is what
  it is – but `--surface-*` is inside the closed 28-token signature set, and the contract
  says growing that set is a system decision, not a product one. So if the answer is
  something like `--surface-hover`, please say explicitly whether the signature set grows
  to include it (every product would then need to declare it) or whether it sits outside
  as a suite constant.

### Candidate 2 – shadcn keeps `--accent`; the design system's is renamed

`--accent`, `--accent-hover`, `--accent-marker`, `--accent-link`, `--accent-link-hover`
become something like `--primary-action-*` or `--interactive-*`.

- **Cost:** no product code changes today – neither CHC nor CM uses design-system
  components yet, so nothing consumes meaning A in either app. But it renames five tokens
  across `semantic.css`, `products.css`, all four product blocks, the specimen pages, the
  component `.prompt.md` files and the public style guide. That is the brand-surface cost,
  and it is concentrated in your tree rather than ours.
- **For:** it leaves the two shadcn-based products completely untouched, and shadcn's
  naming is a widely-understood external convention that products may keep inheriting.
- **Against:** the `accent` signature dimension and the `--accent` token would stop
  sharing a name, which makes `products.css` read less obviously.

**Neither is obviously right, and the cheaper one is not obviously the better one** –
candidate 1 is more files but they are ours and mechanical; candidate 2 is fewer files
but they are brand surfaces and yours. We have no preference we can justify on design
grounds, which is why this is a question rather than a proposal.

---

## What we are not asking

Please don't re-solve these – they are settled or in hand:

- **Density.** Answered in the 31 July export, applied in v0.6.0, all four themes updated.
- **OKLCH.** Answered: rejected. ADR-0002 reaffirmed.
- **The bridge freezing the signature colours.** That was our bug, fixed in v0.6.0 –
  themed-ness is now sticky and `products.css` counts as product-scoped.
- **The `.c-card` / `.c-frame` split.** Settled in 0.4.0 and working.

## Also open, and deliberately kept separate

`tokens/typography.css` still can't be imported the way `semantic.css` is, and as of the
31 July export that became a live defect rather than a tidiness problem: `semantic.css`
now sets `--label-font-size: var(--t-label)`, but `--t-label` lives in `typography.css`,
which consumers can't import – so across the package boundary the declaration is invalid
and mono metadata labels fall back to the inherited size. It needs the same split
`semantic.css` got: roles in an importable file, standalone defaults kept for prototyping.

**It is listed here for completeness, not to be batched with the decision above.** No
consumer references the token today, so it is not blocking anything, whereas `--accent`
is holding two products. If answering both together would delay `--accent`, please answer
`--accent` alone and let the split follow.

## What is blocked on this

- **chc-367** (CHC adopts the package) can proceed *without* the signature layer, so it is
  slowed rather than stopped – but it has to import `semantic.css` before its theme file
  to keep shadcn's hover correct, which means the design system's accent is wrong for any
  design-system component from day one. That is a real deadline, not a preference.
- **Content Maturity's adoption is paused outright** pending this answer, since it is the
  same 10 components and its signature block proposes a genuine ground change that nobody
  has seen on a screen yet.
- Downstream of chc-367: chc-368 (vocabulary codemod), chc-369 (`index.css` shrink),
  chc-371 (Estate categorical palette), chc-376 (navigation scrims).

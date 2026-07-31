# Design brief — 31 July 2026

**For Claude Design.** Six decisions the design system needs to make before Phase 2 of
the [July 2026 design audit](https://github.com/contentiousltd/contentious/blob/main/docs/plans/design-system-audit-2026-07.md)
can proceed. Written by Claude Code; nothing here is a decision, only a request for one.

Background, all readable on GitHub `main`:

- The audit, and suite **ADR-0011** (design-system architecture), **ADR-0012** (CSS
  strategy), **ADR-0013** (dark mode: not supported), **ADR-0014** (distribution) in the
  `contentious` meta-repo.
- `GAPS.md` in this repo — the standing gap channel. Items 1, 2 and 3 below are the
  entries already sitting there; 4, 5 and 6 were found while writing this brief.

**What we already checked.** Two problems the audit reported are already fixed in the
applied export and need no work: the `--text-multiplier: 0.75` instruction (the readme
and `Design system.html` now state the correct rule) and the duplicated `fonts/`
directory. The categorical chart palette the audit wanted also already exists —
`--categorical`, `--series-*`, `--comp-*` in `tokens/semantic.css` — so Estate's fix is
implementation, not design. Please don't re-solve any of those.

---

## 1. The component layer collides — the one that blocks everything

`.c-card` is defined twice inside `@layer components`: `src/styles/components.css:243`
(library) and `skills/contentious-design/components/components.css:73` (design system).
Source order silently decides which wins. The dialects differ too — the library says
`.c-card__description` and `.c-button-destructive`, the design system says `.c-card__sub`
and `.c-button--danger`.

This is recorded in `docs/design-system-sync.md` under Open as **Claude Design's call**,
with two options:

- **(a)** the design system's CSS *becomes* the library's component layer, and the
  shadcn-derived classes migrate onto it; or
- **(b)** it stays prototype-only and is scoped so it cannot collide, while the library's
  React is updated to match it component by component.

**Why it's urgent:** Content Health Check adopts the package next (chc-367), and it can't
be told which component vocabulary it is adopting until this is settled. Everything else
in this brief is smaller.

Claude Code's read, for what it's worth: **(a)**, because ADR-0011 makes the skill's plain
CSS the reference implementation, and (b) leaves two vocabularies alive indefinitely. But
the migration cost lands on the library, so it is genuinely a design call.

## 2. `--warning-text` fails AA

`src/styles/tokens.css:239` sets `--warning-text: var(--sunshine-900)`. The chip tones
already hit this exact problem and solved it — `tokens/semantic.css:126` sets
`--chip-warn-fg: var(--amber-800)` with the comment *"not sunshine-900 – fails at 10px"* —
but the standalone text token never followed.

**Decision needed:** does `--warning-text` move to `amber-800` for consistency with the
chip precedent, or is there a reason warning *text* differs from warning *chip text*?

## 3. Email-safe type stack

Blocking chc-370 (repo-owned email templates). Bely will not load in most mail clients,
and CSS custom properties don't work there at all, so email needs a literal fallback
stack baked in at build time.

**Decisions needed:** the named fallback stack; and whether the serif identity is
preserved (Georgia, consistent with the web fallback we just standardised) or
deliberately dropped in email. Also whether Bely Display is attempted at all for email
headings, or whether email drops to a single face.

## 4. There is no scrim token — and Content Health Check now has two scrims

`grep` finds no scrim or overlay token in either `src/styles/` or the skill. Meanwhile CHC
has just shipped `--overlay` (a warm near-black, replacing pure black) used at **80%**
behind dialogs, sheets and drawers, and the mobile nav independently landed its scrim at
**34%**. Two different depths, no rule, and nothing in the design system to appeal to.

**Decision needed:** a scrim token — one value, or a documented two-step (heavy for modal
dialogs, light for a nav panel that keeps the page legible behind it). This is the kind of
thing that will otherwise be invented separately in every product, which is the failure
ADR-0011 exists to stop.

## 5. The radius ramp disagrees with itself

`readme.md:84` states **"3 chip · 6 control · 8 surface · 10 frame"**. But
`tokens/semantic.css:191-192` maps `--radius-surface` to 6 and `--radius-frame` to 12,
with the comment *"The repo has no 8px step, so surfaces round to 6 rather than inventing
one."*

So the prose describes a four-step ramp the tokens don't implement.

**Decision needed:** either the library gains 8px and 10px steps and the tokens move to
match the prose, or the prose changes to describe 3/6/6/12. Right now anyone reading the
readme and anyone reading the tokens build different corners.

## 6. The library's `--transition-*` values are on a different scale entirely

`src/styles/tokens.css:306-309` carries `--transition-fast: 300ms`, `-base: 800ms`,
`-slow: 1.5s`, `-slower: 3s` — a marketing-site scale inherited from the Astro site. The
design system's motion is an app scale: 200ms state, 350ms reveal, 150ms exit. The skill
already works around it by defining `--motion-*` and instructing "never `--transition-*`".

The workaround holds, but two motion vocabularies now coexist in one cascade at values
that differ by up to 4×, which is a trap for anyone who reaches for the obvious name.

**Decision needed:** confirm the app-scale durations are canonical, and whether the
library's `--transition-*` should be realigned to them, retired in favour of `--motion-*`,
or kept as an explicitly marketing-only set. Claude Code will do the library edit either
way — this is only about which values are right.

---

## What happens next

Answers come back as an export, which replaces `skills/contentious-design/**` wholesale
per `docs/design-system-sync.md`. Claude Code then applies it, re-stamps, reconciles the
library side (items 1, 2, 5 and 6 all need a `src/` change to follow), and releases
**v0.4.0** — the release Phase 2 waits on.

Items answerable without touching the skill tree (2, 5's library half, 6's library half)
can also come back as a plain answer in chat, and Claude Code will make the change.

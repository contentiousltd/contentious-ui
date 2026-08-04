# Plan: the Contentious platform repo

**Status:** Proposal, for review. Nothing has moved.
**Written:** 2026-08-03
**Supersedes the open question in** [ADR-0005](../adr/0005-shipping-javascript-to-consumers.md)
and its [handoff note](adr-0005-handoff.md).

This plan came out of asking what ADR-0005 implies for the suite. The survey that
followed changed the answer, so this document records what was found as well as what to
do — several suite documents are wrong in ways that matter, and the corrections are part
of the work.

---

## The finding that changes ADR-0005

**`@contentious/auth` already ships compiled JavaScript by git tag, and CHC and CM both
import it.**

```json
"exports": { ".": { "types": "./dist/index.d.ts", "default": "./dist/index.js" } },
"files": ["dist", "src"],
"scripts": { "build": "tsc -p tsconfig.json", "prepare": "npm run build" }
```

That is ADR-0005's option A, in production, in the same org, installed the same way, by
the same consumers — including Content Health Check, whose esbuild `--packages=external`
server build was the original blocker.

So the question ADR-0005 poses — *can a git-tag-installed package in this suite ship
compiled JS through a `prepare` hook?* — has an empirical answer, and it is yes. The ADR
does not mention `@contentious/auth` anywhere. Neither does ADR-0014, which was written
nine days after that package was created.

**Consequence: ADR-0005 does not need deciding as posed.** `core` copies the pattern
`auth` already proves. What is left is not a packaging question but a coordination one,
which is what the rest of this plan is about.

---

## What the survey actually found

### Twelve active repos, not six

| Repo | Account | Vis. | Deploys | Files |
|---|---|---|---|---|
| contenthealthcheck | contentiousltd | private | Railway, 5 workflows | 4,167 |
| contentmaturity | juliushonnor | private | Railway, 2 workflows | 251 |
| voicetoneandstyle | juliushonnor | private | Netlify **and** Railway | 102 |
| contentious-astro | juliushonnor | private | Netlify | 416 |
| maturitytool | juliushonnor | private | Netlify | 14 |
| contentious-ui | contentiousltd | **public** | — | 246 |
| contentious-auth | contentiousltd | private | — | — |
| auth-contentious-ltd | contentiousltd | private | Railway, 1 workflow | — |
| contentious (meta) | contentiousltd | private | — | docs |
| content-layer | contentiousltd | private | — | docs |
| contentious-plugins | contentiousltd | private | — | Claude Cowork; out of scope |
| product-tracker | contentiousltd | private | nightly sync | internal tooling |

Plus dormant repos in both accounts, and `slow-content` which exists despite
`products.md` saying it does not.

### Nine consumer edges, 28 tags in 12 days

```
contentious-ui  ──────────────┬──→ contenthealthcheck   (ui v0.9.3, auth v0.6.0)
   19 tags, 17 since 23 Jul   ├──→ contentmaturity      (ui v0.9.3, auth v0.6.0)
                              ├──→ voicetoneandstyle    (ui v0.7.0)
                              ├──→ maturitytool         (ui v0.7.0)
                              ├──→ contentious-astro    (ui v0.7.0)
                              └──→ auth-contentious-ltd (ui v0.7.0, auth v0.4.0)
                                        ↑
contentious-auth  ────────────────────┘
   9 tags, 22–29 Jul
```

Measured pin changes: CHC 9, astro 6, CM 5, MT 5, VTS 4, IdP 4 — **33 cross-repo bumps
in five weeks.** On 1 August alone CHC moved through v0.7.0 → v0.7.1 → v0.7.2 → v0.7.3 →
v0.7.4 → v0.8.0 → v0.8.1.

**This rate is rollout, and it is expected to fall.** The bumps sit inside adoption work
— CHC's within chc-367, CM's within cm-141 to cm-147 — where each product surfacing a
real requirement is the package doing its job. Different apps have different needs, so
the package evolves as it lands in each one, and that settles as adoption completes.
Messages that look like repair ("Repin to v0.7.2 to restore max-w-\*") are the feedback
loop working, not thrash.

So the rate is **not** the argument for what follows, and ADR-0014 §5's trigger
("cross-repo version bumps exceed roughly one per week for a sustained period", against
an observed six) is met on the letter but not in the spirit its author meant. The
argument is structural and is made below: four things that must change together, across
version boundaries.

### The identity provider is the most stale thing in the suite

`auth-contentious-ltd` sits on `@contentious/auth` v0.4.0 while CHC and CM are on v0.6.0,
and on `@contentious/ui` v0.7.0 while they are on v0.9.3. It is the reference
implementation of the package it is two versions behind, and it is what every product
redirects users into. `@contentious/auth` has no `check:ui-current` equivalent, so nothing
reports this.

**Open question for review: is that deliberate, or drift?** It changes how urgent this is.

### ADR-0014's provenance

Worth recording, because its wording carries more authority than its history supports:

```
2026-07-31 10:40  719d4fb  Audit the design system across the suite, and decide how it should work
2026-07-31 12:48  080f53f  Ratify the design-system ADRs
```

Drafted and accepted the same morning, about two hours apart, as one of four ADRs
(0011–0014) ratified in a single batch commit, co-authored by an agent doing an audit
sweep. It was written nine days after `contentious-auth` was created building to `dist/`,
and does not mention it.

So §1's "no build step, permanently" is best read as a generalisation from
`@contentious/ui` that did not check the sibling package — not a deliberated suite-wide
constraint. The concern underneath it is real and is preserved below.

---

## The shape

A **private** `contentious-platform` repo, npm workspaces:

```
contentious-platform/                    PRIVATE, contentiousltd
  packages/
    ui/          design system, skill tree, CSS, fonts, check scripts
    auth/        Better Auth wrapper
    core/        NEW — banding rule and shared pure logic
  services/
    auth-contentious-ltd/                the IdP (Railway, from subdirectory)
  docs/adr/                              platform-level decisions
  .github/workflows/

── separate repos, pinning the platform by exact tag ──
contenthealthcheck · contentmaturity · voicetoneandstyle
contentious-astro · maturitytool · content-layer · contentious (meta)
```

**Private, not public.** `auth` and the IdP are private and should stay so. This costs
`contentious-ui`'s current public visibility — see "What we give up" below.

**Why the IdP is inside.** It is not a foundation in the sense the packages are; nobody
imports it. But it consumes both packages, is drifting on both, and its whole job is
being the reference implementation of `@contentious/auth`. When the auth package changes,
it is the thing that must change with it. `services/` keeps the distinction visible. If
it feels wrong to have a deployed service in a package repo, leaving it out is
defensible and costs one of the nine edges.

**Why Maturity Tool stays out.** Multi-tenant, licensed to consultancies, and the Brani
partnership (framework IP, revenue share) lives in that repo. A codebase that might need
escrow, separate access, or sale is awkward inside a shared repo. It is also 14 files, so
keeping it separate costs almost nothing. `family.md` already frames MT as a sibling
product rather than a suite member.

### What this fixes

Four of nine edges disappear. `ui` + `auth` + `core` + IdP change in one commit, one CI
run, one tag. Two contradictory packaging models become one. The banding rule gets a home
with no design dependency. The IdP cannot silently drift from the package it implements.

### What it does not fix

CHC, CM, VTS, astro and MT still bump pins — five edges remain, and rollout will keep
producing them until adoption completes.

That is the right cost to keep paying. The four things being merged are the ones that
*must* change together — `auth` and its reference implementation, `ui` and `core` and the
products' shared foundations. A product taking a new version of a stable package is an
ordinary dependency relationship, and an exact pin is the right way to express it.

**No post-merge metric proves this worked.** Churn will fall as rollout completes whether
or not the merge happens, so a falling tag rate is not evidence either way. What the merge
is judged on is direct: the banding rule has one home, the IdP cannot sit two versions
behind the package it implements, and extracting a component upward is one commit.

### What we give up

**`contentious-ui` is currently public and the platform repo would be private.** The
operating-model doc argues public visibility is load-bearing because Claude Design can
fetch a URL but not read a private repo.

The replacement is `style.contentious.ltd`, which is already public and already renders
from real token files — arguably better, since it shows rendered state rather than
source. **This needs confirming before the move, not after:** `design-system-sync.md`
records Claude Design reading this repo directly, including privately, and the style
guide may not cover everything it reads. If it does not, options are a public mirror of
`packages/ui`, or keeping `ui` as its own public repo and merging only `auth` + `core` +
IdP.

---

## Phases

### Phase 0 — verify before moving anything

1. **Confirm CHC imports `@contentious/auth`'s compiled output at runtime**, in the
   deployed server, not just at build time. This is the whole premise. CHC pins
   `contentious-auth#v0.6.0`; confirm a `dist/` import survives
   esbuild `--packages=external`.
2. **Confirm what Claude Design reads** from `contentious-ui` beyond what
   `style.contentious.ltd` renders. Decides whether the platform repo can be private.
3. **Resolve the IdP's staleness question** — deliberate or drift.

If (1) fails, this plan changes shape and ADR-0005 reopens as posed.

### Phase 1 — create the platform repo

`git subtree` preserves history for each of the four repos. Fiddly but well-trodden.

Per-repo notes:

- **`packages/ui`** — moves as-is. The `skills/contentious-design/` tree moves with it;
  the one-writer rule and wholesale-export protocol are a file-path boundary and survive
  any layout. `scripts/apply-design-export.sh` needs its paths updated.
- **`packages/auth`** — moves as-is. Its `tsconfig.json` is already the template for
  `core`.
- **`packages/core`** — new. Empty at this phase.
- **`services/auth-contentious-ltd`** — moves as-is. Railway needs a root-directory
  setting; the `nixpacks.toml` private-git-credential dance can be **deleted for
  `@contentious/auth`** once it is a workspace sibling rather than a git dependency.
  That file carries a comment recording a real token leak observed 2026-07-22 and says
  it mirrors CHC's copy — one fewer copy of it is a genuine win.

**Consumer-visible breakage to handle in the same change:** CHC and CM both run

```
node node_modules/@contentious/ui/scripts/check-utilities.mjs --src client/src --css dist/public/assets
```

The hardcoded path survives the move only if the published package keeps the same name
and layout. It should — `packages/ui` still publishes as `@contentious/ui` — but it needs
verifying in both repos, because a broken check script fails their CI, not ours.

**CI.** `checks.yml` becomes workspace-aware. The version-has-a-matching-tag guard needs
rethinking for three packages in one repo — either per-package tags (`ui-v0.9.4`,
`core-v0.1.0`) or a single platform version. **Per-package tags are the recommendation**,
because consumers pin packages, not the platform, and a single version would force a
bump on every consumer whenever any package changed.

### Phase 2 — `core` takes the banding rule

This is the original complaint in ADR-0005 and nothing gates it.

Three copies, verified identical for every integer 0–100:

| Where | File |
|---|---|
| Library | `src/lib/colors.ts` — `scoreToStars`, `getScoreColour`, `getScoreColourFromPercent` |
| CHC | `shared/scoring.ts` + `shared/__tests__/no-local-score-bands.test.ts` |
| CM | `client/src/lib/maturity-bands.ts` + its own test |

Move to `packages/core`, built with `tsc` + `prepare` copying `@contentious/auth`. Roughly
345 lines total across `colors.ts` (191), `design-tokens.ts` (83, pure types, zero
imports) and `brand/index.ts` (71). `colors.ts`'s only import is a `import type`, so it
erases.

Then CHC's `shared/scoring.ts` and CM's `maturity-bands.ts` collapse into imports, and
CHC's `no-local-score-bands` test — currently policing locally the exact duplication this
removes globally — becomes redundant.

Note `brand/index.ts` already documents the workaround this replaces: data in
`brands.json` rather than TypeScript, because the IdP consumes it from a Node process
built with `--packages=external`. Same constraint, solved by hand once.

### Phase 3 — clear what blocks components

Not packaging. Four package defects from `design-system-sync.md`, all touching component
rendering:

- **Item 5** — the warm shadow set never crosses the package boundary; every consumer
  renders `rgba(0,0,0,…)` instead.
- **Item 6** — `.btn-outline:hover` and `.btn-ghost:hover` paint with `var(--accent)`,
  which post-0.7.0 is the primary interactive colour, so those hovers are a solid fire
  fill; `--accent-foreground` is defined nowhere, so the text colour does not change at
  all. Recorded as "a codemod, not a decision".
- **Item 8** — `--text-on-hover` emits `.text-text-on-hover`; the short form is dead.
- **Item 10** — `--font-heading-display` names a family no `@font-face` declares, so the
  display cut is silently lost.

Also worth closing here: the version spread. Shipping shared components into a suite
where a third of consumers are two minors behind is asking for trouble — components
couple much harder than tokens.

### Phase 4 — components move up, one at a time

**Blocked on a design decision, not on engineering.** Open item 1 in
`design-system-sync.md`: `.c-card` is defined twice inside `@layer components`, with
divergent vocabularies (`.c-card__description`/`.c-card__sub`,
`.c-button-destructive`/`.c-button--danger`), so source order silently decides the
winner. A shared `<Card>` must emit class names, and nobody can say which set is real.
Marked **Claude Design's call**.

Direction, per the operating-model doc: **extraction upward, not creation downward.**
CHC's shipping components have survived real content and real edge cases; a component
rebuilt from a spec has not. Claude Design's value is writing the rules against the
extracted component.

The 30 July decision holds that ~20 of 25 components are generic and five are CHC's
(StarRating, ScoreGauge, ScoreHistory, CriterionCard, ResultCard) — but CM independently
built the same five-level banding on the same `--star-*` ramp, so some of that five are
probably suite components that only look product-specific because CHC wrote them first.

The workspace helps here more than it looks: extracting a component upward changes `ui`
*and* the donating product. One commit in a workspace; two tagged releases and a bump
across a version boundary today.

---

## Documentation to correct

**Meta-repo, new ADR (0015)** superseding ADR-0014:

- §1 "no build step, permanently" → **assets ship as source; JavaScript ships compiled.**
  Preserves what §1 was actually protecting: CSS, fonts, the skill tree and check scripts
  landing readable in `node_modules`, which ADR-0011 §5 relies on. Records that
  `@contentious/auth` already worked this way when §1 was written.
- §5 monorepo "rejected for now" → **trigger fired**, with the bump data. Scoped to the
  platform; products deferred.
- §2/§3 (exact pins, loud staleness) → **unchanged for products**, no longer needed
  between platform packages.

**`shared-infrastructure.md`** is wrong in four places:

| Says | Actually |
|---|---|
| `@contentious/auth` repo "to be created" | Exists since 2026-07-22, v0.6.0, 9 tags |
| `auth.contentious.ltd` "deployment config to be created" | Exists, Railway, 44 commits, deployed |
| CHC and CM "do not consume" `@contentious/ui` | Both do, at v0.9.3 |
| "Not a monorepo" under Non-goals | Needs revising for the platform |

**`products.md`** — `slow-content` exists as a repo; the file says not created.

**This repo:** ADR-0005 moves from Proposed to resolved, citing the platform ADR;
[the handoff note](adr-0005-handoff.md) is superseded by this plan; CHANGELOG under
`[Unreleased] → Changed`.

---

## Risks

**Claude Design loses direct read access** if the platform is private and the style guide
does not cover what it reads. Phase 0 item 2. This is the one that could change the shape.

**The merge happens mid-rollout.** CHC and CM are actively adopting, and the four repos
move while that work is in flight. Phase 1 is best sequenced between adoption steps
rather than across one, and the consumer-visible `check-utilities.mjs` path below is the
thing most likely to interrupt someone mid-task.

**`git subtree` across four repos is fiddly**, particularly `auth-contentious-ltd` with
its Railway deploy and drizzle migrations. Mechanical, but not zero.

**Per-package tagging is new machinery.** Three packages in one repo need a tagging
convention the CI guard understands, and consumers need to keep pinning something
meaningful.

**The IdP is live.** Users sign in through it. Its Railway deploy must be re-pointed at a
subdirectory with no window where auth is down.

---

## What is deliberately not here

- **Merging the products.** Deferred, not rejected. CHC is 4,167 files and 85% of the
  code; the account split and Netlify billing want settling first. Revisit after the
  platform merge shows whether product churn was structural.
- **Maturity Tool.** Out, on the licensing argument.
- **`contentious-plugins`.** Claude Cowork, out of scope.
- **The component-layer collision.** Claude Design's call, not ours.
- **Netlify billing and the org move.** Real but minor, several routes; not on this
  critical path.

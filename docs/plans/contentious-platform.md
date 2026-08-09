# Plan: the Contentious platform repo

**Status:** Proposal, for review. Nothing has moved.
**Written:** 2026-08-03 · **Revised:** 2026-08-04 after review from the Content Health
Check side, which confirmed Phase 0 item 1 in the deployed server, found the
npm-subdirectory gap that is now Phase 0.2, and corrected three smaller claims.
**Supersedes the open question in** [ADR-UI-0005](../adr/adr-ui-0005-shipping-javascript-to-consumers.md)
and its [handoff note](adr-0005-handoff.md).

This plan came out of asking what ADR-UI-0005 implies for the suite. The survey that
followed changed the answer, so this document records what was found as well as what to
do — several suite documents are wrong in ways that matter, and the corrections are part
of the work.

---

## The finding that changes ADR-UI-0005

**`@contentious/auth` already ships compiled JavaScript by git tag, and CHC and CM both
import it.**

```json
"exports": { ".": { "types": "./dist/index.d.ts", "default": "./dist/index.js" } },
"files": ["dist", "src"],
"scripts": { "build": "tsc -p tsconfig.json", "prepare": "npm run build" }
```

That is its option A, in production, in the same org, installed the same way, by
the same consumers — including Content Health Check, whose esbuild `--packages=external`
server build was the original blocker.

So the question that ADR poses — *can a git-tag-installed package in this suite ship
compiled JS through a `prepare` hook?* — has an empirical answer, and it is yes. The ADR
does not mention `@contentious/auth` anywhere. Neither does ADR-0014, which was written
nine days after that package was created.

**Consequence: it does not need deciding as posed.** `core` copies the pattern
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

**This is user-visible, not just untidy** (sharpened by review from CHC's side). A user
leaves a `v0.9.3`-styled product and signs in through a `v0.7.0`-styled page — a brand
seam on every login. Post-0.7.0 the token semantics changed too: `--accent` became the
primary interactive colour, so the IdP is not merely behind, it is rendering an older
meaning of the same token names. This is the part of the plan CHC benefits from most
directly.

**Open question for review: is that deliberate, or drift?** It changes how urgent this is.
Either way, bumping the IdP does not need the merge and should not wait for it.

**Answered on 2026-08-08: drift, and it cuts deeper than the brand seam.** Content
Maturity's cm-139 spike found that Better Auth's organisation plugin is *live* at
`auth.contentious.ltd` — and that nobody at the IdP decided it. `auth-contentious-ltd/src/auth.ts`
contains no reference to organisations; it calls `createAuth`, and `@contentious/auth`
v0.6.0 enables `organization()` internally. The suite's organisation store switched on as
a side effect of a version bump. The IdP's discovery document also advertises a `jwks_uri`
that 404s, because the plugin serving it is not enabled.

So the reference implementation is not merely two versions behind the package it
implements — its *capabilities* change without a decision, in both directions. Suite
[ADR-0015](https://github.com/contentiousltd/contentious/blob/main/docs/adr/0015-shared-organisation-identity-and-the-machine-door.md)
now places the IdP on two critical paths (shared organisations, and the Content Layer's
machine door), which raises the stakes on this specific failure mode and is an argument
for the merge on grounds independent of churn.

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

**`contentious-ui` is currently public and the platform repo would be private.**

The suite's [operating-model doc](https://github.com/contentiousltd/contentious/blob/main/docs/plans/design-system-operating-model.md)
argues public visibility is load-bearing — *"Claude Design can fetch a URL. It cannot read
a private repo or a tailnet address"* — and an earlier draft of this plan treated that as
a constraint. **It is wrong, and that document is superseded anyway.** Claude Design reads
through an authorised GitHub connection, so private repos are readable exactly as public
ones are (confirmed 2026-08-04; see Phase 0.3). `design-system-sync.md:30` already said as
much — *"read-only as a capability, not a scope setting"*.

Note this also disposes of the style-guide fallback the earlier draft proposed.
[`docs/design-history/github.md`](../design-history/github.md) records what Claude Design
actually tracks — `src/styles`, `src/lib`, `src/components`, `docs` on `main` — and
`style.contentious.ltd` renders none of `src/lib` or `docs`. A rendered gallery was never
a substitute for the read path.

**So the cost is not Claude Design.** It is credentials in three build environments —
and that cost belongs to Phase 0.2, not to visibility.

### Who needs a credential, and why it is not a security expansion

VTS, `contentious-astro` and `maturitytool` install `@contentious/ui` today with no
credentials at all, because it is public. CHC, CM and the IdP already carry token
machinery for `@contentious/auth`, so a private `ui` rides the same rails at no cost.
The three Netlify sites are the ones that change.

**Attribute that correctly: under Phase 0.2 option (a) they need registry auth whether or
not the repo is private**, because a private registry authenticates every fetch
regardless of the source repo's visibility. The token work is the price of the registry,
which Phase 0.2 shows is the enabling mechanism for the whole plan. Visibility is then
close to free either way — Claude Design reads it either way, and the tokens exist either
way.

**A credential to download a package is not access to the code inside it.** Worth stating
plainly because it is easy to read the other way: giving `contentious-astro`'s build a
token does not give the marketing site access to `@contentious/auth`, the auth service, or
anything it does not already depend on. npm fetches what `package.json` lists, and the
website does not list auth. **No component gains reach into auth, and the auth service's
blast radius is unchanged.**

The real cost is narrower: **three more places holding a secret.** More copies means more
to rotate and more that can leak. Its size depends entirely on scope — a read-only,
packages-only token can download packages and nothing else, and if leaked would expose
source that is public today. A broad PAT with repo-write scope would be a genuine problem.
That is a configuration decision, not an architectural one, and the plan should specify
read-only packages scope.

Note this replaces something worse. CHC and the IdP currently share the `insteadOf`
git-credential dance, which **leaked a token in plaintext into a build log on
2026-07-22**. A registry token in `.npmrc` is less prone to that failure than URL
rewriting with an embedded credential.

### What going private actually costs, once the token work is attributed elsewhere

1. **Three build environments gain a secret** — but under option (a) they gain it anyway.
2. **A misconfigured build fails** where it used to just work. Noisy, not dangerous.
3. **The design system stops being publicly linkable.** A real change, and the only one
   genuinely caused by visibility. Claude Design does not need it; whether it is worth
   having for commercial reasons is a preference, not a trade-off against anything in
   this plan.

---

## Phases

### Phase 0 — verify before moving anything

1. ~~**Confirm CHC imports `@contentious/auth`'s compiled output at runtime.**~~
   **CONFIRMED 2026-08-04**, by Claude Code working in the CHC repo.
   `server/middleware/auth.ts:14` imports `createSessionMiddleware` from
   `@contentious/auth/oidc` (commit `56168a1e`), and that module is loaded at runtime in
   the deployed Railway server, bundled by `esbuild … --packages=external`. The
   compiled-`dist/` import demonstrably survives in production. **The premise holds and
   ADR-UI-0005 does not reopen as posed.**

2. **Decide how consumers install a package that lives in a subdirectory.** *Added
   2026-08-04 — see below. This is now the blocking item.*

3. ~~**Confirm what Claude Design reads** from `contentious-ui`.~~ **RESOLVED
   2026-08-04, by Claude Design.** Private is fine. It reads through the authorised
   GitHub connection, not through public URLs, so a private repo is readable exactly as a
   public one is — provided the connection is installed on the `contentiousltd` org and
   the repo is in its selected-repositories list. Access stays read-only either way,
   which is what [`docs/design-history/github.md`](../design-history/github.md) already
   assumes. **The one action: check the platform repo is included in the app installation,
   and keep it included.** If it is not, reads fail loudly and Claude Design asks for
   access — no silent degradation.

4. **Resolve the IdP's staleness question** — deliberate or drift.

#### Phase 0.2 — the install mechanism (blocking)

**npm cannot install a package from a subdirectory of a git repository.** Raised by
Claude Code reviewing this plan from CHC's side; verified here empirically on npm 10.9.7,
which is what every consumer uses:

| Attempt | Result |
|---|---|
| `github:babel/babel#path:/packages/babel-code-frame` | Clones the repo root and installs **that** package. Fails on the root's own manifest. |
| `github:babel/babel#workspace=@babel/code-frame` | `git checkout workspace=@babel/code-frame` — the fragment is read as a **git ref**. No such feature. |

`#path:` and `#workspace=` are pnpm and yarn-berry features. npm has neither.

Today `github:contentiousltd/contentious-ui#v0.9.3` works precisely because **the repo
root is the package**. The moment `@contentious/ui` becomes `packages/ui`, that URL
installs the workspace root instead — breaking every import in every consumer, and the
hardcoded `check-utilities.mjs` path with it.

So the per-package tags this plan recommended (`ui-v0.9.4`) name versions **no consumer
can install**. One of these has to be chosen before anything moves:

**(a) Publish to the GitHub Packages npm registry** — private, `@contentious` scope.
*Recommended.* Real per-package versions fall out naturally; the `prepare` hook and the
`insteadOf` credential rewriting are replaced by a plain `.npmrc` token; and CHC's Railway
variable is already called `GITHUB_PACKAGES_TOKEN`. CI and `nixpacks.toml` swap the
git-credential dance for registry auth — which also retires the token-leak-prone block
recorded in both repos on 2026-07-22, rather than merely deduplicating it. Note this is
ADR-UI-0005 option B. That ADR set it aside in one sentence — *"auth in every
consumer's CI, and CM already carries a `private-packages-auth` action for exactly this
kind of problem, which suggests it is not free"* — and **the evidence points the other
way.** That action does `git config insteadOf` URL rewriting so npm can clone private
**git** dependencies; it has nothing to do with a registry. It exists because the
*current* approach needs it: npm resolves GitHub git deps over `git+ssh` even when the
spec says https, runners have no key, so three URL forms are rewritten, with a fork
guard. CHC's `nixpacks.toml` carries the same dance, and leaked a token in plaintext into
a build log on 2026-07-22 doing it. A registry replaces all of that with an `.npmrc` line
and a token. The action is an argument *for* B, not against it.

B's real costs are different and smaller: publishing becomes a step that can fail
(the CI tag guard becomes "is this published?"); GitHub Packages is fiddlier than npm
proper for private scoped packages; and — the one that matters — **a tarball ships only
what `files` says.** The package has no `files` field today and ships everything, which
is why the skill tree lands in `node_modules` and CHC's hardcoded `check-utilities.mjs`
path works at all. Under B that becomes deliberate configuration, and getting it wrong
silently breaks two consumers' CI. That is precisely what ADR-0014 §1 was protecting, and
it survives a registry only if handled on purpose.

Note B did not win because the old argument was wrong — the ground moved. Then, it merely
removed git from version resolution. Now, npm cannot install a subdirectory package at
all, so a registry is the enabling mechanism rather than an improvement.

Under (a), **tokens are scoped read-only to packages** — never a broad PAT with repo
write. Three Netlify environments (VTS, `contentious-astro`, `maturitytool`) gain one;
CHC, CM and the IdP already have equivalent machinery. See "Who needs a credential" above
for why this is not an expansion of what auth touches.

**(b) CI-maintained read-only split mirrors**, one repo per package, pushed by
`git subtree split` on tag. Consumer edges stay byte-identical, so nothing changes for
products. But "four repos become one" is then true only for writers, and it is new
machinery that can break silently — the failure mode ADR-0014 §3 exists to prevent.

**(c) Move every consumer to pnpm**, which supports subdirectory installs. A suite-wide
toolchain change to solve a packaging problem. Not recommended.

**This changes the consumer story for every product**, so it is settled before Phase 1,
not during it. Whichever is chosen also determines what CHC's `ci.yml`, `railway.json` /
`nixpacks.toml` and PR-preview environments need — and the same applies to CM.

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

The hardcoded path survives only if what lands in `node_modules/@contentious/ui/` keeps
the same name and layout — which depends entirely on the Phase 0.2 choice, not on the
repo layout. Under (a) the published tarball must include `scripts/`, so `files` needs
setting deliberately; the package has no `files` field today and currently ships
everything, which is what makes the path work at all. **Verify in both CHC and CM in the
same change**, because a broken check script fails their CI, not ours.

**CI.** `checks.yml` becomes workspace-aware. The version-has-a-matching-tag guard is
rewritten against whatever Phase 0.2 decides: under (a) the guard becomes
"is this version published?", which is a better check than the tag guard it replaces;
under (b) it stays a tag guard but per-package. Consumers pin packages rather than the
platform either way, so a single platform version is wrong — it would force a bump on
every consumer whenever any package changed.

### Phase 2 — `core` takes the banding rule

This is the original complaint in ADR-UI-0005 and nothing gates it.

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

Then CHC's `shared/scoring.ts` and CM's `maturity-bands.ts` collapse into imports.

**CHC's `no-local-score-bands` test is not made redundant** — an earlier draft of this
plan said so and was wrong, corrected by review from the CHC side. Its job is stopping
new banding logic appearing anywhere in CHC, which stays valuable after the duplication
is gone. It gets *repointed* so that `shared/scoring.ts` must itself be threshold-free,
becoming a re-export of `@contentious/core`. The guard gets stronger, not weaker. CM's
equivalent test takes the same treatment.

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

**ADR identifier namespacing — done 2026-08-09.** Suite [ADR-0008](https://github.com/contentiousltd/contentious/blob/main/docs/adr/0008-adr-identifier-namespacing.md)
says a bare four-digit `ADR-NNNN` means the meta-repo and product ADRs carry their repo's
prefix, but its table listed only the five product repos — `contentious-ui` was
overlooked, so its ADRs stayed bare and "ADR-0005" meant the auth-migration ADR to a
suite reader and the JavaScript-shipping one here. This repo's six are now
`ADR-UI-0001`–`0006` at `docs/adr/adr-ui-000N-slug.md`, numbers preserved per ADR-0008 §3,
and the table has rows for the three shared-infrastructure repos it missed.

**The platform repo's `docs/adr/` carries a prefix from day one**, so this does not recur
in a repo that will outlive the plan.

**This repo:** its ADR-UI-0005 moves from Proposed to resolved, citing the platform ADR;
[the handoff note](adr-0005-handoff.md) is superseded by this plan; CHANGELOG under
`[Unreleased] → Changed`.

---

## Risks

**The install mechanism is unresolved.** Phase 0.2. npm cannot install a subdirectory
package, so until (a), (b) or (c) is chosen, the consumer story for every product is
unknown. **This is the biggest risk in the plan** and it was missed in the first draft —
found by review from CHC's side, then verified here.

**Claude Design's read access is a checklist item, not a risk** — resolved, see Phase 0.3.
The only failure mode left is forgetting to include the platform repo in the GitHub app
installation, which fails loudly rather than silently.

**The merge happens mid-rollout.** CHC and CM are actively adopting, and the four repos
move while that work is in flight. Phase 1 is best sequenced between adoption steps
rather than across one, and the consumer-visible `check-utilities.mjs` path below is the
thing most likely to interrupt someone mid-task.

**`git subtree` across four repos is fiddly**, particularly `auth-contentious-ltd` with
its Railway deploy and drizzle migrations. Mechanical, but not zero.

**Per-package versioning is new machinery** whichever way Phase 0.2 goes — a registry to
publish to, or split mirrors to maintain. Under (a) the risk is a published version that
does not match what is in the repo; under (b) it is a mirror that silently stops
updating.

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

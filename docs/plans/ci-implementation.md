# Plan: CI for `contentious-ui`

Response to [ci-handoff.md](../ci-handoff.md). I agree with the shape of it — four checks
exist, nothing runs them, one workflow file fixes that. But I verified every claim against
the repo before planning, and **the handoff's "expected to pass on first run: all four
checks pass locally" is wrong**. One of the four fails today. The plan below accounts for
that.

---

## What I verified

| Handoff claim | Verified? | Finding |
|---|---|---|
| `check:design-sync` passes | ✅ | Passes — 131 files, `ffb8c0875f3c`, stamped 2026-08-01 |
| `check:utilities` passes | ⚠️ | Exits 0, but **skips its main check** — see below |
| `tailwind4.css` in sync | ✅ | Regenerated, `git diff` clean. 246 colours, 6 fonts, 5 radii, 3 shadows |
| `tsconfig.json` exists | ✅ | Exists and is tracked. Covers `src` only |
| `npx tsc --noEmit` passes | ❌ | **Fails — but not for the reason first recorded.** TypeScript is not a dependency of this repo at all. See below |
| `npm ci` works | ✅ | Tested on a clean clone. Exits 0 |
| `package-lock.json` exists | ✅ | Present, tracked, 99KB |
| "Mirror CHC's workflow shape" | ✅ | CHC has five workflows and three CI jobs. See below |
| "CHC has a force-push hook" | ❓ | Not verifiable from my stale checkout — taking the handoff's word |
| `suite:versions` unfit for CI | ✅ | Agreed — reads `resolve(ROOT, '../..')`, no siblings in a CI checkout |

### The type-check fails today — and TypeScript isn't installed

Re-verified on the Mini, and the earlier record of this was half right. Running the
command as the workflow would:

```
$ npx tsc --noEmit
                This is not the tsc command you are looking for
```

`typescript` is **not in `devDependencies`** — the only devDeps are `@types/react` and
`@types/react-dom` — and `node_modules/.bin/tsc` does not exist. `npx tsc` fell through to
the unrelated `tsc` package on the registry. So the previously-recorded finding was
produced by a `tsc` that was never this repo's.

The errors are nonetheless real. Running a pinned TypeScript 5.9.3 against this
`tsconfig.json` reproduces them exactly:

```
src/tailwind-preset.ts(137,5): error TS2580: Cannot find name 'require'.
src/tailwind-preset.ts(138,5): error TS2580: Cannot find name 'require'.
```

Two errors, one cause. [src/tailwind-preset.ts:136-139](../../src/tailwind-preset.ts#L136-L139)
uses `require()` for the two Tailwind plugins in a `"type": "module"` package with no
`@types/node`. It is a types-only gap — Tailwind configs resolve `require` fine at runtime.

**But the ordering changes.** Any type-check step needs `typescript` added to
`devDependencies` first, or `npm ci` installs no compiler and the step fails on a missing
binary rather than on the code. Pinning it is also what makes the check reproducible:
`npx tsc` would otherwise resolve a different compiler on every runner. That is a
prerequisite for options (a) and (b) alike, not an alternative to them.

### `check:utilities` is quieter than it looks

```
· no built CSS found – skipping the emit check (pass --css after a build)
✓ no transition names a property Tailwind 4 no longer sets
```

The transition check — the one that caught the `Switch` bug — runs. The emit check
**silently skips**, because it needs built CSS and there is no build step. CI will run it
in exactly this degraded mode. Worth knowing we are getting half of this check, not all of
it. Not worth fixing now; a build step to feed it is a bigger change than this PR.

### What CHC actually does — the precedent to mirror

I first recorded here that CHC had no CI. That was wrong, and the cause was my own
checkout: `~/Projects/contenthealthcheck` is pinned four months back at `ea6cb2d7`
(2026-04-02), and `.github/` did not exist at that commit. `origin/main` — updated today —
has five workflows. `git ls-tree origin/main` shows them; my `ls` did not.

```text
.github/workflows/ci.yml            Type check, lint, build, check:utilities, tests, mobile
.github/workflows/docs-check.yml    Documentation health
.github/workflows/release-pr.yml    Release bot
.github/workflows/release-tag.yml   Tagging
.github/workflows/smoke-prod.yml    Post-deploy smoke
```

So the handoff's "mirror CHC's shape" is sound advice, and `ci.yml` carries three things
worth copying into our workflow:

- **`concurrency` with `cancel-in-progress: true`**, keyed on `github.ref`. Supersedes an
  in-flight run when you push again. Cheap and obviously right; I'm adding it.
- **`persist-credentials: false` on checkout**, with a long comment explaining that
  checkout's `AUTHORIZATION` header for the automatic `GITHUB_TOKEN` overrides configured
  credentials and breaks cloning private `@contentious/*` deps. **We don't need this** —
  `contentious-ui` has no private git dependencies — but it matters if this repo ever gains
  one, and it's the reason our workflow can stay so much smaller than CHC's.
- **`check:utilities` runs *after* the build, deliberately.** CHC's comment: "half of this
  check compares the classes the source uses against the stylesheet the build actually
  produced." That confirms my finding below from the other direction — CHC gets the full
  check because it has a build; we will get the degraded half because we don't. It also
  notes it runs *our* script rather than a copy, "so a Tailwind change is fixed once for
  the whole suite" — which is the strongest argument for gating that script here.

Corrected framing: this is **not** the suite's first CI. It's the smallest member of an
established pattern, and it should look like a stripped-down `ci.yml` rather than something
newly invented.

---

## Decisions I need from you

**1. The `require()` type errors.** Every option first requires adding a pinned
`typescript` to `devDependencies` (see above). Then:

- **(a) Fix it — now recommended.** Add `@types/node` and convert the two `require()` calls
  to top-level `import`. Small, correct, CI green from commit one.
- **(b) Add `@types/node` only.** Satisfies `tsc` without touching shipped code. Types away
  a lint rather than resolving it.
- **(c) Ship CI without `tsc`.** Land the three green checks now, handle types separately.

**This recommendation has flipped from (b) to (a), because the risk that argued for (b)
does not exist.** The case for (b) was that `tailwind-preset.ts` "is consumed by every
product's Tailwind config" and VTS is on Tailwind 3. I checked `origin/main` for all five
consumer repos:

- **No repo in the suite imports `tailwind-preset`.** The only matches are changelog
  entries, backlog items and archived Claude transcripts — no source file, no config.
- **No repo has a `tailwind.config.*` file at all.**
- **VTS has [ADR-VTS-0005 "Token-first CSS architecture — remove Tailwind"](../../../../voicetoneandstyle/docs/adr/adr-vts-0005-token-first-css-architecture-remove-tailwind.md),
  status Accepted, dated 2026-04-16.** Its `^3.4.17` entry is a leftover dependency, not a
  live consumer. VTS consumes this package's *CSS layers*, which the preset does not touch.

So the "real consumer-facing change" that (b) was protecting against has no consumers, and
the Tailwind 3/4 ordering constraint does not gate this file. (b)'s only remaining argument
was risk avoidance; with the risk gone, it is just the less honest fix. Take (a).

**2. Does the type-check cover `brand/`? Yes, and it's free — this question is answered.**
The plan deferred this as an unknown error count. I ran it: `include: ["src", "brand"]`
(with `resolveJsonModule` for `brands.json`) produces **the same two errors and no others**.
`brand/` is a single `index.ts`. There is no reason to defer it — widen `include` in this
PR and the shipped-but-unchecked export stops being unchecked.

Note the `rootDir`/`outDir` interaction: `tsconfig.json` sets `rootDir: "src"`, so adding
`brand` needs that relaxed. Since nothing here emits — the package ships raw TypeScript —
a `tsconfig` with `noEmit` and no `rootDir` is the honest shape for a check-only config.

---

## What I'd build

One workflow, `.github/workflows/checks.yml`. Items 1–3 from the handoff plus the
version-vs-tag guard, as it suggested.

```yaml
name: Checks

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

# Copied from CHC's ci.yml — supersede an in-flight run when a branch is pushed again.
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  checks:
    name: Design system integrity
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0        # the tag guard needs history, not a shallow clone
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: npm
      - run: npm ci

      # Fails when someone hand-edits inside skills/contentious-design/, which the
      # next export destroys wholesale. Currently invisible until that happens.
      - run: npm run check:design-sync

      # Note: the emit check inside this skips without built CSS. The transition
      # check — the one that caught the v0.9.2 Switch bug — does run.
      - run: npm run check:utilities

      # tailwind4.css is generated and committed. A stale bridge reaches every
      # product silently.
      - run: npm run generate:tailwind4
      - run: git diff --exit-code src/styles/tailwind4.css

      # `npx tsc` resolves an unrelated registry package — typescript must be a
      # pinned devDependency, and this must run the local binary.
      - run: npm run check:types

      - name: package.json version has a matching tag
        if: github.event_name == 'push'
        run: |
          V=$(node -p "require('./package.json').version")
          git rev-parse "v$V" >/dev/null 2>&1 || {
            echo "package.json is $V but there is no v$V tag."
            echo "Consumers pin by tag, so this version reaches nobody until it is tagged."
            exit 1
          }
```

Four changes from the handoff's draft:

- **`concurrency`**, lifted from CHC's `ci.yml`.

- **`npm run check:types` rather than `npx tsc --noEmit`.** The handoff's line silently runs
  a package that isn't TypeScript. A `check:types` script invoking the local pinned binary
  is both reproducible and consistent with how the other three checks are already exposed.
  This also matches CHC, which runs `npm run check`, not a bare `npx`.

- **`fetch-depth: 0`** on checkout. The handoff's guard calls `git fetch --tags`, but
  `actions/checkout` defaults to a depth-1 clone; full history is the reliable way to have
  the tags present. Without this the guard is unreliable in a way that only shows up as a
  confusing red build.
- **`if: github.event_name == 'push'`** on the guard, rather than a separate workflow. Same
  effect the handoff wanted — PRs legitimately run ahead of the tag — in one file.

The version guard passes today: `package.json` is `0.9.3` and `v0.9.3` is tagged.

---

---

## How this relates to ADR-UI-0005 (shipping JavaScript to consumers)

[ADR-UI-0005](../adr/adr-ui-0005-shipping-javascript-to-consumers.md) is Proposed and undecided, and
this PR should **not** pre-empt it. But the two touch in three places, and one of them
changes a choice above.

**1. This PR is a prerequisite for options A, B and D — not a competitor to them.** Every
option except C ("consumers transpile") requires this package to build. A build requires a
compiler in `devDependencies` and a type-check that is actually green. Right now the repo
has neither: no `typescript`, and two errors when one is supplied. Whatever ADR-UI-0005
decides, that work starts by doing what this PR does. Adding a pinned `typescript` is
therefore not scope creep — it is the first step of the build surface ADR-UI-0005 is weighing,
paid early and cheaply.

**2. It strengthens the case for (a) over (b) on the `require()` errors.** Options A and D
compile `src/` with `tsup` or `tsc`. Two `require()` calls in a `"type": "module"` package
are a genuine emit hazard under an ESM/CJS dual build, not merely a lint. `@types/node`
alone (option b) leaves that hazard in place and hides the signal; converting to top-level
imports (option a) removes it. Since no consumer imports `tailwind-preset` at all, this is
close to free now and awkward later, once a build depends on it.

**3. It sharpens question 2 — `brand/` should be in the type-check.** ADR-UI-0005 option D
ships "the pure, dependency-free modules (`lib/colors.ts`, `types/`) as compiled JS". Those
are precisely the shipped-but-unchecked exports. `brand/` sits in the same category, adds
zero errors today, and would have to be checked before it could be compiled. Including it
now costs nothing and removes one obstacle from D's path.

**What this PR still must not do:** decide the packaging question. No `dist/`, no `tsup`, no
`exports` change, no `prepare` hook. `check:types` with `noEmit` is deliberately the
*non-committal* form — it makes the code compilable without deciding whether, or how, it
gets compiled. If ADR-UI-0005 later lands on C, nothing here is wasted; a green type-check is
worth having regardless.

One thing worth noting for ADR-UI-0005 rather than acting on here: `check:utilities` runs in
its degraded half-mode because there is no build. If A or D lands, that check gets its CSS
emit half back for free. Another small argument for a build, to add to that ADR's ledger —
not a reason to build one now.

---

## Steps

1. **Decide question 1.** (a)/(b)/(c) on the type errors — I now recommend **(a)**.
   Question 2 (`brand/`) is answered: include it, it costs nothing.
2. Add a pinned `typescript` to `devDependencies` and a `check:types` script. Required by
   every option, including (c) if the type-check ever lands later.
3. Widen the type-check to `brand/`: `include: ["src", "brand"]`, `noEmit: true`,
   `resolveJsonModule: true`, drop `rootDir`/`outDir` (nothing emits today).
4. Apply the type fix; confirm `npm run check:types` is green locally.
5. Add `.github/workflows/checks.yml`.
4. Push to a branch, open a PR, watch it run. First run is the real test — everything above
   is local verification.
5. `CHANGELOG.md` under `[Unreleased] → Added`, per the workflow table in `CLAUDE.md`.
6. An ADR. The "no test runner, no linter" reasoning is worth recording — it is a
   deliberate divergence from CHC, which runs 811 tests and lints, and the reasoning for
   why a design-system package differs should outlive the handoff note.
   `docs/adr/0006-*.md`, plus the index in `docs/adr/README.md`.

## Separately, not in this PR

- **Tag protection** on `v*` — Settings → Rules → Rulesets, restrict updates and deletions.
  Two minutes in the UI, and the handoff is right that this is the one failure mode with no
  safety net. CHC additionally has `release-pr.yml` and `release-tag.yml` automating the
  release path; if tag discipline here keeps costing version bumps, that's the precedent to
  copy next rather than something to design fresh.
- **The five repos behind on versions**, and the Tailwind 3 → 4 ordering constraint for VTS.
  A bump-cadence conversation, correctly scoped out of CI.
- **`brand/` type coverage**, if you want it.
- **A build step** to feed `check:utilities` its CSS emit check, if that check is worth
  having in full.

## What I agree with and won't revisit

No test runner, no linter. Both arguments in the handoff are sound — standalone `.mjs`
scripts that exit non-zero are a coherent test strategy, and introducing ESLint to a design
system means a large opinionated diff for no known defect.

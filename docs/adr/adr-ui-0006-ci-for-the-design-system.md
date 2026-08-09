# ADR-UI-0006: CI for the design system

**Status:** Accepted
**Date:** 2026-08-03

## Context

This package had **four runnable checks and nothing that ran them**. It ships raw
TypeScript, a React component layer three products render, and `scripts/check-utilities.mjs`
which the whole suite executes. All of it was verified only by someone remembering to run
commands by hand.

Two things went wrong in the v0.9.2 session that made this concrete: a grammar bug shipped
in the utilities script's output and was only noticed after tagging — needing v0.9.3,
because a published tag cannot be moved — and an attempt to move the v0.9.2 tag was blocked
in Content Health Check by a hook this repo does not have.

Neither was catastrophic. Both are what a thirty-second check prevents.

## Decision

**One workflow, `.github/workflows/checks.yml`, running the checks that already exist plus
a type-check and a version-vs-tag guard.** Deliberately smaller than CHC's `ci.yml`.

Six steps: `check:design-sync`, `check:utilities`, regenerate `tailwind4.css` and diff it,
`check:types`, and on pushes only, assert `package.json`'s version has a matching tag.

### What we found while enabling the type-check

The type-check could not simply be switched on, and the reasons are worth recording.

**`npx tsc --noEmit` never ran TypeScript.** `typescript` was not a dependency of this
repo. `npx` silently fetched an unrelated package of the same name from the registry, which
prints a banner and exits non-zero. An earlier draft of this work recorded its output as a
genuine type error. The compiler is now a pinned devDependency (`5.9.3`, exact) and the
check runs via `npm run check:types`, which invokes the local binary. **CI should never
invoke a compiler through `npx`** — it resolves whatever the registry offers that day.

**The two real errors were `require()` in an ESM package.** `src/tailwind-preset.ts` called
`require()` for its two Tailwind plugins in a `"type": "module"` package with no
`@types/node`. Two options existed: add `@types/node` so `require` is merely declared, or
convert to top-level imports.

We converted (see Consequences for why). The plugins were verified to resolve and be
defined at runtime after transpilation, not just to satisfy the type-checker.

**The type-check now covers `brand/`.** `tsconfig.json` included only `src`, while
`package.json` exports `./brand` and `./brand/*` — shipped public API, unchecked. Adding it
surfaced zero new errors. `rootDir`/`outDir`/`declaration` were dropped in favour of
`noEmit`, which is the honest description of a config that checks but never builds.

## Options considered

**A test runner.** Rejected. There are no unit tests, and the checks are standalone `.mjs`
scripts that exit non-zero — a coherent test strategy on its own. Wrapping four `node`
invocations in Vitest is ceremony.

**A linter.** Rejected. No ESLint config exists. Introducing one to a design system means a
large opinionated diff for no known defect. This is a deliberate divergence from CHC, which
lints and runs 811 tests, and the difference is one of kind: CHC is an application with
business logic; this is a token and component library whose correctness is mostly CSS.

**`suite:versions` in CI.** Rejected as unworkable, not merely undesirable. It reads sibling
repositories via `resolve(ROOT, '../..')`; a CI checkout has no siblings. It stays a local
tool.

**`@types/node` instead of converting `require()`.** Rejected — see below.

## Consequences

**The `require()` conversion is lower-risk than it first appeared.** The case for the
`@types/node` patch was that `tailwind-preset.ts` is consumed by every product's Tailwind
config, and Voice Tone & Style is still on Tailwind 3. Checking `origin/main` across all
five consumer repositories found that **no repository imports `tailwind-preset`**, and none
has a `tailwind.config.*` file at all. VTS has
[ADR-VTS-0005 "Token-first CSS architecture — remove Tailwind"](https://github.com/contentiousltd/voicetoneandstyle),
Accepted 2026-04-16; its Tailwind 3 entry is a leftover dependency, not a live consumer. The
consumer-facing risk that argued for the patch does not currently exist.

**This is a prerequisite for [ADR-UI-0005](adr-ui-0005-shipping-javascript-to-consumers.md), not a
competitor to it.** Every option in that ADR except "consumers transpile" requires this
package to compile. That requires a compiler in `devDependencies` and a green type-check —
exactly what this ADR installs. The `require()` conversion matters more there than here:
two `require()` calls in an ESM package are a genuine emit hazard under a dual ESM/CJS
build, not merely a lint.

Nothing here decides the packaging question. There is no `dist/`, no `tsup`, no `exports`
change and no `prepare` hook. `noEmit` is deliberately the non-committal form: the code
becomes compilable without any decision about whether it gets compiled.

**`check:utilities` runs at half strength.** Its CSS emit half needs built CSS and skips
without it; the transition half — which caught the v0.9.2 `Switch` bug — runs. If ADR-UI-0005
introduces a build, that half returns for free. That is a small argument for a build, to be
weighed there rather than here.

**Tag protection is still missing.** Products pin by tag, so a moved tag changes what a
consumer resolves without their version string changing. This is the one failure mode with
no safety net, and it is a repository settings change (Settings → Rules → Rulesets),
not something CI can enforce. The version-vs-tag guard catches the adjacent mistake —
merging a release commit and forgetting to tag — but not a moved tag.

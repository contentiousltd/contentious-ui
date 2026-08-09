# Handoff: ADR-UI-0005, shipping JavaScript to consumers

For a new thread picking up [ADR-UI-0005](../adr/adr-ui-0005-shipping-javascript-to-consumers.md),
which is **Proposed and undecided**. Written 2026-08-03, immediately after the CI work
([ADR-UI-0006](../adr/adr-ui-0006-ci-for-the-design-system.md)) merged as
[PR #2](https://github.com/contentiousltd/contentious-ui/pull/2).

Read ADR-UI-0005 itself first — it states the problem and the four options well, and this
note does not restate them. What follows is what changed underneath it, what I verified,
and two corrections it needs.

---

## What the CI work changed for you

**The blocker ADR-UI-0005 didn't know it had is gone.** Before PR #2 this package could not be
compiled at all:

- `typescript` was not a dependency. `npx tsc` silently resolved an unrelated package of
  the same name from the registry, printed a banner and exited non-zero. Any earlier claim
  about this repo's type errors, in any document, was produced by that non-compiler.
- The only two real errors were `require()` calls in `src/tailwind-preset.ts` — undeclared
  in a `"type": "module"` package.

Both are now fixed. `npm run check:types` runs a pinned `typescript@5.9.3` and is green, on
CI as well as locally. **Options A, B and D all needed this done first**, so that step is no
longer part of their cost.

**`tsconfig.json` is deliberately non-committal.** It is now `noEmit`, with
`rootDir`/`outDir`/`declaration` removed, and `include: ["src", "brand"]`. This says "check
this code" without saying "build it this way". Whoever implements A, B or D will need to
reintroduce emit settings — that is expected, not an oversight, and the shape was left
open on purpose so ADR-UI-0005 could choose it.

**`brand/` is now type-checked.** It is shipped via the `./brand` and `./brand/*` exports
and was previously unchecked. This matters for option D, which ships "pure, dependency-free
modules" — `brand/` is in exactly that category and is now known to be clean.

---

## Two corrections to ADR-UI-0005

**1. `f56566a6` is not in this repository.** ADR-UI-0005 says the old tsup config is
"recoverable from `f56566a6^`". That commit does not exist here, and `tsup.config.ts` has
never existed in this repo's history. It is in **Content Health Check**, from when the
library was vendored inside it:

```
git -C ~/Projects/contenthealthcheck show f56566a6^:contentious-ui/tsup.config.ts
```

Verified retrievable. It is `format: ['esm','cjs']`, `dts: true`, `sourcemap`, `clean`,
externals derived from `peerDependencies` + `dependencies`, `keepNames`, entry
`src/index.ts` only. Note that last point: **a single entry, so the current `exports` map's
subpaths (`./lib/colors`, `./types/design-tokens`, `./brand`) were not built by it.** That
config is a starting point, not a drop-in.

**2. The Tailwind 3 constraint is weaker than the suite documents suggest.** Several
documents — the CI handoff, the v0.9.2 changelog entry — warn that VTS is on Tailwind 3 and
must migrate before bumping. I checked `origin/main` for all five consumer repos:

- **No repository imports `@contentious/ui/tailwind-preset`.** The only matches anywhere are
  changelog entries, backlog items and archived Claude transcripts.
- **No repository has a `tailwind.config.*` file at all.**
- VTS has **ADR-VTS-0005, "Token-first CSS architecture — remove Tailwind"**, Accepted
  2026-04-16. Its `tailwindcss ^3.4.17` entry is a leftover dependency, not a live consumer.

This does not make the Switch/Tailwind-4 warning wrong for CSS. It does mean the *preset*
is not the coupling point anyone assumed, and it should not be treated as a constraint on
the packaging decision.

---

## What I verified for you, so you needn't re-derive it

**The three copies of the banding rule are real and still present:**

| Where | File |
|---|---|
| Library | `src/lib/colors.ts` — `scoreToStars`, `getScoreColour`, `getScoreColourFromPercent` |
| CHC | `shared/scoring.ts`, plus `shared/__tests__/no-local-score-bands.test.ts` |
| CM | `client/src/lib/maturity-bands.ts`, plus its own test |

Note CHC has a test literally named `no-local-score-bands` — it is policing locally the
exact duplication ADR-UI-0005 wants to remove globally.

**Consumer pins today** (from each repo's `origin/main`):

| Repo | `@contentious/ui` | Tailwind |
|---|---|---|
| contenthealthcheck | `#v0.9.3` ✓ | `^4.3.3` |
| contentmaturity | `#v0.8.2` | `^4.3.3` |
| voicetoneandstyle | `#v0.7.0` | `^3.4.17` (leftover; ADR says remove) |
| maturitytool | `#v0.7.0` | none |
| content-layer | no package.json | — |

**This package is `"private": true`** with no `publishConfig`, `main`, `module`, `types` or
`files` field. Option B (registry) needs more `package.json` work than A or D.

---

## Things worth weighing that ADR-UI-0005 doesn't mention

- **`check:utilities` runs at half strength because there is no build.** Its CSS emit half
  skips without built CSS; only the transition half runs, on CI as well as locally. Options
  A and D restore the other half for free. A small argument for a build, on top of the
  duplication argument.
- **`exports` has ten entries, four of them CSS/asset subpaths.** Whatever is chosen must
  keep `./styles/*`, `./skills/*` and `./fonts/*` pointing at source; only the JS entries
  move. Option D's "two rules for one package" objection is softer than it sounds, because
  the package already has two rules — JS and assets are already treated differently.
- **The CI workflow will need a step if a build lands.** `.github/workflows/checks.yml`
  currently has no build step by design. If `dist/` becomes committed, it needs the same
  generate-and-diff treatment `tailwind4.css` has, or it will go stale silently — the exact
  failure mode that check exists to prevent.
- **`npm ci` reports 2 high-severity transitive vulnerabilities** (`picomatch`, `postcss`,
  via the two Tailwind plugins). Pre-existing, untouched by the CI work, and `npm audit fix`
  claims to resolve both. Unrelated to ADR-UI-0005 but you will see it in every CI log.

---

## Suggested starting point

ADR-UI-0005's own test is the right one and is unchanged:

> Can CHC's server, built with esbuild `--packages=external`, import `scoreToStars` and run?

Option **D** still looks like the cheaper first move, for the reason the ADR gives — it
targets the duplication actually observed three times without committing the suite to a
component build. Nothing found during the CI work argues against that; the removal of the
`require()` calls and the type-check over `brand/` both make D slightly cheaper than it was.

The one thing I would not do is treat the old tsup config as a template without reading it
first. Single-entry, and this package's `exports` map has since grown subpaths that matter.

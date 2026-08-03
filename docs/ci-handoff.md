# Handoff: CI for `contentious-ui`

The repo has **four runnable checks and nothing that runs them**. It also now ships an
executable script (`scripts/check-utilities.mjs`) to every product in the suite, and a
React component layer that three products render. Nothing verifies any of it on push.

This is a small job — one workflow file, maybe 40 lines — but the *choice of what to
check* is the part worth thinking about, so that's most of what's below.

---

## What made this urgent

`v0.9.2` shipped a fix to `src/components/ui/switch.tsx` and a new script. The only thing
that verified either was me running commands by hand. Two things went wrong in that
session that CI would have caught or prevented:

1. I shipped a grammar bug in the script's output (`"1 class emit no CSS"`) and only
   noticed after tagging. That needed a `v0.9.3` because a published tag can't be moved.
2. I *tried* to move the `v0.9.2` tag, and CHC's safety hook blocked the force-push.
   `contentious-ui` has no such hook.

Neither is catastrophic. Both are the kind of thing a 30-second check prevents.

---

## What to check, in priority order

### 1. The checks that already exist (highest value, zero design work)

```yaml
- run: npm run check:design-sync
- run: npm run check:utilities
```

Both pass today. `check:design-sync` is the important one: it fails when someone
hand-edits inside `skills/contentious-design/`, which is **destroyed by the next export**.
That failure is currently invisible until an export silently eats the edit.

### 2. The generated file is in sync

`scripts/generate-tailwind4.mjs` produces `src/styles/tailwind4.css`, which is committed.
If someone edits the generator and forgets to regenerate — or edits the output by hand —
consumers get a stale bridge and no one finds out.

```yaml
- run: npm run generate:tailwind4
- run: git diff --exit-code src/styles/tailwind4.css
```

Verified in sync as of v0.9.3. This is the check I'd add first after the two above,
because the failure is silent and reaches every product.

### 3. The package resolves as a git dependency

Products install this via `github:contentiousltd/contentious-ui#vX.Y.Z`, **not** from a
registry, and it ships **raw TypeScript** with no build step. So the thing to verify is
that a consumer can actually import it — which is not the same as it type-checking here.

Cheapest useful version:

```yaml
- run: node --input-type=module -e "import('./src/lib/colors.ts').catch(() => process.exit(0))"
```

...except that fails by design, because Node can't execute `.ts`. **That's the real
finding**: CHC hit exactly this when its server bundle tried to import
`@contentious/ui/lib/colors` and Node choked on the `.ts` extension — which is why
`shared/scoring.ts` in CHC is a copy of the library's banding rule rather than an import.

So the honest check here is a **type-check with the exports resolving**, not a runtime
import:

```yaml
- run: npx tsc --noEmit
```

`tsconfig.json` exists. Worth confirming it actually covers `src/` before relying on it.

### 4. Deliberately *not* in CI: `suite:versions`

It reads sibling repos from the local filesystem (`resolve(ROOT, '../..')`), so in a CI
checkout there are no siblings and it can't work. **Leave it as a local tool.**

Worth knowing what it says today, because it's a real finding:

```
voicetoneandstyle     #v0.7.0   behind latest (0.9.3)
contentmaturity       #v0.8.2   behind latest (0.9.3)
contenthealthcheck    #v0.9.3   ✓
maturitytool          #v0.7.0   behind latest (0.9.3)
contentious-astro     #v0.7.0   behind latest (0.9.3)
auth-contentious-ltd  #v0.7.0   behind latest (0.9.3)
```

Five repos behind, four of them by two minor versions. That's a separate conversation
about bump cadence, not a CI job — but note that **VTS, maturitytool, contentious-astro
and auth-contentious-ltd are all on v0.7.0**, which predates the accent decision, the
radius ramp, the score bands and the `Switch` fix.

⚠️ **VTS is on Tailwind 3.** The `Switch` fix in v0.9.3 (`transition-[translate]`) is
*correct for Tailwind 4 and wrong for Tailwind 3*. Any repo still on v3 should move to
Tailwind 4 **before** bumping past v0.9.2, or its switch breaks. That ordering constraint
belongs in the migration notes.

---

## What I'd actually write

One workflow, mirroring CHC's shape but much smaller:

```yaml
name: Checks

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  checks:
    name: Design system integrity
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: npm
      - run: npm ci

      # Fails when someone hand-edits inside skills/contentious-design/, which the
      # next export destroys wholesale. Currently invisible until that happens.
      - run: npm run check:design-sync

      # The library's own components, checked with the script it ships to products.
      - run: npm run check:utilities

      # tailwind4.css is generated and committed. A stale bridge reaches every
      # product silently.
      - run: npm run generate:tailwind4
      - run: git diff --exit-code src/styles/tailwind4.css

      - run: npx tsc --noEmit
```

**Check `npm ci` works first.** There's no lockfile-dependent build here and devDeps are
only `@types/react` / `@types/react-dom`, so it should be quick — but if there's no
`package-lock.json`, use `npm install` and note why.

---

## Two things I'd add but wouldn't block on

**A tag-protection rule** on `v*`, in GitHub's repo settings rather than in CI. Products
pin by tag, so a moved tag changes what a consumer resolves *without their version string
changing*. This is the one failure mode in this repo with no local safety net — CHC has a
hook, this doesn't. Settings → Rules → Rulesets → tag ruleset, restrict updates and
deletions.

**A version-vs-tag guard.** `package.json`'s `version` and the newest tag should agree.
Cheap to check, and catches "merged a release commit but forgot to tag", which is exactly
the state this repo was in before v0.9.2 — `main` was ahead of the newest tag and the
`Switch` fix was reaching nobody.

```yaml
- name: package.json version has a matching tag
  run: |
    V=$(node -p "require('./package.json').version")
    git fetch --tags --quiet
    git rev-parse "v$V" >/dev/null 2>&1 || {
      echo "package.json is $V but there is no v$V tag."
      echo "Consumers pin by tag, so this version reaches nobody until it is tagged."
      exit 1
    }
```

Run it on `push: main` only, not on PRs — on a PR the version is legitimately ahead of the
tag.

---

## What I'd leave alone

**Don't add a test runner.** There are no tests and the repo's checks are all standalone
`.mjs` scripts, which is a coherent choice — a script that exits non-zero is a fine test.
Adding Vitest to run four `node` invocations would be ceremony.

**Don't lint.** No ESLint config exists, and introducing one across a design-system
repo means a lot of opinions and a large first diff for no defect found.

---

## Suggested scope

One PR, one workflow file. Items 1–3 plus the version-vs-tag guard. Tag protection is a
settings change, not code, so it's separate and takes two minutes in the UI.

Expected to pass on first run: all four checks pass locally as of `v0.9.3`.

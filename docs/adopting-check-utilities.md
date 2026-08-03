# Handoff for Content Maturity: adopt `check:utilities`

**Do this after `feat/cm-141-design-system-adoption` lands.** Not before — see
"Why after" below.

---

## The one-line version

CM has **three live animation bugs** that nobody has noticed because the failure is
silent. `@contentious/ui` v0.9.3 ships a check that finds them. Adopt the check, don't
copy it.

---

## What's broken right now

Tailwind 4 moved the transform utilities onto the standalone CSS properties:

| Utility | Tailwind 3 | Tailwind 4 |
|---|---|---|
| `.translate-x-full` | `transform: translateX(100%)` | `translate: …` |
| `.rotate-180` | `transform: rotate(180deg)` | `rotate: 180deg` |
| `.scale-105` | `transform: scale(1.05)` | `scale: …` |

So `transition-transform` animates a property nothing changes, and the element jumps
straight to its end state. CM is on Tailwind 4 (`^4.3.3`), so this is live:

| File | What's wrong |
|---|---|
| `client/src/components/ui/accordion.tsx:35` | Chevron snaps round instead of turning |
| `client/src/components/ui/switch.tsx:20` | Thumb jumps between positions instead of sliding |
| `client/src/pages/home.tsx:289` | Hero image doesn't grow on hover |
| `client/src/components/ui/sidebar.tsx` ×2 | Same, but check whether anything imports it first — in CHC it was unreferenced scaffolding and got baselined rather than fixed |

**The fix is per-site: name the property that actually changes.**

```diff
- <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
+ <ChevronDown className="h-4 w-4 shrink-0 transition-[rotate] duration-200" />

- "… ring-0 transition-transform data-[state=checked]:translate-x-5 …"
+ "… ring-0 transition-[translate] data-[state=checked]:translate-x-5 …"

- className="w-full max-w-4xl transform hover:scale-105 transition-transform duration-300"
+ className="w-full max-w-4xl hover:scale-105 transition-[scale] duration-300"
```

Note the third also drops a now-pointless bare `transform` class.

**`switch.tsx` may not need fixing at all** — if CM imports `Switch` from
`@contentious/ui` rather than keeping a local copy, v0.9.3 already fixes it upstream.
Check which it is; if it's a local copy, that's worth a separate question about why.

---

## The adoption

### 1. Bump

```bash
npm install "github:contentiousltd/contentious-ui#v0.9.3" --save
```

CM is currently on **v0.8.2**, so this is a three-version jump. **Read
`contentious-ui`'s CHANGELOG for 0.9.0 → 0.9.3 before merging** — 0.9.0 changed
`scoreToStars` to nearest-whole-star bands (90/70/50/30, replacing equal fifths), which
directly concerns `cm-144`.

### 2. Script

```json
"check:utilities": "node node_modules/@contentious/ui/scripts/check-utilities.mjs --src client/src --css dist/public/assets"
```

Adjust `--css` to wherever CM's build writes its stylesheet.

### 3. CI — after the build, in `checks.yml`

In the `typecheck-test-build` job, **after `npm run build`**:

```yaml
      - run: npm run build
      # After the build on purpose: half of this compares the classes the source
      # uses against the stylesheet the build actually produced.
      - run: npm run check:utilities
```

Ordering is load-bearing. Run it before the build and the emit half has nothing to check
against — it skips, says so, and passes.

### 4. `check-utilities.json`, if needed

```json
{
  "notUtilities": ["your-css-module-class"],
  "baseline":     ["known-dead-class"]
}
```

Keep the distinction honest: `notUtilities` means *this was never Tailwind's to emit*
(CSS Module names, SVG ids, hand-written classes). `baseline` means *this is a real defect
I'm not fixing today* — may shrink, must never grow, and each entry wants its reason
written down.

A file path in either list exempts that whole file, which is how to handle vendored or
unreferenced scaffolding.

Run with no config first and see what it says — CHC needed about a dozen `notUtilities`
entries and exactly one `baseline`.

---

## Why after the design-system branch

`feat/cm-141-design-system-adoption` has 14 unmerged commits, and `cm-144` in it is about
score bands. `v0.9.0` changed the banding rule. Bumping the library version mid-branch
means resolving a design change and a dependency change in the same merge, which is how
you get a confusing conflict in the one area both are touching. Land the branch, then
adopt on a clean base.

---

## Why adopt rather than copy

The check exists because four copies of a banding rule drifted apart in CHC and produced
five different answers to the same question. Three copies of a check that guards against
Tailwind renames would be the same shape: the next rename updates one repo, and the other
two keep passing while being wrong.

One copy in `contentious-ui`, three consumers. Fixing it fixes everyone.

---

## What it also catches

Not just transitions. The other half compares every utility class the source uses against
the built stylesheet, and fails on any that emit nothing. In CHC that found the scrim
behind the admin dialog had **no background at all** — `bg-overlay/50`, where `--overlay`
is a plain `:root` variable rather than a `@theme` colour, so no opacity modifier was ever
generated. A modal was floating over a fully lit page.

That half needs the build, which is why the CI ordering matters.

---

## Reference

- `contentious-ui/docs/checking-utilities.md` — flags, config, what it deliberately
  doesn't do
- `contentious-ui` v0.9.3 — the script and the `Switch` fix
- CHC PR #106 — the same adoption, as a worked example
- CHC PR #104 — the original diagnosis, with the property table

Suggested id: **cm-146** (last in `BACKLOG.md` is cm-145 — re-check with
`npm run backlog:next` before claiming, since branch names hold ids too).

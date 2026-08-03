# Checking that utility classes actually do something

`scripts/check-utilities.mjs`, run as `npm run check:utilities`.

Two failures, one shape: **the class name is still in the markup, nothing errors, and the
style is simply absent.** Neither shows up in a build log, a type check, or a test that
renders the component — because the component renders fine. It just isn't styled.

That is what makes this worth a check rather than a code review. Everything reviewable
about these looks correct.

---

## What it catches

### 1. The class emits nothing

Either the utility was removed in a Tailwind major, or the token behind it is a plain
`:root` variable rather than a `@theme` colour, so no modifier can be generated for it.

```
bg-overlay/50        --overlay is :root, not @theme → no rule, transparent scrim
border-opacity-50    removed outright in Tailwind 4
```

### 2. The class emits, and animates the wrong property

Tailwind 4 moved the transform utilities onto the **standalone CSS properties**:

| Utility | Tailwind 3 | Tailwind 4 |
|---|---|---|
| `.translate-x-full` | `transform: translateX(100%)` | `translate: …` |
| `.rotate-180` | `transform: rotate(180deg)` | `rotate: 180deg` |
| `.scale-105` | `transform: scale(1.05)` | `scale: …` |

So `transition-transform` animates a property nothing changes, and the element jumps
straight to its end state. Name what actually moves instead: `transition-[translate]`,
`transition-[rotate]`, `transition-[scale]`.

---

## Why this is here and not in a product

Content Health Check hit both on **1 August 2026**, the day of its Tailwind 4 cutover:

- The mobile navigation panel stopped sliding and simply appeared.
- The scrim behind the admin dialog had **no background at all**, so a modal floated over
  a fully lit page.

Neither was caught by CI, a type check, or 811 passing tests. Both were found by someone
looking at the app on a phone.

At the time of writing, **Content Maturity is on Tailwind 4 with three unfixed
`transition-transform` sites** — the accordion chevron, the switch thumb, and a hero image
on its home page — and nobody has noticed, because the failure is silent. **Voice Tone &
Style is still on Tailwind 3** and inherits the same problem the day it upgrades.

One bug, three repos, on nobody's schedule. Copying a check into each is how four
copies of a rule drift apart; this way there is one, and fixing it fixes everyone.

---

## Using it in a product repo

```bash
node node_modules/@contentious/ui/scripts/check-utilities.mjs \
  --src client/src --css dist/public/assets
```

Add it as a script, and run it in CI **after the build** so the emit half has a stylesheet
to check against:

```json
"check:utilities": "node node_modules/@contentious/ui/scripts/check-utilities.mjs --src client/src --css dist/public/assets"
```

| Flag | Default | Notes |
|---|---|---|
| `--src` | `client/src` | Walks `.tsx` / `.jsx`, skipping `node_modules`, `__tests__`, `dist` |
| `--css` | *(none)* | Directory of built CSS. **Without it the emit check is skipped**, and the script says so rather than passing quietly |
| `--config` | `check-utilities.json` | Per-repo allowances |

Exit codes: `0` clean, `1` findings, `2` misconfigured (bad `--src`, unparseable config).

### Allowances

```json
{
  "notUtilities": ["hero-content", "cls-1"],
  "baseline":     ["text-gloaming-medium"]
}
```

The distinction is the point, and it is worth keeping honest:

- **`notUtilities`** — *this was never Tailwind's to emit.* CSS Module class names, SVG
  ids, your own hand-written classes.
- **`baseline`** — *this is a real defect I am not fixing today.* **May shrink, must never
  grow.** Record the reason in the repo that adds it.

A file path in either list exempts that whole file, which is how to handle vendored or
unreferenced scaffolding.

---

## What it deliberately does not do

It checks **existence and property**, not correctness. A class that emits the right
property with the wrong *value* is a design-system question, and belongs in the product's
own token check — CHC's `design-tokens.test.ts` is the reference implementation.

The class scan is text-based, so a class assembled at runtime
(`` `bg-star-${level}` ``) is invisible to it. That is not a gap to close: Tailwind's own
scanner is text-based for the same reason, so a dynamic class name doesn't emit either.
If the check can't see it, Tailwind couldn't either — write the literals out.

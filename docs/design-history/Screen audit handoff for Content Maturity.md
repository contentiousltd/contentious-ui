# Running a screen audit: handoff from Content Health Check

**For Claude Code in Content Maturity.** CHC ran a component-vocabulary audit on 1 August 2026
(chc-387) and it was worth the day it took. This is the method, the traps, and the findings that
are almost certainly true in CM too, written so you can skip the parts we got wrong.

The audit's own record is `contenthealthcheck/docs/plans/component-vocabulary-audit.md`. The
decisions it produced are `provenance/States decision 2026-08-01.html` and
`provenance/Adoption items 8-11 decision 2026-08-01.html` in the design project, both applied in
`@contentious/ui` v0.8.0.

---

## What makes this different from the token audit

The July suite audit was a **token-and-layer** audit: name collisions, wrong values, files not
reaching consumers. This is a **screen** audit: whether the app's actual surfaces use the settled
vocabulary. They find different things. The token audit found `--warning-text` failing AA; the
screen audit found four different focus treatments, a card fighting its own border in 24 places,
and a link that took a full second to grow a fire bar.

Most of what it found was **states** – hover, focus, motion, borders. Structure was largely fine.
That is probably the shape in CM too: nobody argues about which component to use, and everybody
quietly invents a hover.

## Do this first, or half your findings need redoing

**Get `!important` out of the way before you start.** CHC ran `index.css` down from ~100
`!important` to 3 (chc-369) *before* the audit, deliberately. With them in place you cannot answer
"which rule is winning" for anything inside a dialog or an editor, so every state finding is
provisional. If CM's stylesheet still has a pile of them, that is the first job, not this one.

The single highest-value move there was one line: declare a `vendor` cascade layer *below* the
design system's order and import third-party CSS into it. That removed ~50 `!important` without
changing a value, because the problem was never specificity, it was import order.

## The method

Six passes. Each one is a grep and a question, not a read-through.

1. **Buttons.** Grep every `<Button` with a `className` containing a colour. Every one is a
   candidate: an override that restates the variant is how variants drift.
2. **Containers.** Count `<Card` and `<Panel`. Then count how many call sites pass `border-0`,
   `shadow-*` or a padding override. **A default that many call sites fight is the defect.**
3. **Hover, focus, press.** Grep `hover:bg-`, `focus-visible:`, `ring-`, `outline-`. Tabulate the
   distinct treatments. If there is more than one, the system has one and you have found it.
4. **Borders and radii.** Grep `rounded-`, tally by step, and check the tally against the ramp.
5. **Motion.** Grep `transition-`, `duration-`. Check what the *default* duration is, not just
   the explicit ones.
6. **The negative check.** Grep for what should be absent: `bg-gradient`, `blur`, Tailwind default
   palette names, `!important`, `rounded-full` on anything that is a label.

Then split every finding into **the system answers this** (fix it) and **it doesn't** (Gaps, and a
brief for Claude Design). Do not let the second bucket leak into the first. Half the value of the
audit was the questions, and they only got answered because they were asked as questions.

---

## The three traps we fell into

These cost real time. They are the reason this document exists.

### 1. Check the built CSS, not the source

The audit reported "the accent codemod landed cleanly" because `bg-accent` and
`text-accent-foreground` were gone from the source. They were. But the *replacement*,
`text-on-hover`, **emits no rule at all** – the bridge publishes the token as
`--color-text-on-hover`, so the class is `text-text-on-hover`. Twenty-four dead classes across
eight components, and CM found it, not us.

**A class that emits no rule is invisible.** It doesn't throw, it doesn't warn, it reads fine, and
in the browser it looks exactly like a decision not to change that colour. So:

> Verifying a codemod means grepping the compiled stylesheet for the class you added, not the
> source for the class you removed.

CHC now has `client/src/data/__tests__/themed-utilities.test.ts`, which asserts every utility
naming a semantic token names one the bridge actually publishes. It reads the bridge rather than a
build, so it needs no `dist` and runs in 9ms. **Port it.** It is about 100 lines and it would have
caught all 24 on the first build.

### 2. A new check that passes proves nothing

When you write that test, **verify it against the real defect before trusting it.** We put one
`text-on-hover` back and confirmed the test failed with the file named. A check written from a
fixed codebase will happily pass forever while testing nothing.

### 3. Assert the computed style, not the appearance

Two separate motion bugs shipped looking correct. A link underline "animated" at 350ms and
actually snapped, because `text-decoration-line` is not interpolable and starting it at `none`
leaves the thickness transition nothing to interpolate from. Before that, the mobile sheet shipped
"animated" at 150ms because Tailwind doesn't generate arbitrary `duration-[350ms]` values here.

Both are invisible in a screenshot. If you specify a duration, assert it.

---

## Findings that are probably true in CM too

Each of these was a real defect in CHC and is structural rather than incidental, so check them
directly rather than assuming.

| What | How to check | Why it is likely |
|---|---|---|
| **`ring-ring` in ~14 files** | `rg -c ring-ring` | Confirmed already: CM has 14 files. `--ring` is deleted in v0.8.0; move to `ring-focus-ring`. Focus is now wave at two measured stops. |
| **Buttons lost their pointer** | `rg 'cursor: pointer' dist/**/*.css` | Tailwind 4's Preflight dropped the `cursor: pointer` v3 applied to `<button>`. Every real button in CHC had pointed at nothing since the cutover, and it was invisible because links were unaffected. If CM is on v4, it has this. |
| **A card that fights its own border** | count `border-0` at call sites | 24 in CHC. The system is explicit: no border, no shadow. |
| **The radius ramp squashed** | `rg -o 'rounded(-[a-z]+)?' \| sort \| uniq -c` | CHC derived all three steps from `--radius: 4px`, giving 4/2/0 against the system's 3/6/12, plus 82 uses of bare `rounded`, which is on no step at all. |
| **Charts reusing the score ramp** | grep the chart palette for the five score families | CHC's estate trend drew 15 criteria in fire/sunshine/sapling/olive/amber. If CM displays scores at all, its charts are the place to look. |
| **The default transition duration** | `rg 'default-transition-duration'` | Unset means Tailwind's 150ms on every un-annotated `transition-*`, against `--motion-state`'s 200ms. |
| **Prose pages off the density knob** | `rg 'prose-(sm\|lg\|xl)'` | `@tailwindcss/typography`'s size modifiers set an absolute font-size *and* line-height, neither reading `--base-font-size`. CHC's long-form pages were the one place not following it. |

## What v0.8.0 changed that you will need to adopt

- **`--ring` is gone.** `ring-ring` → `ring-focus-ring`. Focus is wave-650 on light grounds,
  wave-450 on dark. CM's own `--focus-ring` was coffee-500 and its `--ring` was fire-500; both are
  superseded, and the two disagreeing was the tell that nobody had a rule.
- **Four motion tokens**, chosen by what animates: colour 200ms, geometry 350ms
  (`--motion-state-slow`), an overlay arriving 350ms (`--motion-overlay`), leaving 150ms.
  `--motion-reveal` is now 600ms and scroll-reveals only.
- **`--surface-hover-row`**, the 30th signature token. A full hover step takes a card-coloured row
  *darker than the page*; large in-page surfaces take the half step.
- **`--font-mono` is the metadata voice** (system UI mono), `--font-mono-brand` is Courier. If CM
  carries a local override for this, delete it – that override in two products is what proved it a
  package defect.
- **The display face is `'Bely Display'`**, not `bely-display`. If CM has a local `--font-display`,
  delete it rather than blessing it: it makes a product a second writer of a suite constant.
- **`[data-surface="inverse"]`** exists, so a dark island needs no local hexes.

## Two things worth copying wholesale

**The `no-em-dashes` test.** Mechanically checkable house style, checked mechanically. It caught
four of mine during this work.

**The design-tokens test with a baseline that may shrink and must never grow.** It catches the
crude mistakes – off-palette values, display-font bolding – and the baseline makes it adoptable on
a codebase that already has violations. It cannot tell you the layout is ugly, so it does not
replace reading the playbook, but it stops regressions for free.

---

## The thing I would tell you if you only read one paragraph

The audit's value was not the twelve defects it fixed. It was that **five of the questions it
couldn't answer locally turned into a design brief, and every one came back with a rule rather
than a value** – *the corner follows the border, not the size*; *a control is filled at rest only
if the fill means selected*; *solid destructive is legal exactly where an 80% scrim is*. Rules
survive the next screen; values don't. So when you hit something the system doesn't answer, resist
picking a sensible-looking value. Write it down as a question, keep going, and ship the rest.

Two of the six answers came back as **corrections to the system rather than choices** – the focus
ring it specified was failing contrast, and the reveal curve two teams had independently opted out
of was wrong. You will not get those by being deferential about what the system currently says.
Measure it.

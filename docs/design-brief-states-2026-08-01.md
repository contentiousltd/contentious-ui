# Design brief: the states a screen audit couldn't answer – 1 August 2026

**For Claude Design.** Five questions, all thrown up by auditing Content Health Check's
*screens* against the component vocabulary (chc-387) rather than its tokens. Written by
Claude Code; nothing here is a decision, only a request for one.

The audit found twelve defects the system already answers – a `Card` that drew a border,
four different focus treatments, a link that took a full second to grow a fire bar – and
those are fixed in the product. What follows is the residue: places where the system
answers twice in two different files, or doesn't answer at all. None of it can be settled
in a product repo without inventing a local answer, which is the pattern the July audit
found five times over.

**Question 1 is the same collision as `--accent`, third time.** `.c-card` was two
vocabularies for one component; `--accent` was two meanings for one name; `--ring` /
`--focus-ring` is two names for one job. The 0.4.0 and 0.7.0 answers may make it a short
decision rather than a fresh one.

---

## 1. `--ring` and `--focus-ring` are the same decision, made twice

| | Where | What it means |
|---|---|---|
| **A** | `skills/contentious-design/tokens/semantic.css:55`, re-pointed per product at `tokens/products.css:169, 219, 289, 354` | The system's focus ring, with `--focus-ring-width: 2px` and `--focus-ring-offset: 2px` beside it. Inside the closed signature set (`products.css:88`, accent group). |
| **B** | `src/styles/themes/*.css` | shadcn's `--ring`. Not in the closed set; declared per theme file. |

They disagree in **every product that declares both**, and not by a shade:

| Product | `--ring` (theme file) | `--focus-ring` (signature block) |
|---|---|---|
| Content Health Check | `wave-500` | `fire-350` |
| Content Maturity | `fire-500` | `coffee-500` |
| Voice, Tone & Style | `sorbet-500` | `sorbet-400` |
| contentious.ltd | *not declared* | `fire-350` |

Content Maturity's pair are different **families**, and CHC's are the two candidate
answers to the same design argument – the theme file states the case for wave in a
comment: *"the accent is reserved for the primary action, so focus gets its own colour and
the two never compete."* That is a real argument, made in the wrong file.

### What it does today

`tailwind4.css` emits both (`--color-ring:317`, `--color-focus-ring:327`), so a shadcn
product has **two plausible focus utilities that render different colours**, and nothing
marks either as wrong. Before chc-387, CHC used `ring-ring` in 13 component files and
`outline-fire-350` in `Switch` alone, plus a rule in `index.css` forcing every input's
ring to `limestone-600` – the card surface colour, so on any card focus was invisible.
Content Maturity has `ring-ring` in **14 files** today and will inherit the same split.

The theme files also claim their values are *"transcribed from the values the app already
runs on"*, which stopped being true for CHC: nothing in the app rendered wave.

### What we've done, and why it isn't an answer

CHC now references the **role** rather than a value – `ring-focus-ring` /
`outline-focus-ring` everywhere, at 2px with 2px offset. That makes the product follow
whatever you settle without a second sweep, and it deliberately doesn't decide the colour.
But it does mean CHC currently ships fire-350, so if the answer is wave we'd rather know
before it reaches many eyes.

**Two candidates, and we have no preference we can justify on design grounds:**

- **Keep `--focus-ring`, delete `--ring` from the theme files.** Cost is the same shape as
  the accent codemod: `ring-ring` → `ring-focus-ring` in ~14 files per shadcn product,
  mechanical, ours. For: focus width and offset already live beside `--focus-ring`, and it
  is in the closed set, so the signature layer owns it like every other per-product colour.
- **Keep `--ring`, drop `--focus-ring` from the signature set.** No product code changes,
  but it moves a signature dimension out of `products.css` into four theme files, which is
  where `--accent` was when it went wrong.

**The colour question is separate from the name question, and we need both.** Is CHC's
focus ring fire-350 or wave-500? The readme states fire-350 as the rule; the theme file's
argument for wave is that focus and primary action shouldn't compete. If the argument
holds, does it hold for every product, or only for ones whose accent is fire?

## 2. The destructive button

`components.css:43` gives the system's danger button as an outline that hovers to a tint:

```css
.c-button--danger       { background: transparent; color: var(--fire-650); border: 1px solid var(--fire-300) }
.c-button--danger:hover { background: var(--fire-150); color: var(--fire-700) }
```

Both CHC's shadcn `destructive` and the library's own `.btn-destructive`
(`src/styles/components.css:527`) are a **solid fire fill**, which the colour rule reads
as *primary*: *"Solid fire = active or primary. Fire tint = status. These never swap."*

We did not change it, because the place it appears is the confirm button of a delete
dialog – where it **is** the primary action of that view, so "one solid fire per view"
arguably makes it solid, and changing a delete affordance on inference isn't on.

**Question:** is `.c-button--danger` the right treatment everywhere, including as the
confirming action of an `AlertDialog`? If a solid destructive button is legitimate in that
one context, it needs a name so it isn't reinvented per screen.

**Related, and probably the same answer:** CHC has six shadcn variants (`default`,
`outline`, `secondary`, `ghost`, `destructive`, `link`) against the system's four
(`.c-button`, `--ghost`, `--quiet`, `--danger`). They nearly map – CHC's `outline` behaves
like the system's `quiet`, CHC's `ghost` like the system's `ghost` without its border –
but "nearly" is how dialects start. A stated mapping would settle it for every shadcn
product at once.

## 3. Which radius step does a `Card` take? *(blocks chc-388)*

The readme gives **3 chip · 6 control and surface · 12 frame**, and the vocabulary note
says `.c-card` is the borderless data surface while `.c-frame` is the bordered container.
CHC's `Card` is now borderless, so it is a `.c-card` and should be **6** – but it is also
the page's main content block, which is what "frame" sounds like.

This blocks a real piece of work. CHC squashes the ramp today (`--radius: 4px` in its
theme, and `index.css` re-points the Tailwind scale onto it, giving 4/2/0), and radii are
named in `products.css` as part of the invariant core, so restoring 3/6/12 is not
optional. It re-points **248 class usages**, each needing a call rather than a rename:

| Class | Uses in CHC | Now | On the ramp |
|---|---|---|---|
| `rounded-lg` | 74 | 4px | 12px |
| `rounded-md` | 66 | 2px | 6px |
| `rounded-sm` | 27 | 0px | 3px |
| bare `rounded` | 81 | 4px | **no step** – Tailwind 4 reads `--radius` (0.25rem) |

`Chip` is on `rounded-lg` today, so *"never full-radius on a label"* holds only because
CHC flattened the value the chip asked for; on the real ramp it needs `rounded-sm`.

**Question:** for a shadcn-derived product, is `Card` the 6 or the 12? And is there a case
for both under two names, given `.c-frame` exists?

## 4. What does a control already on `--surface-hover` hover to?

Hover is *"a background step, not a colour shift"*: transparent → `--surface-hover`, which
is `limestone-600` in CHC. Several controls have limestone-600 as their **rest** state –
the framework filter buttons, the four-tier explainer cards – so there is no documented
step off it, and both currently reach for a shadow instead, which says "floats above the
page" and isn't true.

**Question:** the raised surfaces give limestone-700 and limestone-800 as real stops. Is
one of them the hover for a control that starts raised, or should such a control not have
been raised at rest?

## 5. An action bar on an inverse surface

CHC's inventory renders its bulk-selection bar on `gloaming-700` – a dark island in a
light app. The system covers the mirror case (a light island on a dark page, via
`--surface-inverse` and the `--text-inset` pair, which is how VTS runs a light nav over a
dark page) and nothing for this one. So the bar's three buttons are hand-styled: a solid
**sapling-600** primary – the only solid non-fire button in the product – and two outlines
in `limestone-500/20` and `fire-400/50`.

It reads well and none of it is arbitrary, but every value in it was chosen locally, which
is the definition of a gap rather than a defect.

**Question:** what is the vocabulary for an action bar on an inverse surface – which
button variants exist there, and does the accent stay fire, given fire-on-gloaming is the
one combination the light palette was never tuned for?

## 6. There is no token for a state change slower than 200ms

Found by shipping question 1's sibling fix and putting it in front of a person. The audit
replaced a 1s link transition with `--motion-state`, correctly, and at 200ms the hover
**reads as a pop** rather than a movement. Design review asked for slower.

The scale has nowhere to go:

| Token | Duration | Curve | Why it doesn't fit |
|---|---|---|---|
| `--motion-state` | 200ms | ease-in-out | The pop being complained about |
| `--motion-reveal` | 350ms | ease-out, expo | Right duration, wrong curve – ~70% travelled in its first sixth, so it reads as instant at *any* duration. The mobile sheet hit this and had to opt out of the token |
| `--motion-exit` | 150ms | ease-in | Faster still |

So a state change that wants 350ms has to be composed from the primitives –
`var(--duration-normal) var(--ease-in-out)` – which contradicts `tokens.css`'s own
instruction that app UI uses the three motion tokens *"and nothing else"*. CHC does exactly
that in one place, `p a`, with a comment saying it must not spread.

**Question:** is the answer a fourth token (a slow state change), or is `--motion-reveal`'s
curve wrong for the job it is named after? The mobile sheet's finding suggests the second is
worth asking: two independent surfaces have now opted out of that token for the same reason.

### 6b. And `--motion-reveal`'s duration disagrees with every product that ships a reveal

Raised in review as *"the standard animation speed at contentious.ltd is 600ms – I'd like
that standardised across the suite"*, and the number checks out. **0.6s is the most common
duration in the Astro site** – 7 occurrences, more than any other value – and Voice, Tone &
Style independently uses 600ms too.

But they are all one kind of motion:

| Where | Declaration | What it animates |
|---|---|---|
| `contentious-astro` `CircleCluster`, `DiagramContainer`, `ConcentricCircles` | `opacity 0.6s ease-out, transform 0.6s ease-out`, gated on `.is-visible` | Scroll-triggered diagram reveal |
| same, `ConcentricCircles:287` | `animation: ring-expand 0.6s ease-out forwards` | Scroll-triggered ring expand |
| `voicetoneandstyle` `index.css:112, 224` | `opacity 600ms ease 400ms`, `transform 600ms ease 400ms` | Scroll reveal, with a delay |
| `voicetoneandstyle` `learn.css:86, 236` | `background-color 600ms ease` | Card hover – the one exception, and 3× the state token |

**Not one of the seven on the studio site is a state change.** So 600ms is the suite's
*reveal* duration in practice, arrived at twice independently, and `--motion-reveal` says
350ms. The token disagrees with every shipped implementation of the thing it names.

**Question:** should `--motion-reveal` become 600ms? If so it is worth saying explicitly
whether that binds app overlays as well – a menu or tooltip opening at 600ms is a different
proposition from a diagram assembling as you scroll to it, and the app's overlay motion is
the only place the app currently uses the token.

**What we did not do:** standardise the suite on 600ms wholesale, as the review asked. That
would put every hover, focus ring and colour change at 3× `--motion-state`, and it is the
exact trap `tokens.css` documents having already been caught by once – *"`--transition-fast`
is the obvious name to reach for and it is 300ms, a 4×-wrong hover"*. If the intent is that
app state changes really should be slower, that is question 6 above and wants its own number
rather than inheriting the reveal one.

---

## What we are not asking

- **The `.c-card` / `.c-frame` split.** Settled in 0.4.0. Question 3 applies it, it doesn't
  reopen it.
- **`--accent` / `--surface-hover`.** Settled in 0.7.0 and the codemod landed cleanly in
  CHC: `bg-accent` and `text-accent-foreground` appear nowhere in the app.
- **Density.** 19px, derived from deployment mode. Applied.
- **Chip geometry and the six tones.** Implemented as specified; the audit checked and
  found nothing.

## Not for you – three defects on our side of the boundary

Recorded in `design-system-sync.md` under *Open*, and listed here only so they aren't
mistaken for design questions.

1. **The warm shadow set never crosses the package boundary.** `tokens/effects.css`
   defines shadows in warm gloaming – `rgba(38, 36, 35, …)`, consistent with *"pure white
   and pure black appear nowhere"* – but it is reachable only via
   `skills/contentious-design/styles.css`, which a package consumer doesn't import.
   `src/styles/tokens.css:283` and `tailwind4.css:297` define their own at
   `rgba(0, 0, 0, …)`. So every consumer renders the black set, and would whatever it
   wrote.
2. **The accent codemod missed the library's own component CSS.**
   `src/styles/components.css:483, 513` still paint `.btn-outline:hover` and
   `.btn-ghost:hover` with `var(--accent)` / `var(--accent-foreground)`. Post-rename that
   is a **solid primary fill on hover** – the exact bug the accent decision removed, one
   layer down – and `--accent-foreground` is now defined nowhere in the package, so the
   text colour is invalid at computed-value time and doesn't change at all.
   `src/tailwind-preset.ts:58` has the same residue. CHC is unaffected because it doesn't
   import `components.css`.
3. **Two `prompt.md` files still say CHC's base size is 18px.** `Button.prompt.md` and
   `Card.prompt.md`, predating the density decision. Cosmetic, but they are the files the
   skill tells you to read before designing a screen.

## What is blocked

- **chc-388** (restore the radius ramp) is blocked outright on question 3.
- **Question 1 is not blocking but is live**: CHC ships fire-350 focus rings from the next
  deploy, and Content Maturity's 14 files will need the same sweep whichever way it goes,
  so answering before CM's adoption saves doing it twice.
- Questions 2, 4 and 5 are logged as Gaps in CHC's component playbook and are holding
  nothing.

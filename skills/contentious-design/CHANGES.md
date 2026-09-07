# Changes – 7 September 2026

**This file is the handoff channel, and it lives inside the export on purpose.**
`github.md` sits at the Claude Design project root, which is *outside* `design-system/`,
so it never reaches the repo. Everything Claude Code needs to know about a round belongs
here, because this folder is what gets exported wholesale.

Each export overwrites this file with the current round. Older rounds are in
`docs/design-history/` on your side and `provenance/` on ours.

---

# The front door gets a ground, and Maturity Tool becomes a product

**Full workings:** `provenance/Maturity Tool site audit 2026-09-07.html`. Read
maturitytool.com and `juliushonnor/maturitytool@60279b7` against the current system,
fifteen findings, and Julius answered the four decisions on 7 September.

**Nothing in the app layer moves.** No component an app screen uses changes value,
geometry or class name. Everything below is either a marketing surface or a new product
block.

## The headline: `--surface-front` and `--surface-front-tint`

The signature set grows to **36**, the seventh growth, and the reason is that the system
had already said a product has two kinds of surface and then given only one of them a
colour. `--signature-deployment` has recorded since 1 August that deployment is a property
of a surface rather than of a product, and that every reserved product has an app and a
front door. The front door got a density (24px), a motion token (`--motion-reveal`) and a
wash (`--wash-section`). **It never got a page.**

So every marketing page in the suite has been picking its own stops, and the audit found
what that costs: the Maturity Tool page picks seven grounds in its own stylesheet, and two
of them put a card **1.06:1** from the section it sits on. That is the same number that
moved the Content Health Check page on 4 August. It survived here because the cards carry a
`.c-frame` border, so the outline was doing the structural work the fill was failing to.

- **`--surface-front`** is the front-door page. It is *not* `--surface-page`: a marketing
  page is airier than the app it sells, and on lichen the two are three stops apart.
- **`--surface-front-tint`** is the alternating band. A marketing page divides itself by
  alternating two grounds; the wash softens one section, it does not separate two.
- **The card is the whole test.** Whatever the pair is, `--surface-card` must clear
  **1.18:1 from both**, and a band step under about 1.15 does not read as a band.
- **It cannot be derived.** Limestone's light end is aliased, so a recipe that reads on
  lichen is nearly invisible on Content Health Check. Authored per product, like the wash.

**All five product blocks declare both.** Values, with the card ratio each produces:

| Product | front | tint | card on front | card on tint | band step |
| --- | --- | --- | --- | --- | --- |
| chc | limestone-600 | limestone-750 | 1.18 | 1.47 | 1.25 |
| cm | lichen-350 | lichen-500 | 1.20 | 1.35 | 1.13 |
| mt | lichen-350 | lichen-500 | 1.20 | 1.35 | 1.13 |
| vts | sorbet-850 | sorbet-900 | 1.19 | 1.25 | 1.48 |
| contentious | limestone-500 | lichen-300 | 1.06 | 1.40 | 1.32 |

CM's two values are not arbitrary and are worth keeping that way: **lichen-350 is already
the first stop of CM's `--wash-section`, and lichen-500 is CM's app page.** So CM's
marketing ground is a step lighter than its app, and its marketing band lands exactly on
the app's own page colour. VTS and contentious.ltd are **provisional** – neither live
homepage has been reconciled.

**And it fixes a collision that was already in the system.**
`.c-marketing-section--tint` *was* `--surface-card-deep`, so a tinted band and a feature
card were the same value by definition and a card on a band read at 1.00:1. The band now
has its own token. Corollary that still holds: do not put a deep card on a tinted band.

**One flag, not fixed here, and it is yours to schedule:** contentious.ltd's
`--surface-card` is limestone-300 against a limestone-500 page, which is **1.06:1** – the
4 August failure, still live on the studio site. Do not fix it by moving the front pair;
it needs its own round.

## New product: `[data-product="mt"]`

Julius's call: Maturity Tool is a separate product, not a skin on Content Maturity,
and deliberately low-key – it resells the CM platform to consultancies, so it sits below
the other four rather than beside them.

**It is the first product in the suite with no working surface.** One static page, no
signed-in state, no scores, no tables. Three things fall out of that:

- **Density is 24px on every surface**, which no other product can say. Not an exception to
  the density rule: the rule derives density from deployment, deployment is a property of a
  surface, and this product has one kind of surface, so the rule returns one answer instead
  of two.
- **`--surface-page` and `--surface-front` are the same value.** Declared twice on purpose:
  a component asking for the page ground and a section asking for the front-door ground are
  asking different questions, and the day this product grows an app the answers separate.
- `--signature-app-ground: "n/a"`, the second after contentious.ltd.

**It shares lichen with Content Maturity, and rule 4 permits it.** The rule requires
products *sold in the same conversation* to differ on ground – CM and CHC are, CM and
Maturity Tool are not: one is sold to an organisation that wants an assessment, the other
to a consultancy that wants to run assessments for its clients. Never on the same slide.
The triple is unique on accent: CM is (reserved, lichen, coffee), this is (reserved,
lichen, fire). Sharing the ground is also the honest thing, since it *is* the CM platform.

**Accent is fire at 600, not 500, and both halves are measured.** Fire is free here for the
same reason it is free on the studio site: the accent reservation binds products that
*display scores*, and this page shows none. 600 rather than 500 because every fire surface
on the page carries text, and `limestone-100` on fire-500 is **3.99:1** – which is one of
the two contrast defects the audit found. On fire-600 it is 5.81.

**The reversed band and the footer are the other way round from CHC.**
`--surface-inverse` is gloaming-700 (the pull-quote band – the same job contentious.ltd
gives it, and this product has no tooltips) and `--surface-footer` is gloaming-800, so the
footer is darker than the band it may sit under. The shipping page has these at gloaming-550
and gloaming-600, with the footer *lighter* than the band.

**Illustration is recorded as borrowed**, not upgraded to "pictorial". The page uses CM's
tree. That is the one dimension this product does not own and it is what "resells the
platform" looks like in a signature. Do not quietly promote it – that would make it
indistinguishable from CM on the dimension the system calls the second-strongest cue.

## New: the marketing kit

Seven new classes in `components/components.css`, all front-door only, all wanting
`.c-marketing` on the section. Specimen and the rules:
`guidelines/pattern-marketing-page.html`.

- **`.c-eyebrow`** – the marketing eyebrow, replacing **four identical classes under four
  names** on the shipping page (`.type-accent-label`, `.included-card__eyebrow`,
  `.pricing-card__eyebrow`, `.timeline__week`; only the bottom margin differed). **Bely,
  uppercase, weight 400**, and coloured, unlike every other label in the suite.
  It takes **`--accent-link`** directly – **the link stop, not the accent stop**, because an
  eyebrow is small uppercase text and needs 4.5:1: on the lichen
  front door fire-500 is 3.25, fire-600 is 4.72 and fire-650 is 5.72. Reading the remapped
  token directly is what makes it correct on a reversed band (fire-350, 6.16:1 on
  gloaming-700) and inside a deep card (fire-750, 6.54:1) with no per-scope declaration –
  see "A pure alias is a trap" below.
- **`.c-divider--taper`** – a 1px section divider that fades to transparent at both edges.
  Same reasoning as the wash's 135deg angle applied to a hairline: a full-bleed hard rule
  reads as chrome on a marketing page. Uses the product's `--rule-section`, not a fourth
  rule token.
- **`.c-hero`** – eyebrow, title, intro, one pair of actions, illustration. Two new
  measures, **`--measure-title: 28ch`** and **`--measure-lede: 48ch`**, taken from the
  shipping page, which is the only page in the suite that set them deliberately. Use
  `text-wrap: balance` rather than the site's two hard `<span>` breaks, which fix the break
  at one viewport for a heading that is already constrained.
- **`.c-pullquote`** – one per page, on a section carrying `data-surface="inverse"`. The
  oversized Bely Display opening glyph is kept, as a **declared stop rather than the site's
  `opacity: 0.6`**, and the rule states it is ornament so nobody has to measure it. The
  prose column starts at the quote's first line rather than the top of the grid.
- **`.c-price-row` / `.c-price`** – **the featured band is `data-surface="deep"` and
  nothing else.** There is deliberately no `.c-price--featured`: a deep card already means
  "a different kind of thing from the cards around it", is already constrained to once per
  set, and the eyebrow carries the words. The site's 2px fire border plus fire-tinted
  shadow plus `translateY(-4px)` is three things the system has settled against, and a lift
  on a marketing card is a second surface depth (`.c-feature`, 4 August). **The figures
  block is a hairline pair, not a surface** – a filled slab inside a filled card is a slab
  inside a slab, and it measured 1.14:1 anyway. That is also how the site's 8px radius
  stops being needed.
- **`.c-steps`** – its own component, **not** a `.c-bullets--timeline` variant, on Julius's
  call: that marker is a node *on* a line and means "a point in a sequence", where this
  means "step 3 of 6" and sits in a grid. **The number is a CSS counter**, so the markup
  does not carry it and it cannot drift from the order of the list. The disc is `--accent`
  with `--text-on-accent` on it, which is the surface that catches a product whose accent
  stop is too light – see the fire-600 decision above.
- **`.c-literal`** – a domain name, filename or URL in running prose. Metadata voice
  (`--font-mono`), no fill, no radius, no tint. **Courier (`--font-mono-brand`) stays
  reserved for actual code**, which is what the brand guide says it is for. Julius agreed a
  URL in a sentence is not code.

## Also new: `.c-bullets--accent`

Julius liked the shipping page's two-tone bullets and asked me not to overcomplicate them,
which was right – my first answer built a two-list comparison system around them and the
better answer is a skin.

`.c-bullets--accent` sets the marker to `--accent-marker` and turns on a ring. **It means
nothing, which is the point:** the fill/ring pair remains the one sanctioned marker
semantic and stays free to say done-and-not-yet. This says only "these bullets belong to
this page", so a whole page may take it – which is how the site uses it – or one list may
take it to draw the eye to the list that matters. It must not appear twice in one
comparison meaning two different things.

New geometry: **`--marker-aura`** (default `transparent`) and **`--marker-aura-width`**.
Not `--marker-halo`, which punches a gap in a timeline line. The ring is **derived from the
accent and resolves to an opaque colour** via `color-mix` against `--surface-card`, rather
than the site's 18% alpha, which is the 1 August rule against an opacity modifier standing
in for a colour. It is also a **size** decision: on a marketing surface the ring takes a
9.4px mark to **17.5px of ink**, which is why it is off by default – right at the 24px base,
too loud in an app list, where the same ratio gives 7.4px and 13.9px.

**Caught at review, and it is the trap the token layer already documents:** `--marker-size`
and `--marker-aura-width` are declared on `:root`, and custom-property substitution happens
where a property is *declared*, so `.c-marketing` redeclaring `--u` could not reach them.
The first cut of this shipped a marketing page with body copy at the 24px base and every
bullet marker still at the app's 19px. **`.c-marketing` in `semantic.css` now redeclares
`--marker-size`, `--marker-node` and `--marker-aura-width`** alongside the `--type-*`
shorthands, which is the same fix the shorthands themselves needed on 4 August.
`--marker-lead` is deliberately left out: it is `1lh`, so it already follows the item's own
type.

## For your side

1. **`.c-feature-card` has a second live call site and open question 5 says one.**   `juliushonnor/maturitytool@main/index.html` uses `.c-frame.c-feature-card` with the
   retired `__content` / `__title` / `__body` family. The migration is not mechanical: the
   cards are bordered there and the folded component is borderless on
   `--surface-card-deep`. Add the repo to the fold's call-site list before the rename ships.
2. **The site is pinned to `@contentious/ui#semver:^0.2`** and its `styles.css` is written
   against the shadcn-era names (`--foreground`, `--muted-foreground`, `--card`, `--border`,
   `--font-size-*`, `--body-line-height`), uses `.btn btn-primary btn-lg` from the 0.4.0
   rename list, and repeats `calc(1.2em * var(--text-multiplier))` eleven times with eight
   different multipliers where `.c-marketing` does it once. Julius has approved a rewrite;
   **it has not been done yet** – it wants the components above published first.
3. **Two contrast fails on the shipping page**, both a stop from passing: sorbet-500 on
   gloaming-550 at **3.11** (the reversed eyebrow) and limestone-100 on fire-500 at
   **3.99** (the timeline numerals, 20px, so not large text). Both are answered by the mt
   block and `.c-eyebrow` rather than by patching the site.
4. **The reveal is 700ms on the expo curve** the 1 August decision replaced, which makes
   this repo a **third independent opt-out**. `--motion-reveal` is 600ms on a real ease-out.
5. **Em dashes swept** from `tokens/products.css` and `tokens/semantic.css` (64 and 2),
   against the brand rule the style guide lints for. Comment text only, no values changed.

## The eyebrow's face: Bely, and NOT a per-product token

Settled 7 September. Julius chose Bely and proposed making the face a per-product setting.
**Bely yes, per-product no**, and the mechanism matters more than the value here.

**Why Bely.** An eyebrow on a marketing surface is naming a section of an argument. Mono is
the app's *metadata* voice – the register for a column header, a tick, a chip, a count – and
uppercase mono at 24px density reads as a system label on a page that is not a system. The
shipping site already had this right.

**Why not a per-product token.** Face is a family trait: `products.css` lists Bely and every
`--type-*` role under "what never varies", and **the 1 August decision refused mono a
signature slot on exactly this ground** – *two identical product overrides is the proof that
a thing does not vary.* Adding `--eyebrow-font` would reopen a settled argument and grow the
closed set to 37 for a value every product would set identically.

**The key the system already has is better: deployment is a property of a SURFACE.** So the
rule is that `.c-label` is mono because it labels **data** and `.c-eyebrow` is Bely because
it labels **prose**. Two classes, two faces, one distinction – and it generalises to every
product's marketing page for free rather than being declared five times. If a product ever
genuinely wants a mono eyebrow, that is when it argues for the token, with a real case in
front of it rather than a hypothetical.

**Weight is 400, and this is a defect in the site worth carrying over.** It asked for
`font-weight: medium`. **Bely ships Regular and Bold and nothing between**, so 500 on a Bely
eyebrow synthesises a fake weight – and the `font-synthesis-weight: none` guard in
`tokens/fonts.css` covers `h1`–`h6`, `.font-display` and `.font-heading-display`, not a
`<p>`. Worth checking whether that guard should be wider than six element selectors and two
classes, since any `.c-*` component in Bely at a non-shipping weight has the same exposure.

## Found while measuring the eyebrow: `--label-color` is 4.39:1 on a tint band

Not fixed, because it wants a decision rather than a patch at the end of a round.

`--label-color` is gloaming-450, invariant across the suite, and `semantic.css` records why:
"NOT 400 – fails AA at 10px". It is the floor for a mono label. On the new
`--surface-front-tint` for `mt` (lichen-500) it measures **4.39:1**, marginally under the
4.5 floor for small text. On `--surface-front` (lichen-350) it is 4.97 and holds.

**Nothing shipped is affected.** The thing that actually goes on a tint band is
`.c-eyebrow`, which reads `--accent-link` and measures 5.05 there. But a `.c-label` on a
tinted marketing section would fail, and that is now a legal combination because this round
made the tint band a token.

Three ways out, and none is obviously right: darken `--label-color` to gloaming-500 (about
6.2 there, but it is invariant, so it moves the metadata voice in four products to solve a
fifth's marketing band); lighten `--surface-front-tint` to lichen-450 (which costs the band
step, already only 1.13); or rule that **a mono metadata label does not belong on a
front-door surface at all** — which is arguably true, since the eyebrow is the marketing
label and `.c-label` is the app's. I lean to the third, as a rule rather than a value
change, but it is a rule about where a component may go and that is worth agreeing.

## The deep card was too dark on lichen, and `semantic.css` said it could not be

Found while checking the eyebrow, and it is a **shipped-component defect**, not a
specimen one.

`[data-surface="deep"]` remaps four properties: `--surface-card`, `--label-color`,
`--rule-section`, `--accent-link`. **`--text-secondary` is not one of them**, and
`.c-price__description` and `.c-price__period` both use it – inside a card that is
`data-surface="deep"` by design. On lichen-650 that is **3.56:1**.

**The block in `semantic.css` is what hid it.** It said "--text-strong reads at 10.87:1 on
it and nothing about the type changes". That was measured on **limestone-750**, CHC's and
the studio's deep ground, and it is true there: strong 10.86, body 8.84, secondary 5.21. It
is not a property of the scope, and it was never true on lichen, which CM and Maturity Tool
both took. The note is corrected, and it now states the test instead of a figure:
**`--text-secondary` needs 4.5:1 on `--surface-card-deep`, per product**, and
`--label-color` will not make it on any of them, which is what `--label-on-deep` is for.

**Fixed for `mt`: `--surface-card-deep` is lichen-550, not lichen-650.** Secondary 5.10,
body 8.66, strong 10.65, and the card still reads 1.33:1 on the front ground, above the
1.18 bar, and 1.59 against a pale card beside it. Against the tint band it is 1.17, which is
consistent with the standing rule that a deep card does not go on a tinted band.

**Not fixed for `cm`, and flagged in `products.css`, because no stop on the ramp satisfies
both constraints.** CM's page is lichen-500, so its deep card must be dark enough to read
against that *and* light enough to carry secondary text:

| stop | vs the lichen-500 page | `--text-secondary` on it |
| --- | --- | --- |
| lichen-550 | 1.17 too faint | 5.10 passes |
| lichen-600 | 1.40 | 4.27 fails |
| lichen-650 | 1.68 | 3.56 fails |
| lichen-700 | 2.04 | 2.94 fails |

Maturity Tool escapes it only because its page is the lighter front-door ground. CM needs
either a `--text-secondary-on-deep` (a 37th signature token, and the `-on-deep` group would
then be four) or a deep card that is **lighter** than its page rather than darker – which is
what "further from the cards" would mean on a mid-toned ground, and is arguably the more
interesting answer. Own round.

**Worth a look on VTS too.** Its deep card is sorbet-900 and its text roles are already
light (`--text-secondary` is coffee-300), so it is almost certainly fine, but it has the
same provisional marker and nobody has measured it.

## Still open, and one of them is a decision
- **`.c-feature` assumes an illustration and centres its text**, so the shipping page's six
  text-only benefit cards have no answer in the kit. Either the page gains illustrations or
  `.c-feature` gains a text-only variant. Flagged in the guideline rather than fudged.
- **The accent-filled closing band has no component.** It needs `--text-on-accent` to hold
  4.5:1 on the accent fill, which is exactly why mt's accent moved to fire-600, and that is
  a small decision of its own.
- **`guidelines/pattern-feature-cards.html` prose is stale**: it says the card ground is
  `--surface-raised`, which was true on 4 August and is now `--surface-card-deep`. The same
  sentence in `Design system.html` is corrected in this round; the guideline page is not.

## Unrelated fix in the same round: ScoreHistory was never ported

Julius spotted this browsing the system. The 5 August bands-as-ground decision landed in
`components.css`, `Design system.html` and `ScoreHistory.prompt.md`, and **`ScoreHistory.jsx`
was never updated to match** – so the documented rule and the component Claude Code would
implement from disagreed on four points. The JSX was still:

- rendering **`.c-history__grid`**, the gridlines the decision deleted, and not rendering
  `.c-history__bands` at all;
- colouring each dot **`--level-N`** inline, where the rule is that over full-strength bands
  the ramp is the ground and the dot takes `--limestone-200` like the line;
- defaulting to **`ticks={[0, 25, 50, 75, 100]}`**, where the rule is every 10;
- defaulting to a **full 0–100 domain**, where the rule is padded to the data – and a
  0–100 domain at full strength draws a fire band under a healthy score, which is a claim
  the data never made.

**Now ported.** Bands derived from the `--score-band-*` edges (30/50/70/90) and clipped to
the domain, so only the bands the data crosses are drawn. The domain is derived: **one
ten-step below the lowest reading's ten, up to the ten above the highest**, which is what
the specimen in `Design system.html` shows (40 to 90 for readings of 52 to 83), with a
**30-point minimum span** so two near-identical readings cannot produce a ten-point axis
and re-create the problem the bands fix. `min` and `max` still pin it, and the `.d.ts` now
says what pinning 0–100 costs. Y labels every 10 across the domain.

**`.c-history__grid` is deleted from `components.css`**, not left dead – its survival is
what let the JSX keep rendering the old chart. Its rule was also `opacity: .6` on a
hairline, which is the 1 August rule against an alpha standing in for a colour.

**Still not implemented, and it is in the prompt as a rule:** "the hover target is the
full-height column, not the dot". There is no hover column in the JSX and no CSS for one.
It needs the tooltip surface, so it is flagged rather than invented here.

## A pure alias is a trap, and one token was added and deleted the same day

Worth reading before you write a token, because **this mechanism bit three times in one
round** and the system now documents it in three places without any way to catch it.

**A token whose value is `var(--other-token)` is a copy, not a link.** Custom-property
substitution happens where the property is *declared*, so a value written on `:root` has
already resolved there; a scope that later remaps its source cannot reach it, because the
alias is not re-declared on that element and simply inherits the value it already computed.

The three instances:

1. **4 August** – the `--type-*` shorthands. `.c-marketing` redeclares `--u` and the `--t-*`
   steps in `type-roles.css`, and `semantic.css` has to redeclare the shorthands too,
   because a shorthand computed on `:root` has baked in `:root`'s `--t-*`. Already recorded.
2. **7 September, caught at review** – the marker geometry. `--marker-size` and
   `--marker-aura-width` are declared on `:root`, so a marketing page had body copy at the
   24px base and every bullet marker still at the app's 19px. Fixed by redeclaring them in
   the `.c-marketing` scope.
3. **7 September, caught at review and then deleted** – `--label-accent`. It shipped for
   half a day as `var(--accent-link)` on `:root`, so the eyebrow inside a deep price card
   kept the light-ground stop and measured **4.39:1** – the identical figure `products.css`
   already records against `--accent-link-on-deep`. **It is gone rather than patched a
   third time:** it resolved to exactly `--accent-link` in all three scopes, so it earned
   nothing and cost a thing to keep in step. `.c-eyebrow` now reads `--accent-link`, and
   every existing and future scope remap applies to it automatically.

**The rule: do not alias a token that any scope remaps.** Either the component references
the remapped token directly, or the alias genuinely differs from its source and is authored
per scope rather than derived. An alias that is always equal to its source is a defect
waiting for the next scope.

**The check this wants, and it is the same shape as the dead-utility check from 1 August:**
for every token defined as `var(--X)`, assert that every scope remapping `--X` also
remaps it, or that the token does not exist. It reads the CSS, needs no build step, and
would have caught all three of the above. Cases 1 and 2 are legitimate redeclarations and
would pass; case 3 would have failed on the day it was written.

## New folder: `components/marketing/`

Six components with full contracts – `.jsx`, `.d.ts` and `.prompt.md` each, plus a
`marketing.card.html` specimen, matching `core/` and `data/`.

| Component | Class | Notes |
| --- | --- | --- |
| `Eyebrow`, `Literal` | `.c-eyebrow`, `.c-literal` | `Literal` lives here because it is the other inline marketing type class |
| `Divider` | `.c-divider`, `--taper` | `taper` prop, default false |
| `Hero` | `.c-hero` | Title is plain text, and the props doc says why not to force a break |
| `PullQuote` | `.c-pullquote` | The section supplies `data-surface="inverse"`; the component paints no ground |
| `PriceBand`, `PriceRow` | `.c-price`, `.c-price-row` | `featured` sets `data-surface="deep"`; there is no `--featured` class to set |
| `Steps` | `.c-steps` | `steps[]` carries no numbers – `counter-increment` fills them |

**Three things the contracts enforce that CSS alone could not.** `Steps` renders the numeral
as an empty `aria-hidden` span, so the markup cannot carry a number that disagrees with the
list order, and the `<ol>` is what tells a screen reader the sequence. `PriceBand` takes a
boolean and sets the attribute itself, so `featured` cannot become a class someone then
adds a border to. And `PriceBand` imports `Bullets` from `core/` rather than accepting a
pre-rendered list, which is what stops the next price table hand-rolling a third marker
system.

**Each `prompt.md` carries the shared conventions block**, extended with a front-door
paragraph: put `.c-marketing` on the section, because `type-roles.css` re-derives `--u`, the
`--t-*` steps and the marker geometry there and `semantic.css` re-derives the `--type-*`
shorthands, and without it the component renders at app density.

## Files changed

`tokens/semantic.css`, `tokens/products.css` (set 34 → 36, seventh growth recorded, new
`[data-product="mt"]` block, density note), `components/components.css`, **new
`components/marketing/` (19 files)**, new
`guidelines/pattern-marketing-page.html`, `components/data/ScoreHistory.jsx` and
`ScoreHistory.d.ts` (the port above), and **`Design system.html`** – new Marketing page
chapter, `.c-bullets--accent` added to Markers &amp; bullets, the closed set corrected from
30 to 36 and “grown four times” to seven, the fifth product recorded under Product
signatures, and the feature-card ground corrected from `--surface-raised` to
`--surface-card-deep`, which had been stale since 4 August. On our side and not exported
wholesale: `provenance/Maturity Tool site audit 2026-09-07.html` (for
`docs/design-history/`).

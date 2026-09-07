# Changes – 7 September 2026

**This file is the handoff channel, and it lives inside the export on purpose.**
`github.md` sits at the Claude Design project root, which is *outside* `design-system/`,
so it never reaches the repo. Everything Claude Code needs to know about a round belongs
here, because this folder is what gets exported wholesale.

Each export overwrites this file with the current round. Older rounds are in
`docs/design-history/` on your side and `provenance/` on ours.

---

# Content Operating Model becomes the sixth product

**Added after the Maturity Tool round, same day.** If that round has not been applied yet,
the manifest at the foot of this file covers both: it is the union of the two, and the only
file it adds is `guidelines/pattern-product-signatures.html`.

**Nothing existing moves.** No token changes value, no component changes geometry or class
name, and no other product block is touched. This round is one new product block plus the
three places the suite counts its products.

## `[data-product="com"]`, and it takes CHC's ground on purpose

contentoperatingmodel.com is the upstream strategic layer: the blueprint a content function
is designed against, sold a level above the rest of the suite. v0 is content marketing and
the component library - text, charts and line drawings - with the blueprint generator and a
browseable library arriving at v1, when it gains a working surface. Until then it is front
door all the way down, so **every surface it owns is 24px**, the same shape as Maturity
Tool.

**Ground is limestone, and that is the exception rule 4 asks products not to take.** The
tight clause is that products sold in the same conversation must differ on GROUND, because
within one deployment mode that is the dimension that carries at a glance. COM and CHC are
sold in the same conversation and both are reserved. So this block deliberately does the
thing that made CM and CHC read as one product, and the block says so in those words.

The argument is positional rather than visual: **COM is the layer the others answer to, not
a sibling of them**, so it should look like the house, and the house ground is limestone.
Three warm tints and two cool ones were built and rejected first, on the grounds that a
mid-tone tint reads as pastel beside Bely and the suite already has four warm neutrals.
Workings, including the measured tables for the rejected grounds:
`explorations/COM signature proposal.html`, `v2`, `v3` on the Claude Design side.

**What carries the difference instead**, and it is worth stating because two of the three
are not colour:

- **Accent: sapling, at 700.** The dark end, under the allocation rule - sapling-500 is a
  rung on the score ramp, and no accent fill may be mistakable for a level. COM shows no
  scores today, but the locator rubric may yet render one, so the rule is obeyed rather
  than argued around. **Sapling is now spent as an accent for the whole suite**, which
  leaves a scoring product needing a ramp family at 700 or darker, or a twelfth family.
  `--text-on-accent` is limestone-100 rather than CHC's limestone-200: 6.59:1 on
  sapling-700.
- **Illustration: measured line drawing** - orthographic layers, exploded stacks, plan and
  section, leader lines and callouts. Unlike anything else in the suite, and it is the
  register the canonical three-layer diagram is already in.
- **No scores.** CHC's screens are full of star ramps and gauges. COM shows none, and
  `--level-empty` is declared and unused.

**Recorded as an exception, not as precedent.** A seventh product citing this block to land
on limestone is the failure the signature layer exists to prevent. The exception is
available to the product upstream of the whole suite, and there is only one of those.

**Two things carried forward in the block's comments.** `--surface-page` and
`--surface-front` are the same value, declared twice, as Maturity Tool does - they separate
when the app arrives. And if CHC's ground ever moves again, **this block does not follow
automatically**: sapling-700 has 5.15:1 of room on limestone-600 and not much more, so the
accent is re-measured against the new page first.

## `SKILL.md` names Content Operating Model

**One line, and it is the invocation trigger rather than design content.** The description
lists the product family, and a product it does not name does not trigger the skill in its
own repo - which is how an agent ends up reporting that the design system has nothing about
Content Operating Model. COM is now in the list, between Maturity Tool and the Content
Layer. `npm run check:design-sync` asserts the description still names the family, so this
is additive and the check is unaffected.

## Correction in the same round: texture is a family trait, not a studio trait

**Raised by Julius on seeing the first COM illustration, and it is a wording defect rather
than a decision.** `products.css` said "the studio site is also the only place the brand's
TEXTURE lives" and `Design system.html` said "texture is studio-only". That is not what the
brand does. **Every Contentious illustration, on every site and in every product, is
lino-cut** - flat colour, rough cut edges, grain in the fill. The sets differ slightly from
product to product and texture is not one of the differences, so no product opts out of it.

Three consequences, all applied:

- **Dimension 3 is SUBJECT and COMPOSITION, not treatment.** The old wording licensed a
  product to invent a treatment, which is a licence the brand does not give. What varies is
  what is depicted: objects and diagrams from above (CHC), landscape and growth (CM),
  letterforms and printed matter (VTS), apparatus (COM).
- **What is studio-only is texture on a SURFACE** - the torn-paper edge between two
  full-bleed bands, and collage bleeding off a band into the page. That belongs to the
  banded deployment mode, not to the drawings.
- **The app rule is unchanged and was never the problem**, because it governs surfaces: no
  gradient, blur, glass or grain on the page, chrome, cards, fields or tables. A lino-cut
  illustration on a clean card was never a breach of it. An app growing a torn edge on its
  own chrome still is. `readme.md` already scoped this correctly ("the rule is scoped to
  what a surface is for"); the two files that did not now match it.

**COM's register is rewritten accordingly**: "apparatus and mechanism - machines, looms,
frames, a figure operating one, cut shapes suspended on lines. Lino-cut like every other
product's set; what is COM's is the subject, not the treatment." The first draft said
"measured line drawing", which claimed a treatment that does not exist in this brand.

**The canonical three-layer diagram already exists** and is published at
contentious.ltd/resources/the-content-operating-model-in-the-ai-age: three stacked layer
cards, the seven questions as circles with *why* at the centre. It is drawn in **fire and
sunshine**, which predates the sapling accent - see the open item below.

## A reference page, so the site has somewhere to start

**New `guidelines/pattern-com-page.html`.** Nav, hero, one body section, footer, built only
from the kit and the token layer at `data-product="com"`. Deliberately short: sections get
added as the content arrives, and `pattern-marketing-page.html` is where the rest come from.
It exists so the first page of contentoperatingmodel.com is an assembly job rather than a
set of small decisions taken one at a time.

**Two placeholders, and they are the two things the design system cannot supply.** The mark
is an accent square, because COM has no logo and the wordmark is simply Bely. The hero
illustration is a striped box captioned with what belongs there. Delete the `.ph` rules when
the artwork lands.

**Two things flagged rather than solved.** `.c-topbar` is app chrome doing marketing duty -
it carries a project switcher and an avatar in the app, and here it is brand, links and one
action. That is what the other sites do, and a marketing nav variant is a system decision if
it recurs. And **the three-layer stack is page markup, not a component**: three cards and a
question grid, with the content layer on `--surface-card-deep` because it is a different
kind of thing from the two foundations under it, not because it matters more. If it appears
on a third page it earns a component; until then it stays plain HTML so it is cheap to
change.

## Four defects the reference page found, three fixed and one logged

Building the page is what surfaced them, which is the argument for building it.

1. **The primary CTA was 1.26:1, and the cause was the cascade rather than a token.**
   `.c-button` sets its foreground from `--text-on-accent` inside `@layer components`. A
   specimen page's own `a { color: var(--accent-link) }` is **unlayered**, so it beats any
   layered rule however specific, and every `&lt;a class="c-button"&gt;` lost its foreground:
   sapling-750 text on a sapling-700 fill. Fixed by scoping the rule to the annotation block
   in both this page and `pattern-marketing-page.html`, which had the same rule and the same
   effect on its own buttons. **The rule for any page in this system: style links through the
   components, never with a bare element selector.** An unlayered element rule beating a
   layered component rule is a trap the layer order makes invisible.
2. **A deep card on a tinted band, at 1.00:1** - the corollary `products.css` already
   records, reproduced within a day of it being written down. The three-layer stack put
   `--surface-card-deep` on `.c-marketing-section--tint`, and on COM both are limestone-750,
   so the content layer was invisible as a card and only its inner hairlines read. **The
   section is now flush**, where the deep card is 1.25:1. Worth noting the corollary is
   currently prose in a comment and nothing checks it: a rule that a card's ground must
   differ from its section's would have caught this and the 4 August failure both.
3. **`.c-topbar` does not fit a front door, and now there is a number.** It is `nowrap`
   because it was drawn at the app's 19px; at 24px the brand alone is 347px, and brand plus
   four links plus one button overflow a 924px viewport by **140px**, scrolling the whole
   document sideways. The page patches it with `flex-wrap` in its own stylesheet and says so.
   **A marketing nav variant is now a requirement rather than a hypothesis**, and the
   decision it needs is what collapses first at narrow widths.
4. **`[data-surface="inverse"]` hardcoded a fire stop for `--accent-link`, and that is now
   fixed rather than logged** - see the next section, because the fix grew the set.

## The set grows to 38: `--accent-link-on-reverse` and its hover

**Eighth growth, and Julius's call the same afternoon it was flagged.** The inverse scope
lifted `--accent-link` to a hardcoded fire-350, so a footer or reversed band showed coral
links in every non-fire product - CM, VTS and COM - at perfectly good contrast and the wrong
signature. Same class of defect as `--text-secondary` on a deep card, logged that morning: a
scope that remaps some roles and not others, where the ones it remaps were tuned against one
product.

**"Pale form of the accent" was the obvious rule and it is not the rule**, which is what
made this worth a token rather than a value change. **VTS's `--surface-inverse` is
limestone-200 - a LIGHT island** - so a pale stop measures **2.24:1** there and its hover
1.60. Direction belongs to the product, exactly as `--surface-card-deep` goes darker on VTS
and lighter everywhere else. Hence the name: **on-reverse**, not on-inverse.

**One pair covers both scopes, because no product uses both.** `[data-surface="inverse"]`
(a dark island in a light product) and `[data-surface="inset"]` (a light island in a dark
one) are one job seen from either polarity, and a product has one page polarity. The inset
scope had no link remap at all before this, which is a second defect the same token closes:
VTS's light chrome and fields kept sorbet-300, its dark-page stop, at 1.60:1 on
limestone-200.

**Matched on measured contrast, not on stop number**, because the ramps are not perceptually
aligned - fire-350 reads 6.16:1 on gloaming-700 where sapling-350 reads 7.49, so COM takes
400 and lands at 6.63 rather than being brighter than the link it replaces.

| Product | reversed ground | link | hover | reads |
| --- | --- | --- | --- | --- |
| chc | gloaming-700 footer / 800 tooltip | fire-350 | fire-250 | 6.16 / 8.60 |
| cm | gloaming-700 | coffee-400 | coffee-300 | 7.44 / 9.17 |
| mt | gloaming-700 quote band | fire-350 | fire-250 | 6.16 / 8.60 |
| contentious | gloaming-750 dark band | fire-350 | fire-250 | 6.85 / 9.56 |
| com | gloaming-700 footer | sapling-400 | sapling-300 | 6.63 / 8.42 |
| vts | limestone-200, a light island | sorbet-700 | sorbet-750 | 6.91 / 8.68 |

**The danger pair stays hardcoded fire, and that is correct rather than an oversight.**
Danger is fire in every product, accent or not, per the states decision of 1 August, and the
inverse scope is only ever applied to a dark island, so the pale fire stops are right in it.
A product whose reversal runs the other way uses the inset scope, where danger inherits the
product's light-ground values - which is what a light island wants. Stated at both scopes so
nobody "fixes" it.

**Worth a sweep when someone next opens this file.** Two defects of this shape in one day
says the pattern is the problem, not the instances: for every `[data-surface]` scope, check
that every role it remaps is a signature token or a family constant, and that every role it
does NOT remap still holds on that ground. `--text-secondary` on a deep card is the one
still open.

## The footer goes paler, and the first COM artwork lands

**`.c-footer` description and both heading levels move `--text-secondary` ->
`--text-body`**, on Julius's call: limestone-700 to limestone-400 on the inverse ramp, 9.57:1
to 13.03. All three move together so the hierarchy cannot invert - a description brighter
than the heading above it - and the legal line stays at `--text-muted`, still the quietest
thing there. **This supersedes the 4 August "nothing in the footer is bright" line**, which
is rewritten in place rather than deleted, because half of its reasoning survives: the
display cut carries the hierarchy on face and size rather than on ink. Worth knowing what it
spends - on this ramp `--text-body` is 13.03 and `--text-strong` is 13.77, so the footer is
now within 0.7 of the brightest ink in the system, and `--text-strong` stays refused for a
sharper reason than before: it would buy 0.7 and cost the wordmark its distinction from the
paragraph under it.

**Two new images, and they are two cuts of one mark.** `images/com-apparatus.png` is the
lino-cut apparatus - transparent, 1200px square, the first artwork drawn to COM's register
rather than borrowed. It carries the hero, the header mark at 40px and the footer mark at
29px, which is Julius's call. Worth stating what the small sizes do: the drawing holds about
thirty elements, so at 40px they average four pixels each and it reads as a texture and a
silhouette rather than as a machine. That is a legitimate thing for a mark to do, and it is
recorded rather than assumed. `images/com-cog.png` is the **favicon**: one shape, sunshine
cog with a gloaming hub and a sapling centre, which is what survives 16px where the
apparatus cannot.

**Two cuts of one mark is already the house pattern** - CHC ships `clipboard-gloaming.png`
and `clipboard-pale.png` for light and dark grounds. This pair splits on **size** instead,
which is a second axis and the first time the system has one. If a third product does the
same, the naming wants a convention rather than two ad-hoc suffixes.

**Still to produce on your side:** the favicon as an actual `.ico` or the `.png` size set a
browser asks for. The reference page links `images/com-cog.png` directly, which works and is
not what ships.

## What is not done, and what needs a decision

- **The favicon file set.** The cog exists as a PNG; the `.ico` and the size variants a
  browser expects do not.
- **The published three-layer diagram is fire and sunshine, and the product accent is
  sapling.** The diagram exists and is live, and it predates this block. Either it is
  recoloured (`why` at the centre in sapling-700, the other six in sunshine, which is what
  the accent and marker pair already says) or COM's accent is reconsidered against its own
  centrepiece. **A decision for Julius, not for either side to take quietly**, and nothing
  in the token layer is blocked on it.
- **The library's surfaces.** A browseable, deep-linkable catalogue of 30 to 50 components
  is a working surface in everything but name, and it arrives with v1. `--surface-card-deep`
  is declared and measured for it: a component entry is a different kind of thing from the
  section it sits in.
- **The Content Layer.** Pitched as the pair to COM: design your Content Operating Model,
  run it on The Content Layer. It has no block, and when it gets one, COM's neutrality is
  what leaves it the whole palette.

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

**A round is a diff, not a folder, and this is the manifest for it.** The export is 163
files: 150 text and 13 images. The images are 2.1MB of the 2.3MB and have changed once, on
4 August. Today's two rounds touched **34 files: 32 text and two new images**. That is the number to ask the
DesignSync API for, not 163.

```design-sync-manifest
round: 2026-09-07b
covers: both of today's rounds - the front-door pair plus Maturity Tool, and Content Operating Model. Union, so applying this list once is enough
source: Claude Design project, design-system/
target: skills/contentious-design/
images-changed: yes - TWO FILES ADDED, images/com-apparatus.png and images/com-cog.png. The other 13 are untouched
fonts: excluded (the repo's top-level fonts/ is authoritative)

changed:
  CHANGES.md
  SKILL.md
  components/components.css
  Design system.html
  tokens/semantic.css
  guidelines/pattern-marketing-page.html
  tokens/products.css
  components/components.css
  components/data/ScoreHistory.jsx
  components/data/ScoreHistory.d.ts
  guidelines/pattern-marketing-page.html
  guidelines/pattern-product-signatures.html
  guidelines/pattern-com-page.html
  readme.md
  components/marketing/Eyebrow.jsx
  components/marketing/Eyebrow.d.ts
  components/marketing/Eyebrow.prompt.md
  components/marketing/Divider.jsx
  components/marketing/Divider.d.ts
  components/marketing/Divider.prompt.md
  components/marketing/Hero.jsx
  components/marketing/Hero.d.ts
  components/marketing/Hero.prompt.md
  components/marketing/PullQuote.jsx
  components/marketing/PullQuote.d.ts
  components/marketing/PullQuote.prompt.md
  components/marketing/PriceBand.jsx
  components/marketing/PriceBand.d.ts
  components/marketing/PriceBand.prompt.md
  components/marketing/Steps.jsx
  components/marketing/Steps.d.ts
  components/marketing/Steps.prompt.md
  components/marketing/marketing.card.html

deleted: none

not-exported-wholesale:
  provenance/Maturity Tool site audit 2026-09-07.html  ->  docs/design-history/
```

**Why the manifest matters more than which transport carries it.** `readme.md` names the
one real risk in this arrangement: Claude Design cannot commit, so a stale skill in the repo
is always one forgotten export away. That is equally true of the zip route and the API
route. What closes it is a round having a **declared, checkable file list and a date**, so
`docs/design-system-stamp.json` has something to compare against and
`npm run check:design-sync` can fail when the repo's stamp is older than this file's
`round:`.

**Two cases where the manifest is the wrong tool and the zip is right**, and they are worth
naming because they are the ones that would break silently:

1. **Deletions and restructures.** A targeted pull adds and updates; it does not remove a
   file this project deleted. The `deleted:` key exists for that, but a folder move (like
   the 30 July restructure) is a wholesale operation and rsync should do it.
2. **Image rounds.** 13 files, 2.1MB. `images-changed: yes - TWO FILES ADDED, images/com-apparatus.png and images/com-cog.png. The other 13 are untouched` is the signal to skip them
   entirely, which is what most rounds will say.

If `CHANGES.md` carries no manifest block at all, that is itself the signal to fall back to
the zip: an absent list is not the same as an empty one.

### Prose summary of the same round

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

# Changes — 5 August 2026

**This file is the handoff channel, and it lives inside the export on purpose.**
`github.md` sits at the Claude Design project root, which is *outside* `design-system/`,
so it never reaches the repo. Everything Claude Code needs to know about a round belongs
here, because this folder is what gets exported wholesale.

Each export overwrites this file with the current round. Older rounds are in
`docs/design-history/` on your side and `provenance/` on ours.

**Two rounds landed on 5 August and both are below.** Dots and bullets first, because it is
the smaller one and it answers an open handoff (`chc-431`); the chart round follows.

---

# Round 2 · Dots, markers and bullets

**Full workings:** `provenance/Dots and bullets decision 2026-08-05.html`. Answering the
`chc-431` handoff: the priority dot the chip sweep deliberately left, the six hand-built
round markers around it, and the eight `list-disc` lists in the legal pages.

## What changed

- **The defence in `report.tsx` holds and the site was correctly left unswept.** "The colour rides on a small dot so the label text stays high-contrast" is *a level is never text* applied to something that is not a level, which is the same move `ScoreValue` makes. What the sweep missed is that its options were not chip-or-nothing: **`Chip bare` already exists for exactly this case** and its note says so, in almost the words of the objection ("five stacked opportunity cards each with a solid chip is too loud").
- **There is no `c-marker` and there will not be one.** Six sites shared a *shape*, and a shape is not a component — a circle with no owner is an invitation to assert a colour anywhere on a page. A dot belongs to whatever carries its meaning. What the system gains instead is **two tokens: `--marker-size` (`calc(var(--u) * .39)`, ~7.4px at the app base) and `--marker-ring` (1.5px)**, plus `--marker-color` (`--text-secondary`). Three sizes become one and it moves with density.
- **The bare chip's dots were read as spending reserved score colour, and the reservation is what moved instead.** `fire-500`, `sunshine-500` and `sapling-500` **are** `--star-1`, `--star-3` and `--star-5`, so the first answer was to retone the dot to the tone foregrounds (`--danger-text` and friends). Drawn at size that fails: those four are dark warm values within a few points of each other, and at `--marker-size` they are one colour. Julius's objection was the wider one, and it wins: **the five stops are reserved against being *read* as a level, not withheld from the app.** The reservation binds an **unlabelled** mark - an orange bar in a chart reads as level 2 because nothing beside it says otherwise. Where a mark carries its own word, a 500 stop says what it is and nothing more. **So the dots stay exactly as they shipped**, sized off `--marker-size`. `sunshine-500` at 1.81:1 is acceptable here for the same reason and would not be on a chart mark: the dot is not the only carrier of the fact.
- **Nothing in the chart layer moves, which is the test of whether that narrowing is safe.** `--categorical` and `--process-*` exist because a bar in a chart of numbers is unlabelled by construction, and both stay as written. The rule next door does not move either: colour still has to mean something. This widens what the ramp may be used for, not what colour is for. Recorded in `readme.md` under the level ramp and beside `--star-1` in `semantic.css`.
- **Fill versus ring is sanctioned, as a state of a list item rather than a property of dots.** Filled means done or shipped, `is-pending` is the ring. Same size, same colour, one variable. **Both are neutral and the fire goes:** fire means primary, active, star 1 and danger, and a shipped changelog entry is none of those — neutral also leaves the pair free to say done-and-not-yet in any list without spending a meaning colour.
- **New `Bullets` / `.c-bullets`: the bullet, everywhere, and the only one.** Marker in its own column so text hangs indented, one size, gap off `--u`, `--timeline` for a hairline down the marker column, `--spaced` for paragraph-length items. **`list-disc` and `list-inside` are retired suite-wide, legal pages included** — `list-inside` runs a wrapped line back under the marker, which is visible on every long item in `privacy.tsx`. It is deliberately **not** `c-list`: that name is the aligned data list.
- **The priority dot survives as `Chip bare`: `high` → `bad`, `medium` → `warn`, `low` → `neutral`.** On rank versus status: the tone names describe strength of signal, not brokenness, and `bad` is what a reader acts on first. `low` takes `neutral` rather than `info` because low priority is the absence of a signal, and wave is spent on focus. A priority ramp of its own is refused — it would be a second meaning scale differing from the tone scale only in intent.
- **The two chart legend dots leave the marker question entirely.** A legend swatch takes the shape of the mark it names, so in that chart it is a **square at `--radius-chart`** from the chart palette, in the chart theme. One swatch, one size; the 10px/12px pair collapses.
- **`PresenceBadge`'s `●` is refused on two existing rules**: no unicode glyph as an icon (it cannot be sized off `--u` and carries the font's metrics), and `sapling-600/45` is an opacity modifier on text, which is an undeclared text level. It becomes `Chip bare tone="good"`, static — a monitored page is a state, not activity, so the 1.6s pulse stays reserved.
- Applied here: `tokens/semantic.css` (the three marker tokens, and the ramp reservation narrowed to unlabelled marks), `components/components.css` (bare dot sized off `--marker-size`, new `.c-bullets`), **new `components/core/Bullets.{jsx,d.ts,prompt.md}`**, **new `components/core/bullets.card.html`** specimen, `components/core/Chip.{jsx,prompt.md}`, `readme.md`, `Design system.html` (new Markers &amp; bullets chapter).

## Note on the reservation, for review

The narrowing is the only thing in this round that touches a headline rule, so it is worth
stating what it does **not** license. A 500 stop is free where the mark carries its own word.
It is not free on a data mark, a chart mark, a bar, a segment, a cell, or any fill whose
meaning a reader has to infer from its colour - all of those are still `--categorical`,
`--comp-*` or `--process-*`. And a labelled mark still has to be worth colouring: colour
means something or it is not applied.

## Your side

1. **`src/styles/semantic.css`** — `--marker-size`, `--marker-ring`, `--marker-color`. None is a signature token: a marker size does not vary by product, so **no theme file changes**.
2. **The `Badge` bare variant in `@contentious/ui`** — size the four dots off `--marker-size`. The colours do not change; only the geometry does.
3. **`report.tsx`** — `PRIORITY_DOT` deletes outright; the span becomes `<Badge bare tone={PRIORITY_TONE[o.priority]}>` with `high` → `bad`, `medium` → `warn`, `low` → `neutral`. The three colours are the ones already on the page, so this is a markup change rather than a visual one. Keep the defending comment, pointed at the provenance doc instead of at itself.
4. **`changelog.tsx`** — both markers become one `Bullets` with `timeline`; shipped entries filled, coming-soon `pending`. The `h-3.5 w-3.5` node, the 2px limestone halo and the `border-fire-500/40` ring all go: the halo existed to separate the dot from a line that now stops at the marker.
5. **`inventory.tsx`** — `PresenceBadge` becomes `Badge bare tone="good"`.
6. **`criteria-trend.tsx`** — if the heatmap from the chart round has already taken the thirteen-item legend with it, there is nothing to do here. If any legend survives, it is one square swatch at `--radius-chart` and `--marker-size`.
7. **`privacy.tsx` (×7) and `terms.tsx` (×1)** — `list-disc list-inside` → `Bullets`. Mechanical, and the cheapest item on the list.

### Check worth adding

- **No `rounded-full` on anything smaller than a control, outside `c-chip`, `c-bullets` and `c-score`.** That is the marker rule in a form review can apply, and it is how six of these appeared without anyone deciding to add a marker.

### Open

- **The four `prose` configurations** across privacy, terms, learn-article and about (audit Part 2). The bullet was the part of that finding with a component-shaped answer; the rest is a reading-surface question — measure, leading, heading scale on a long page — and wants its own round. Point all four at `Bullets` for lists meanwhile.

---

# Round 1 · Chart coherence

**Full workings for this round:** `provenance/Chart coherence decisions 2026-08-05.html`,
with the side-by-side specimens in `explorations/Chart family.html`. This round is about
CHC's nine charts and it is mostly *your* side: two tokens and one component change land
here, the rest is geometry in six app components.

---

## What changed

- **Four of the nine charts were already a set, and nothing in this round invents a chart style.** The bubble chart, the two stacked bars and the Nivo donut agree on five traits, and each trait is a rule the system already had: square ends (the arc-length rule), the star ramp, the one legal spring, `CHART_TOOLTIP`, serif legend on sans ticks. The five charts that feel wrong are the five that were each built on a day when one of those rules was not reached for. So the work was to close the two questions the set never had to answer — **how thick is a ring, and what does a corner do** — and then apply the answers everywhere. The five traits are now documented as a page: **new `guidelines/chart-family.html`**.
- **The gauge ring goes from 0.07 of its diameter to 0.16, the donut comes down from 0.20 to meet it, and the per-size ramp is deleted.** Band width over outer diameter: the Nivo donut is **0.20** (`innerRadius={0.6}`), the hand-rolled estate donut 0.17, the gauge at `lg` **0.07** — a third of the weight of the mark it sits beside on the same page. It was also inconsistent with itself (0.13 sm / 0.093 md / 0.07 lg) on a rationale that does not survive measurement: the ramp existed so a small badge would "hold its colour", and 0.2 gives `sm` a **9px** band where 0.13 gave it 6px, so it was solving its stated problem in the wrong direction. **New `--ring-band: 0.2`** in `semantic.css`, read by JS because a stroke width is a geometry input rather than a property; `ScoreGauge.jsx` now derives `stroke = round(box × 0.2)` and no longer carries a per-size table. lg 200/40, md 86/17, sm 46/9. **One thing to check:** at 0.2 the `sm` badge's inner diameter is 27.6px — two digits fit comfortably, nothing is spare, so verify a three-digit 100 before that box changes.
- **New `--radius-chart`, `var(--border-radius-sm, 3px)`, and it replaces three different answers.** Bars ship square, the Nivo donut ships `cornerRadius={4}`, the criterion bars and the estate bars ship fully round — and 4 is not on the 3/6/12 scale. One value now covers every bar end, arc corner, heatmap cell and sparkline bar in the suite. **It does not join the signature set**: a corner does not vary by product. The rule it is careful not to disturb is the one written for the gauge — **a radius rounds a corner inward and removes material, so it is legal at any size; a cap adds half a stroke width beyond the value and stays banned.** Round the corners, never the ends.
- **The criterion bars have three defects and the corner is the least of them.** `rounded-full` on a 24px bar adds 12px per end, so 3% draws at the length of 7% — the gauge's cap defect on a different mark. Worse: the bar is scaled **against the largest value rather than against 100**, so every criterion's biggest bar is full width, no two criteria can be compared, and the chart looks identical whether a level holds 40% or 95%. Third, any value under 8% is **replaced by a 24px circle**, so 1% and 7% draw identically and both draw longer than an honest 3% bar. All three go: `--radius-chart`, scale to 100, no substitution. A 2% bar in a 700px column is 14px and the tooltip carries the figure anyway.
- **The estate donut is swapped for the Nivo donut, and the three habits it had are recorded so they do not come back.** Julius's call, and it needs no argument. But: the `limestone-100` 2px seam is a near-white line *inside* one mark where everything else in the family separates segments with a gap; **`opacity: 0.78` on inactive segments is a sixth colour the palette never declared** — the opacity-modifier rule from 1 August, in a chart — and hover should move geometry (`activeOuterRadiusOffset`) rather than alpha; and the permanent hover panel is a legend that changes, so something is always asserted next to the chart. The family's answer is a tooltip on request and a legend that stays put.
- **The estate bars come into the family too** (Julius added them to scope). 10px tall becomes a 24px row, `--radius-chart` replaces the full round, the `gloaming-500/10` literal alpha becomes **`--comp-track`**, and the label moves **into** the bar — which is what makes them the same object as the criteria breakdown: one row, one bar, the name in it, the figure at the end. Colour stays `--categorical`; a section name is not a verdict, and that rule already has its worked example on this exact chart.
- **The two line charts cannot be fixed by styling, and the number is four pixels.** A 0–100 axis in a 440px box makes one pixel worth 0.26 of a score, so the estate score's 80 → 81 is **four pixels of travel in a 380px plot**. **The estate trend stays a line and the five score bands become its ground** — that changes the question from "how far did it travel" to "which band, and how close to the edge", which two points can answer. Area fill out (a filled region under a score implies an accumulated quantity), curve linear (monotone invents readings between snapshots months apart), dot 18px → 10px (the hover target is the full-height column, so the dot was large for nothing), line 3px → 2px. The y-domain may be padded to the data **only with the bands drawn**; a zoomed axis alone turns noise into news.
- **The criteria breakdown becomes a heatmap: criteria down, months across, cell on the star ramp.** Thirteen series all averaging into the 60s and 70s occupy the same fifth of the plot and cross; the `DEFAULT_VISIBLE = 5` is the chart admitting it. A month holding several runs stacks its points on one x position, so the tangle is worst where the data is densest. In a heatmap nothing shares an axis so nothing can cross, fifty runs in a month is still one cell, and **it improves as data accumulates** — it gains columns where the line gains crossings. Sort by latest score so the weakest criteria are at the top; keep click-to-focus as a row highlight and drop the thirteen-item toggle legend. **Stream and area bump were asked about and both are rejected**: they stack, and thirteen independent averages out of 100 do not sum to anything, so a band's thickness would mean nothing. The bump chart is rejected for a better reason — it fixes the tangle, but a criterion can climb four places while its score falls, which on this page is a trap rather than a finding.
- **`criteria-trend.tsx` asked us what the categorical palette is past four, and the answer is that there isn't one.** The file deserves credit for asking rather than inventing. **There is no categorical palette past `--comp-4` and there is not going to be one** — thirteen hues cannot be told apart whichever families they come from, so the honest reading of that fifteen-colour palette is that the chart was wrong. **More than four categories at once is a chart-type decision, not a colour decision**: small multiples, a heatmap or rows, all of which encode the category by *position* and leave colour to the value. Recorded in `semantic.css` beside `--comp-4`. The palette is deleted with the chart that needed it.
- **Where the shared chart rules live, since you left it to us: here as a page, one theme object there.** `chartSpring()` and `CHART_TOOLTIP` are both right where they are — one reads the motion tokens, the other only means anything inside Tailwind. What is missing is above them: **the per-chart `theme={{…}}` literal is duplicated across four files with three different tick sizes**, and that should collapse into a single `CHART_THEME` beside `CHART_TOOLTIP`. Not a component library: Nivo owns the marks, we own the surface and the geometry. That split is the same reasoning `chart-tooltip.ts` already argues for itself, and it was right.
- **Found while measuring, and it is yours: every chart tick in the product is in the wrong face.** All four Nivo `theme` literals specify `fontFamily: "var(--font-sans), sans-serif"`, and **no stylesheet in the suite declares `--font-sans`** — so the var is invalid at computed-value time and every axis tick, every legend item and every cell label falls through to the browser's generic sans. Nothing looks broken, which is why it has survived. The system's metadata voice is **`--font-mono`** (a system stack, not Courier — settled 1 August, item 11), and the axis legend is `--font-body`. Fix it in the one `CHART_THEME` rather than in four places, and it is worth a check: **a `var()` in a chart theme resolves in JS, not in CSS, so a missing token degrades silently instead of erroring.**
- Applied here: `tokens/semantic.css` (`--radius-chart`, `--ring-band`, the categorical-past-four rule), `components/data/ScoreGauge.jsx`, `components/components.css` (`.c-series` corners, the gauge stroke note), four `prompt.md` files (`ScoreGauge`, `ScoreHistory`, `CompositionBar`, `MicroSeries` — each now carries the five traits), `Design system.html` (Charts section), and **new `guidelines/chart-family.html`**.

---

## Your side

Roughly in dependency order. Nothing here is a design decision; the decisions are above.

1. **`src/styles/semantic.css`** — `--chart-font`, `--chart-numeric`, `--radius-chart` and `--ring-band`, plus the
   categorical-past-four comment. Neither is a signature token, so **no theme file changes**:
   a corner and a band ratio do not vary by product. Worth checking the Tailwind bridge —
   `--radius-chart` will emit a utility by name prefix, which is fine, and `--ring-band` is a
   unitless number in the same position `--color-text-multiplier` was found in on 1 August.
2. **`score-gauge.tsx`** — replace `DIMS` with a box map plus `BAND = 0.16`; stroke derives.
   The doc comment's "13% / 9% / 7%" paragraph is now wrong and should say why it went.
   Then check `score-gauge.test.tsx`: it almost certainly asserts stroke widths.
3. **`criterion-bar-chart.tsx`** — the three defects. The scale change is the one with teeth:
   `barWidth` becomes `count` (the backend already sends a percentage), and
   `shouldShowCircle` and its branch delete outright.
4. **`estate/charts.tsx`** — `DonutChart` is replaced by `ResponsivePie` at
   `innerRadius={0.6} padAngle={2} cornerRadius={3} activeOuterRadiusOffset={8}`, the
   permanent panel becomes `CHART_TOOLTIP` on hover, and the `limestone-100` stroke and
   `opacity 0.78` both go. `HorizontalBars` goes to a 24px row, `--comp-track`,
   `--radius-chart`, label inside the bar. `freshnessSegments` is unchanged.
5. **`charts/score-line-chart.tsx`** — bands as the plot ground (a `layers` entry beneath
   `grid`), `enableArea` off, `curve="linear"`, `pointSize={10}`, `lineWidth={2}`.
   `enableSlices="x"` stays; it is what makes the small dot fine.
6. **`estate/criteria-trend.tsx`** — becomes the heatmap. The `PALETTE` const and
   `DEFAULT_VISIBLE` both go with it. Same query, same `criterionAverages` shape.
7. **One `CHART_THEME`** beside `CHART_TOOLTIP`, and the four inline `theme={{…}}` literals
   point at it. Tick 12px sans, axis legend 14px `--font-body`, grid `--rule-row`.
8. **`cornerRadius={4}` → `{3}`** on the page-analysis pie, and `--radius-chart` on the
   pipeline progress bars.

### Checks worth adding

- **No chart may set a corner radius that is not `--radius-chart`.** Three of the nine set
  their own, and one of them (4) is not on the radius scale at all.
- **No chart may draw a mark with a round cap.** The gauge was fixed for this in July and the
  criterion bars have had the same defect the whole time, on a different mark. It is greppable:
  `strokeLinecap="round"` and `rounded-full` on anything inside a chart.
- **A bar that encodes a percentage is scaled against 100, not against the largest bar.**
  This one is not greppable and is the most damaging of the three defects, so it wants a note
  in review rather than a test.

### Open, and worth flagging

- **The page loading graphic.** Julius added it to scope and it is the one thing that may not
  belong to this family at all: it is **chrome, not data** — nothing about it encodes a value,
  so the five traits do not obviously bind it, and the motion rule that governs it is the
  chrome one rather than the chart spring. It needs a decision about which family it joins
  before it is styled to match anything.
- **Level fills under 3:1**, unchanged from 4 August. olive-500 is 2.22:1 on a pale card. A
  thicker gauge band makes the mark read better and does not move the ratio; the ramp itself
  would have to move, and "five dark stops stop reading as a ramp" still rules that out.

---

## Revised at review, 5 August

Julius reviewed `explorations/Chart family.html`; five things changed and each is recorded
beside the original reasoning in the provenance doc. **Read this section after the bullets
above — where the two disagree, this wins.**

- **The ring ratio is 0.16, not 0.2, and the donut moves down to meet the gauge.** `innerRadius = 1 - 2 x band`, so the freshness donut goes **0.6 → 0.68** and the gauge 0.07 → 0.16: lg 200/**32**, md 86/**14**, sm 46/**7**. "Already shipping" was a tie-breaker rather than an argument, and two things support the smaller number: at 0.2 **the gauge band is thicker than a criterion bar is tall**, and the `sm` badge gets 32px of inner diameter instead of 27.6px, which is the difference between a three-digit 100 fitting and not. `--ring-band` and `ScoreGauge.jsx` are at 0.16 here.
- **The score bands go to FULL strength and the line becomes `--limestone-200`.** A 13% tint read as a printing accident, and a tint beside a saturated line is two strengths of the same five colours doing different jobs on one chart. At full strength the ramp is the ramp and the line is a thread carrying only the shape. **Check the line on all five grounds** — limestone-200 holds on sunshine and sapling, the two brightest, and a `--surface-card` halo is available if it does not.
- **The heatmap gains a per-row sparkline scaled to that row's own range, labels every month, and drops the year.** Most cells will be olive and that is the encoding working: the bands are 90/70/50/30, most estates live between 70 and 89, so a flip is rare and therefore significant. But a chart where nothing changes for a year looks broken, so the cell says which band and the sparkline says which way it is moving inside it. No sixth colour is invented to show a fifth of a band.
- **A label inside a mark moves outside it when it does not fit the drawn width.** "Contact" holds one page of forty-six, so its bar is 31px and the name is unreadable at any weight; a label you have to hover for is not a label. Inside the fill it is `--limestone-200`, outside it is `--text-secondary`, because outside the fill it is text on a card. **This applies to the stacked bars too** — they have the identical failure on any criterion whose 5-star segment is short. Same rule, two components.
- **Ties settle the bump chart, which was the only other option Julius liked.** Scores tie constantly at whole numbers and a rank has nowhere to put a tie: two criteria on 77 take two rows, the tie breaks on whatever the sort is stable on, and next month it breaks the other way — so **the chart draws a crossing where nothing happened**. It is the only encoding here that can manufacture movement out of no change, and there is no styling fix. A heatmap is untroubled: two criteria on 77 are two cells of the same colour.

---

## Second review, 5 August

Six more comments, and three of them reverse something above. **Where this section and anything
earlier disagree, this wins.**

- **The in-bar label on the estate bars is WITHDRAWN, and so is the flip-outside rule.** Julius: "this is ugly… I'd rather deal with the overlap, or revert to label above." He is right, and the flip was the weaker half of the idea — **a label has one position, not two**; two positions give a set of rows a ragged left edge and a rule the reader has to work out. So the name goes **above** the bar, which is what the shipped version already had right, in the **body face** rather than mono. The family resemblance comes from the geometry alone: 24px row, `--radius-chart`, `--comp-track`. **The stacked bars are a different case and keep their in-bar label** — it sits at a fixed offset in the row rather than inside a segment, so its position never depends on the distribution. They do want a contrast check: `--limestone-200` on a sunshine or sapling segment is pale text on the brightest colours in the ramp.
- **One rule for absence, asked of three charts: the time axis is the full twelve-month window and the data starts where the data starts.** Nothing before the first snapshot — no line, no dot, no cell colour, and **never a flat run at zero or at the first value** (the defect `ScoreHistory` already records for the single-point case). The empty part of the window is **the account being young**, and drawing it is what lets these charts appear from the first snapshot instead of hiding until they look respectable. In the heatmap, empty months are **`--limestone-700`** cells: a grid filling up over a year is the most legible thing on the chart in its first year, and it answers "when do we first show this" with "immediately".
- **The bump chart is ADOPTED as well, and my tie objection is overruled.** Julius: the heatmap is about absolute progress towards a finish line, the bump is about relative strength across the framework, and the second always flexes where the first mostly does not. Both ship, and the second is not redundant for plotting the same numbers. On ties — two criteria on 77 take two rows, the tie breaks on the sort, and a re-sort can draw a crossing where nothing happened — that is disqualifying only if the chart is read as measurement, and it is not. **Break ties alphabetically** so the order is stable between renders, and **put the scores in the tooltip** so a crossing can be checked. The general form is worth keeping: a defect counts against a chart only if it corrupts the reading the chart is for.
- **The heatmap's row sparkline moves into the tooltip on the criterion name.** Julius's placement and better than either option: the grid stays one encoding readable at a glance, and the movement inside the band arrives where someone is already pointing. One `MicroSeries` at a time instead of thirteen, on the tooltip surface the family already has.
- **Names are Bely, ticks are the mono role.** A criterion name down the side of a grid is content; a tick, a count and a date are metadata. **Watch the mechanism** — in SVG a CSS rule beats a `font-family` presentation attribute, so a blanket `svg text{}` rule silently overrides every per-element face. That is a second instance of the same class of bug as the `--font-sans` finding: chart type falling back without erroring.

- **Score axes are labelled every 10** rather than at the band boundaries, because the bands are the ground and already legible as colour, so the axis is free to be a regular scale a reader can count against.
- **New `--chart-font` and `--chart-numeric`, and the type trait ends SIMPLER than the round started: one face for everything a chart draws.** It is **a token rather than a reference to `--font-body`** on purpose: chart type is then one switch for the whole suite if mono ever wins the argument, and "nothing inside a plot names a second face" becomes checkable. Its value is Bely. Ticks, axis legends, row labels, cell labels. Two versions were tried and withdrawn on the way — "serif legend, sans ticks" (what ships) and "Bely for names, mono for values" — because both put **two faces inside one chart, which is a distinction no reader takes as one: it reads as a mistake**, and in Nivo it is a per-element override waiting to drift. **It is Bely rather than the mono role for the reason that matters most here: a chart is part of the app, not a widget dropped into it.** The axis in the same voice as the card title above it is what makes a chart look built rather than embedded, and the shipped charts already prove it works. Set `font-variant-numeric: tabular-nums` so a column of figures does not shuffle. **A metric beside a chart is still `--t-metric` in Bely Display and belongs outside the plot** — an HTML element next to the SVG, not a `<text>` inside it, because a CSS rule beats a presentation attribute and an in-SVG exception silently loses. For you this is **one `fontFamily` in one `CHART_THEME`** in place of four theme literals with three tick sizes, and the cheapest thing on the list to check.

- **The composition bar was the last round mark, and it was the worst of them.** `.c-comp` shipped a `calc(--u * .28)` radius — about **5px on a 9px bar, more than half its height** — so it read as a pill, and a short bar is where an off-scale radius shows most: the two end segments lose material at their corners while the middle segments keep theirs, so the outer values draw slightly short. Now `--radius-chart` like everything else. The legend swatches were a literal `2px` and take the same token. Applied in `components.css`, `CompositionBar.prompt.md` and the Charts chapter.

- **"Bar over donut, always" is withdrawn — it was a slogan, and it was not true.** The suite uses a donut where **percentage composition matters more than the counts**: freshness is "90% of your estate is fresh", and nobody needs to compare 41 pages against 4. The rule is now the reading rather than the mark, with two tests a reviewer can apply. **Can the reader do the comparison the chart implies?** Segment lengths in a row can be compared; arc lengths at different angles cannot, so a donut is only honest when one slice dominates or the exact ordering does not matter. **How many segments?** Past three or four a donut is a legend with a picture attached. Also removed: "donuts are reserved for content freshness", which was a list of approved pages standing in for a test — and a reminder that a ring is not necessarily a composition, since `ScoreGauge` is one value against a maximum. Applied in `readme.md`, the Charts chapter, `CompositionBar.prompt.md` and `data.card.html`.

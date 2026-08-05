A score over time. **Axes are permitted here and nowhere else** – the "no axes, no gridlines" rule was written for `MicroSeries`, where the shape is the whole message. A history chart has a different job: the reader needs to know *when* a score moved and by how much.

```jsx
<ScoreHistory note="Recorded each time the page changes and is re-scored."
  points={[{score:61,label:'12 Mar 26'},{score:68,label:'17 Jun 26'}]} />
```

**The score bands are the plot's ground, at full strength, with a `--limestone-200` line over them.** A 0–100 axis in a tall box makes every real movement invisible: CHC's estate trend moved 80 to 81, which is four pixels in a 380px plot, and no styling of a line fixes four pixels. Drawing the five bands as tinted zones behind the line changes the question from "how far did it travel" to "which band is it in, and how close to the edge", which two points can actually answer. The y-domain may be padded to the data, but only with the bands drawn — a zoomed axis on its own turns noise into news.

**Full strength, not a tint.** A 13% band next to a saturated line puts two strengths of the same five colours on one chart doing different jobs, and at that opacity the bands read as a printing accident. At full strength the ramp is unmistakably the ramp and the line becomes a thread whose only job is the shape. The line must hold on all five grounds: `--limestone-200` does on sunshine and sapling, the two brightest, and a `--surface-card` halo is available if a product's ramp makes it fail.

**No area fill, no curve, 10px points.** A filled region under a score implies an accumulated quantity, and a monotone curve invents readings between two snapshots that were months apart. The line is linear at 2px and the hover target is the full-height column, not the dot, so the dot does not need to be 18px.

- Point colour comes from `scoreToLevel`, so it agrees with the stars and the gauge.
- **More than one series is a different chart.** Two or three lines on one score axis is a history chart; thirteen is a tangle, because every criterion averages into the same fifth of the plot and they cross. Past three series, plot criteria down and time across as a **heatmap** with the cell on the star ramp: no crossings, one cell however many runs a month held, and it improves as months accumulate instead of getting worse. **Give each row a sparkline scaled to its own range**: most estates live between 70 and 89, so most cells are level 4 and a year can pass with no cell changing colour — the cell says which band, the sparkline says which way it is moving inside it, and no sixth colour is invented to show a fifth of a band. **Label every period, not every other one**, and drop the year: a twelve-month window crosses one boundary and the card's title carries it.

**A bump chart is the legitimate second view, not a rival.** The heatmap answers absolute progress against a fixed finish line, so it is mostly one colour and moves rarely; a bump chart answers which criteria are the strong ones, which always flexes. Two charts, two questions. **Its known flaw is ties**: scores tie constantly at whole numbers and a rank has nowhere to put one, so two criteria on 77 take two rows and a re-sort can draw a crossing where nothing happened. That is disqualifying only if the chart is read as measurement, and this one is read as broad relative strength. **Two things keep it honest** — break ties alphabetically so the order is at least stable between renders, and put the scores in the tooltip so a crossing can be checked.

**A per-row sparkline belongs in the tooltip, not in the grid.** Movement inside a band is real and a cell colour cannot show it, but thirteen sparklines put two encodings in a grid meant to be read at a glance. One `MicroSeries` on the criterion name's tooltip serves the person actually asking about that criterion. Stream and area-bump charts are refused — both stack, and independent averages out of 100 do not sum to anything.
- **The time axis is the full window, and the data starts where the data starts.** Twelve months of axis whether or not the account is twelve months old. Nothing is drawn before the first snapshot: no line, no dot, no cell colour, and never a flat run at zero or at the first value. The empty part of the window is the account being young, and drawing it is what lets a chart appear from the first snapshot rather than hiding until it has enough data to look respectable. In a grid, empty periods are `--limestone-700` cells — a grid filling up over a year is the most legible thing on the chart in its first year.

**Score axes are labelled every 10**, rather than at the band boundaries: the bands are the ground and already legible as colour, so the axis is free to be a regular scale, and a reader placing a line between 78 and 80 needs a step to count against.

**One face for every piece of type the chart draws, named once as `--chart-font`**: ticks, axis legends, row labels, cell labels. A token rather than a reference to `--font-body`, so the suite's chart type is a single switch and nothing inside a plot may name a second face. Two faces inside one chart is a distinction no reader will take as one, so it reads as a mistake. Bely rather than the mono role because **a chart is part of the app, not a widget dropped into it** — the axis in the same voice as the card title above it is what makes it look built. Set `font-variant-numeric: tabular-nums` so a column of figures does not shuffle. A metric beside a chart is still `--t-metric` in Bely Display, and it belongs outside the plot: put it in HTML next to the SVG rather than as a `<text>` inside it. Note the mechanism that hides a mistake here: in SVG a CSS rule beats a font-family presentation attribute, so a blanket `svg text{}` rule silently overrides every per-element face. A criterion name down the side of a grid is content; a tick, a count and a date are metadata. Note that in SVG a CSS rule beats a `font-family` presentation attribute, so a blanket `svg text{}` rule will silently override every per-element face.

- **Fewer than two points renders an honest empty state.** A single point drawn as a flat line spanning the full width reads as "no change over time" rather than "only measured once" – that was a real defect on the live page.

Workings: `provenance/Chart coherence decisions 2026-08-05.html`.

## The chart family

Every chart in the suite holds five traits, and each one is a decision recorded elsewhere in the system rather than a preference. **Square ends** (a cap adds material the value did not earn). **`--star-1..5` for scores, `--categorical` for categories, `--comp-1..4` for composition, and nothing else** — past four categories the answer is a different chart, not more hues. **`--radius-chart` (3px) on every bar end, arc corner and cell**, and nowhere else. **The chart spring on first paint, once, no overshoot.** **One tooltip surface** — limestone-500 on a limestone-600 hairline at `shadow-md`. **The time axis is the full window and the data starts where the data starts** — never a flat run at zero before the first reading.

Rings all take one band ratio: `--ring-band`, 0.16 of the outer diameter (a donut is `innerRadius={0.68}`). **All chart type is one face, named once as `--chart-font`** (Bely) — two faces inside one chart reads as a mistake, and Bely is what ties a chart to the app rather than making it look dropped in. One token, so it is one switch. Workings: `provenance/Chart coherence decisions 2026-08-05.html`, specimens in `guidelines/chart-family.html`.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` — the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only; it is not an app token.

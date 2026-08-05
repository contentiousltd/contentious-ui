A part-of-total breakdown where the figures matter as much as the shares.

```jsx
<CompositionBar segments={[
  { label: 'AI analysis', value: 63, display: '$0.0084' },
  { label: 'Content extraction', value: 29, display: '$0.0039' },
  { label: 'Waste', value: 8, display: '$0.0011', color: 'var(--comp-4)' },
]} note="Waste is retries and failed jobs. Over 10% is worth investigating." />
```

Reads at a glance and works down to a 320px column. Max four segments; put loss/waste last in `--comp-4`.

**The corner is `--radius-chart`, and it used to be about 5px on a 9px bar** — more than half its height, so it read as a pill. A short bar is where an off-scale radius shows most: the end segments lose material at their corners while the middle ones keep theirs, so the outer values draw slightly short. Legend swatches take the same token.

**Bar or donut is a real choice, not a default.** Take the bar when the values are to be compared or read off: every figure is in the legend and the segments sit in one row, so their lengths can actually be weighed against each other. Take a **donut** when the share of the whole is the point and the figures are secondary — freshness is "90% of your estate is fresh", and nobody needs to compare 41 pages against 4. Two tests: **can the reader do the comparison the chart implies?** (arc lengths at different angles cannot be compared, segment lengths in a row can) and **how many segments?** (past three or four a donut is a legend with a picture attached). A ring is not necessarily a composition — `ScoreGauge` is one value against a maximum.

**Four is a hard ceiling and it is not about this component.** There is no categorical palette past `--comp-4`: thirteen hues cannot be told apart by anybody, whichever families they come from. So more than four categories at once is a **chart-type** decision — small multiples, a heatmap or rows, all of which encode the category by position and leave colour to the value. Settled 5 August 2026, when CHC's criteria trend was found assembling a fifteen-colour palette out of wave, coffee and sorbet.


## The chart family

Every chart in the suite holds five traits, and each one is a decision recorded elsewhere in the system rather than a preference. **Square ends** (a cap adds material the value did not earn). **`--star-1..5` for scores, `--categorical` for categories, `--comp-1..4` for composition, and nothing else** — past four categories the answer is a different chart, not more hues. **`--radius-chart` (3px) on every bar end, arc corner and cell**, and nowhere else. **The chart spring on first paint, once, no overshoot.** **One tooltip surface** — limestone-500 on a limestone-600 hairline at `shadow-md`. **The time axis is the full window and the data starts where the data starts** — never a flat run at zero before the first reading.

Rings all take one band ratio: `--ring-band`, 0.16 of the outer diameter (a donut is `innerRadius={0.68}`). **All chart type is one face, named once as `--chart-font`** (Bely) — two faces inside one chart reads as a mistake, and Bely is what ties a chart to the app rather than making it look dropped in. One token, so it is one switch. Workings: `provenance/Chart coherence decisions 2026-08-05.html`, specimens in `guidelines/chart-family.html`.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` — the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only; it is not an app token.

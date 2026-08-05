Trend over a small fixed window – 7 days, 12 months.

```jsx
<MicroSeries points={[34,52,41,78,63,22,88]} labels={['Thu','Fri','Sat','Sun','Mon','Tue','Wed']} />
```

No axes, no gridlines, no tooltips. When someone needs the figures they use the adjacent `<Metric>` or the CSV export.

Bars take `--radius-chart` on their top corners only, like every other bar in the suite. This is also the honest alternative to a full-width trend chart when the movement is small: a sparkline plus the figure beside it says "up 8 over twelve months" without pretending a four-pixel slope is a picture.


## The chart family

Every chart in the suite holds five traits, and each one is a decision recorded elsewhere in the system rather than a preference. **Square ends** (a cap adds material the value did not earn). **`--star-1..5` for scores, `--categorical` for categories, `--comp-1..4` for composition, and nothing else** — past four categories the answer is a different chart, not more hues. **`--radius-chart` (3px) on every bar end, arc corner and cell**, and nowhere else. **The chart spring on first paint, once, no overshoot.** **One tooltip surface** — limestone-500 on a limestone-600 hairline at `shadow-md`. **The time axis is the full window and the data starts where the data starts** — never a flat run at zero before the first reading.

Rings all take one band ratio: `--ring-band`, 0.16 of the outer diameter (a donut is `innerRadius={0.68}`). **All chart type is one face, named once as `--chart-font`** (Bely) — two faces inside one chart reads as a mistake, and Bely is what ties a chart to the app rather than making it look dropped in. One token, so it is one switch. Workings: `provenance/Chart coherence decisions 2026-08-05.html`, specimens in `guidelines/chart-family.html`.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` — the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only; it is not an app token.

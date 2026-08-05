A single score out of 100. **Not** the freshness donut – that shows slices of a whole, this shows one value against a maximum. They look similar, so never place them adjacent without a heading on each.

```jsx
<ScoreGauge score={68} size="lg" caption="Your content's health would benefit from some improvements." />
<ScoreGauge score={76} size="md" />
<ScoreGauge score={92} size="sm" />
```

**Gauge or rail?** Ask whether the score is the *subject* or one of several values. Subject takes the gauge, because the ring encodes the value twice, as a number and as arc length, and that earns the space only when it is the point. **At most one gauge per view.** A score among other values takes `ScoreValue`: the rail if its neighbours are quantities, the five-segment track if its neighbours are other scores. A column of rings cannot be scanned.

**Full 360, from twelve o'clock, clockwise. The arc must not extend beyond its value.** Both are correctness, not taste. The ring must be able to close, or 100 reads as "not quite"; and in SVG the value bound means butt caps, because a round cap adds half a stroke width of arc at each end, about 4.5 points across the two, so a 3 draws like a 7 and a 1 draws five times its true length.

**The band is 0.16 of the outer diameter, at every size.** `--ring-band`: lg 200/32, md 86/14, sm 46/7. The stroke is derived from the box and never authored. What this replaced was a per-size ramp — 13% at sm, 9.3% at md, 7% at lg — which made the gauge read as a third of the weight of the donut it sat beside, and was not consistent with itself either.

**The donut moves too, and that is the point.** A band ratio is one number written two ways: `innerRadius = 1 - 2 × band`, so the freshness donut goes 0.6 → 0.68. 0.2 was considered first because it was already shipping, but at 0.2 the gauge band is thicker than a criterion bar is tall, and 0.16 sits closer to the other line weights on a results page. **One ring in the suite, one ratio** — whichever mark is drawing it.

**Arc corners take `--radius-chart`,** the same 3px as a bar end and the same number Nivo's `cornerRadius` takes. It is the corner, never the end.

**A corner radius is not a cap.** Nivo's cornerRadius is NOT a cap and does not break this: a cap ADDS half a stroke width of arc beyond the end point, a corner radius rounds the existing corners INWARD and removes material. It cannot extend the arc past its value at any radius, so CM's cornerRadius={4} on a ~34px band is compliant, and reads as a slight softening rather than a round cap (a true round cap there would be a 17px radius). The rule is about arc length, not about corners: round the corners if you want the softer look, never round the ends.

- Arc colour comes from `scoreToLevel`, so a gauge and a star rating for the same score always agree. Under the current bands a 73 is level 4, olive, not sunshine.
- Track is `--level-empty`, darker than the ground. **Not a lighter stop**: a near-white track is the same value as `--surface-card`, so a light track vanishes on a card, which is exactly where the `sm` badge lives. The mirror image is why a gauge never goes on a **deep** card: `--level-empty` is limestone-750 and so is `--surface-card-deep`.
- **No per cent sign.** A score out of 100 is a score; the sign invites reading it as a proportion of something countable.
- `lg` renders the value in Bely Display at `--t-metric`, about 68px at the default text scale – the clearest use of the display cut in the product. One per page. The clockwise sweep is `lg` only and suppressed under `prefers-reduced-motion`; `sm` and `md` arrive at their value. A CSS-transition gauge takes `--motion-state-slow`; a chart library drawing the arc takes the spring tokens (`--motion-chart-spring-*`). Either is fine, neither may overshoot the value.
- `md` tiles into a criteria grid; `sm` is a badge on a `ResultCard` thumbnail.
- **Never on a deep card**, for the same reason as `ScoreValue`: the track is `--level-empty`, which is the deep card's own value.
- **Reaching for the gauge is itself the judgement that the score is the subject.** If the page's other figures are provenance — how many pages, when, how many runs — the score is the subject and takes the gauge as the page headline. If it is one of several peers in a row of cards, it is not, and a gauge in a peer card asserts subject and peer at once.

Workings: `explorations/Score gauge.html`; the ring weight was settled in `explorations/Chart family.html`.

## The chart family

Every chart in the suite holds five traits, and each one is a decision recorded elsewhere in the system rather than a preference. **Square ends** (a cap adds material the value did not earn). **`--star-1..5` for scores, `--categorical` for categories, `--comp-1..4` for composition, and nothing else** — past four categories the answer is a different chart, not more hues. **`--radius-chart` (3px) on every bar end, arc corner and cell**, and nowhere else. **The chart spring on first paint, once, no overshoot.** **One tooltip surface** — limestone-500 on a limestone-600 hairline at `shadow-md`. **The time axis is the full window and the data starts where the data starts** — never a flat run at zero before the first reading.

Rings all take one band ratio: `--ring-band`, 0.16 of the outer diameter (a donut is `innerRadius={0.68}`). **All chart type is one face, named once as `--chart-font`** (Bely) — two faces inside one chart reads as a mistake, and Bely is what ties a chart to the app rather than making it look dropped in. One token, so it is one switch. Workings: `provenance/Chart coherence decisions 2026-08-05.html`, specimens in `guidelines/chart-family.html`.


---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` — the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only; it is not an app token.

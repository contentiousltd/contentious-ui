A single score out of 100. **Not** the freshness donut – that shows slices of a whole, this shows one value against a maximum. They look similar, so never place them adjacent without a heading on each.

```jsx
<ScoreGauge score={68} size="lg" caption="Your content's health would benefit from some improvements." />
<ScoreGauge score={76} size="md" />
<ScoreGauge score={92} size="sm" />
```

**Gauge or rail?** Ask whether the score is the *subject* or one of several values. Subject takes the gauge, because the ring encodes the value twice, as a number and as arc length, and that earns the space only when it is the point. **At most one gauge per view.** A score among other values takes `ScoreValue`: the rail if its neighbours are quantities, the five-segment track if its neighbours are other scores. A column of rings cannot be scanned.

**Full 360, from twelve o'clock, clockwise. The arc must not extend beyond its value.** Both are correctness, not taste. The ring must be able to close, or 100 reads as "not quite"; and in SVG the value bound means butt caps, because a round cap adds half a stroke width of arc at each end, about 4.5 points across the two, so a 3 draws like a 7 and a 1 draws five times its true length.

**A corner radius is not a cap.** Nivo's cornerRadius is NOT a cap and does not break this: a cap ADDS half a stroke width of arc beyond the end point, a corner radius rounds the existing corners INWARD and removes material. It cannot extend the arc past its value at any radius, so CM's cornerRadius={4} on a ~34px band is compliant, and reads as a slight softening rather than a round cap (a true round cap there would be a 17px radius). The rule is about arc length, not about corners: round the corners if you want the softer look, never round the ends.

- Arc colour comes from `scoreToLevel`, so a gauge and a star rating for the same score always agree. Under the current bands a 73 is level 4, olive, not sunshine.
- Track is `--level-empty`, darker than the ground. **Not a lighter stop**: `limestone-300` is the same value as `--surface-card`, so a light track vanishes on a card, which is exactly where the `sm` badge lives.
- **No per cent sign.** A score out of 100 is a score; the sign invites reading it as a proportion of something countable.
- `lg` renders the value at 64px in Bely Display – the clearest use of the display cut in the product. One per page. The clockwise sweep is `lg` only and suppressed under `prefers-reduced-motion`; `sm` and `md` arrive at their value. A CSS-transition gauge takes `--motion-state-slow`; a chart library drawing the arc takes the spring tokens (`--motion-chart-spring-*`). Either is fine, neither may overshoot the value.
- `md` tiles into a criteria grid; `sm` is a badge on a `ResultCard` thumbnail.

Workings: `explorations/Score gauge.html`.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` — the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only; it is not an app token.

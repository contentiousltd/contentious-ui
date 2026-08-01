A single score out of 100. **Not** the freshness donut – that shows slices of a whole, this shows one value against a maximum. They look similar, so never place them adjacent without a heading on each.

```jsx
<ScoreGauge score={68} size="lg" caption="Your content's health would benefit from some improvements." />
<ScoreGauge score={76} size="md" />
<ScoreGauge score={92} size="sm" />
```

- Arc colour comes from `scoreToLevel`, so a gauge and a star rating for the same score always agree.
- `lg` renders the value at 64px in Bely Display – the clearest use of the display cut in the product. One per page.
- `md` tiles into a criteria grid; `sm` is a badge on a `ResultCard` thumbnail.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` — the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only; it is not an app token.

Metrics that share a subject sit in one surface divided by hairlines – not in separate cards with gaps.

```jsx
<MetricBand>
  <Metric label="Total API cost" value="$41.28" sub="3,074 calls" />
  <Metric label="Cost per assessment" value="$0.0134" sub="$0.0111 AI + $0.0023 overhead" />
  <Metric label="Tokens processed" value="18.4" unit="M" sub="14.1M in · 4.3M out" />
</MetricBand>
```

Reads as a single instrument panel. No gaps, no shadows, no nested boxes. Three or four per band.

## Variants

```jsx
<MetricBand variant="compact">
  <Metric label="Properties" value="4" /><Metric label="Pages" value="84" />
  <Metric label="In watchlist" value="81" />
</MetricBand>

<MetricBand variant="grid" columns={3}>
  <Metric label="Words" value="419" /><Metric label="Sentences" value="21" />
  <Metric label="Links" value="0" tone="zero" />
</MetricBand>
```

**On centring.** The default band is left-aligned because centred numbers can't be compared down a column. That rule holds where comparison is the point. A `grid` of unrelated counts about one page – words, sentences, paragraphs, links – is read individually, so centring is fine. Never centre a band someone will scan vertically.

**Zeros in a grid.** Apply `tone="zero"` to a genuine zero. On the individual result page, "0 links" is arguably the most actionable number on the screen given Shareable scores two stars – rendering it in the same weight as every other count hides that.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`, currently 24px x 0.75 = 18px. Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` / `--motion-reveal` / `--motion-exit`**, never `--transition-*` — the library owns those names at different values.

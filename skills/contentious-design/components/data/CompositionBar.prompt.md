Use instead of a donut for any part-of-total breakdown.

```jsx
<CompositionBar segments={[
  { label: 'AI analysis', value: 63, display: '$0.0084' },
  { label: 'Content extraction', value: 29, display: '$0.0039' },
  { label: 'Waste', value: 8, display: '$0.0011', color: 'var(--comp-4)' },
]} note="Waste is retries and failed jobs. Over 10% is worth investigating." />
```

Cheaper than a donut, reads at a glance, works down to a 320px column. Max four segments; put loss/waste last in `--comp-4`.

Donuts are reserved for content freshness on the estate pages, where the metaphor earns itself.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`, currently 24px x 0.75 = 18px. Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` / `--motion-reveal` / `--motion-exit`**, never `--transition-*` — the library owns those names at different values.

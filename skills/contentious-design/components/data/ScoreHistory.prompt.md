A score over time. **Axes are permitted here and nowhere else** – the "no axes, no gridlines" rule was written for `MicroSeries`, where the shape is the whole message. A history chart has a different job: the reader needs to know *when* a score moved and by how much.

```jsx
<ScoreHistory note="Recorded each time the page changes and is re-scored."
  points={[{score:61,label:'12 Mar 26'},{score:68,label:'17 Jun 26'}]} />
```

- Point colour comes from `scoreToLevel`, so it agrees with the stars and the gauge.
- **Fewer than two points renders an honest empty state.** A single point drawn as a flat line spanning the full width reads as "no change over time" rather than "only measured once" – that was a real defect on the live page.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`, currently 24px x 0.75 = 18px. Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` / `--motion-reveal` / `--motion-exit`**, never `--transition-*` — the library owns those names at different values.

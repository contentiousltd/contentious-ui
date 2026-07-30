One analysed page in the Individual results grid. Four across.

```jsx
<ResultCard title="How and why to move from WordPress to Astro"
  section="Resources" date="17 Jun 26" score={92} image="shots/astro.png" />
```

- Screenshot at 16:10, cropped to the top of the page, on `--limestone-600` while loading.
- `sm` `ScoreGauge` badge top-left, so the score reads before the thumbnail does.
- The brand guide has a **Device screenshots** page. Read it before changing how the shot is framed – it may specify a device treatment this should adopt.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`, currently 24px x 0.75 = 18px. Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` / `--motion-reveal` / `--motion-exit`**, never `--transition-*` — the library owns those names at different values.

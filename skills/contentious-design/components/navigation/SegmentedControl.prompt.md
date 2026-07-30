The level-3 answer. Lives INSIDE the content, never in chrome.

```jsx
<SegmentedControl options={['Last 7 days','30 days','All time']} value={range} onChange={setRange} />
```

Use for Monthly/Yearly, time ranges, desktop/mobile. If a sub-view needs its own page it’s a `<SecondaryNav>` tab instead.

Keep promotional copy out of the options – put "2 months free" beside the control as a `promo` `<Chip>`, not inside a segment.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`, currently 24px x 0.75 = 18px. Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` / `--motion-reveal` / `--motion-exit`**, never `--transition-*` — the library owns those names at different values.

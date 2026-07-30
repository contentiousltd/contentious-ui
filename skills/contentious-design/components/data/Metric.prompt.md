The single way to present a number. Always left-aligned so digits line up down a column and across a row.

```jsx
<Metric label="Total API cost" value="$41.28" sub="3,074 calls · $0.0134 each" />
<Metric label="Cache savings" chip={<Chip tone="good">31%</Chip>} value="$12.90" tone="good" sub="31.2% hit rate" />
<Metric label="Failed" chip={<Chip tone="bad">Needs attention</Chip>} value="7" tone="bad" sub="last 24h" />
```

- **Never centred.** Centred numbers can’t be compared vertically.
- Tabular numerals are mandatory.
- Colour only for meaning. Neutral is the default; if everything is coloured, nothing can raise an alarm.
- Always pair the headline number with the figure it came from.
- No decorative icons – they carry no information.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` / `--motion-reveal` / `--motion-exit`**, never `--transition-*` — the library owns those names at different values.

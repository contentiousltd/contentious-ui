The canonical way a criterion score is shown anywhere in the product. Five discrete levels are easier to compare across fifteen criteria than fifteen two-digit numbers, and they are the reason the level ramp has exactly five rungs.

```jsx
<StarRating level={5} label="Error-free: 5 out of 5" />
<StarRating level={scoreToLevel(68)} size="sm" />
```

- Filled stars take `--level-1` to `--level-5`; empty stars take `--level-empty`.
- The star is an inline SVG at 12/16/20px in `currentColor`, per the icon rule. **Never a unicode glyph.** Swap in the app's own star asset when it is available – the path here is a stand-in.
- Always give a `label`: five identical shapes are not readable by a screen reader.
- `scoreToLevel` bands at **20/40/60/80** – a 1–5 rating expressed as a percentage, so five fifths is 100%. Confirmed, not provisional. Port it to `src/lib/colors.ts` as `scoreToStars()` beside `getScoreColour()`.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` / `--motion-reveal` / `--motion-exit`**, never `--transition-*` — the library owns those names at different values.

Aligned list. One set of mono column headers above the surface, rows inside it separated by hairlines.

```jsx
const cols = '1fr 108px 150px 168px 132px';
<ListTable columns={cols} headers={['Project','Pages','Last audit','Health','']}>
  <ListRow first columns={cols} cells={[<div><div style={{font:'var(--type-row-title)'}}>Oxfam</div><div className="ds-sub">oxfam.org.uk</div></div>, '874', '2 days ago', <Chip tone="good">78</Chip>]} />
</ListTable>
```

- Never stack card-per-group; one aligned list beats N boxes because the columns can be compared.
- Group headings (a client, a category) go between surfaces, not inside rows.
- Row actions live on hover, so they stop shouting.
- Numeric columns right-align; their headers align with them.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` — the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only; it is not an app token.

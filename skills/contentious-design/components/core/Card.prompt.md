Content surface, no border, no shadow.

```jsx
<Card selected chips={<><Chip tone="bad">Selected</Chip><Chip tone="info">Current</Chip></>}>
  <div style={{font:'var(--type-row-title)'}}>Agency</div>
</Card>
```

- One surface depth per page. Never a card inside a card – use a hairline rule instead.
- `tone="raised"` (limestone-600) for intro/aside blocks that sit ON the page; `card` (limestone-300) for data.
- Give a row of cards 36px clearance above so edge chips have room.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` / `--motion-reveal` / `--motion-exit`**, never `--transition-*` — the library owns those names at different values.

**Already in the library.** `@contentious/ui` exports **Card**. Do not port this implementation — apply the rules above to the library's component instead. See `Repo reconciliation.html`, finding 09.

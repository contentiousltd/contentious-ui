Content surface, no border, no shadow.

```jsx
<Card selected chips={<><Chip tone="bad">Selected</Chip><Chip tone="info">Current</Chip></>}>
  <div style={{font:'var(--type-row-title)'}}>Agency</div>
</Card>
```

- One surface depth per page. Never a card inside a card – use a hairline rule instead.
- `tone="deep"` (limestone-750) for a card that is **a different kind of thing from the cards around it**: one card in a set when it is the reader's own or the current one, or a whole row when the row explains rather than reports. It is a statement about category, not importance. Never for emphasis, never twice in one set, and **never for anything carrying a score** — `--level-empty` is limestone-750 too, so the track's empty segments and the gauge ring both land at 1.00:1.
- A deep card needs `data-surface="deep"`, which remaps the three roles that break on it: the mono label, the section rule and the link colour. All four text roles resolve unchanged.
- `card` (limestone-400) for data. `tone="raised"` was the old name for the deep ground and is a deprecated alias; it only ever meant "not `--surface-card`, because `--surface-card` is invisible", which the ground move fixed.
- Give a row of cards 36px clearance above so edge chips have room.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` — the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only; it is not an app token.

**Already in the library.** `@contentious/ui` exports **Card**. Do not port this implementation — apply the rules above to the library's component instead. See `Repo reconciliation.html`, finding 09.

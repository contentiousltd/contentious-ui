Action control. Solid fire for the one primary action in a view; hairline variants for everything else.

```jsx
<Button>Add client</Button>
<Button variant="ghost">Manage credits</Button>
<Button variant="quiet" size="sm">Settings</Button>
<Button disabled>Save banner</Button>
```

- One `primary` per view. Two solid fire buttons compete and neither wins.
- `disabled` goes fully grey. A washed-out accent button reads as a weak button, not a disabled one.
- Row actions on hover use `quiet` at `size="sm"`.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` — the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only; it is not an app token.

**Already in the library.** `@contentious/ui` exports **Button**. Do not port this implementation — apply the rules above to the library's component instead. See `Repo reconciliation.html`, finding 09.

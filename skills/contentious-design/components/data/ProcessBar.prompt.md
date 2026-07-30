Stages of a running job.

```jsx
<ProcessBar total={4} stages={[
  { label: 'Queued', count: 4, state: 'done' },
  { label: 'Fetched', count: 3, state: 'done' },
  { label: 'Analysed', count: 3, state: 'active' },
  { label: 'Completed', count: 3, state: 'done' },
  { label: 'Failed', count: 1, state: 'failed' },
]} />
```

**Never the level ramp.** A queued job is not a low score. Process stages use a wave ramp with fire reserved for failure – the live version coloured its stages orange, amber, olive and green, which put "queued" in the same colour as "scores 68" a few inches away, and made the red failure bar simultaneously read as "level 1".

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` / `--motion-reveal` / `--motion-exit`**, never `--transition-*` — the library owns those names at different values.

**Already in the library.** `@contentious/ui` exports **Progress**. Do not port this implementation — apply the rules above to the library's component instead. See `Repo reconciliation.html`, finding 09.

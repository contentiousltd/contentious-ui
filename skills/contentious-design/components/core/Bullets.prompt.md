The bullet. Any list of things that is not a table, a `ListTable` or a set of cards.

```jsx
<Bullets items={[
  'Only changed pages are re-scored, so an unchanged estate costs nothing.',
  'A run holds its snapshot, so a score never changes retrospectively.',
]} />

<Bullets timeline items={[
  { content: 'Heatmap replaces the criteria trend line' },
  { content: 'Bump chart, relative strength', pending: true },
]} />
```

Rules that matter:
- **`list-disc` and `list-inside` are retired everywhere, legal pages included.** `list-inside` puts the marker in the text flow, so a wrapped line runs back underneath it and a list of long items has no left edge to scan. That defect is on eight lists across privacy and terms and it is the reason this component exists.
- **One marker size, `--marker-size`.** Never a per-list size. It is the same mark as the bare chip's dot, which is the whole of the marker coordination in the system: see the note beside `--marker-size` in `tokens/semantic.css`.
- **Filled means done, ring means not yet, and that is the only thing the marker may say.** `is-pending` (`pending` in JSX) is the ring. Same size, same colour, so the fill is the one variable. Do not colour a marker to add a second meaning on top: an item that needs a status carries a `Chip`.
- **The marker is neutral.** `--marker-color` is `--text-secondary` in every product. The changelog's fire marker is gone: fire means primary, active, star 1 and danger, and a shipped entry is none of those.
- `--timeline` adds a hairline down the marker column and nothing else. It does not add a rail, a card, or dates in the gutter.
- `--spaced` when items run to a paragraph each. Not a way to fill a page.
- **Not `c-list`.** That name is the aligned data list with mono column headers. This is a run of items with a marker.

Settled 5 August 2026, with the marker zoo it replaces: `provenance/Dots and bullets decision 2026-08-05.html`.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library; assign neither here. Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`.

**Not in the library yet.** `@contentious/ui` has no list primitive of this kind, so this one ports as written.

The bullet. Any list of things that is not a table, a `ListTable` or a set of cards.

```jsx
<Bullets items={[
  'Only changed pages are re-scored, so an unchanged estate costs nothing.',
  'A run holds its snapshot, so a score never changes retrospectively.',
]} />

<Bullets timeline items={[
  { content: <ReleaseSection release={v4} /> },
  { content: 'Bump chart, relative strength', pending: true },
]} />
```

Rules that matter:
- **`list-disc` and `list-inside` are retired everywhere, legal pages included.** `list-inside` puts the marker in the text flow, so a wrapped line runs back underneath it and a list of long items has no left edge to scan. That defect is on eight lists across privacy and terms and it is the reason this component exists.
- **An item's content must be elements, not a bare text node.** Every child is placed in column 2 and the marker holds row 1; a bare text node becomes an anonymous grid item in the marker column and the item collapses.
- **The marker sits on the first line of its item, not centred on the whole first block.** `--marker-lead` is the line box it centres in: `1lh` by default, which is right for every bullet, and the section heading's line box on `--timeline`. A rail of one-line entries sets `--marker-lead:1lh` back. This is declared per list rather than derived because CSS cannot read a child's line-height.
- **Two sizes, and which one you get is the variant.** `--marker-size` (~7.4px) is a bullet on a body line. `--marker-node` (~13px) is a timeline node, because 7.4px is calibrated against body text and reads as a lost bullet beside a 46px display heading.
- **Filled means done, ring means not yet, and that is the only thing the marker may say.** `is-pending` (`pending` in JSX) is the ring. Same size, same colour, so the fill is the one variable. An item that needs a status carries a `Chip`.
- **The marker is neutral, in both variants.** `--marker-color` is `--text-secondary` in every product. The changelog's fire node is gone: fire means primary, active, star 1 and danger, and fire on every shipped node is the accent as decoration on a list. When the node read flat it was undersized, not neutral.
- `--timeline` runs one continuous hairline and the node punches a `--marker-halo` gap in it. **Set `--marker-halo` to the surface the rail sits on** – it defaults to `--surface-page`, so inside a card it is `--surface-card`. Nothing else: no rail, no card, no dates in the gutter.
- `--spaced` when items run to a paragraph each. Not a way to fill a page.
- **Not `c-list`.** That name is the aligned data list with mono column headers. This is a run of items with a marker.

Settled 5 August 2026, with the marker zoo it replaces: `provenance/Dots and bullets decision 2026-08-05.html`. The section-versus-line question is chc-436, answered there.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library; assign neither here. Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`.

**Not in the library yet.** `@contentious/ui` has no list primitive of this kind, so this one ports as written.

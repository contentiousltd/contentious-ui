Dropdown panel on `--surface-menu` (limestone-150) with a hairline – pure white belongs to no part of this palette and reads as a system alert.

```jsx
<Menu>
  <MenuHeader label="Project" value="Oxfam 2" />
  <MenuLabel>Switch to</MenuLabel>
  <MenuItem title="Oxfam" sub="oxfam.org.uk · 874 pages" />
  <MenuSeparator />
  <MenuItem title="Project settings" />
  <MenuItem tone="danger" title="Sign out" />
</Menu>
```

- Rows are 34px, 6px panel padding, 5px hover radius. Anything near 70px tall doesn’t feel clickable.
- `tone="danger"` gets a fire hover so Sign out announces itself on approach instead of looking disabled.
- All-or-nothing on icons – never mix iconned and icon-less rows. 14px, `--text-muted` at rest.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` — the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only; it is not an app token.

**Already in the library.** `@contentious/ui` exports **DropdownMenu**. Do not port this implementation — apply the rules above to the library's component instead. See `Repo reconciliation.html`, finding 09.

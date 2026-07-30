Immediate on/off. Off is an empty recess; on fills with fire.

```jsx
<Switch checked={on} onChange={setOn} label="Banner is" stateWord={on ? 'shown' : 'hidden'} />
```

- **Never colour the off track with the accent.** Filling the track is how a switch says "active", so off has to give it up – otherwise the only difference between states is which side a circle sits on.
- Not sapling/fire for on/off. This isn’t good vs bad, it’s active vs not – and sapling means "good outcome" in the data rules, so an off switch would imply something is wrong.
- Label states the resulting state ("Banner is hidden"), never the action ("Hide banner"), with the state word in `--text-strong`.
- Applies immediately. If the setting only takes effect on save, use a checkbox.
- Fade dependent fields to ~45% until the switch is on, so it visibly controls something.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`, currently 24px x 0.75 = 18px. Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` / `--motion-reveal` / `--motion-exit`**, never `--transition-*` — the library owns those names at different values.

**Already in the library.** `@contentious/ui` exports **Switch**. Do not port this implementation — apply the rules above to the library's component instead. See `Repo reconciliation.html`, finding 09.

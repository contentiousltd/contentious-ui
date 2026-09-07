A section divider, in two weights.

```jsx
<Divider taper />          {/* a marketing seam */}
<Divider />                {/* a plain hairline */}
```

**`--taper` is the marketing one, and the taper is the point.** A 1px gradient from transparent through `--rule-section` and back, so the rule is strongest in the middle of the screen and absent at both gutters. A full-bleed hard rule reads as chrome on a marketing page; nothing at all leaves two sections merging. The taper divides without announcing itself.

**Same reasoning as `--wash-section`'s 135deg angle, applied to a hairline.** That token is angled so a washed section meeting a flat one produces a divide legible at one edge of the screen and merged at the other, and the note beside it says the taper *is* the point. This is the same idea one dimension down. Taken from the Maturity Tool site, where it closes the hero.

**It uses the product's own `--rule-section`, not a fourth `--rule-*` token.** The hairline tokens are colours and this is a gradient, so it composes with what the product already declares rather than adding to the closed set. The site's version was `gloaming-900` at 10%, an alpha standing in for a colour; this is a declared stop.

**Where it goes.** A seam between two sections that share a ground – between two flush sections, where there is no tint change to do the dividing. **Not** at the edge of a tinted band, where the ground change already divides, and **not** inside a card, where `--rule-row` is the answer. Never two in a row.

**The plain `.c-divider` is a hard `--rule-section` hairline** for the app, where a rule means a group boundary and should be definite. Groups are defined by a rule and the space around them, not by a box.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` – one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density and `--text-multiplier` is the responsive step. **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`.

**This is a front-door component.** Put `.c-marketing` on the section: `tokens/type-roles.css` re-derives `--u`, the `--t-*` steps and the marker geometry at the 24px marketing base, and `tokens/semantic.css` re-derives the `--type-*` shorthands. Without it the component renders at app density. Substitution happens where a property is *declared*, which is why both files redeclare rather than relying on `--u` alone.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` – the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only, on a real ease-out; it is not an app token.

Workings: `provenance/Maturity Tool site audit 2026-09-07.html`. Specimen: `guidelines/pattern-marketing-page.html`.

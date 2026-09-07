Numbered process steps in a grid.

```jsx
<Steps steps={[
  { eyebrow: 'Week 1', title: 'Discovery', detail: 'Kick-off workshop. Shape your framework, scoring and client journey.' },
  { eyebrow: 'Weeks 2–3', title: 'Framework & branding', detail: 'Your framework built into the platform.' },
]} />
```

**Its own component, not a `Bullets` timeline variant.** Settled 7 September 2026. `--marker-node` is a node sitting *on* a hairline and means "a point in a sequence you are reading down"; this means "step 3 of 6" and sits in a grid. Two different objects, and the marker takes a size the bullet scale does not hold – `1.67u` against `--marker-node`'s `.68u`. A rail suits a changelog; six steps with a week each do not fit a rail on a marketing page.

**The number is a CSS counter. Do not pass it.** `counter-increment` on `.c-steps__n` fills it, so the markup does not carry it and it cannot drift from the order of the list. Reordering the array reorders the numbers. It is `aria-hidden` because the `<ol>` already tells a screen reader the order, and a decorative numeral read aloud after the list semantics is said twice.

**The disc is `--accent` with `--text-on-accent` on it, and this is the surface that catches a bad accent stop.** A 40px disc repeated six times is the most accent on a marketing page, and it carries text, so the pair has to clear 4.5:1. On the Maturity Tool site it did not: limestone-100 on fire-500 is **3.99:1**, and at 20px the numeral is not large text, so 3:1 does not apply to it. That measurement is why that product's accent is fire-600 rather than fire-500 – 5.81:1. **If your accent cannot hold `--text-on-accent` here, the accent stop is wrong, not the component.**

**Three across above 52rem, one below.** Six steps make two rows of three, which reads as two phases and is usually true. `align-content: start` so a step with a two-line title does not push its detail down relative to its neighbours.

**The week label is an `Eyebrow`, not a chip.** It is metadata naming the step, which is exactly what the eyebrow is for, and a chip would put six fills in a row competing with six discs.

**It is a plan, not a rail.** If the entries are things that have happened, with dates, you want `Bullets` with `--timeline` and its fill-versus-ring pair for done and not yet. This one makes no claim about progress.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` – one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density and `--text-multiplier` is the responsive step. **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`.

**This is a front-door component.** Put `.c-marketing` on the section: `tokens/type-roles.css` re-derives `--u`, the `--t-*` steps and the marker geometry at the 24px marketing base, and `tokens/semantic.css` re-derives the `--type-*` shorthands. Without it the component renders at app density. Substitution happens where a property is *declared*, which is why both files redeclare rather than relying on `--u` alone.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` – the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only, on a real ease-out; it is not an app token.

Workings: `provenance/Maturity Tool site audit 2026-09-07.html`. Specimen: `guidelines/pattern-marketing-page.html`.

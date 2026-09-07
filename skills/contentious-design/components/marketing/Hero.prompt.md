The front-door hero. Eyebrow, title, intro, one pair of actions, and an illustration.

```jsx
<Hero
  eyebrow="For consultancies"
  title="Run your own maturity assessment practice."
  intro="Maturity Tool is a platform for consultancies who deliver bespoke maturity assessments to their clients."
  actions={<><Button size="lg">See pricing</Button><Button variant="ghost" size="lg">Book a call</Button></>}
  art={<img src="/hero-tree.png" alt="A maturity framework as a branching tree." width="1200" height="1201" />}
/>
```

**The measures are tokens: `--measure-title` (28ch) and `--measure-lede` (48ch).** Taken from the Maturity Tool site, which is the only page in the suite that set them deliberately. They are not `--width-prose`, which measures a column of body copy, and neither of these is one. 28ch on a title breaks into two or three lines at every width the page is read at, which is what `text-wrap: balance` then has something to work with.

**Never force the break.** The site put two `<span>`s in its `<h1>` to control the wrap. That fixes the break at one viewport for a heading already constrained by its measure, and it is wrong at every other width. Pass plain text.

**One or two actions.** Two is the pattern – a primary that goes somewhere on the page and a ghost that starts a conversation. Three is a menu. The pair takes `--motion-state` on hover like any button; the hero itself does not animate.

**The illustration is the product's signature register, and it is worth checking against `--signature-illustration`.** That token is a sentence someone could commission from, and "use the existing set" is the path of least resistance that made two products converge once already. Export trimmed to the ink bounds: baked-in whitespace is what made equal CSS gaps look unequal across the feature-card sets.

**Ground is `--surface-front`, flush, no tint.** The hero is the first section, so `.c-marketing-section:first-child` gives it less top padding – there is nothing above it to separate from. A tinted hero puts the page's loudest ground at the top and leaves nothing to escalate to.

**No entrance animation on the hero.** `--motion-reveal` is for sections you scrolled to; the hero is the section you arrived at, and animating it delays the only thing the reader came for.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` – one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density and `--text-multiplier` is the responsive step. **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`.

**This is a front-door component.** Put `.c-marketing` on the section: `tokens/type-roles.css` re-derives `--u`, the `--t-*` steps and the marker geometry at the 24px marketing base, and `tokens/semantic.css` re-derives the `--type-*` shorthands. Without it the component renders at app density. Substitution happens where a property is *declared*, which is why both files redeclare rather than relying on `--u` alone.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` – the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only, on a real ease-out; it is not an app token.

Workings: `provenance/Maturity Tool site audit 2026-09-07.html`. Specimen: `guidelines/pattern-marketing-page.html`.

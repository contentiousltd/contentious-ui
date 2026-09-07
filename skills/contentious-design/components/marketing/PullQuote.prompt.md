An editorial pull quote on a reversed band. **One per page.**

```jsx
<section className="c-marketing c-marketing-section" data-surface="inverse"
         style={{ background: 'var(--surface-inverse)' }}>
  <Eyebrow>Transformation</Eyebrow>
  <PullQuote
    quote="A maturity assessment used to be a one-off diagnostic. Run it on this platform and it becomes the backbone of a multi-year consulting relationship."
    coda="We've built and run the infrastructure. You've built the domain knowledge.">
    <p>Consultancies that own their maturity tool stop selling a report and start selling a practice.</p>
  </PullQuote>
</section>
```

**The section carries `data-surface="inverse"`, and the component does not paint its own ground.** That scope remaps every text role, hairline and link for a dark ground, including the eyebrow, so nothing inside needs a variant. It is the whole vocabulary for a reversed surface and it is why the hand-styled version read well: it was reinventing this. **Set the fill to `--surface-inverse`, not a hand-picked stop** – the Maturity Tool site used gloaming-550, one stop off a token that already means this.

**The oversized opening glyph is ornament, and the rule says so.** It is the only place in the suite where type is used as decoration, at `calc(var(--u) * 5)` in Bely Display, bled off the top left. Stating that it is ornament is what saves anyone measuring it: **it carries no contrast floor**. It is a declared stop – `--accent-link`, which the inverse scope has already lifted to fire-350 – and **not** the site's `opacity: 0.6`, which is an alpha standing in for a colour: on a surface that is glass, and anywhere else it is a shade nobody declared.

**The prose column starts at the quote's first line, not the top of the grid.** That asymmetry is deliberate and is the kind of thing lost in a rebuild. Above 52rem the body column takes `1.67u` of top padding so the two columns share a baseline where the reader enters them.

**One per page, roughly two thirds down.** A reversed band is the page's one change of register, so a second one halves the effect of the first and a third makes the page stripey. It goes where the argument turns from *what this is* to *why it matters* – after the benefits, before the commercials.

**The quote is a quote, not a headline.** One or two sentences, italic, in `--t-section`. If it has no speaker and states a fact rather than a position, it is a section heading and wants `.c-section-header` instead. Running prose beside it is what makes it editorial rather than a testimonial slab.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` – one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density and `--text-multiplier` is the responsive step. **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`.

**This is a front-door component.** Put `.c-marketing` on the section: `tokens/type-roles.css` re-derives `--u`, the `--t-*` steps and the marker geometry at the 24px marketing base, and `tokens/semantic.css` re-derives the `--type-*` shorthands. Without it the component renders at app density. Substitution happens where a property is *declared*, which is why both files redeclare rather than relying on `--u` alone.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` – the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only, on a real ease-out; it is not an app token.

Workings: `provenance/Maturity Tool site audit 2026-09-07.html`. Specimen: `guidelines/pattern-marketing-page.html`.

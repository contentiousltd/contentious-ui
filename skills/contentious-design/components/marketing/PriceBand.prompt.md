A row of price bands. **One geometry, and the ground carries the difference** – the same shape of answer as the chip's six tones.

```jsx
<PriceRow>
  <PriceBand eyebrow="Starter" title="Essentials"
    description={<>Your own maturity product, launched on a subdomain of <Literal>maturitytool.com</Literal>.</>}
    figures={[{ amount: '£10k–15k', period: 'one-off setup' }]}
    features={['Your framework, your brand', 'Up to 10 consultant seats']} />
  <PriceBand featured eyebrow="Most common" title="Growth" … />
  <PriceBand eyebrow="Bespoke" title="Enterprise" … />
</PriceRow>
```

**The featured band is `data-surface="deep"` and nothing else. There is deliberately no `.c-price--featured`.** A deep card already means "a different KIND of thing from the cards around it", it is already constrained to once per set, and the eyebrow already carries the words. Pass `featured` and the component sets the attribute; the scope remaps `--surface-card` and the card changes ground and nothing else.

**What the site did and why all three go.** A `2px solid var(--fire-500)` border, where `.c-card--selected` is the only sanctioned fire outline in the system; a fire-tinted `box-shadow`; and `transform: translateY(-4px)`. The feature-card decision of 4 August is explicit: **no lift and no shadow, because the app has neither and a shadow is a second surface depth.** A lift also means the featured card no longer shares a baseline with its neighbours, so three bands stop being a row.

**At most one deep band per row, and never for emphasis.** Two deep cards in a row of four say nothing. If two tiers are both "most common", the copy is wrong, not the component.

**A deep card cannot carry a score.** `--level-empty` is the same value as `--surface-card-deep`, so a rating track's empty segments and a `ScoreGauge` ring both land at 1.00:1 on it. Not a constraint this component normally meets, but do not put a `StarRating` in a featured band.

**The figures block is a hairline pair, not a surface.** `--rule-row` above and below, no fill, no radius. A filled slab inside a filled card is a slab inside a slab, and on the lichen ramp the site's version measured 1.14:1 against the card anyway – so it was a surface that barely existed, carrying a `0.5rem` radius that is off the 3/6/12 scale. Removing the fill removes the need for the radius.

**Amounts are Bely Display at `--t-row`, periods are `--t-hint`.** A price is a metric, so it takes the display face; the period is the figure it came from, which is the standing rule for numbers – pair the headline number with its source. Tabular figures, so a column of prices does not shuffle.

**The feature list is `Bullets`, not a hand-rolled marker.** The site drew `→` pseudo-elements on one list and haloed fire dots on another. `.c-bullets--accent` is available if the page wants accent markers throughout, but it means nothing and must not distinguish one tier from another – colour distinguishing tiers is data, and the reader would have to be told what it means.

**The description absorbs the slack, and that is what aligns the figures.** `.c-price__description` takes `flex: 1`, because tier descriptions are never the same line count. Without it, `margin-top: auto` on the feature list collects all the slack in one place: the lists line up and everything above them floats with the length of the copy. Measured before the fix, a two-line description put its “from £45k” **29.4px above its neighbours**, hairlines included. **The amount is the number the row exists to compare**, and the standing rule for numbers is that one which moves cannot be compared – which is why a metric is never centred. Same rule, one axis over.

**`.c-price > .c-bullets` keeps `margin-top: auto`** as belt and braces, for a band with no description at all, where there is nothing flexible above it to absorb anything. Cards stretch to the tallest, so unequal copy otherwise shows as dead space in the middle of the short ones.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` – one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density and `--text-multiplier` is the responsive step. **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`.

**This is a front-door component.** Put `.c-marketing` on the section: `tokens/type-roles.css` re-derives `--u`, the `--t-*` steps and the marker geometry at the 24px marketing base, and `tokens/semantic.css` re-derives the `--type-*` shorthands. Without it the component renders at app density. Substitution happens where a property is *declared*, which is why both files redeclare rather than relying on `--u` alone.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` – the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only, on a real ease-out; it is not an app token.

Workings: `provenance/Maturity Tool site audit 2026-09-07.html`. Specimen: `guidelines/pattern-marketing-page.html`.

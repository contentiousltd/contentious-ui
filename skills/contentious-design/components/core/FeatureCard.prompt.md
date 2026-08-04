Marketing feature card. Illustration, title, one paragraph, centred. Never an app surface.

```jsx
<FeatureRow columns={3}>
  <FeatureCard art={<img src="images/estate.png" alt=""/>} accent="Layer 1" title="Estate">
    All your website properties: your domains and subdomains.
  </FeatureCard>
</FeatureRow>
```

- **Three gaps, and no others.** Row `1.33u`, art to text `1.11u`, title to body `.44u`. Padding is `1.67u / 1.33u`, symmetrical top and bottom.
- **The ground is `--surface-card-deep`**, limestone-750, with `data-surface="deep"` on the card. These blocks explain rather than report, which is what the deep ground means. It was `--surface-raised` until 4 August 2026, chosen because limestone-300 read as too faint on a limestone page — that was the 1.06:1 problem the ground move fixed, and raised was the workaround.
- **A link card needs the `deep` scope, not just the colour.** The title takes `--accent-link` on hover, and fire-650 misses AA on limestone-750 by a tenth of a point; the scope swaps it for fire-750 at 6.54:1.
- **Body copy stays at `--t-body-app`** while art, titles and gaps step up to marketing scale. At the 24px base a paragraph reaches 26px and dominates the card.
- **The row never sets a side gutter.** It inherits `--page-padding` from the page, so every section on the page lines up at every width.
- **Four across only on one-line copy.** Three is the default. Four is allowed when every card's body is one line at app scale and wraps to no more than three, which is the condition the Content Health Check tiers met; longer copy goes two by two, because a paragraph in a quarter of 1080px wraps to three words a line.
- **Cards stretch to the tallest.** Keep body copy within a line of its neighbours or the short ones show dead space at the bottom. Never centre the stack vertically to hide it.
- **The `6u` art box sets the optical size, not the file.** Export illustrations trimmed to their ink bounds; baked-in whitespace is what made two sections with the same CSS look differently spaced.
- **Wrap each marketing section in `.c-marketing-section`** (not `.c-section`, which is the app's top-margin spacer): `2u` top and bottom, so `4u` between sections. Never a one-off margin between two sections: space between sections is at least three times the largest gap inside one.
- Centring is allowed here. It is not allowed in the app, where `.c-card` is left-aligned.
- **Hover, for a card that is a link:** `.c-feature--link`. The illustration grows 7% on `--motion-breathe` (2400ms, marketing hover only) and the title takes `--accent-link` on `--motion-state`. No lift and no shadow: the app has neither, and a shadow adds a second surface depth. Reduced motion drops the scale and keeps the colour. Candidates weighed in `explorations/Feature card hover.html`.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Density switches at the root, not on a wrapper.** `--u` is declared once on `:root`, so substitution happens there: setting `--base-font-size:24px` on a marketing section does nothing to the `--u` its cards read. Set it on `:root` for the page, or redeclare `--u` itself on the wrapper.

**Density switches at the root or through `.c-marketing`, never on an ad-hoc wrapper.** `--u` and the `--t-*` roles are declared once on `:root`, and substitution happens where a property is declared: setting `--base-font-size: 24px` on a marketing section does nothing to the `--t-section` its cards read. `.c-marketing` in `tokens/type-roles.css` redeclares `--u` and every role at `--marketing-font-size` (24px), and a second block in `tokens/semantic.css` redeclares the `--type-*` shorthands. Put that class on the marketing section. A product should never carry its own copy of the formulas.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.**

**One component, settled 4 August: fold, do not ship both.** `src/components/FeatureCard.tsx` rendered a second class family, `c-feature-card__*`, on a bordered shadcn `Card` with no illustration. CHC confirmed the library component has a single call site in the whole suite (VTS's home page), so the fold is one migration. The folded component is: borderless, an optional `art` slot which switches on the centred marketing layout, the existing `accent` slot (`.c-feature__accent`, mono, above the title), and `--link` when the card is a link. `c-feature-card__*` is retired rather than aliased – two dialects for one visual thing is the situation the system should not ship. See `Repo reconciliation.html`, finding 09.

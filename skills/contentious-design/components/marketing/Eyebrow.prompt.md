The marketing eyebrow. **Bely, uppercase, in the accent’s link stop** – a label for prose rather than for data.

```jsx
<Eyebrow>For consultancies</Eyebrow>
<Eyebrow>Most common</Eyebrow>
```

**One class, replacing four.** The Maturity Tool site wrote the same six declarations under four names – `.type-accent-label`, `.included-card__eyebrow`, `.pricing-card__eyebrow`, `.timeline__week` – and only the bottom margin differed. If you find yourself writing a fifth, this is it.

**It takes `--accent-link`, the LINK stop, not `--accent`.** An eyebrow is small uppercase text, so it needs 4.5:1, and on the lichen front door fire-500 is 3.25:1, fire-600 is 4.72 and fire-650 is 5.72. A coloured label is also nearer a link than a fill: it says what you are looking at without being a target.

**It reads the remapped token directly, and that is load-bearing.** This shipped for half a day as its own `--label-accent` token defined as `var(--accent-link)`, and inside a deep price card the eyebrow measured **4.39:1** – the identical figure `products.css` records against `--accent-link-on-deep`. **A token whose value is `var()` of another token is a copy, not a link:** substitution happens where the property is *declared*, so a value written on `:root` has already resolved and a scope that later remaps its source cannot reach it. Reading `--accent-link` directly means every existing and future scope remap applies for free. Measured: 6.84:1 on a pale card, 5.43:1 on a deep one, 6.16:1 on a reversed band, 5.05:1 on a tint band. **Do not reintroduce an alias for this.**

**Bely, not mono, and the rule keys off the SURFACE rather than the product.** Settled 7 September 2026 on Julius's call. An eyebrow on a marketing surface is naming a section of an argument; mono is the app's *metadata* voice, the register for a column header, a tick, a chip, a count. Uppercase mono at 24px density reads as a system label on a page that is not a system. So `.c-label` and `.c-eyebrow` differ by face because they belong to different **kinds of surface**: one labels data, the other labels prose.

**It is not a per-product token, and that was the other option on the table.** Face is a family trait – `products.css` lists Bely and every `--type-*` role under "what never varies" – and the 1 August decision refused mono a signature slot on exactly this ground: *two identical product overrides is the proof that a thing does not vary.* Nothing in the suite wants a mono eyebrow, so nothing has earned the token. If a product ever genuinely diverges here, that is when it argues for one, and the argument will be easier to have with a real case in front of it.

**Weight is 400, and it has to be said because the site asked for medium.** Bely ships Regular and Bold and nothing between, so `font-weight: 500` on a Bely eyebrow synthesises a fake weight – and the `font-synthesis-weight` guard in `tokens/fonts.css` covers `h1`–`h6` and the display classes, not a `<p>`.

**An app label stays grey, as well as mono.** `--label-color` and `.c-label` are the metadata voice, and colour there would mean something. This one is for marketing surfaces, where an eyebrow's job is to name the section.

**One per section, above the heading.** It is not a chip and it is not a category badge – if it needs a fill or a border, you want `Chip`. It carries no dot: a dot belongs to the component whose meaning it carries.

**`Literal` lives here because it is the other inline marketing type class.** A domain name, filename or URL in running prose takes the metadata voice with no fill, no radius and no tint. **A URL in a sentence is not code**, which settles the site's tinted `<code>` box: Courier (`--font-mono-brand`) stays reserved for actual code, which is what the brand guide reserves it for, and a tinted box in running copy is a fill doing a job the face already does.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` – one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density and `--text-multiplier` is the responsive step. **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`.

**This is a front-door component.** Put `.c-marketing` on the section: `tokens/type-roles.css` re-derives `--u`, the `--t-*` steps and the marker geometry at the 24px marketing base, and `tokens/semantic.css` re-derives the `--type-*` shorthands. Without it the component renders at app density. Substitution happens where a property is *declared*, which is why both files redeclare rather than relying on `--u` alone.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` – the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only, on a real ease-out; it is not an app token.

Workings: `provenance/Maturity Tool site audit 2026-09-07.html`. Specimen: `guidelines/pattern-marketing-page.html`.

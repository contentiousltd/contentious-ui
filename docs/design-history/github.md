repo: contentiousltd/contentious-ui
branch: main
path: src/styles, src/lib, src/components, docs

Also read: juliushonnor/maturitytool @ main (index.html, styles.css, CLAUDE.md, docs/site.md).
Not a sync target, and Claude Design does not write there. Recorded because the 7 September
audit is measured against it.

**This file was several rounds stale when the 7 September entry below was appended** — the
Claude Design project's own `github.md` records "Sync history" entries through at least
5 August that never landed here, and this repo's commit log (`d86da2b`, `546e8af`) shows
those rounds shipped via the normal `design:apply` zip flow without updating this history
file. Only the 7 September round is recorded below; the gap between 30 July and 7 September
has not been reconstructed. Worth closing deliberately rather than by inference.

## Last sync

date: 2026-09-07T09:05:00Z
commit: (not recorded – no commit sha available on this side; maturitytool read at tree 60279b7b6c0b)

### Updated in this project

- **The front door gets a ground, and Maturity Tool becomes the fifth product.** Julius answered the four open decisions from the 7 September audit. Handoff for Claude Code is `design-system/CHANGES.md`, rewritten for this round. Nothing in the app layer moves: no component an app screen uses changes value, geometry or class name.
- **The signature set grows to 36 with `--surface-front` and `--surface-front-tint`, the seventh growth.** The system had already said a product has two kinds of surface and then given only one of them a colour: the front door had a density, a motion token and a wash, and no page. So every marketing page in the suite picked its own stops. **The card is the whole test** – whatever the pair is, `--surface-card` must clear 1.18:1 from both, and a band step under ~1.15 does not read as a band. Cannot be derived, because limestone's light end is aliased. All five blocks declare both; CM and mt are authored (lichen-350 / lichen-500, which are CM's own wash first stop and CM's app page, so the marketing ground is a step lighter than the app and the band lands on the app's page colour), VTS and contentious.ltd are provisional.
- **It also fixed a collision already in the system:** `.c-marketing-section--tint` *was* `--surface-card-deep`, so a tinted band and a feature card were one value by definition and a card on a band read at 1.00:1.
- **Flagged, not fixed: contentious.ltd is 1.06:1 card-to-page** (limestone-300 on limestone-500), the 4 August failure still live on the studio site. Needs its own round; do not fix it by moving the front pair.
- **`[data-product="mt"]`, and it is the first product with no working surface.** One static page, no signed-in state, no scores. Density is therefore 24px on every surface, which no other product can say, and it is the density rule reaching its edge rather than an exception to it. `--surface-page` and `--surface-front` are the same value, declared twice on purpose. **Shares lichen with CM, which rule 4 permits** – the same-conversation clause binds CM and CHC, not CM and mt, and the triple is unique on accent. **Accent is fire-600, not 500**, because every fire surface on the page carries text and limestone-100 on fire-500 is 3.99:1, one of the audit's two contrast fails. The reversed band and footer swap round from CHC (`--surface-inverse` gloaming-700 for the quote band, `--surface-footer` gloaming-800) because this product has no tooltips and a footer must not be the value of the band above it. **Illustration is recorded as borrowed, not promoted to "pictorial"** – the one dimension the product does not own, which is what reselling looks like in a signature.
- **The eyebrow's face is settled, and the answer is Bely rather than a per-product token.** This was the one call flagged as made without Julius; he chose Bely and proposed making the face a per-product setting. **Bely yes, per-product no**, and the mechanism matters more than the value: face is a family trait – `products.css` lists Bely and every `--type-*` role under "what never varies" – and the 1 August decision refused mono a signature slot on exactly this ground, that two identical product overrides is the proof a thing does not vary. The better key is the one the system already uses: **deployment is a property of a SURFACE**, so `.c-label` is mono because it labels data and `.c-eyebrow` is Bely because it labels prose. No token, no set growth, and it generalises to every product's marketing page rather than being set five times. If a product ever genuinely wants a mono eyebrow, that is when it argues for the token, with a real case in front of it. **Weight is 400**: the site asked for medium, Bely ships Regular and Bold and nothing between, and the `font-synthesis-weight` guard covers `h1`–`h6` and the display classes but not a `<p>`, so 500 would have synthesised a fake weight.
- **`.c-price` figures did not align across a row, caught at review.** `.c-price` is a flex column and `margin-top:auto` on the feature list collected all the slack in one place, so the lists lined up and everything above them floated with the description's line count: a two-line description put its "from £45k" **29.4px above its neighbours**, hairlines included. The amount is the number the row exists to compare, and the standing rule for numbers is that one which moves cannot be compared, which is why a metric is never centred. `flex:1` on `.c-price__description` takes the spread to 0 while the lists stay at 0; `margin-top:auto` remains as belt and braces for a band with no description.
- **A shipped-component defect the token layer said was impossible: `--text-secondary` on a deep card.** `[data-surface="deep"]` remaps four properties and `--text-secondary` is not one of them, while `.c-price__description` and `.c-price__period` both use it inside a card that is `data-surface="deep"` by design. On lichen-650 that is **3.56:1**. **The block in `semantic.css` is what hid it** – "--text-strong reads at 10.87:1 on it and nothing about the type changes" was measured on limestone-750, CHC's deep ground, where it is true (strong 10.86, body 8.84, secondary 5.21). It is not a property of the scope and was never true on lichen. The note now states the test instead of a figure: `--text-secondary` needs 4.5:1 on `--surface-card-deep`, per product. **Fixed for mt: `--surface-card-deep` is lichen-550**, giving secondary 5.10, body 8.66, strong 10.65, with the card still at 1.33:1 on the front ground. **Not fixed for CM and flagged**, because its page is lichen-500 and no stop is both dark enough to read against it and light enough to carry secondary text (550 → page 1.17; 600 → secondary 4.27; 650 → 3.56; 700 → 2.94). CM needs a 37th token or a deep card LIGHTER than its page; own round. VTS unmeasured and probably fine.
- **New `explorations/Eyebrow colour.html`** – the site's fire-600 default, the shipping `--accent-link`, and Julius's fire-700, on all five grounds an eyebrow lands on, with every figure computed. It also corrected an error in the audit: sorbet-500 at 3.11 was measured against the site's gloaming-550 band, and on `--surface-inverse` (gloaming-700) the same colour reaches **4.59 and passes** – so moving the band to the token fixes that eyebrow without changing its colour, and the site's real failures are two rather than three. **Open: fire-650 or fire-700 on the light grounds.** fire-700 is not `--accent-link`, so choosing it means either an eyebrow token (the alias deleted this morning) or moving the product's link colour.
- **New marketing kit, seven classes, front door only:** `.c-eyebrow` (replacing four identical classes under four names on the shipping page; Bely, uppercase, weight 400, reading `--accent-link` directly – the LINK stop, because an eyebrow needs 4.5:1 and fire-600 is only 4.72 on the front ground and 4.17 on the tint), `.c-divider--taper` (the site's tapered hairline, taken as-is with the alpha becoming a stop), `.c-hero` (plus `--measure-title: 28ch` / `--measure-lede: 48ch`, and `text-wrap: balance` instead of the site's two hard span breaks), `.c-pullquote` (one per page, on `data-surface="inverse"`; the glyph is ornament and carries no contrast floor, stated so nobody measures it), `.c-price-row`/`.c-price` (**the featured band is `data-surface="deep"` and nothing else** – no `--featured` class, because a deep card already means "a different kind of thing" and is already once-per-set; the figures block is a hairline pair, not a surface, which is also how the site's 8px radius stops being needed), `.c-steps` (its own component per Julius, since a node on a line and "step 3 of 6" are different objects; the number is a CSS counter so it cannot drift from the list order), and `.c-literal` (a URL in prose is not code – metadata voice, no fill; Courier stays reserved for code).
- **`.c-bullets--accent` is the simplified answer to the two-tone bullets, and Julius was right that my first one was overbuilt.** A skin, not a comparison system: it sets the marker to `--accent-marker` and turns on a ring, and **it means nothing**, so the fill/ring pair stays free to say done-and-not-yet. A whole page may take it, or one list may take it to draw the eye. New `--marker-aura` / `--marker-aura-width`, off by default; the ring is derived from the accent via `color-mix` to an **opaque** colour rather than the site's 18% alpha, and it is a size decision too (7.4px of mark becomes 15.4px of ink).
- **Em dashes swept** from `tokens/products.css` (64) and `tokens/semantic.css` (2), comment text only, against the brand rule the style guide lints for. Also fixed a line I joined by accident in the density note.
- **Still open:** the eyebrow's FACE is the one call made without Julius (mono, reversible in one declaration); `.c-feature` has no text-only variant so the page's six text-only benefit cards have no answer; the accent-filled closing band has no component; `pattern-feature-cards.html` prose is stale on the card ground; and **no JSX/`.d.ts`/`.prompt.md` yet for the five new components**, which every other component in the system has.
- **Found applying this round, not by Claude Design: `mt`'s `--surface-menu` and `--surface-field` collide** (both `limestone-150`), which `scripts/check-product-signatures.mjs` fails on. `cm` has the identical pair and is already an allowlisted baseline exemption there, with the script's own comment saying that baseline "may shrink and must never grow." `mt` inheriting the same non-value from `cm` (its "no chrome ships today" comment only defends `--surface-chrome`, not this pair) is consistent with `cm`'s provisional state, but adding `mt` to the baseline is a call for Claude Design or Julius, not something applied silently here. Left failing on `npm run check:design-sync`'s sibling script until decided either way.

## Previous sync

date: 2026-07-30T14:31:01Z
commit: (not recorded — github_get_tree returns a tree hash, not a commit sha)

### Updated in this project

- Renamed the score ramp to `--star-1..5`, matching the shipping library; `--level-*` kept as an alias.
- Swapped `--transition-*` for `--motion-*` — the repo defines `--transition-fast` as 300ms, this system assumed 180ms.
- Radii now map onto the repo's `--border-radius-sm/md/lg` (3/6/12); spacing, layout and z-index adopted from the repo.
- Recorded the 0–100 → 1–5 score banding as a genuine gap in the repo, not a duplicate.
- Set `--text-multiplier: 0.75` for app density (18px body) against the library's 24px base, rather than declaring a second base size.
- Renamed every class in `components/components.css` to `c-*` BEM inside `@layer components`, and converted ~60 literal font sizes to multiples of `--u`. The file is now portable into the library as-is.
- Flagged the eleven components that duplicate shipping exports, in their own `.prompt.md` files.
- Documented three container widths by content shape, using the library's existing `--width-prose` / 1080px / `--width-content` rather than inventing a token.

## Screen map

| Screen / file | Built from |
| --- | --- |
| `tokens/colors.css` | `src/styles/tokens.css` (identical hex palette, 11 families × 17 stops) |
| `tokens/typography.css` | `src/styles/typography.css` |
| `tokens/spacing.css` | `src/styles/tokens.css` (spacing, layout, z-index, breakpoints) |
| `tokens/semantic.css` | `src/styles/tokens.css` semantic aliases + `src/lib/colors.ts` |
| `components/components.css` | New — the visual layer the repo does not have |
| `components/core/StarRating.*` | `src/lib/colors.ts` (`getScoreColour`), `--star-1..5` |
| `Repo reconciliation.html` | The full diff and what to do about it |

## Notes

- `getScoreColour(score, prefix = 'star')` takes a **1–5** score. Criteria are scored 1–5 directly, so they need no banding. The 0–100 scores on Watchlist and the headline gauge have no mapping in the repo.
- The repo's `--font-mono` is `'Courier New'`, so the brand's code-only mono rule is already shipping. This system's metadata-label voice conflicts with it — unresolved.
- Component naming in the repo is `c-*` with BEM modifiers (`c-button--primary`, `c-card__header`) plus `type-*` scale classes. This system's `.chip` / `.btn` / `.metric__value` need renaming before they can be ported.
- The repo is shadcn-based: Button, Badge, Card, Switch, Input, Select, Tabs, Tooltip, DropdownMenu, Progress, Table, Separator, Dialog, Toast all exist, as do PageHeader, SectionHeader, Section, EmptyState, FeatureCard, LoadingRing. Several components in this system duplicate them.
- Bely webfonts are in the repo at `fonts/` and match this project's copies.
- Product logos live in `brand/<product>/` — including `brand/contentious/mark.svg`, which should replace the PNG monogram used here.

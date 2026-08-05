Metadata label – use for any status, role, or type annotation anywhere in the product.

```jsx
<Chip tone="good">Healthy · 78</Chip>
<Chip tone="info" live>Analysing</Chip>
<Chip tone="warn">Invited</Chip>
```

Six tones: `neutral` `info` `good` `warn` `bad` `promo`.

Rules that matter:
- Never full-radius. A pill reads as a button and invites a click a status never honours.
- `promo` is the only solid fill and is for commercial offers ("2 months free"), never a state. One per screen.
- Never the only place a fact appears – cover the chip and the row must still make sense.
- On cards, chips straddle the top edge: absolute, `top:-10px; left:20px`, grouped left, 6px apart, never split to opposite corners. Costs no vertical height, so chipped and chipless cards in a row keep their headings level.
- Don’t invent a seventh tone; map onto the nearest of the six.

## Bare variant

```jsx
<Chip bare tone="bad">High priority</Chip>
<Chip bare tone="warn">Medium priority</Chip>
<Chip bare tone="neutral">Low priority</Chip>
```

A static dot plus mono text, no background. Use when the same label repeats down a long list and filled chips would shout – five stacked opportunity cards each with a solid chip is too loud, and the dot carries the same information quietly.

This is deliberately a variant, not a new component: it shares the tone scale and type, so it can't drift into a third label style. The dot here is **static** – the pulsing dot stays exclusive to live states, and a state that is a *state* rather than something happening now takes the static dot.

**The dot keeps the family 500 stops.** `fire-500`, `sunshine-500` and `sapling-500` *are* `--star-1`, `--star-3` and `--star-5`, and they stay: they are the only stops that hold their difference at `--marker-size`, which is the whole job of the dot. Retoning them to the tone foregrounds was tried at review and reverted, because `fire-700`, `amber-800`, `gloaming-600` and `sapling-800` are four dark warm values that at 7px are one colour.

**The reservation is against being read as a level, not against the colour.** An orange bar in a chart reads as level 2 because nothing beside it says otherwise; a bare chip's dot is never unlabelled, so it says "high priority" and nothing more. It is also why `sunshine-500` at 1.81:1 is acceptable on this mark: the dot is not the only carrier of the fact. Full narrowing in `readme.md`, under the level ramp.

**Priority on Report is the worked example.** `high` → `bad`, `medium` → `warn`, `low` → `neutral`. The tone names describe strength of signal, not brokenness: `bad` is what a reader should act on first. `low` takes `neutral` rather than `info` because low priority is the absence of a signal, and a grey dot beside an orange one is the pair that reads fastest. Do not build a priority ramp of its own. See `provenance/Dots and bullets decision 2026-08-05.html`.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` — the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only; it is not an app token.

**Already in the library.** `@contentious/ui` exports **Badge**. Do not port this implementation — apply the rules above to the library's component instead. See `Repo reconciliation.html`, finding 09.

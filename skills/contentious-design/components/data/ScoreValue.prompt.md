The only way a 0-100 score is shown. Use it for the Watchlist score column, result cards, score stats and any score in prose.

```jsx
<ScoreValue score={81} size="sm" />          {/* table row: number + five-segment track */}
<ScoreValue score={63} size="lg" />          {/* headline: number + rail */}
<ScoreValue score={63} size="inline" marker="dot" />  {/* in a sentence */}
<ScoreValue score={null} />                  {/* "not scored", never 0 */}
```

**The level is never the text colour.** All five `--star-*` stops fail AA as small text on every product ground - against --surface-page: fire 3.58:1, amber 2.51:1, sapling 2.48:1, olive 2.16:1, sunshine 1.81:1, and 2.47:1 for the sunshine-700 the Watchlist column shipped with. The number stays `--text-strong` and a fill beside it carries the level. Darkening the ramp until it passes is not the fix: five dark stops stop reading as a ramp.

- **Default to the track.** Five segments, `n` filled, the rest `--level-empty`. Colour and position both encode the level, so it survives greyscale, colour blindness and a bad laptop screen - and it shows the band, which a single swatch cannot.
- **Dot only in prose**, where a track would break the line. **Rail at headline size**, where a track becomes a chart and the page already has `ScoreGauge` for that.
- **Never a tint pill or a coloured circle behind the number.** The 200-250 tints sit far closer together than the 500s, so the ramp flattens exactly where it has to be readable, and the system owns one circle already: the avatar.
- **The number is Bely Display**, not mono. A score is a value, not metadata. `size="inline"` hands it back to the surrounding face, because there it is prose.
- Bands come from `scoreToLevel()` in `StarRating.jsx`: **90 / 70 / 50 / 30**, nearest whole star. Do not band locally.
- A quantity is not a score. Page counts, costs and token totals stay neutral and never share a column with a score.
- **Never on a deep card.** `--level-empty` is limestone-750 and so is `--surface-card-deep`: the track's empty segments land at 1.00:1 and disappear, leaving filled marks with no track behind them, so position stops encoding anything. There is no variant that fixes it. Put the score on a pale card.

Full workings: `explorations/Coloured numbers.html`. Bands: `provenance/Score band decision 2026-08-01.html`.

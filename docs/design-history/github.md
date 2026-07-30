repo: contentiousltd/contentious-ui
branch: main
path: src/styles, src/lib, src/components, docs

## Last sync

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

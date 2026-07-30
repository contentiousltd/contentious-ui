Every top-level section page starts with one of these.

```jsx
<PageHeader section="watchlist" title="Watchlist"
  lede="The pages you want monitored. Depending on the size of your inventory and your account, this may be everything, or a curated sample." />

<PageHeader title="About" breadcrumb={<Breadcrumb trail={[
  {label:'Results', href:'#'}, {label:'Individual results', href:'#'}, {label:'About'}]} />} />
```

**The illustration is not decoration.** Estate, Inventory, Watchlist and Results are four structurally identical list pages; the illustration is what makes them instantly distinguishable, and the marketing site pairs the same four images with the same four words, so they are effectively part of the terminology. Don't build a top-level section without one, and don't invent new ones – ask.

`Breadcrumb` sits **inside** the page, not in the chrome. It says where this record sits; the nav strip says which realm you are in. Use it only for drill-down (a single result inside Results), never to restate the top-level nav.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`, currently 24px x 0.75 = 18px. Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` / `--motion-reveal` / `--motion-exit`**, never `--transition-*` — the library owns those names at different values.

**Already in the library.** `@contentious/ui` exports **PageHeader (a different implementation — check before overwriting)**. Do not port this implementation — apply the rules above to the library's component instead. See `Repo reconciliation.html`, finding 09.

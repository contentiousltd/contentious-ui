The single secondary-navigation pattern in the product. Sits directly under `<TopBar>`, same background, one hairline.

```jsx
<SecondaryNav realm="Oxfam 2 · Settings" active="Overview"
  tabs={['Overview','Properties','Brand & strategy','Taxonomy','Audit schedule',{label:'Danger zone',danger:true}]}
  exitLabel="← Back to Oxfam 2" />
```

- **No vertical rails anywhere, at any level.** Billing had one; four items didn’t earn 280px of permanent chrome.
- Active state is a 2px fire underline plus strong text. No pills, no filled blocks, no boxes.
- Realm label left, exit right – the two jobs a side nav gave for free: where am I, how do I get out.
- Repeat the active tab as the page h1. Redundant on purpose: it anchors the page on a deep link or back button.
- Order by most-visited, destructive last. Never alphabetical.
- Level 3 is not navigation. Sub-views use `<SegmentedControl>`; never nest a second strip.
- Omit entirely when a realm has one section – the h1 carries it.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` — the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only; it is not an app token.

**Already in the library.** `@contentious/ui` exports **Tabs**. Do not port this implementation — apply the rules above to the library's component instead. See `Repo reconciliation.html`, finding 09.

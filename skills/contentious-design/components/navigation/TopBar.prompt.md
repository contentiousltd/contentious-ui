Level-1 navigation. Project-scoped work sections only – admin realms are reached through the avatar menu.

```jsx
<TopBar logo="images/contentious-monogram.png"
  switcher={<ProjectSwitcherTrigger project="Oxfam 2" />}
  items={['Estate','Inventory','Watchlist','Results']} active="Results"
  contextActive={realm === 'work'}
  avatar={<Avatar initials="JH" />} />
```

**The cluster is the point.** Switcher first, then its four sections, gap 26, immediately after the wordmark – reading left to right in hierarchy order. Do not push the sections to the right-hand side: with the switcher far left and the sections far right, nothing but convention connects them, and a `<SecondaryNav>` beneath will steal the switcher by proximity (it ends up 6px from the strip’s tabs and ~700px from the pages it governs).

**`contextActive={false}` in every admin realm.** The switcher and its sections dim together to 42%, which says two things at once: these five are one group, and this group is not the page you’re on – the strip below is. They remain clickable. Full strength returns on Estate, Inventory, Watchlist and Results.

Other rules:
- **The band is full-bleed, its content is not.** The fill and the bottom hairline run the width of the window; what sits on them lines up with the content column, via `padding-inline: max(gutter, (100% - var(--chrome-column)) / 2)` in `components.css`. Otherwise a wide viewport gives the page two different edges: at 2200px on contentoperatingmodel.com every section centred inside 1280px while the brand sat 64px from the window.
- **`--chrome-column` is the alignment target and defaults to `--container-max-width` (1080px).** A product whose sections cap wider sets it once on the page, not per band, and `.c-strip` follows automatically. It is not a signature token and does not join the closed set.
- **This is not the marketing nav variant.** It aligns the app's chrome band and closes the wide-viewport defect; a front door still gets `.c-topbar` doing marketing duty, `nowrap` and all, and what collapses first at narrow widths is still open.
- The brand lockup and nav items never wrap.
- The avatar sits alone on the right. No Sign out here; it lives in the avatar menu.
- Never a third horizontal band. If the project needs more room, it doesn’t get its own row – it gets the cluster.
- **The brand is a link and takes no hover underline.** It is in the one opt-out list in the Links block of `components.css`, with `.c-topbar__sections a` and `.c-strip__tab`: the sunshine underline belongs to a link that is a run of text, not to one that is a whole object.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` — the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only; it is not an app token.

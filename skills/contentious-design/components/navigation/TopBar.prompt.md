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
- The brand lockup and nav items never wrap.
- The avatar sits alone on the right. No Sign out here; it lives in the avatar menu.
- Never a third horizontal band. If the project needs more room, it doesn’t get its own row – it gets the cluster.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`, currently 24px x 0.75 = 18px. Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` / `--motion-reveal` / `--motion-exit`**, never `--transition-*` — the library owns those names at different values.

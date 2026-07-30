Chooses the live project. The bar shows the **name only** – no mono label, no client prefix, no path.

```jsx
<ProjectSwitcherTrigger project="Oxfam 2" open={open} onClick={toggle} />

<ProjectSwitcherMenu project="Oxfam 2" searchable
  groups={[
    { client: 'Oxfam', count: 2, projects: [
      { name: 'Oxfam 2', sub: 'shop.oxfam.org.uk · 538 pages', current: true },
      { name: 'Oxfam', sub: 'oxfam.org.uk · 874 pages' } ] },
    { projects: [ { name: 'Acme Retail', sub: 'acmeretail.com · 306 pages' } ] },
  ]}
  actions={['Project settings', 'All clients & projects']} />
```

Progressive disclosure – nothing appears before it’s needed:
- **One project:** header row + two actions. No list, no search, no clients, no explainer.
- **Several projects, no clients:** flat "Switch to" list. Never mention clients.
- **Agency:** set `client` ONLY on groups with 2+ projects, so a one-project client renders as a plain row and its name is never printed twice.
- Search past six projects.

Current project: absent from a flat list (the header names it), but kept visible-and-greyed inside a client group so the group’s count matches its rows.

Wrap the trigger in `<Tooltip>` to explain what it switches. Don’t add a coachmark as well.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` / `--motion-reveal` / `--motion-exit`**, never `--transition-*` — the library owns those names at different values.

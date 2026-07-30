Closes every page. Two mono-labelled link groups, right-aligned, against the product description on the left.

```jsx
<AppFooter logo="images/contentious-monogram.png"
  description="Keeping track of the health and fitness of your content across multiple criteria."
  groups={[
    { label: 'Core', links: [{label:'Framework'},{label:'Pricing'},{label:'Privacy'},{label:'Terms'}] },
    { label: 'Learn', links: [{label:'What is a health check?'},{label:'Quality vs traffic'}] },
  ]}
  legal={<>© 2026 Contentious Ltd. All rights reserved.</>} />
```

Sits on `--surface-raised`, so it reads as the end of the page rather than another card. The attribution paragraph naming Contentious and the sibling products is part of the brand and shouldn't be dropped to save space.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` / `--motion-reveal` / `--motion-exit`**, never `--transition-*` — the library owns those names at different values.

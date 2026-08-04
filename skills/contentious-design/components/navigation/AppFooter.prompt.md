Closes every page, and it **reverses**. Named link columns against the product description on the left, on a dark ground.

```jsx
<AppFooter logo="images/clipboard-pale.png"
  description="Keeping track of the health and fitness of your content across multiple criteria."
  groups={[
    { label: 'Core', links: [{label:'Framework'},{label:'Pricing'},{label:'Privacy'},{label:'Terms'}] },
    { label: 'Learn', links: [{label:'What is a health check?'},{label:'Quality vs traffic'}] },
  ]}
  legal={<>© 2026 Contentious Ltd. All rights reserved.</>} />
```

Sits on `--surface-footer`, gloaming-700, and carries `data-surface="inverse"`. The attribution paragraph naming Contentious and the sibling products is part of the brand and shouldn't be dropped to save space.

- **The ground is its own token, and only the ground is.** Every text role, rule and link inside resolves from the inverse block, which already tunes the link pair for a dark ground — fire-650 fails as text there, fire-350 does not. `--surface-inverse` is gloaming-800 and belongs to tooltips, so the footer declares `--surface-footer` at gloaming-700: warmer, less absolute, and it stops the page dead in a way no light treatment can now that the page itself is a definite ground. Weakest value in the footer is the legal line at 5.3:1.
- **Named columns, one link per line.** The old form was right-aligned mono labels above a wrapped run, which put seven Core links on one line reading right to left in two directions at once.
- **Every heading takes `--text-secondary`, the wordmark included** — limestone-700 on the inverse ramp, 9.6:1, the same as the description. Nothing in the footer is bright: it is the end of the document, not a section of it, and the display cut carries the hierarchy on face and size rather than on ink. At `--text-strong` the wordmark sat at 13.8:1 and claimed a top level the footer does not have.
- **The wordmark is Bely Display**, matching the header. A name set in the display cut at the top of a page must not change face at the bottom of it.
- **The mark is a pair.** `clipboard-gloaming.png` on light grounds, `clipboard-pale.png` here. The gloaming cut's dark passage is 36% of its ink and lands at 1.17:1 on this ground — it ghosts rather than vanishes, which for a logo is worse. The pale cut takes that passage to limestone at 10.95:1 and keeps the red (`--fire-500`, 3.54:1) and yellow (`--sunshine-500`, 7.00:1). **The pale cut is dark-grounds-only:** its pale passage is 1.01:1 against the limestone-600 page.
- Watch the `--rule-section` hairline above the legal line: 1.30:1 on gloaming-700, down from 1.59 on gloaming-800. It reads, but it is the thinnest thing in the footer.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library: `--base-font-size` is product density (18px for Content Health Check, set in `themes/content-health-check.css`) and `--text-multiplier` is the responsive step (1 / 1.1 / 1.2 by breakpoint). **Assign neither here.** Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` (colour only) / `--motion-state-slow` (geometry moves) / `--motion-overlay` (an overlay arrives) / `--motion-exit`**, never `--transition-*` — the library owns those names at different values. `--motion-reveal` is 600ms and marketing-only; it is not an app token.

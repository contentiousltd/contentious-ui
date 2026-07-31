Level-1 navigation below the chrome breakpoint – the mobile counterpart of `TopBar`. Same hierarchy, rotated: project as **context**, then the four work sections, then account.

```jsx
<MobileNavTrigger onClick={() => setOpen(true)} />
<MobileNav open={open} onClose={() => setOpen(false)}
  project="Contentious" projects={['Art Fund','Contentious','Email newsletter','Sands']}
  switching={switching} onSwitchProject={() => setSwitching(s => !s)} onSelectProject={pick}
  items={['Estate','Inventory','Watchlist','Results']} active="Results"
  projectItems={['Project settings']}
  accountItems={['Account','Billing','Admin',{label:'Sign out',quiet:true}]}
  reference={[{label:'Learn',items:['What is a health check?','Quality vs traffic','Recurring vs one-off']},
              {label:'Product',items:['Framework','Pricing','Example results','What’s new']}]}
  legal={['About','Privacy','Terms']}
  panel={panel} onOpenReference={() => setPanel(p => p ? null : 'reference')}
  onNavigate={go} />
```

**Three weights, in this order, always.** Context block (`--t-row`, project name) → the four sections (`--t-row`, full-width targets) → account (`--t-ui`, pinned to the bottom on `--surface-chrome`). A flat list of equal rows is the defect this component exists to prevent: it forces a full read on every visit and gives the eye nothing to land on.

**The project is context, not a nav item.** One tappable block that states where you are and opens the switch sub-panel. Never render the project list inline – on the shipped version four projects occupied four of thirteen rows, in the top slot, to answer a question asked once a session, and they looked identical to the four sections directly beneath them (the desktop proximity bug, rotated 90°).

**`items` order is fixed: Estate → Inventory → Watchlist → Results.** The funnel order, matching the bar. **Never promote the current page to the top** – a menu that rearranges itself by where you are can't be learned, and `is-current` already says which one you're on.

**Mark the page, not the project.** `active` puts the desktop `--accent-marker` on the left edge of the current section. Do not use a "You're here" chip: chips are status, and the project is already named by the wordmark, the page title and the context block.

**Account goes at the bottom, and stays there.** Its own surface, smaller type, never scrolls with the work, sign out `--quiet`. The bottom is the thumb zone, which is the right trade for the group tapped least – easy to reach, impossible to mistake for the app.

**Site pages are one row, not nine.** Framework, Pricing, Example results, What's new, the three Learn explainers and About / Privacy / Terms live in the site footer, which on mobile is a long scroll from wherever you are. They earn a route from the menu, but not rows: `reference` renders a single quiet row at the foot of the account group — "About Content Health Check" — opening a sub-panel by the same mechanism as the project switcher. Nine equal rows in the sheet would rebuild the exact defect this component was made to fix.

- **Group by purpose, and lead with Learn.** "Core" and "Learn" are footer taxonomy; in the panel the useful-mid-task explainers come first, product pages second.
- **The row is not an account item.** It sits in its own band inside the footer, below a hairline, with no label of its own — put it directly under Sign out and it reads as part of the ACCOUNT group, which is what a labelled group does to anything beneath it.
- **About / Privacy / Terms are a wrapped run, not rows** (`legal`) — `--t-hint`, `--label-color`, 32px targets. Rows imply somewhere you might go; this is fine print you occasionally need.
- **The footer stays as it is.** This is an additional route, not a replacement, and the two must not disagree about what exists.

**`projectItems` sits with the sections, not with account.** Project settings belongs to the project, the same call the desktop realm strip makes.

Motion (owned by the CSS, not the caller):
- **In** – sheet translates from the right, `--motion-reveal`; scrim to `--scrim-panel` (34%) over 200ms, faster than the sheet, so the app is behind glass before the panel lands.
- **Rows** – context block plus the sections fade and slide 14px, 26ms apart from 110ms. Set `--i` per row; the stagger stops before the account footer.
- **Out** – `--motion-exit`, no stagger. Leaving is not an event.
- **Reduced motion** – opacity only, 120ms.

Other rules:
- **The sheet stops at `min(330px, 85vw)`.** The visible strip of page is what says "layer over Results" rather than "screen you navigated to", and it's the cheapest dismiss target.
- **Only one sub-panel open at a time**, and only ever one level deep. `panel` is a single value for that reason; a sub-panel that can open a sub-panel is a sitemap, not a menu.
- Dismiss must be free: scrim tap, ✕, Escape, hardware back. Never the ✕ alone.
- Every row is a full-width target with a 44px floor. `min-height` uses `max(44px, …)` so a low `--text-multiplier` can't shrink a touch target.
- Never open this over a full-bleed menu page, and never both patterns in one product.

**Not adopted: the bottom tab bar.** Putting the four sections in a fixed bottom bar is a real improvement in reach and was explored (`Mobile nav.html`, “Not adopted — a bottom tab bar for the sections”), but it claims 58px of every data-dense page permanently and hard-codes "four sections" into the chrome – this component absorbs a fifth for free. Revisit with usage data, not in the abstract.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`. Both inputs are owned by the library. Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. The one exception is the 44px touch floor, which is a physical constraint and not a type-scale value.

**Motion uses `--motion-state` / `--motion-reveal` / `--motion-exit`**, never `--transition-*` — the library owns those names at different values.

**Scrim:** `--scrim-panel`, the light step — this is a layer over a page that is still there, and reading the page behind it is the point. `--scrim-modal` (80%) is for dialogs only. The colour resolves to the repo's `--overlay` (`20 4% 14%`), the same warm gloaming tint as the shadow tokens; never introduce another.

**Don't reach for Radix `Dialog` / `Sheet` for this.** `client/src/index.css` forces `background-color … !important` on `[role="dialog"]` and `[data-radix-dialog-overlay]`, so a Radix panel can't take limestone without escalating `!important`. Hand-rolled here on purpose; untangling that override is its own piece of work.

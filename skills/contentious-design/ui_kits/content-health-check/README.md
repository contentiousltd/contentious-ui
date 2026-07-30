# Content Health Check – UI kit

Click-through, plain HTML + CSS, no build step. Open `index.html`.

- **Account** – Clients & projects (the aligned list), People
- **Billing** – Plan (segmented control switches monthly/yearly pricing), Usage
- **Project settings** – Overview, Audit schedule (switch + dependent fields + disabled save)
- **Admin** – Monitoring: the full set of data patterns

Navigate with the strip tabs, the avatar menu (Account / Billing / Admin), the project switcher, and the four work sections in the top bar. Undesigned tabs fall through to a placeholder rather than breaking.

## What it demonstrates

- The **grouped project cluster** – switcher plus its four sections as one unit, and the `is-standdown` dim in every admin realm (click Estate or Results to see it return to full strength).
- **One secondary nav** across four realms with different tab counts.
- **One surface depth**: hairline section headers, metric bands, no nested slabs.
- **Data colour discipline**: neutral by default, sapling for good news, fire for needs-action, grey for a genuine zero.

## Implementation note

Everything here uses the classes in `components/components.css` – the plain-CSS mirror of `components/**/*.jsx`. The two are kept in step deliberately: use the CSS in static HTML and prototypes, the JSX in React. If you change one, change the other.

## Not in the kit

Estate, Inventory, Watchlist and Results are designed in the root-level HTML files but not yet rebuilt here. See `Inventory - Estate Discovery.html` and `Analysis - Catalogue & Runs.html`.

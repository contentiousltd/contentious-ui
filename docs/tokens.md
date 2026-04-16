# Token reference

All tokens are CSS custom properties defined in `@layer tokens` in `tokens.css`. Import `tokens.css` (or `all.css`) to use them.

---

## Colours

### Palette tokens

Eleven brand colour families, 17 shades each (100–900 in 50-step intervals). All values are hex.

```
--{family}-{shade}
```

| Family | Base shade | Character |
|--------|-----------|-----------|
| `limestone` | 300 | Warm cream — primary surface |
| `gloaming` | 700 | Warm charcoal — primary text |
| `sorbet` | 500 | Warm salmon — VTS signature |
| `fire` | 500 | Coral red — CM/CHC signature, errors |
| `sunshine` | 500 | Golden yellow — warnings |
| `wave` | 500 | Teal/cyan — info |
| `sapling` | 500 | Soft green — success |
| `coffee` | 500 | Warm brown |
| `amber` | 500 | Warm orange |
| `olive` | 500 | Yellow-green |
| `lichen` | 300 | Cool pale neutral — CM surfaces |

Shades run light (100) to dark (900). The base shade is roughly midpoint for most families.

### Semantic aliases

These are fixed across all products:

```css
/* Score gradient: poor → excellent */
--star-1    /* fire-500 */
--star-2    /* amber-500 */
--star-3    /* sunshine-500 */
--star-4    /* olive-500 */
--star-5    /* sapling-500 */

/* Status colours */
--success-subtle    /* sapling-100 */
--success-text      /* sapling-800 */
--warning-subtle    /* sunshine-100 */
--warning-text      /* sunshine-900 */
--error-subtle      /* fire-100 */
--error-text        /* fire-800 */
--info-subtle       /* wave-100 */
--info-text         /* wave-800 */
```

### Theme tokens (per product)

Each product's theme file maps these to palette tokens. Import a theme file alongside `tokens.css`.

```css
--background          --foreground
--card                --card-foreground
--popover             --popover-foreground
--primary             --primary-foreground
--secondary           --secondary-foreground
--muted               --muted-foreground
--accent              --accent-foreground
--destructive         --destructive-foreground
--border
--input
--ring
--chart-1 … --chart-5
--loading-ring-1 … --loading-ring-4
```

---

## Spacing

4-point base grid, 12px included (see [ADR note on gaps](../docs/adr/0001-token-first-css-architecture.md)).

```css
--space-xs:      0.25rem   /*  4px */
--space-sm:      0.5rem    /*  8px */
--space-sm-plus: 0.75rem   /* 12px — never skip this */
--space-md:      1rem      /* 16px */
--space-lg:      1.5rem    /* 24px */
--space-xl:      2rem      /* 32px */
--space-2xl:     3rem      /* 48px */
--space-3xl:     4rem      /* 64px */
--space-4xl:     6rem      /* 96px */
--space-5xl:     8rem      /* 128px */
--space-6xl:     10rem     /* 160px */
```

---

## Borders and radius

```css
--radius:              0.25rem   /* 4px — base component radius */
--border-radius-sm:    3px
--border-radius-md:    6px
--border-radius-lg:    12px
--border-radius-full:  9999px

--border-width-thin:   1px
--border-width-medium: 2px
--border-width-thick:  4px
```

---

## Shadows

```css
--shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md:  0 2px 10px rgba(0, 0, 0, 0.1)
--shadow-lg:  0 4px 20px rgba(0, 0, 0, 0.15)
```

---

## Motion

### Durations

```css
--duration-instant:     100ms   /* Button press, toggle, colour change */
--duration-fast:        200ms   /* Menu open, tooltip, hover */
--duration-normal:      350ms   /* Accordion, modal, drawer */
--duration-slow:        500ms   /* Entrance animations, page reveals */
--duration-glacial:     800ms   /* Hero reveals, dramatic entrances */

/* Exits are shorter — feels faster to the user */
--duration-fast-exit:   150ms   /* 75% of fast */
--duration-normal-exit: 250ms   /* 75% of normal */
```

### Easing

Exponential curves for natural deceleration:

```css
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1)    /* Elements entering */
--ease-in:     cubic-bezier(0.7, 0, 0.84, 0)    /* Elements leaving */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)   /* State toggles */
```

---

## Z-index

```css
--z-base:      1
--z-dropdown:  100
--z-sticky:    1000
--z-modal:     2000
--z-tooltip:   3000
```

---

## Layout

```css
--container-max-width: 1080px
--content-max-width:   1080px
--width-narrow:        40rem    /* ~640px — prose, forms */
--width-content:       80rem    /* ~1280px — full-width sections */
--width-prose:         65ch     /* Ideal reading line length */
--page-padding:        clamp(2rem, 6vw, 5rem)
```

---

## Breakpoints (reference)

These document the scale but cannot be used directly in media queries. Use the raw values in `@media` rules.

```css
--breakpoint-xs:  32rem  /*  512px */
--breakpoint-sm:  40rem  /*  640px */
--breakpoint-md:  48rem  /*  768px */
--breakpoint-lg:  64rem  /* 1024px */
--breakpoint-xl:  80rem  /* 1280px */
--breakpoint-2xl: 96rem  /* 1536px */
```

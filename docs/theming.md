# Theming guide

A theme maps semantic tokens (`--background`, `--primary`, etc.) to palette tokens for a specific product. Themes live in `src/styles/themes/`.

---

## How themes work

`tokens.css` defines the raw palette — all 187 colour tokens as hex values. But components don't reference `--sorbet-500` directly. They reference semantic tokens like `--primary`, `--background`, and `--border`.

A theme file bridges the two:

```css
/* themes/voice-tone-style.css */
@layer theme {
  :root {
    --background: var(--limestone-300);
    --primary:    var(--sorbet-500);
    /* ... */
  }
}
```

This means you can swap the entire colour identity of a product by swapping the theme file — without touching any component code.

---

## Available themes

| File | Product | Primary | Surfaces |
|------|---------|---------|---------|
| `themes/voice-tone-style.css` | Voice Tone & Style | sorbet-500 | limestone |
| `themes/content-maturity.css` | Content Maturity | fire-500 | lichen |

---

## Semantic token reference

Every theme must define these tokens:

```css
@layer theme {
  :root {
    /* Surfaces */
    --background:              /* Page background */
    --foreground:              /* Default text colour */

    /* Cards and overlays */
    --card:                    /* Card background */
    --card-foreground:
    --popover:                 /* Popover/dropdown background */
    --popover-foreground:

    /* Brand colour */
    --primary:                 /* Main action colour */
    --primary-foreground:      /* Text on --primary backgrounds */

    /* Secondary actions */
    --secondary:
    --secondary-foreground:

    /* Muted / de-emphasised */
    --muted:
    --muted-foreground:

    /* Accent highlights */
    --accent:
    --accent-foreground:

    /* Destructive actions */
    --destructive:
    --destructive-foreground:

    /* Form elements */
    --border:                  /* Default border colour */
    --input:                   /* Input border colour */
    --ring:                    /* Focus ring colour */

    /* Data visualisation */
    --chart-1: … --chart-5:

    /* Loading ring segments */
    --loading-ring-1: … --loading-ring-4:
  }
}
```

---

## Creating a new theme

1. Create `src/styles/themes/{product-name}.css`.
2. Declare `@layer theme { :root { … } }`.
3. Map every semantic token above to a palette token from `tokens.css`.
4. Add the theme to the table in this file and in `README.md`.
5. Update `package.json` exports if needed.

**Example — a hypothetical sunshine-themed product:**

```css
/* themes/content-pulse.css */
@layer theme {
  :root {
    --background:              var(--limestone-300);
    --foreground:              var(--gloaming-700);
    --card:                    var(--limestone-100);
    --card-foreground:         var(--gloaming-700);
    --popover:                 var(--limestone-100);
    --popover-foreground:      var(--gloaming-700);
    --primary:                 var(--sunshine-600);
    --primary-foreground:      var(--gloaming-800);
    --secondary:               var(--limestone-600);
    --secondary-foreground:    var(--gloaming-700);
    --muted:                   var(--limestone-500);
    --muted-foreground:        var(--gloaming-500);
    --accent:                  var(--sunshine-400);
    --accent-foreground:       var(--gloaming-700);
    --destructive:             var(--fire-600);
    --destructive-foreground:  var(--limestone-100);
    --border:                  var(--limestone-600);
    --input:                   var(--limestone-600);
    --ring:                    var(--sunshine-600);
    --chart-1:                 var(--sunshine-500);
    --chart-2:                 var(--fire-500);
    --chart-3:                 var(--sapling-500);
    --chart-4:                 var(--wave-500);
    --chart-5:                 var(--gloaming-400);
    --loading-ring-1:          var(--sunshine-400);
    --loading-ring-2:          var(--sunshine-600);
    --loading-ring-3:          var(--limestone-500);
    --loading-ring-4:          var(--sunshine-400);
  }
}
```

---

## Dark mode

Not yet implemented. The layer architecture supports it — add a `[data-theme="dark"]` block within `@layer theme` and use a `data-theme` attribute on `<html>`. Coordinate with the design system before adding dark mode tokens.

# ADR-0002: Hex over HSL for colour tokens

**Status:** Accepted
**Date:** 2026-04-16

## Context

The original `palette.css` stored all 187 colour tokens as bare HSL channels without the `hsl()` wrapper:

```css
--sorbet-500: 7 36% 62%;
```

This format was imposed by **Tailwind 3's opacity modifier system**. Tailwind's `bg-sorbet-500/50` syntax requires bare HSL channels so it can inject the alpha channel: `hsl(7 36% 62% / 0.5)`. Without this format, opacity modifiers break.

The `contentious-astro` design authority stores the exact same palette as **hex values**:

```css
--sorbet-500: #C1827A;
```

This is the format the palette was designed in, and it's more readable and portable.

## Decision

Switch all colour tokens from HSL channels to hex, matching `contentious-astro` exactly.

```css
/* Before */
--sorbet-500: 7 36% 62%;

/* After */
--sorbet-500: #C1827A;
```

Token values in consuming code change from:

```css
/* Before */
color: hsl(var(--sorbet-500));

/* After */
color: var(--sorbet-500);
```

## Consequences

**Good:**
- One canonical colour format across the entire ecosystem
- Tokens are readable — you can see the colour at a glance
- No Tailwind dependency on the token format
- Simpler syntax in consuming CSS (`var(--x)` not `hsl(var(--x))`)

**Breaking — Tailwind opacity modifiers:**
`bg-sorbet-500/50` and similar will stop working for projects still on Tailwind. An audit of `voicetoneandstyle` found only **2 usages** of opacity modifiers. These are replaced with explicit opacity tokens or inline styles as part of the Tailwind removal in Phase 4.

CHC and CM have 193+ opacity modifier usages. Their migration to hex happens when they adopt the shared package and remove their own Tailwind in Phase 5 — until then they maintain their own HSL-channel token copies.

**Watch for:**
- Any component or utility that wraps token values in `hsl()` — these must be updated.
- The Tailwind preset's `fullScale()` helper references token values — it needs updating to work with hex vars (Tailwind 3 can use `var(--hex-value)` for colour application, just not for opacity modifiers).

# ADR-UI-0002: Hex over HSL for colour tokens

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

## Reaffirmed — 31 July 2026 (OKLCH considered and rejected)

Tailwind 4 ships its own default palette in OKLCH, which raised whether ours should
follow. It would have superseded this ADR, so it was decided rather than find-and-replaced.
**Outcome: no.** Neither a format conversion nor a re-derivation of the ramps; hex stays
the storage format.

The argument usually given for OKLCH does not survive checking: the source format does not
affect how Tailwind interpolates. It picks an interpolation space of its own regardless, so
"OKLCH blends better in Tailwind" is not true, and since our palette replaces Tailwind's
entirely we inherit nothing from their choice either way.

**Correction, 1 August 2026.** This paragraph originally said Tailwind emits
`color-mix(in srgb, …)`. That was wrong, and it was checked against a real build during
Content Health Check's Tailwind 4 cutover: **4.3.3 emits `color-mix(in oklab, …)`** —
`.border-fire-400\/50` compiles to
`color-mix(in oklab, var(--color-fire-400) 50%, transparent)`, with a static hex fallback
beside it. The conclusion is unaffected, because the point was always that the *source*
format is irrelevant to the interpolation space, and it still is. But the evidence as
stated was false, and it was load-bearing in the argument, so it is corrected rather than
quietly left. Claude Design was shown the correction and the decision is unchanged.

What was accepted instead: OKLCH is the space to **review** a ramp in, not to store it in.
The design system's `colors.css` now carries each family's rationale inline and one hard
rule — no two adjacent stops may sit closer than **1.0 L** in OKLCH, the threshold the eye
reads on a flat area. That is precisely what the limestone light end failed, and it is now
documented rather than re-spaced: `limestone-150 / 250 / 350 / 450` are **aliases of the
stop below, not steps**, which is the honest account of the `-400`/`-450` collision Content
Health Check hit. Re-deriving the ramps remains the only route to fixing that for real, and
it is a visible brand change rather than a technical one — so it stays undone deliberately.

**One passage above is now stale.** The Consequences section says CHC and CM keep private
HSL-channel token copies until they "remove their own Tailwind in Phase 5". They no longer
have to remove Tailwind at all: `styles/tailwind4.css` (v0.5.0) resolves suite-constant
colours to literals so Tailwind 4 builds `color-mix()` opacity modifiers from hex directly.
Deleting the private copies is what chc-367 does, on Tailwind rather than after it.

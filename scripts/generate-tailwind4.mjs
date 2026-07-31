#!/usr/bin/env node
/**
 * Generate src/styles/tailwind4.css — the Tailwind 4 bridge.
 *
 * Tailwind only builds a utility for a name it knows, and it learns names from
 * `@theme`. Our tokens are plain custom properties in tokens.css, the semantic
 * layer and the per-product theme files, so without a bridge a product on
 * Tailwind gets no `bg-fire-500` at all — which is why Content Health Check and
 * Content Maturity each grew a private palette copy in the first place.
 *
 * This file is GENERATED. Never hand-edit it: it is rebuilt from the token
 * files, so an edit here is lost on the next run and, worse, becomes a second
 * definition of a value while it survives. Add or rename tokens at source and
 * re-run. See suite ADR-0012.
 *
 *   node scripts/generate-tailwind4.mjs           write the file
 *   node scripts/generate-tailwind4.mjs --check   fail if it is out of date (CI)
 *
 * Why `@theme inline`: with a plain `@theme`, Tailwind emits utilities that
 * point at its own copy of the value, so a product theme re-pointing --primary
 * would be ignored. `inline` makes `bg-primary` emit `var(--primary)` directly,
 * so the theme files keep working and there is still one source of truth.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const OUT = join(ROOT, 'src/styles/tailwind4.css');

/** Files we harvest names from. Values never matter — `inline` resolves at runtime. */
const SOURCES = [
  'src/styles/tokens.css',
  'src/styles/typography.css',
  'skills/contentious-design/tokens/semantic.css',
  'skills/contentious-design/tokens/products.css', // the 28-token signature set
  'src/styles/themes/content-health-check.css', // any theme: the names are identical
];

/**
 * Product-scoped sources: files where a token's value depends on which product
 * is rendering. A token any of these re-points must stay a var() in the bridge.
 *
 * products.css matters as much as themes/ and is easier to miss, because it
 * re-points under `[data-product="…"]` rather than in a per-product file. Its
 * 28 tokens are exactly the ones that make one product not look like another —
 * so freezing them to a literal renders every product in CHC's colours, which
 * is the failure the signature layer exists to prevent.
 */
const productScoped = (file) =>
  file.includes('/themes/') || file.endsWith('tokens/products.css');

/**
 * Type is mapped by hand, not by prefix, because the utility names have to match
 * what products already write. `font-display` and `font-sans` are in ~100 files
 * in Content Health Check; deriving `font-heading-display` from the token name
 * would rename them all for no gain. Left of the arrow is Tailwind's namespace.
 */
const FONT_MAP = [
  ['sans', 'font-body'],           // body text — Bely is a serif, but `font-sans`
  ['serif', 'font-body'],          // is the default body utility, so both point here
  ['display', 'font-heading-display'],
  ['heading', 'font-heading'],
  ['mono', 'font-mono'],
];

/** The eleven brand families. */
const FAMILIES = [
  'limestone', 'gloaming', 'sunshine', 'wave', 'fire', 'sapling',
  'coffee', 'sorbet', 'amber', 'olive', 'lichen',
];

/** Semantic prefixes whose members are colours, so they belong in --color-*. */
const COLOUR_PREFIXES = [
  'surface', 'text', 'rule', 'data', 'chip', 'scrim', 'accent', 'comp',
  'series', 'process', 'star', 'level', 'success', 'warning', 'error', 'info',
  'good', 'danger', 'switch',
];

/** shadcn's semantic set, defined per theme. */
const SHADCN = [
  'background', 'foreground', 'card', 'card-foreground', 'popover',
  'popover-foreground', 'primary', 'primary-foreground', 'secondary',
  'secondary-foreground', 'muted', 'muted-foreground', 'accent',
  'accent-foreground', 'destructive', 'destructive-foreground',
  'border', 'input', 'ring',
];

/** Colours that carry no prefix. */
const BARE_COLOURS = ['categorical', 'overlay', 'focus-ring', 'link-underline'];

/** Not colours despite matching a colour prefix — these are lengths. */
const NOT_COLOURS = new Set([
  'text-lede', 'text-body-size', 'text-support', 'text-hint',
  'focus-ring-width', 'focus-ring-offset', 'chip-radius', 'chip-padding',
  'chip-font-size', 'chip-tracking', 'switch-inset', 'switch-knob-shadow',
  'scrim-color',
]);

/** name → { value, themed } for every custom property we can see. */
const tokens = new Map();

for (const file of SOURCES) {
  const path = join(ROOT, file);
  if (!existsSync(path)) continue;
  // Strip comments first so a commented-out token never becomes a utility.
  const live = readFileSync(path, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const themed = productScoped(file);
  for (const m of live.matchAll(/^\s*--([a-z0-9-]+)\s*:\s*([^;]+);/gim)) {
    const name = m[1];
    const prev = tokens.get(name);
    // A product-scoped file never overwrites a suite-level VALUE — but themed-ness
    // is STICKY, and that distinction is the whole correctness of this function.
    // semantic.css declares --surface-page and products.css re-points it; since
    // semantic.css is read first, deciding themed-ness by first-writer-wins marked
    // it a literal and froze every product at CHC's cream.
    if (themed) {
      if (prev) prev.themed = true;
      else tokens.set(name, { value: m[2].trim(), themed: true });
      continue;
    }
    // Suite-level source: last writer wins on value, themed-ness carries over.
    tokens.set(name, { value: m[2].trim(), themed: prev ? prev.themed : false });
  }
}

const names = [...tokens.keys()];

/**
 * Resolve a token to a literal value, following var() chains.
 *
 * This exists because of a Tailwind 4 behaviour that is easy to ship blind:
 * a theme value of `var(--x)` produces a utility that WORKS but whose opacity
 * modifier is SILENTLY DROPPED — `bg-fire-500/50` emits a fully opaque colour,
 * because Tailwind can't see that the value is a colour and so won't build the
 * color-mix(). Only a literal gets `color-mix(in srgb, #D5544F 50%, transparent)`.
 * Content Health Check has ~200 opacity usages, so this is the difference between
 * a working cutover and a page of solid blocks.
 *
 * Returns null for anything a product theme re-points — those must stay as var()
 * so theming keeps working, and they simply don't support an opacity modifier.
 */
function literal(name, seen = new Set()) {
  if (seen.has(name)) return null;
  seen.add(name);
  const token = tokens.get(name);
  if (!token || token.themed) return null;
  const varRef = token.value.match(/^var\(\s*--([a-z0-9-]+)\s*\)$/i);
  if (varRef) return literal(varRef[1], seen);
  // A literal colour: hex, or a function we can hand to color-mix as-is.
  return /^(#|rgb|hsl|oklch|color-mix)/i.test(token.value) ? token.value : null;
}

const isColour = (n) => {
  if (NOT_COLOURS.has(n)) return false;
  if (BARE_COLOURS.includes(n)) return true;
  if (SHADCN.includes(n)) return true;
  if (FAMILIES.some((f) => new RegExp(`^${f}-\\d{3}$`).test(n))) return true;
  return COLOUR_PREFIXES.some((p) => n === p || n.startsWith(`${p}-`));
};

const allColours = names.filter(isColour).sort();

const groups = {
  /** Suite-constant colours, emitted as literals so opacity modifiers work. */
  colour: allColours.filter((n) => literal(n)),
  /** Product-themed colours, emitted as var() so a theme still wins at runtime. */
  themedColour: allColours.filter((n) => !literal(n)),
  font: FONT_MAP.filter(([, token]) => names.includes(token)),
  weight: names.filter((n) => n.startsWith('font-weight-')).sort(),
  radius: names.filter((n) => n === 'radius' || n.startsWith('border-radius-')).sort(),
  /**
   * DELIBERATELY EMPTY, and this is a correctness fix rather than an omission.
   *
   * The obvious mapping is --space-lg -> --spacing-lg, giving p-lg and gap-lg.
   * It is a trap. Tailwind 4 resolves max-w-<key> and w-<key> from --spacing-*
   * when a key of that name exists, in preference to its own --container-*
   * scale. Our spacing names are t-shirt sizes, so every one of them collides:
   * emitting --spacing-3xl silently redefines max-w-3xl from 48rem to 4rem.
   *
   * That is not theoretical. It shipped in 0.7.0 and broke 64 max-w-* usages in
   * Content Health Check the moment it moved to Tailwind 4 — body text wrapping
   * one word per line, because max-w-3xl became 64px. Only max-w-7xl survived,
   * for the sole reason that we have no --space-7xl.
   *
   * The conflict is inherent: Tailwind's spacing namespace assumes numeric keys,
   * so p-lg and max-w-lg cannot both be correct. Given the choice, max-w-* wins
   * — it is Tailwind's own vocabulary and used in every product, while the named
   * spacing utilities were used by exactly zero bridge consumers. Spacing is
   * reached as var(--space-lg) in CSS, which is how the design system's own
   * components.css already does it.
   */
  spacing: [],
  shadow: names.filter((n) => /^shadow-/.test(n)).sort(),
};

/** Map a source token name onto its Tailwind 4 namespace. */
const target = {
  colour: (n) => `--color-${n}`,
  themedColour: (n) => `--color-${n}`,
  font: ([alias]) => `--font-${alias}`,
  weight: (n) => `--font-weight-${n.replace('font-weight-', '')}`,
  radius: (n) => (n === 'radius' ? '--radius' : `--radius-${n.replace('border-radius-', '')}`),
  spacing: (n) => `--spacing-${n.replace('space-', '')}`,
  shadow: (n) => `--shadow-${n.replace('shadow-', '')}`,
};

/** The token a row points at — fonts carry their own, everything else is its own name. */
const source = (key, row) => (key === 'font' ? row[1] : row);

/** Literal sections resolve the value; everything else keeps the var() reference. */
const rhs = (key, row) => (key === 'colour' ? literal(row) : `var(--${source(key, row)})`);

const section = (title, key, note) => {
  const rows = groups[key];
  if (!rows.length) return '';
  const width = Math.max(...rows.map((r) => target[key](r).length));
  return [
    `  /* ---- ${title} ${'-'.repeat(Math.max(2, 66 - title.length))} */`,
    ...(note ? note.split('\n').map((l) => `  /* ${l} */`) : []),
    ...rows.map((r) => `  ${target[key](r).padEnd(width)}: ${rhs(key, r)};`),
    '',
  ].join('\n');
};

const out = `/* ================================================================
   Tailwind 4 bridge — GENERATED, DO NOT EDIT.

   Rebuild with \`npm run generate:tailwind4\`; CI checks it with
   \`npm run generate:tailwind4 -- --check\`. Add tokens at source
   (tokens.css, the design system's semantic.css, or a theme file),
   never here.

   Products on Tailwind import this after the token layers:

     @import "tailwindcss";
     @import "@contentious/ui/styles/layers.css";
     @import "@contentious/ui/styles/tokens.css";
     @import "@contentious/ui/styles/semantic.css";
     @import "@contentious/ui/styles/themes/<product>.css";
     @import "@contentious/ui/styles/tailwind4.css";

   TWO BLOCKS, and the split is not cosmetic.

   Tailwind can only build an opacity modifier when it can SEE the colour.
   Given \`--color-x: var(--y)\` it emits a working utility whose \`/50\` is
   silently dropped — a fully opaque block, no warning. Given a literal it
   emits color-mix(). So suite-constant colours are resolved to literals
   here and support \`bg-fire-500/20\`; colours a product theme re-points
   stay as var() so theming keeps working, and do NOT take a modifier.
   Reach for a numbered shade rather than an opacity step on those.

   ${groups.colour.length} literal colours · ${groups.themedColour.length} themed · ${groups.font.length} fonts · ${groups.weight.length} weights · ${groups.radius.length} radii · ${groups.spacing.length} spacing · ${groups.shadow.length} shadows
   ================================================================ */

@theme {
${section('Colour — suite-constant, opacity modifiers work', 'colour', 'Resolved from the token files at generation time. Products must not\nre-point these: the palette is suite-level (ADR-0011).')}${section('Type', 'font', 'font-sans and font-serif both resolve to the body face: Bely is a serif.')}${section('Weight', 'weight')}${section('Radius', 'radius')}${section('Spacing', 'spacing')}${section('Shadow', 'shadow')}}

@theme inline {
${section('Colour — product-themed, NO opacity modifier', 'themedColour', 'A theme file re-points these, so they must stay references. bg-primary\nworks; bg-primary/50 renders opaque. Use a shade instead.')}}
`;

if (process.argv.includes('--check')) {
  const current = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
  if (current !== out) {
    console.error('tailwind4.css is out of date — run `npm run generate:tailwind4` and commit the result.');
    process.exit(1);
  }
  console.log(`tailwind4.css is current — ${groups.colour.length} colours, ${names.length} tokens read.`);
} else {
  writeFileSync(OUT, out);
  console.log(
    `Wrote src/styles/tailwind4.css — ${groups.colour.length} colours, ${groups.font.length} fonts, ` +
      `${groups.radius.length} radii, ${groups.spacing.length} spacing, ${groups.shadow.length} shadows.`,
  );
}

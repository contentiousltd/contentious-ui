#!/usr/bin/env node
/**
 * Two checks over the product-signature layer, both suggested by Claude Design
 * after the 4 Aug 2026 ground move, and both of which would have caught real
 * faults from that round:
 *
 * 1. NO TWO GROUND TOKENS IN ONE PRODUCT BLOCK MAY RESOLVE TO THE SAME VALUE.
 *    Three collisions happened because a token landed on another's value when
 *    the page moved (chrome on the card's limestone-400 was the worst: the top
 *    bar and every data surface shared one fill). Documented, deliberate
 *    coincidences are allowlisted below with the reason attached.
 *
 * 2. EVERY TOKEN REFERENCED BY A [data-surface="…"] SCOPE IS DECLARED BY EVERY
 *    PRODUCT BLOCK. A custom property that is missing where a scope resolves it
 *    is invalid at computed-value time, so the role silently inherits instead
 *    of erroring — the label just quietly takes the surrounding colour.
 *
 * Reads the skill's token files; no build needed.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const colors = readFileSync(join(root, "skills/contentious-design/tokens/colors.css"), "utf8");
const products = readFileSync(join(root, "skills/contentious-design/tokens/products.css"), "utf8");
const semantic = readFileSync(join(root, "skills/contentious-design/tokens/semantic.css"), "utf8");

/** Palette: --family-stop -> hex (or whatever literal it holds). */
const palette = new Map();
for (const m of colors.matchAll(/--([a-z]+-\d+)\s*:\s*([^;]+);/g)) {
  palette.set(m[1], m[2].trim());
}

/** Resolve a declared value through var() chains to a literal. */
function resolve(value, map, depth = 0) {
  if (depth > 8) return value;
  const m = value.match(/^var\(--([a-z0-9-]+)\)$/i);
  if (!m) return value;
  const next = map.get(m[1]) ?? palette.get(m[1]);
  return next ? resolve(next, map, depth + 1) : value;
}

/** Split products.css into per-product declaration maps. */
const blocks = new Map();
for (const m of products.matchAll(/\[data-product="([a-z-]+)"\]\s*\{([\s\S]*?)\n\}/g)) {
  const decls = new Map();
  for (const d of m[2].matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    decls.set(d[1], d[2].replace(/\/\*[\s\S]*?\*\//g, "").trim());
  }
  blocks.set(m[1], decls);
}
if (blocks.size === 0) {
  console.error("check-product-signatures: no [data-product] blocks found — parser broken?");
  process.exit(1);
}

let failed = false;

/* ---- Check 1: ground-token collisions -------------------------------------- */
// The ground group: every token that paints an area. Rules and text are excluded
// (a rule MAY share a surface's value — --rule-row IS the page colour by design).
const GROUND = [
  "surface-page", "surface-chrome", "surface-card", "surface-card-deep",
  "surface-raised", "surface-menu", "surface-field", "surface-inverse",
  "surface-footer", "surface-hover", "surface-hover-row",
];
// Documented coincidences, per pair, with the source of the exemption.
const ALLOWED = new Set([
  // "now resolves to the same value as --surface-hover and may fold into it once
  // the other three products are checked" — semantic.css, 4 Aug 2026. Open
  // question 7 in the design project's github.md.
  "surface-hover|surface-hover-row",
]);
// Pre-existing collisions in the PROVISIONAL cm/vts blocks (the 4 Aug export
// marks both as not yet designed against their grounds). Queued for Claude
// Design; this baseline may shrink and must never grow. vts's
// chrome=inverse pair looks like a transcription bug, not a decision.
const BASELINE = new Set([
  "cm|surface-field|surface-menu",
  "vts|surface-menu|surface-raised",
  "vts|surface-chrome|surface-field",
  "vts|surface-chrome|surface-inverse",
  "vts|surface-card-deep|surface-footer",
]);
for (const [product, decls] of blocks) {
  const resolved = new Map();
  for (const t of GROUND) {
    if (decls.has(t)) resolved.set(t, resolve(decls.get(t), decls));
  }
  const seen = new Map();
  for (const [t, v] of resolved) {
    if (seen.has(v)) {
      const other = seen.get(v);
      const key = [other, t].sort().join("|");
      if (BASELINE.has(`${product}|${key}`)) {
        console.warn(`⚠ ${product}: --${other} = --${t} (${v}) — baselined, awaiting Claude Design.`);
      } else if (!ALLOWED.has(key)) {
        console.error(
          `✗ ${product}: --${other} and --${t} both resolve to ${v} — ` +
          "two ground tokens sharing a value means one surface has disappeared.",
        );
        failed = true;
      }
    } else {
      seen.set(v, t);
    }
  }
}

/* ---- Check 2: scope-referenced tokens declared everywhere ------------------- */
const scopeRefs = new Set();
for (const m of semantic.matchAll(/\[data-surface="[a-z]+"\]\s*\{([\s\S]*?)\n\}/g)) {
  for (const r of m[1].matchAll(/var\(--([a-z0-9-]+)\)/g)) scopeRefs.add(r[1]);
}
// Only tokens that at least one product declares are product-owned; palette
// stops and pure-semantic tokens resolve at :root for everyone.
const productOwned = [...scopeRefs].filter((t) =>
  [...blocks.values()].some((decls) => decls.has(t)),
);
for (const t of productOwned) {
  for (const [product, decls] of blocks) {
    if (!decls.has(t)) {
      console.error(
        `✗ ${product}: --${t} is referenced by a [data-surface] scope but not declared ` +
        "in this product's block — the scope will silently inherit instead of erroring.",
      );
      failed = true;
    }
  }
}

if (failed) process.exit(1);
console.log(
  `check-product-signatures: ${blocks.size} products, ${GROUND.length} ground tokens, ` +
  `${productOwned.length} scope-owned tokens — no collisions, no silent inheritance.`,
);

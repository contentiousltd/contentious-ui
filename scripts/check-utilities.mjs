#!/usr/bin/env node
/**
 * Catch utility classes that silently do nothing.
 *
 * Two failures, one shape: the class name is still in the markup, nothing errors, and the
 * style is simply absent. Neither shows up in a build log, a type check or a test that
 * renders the component, because the component renders fine – it just isn't styled.
 *
 *   1. THE CLASS EMITS NOTHING. The utility was removed in a Tailwind major, or the
 *      token behind it is a plain `:root` variable rather than a `@theme` colour so no
 *      opacity modifier can be generated for it.
 *
 *   2. THE CLASS EMITS, AND ANIMATES THE WRONG PROPERTY. Tailwind 4 moved the transform
 *      utilities onto the standalone CSS properties – `.translate-x-full` now sets
 *      `translate:`, `.rotate-180` sets `rotate:`, `.scale-105` sets `scale:`, where v3
 *      set `transform:` for all three. A `transition-transform` therefore animates a
 *      property nothing changes, and the element jumps to its end state.
 *
 * Both were live in Content Health Check on 1 August 2026, from its Tailwind 4 cutover
 * the same day. The mobile navigation panel stopped sliding and simply appeared; the
 * scrim behind the admin dialog had no background at all, so a modal floated over a fully
 * lit page. Neither was caught by CI. Both were found by someone looking at a phone.
 *
 * Content Maturity is on Tailwind 4 with three unfixed `transition-transform` sites at the
 * time of writing, and Voice Tone & Style is still on v3 and will inherit the same problem
 * the day it upgrades. That is why this lives here rather than in any one product.
 *
 * ## Usage
 *
 *   node scripts/check-utilities.mjs --src client/src --css dist/public/assets
 *   node scripts/check-utilities.mjs --src src --css dist --config check-utilities.json
 *
 * `--css` is optional: without a build, only the property check (2) runs, and the script
 * says so rather than passing quietly. That keeps it useful in a fresh checkout while
 * never reporting success for a check it did not perform.
 *
 * ## Config
 *
 * Per-repo allowances live in a JSON file, `check-utilities.json` by default:
 *
 *   {
 *     "notUtilities": ["hero-content"],   // CSS Modules, SVG ids, your own class names
 *     "baseline":     ["text-foo-bar"]    // known-dead, may shrink, must never grow
 *   }
 *
 * A `baseline` entry needs a reason in the repo that adds it, not here. The distinction
 * matters: `notUtilities` says "this was never a utility"; `baseline` says "this is a
 * real defect I am not fixing today".
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

// ─── Arguments ────────────────────────────────────────────────────────────────

function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const CWD = process.cwd();
const SRC = resolve(CWD, arg('src', 'client/src'));
const CSS_DIR = arg('css') ? resolve(CWD, arg('css')) : null;
const CONFIG = resolve(CWD, arg('config', 'check-utilities.json'));

if (!existsSync(SRC)) {
  console.error(`check-utilities: --src ${relative(CWD, SRC)} does not exist.`);
  process.exit(2);
}

let config = {};
if (existsSync(CONFIG) && statSync(CONFIG).isFile()) {
  const raw = readFileSync(CONFIG, 'utf8').trim();
  if (raw) {
    try {
      config = JSON.parse(raw);
    } catch (err) {
      // A malformed config must say so. Falling back to {} would silently drop every
      // allowance and bury the real failure under a hundred false ones.
      console.error(`check-utilities: ${relative(CWD, CONFIG)} is not valid JSON – ${err.message}`);
      process.exit(2);
    }
  }
}
const notUtilities = new Set(config.notUtilities ?? []);
const baseline = new Set(config.baseline ?? []);

// ─── Sources ──────────────────────────────────────────────────────────────────

function sourceFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '__tests__' || entry.name === 'dist') continue;
      out.push(...sourceFiles(full));
    } else if (/\.(tsx|jsx)$/.test(entry.name) && !/\.test\.(tsx|jsx)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const files = sourceFiles(SRC);
if (files.length === 0) {
  console.error(`check-utilities: no .tsx/.jsx under ${relative(CWD, SRC)} – wrong --src?`);
  process.exit(2);
}

// ─── 1. Classes that emit nothing ─────────────────────────────────────────────

/** Tailwind escapes these with a backslash in the emitted selector. */
const ESCAPED = ':/.[]%';
const selectorFor = (cls) =>
  '.' + [...cls].map((ch) => (ESCAPED.includes(ch) ? '\\' + ch : ch)).join('');

/** Is this token plausibly a utility class rather than prose or an object key? */
function looksLikeUtility(cls) {
  if (!/^[a-z][a-zA-Z0-9:_[\]\-./%]*$/.test(cls)) return false;
  if (!cls.includes('-') && !cls.includes(':')) return false;
  if (cls.endsWith(':')) return false;                     // a comment label or object key
  if (cls.startsWith('eslint-')) return false;             // a directive inside a comment
  if (cls.includes('/') && !/\/(\d+|\[[\d.]+\])$/.test(cls)) return false; // not an opacity modifier
  return true;
}

function collectClasses() {
  const used = new Map(); // class -> first file that uses it
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    for (const match of text.matchAll(/class(?:Name)?\s*=\s*[{"`']([^"`']{0,4000})/g)) {
      for (const raw of match[1].split(/[\s`{}$]+/)) {
        const cls = raw.replace(/^["']|["']$/g, '').trim();
        if (!looksLikeUtility(cls)) continue;
        if (notUtilities.has(cls) || baseline.has(cls)) continue;
        if (!used.has(cls)) used.set(cls, relative(CWD, file));
      }
    }
  }
  return used;
}

function builtCss() {
  if (!CSS_DIR || !existsSync(CSS_DIR)) return null;
  const sheets = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.css')) sheets.push(readFileSync(full, 'utf8'));
    }
  };
  walk(CSS_DIR);
  return sheets.length ? sheets.join('\n') : null;
}

// ─── 2. Transitions naming a property Tailwind 4 no longer sets ───────────────

const TRANSFORM_TRANSITION = [
  /transition-transform\b/,
  /transition-\[[^\]]*\btransform\b[^\]]*\]/,
];

function collectTransformTransitions() {
  const offences = [];
  for (const file of files) {
    const rel = relative(CWD, file);
    if (baseline.has(rel)) continue;
    readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
      if (TRANSFORM_TRANSITION.some((re) => re.test(line))) {
        offences.push({ file: rel, line: i + 1, text: line.trim().slice(0, 120) });
      }
    });
  }
  return offences;
}

// ─── Report ───────────────────────────────────────────────────────────────────

let failed = false;
const say = (s = '') => console.log(s);

const css = builtCss();
if (css) {
  const used = collectClasses();
  const missing = [...used].filter(([cls]) => !css.includes(selectorFor(cls)));
  if (missing.length) {
    failed = true;
    say(`✗ ${missing.length} class${missing.length === 1 ? '' : 'es'} emit no CSS:`);
    say();
    for (const [cls, file] of missing.slice(0, 20)) say(`    ${cls}\n      first used in ${file}`);
    if (missing.length > 20) say(`    …and ${missing.length - 20} more`);
    say();
    say('  These do nothing. Either the utility was removed in a Tailwind major, or the');
    say('  token behind it is a plain :root variable rather than a @theme colour.');
    say();
  } else {
    say(`✓ all ${used.size} utility classes reach the stylesheet`);
  }
} else {
  say('· no built CSS found – skipping the emit check (pass --css after a build)');
}

const transforms = collectTransformTransitions();
if (transforms.length) {
  failed = true;
  say(`✗ ${transforms.length} transition${transforms.length === 1 ? '' : 's'} naming \`transform\`:`);
  say();
  for (const o of transforms.slice(0, 20)) say(`    ${o.file}:${o.line}\n      ${o.text}`);
  if (transforms.length > 20) say(`    …and ${transforms.length - 20} more`);
  say();
  say('  Tailwind 4 sets `translate:`, `rotate:` and `scale:` as standalone properties,');
  say('  so a transition on `transform` animates nothing. Name what actually changes:');
  say('  transition-[translate] / transition-[rotate] / transition-[scale].');
  say();
} else {
  say('✓ no transition names a property Tailwind 4 no longer sets');
}

process.exit(failed ? 1 : 0);

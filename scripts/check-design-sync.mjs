#!/usr/bin/env node
/**
 * Verify the design system tree is what the last export left behind.
 *
 * skills/contentious-design/ is authored in the Claude Design project and arrives here
 * by export, which replaces the directory wholesale. That is only safe while exactly one
 * party writes there, and the failure mode is silent: a well-meant edit inside the tree
 * survives until the next export quietly destroys it, and nothing in the repo says
 * whether the copy is current in the first place.
 *
 * So: stamp the tree, and fail when reality diverges from the stamp.
 *
 *   node scripts/check-design-sync.mjs             verify
 *   node scripts/check-design-sync.mjs --update    re-stamp after applying an export
 *
 * See docs/design-system-sync.md.
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const SKILL_DIR = join(ROOT, 'skills/contentious-design');
const STAMP = join(ROOT, 'docs/design-system-stamp.json');

/** Files the semantic layer wiring depends on. Losing these breaks consumers silently. */
const REQUIRED = [
  'SKILL.md',
  'readme.md',
  'tokens/semantic.css',
  'components/components.css',
];

/** The description is the invocation trigger; if it stops naming the family, the skill
 *  gets skipped in the repo that needed it. See docs/design-system-sync.md. */
const DESCRIPTION_MUST_MENTION = ['Content Health Check', 'Content Maturity', 'Voice Tone'];

/** Binary assets are hashed like everything else, but listing them adds nothing. */
const NOISE = new Set(['.DS_Store', '.thumbnail']);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (NOISE.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function manifest() {
  const files = walk(SKILL_DIR)
    .map((f) => relative(SKILL_DIR, f).split(sep).join('/'))
    .sort();
  const hash = createHash('sha256');
  for (const rel of files) {
    hash.update(rel);
    hash.update(readFileSync(join(SKILL_DIR, rel)));
  }
  return { files: files.length, hash: hash.digest('hex') };
}

function describe() {
  const front = readFileSync(join(SKILL_DIR, 'SKILL.md'), 'utf8');
  return (front.match(/^description:\s*(.+)$/m) || [, ''])[1];
}

const failures = [];
const update = process.argv.includes('--update');

if (!existsSync(SKILL_DIR)) {
  console.error('skills/contentious-design/ is missing. Apply an export before running this.');
  process.exit(1);
}

for (const rel of REQUIRED) {
  if (!existsSync(join(SKILL_DIR, rel))) {
    failures.push(`Missing ${rel}. src/styles/semantic.css imports tokens/semantic.css directly, so a rename here breaks every consumer silently.`);
  }
}

const description = describe();
const unmentioned = DESCRIPTION_MUST_MENTION.filter((p) => !description.includes(p));
if (unmentioned.length) {
  failures.push(
    `SKILL.md description no longer names: ${unmentioned.join(', ')}.\n` +
      `    An export has probably reverted it to a Content Health Check-shaped description.\n` +
      `    The description is the invocation trigger — a narrow one means the skill is\n` +
      `    skipped in the sibling repos it applies to just as much.`,
  );
}

const current = manifest();
const stamped = existsSync(STAMP) ? JSON.parse(readFileSync(STAMP, 'utf8')) : null;

if (update) {
  writeFileSync(
    STAMP,
    `${JSON.stringify({ ...current, stampedAt: new Date().toISOString().slice(0, 10) }, null, 2)}\n`,
  );
  console.log(`Stamped ${current.files} files — ${current.hash.slice(0, 12)}`);
  process.exit(failures.length ? 1 : 0);
}

if (!stamped) {
  failures.push('No stamp recorded. Run with --update after applying an export.');
} else if (stamped.hash !== current.hash) {
  failures.push(
    `The design system tree has changed since it was stamped on ${stamped.stampedAt}.\n` +
      `    stamped: ${stamped.hash.slice(0, 12)} (${stamped.files} files)\n` +
      `    now:     ${current.hash.slice(0, 12)} (${current.files} files)\n` +
      `    If you applied an export, re-stamp: npm run check:design-sync -- --update\n` +
      `    If you edited inside skills/, move that change out — the next export destroys it.\n` +
      `    Notes and decisions belong in docs/design-system-sync.md.`,
  );
}

if (failures.length) {
  console.error('\nDesign system sync check failed:\n');
  for (const f of failures) console.error(`  - ${f}\n`);
  process.exit(1);
}

console.log(`Design system in sync — ${current.files} files, ${current.hash.slice(0, 12)}, stamped ${stamped.stampedAt}`);

#!/usr/bin/env node
/**
 * Report which version of @contentious/ui each product in the suite is on.
 *
 * The July 2026 design audit found every consumer silently frozen at 0.2.0: they
 * pinned `#semver:^0.2`, which does not match 0.3.x, and npm says nothing when a
 * range over a git dependency stops matching. Nobody noticed for months because
 * there was no cheap way to see the matrix at all.
 *
 * This is that cheap way. It reads sibling checkouts on disk rather than querying
 * GitHub, so it answers "what is on this machine right now", which is the question
 * you have when a product looks wrong.
 *
 *   node scripts/suite-versions.mjs
 *
 * Exit code is 1 if any consumer is behind the latest tag or still pins a range,
 * so it can be wired into CI later. See suite ADR-0014.
 */
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const PROJECTS = resolve(ROOT, '../..');

/** Every repo that could consume the package, including the ones that don't yet.
 *  Absence is a finding, not a reason to leave a product off the list. */
const CONSUMERS = [
  { name: 'voicetoneandstyle', path: 'voicetoneandstyle' },
  { name: 'contentmaturity', path: 'contentmaturity' },
  { name: 'contenthealthcheck', path: 'contenthealthcheck' },
  { name: 'maturitytool', path: 'maturitytool' },
  { name: 'contentious-astro', path: 'contentious-astro' },
  { name: 'content-layer', path: 'content-layer' },
];

const DEP = '@contentious/ui';

function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function latestTag() {
  const tags = execFileSync('git', ['tag', '--list', 'v*'], { cwd: ROOT, encoding: 'utf8' })
    .split('\n')
    .filter(Boolean)
    .map((t) => t.replace(/^v/, ''));
  return tags.sort(compareVersions).pop() ?? null;
}

function compareVersions(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i += 1) {
    if ((pa[i] ?? 0) !== (pb[i] ?? 0)) return (pa[i] ?? 0) - (pb[i] ?? 0);
  }
  return 0;
}

/** The pin as written in package.json, and whether it is an exact tag. */
function readPin(repo) {
  const pkg = readJson(join(PROJECTS, repo, 'package.json'));
  if (!pkg) return { state: 'no-package-json' };
  const spec = pkg.dependencies?.[DEP] ?? pkg.devDependencies?.[DEP];
  if (!spec) return { state: 'not-a-consumer' };
  const exact = /#v\d+\.\d+\.\d+$/.test(spec);
  return { state: 'consumer', spec, exact };
}

/** What is actually installed, which is the thing that renders. */
function readInstalled(repo) {
  const file = join(PROJECTS, repo, 'node_modules', DEP, 'package.json');
  return existsSync(file) ? readJson(file)?.version ?? null : null;
}

const latest = latestTag();
const rows = [];
let problems = 0;

for (const { name, path } of CONSUMERS) {
  if (!existsSync(join(PROJECTS, path))) {
    rows.push([name, 'not checked out', '—', '']);
    continue;
  }
  const pin = readPin(path);
  if (pin.state === 'not-a-consumer' || pin.state === 'no-package-json') {
    rows.push([name, pin.state === 'no-package-json' ? 'no package.json' : 'does not consume', '—', '']);
    continue;
  }

  const installed = readInstalled(path);
  const notes = [];
  if (!pin.exact) {
    notes.push('range pin — ADR-0014 requires an exact tag');
    problems += 1;
  }
  if (installed && latest && compareVersions(installed, latest) < 0) {
    notes.push(`behind latest (${latest})`);
    problems += 1;
  }
  rows.push([name, pin.spec.replace('github:contentiousltd/contentious-ui', ''), installed ?? 'not installed', notes.join('; ')]);
}

const HEADERS = ['repo', 'pin', 'installed', 'notes'];
const widths = [0, 1, 2, 3].map((i) =>
  Math.max(HEADERS[i].length, ...rows.map((r) => String(r[i]).length)),
);
const pad = (s, i) => String(s).padEnd(widths[i]);

console.log(`\n@contentious/ui — latest tag v${latest ?? '?'}\n`);
console.log(`  ${HEADERS.map((h, i) => pad(h, i)).join('  ')}`);
console.log(`  ${widths.map((w) => '-'.repeat(w)).join('  ')}`);
for (const r of rows) {
  console.log(`  ${pad(r[0], 0)}  ${pad(r[1], 1)}  ${pad(r[2], 2)}  ${r[3]}`);
}
console.log('');

if (problems > 0) {
  console.error(`${problems} issue(s). A pin that is deliberately behind should be bumped or exempted in the same PR.\n`);
  process.exit(1);
}

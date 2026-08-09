# Claude Code Instructions — @contentious/ui

## The design system

This repository is the home of the Contentious design system. It lives in
`skills/contentious-design/` and is consumed as a Claude Code skill, symlinked from
`~/.claude/skills/contentious-design` so it is available in every repo in the suite.
See [ADR-UI-0004](docs/adr/adr-ui-0004-design-system-as-a-skill.md).

**Before writing or changing any UI, anywhere in the suite, invoke the
`contentious-design` skill and follow it.** Start with its `readme.md`, then the
`<Name>.prompt.md` beside the component you're touching.

**Never edit anything inside `skills/contentious-design/`.** It is authored in the
Claude Design project and arrives by export, which replaces the directory wholesale —
so an edit there survives only until the next sync quietly destroys it. Corrections,
decisions and notes go in [docs/design-system-sync.md](docs/design-system-sync.md).
`npm run check:design-sync` enforces this and reports whether the copy is current.

Non-negotiable, and it overrides efficiency, momentum and finishing a feature:

- **Never originate a visual decision.** Not a colour, not a spacing value, not a
  layout, not a component that doesn't exist, not a "reasonable-looking" placeholder.
  Design is originated by Julius or by Claude Design. Claude Code implements to spec.
- If the skill doesn't answer it, **say so and stop.** An unstyled element or an
  unfinished screen is always the better outcome than invented design. It is not a
  gap if you haven't looked — the foundations almost always answer the question.
- **The plain CSS is the reference implementation.** Where `components/components.css`
  and a React component disagree on an exact value, the CSS wins. The skill's
  `components/*.jsx` are prototypes for static mocks and are never imported by a product.
- **Tokens only, never raw values.** `var(--surface-card)`, not `#F8F8F2`. If no token
  fits, ask — don't add a hex code.

## Workflow

**Document, then commit — every time, without exception.**

For each piece of work, before committing:

| Change type | What to update |
|---|---|
| New feature, component, or export | `CHANGELOG.md` under `[Unreleased] → Added` |
| Modified behaviour or refactor | `CHANGELOG.md` under `[Unreleased] → Changed` |
| Deprecated export or API | `CHANGELOG.md` under `[Unreleased] → Deprecated` |
| Architectural decision (chose A over B) | New ADR in `docs/adr/`, update `docs/adr/README.md` |
| Decision reversed or superseded | Mark old ADR as superseded, write new ADR |
| New coding convention | Update `CLAUDE.md` — this file |
| Convention changed | Update `CLAUDE.md` — and note why it changed |

Commit each logical change as its own commit with a clear message. Do not batch unrelated changes.

## Releasing a new version

1. Make and commit your changes following the workflow table above.
2. Bump `version` in `package.json` — patch (`0.2.x`) for CSS fixes, minor (`0.x.0`) for new tokens or features, major (`x.0.0`) for breaking changes.
3. Move `[Unreleased]` entries in `CHANGELOG.md` to a new `[x.y.z]` section.
4. Commit: `git commit -m "Release vx.y.z"`
5. Tag and push: `git tag vx.y.z && git push && git push origin vx.y.z`

Apps using `#semver:^0.2` pick up patch and minor updates automatically on their next `npm install`. Major version bumps require an explicit range change in each consuming app's `package.json`.

## Documentation

- **All cross-cutting docs live in `docs/`.** Token reference, theming guide, and architecture decisions are tracked there.
- **`CHANGELOG.md`** is updated with every meaningful change, following [Keep a Changelog](https://keepachangelog.com/) format.
- **Architecture Decision Records** go in `docs/adr/` — write one whenever you choose approach A over approach B and the reasoning matters. Update the index in `docs/adr/README.md`.
- **API docs live near their code.** `docs/` is for cross-cutting concerns only.

## Code conventions

- **British English** throughout — colour, organisation, behaviour, licence.
- **No hardcoded hex values** in component code. Use CSS custom properties exclusively.
- **CSS tokens only** — no raw colour literals anywhere in `.ts`, `.tsx`, or `.css` files.

## CSS architecture

This package uses a layered CSS architecture. See `docs/adr/adr-ui-0003-css-cascade-layers.md`.

- **Layer order:** `tokens → theme → base → components → utilities`
- **Tokens layer** (`tokens.css`): raw design decisions — hex palette, spacing, motion, layout
- **Theme layer** (`themes/*.css`): semantic mapping — `--background`, `--primary` → token values
- **Base layer** (`base.css`): `@font-face`, element defaults (body, headings)
- **Components layer**: `c-button`, `c-card`, `type-*` classes
- **Utilities layer**: `.flex`, `.grid`, `.gap-md`, layout helpers

### Naming conventions

- Component classes use the `c-` prefix with BEM modifiers: `c-button`, `c-button--primary`, `c-card__header`
- Never compose Tailwind utilities for component styling — use `c-*` classes
- Type scale classes: `type-h1`, `type-h2`, `type-h3`, `type-accent`, `type-intro`, `type-body`, `type-sm`, `type-xs`

## TypeScript conventions

- Colour utilities live in `src/lib/colors.ts` — always return CSS variable references (`var(--token)`)
- Design token types live in `src/types/design-tokens.ts`
- Never hardcode colour values in TypeScript — always reference CSS custom properties

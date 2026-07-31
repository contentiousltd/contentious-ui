# Gaps

Things the design system does not answer yet.

**Raising a gap must be cheaper than filling one.** That is the whole point of this
file. The July 2026 audit found five products had each invented a local answer to the
same handful of questions, and the cause was not disagreement — it was that inventing
took a minute and asking had no channel at all. So: append a line here and carry on.
It never blocks a task.

Two rules:

- **Look first.** Most apparent gaps are not gaps. The foundations usually exist and
  the failure is not going to look — check `skills/contentious-design/` (the readme,
  `tokens/semantic.css`, and the relevant `<Name>.prompt.md`) and the style guide at
  style.contentious.ltd before adding a line. "It is not a gap if you haven't looked."
- **Describe the decision you needed, not the code you wrote.** A gap is a question
  for Claude Design. If you shipped something in the meantime, say so and where, so it
  can be replaced rather than discovered later.

Claude Design reads this file and answers gaps in the design system itself; answered
gaps are removed here when the export that resolves them lands. Do not answer them
in this file, and do not answer them in product code.

## Open

The six below are written up as a single request in
[docs/design-brief-2026-07-31.md](docs/design-brief-2026-07-31.md).

- **No scrim token exists.** Nothing in `src/styles/` or the skill defines an overlay for
  modals and panels. Content Health Check has just shipped `--overlay` at 80% behind
  dialogs while its mobile nav uses 34% — two depths, no rule to appeal to. Needs one
  value or a documented two-step.
- **The radius ramp disagrees with itself.** `readme.md:84` states "3 chip · 6 control ·
  8 surface · 10 frame"; `tokens/semantic.css:191-192` maps surface to 6 and frame to 12,
  noting the repo has no 8px step. Either the library gains 8/10 or the prose changes.
- **Two motion vocabularies at different scales.** The library's `--transition-fast` is
  300ms and `-base` 800ms (inherited marketing-site values); the design system's motion is
  200/350/150ms. The skill works around it with `--motion-*` and a "never `--transition-*`"
  instruction, but both live in one cascade at up to 4× apart.
- **Email-safe type stack.** Bely will not load in most mail clients and custom
  properties do not work there at all. Needs a named fallback stack and a decision on
  whether the serif identity is preserved (Georgia) or deliberately dropped in email.
  Blocking: repo-owned email templates (CHC chc-370).
- **`.c-card` is defined twice** in the same `@layer components` — once in
  `src/styles/components.css`, once in `skills/contentious-design/components/components.css`
  — so source order decides which wins, and the BEM dialects differ (`__sub` vs
  `__description`, `--danger` vs `-destructive`). Recorded in `docs/design-system-sync.md`
  as Claude Design's call; needs resolving in an export.
- **`--warning-text` fails AA.** Documented in the CHC token docs as a known failure
  and never fixed. The chip tones already solved the same problem by using `amber-800`
  rather than `sunshine-900`; the standalone text token did not follow.

## Answered

_(Nothing yet — the file is new. Entries move here with the export that resolved them,
then get deleted once every consumer is on that release.)_

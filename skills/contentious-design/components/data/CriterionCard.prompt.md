One framework criterion. Fifteen per result page, three across.

```jsx
<CriterionCard name="Error-free" level={5}
  analysis="The page contains no discernible spelling, grammar or punctuation errors." />
<CriterionCard name="Shareable" level={2}
  analysis="An an-eye-page, the content is left more or less on the reader's screen."
  improve="Add a short, quotable pull quote and a subscribe prompt." />
```

- Name and rating centred above a hairline; the prose left-aligned below. Centring the head is the exception that keeps a three-across grid scannable.
- Two labelled sections, `Analysis` and `How to improve`, in Bely bold at 14px – not mono, because they head prose rather than label data.
- **Drop `improve` at level 5.** "No errors were found" as improvement advice is filler, and the system's rule is that every element earns its place.

---

## Conventions

Class names follow `@contentious/ui`: `c-<block>__<element>--<modifier>` with `is-<state>` for states, inside `@layer components`.

**Never write a literal font-size, padding or gap.** Every size is a multiple of `--u` — one unit of body text, `calc(var(--base-font-size) * var(--text-multiplier))`, currently 24px x 0.75 = 18px. Type roles are `--t-label` / `--t-hint` / `--t-ui` / `--t-body` / `--t-row` / `--t-lede` / `--t-section` / `--t-metric` / `--t-title`. Change the multiplier and the whole system scales; hard-code a pixel and it doesn't.

**Motion uses `--motion-state` / `--motion-reveal` / `--motion-exit`**, never `--transition-*` — the library owns those names at different values.

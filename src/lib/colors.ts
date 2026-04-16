/**
 * Colour utilities for @contentious/ui
 *
 * All functions return CSS custom property references — never hardcoded values.
 * Tokens are defined in tokens.css; semantic mappings in themes/*.css.
 *
 * Ported and updated from:
 *   - contentious-astro/src/utils/colors.ts
 *   - contenthealthcheck/contentious-ui/src/themes/chc-theme.ts
 *   - contenthealthcheck/contentious-ui/src/lib/colours.ts
 */

import type { ColourScheme, StatusType } from '../types/design-tokens';

// ─── Colour scheme utilities ─────────────────────────────────────────────────

/**
 * Map ColourScheme values to CSS custom property references.
 * These reference the mid-shade token for each family.
 */
export const colourToCssVar: Record<ColourScheme, string> = {
  'limestone':             'var(--limestone-300)',
  'limestone-dark':        'var(--limestone-600)',
  'limestone-extra-dark':  'var(--limestone-800)',
  'lichen':                'var(--lichen-300)',
  'fire':                  'var(--fire-700)',
  'amber':                 'var(--amber-500)',
  'sorbet':                'var(--sorbet-500)',
  'sunshine':              'var(--sunshine-500)',
  'olive':                 'var(--olive-500)',
  'wave':                  'var(--wave-500)',
  'sapling':               'var(--sapling-500)',
  'coffee':                'var(--coffee-500)',
  'gloaming':              'var(--gloaming-600)',
  'gloaming-dark':         'var(--gloaming-800)',
};

/** @deprecated Use colourToCssVar (British English). Will be removed in a future version. */
export const colorToCssVar = colourToCssVar;

/**
 * Get the CSS variable reference for a colour scheme.
 *
 * @example
 * style={{ backgroundColor: getCssVar('sorbet') }}
 * // → "var(--sorbet-500)"
 */
export function getCssVar(colourScheme: ColourScheme): string {
  return colourToCssVar[colourScheme];
}

/**
 * Determine whether a colour scheme is dark enough to require light (limestone) text.
 *
 * @example
 * className={isDarkScheme('gloaming') ? 'text-limestone' : 'text-gloaming'}
 */
export function isDarkScheme(colourScheme: ColourScheme): boolean {
  return ['gloaming', 'gloaming-dark', 'fire'].includes(colourScheme);
}

// ─── Score colours ────────────────────────────────────────────────────────────

/**
 * Returns a CSS variable reference for a 1–5 score on the brand colour gradient.
 *
 * Score → colour mapping (fire → amber → sunshine → olive → sapling):
 *   5 → sapling (green)
 *   4 → olive
 *   3 → sunshine (yellow)
 *   2 → amber (orange)
 *   1 → fire (red)
 *
 * Use in `style` props or anywhere a CSS class won't do (e.g. SVG fill/stroke):
 * @example
 * style={{ color: getScoreColour(score) }}
 *
 * @param score  Numeric score (1–5)
 * @param prefix CSS variable prefix. Defaults to 'star' (→ var(--star-5)).
 *               Override for custom scoring contexts (e.g. 'maturity' → var(--maturity-5)).
 */
export function getScoreColour(score: number, prefix = 'star'): string {
  if (score >= 5) return `var(--${prefix}-5)`;
  if (score >= 4) return `var(--${prefix}-4)`;
  if (score >= 3) return `var(--${prefix}-3)`;
  if (score >= 2) return `var(--${prefix}-2)`;
  return `var(--${prefix}-1)`;
}

// ─── Status colours ───────────────────────────────────────────────────────────

export interface StatusColours {
  /** CSS variable reference for background colour */
  bg: string;
  /** CSS variable reference for text colour */
  text: string;
  /** CSS variable reference for border colour */
  border: string;
}

/**
 * Returns CSS variable references for a given status type.
 *
 * Semantic colour mapping:
 *   success → sapling (green)
 *   warning → sunshine (yellow)
 *   error   → fire (red)
 *   info    → wave (teal)
 *   pending → gloaming (neutral)
 *
 * @example
 * const colours = getStatusColour('success');
 * style={{ backgroundColor: colours.bg, color: colours.text }}
 */
export function getStatusColour(status: StatusType): StatusColours {
  const map: Record<StatusType, StatusColours> = {
    success: { bg: 'var(--success-subtle)',  text: 'var(--success-text)',  border: 'var(--sapling-300)' },
    warning: { bg: 'var(--warning-subtle)',  text: 'var(--warning-text)',  border: 'var(--sunshine-300)' },
    error:   { bg: 'var(--error-subtle)',    text: 'var(--error-text)',    border: 'var(--fire-300)' },
    info:    { bg: 'var(--info-subtle)',     text: 'var(--info-text)',     border: 'var(--wave-300)' },
    pending: { bg: 'var(--lichen-200)',      text: 'var(--gloaming-600)',  border: 'var(--lichen-500)' },
  };
  return map[status];
}

// ─── Chart colours ────────────────────────────────────────────────────────────

/**
 * Brand chart colours in preference order, as CSS variable references.
 * The --chart-N tokens are mapped per product in each theme file.
 *
 * @example
 * // In a chart library config:
 * colors: CHART_COLOURS
 */
export const CHART_COLOURS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
] as const;

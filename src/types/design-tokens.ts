/**
 * Design token types for @contentious/ui
 *
 * Provides autocomplete and type safety for design system values
 * shared across the Contentious product suite.
 *
 * Ported from contentious-astro/src/types/design-tokens.ts
 */

/**
 * Brand colour families available as section and component backgrounds.
 *
 * - `limestone` / `limestone-dark` / `limestone-extra-dark` — warm cream neutrals
 * - `lichen` — cool pale neutral (CM surfaces)
 * - `gloaming` / `gloaming-dark` — warm charcoal/near-black
 * - `sorbet` — warm salmon (VTS signature)
 * - `fire` — coral red (CM/CHC signature, errors)
 * - `sunshine` — golden yellow (warnings, accents)
 * - `wave` — teal/cyan (info)
 * - `sapling` — soft green (success)
 * - `coffee` — warm brown
 * - `amber` — warm orange
 * - `olive` — yellow-green
 */
export type ColourScheme =
  | 'limestone'
  | 'limestone-dark'
  | 'limestone-extra-dark'
  | 'lichen'
  | 'fire'
  | 'amber'
  | 'sorbet'
  | 'sunshine'
  | 'olive'
  | 'wave'
  | 'sapling'
  | 'coffee'
  | 'gloaming'
  | 'gloaming-dark';

/** @deprecated Use ColourScheme (British English). Will be removed in a future version. */
export type ColorScheme = ColourScheme;

/**
 * Border decoration styles for section components.
 *
 * - `solid` — simple solid line
 * - `paint` — wavy painted edge
 * - `torn` — torn paper effect
 */
export type BorderStyle = 'solid' | 'paint' | 'torn';

/** Height values for decorative border styles */
export const borderHeights: Record<'paint' | 'torn', string> = {
  paint: '10rem',
  torn: '15rem',
};

/**
 * Layout options for Section component.
 *
 * - `single` — full-width single column
 * - `two-column` — content with media side-by-side
 */
export type SectionLayout = 'single' | 'two-column';

/**
 * Section style variants.
 *
 * - `default` — standard section styling
 * - `intro` — introduction section with larger heading
 */
export type SectionVariant = 'default' | 'intro';

/**
 * Device types for screenshot/mockup components.
 */
export type DeviceType = 'monitor' | 'laptop' | 'tablet' | 'phone';

/**
 * Status types for feedback states.
 */
export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'pending';

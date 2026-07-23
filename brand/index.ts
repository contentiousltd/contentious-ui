/**
 * Product identity: the name and mark for each product in the family.
 *
 * This exists because the shared identity provider needs to show *which*
 * product a user was redirected from. Before this, every product kept its mark
 * in its own repo, under a different path and filename, so a page serving all
 * of them had nowhere to look. It sits beside the theme files in
 * `src/styles/themes/` for the same reason: identity and theme are two halves
 * of the same answer, and they should version together.
 *
 * Keyed by OIDC `client_id`, because that is what the identity provider has to
 * hand when it renders a page.
 *
 * The marks are decorative: every place that shows one also shows the name as
 * text, so they take `alt=""` and the name carries the meaning.
 */

export interface ProductBrand {
  /** As written for people. Not the client id, not a slug. */
  name: string;
  /** Theme file in `src/styles/themes/`, or null to use the base tokens. */
  theme: string | null;
  /** Path within this package, resolved by the consumer's bundler. */
  mark: string;
  mark2x: string;
}

export const PRODUCT_BRANDS: Record<string, ProductBrand> = {
  'content-health-check': {
    name: 'Content Health Check',
    // No theme file yet: CHC currently runs on the base tokens, so a
    // product-aware page shows the family default. Deliberate decision
    // outstanding - see the auth pages design brief.
    theme: null,
    mark: 'brand/content-health-check/logo.png',
    mark2x: 'brand/content-health-check/logo@2x.png',
  },
  'content-maturity': {
    name: 'Content Maturity',
    theme: 'styles/themes/content-maturity.css',
    mark: 'brand/content-maturity/logo.png',
    mark2x: 'brand/content-maturity/logo@2x.png',
  },
  'voice-tone-style': {
    name: 'Voice Tone & Style',
    theme: 'styles/themes/voice-tone-style.css',
    mark: 'brand/voice-tone-style/logo.png',
    mark2x: 'brand/voice-tone-style/logo@2x.png',
  },
};

/**
 * Look up a product by OIDC client id.
 *
 * Returns null for an unknown or absent id rather than guessing. A page with no
 * product context is a real state - someone typing the auth domain in directly
 * - and it should be handled deliberately, not papered over with a default.
 */
export function productBrand(clientId: string | null | undefined): ProductBrand | null {
  if (!clientId) return null;
  return PRODUCT_BRANDS[clientId] ?? null;
}

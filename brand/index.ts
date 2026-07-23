/**
 * Product identity: the name, theme and mark for each product in the family.
 *
 * This exists because the shared identity provider needs to show *which*
 * product a user was redirected from. Before it, every product kept its mark in
 * its own repo, under a different path and filename, so a page serving all of
 * them had nowhere to look. It sits beside the theme files in
 * `src/styles/themes/` for the same reason: identity and theme are two halves
 * of the same answer, and they should version together.
 *
 * The data lives in `brands.json`, not in this file. That is deliberate — the
 * identity provider consumes it at runtime from a Node process that builds with
 * `--packages=external`, so anything it reads must be plain data rather than
 * TypeScript it would have to compile. This module is the typed view of the
 * same file for bundled consumers.
 *
 * Keyed by OIDC `client_id`, because that is what the identity provider has to
 * hand when it renders a page.
 *
 * The marks are decorative: every place that shows one also shows the name as
 * text, so they take `alt=""` and the name carries the meaning.
 */

import brands from "./brands.json" with { type: "json" };

export interface ProductBrand {
  /** As written for people. Not the client id, not a slug. */
  name: string;
  /** Stylesheet path within this package. */
  theme: string;
  /** Image paths within this package. */
  mark: string;
  mark2x: string;
}

export const PRODUCT_BRANDS: Record<string, ProductBrand> = brands;

/**
 * Look up a product by OIDC client id.
 *
 * Returns null for an unknown or absent id rather than guessing. A page with no
 * product context is a real state — someone typing the auth domain in directly
 * — and it should be handled deliberately, not papered over with a default.
 */
export function productBrand(clientId: string | null | undefined): ProductBrand | null {
  if (!clientId) return null;
  return PRODUCT_BRANDS[clientId] ?? null;
}

/**
 * Product footer. Same on every page, app and marketing site alike.
 *
 * @startingPoint section="Navigation" subtitle="Grouped footer links and legal line" viewport="1180x240"
 */
export interface FooterGroup {
  /** Mono label, e.g. "Core", "Learn". */
  label: string;
  links: Array<{ label: string; href?: string }>;
}
export interface AppFooterProps {
  logo?: string;
  product?: string;
  groups?: FooterGroup[];
  description?: React.ReactNode;
  /** The Contentious / sibling-product attribution paragraph. */
  attribution?: React.ReactNode;
  legal?: React.ReactNode;
  style?: React.CSSProperties;
}
export function AppFooter(props: AppFooterProps): JSX.Element;

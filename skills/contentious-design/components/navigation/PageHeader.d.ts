/**
 * Top-level page header. The illustration is REQUIRED on the four work sections.
 *
 * @startingPoint section="Navigation" subtitle="Page header with section illustration" viewport="1180x260"
 */
export interface PageHeaderProps {
  title: React.ReactNode;
  /** One or two sentences. What this section is. */
  lede?: React.ReactNode;
  /** Explicit image path. Overrides `section`. */
  illustration?: string;
  /** Looks the illustration up from the section set. */
  section?: 'estate' | 'inventory' | 'watchlist' | 'results';
  /** A Breadcrumb element, rendered above the header. */
  breadcrumb?: React.ReactNode;
  /** Buttons under the lede. */
  actions?: React.ReactNode;
  /** Path prefix for the illustration, e.g. "../../". */
  base?: string;
  style?: React.CSSProperties;
}
export interface BreadcrumbProps {
  /** In order, outermost first. The last entry renders as the current page. */
  trail: Array<{ label: string; href?: string }>;
  style?: React.CSSProperties;
}
export function PageHeader(props: PageHeaderProps): JSX.Element;
export function Breadcrumb(props: BreadcrumbProps): JSX.Element;
export const SECTION_ILLUSTRATIONS: Record<string, string>;

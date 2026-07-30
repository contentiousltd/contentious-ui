/**
 * Metrics that share a subject, on ONE surface divided by hairlines.
 *
 * @startingPoint section="Data" subtitle="Four metrics on one hairline-divided surface" viewport="700x150"
 */
export interface MetricBandProps {
  /** Defaults to the child count. Three or four; five means two bands. */
  columns?: number;
  /**
   * default - full metrics, left-aligned, hairline-divided. Comparison across
   *   a row and down a column is the point.
   * compact - value and label inline, no context line. The stats strip under a
   *   page header: "4 properties · 84 pages · 81 in watchlist".
   * grid - unrelated counts about ONE object, centred. The only place centring
   *   is allowed, because nothing is being compared.
   */
  variant?: 'default' | 'compact' | 'grid';
  /** <Metric> elements. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function MetricBand(props: MetricBandProps): JSX.Element;

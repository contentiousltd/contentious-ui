/**
 * Trend over a small fixed window. A shape, not a chart.
 *
 * @startingPoint section="Data" subtitle="Bar sparkline, current period emphasised" viewport="700x150"
 */
export interface MicroSeriesProps {
  points: number[];
  /** One per point. Mono 10px. */
  labels?: React.ReactNode[];
  /** Defaults to the last point. */
  currentIndex?: number;
  height?: number;
  style?: React.CSSProperties;
}
export function MicroSeries(props: MicroSeriesProps): JSX.Element;

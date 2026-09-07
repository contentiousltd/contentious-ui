/**
 * A score over time. The ONE chart type in the system allowed axes.
 *
 * The five score bands are the plot's ground at full strength, with a
 * --limestone-200 line and dots over them. No gridlines, no area fill, no
 * curve. See ScoreHistory.prompt.md.
 *
 * @startingPoint section="Data" subtitle="Score over time, bands as ground" viewport="700x300"
 */
export interface HistoryPoint {
  score: number;
  /** Date label, e.g. "17 Jun 26". */
  label: string;
}
export interface ScoreHistoryProps {
  points: HistoryPoint[];
  /**
   * Axis floor. Omit and it is derived: one ten-step below the lowest
   * reading's ten, with a 30-point minimum span. Set both min and max to pin
   * the domain; a pinned 0-100 domain draws a fire band under a healthy score,
   * so pin it only when you mean to.
   */
  min?: number;
  max?: number;
  /** Override the y labels. Default is every 10 across the domain. */
  ticks?: number[];
  note?: React.ReactNode;
  style?: React.CSSProperties;
}
export function ScoreHistory(props: ScoreHistoryProps): JSX.Element;

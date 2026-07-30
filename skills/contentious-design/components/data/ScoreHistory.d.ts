/**
 * A score over time. The ONE chart type in the system allowed axes.
 *
 * @startingPoint section="Data" subtitle="Score over time, with axes" viewport="700x300"
 */
export interface HistoryPoint {
  score: number;
  /** Date label, e.g. "17 Jun 26". */
  label: string;
}
export interface ScoreHistoryProps {
  points: HistoryPoint[];
  min?: number;
  max?: number;
  ticks?: number[];
  note?: React.ReactNode;
  style?: React.CSSProperties;
}
export function ScoreHistory(props: ScoreHistoryProps): JSX.Element;

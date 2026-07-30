/**
 * "Where did this total go" breakdown — one stacked bar plus an inline legend.
 *
 * @startingPoint section="Data" subtitle="Stacked bar with value-carrying legend" viewport="700x150"
 */
export interface CompositionSegment {
  label: React.ReactNode;
  /** Relative weight; percentages are computed from the sum. */
  value: number;
  /** Formatted figure shown in the legend, e.g. "$0.0084". */
  display?: React.ReactNode;
  /** Defaults to --comp-1..4 in order. */
  color?: string;
}
export interface CompositionBarProps {
  /** Max four. Anything under 5% folds into "Other". */
  segments: CompositionSegment[];
  note?: React.ReactNode;
  style?: React.CSSProperties;
}
export function CompositionBar(props: CompositionBarProps): JSX.Element;

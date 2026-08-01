/**
 * One score out of 100 as a closed ring, arc coloured on the level ramp.
 *
 * @startingPoint section="Data" subtitle="Ring gauge at three sizes" viewport="700x240"
 */
export interface ScoreGaugeProps {
  /** 0-100. Rendered without a per cent sign: a score is not a proportion. */
  score: number;
  /** sm = ResultCard badge; md = criteria grid; lg = the headline. */
  size?: 'sm' | 'md' | 'lg';
  /** One line under the gauge. lg only. */
  caption?: React.ReactNode;
  style?: React.CSSProperties;
}
export function ScoreGauge(props: ScoreGaugeProps): JSX.Element;

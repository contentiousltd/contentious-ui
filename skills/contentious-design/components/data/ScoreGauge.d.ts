/**
 * One score out of 100 in an open ring, arc coloured on the level ramp.
 *
 * @startingPoint section="Data" subtitle="Ring gauge at three sizes" viewport="700x240"
 */
export interface ScoreGaugeProps {
  /** 0-100. */
  score: number;
  /** sm = inline/thumbnail badge; md = criteria grid; lg = the headline arc. */
  size?: 'sm' | 'md' | 'lg';
  /** One line under the gauge. lg only. */
  caption?: React.ReactNode;
  /** Fraction of the ring left open at the top. Default 0.18. */
  gap?: number;
  style?: React.CSSProperties;
}
export function ScoreGauge(props: ScoreGaugeProps): JSX.Element;

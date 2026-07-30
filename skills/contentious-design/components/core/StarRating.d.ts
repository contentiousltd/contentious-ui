/**
 * The product's core score primitive: one criterion, five discrete levels.
 *
 * @startingPoint section="Core" subtitle="Five-level star rating on the score ramp" viewport="700x180"
 */
export interface StarRatingProps {
  /** 1-5. Filled stars take the matching --level-N colour. */
  level: number;
  /** Defaults to 5. Do not change without changing the framework. */
  outOf?: number;
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label. Defaults to "N out of 5". */
  label?: string;
  style?: React.CSSProperties;
}
export function StarRating(props: StarRatingProps): JSX.Element;
/** 0-100 score to a 1-5 level. Band edges 20/40/60/80 — a rating as a percentage. */
export function scoreToLevel(score: number): number;

/**
 * A 0-100 score with its level carried by a fill, never by the text colour.
 *
 * @startingPoint section="Data" subtitle="Score value - number plus level fill" viewport="700x220"
 */
export interface ScoreValueProps {
  /** 0-100. null or undefined renders the not-scored state, never a zero. */
  score: number | null;
  /** sm for table rows, md default, lg for a headline, inline for prose. */
  size?: 'sm' | 'md' | 'lg' | 'inline';
  /** Overrides the default marker for the size. */
  marker?: 'track' | 'dot' | 'rail';
  /** Accessible label. Defaults to "N out of 100, L out of 5". */
  label?: string;
  style?: React.CSSProperties;
}
export function ScoreValue(props: ScoreValueProps): JSX.Element;

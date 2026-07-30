/**
 * One analysed page in the results grid: screenshot, score, title, section.
 *
 * @startingPoint section="Data" subtitle="Result card with screenshot and score badge" viewport="700x300"
 */
export interface ResultCardProps {
  title: string;
  section?: string;
  date?: string;
  score: number;
  /** Page screenshot. Check the brand guide's Device screenshots page for framing. */
  image?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function ResultCard(props: ResultCardProps): JSX.Element;

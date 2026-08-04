/**
 * Content surface. Chips straddle the top edge, grouped left.
 *
 * @startingPoint section="Core" subtitle="Card with edge chips and selected state" viewport="700x210"
 */
export interface CardProps {
  /** One or two <Chip>s. Rendered astride the top edge at left:20px. */
  chips?: React.ReactNode;
  /** 2px fire-450 outline. */
  selected?: boolean;
  /** card = limestone-400 data surface; deep = limestone-750, a card that is a
   *  different KIND of thing from the cards around it. 'raised' is a deprecated
   *  alias of 'deep'. */
  tone?: 'card' | 'deep' | 'raised';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): JSX.Element;

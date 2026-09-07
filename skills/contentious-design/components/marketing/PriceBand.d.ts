/**
 * A price band, and the row that holds them. One geometry; the ground carries
 * the difference.
 *
 * @startingPoint section="Marketing" subtitle="Three bands, the middle one on the deep ground" viewport="1080x520"
 */
export interface PriceFigure {
  /** e.g. "£10k–15k". Bely Display, tabular. */
  amount: React.ReactNode;
  /** e.g. "one-off setup". */
  period: React.ReactNode;
}
export interface PriceBandProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  figures?: PriceFigure[];
  /** Feature list, rendered as Bullets. */
  features?: React.ReactNode[];
  /**
   * Applies data-surface="deep". At most ONE per row, and never for emphasis –
   * a deep card means a different KIND of thing. Default false.
   */
  featured?: boolean;
  className?: string;
}
export function PriceBand(props: PriceBandProps): JSX.Element;

export interface PriceRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Two or three PriceBands. Three across above 52rem. */
  children?: React.ReactNode;
  className?: string;
}
export function PriceRow(props: PriceRowProps): JSX.Element;

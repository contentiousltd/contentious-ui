/**
 * An editorial pull quote on a reversed band. One per page.
 *
 * The parent section must carry data-surface="inverse" and the
 * --surface-inverse fill; every role inside then resolves for the dark ground.
 *
 * @startingPoint section="Marketing" subtitle="Quote and running prose, on a reversed band" viewport="1080x360"
 */
export interface PullQuoteProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The quote itself. One or two sentences. */
  quote: React.ReactNode;
  /** Running prose beside it, as <p> elements. */
  children?: React.ReactNode;
  /** A closing line, set in --text-strong. */
  coda?: React.ReactNode;
  className?: string;
}
export function PullQuote(props: PullQuoteProps): JSX.Element;

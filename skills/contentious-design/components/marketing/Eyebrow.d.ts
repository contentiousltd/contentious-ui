/**
 * The marketing eyebrow. Bely and uppercase, in the accent’s link stop.
 * Bely rather than mono because it labels prose, where .c-label labels data;
 * the rule keys off the surface, not the product. Weight is 400 – Bely has no
 * medium cut and would synthesise one.
 *
 * @startingPoint section="Marketing" subtitle="Bely kicker in the accent link stop" viewport="600x120"
 */
export interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
  /** Element to render. Default 'p'. Use 'span' inside a heading block. */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  className?: string;
}
export function Eyebrow(props: EyebrowProps): JSX.Element;

/**
 * A literal in prose: a domain name, filename or URL. Metadata voice, no fill.
 *
 * @startingPoint section="Marketing" subtitle="A URL in a sentence is not code" viewport="600x120"
 */
export interface LiteralProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  className?: string;
}
export function Literal(props: LiteralProps): JSX.Element;

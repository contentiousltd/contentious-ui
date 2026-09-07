/**
 * A section divider. The tapered variant fades at both edges.
 *
 * @startingPoint section="Marketing" subtitle="Hairline, and the tapered variant" viewport="700x120"
 */
export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Fade to transparent at both edges. Marketing seams only. Default false. */
  taper?: boolean;
  className?: string;
}
export function Divider(props: DividerProps): JSX.Element;

/**
 * One number, presented the same way everywhere in the product.
 *
 * @startingPoint section="Data" subtitle="Label, value, one line of context" viewport="700x150"
 */
export interface MetricProps {
  /** Mono uppercase. What the number is. */
  label: React.ReactNode;
  /** Optional single <Chip> beside the label. */
  chip?: React.ReactNode;
  /** The number. Round to the precision someone can act on. */
  value: React.ReactNode;
  /** Small unit suffix, e.g. "M", "GB", "/ 3,074". */
  unit?: React.ReactNode;
  /** One line naming the figure this is derived from. */
  sub?: React.ReactNode;
  /** default = neutral; good = good news; bad = needs action; zero = genuine zero/empty. */
  tone?: 'default' | 'good' | 'bad' | 'zero';
  style?: React.CSSProperties;
}
export function Metric(props: MetricProps): JSX.Element;

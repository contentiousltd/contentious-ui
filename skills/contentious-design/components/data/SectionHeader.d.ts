/**
 * Group heading — a hairline rule, not a wrapper box.
 *
 * @startingPoint section="Data" subtitle="Hairline section header with note and action" viewport="700x120"
 */
export interface SectionHeaderProps {
  title: React.ReactNode;
  /** One line. What this group of data is.  */
  note?: React.ReactNode;
  /** Right-aligned link text, e.g. "Export CSV →". */
  action?: React.ReactNode;
  onAction?: () => void;
  style?: React.CSSProperties;
}
export function SectionHeader(props: SectionHeaderProps): JSX.Element;

/**
 * One row of a data list, and the surface that holds a set of them.
 *
 * @startingPoint section="Data" subtitle="Aligned list with mono column headers" viewport="700x260"
 */
export interface ListRowProps {
  /** Must match the parent ListTable's columns string exactly. */
  columns?: string;
  cells?: React.ReactNode[];
  /** Right-aligned controls. Reveal on hover. */
  actions?: React.ReactNode;
  /** True for the first row in a surface — suppresses the top hairline. */
  first?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export interface ListTableProps {
  /** CSS grid-template-columns, shared with every row. */
  columns: string;
  /** Mono column labels, above the surface. */
  headers?: React.ReactNode[];
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function ListRow(props: ListRowProps): JSX.Element;
export function ListTable(props: ListTableProps): JSX.Element;

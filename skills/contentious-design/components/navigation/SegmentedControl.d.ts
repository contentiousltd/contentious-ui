/**
 * Sub-views WITHIN a section — time ranges, billing periods. Not navigation.
 *
 * @startingPoint section="Navigation" subtitle="In-content view switch" viewport="700x110"
 */
export interface SegmentedControlProps {
  /** Two to four short options. */
  options: string[];
  value?: string;
  onChange?: (option: string) => void;
  style?: React.CSSProperties;
}
export function SegmentedControl(props: SegmentedControlProps): JSX.Element;

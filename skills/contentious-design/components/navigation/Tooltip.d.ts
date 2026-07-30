/**
 * Explanatory hover. Use INSTEAD of permanent explanatory chrome.
 *
 * @startingPoint section="Navigation" subtitle="Delayed dark tooltip" viewport="700x170"
 */
export interface TooltipProps {
  content: React.ReactNode;
  width?: number;
  /** Milliseconds. 500 keeps it away from people just clicking through. */
  delay?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Tooltip(props: TooltipProps): JSX.Element;

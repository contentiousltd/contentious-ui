/**
 * Ordered pipeline stages - a running analysis, a queue.
 *
 * @startingPoint section="Data" subtitle="Pipeline stages, wave ramp with fire for failure" viewport="700x200"
 */
export interface ProcessStage {
  label: string;
  count: number;
  /** waiting = not started; active = in progress; done = complete; failed = fire. */
  state?: 'waiting' | 'active' | 'done' | 'failed';
}
export interface ProcessBarProps {
  stages: ProcessStage[];
  /** Denominator for every bar. Defaults to the largest count. */
  total?: number;
  style?: React.CSSProperties;
}
export function ProcessBar(props: ProcessBarProps): JSX.Element;

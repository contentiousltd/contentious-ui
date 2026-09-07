/**
 * Numbered process steps in a grid. Three across above 52rem.
 *
 * @startingPoint section="Marketing" subtitle="Six weeks to launch, as a numbered grid" viewport="1080x340"
 */
export interface Step {
  /** e.g. "Week 1". Rendered as an Eyebrow. */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  detail?: React.ReactNode;
}
export interface StepsProps extends React.OlHTMLAttributes<HTMLOListElement> {
  /** In order. The numbers are a CSS counter – do not pass them. */
  steps: Step[];
  className?: string;
}
export function Steps(props: StepsProps): JSX.Element;

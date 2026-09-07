/**
 * The front-door hero. Two columns above 52rem, one below.
 *
 * @startingPoint section="Marketing" subtitle="Eyebrow, title, intro, two actions, illustration" viewport="1080x420"
 */
export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: React.ReactNode;
  /** Plain text. Do not pass markup to force a line break – see the prompt. */
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** One or two Buttons. Three is a menu, not a hero. */
  actions?: React.ReactNode;
  /** An <img>. Omit for a single-column hero. */
  art?: React.ReactNode;
  className?: string;
}
export function Hero(props: HeroProps): JSX.Element;

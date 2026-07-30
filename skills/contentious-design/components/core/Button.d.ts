/**
 * Action control.
 *
 * @startingPoint section="Core" subtitle="Primary, ghost, quiet and danger buttons" viewport="700x150"
 */
export interface ButtonProps {
  /** primary = solid fire, one per view; ghost = hairline on page; quiet = hairline on a surface; danger = destructive. */
  variant?: 'primary' | 'ghost' | 'quiet' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  /** Disabled greys out completely — never render as pale accent, which reads as weak rather than unavailable. */
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;

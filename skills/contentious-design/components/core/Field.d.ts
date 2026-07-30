/**
 * Labelled form control — text input, textarea or select.
 *
 * @startingPoint section="Core" subtitle="Input, textarea and select with label and hint" viewport="700x260"
 */
export interface FieldProps {
  label?: string;
  /** One line under the control. Explain consequences, not the obvious. */
  hint?: string;
  as?: 'input' | 'textarea' | 'select';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Field(props: FieldProps): JSX.Element;

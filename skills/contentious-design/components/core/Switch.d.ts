/**
 * On/off control that applies immediately.
 *
 * @startingPoint section="Core" subtitle="Neutral off, fire on, state named in the label" viewport="700x150"
 */
export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  /** Sentence stem, e.g. "Banner is". Say the STATE, never the action. */
  label?: string;
  /** The state word, emphasised so it's scannable: "hidden" / "shown". */
  stateWord?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export function Switch(props: SwitchProps): JSX.Element;

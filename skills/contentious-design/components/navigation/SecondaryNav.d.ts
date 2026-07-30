/**
 * THE secondary navigation. The only one — no side rails, no button-group tabs.
 *
 * @startingPoint section="Navigation" subtitle="Realm label, underline tabs, exit link" viewport="1180x60"
 */
export interface SecondaryNavProps {
  /** Mono label naming the realm: "Account", "Oxfam 2 · Settings", "Admin". */
  realm?: string;
  /** Strings, or { label, danger } for a destructive tab. Max ~7. */
  tabs?: Array<string | { label: string; danger?: boolean }>;
  active?: string;
  onSelect?: (label: string) => void;
  /** Always leads back to the work, e.g. "← Back to Oxfam 2". */
  exitLabel?: string;
  onExit?: () => void;
  style?: React.CSSProperties;
}
export function SecondaryNav(props: SecondaryNavProps): JSX.Element;

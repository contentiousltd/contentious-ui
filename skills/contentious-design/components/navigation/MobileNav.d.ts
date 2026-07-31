/**
 * Level-1 navigation below the chrome breakpoint. The mobile counterpart of TopBar:
 * project as context, the four work sections, account pinned to the bottom.
 *
 * @startingPoint section="Navigation" subtitle="Mobile sheet – context, work, account" viewport="390x740"
 */
export interface MobileNavProps {
  open?: boolean;
  /** Current project name. Context, not a nav item. */
  project?: React.ReactNode;
  /** Populate to enable the switch-project sub-panel. Omit for single-project accounts. */
  projects?: string[];
  /** The four work sections, in bar order. */
  items?: string[];
  active?: string;
  /** Project-scoped settings rows – rendered smaller, below the sections. */
  projectItems?: string[];
  /** Account realm. Strings, or { label, quiet } for Sign out. */
  accountItems?: Array<string | { label: string; quiet?: boolean }>;
  /** Site/marketing pages, grouped. Rendered as ONE quiet row opening a sub-panel — never inline. */
  reference?: Array<{ label: string; items: string[] }>;
  /** About / Privacy / Terms. A wrapped run at the foot of the reference panel, not rows. */
  legal?: string[];
  onNavigate?: (item: string) => void;
  onClose?: () => void;
  /** Toggles the sub-panel. Also used as its back action. */
  onSwitchProject?: () => void;
  onSelectProject?: (project: string) => void;
  onOpenReference?: () => void;
  /** Which sub-panel is showing. Supersedes `switching`. */
  panel?: 'projects' | 'reference' | null;
  switching?: boolean;
  id?: string;
}
export function MobileNav(props: MobileNavProps): JSX.Element;
export function MobileNavTrigger(props: { onClick?: () => void; label?: string }): JSX.Element;

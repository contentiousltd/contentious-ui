/**
 * Chooses the live project. Scales from one project to an agency's many.
 *
 * @startingPoint section="Navigation" subtitle="Project switcher, trigger and menu" viewport="700x420"
 */
export interface SwitcherProject {
  name: string;
  /** The domain, always. It disambiguates where a client name can't. */
  sub?: React.ReactNode;
  /** Renders greyed and unclickable with a "You're here" chip. */
  current?: boolean;
  chip?: React.ReactNode;
}
export interface SwitcherGroup {
  /** Client name — ONLY set when that client has 2+ projects. */
  client?: string;
  count?: number;
  projects: SwitcherProject[];
}
export interface ProjectSwitcherTriggerProps {
  project: string;
  open?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export interface ProjectSwitcherMenuProps {
  project: string;
  groups?: SwitcherGroup[];
  /** Show past six projects. */
  searchable?: boolean;
  actions?: string[];
  width?: number;
  style?: React.CSSProperties;
}
export function ProjectSwitcherTrigger(props: ProjectSwitcherTriggerProps): JSX.Element;
export function ProjectSwitcherMenu(props: ProjectSwitcherMenuProps): JSX.Element;

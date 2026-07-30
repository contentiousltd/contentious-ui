/**
 * Level-1 navigation. The project switcher and the four sections it governs form
 * ONE cluster immediately after the wordmark; the avatar sits alone on the right.
 *
 * @startingPoint section="Navigation" subtitle="App top bar — grouped project cluster" viewport="1180x90"
 */
export interface TopBarProps {
  product?: string;
  /** Path to the monogram. */
  logo?: string;
  /** A <ProjectSwitcherTrigger>. Rendered as the head of the cluster. */
  switcher?: React.ReactNode;
  /** The project-scoped sections: Estate, Inventory, Watchlist, Results. */
  items?: string[];
  active?: string;
  onNavigate?: (item: string) => void;
  /**
   * False in admin realms (Account, Billing, Admin) — dims the switcher AND its
   * sections together to 42%. De-emphasis, not disabling: they stay clickable.
   */
  contextActive?: boolean;
  avatar?: React.ReactNode;
  style?: React.CSSProperties;
}
export interface AvatarProps { initials?: string; size?: number; onClick?: () => void; style?: React.CSSProperties; }
export function TopBar(props: TopBarProps): JSX.Element;
export function Avatar(props: AvatarProps): JSX.Element;

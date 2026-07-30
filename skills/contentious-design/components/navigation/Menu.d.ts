/**
 * Dropdown panel and its parts. Never pure white — panels join the limestone family.
 *
 * @startingPoint section="Navigation" subtitle="Account menu with identity block" viewport="700x330"
 */
export interface MenuProps { width?: number; children?: React.ReactNode; style?: React.CSSProperties; }
export interface MenuHeaderProps {
  /** Mono key, e.g. "Project". */
  label: React.ReactNode;
  value: React.ReactNode;
  style?: React.CSSProperties;
}
export interface MenuLabelProps { children?: React.ReactNode; style?: React.CSSProperties; }
export interface MenuItemProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  /** Mono second line — a domain, an email. */
  sub?: React.ReactNode;
  right?: React.ReactNode;
  /** default; danger = fire hover (Sign out); self = greyed, unclickable "you are here". */
  tone?: 'default' | 'danger' | 'self';
  current?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function Menu(props: MenuProps): JSX.Element;
export function MenuHeader(props: MenuHeaderProps): JSX.Element;
export function MenuLabel(props: MenuLabelProps): JSX.Element;
export function MenuItem(props: MenuItemProps): JSX.Element;
export function MenuSeparator(props: { style?: React.CSSProperties }): JSX.Element;

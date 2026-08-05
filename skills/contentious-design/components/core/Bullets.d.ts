import type { ReactNode } from 'react';

export interface BulletItem {
  content: ReactNode;
  /** Ring instead of fill: this one has not happened yet. */
  pending?: boolean;
}

export interface BulletsProps {
  items: Array<BulletItem | ReactNode>;
  /** Hairline down the marker column. Changelogs, roadmaps, run histories. */
  timeline?: boolean;
  /** Wider gap, for items that run to a paragraph each. */
  spaced?: boolean;
  className?: string;
}

export declare function Bullets(props: BulletsProps): JSX.Element;

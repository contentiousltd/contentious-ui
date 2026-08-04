/**
 * Marketing feature card: illustration, title, one short paragraph, centred.
 * Not an app surface – app data uses Card. Wrap the section in .c-marketing.
 *
 * @startingPoint section="Core" subtitle="Feature card and row, one spacing scale" viewport="700x260"
 */
export interface FeatureCardProps {
  /** Illustration. Sized by a fixed 6u box, so export it trimmed to ink bounds.
   *  Its presence is what switches on the centred marketing layout. */
  art?: React.ReactNode;
  /** Short mono label or step number above the title. */
  accent?: React.ReactNode;
  title?: React.ReactNode;
  /** One paragraph, within a line of its neighbours' length. */
  children?: React.ReactNode;
  /** Makes the whole card a link and turns on the .c-feature--link hover. */
  href?: string;
  style?: React.CSSProperties;
}
export function FeatureCard(props: FeatureCardProps): JSX.Element;

export interface FeatureRowProps {
  /** 3 by default. 4 only when every body is one line at app scale. */
  columns?: 2 | 3 | 4;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function FeatureRow(props: FeatureRowProps): JSX.Element;

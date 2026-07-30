/**
 * Metadata label. One geometry, six tones — the tone carries the meaning,
 * the shape never changes.
 *
 * @startingPoint section="Core" subtitle="Status and metadata chips, six tones" viewport="700x180"
 */
export interface ChipProps {
  /** neutral = plain fact; info = positional/in-flight; good = good outcome;
   *  warn = incomplete, awaiting action; bad = broken/needs attention;
   *  promo = commercial offer ONLY, the single solid fill, max one per screen. */
  tone?: 'neutral' | 'info' | 'good' | 'warn' | 'bad' | 'promo';
  /** Adds a pulsing dot. Genuinely live, moving states only. */
  live?: boolean;
  /**
   * No background: a static coloured dot plus mono text. For a label repeated
   * down a long list, where filled chips would shout - priority markers on the
   * Report page. The dot never pulses.
   */
  bare?: boolean;
  /** One or two words. Three at a push, never a sentence. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Chip(props: ChipProps): JSX.Element;

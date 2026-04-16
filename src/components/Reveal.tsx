import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in ms — use to sequence sibling reveals */
  delay?: number;
  className?: string;
}

/**
 * Marks content for scroll-triggered fade-in.
 * The actual observation logic lives in useScrollReveal — call that
 * hook once in the page or app component that uses Reveal.
 *
 * Elements start fully visible. useScrollReveal's useLayoutEffect
 * hides off-screen ones before first paint (no flash), then the
 * IntersectionObserver fades them in as they approach the viewport.
 */
export function Reveal({ children, delay, className }: RevealProps) {
  return (
    <div
      data-reveal
      data-reveal-delay={delay ?? undefined}
      className={className}
    >
      {children}
    </div>
  );
}

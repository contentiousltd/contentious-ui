import { cn } from "../lib/utils";
import type { CSSProperties, ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Background colour as a CSS value, e.g. "var(--sorbet-900)" or "#f97a62" */
  bg?: string;
}

/**
 * Standard page section: vertical padding, centred container, optional background.
 */
export default function Section({ id, children, className, bg }: SectionProps) {
  const style: CSSProperties | undefined = bg ? { backgroundColor: bg } : undefined;
  return (
    <section id={id} className="c-section" style={style}>
      <div className={cn("c-section__inner", className)}>
        {children}
      </div>
    </section>
  );
}

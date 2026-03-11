import { cn } from "../lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Background colour class, e.g. "bg-limestone-400" or "bg-sorbet-900" */
  bg?: string;
}

/**
 * Standard page section: vertical padding, centred container, optional background.
 */
export default function Section({ id, children, className, bg }: SectionProps) {
  return (
    <section id={id} className={cn("py-20", bg)}>
      <div className={cn("container max-w-7xl", className)}>
        {children}
      </div>
    </section>
  );
}

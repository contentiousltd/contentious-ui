import { cn } from "../lib/utils";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: ReactNode;
  className?: string;
  /** Centre-align heading and subtitle */
  centred?: boolean;
}

/**
 * Consistent heading block for landing-page sections.
 */
export default function SectionHeader({ title, subtitle, className, centred }: SectionHeaderProps) {
  return (
    <div className={cn("c-section-header", centred && "c-section-header--centred", className)}>
      <h2 className="c-section-header__title">{title}</h2>
      {subtitle && (
        <p className="c-section-header__subtitle">{subtitle}</p>
      )}
    </div>
  );
}

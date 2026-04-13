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
 * Bely Display at text-4xl, optional subtitle at text-xl.
 */
export default function SectionHeader({ title, subtitle, className, centred }: SectionHeaderProps) {
  return (
    <div className={cn(centred && "text-center", className)}>
      <h2 className="text-4xl text-foreground mb-4 font-display">{title}</h2>
      {subtitle && (
        <p className={cn("text-xl text-muted-foreground mb-12", centred ? "max-w-xl mx-auto" : "max-w-2xl")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

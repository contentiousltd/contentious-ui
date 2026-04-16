import { Card, CardContent } from "./ui/card";
import { cn } from "../lib/utils";
import type { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  /** Optional accent element rendered above the title (e.g. a step number or icon) */
  accent?: ReactNode;
}

/**
 * Brand-standard feature card: borderless, rounded-xl, generous padding,
 * display-heading title, muted body text.
 */
export default function FeatureCard({ title, children, className, accent }: FeatureCardProps) {
  return (
    <Card className={cn("c-feature-card", className)}>
      <CardContent className="c-feature-card__content">
        {accent && <div className="c-feature-card__accent">{accent}</div>}
        <h3 className="c-feature-card__title">{title}</h3>
        <div className="c-feature-card__body">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

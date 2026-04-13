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
 * Bely Display title at text-2xl, body text at text-lg.
 */
export default function FeatureCard({ title, children, className, accent }: FeatureCardProps) {
  return (
    <Card className={cn("border-0 rounded-xl", className)}>
      <CardContent className="p-8">
        {accent && <div className="mb-3">{accent}</div>}
        <h3 className="font-display text-2xl font-normal mb-4">{title}</h3>
        <div className="text-lg text-muted-foreground leading-relaxed">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

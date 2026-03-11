import { Card, CardContent } from "./ui/card";
import { cn } from "../lib/utils";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <Card className={cn("w-full max-w-md mx-4", className)}>
      <CardContent className="pt-6 pb-6">
        <div className="text-center">
          {icon && <div className="mb-4 flex justify-center">{icon}</div>}
          <h3 className="text-lg font-['bely-display'] text-foreground mb-2">{title}</h3>
          {description && <p className="text-muted-foreground mb-4">{description}</p>}
          {action}
        </div>
      </CardContent>
    </Card>
  );
}

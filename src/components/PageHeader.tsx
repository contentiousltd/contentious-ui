import { cn } from "../lib/utils";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
  className?: string;
}

export default function PageHeader({ title, children, className }: PageHeaderProps) {
  return (
    <div className={cn(className)}>
      <h1 className="text-5xl text-foreground mb-6 font-['bely-display'] leading-tight">
        {title}
      </h1>
      {children}
    </div>
  );
}

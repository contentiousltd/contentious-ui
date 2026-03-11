import { cn } from "../../lib/utils";

interface LoadingRingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingRing({ className, size = "md" }: LoadingRingProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-24 w-24",
    lg: "h-32 w-32",
  };

  return (
    <div className={cn("relative inline-block", sizeClasses[size], className)}>
      <div
        className={cn(
          "absolute inset-0 rounded-full loading-ring-spin",
          sizeClasses[size],
        )}
        style={{
          background: `conic-gradient(
            from 0deg,
            hsl(var(--loading-ring-1)) 0deg,
            hsl(var(--loading-ring-2)) 120deg,
            hsl(var(--loading-ring-3)) 240deg,
            hsl(var(--loading-ring-4)) 360deg
          )`,
          WebkitMask: "radial-gradient(farthest-side, transparent 65%, #000 65%)",
          mask: "radial-gradient(farthest-side, transparent 65%, #000 65%)",
        }}
      />
    </div>
  );
}

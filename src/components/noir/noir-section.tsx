import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** SVG noise texture (shared with landing page stats/portfolio sections) */
const GRAIN_BG =
  "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')";

interface NoirSectionProps {
  children: ReactNode;
  className?: string;
  /** Show animated grain texture overlay (default: false) */
  grain?: boolean;
  /** Show a glow orb behind the section content */
  glow?: "start" | "end" | "center" | false;
  /** Additional glow size class override */
  glowSize?: string;
  /** Use max-w-5xl instead of max-w-7xl for narrower content */
  narrow?: boolean;
  /** HTML id attribute for anchor links */
  id?: string;
}

export function NoirSection({
  children,
  className,
  grain = false,
  glow = false,
  glowSize,
  narrow = false,
  id,
}: NoirSectionProps) {
  return (
    <section id={id} className={cn("relative overflow-hidden", className)}>
      {/* Gradient divider at top */}
      <div
        className="h-px bg-linear-to-r from-transparent via-border/40 to-transparent dark:via-border/20"
        aria-hidden="true"
      />

      {/* Glow orb */}
      {glow && (
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px] dark:bg-primary/3",
              glowSize || "h-64 w-80",
              glow === "start" && "-start-20",
              glow === "end" && "-end-20",
              glow === "center" &&
                "start-1/2 -translate-x-1/2 h-[400px] w-[600px] blur-[120px]",
            )}
          />
        </div>
      )}

      {/* Grain overlay */}
      {grain && (
        <div
          className="noir-grain pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: GRAIN_BG }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div
        className={cn(
          "relative py-24 sm:py-32",
          narrow
            ? "mx-auto max-w-5xl px-4 sm:px-6"
            : "mx-auto max-w-7xl px-4 sm:px-6",
        )}
      >
        {children}
      </div>
    </section>
  );
}

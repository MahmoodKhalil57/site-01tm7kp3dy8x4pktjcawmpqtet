"use client";

import { Link } from "@/components/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";

/** SVG noise texture */
const GRAIN_BG =
  "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')";

interface NoirCtaProps {
  /** Main heading text */
  title: string;
  /** Faded companion heading */
  titleFaded?: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** CTA button text */
  buttonText: string;
  /** CTA button link destination */
  buttonHref: string;
  /** Small text below button (e.g. guarantee) */
  footnote?: string;
}

export function NoirCta({
  title,
  titleFaded,
  subtitle,
  buttonText,
  buttonHref,
  footnote,
}: NoirCtaProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient divider at top */}
      <div
        className="h-px bg-linear-to-r from-transparent via-border/40 to-transparent dark:via-border/20"
        aria-hidden="true"
      />

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute start-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[150px] dark:bg-primary/3" />
      </div>

      {/* Grain */}
      <div
        className="noir-grain pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: GRAIN_BG }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative mx-auto max-w-5xl px-4 py-32 text-center sm:px-6 sm:py-40">
        {/* Decorative line */}
        <BlurFade delay={0.1} inView>
          <div className="mx-auto mb-10 h-px w-16 bg-primary/50" />
        </BlurFade>

        {/* Main heading */}
        <BlurFade delay={0.2} inView>
          <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.9] tracking-tighter text-foreground">
            {title}
          </h2>
        </BlurFade>

        {/* Faded companion heading */}
        {titleFaded && (
          <BlurFade delay={0.3} inView>
            <p className="mt-2 text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.9] tracking-tighter text-foreground/25 dark:text-foreground/15">
              {titleFaded}
            </p>
          </BlurFade>
        )}

        {/* Subtitle */}
        {subtitle && (
          <BlurFade delay={0.35} inView>
            <p className="mx-auto mt-6 max-w-md text-base text-muted-foreground/70 dark:text-muted-foreground/50">
              {subtitle}
            </p>
          </BlurFade>
        )}

        {/* CTA button */}
        <BlurFade delay={0.45} inView>
          <div className="mt-12 flex flex-col items-center gap-5 sm:mt-16">
            <Link
              href={buttonHref}
              className={cn(
                "group relative inline-flex items-center gap-3 overflow-hidden",
                "border border-primary/80 bg-primary/10 px-10 py-5 dark:border-primary/60",
                "text-xs tracking-[0.25em] text-primary uppercase",
                "transition-all duration-500",
                "hover:border-primary hover:bg-primary/20",
                "hover:shadow-[0_0_60px_-5px] hover:shadow-primary/30",
              )}
            >
              {/* Animated shine sweep */}
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">{buttonText}</span>
              <ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
            {footnote && (
              <p className="text-xs text-muted-foreground/50 dark:text-muted-foreground/40">
                {footnote}
              </p>
            )}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

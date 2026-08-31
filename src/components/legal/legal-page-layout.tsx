import type { ReactNode } from "react";
import { BlurFade } from "@/components/ui/blur-fade";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  lastUpdatedLabel: string;
  children: ReactNode;
}

export function LegalPageLayout({
  title,
  lastUpdated,
  lastUpdatedLabel,
  children,
}: LegalPageLayoutProps) {
  return (
    <main id="main-content" className="relative pt-40 pb-24 sm:pt-48 sm:pb-32">
      {/* Grain overlay */}
      <div
        className="noir-grain pointer-events-none fixed inset-0 z-10 opacity-[0.015]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Glow orb behind title */}
        <div
          className="pointer-events-none absolute -top-20 start-1/2 h-80 w-125 -translate-x-1/2 rounded-full bg-primary/5 blur-[120px] dark:bg-primary/3"
          aria-hidden="true"
        />

        <header className="relative mb-12">
          <BlurFade delay={0.1} inView>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.9] tracking-tighter text-foreground">
              {title}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
              {lastUpdatedLabel} {lastUpdated}
            </p>
          </BlurFade>

          {/* Gradient divider */}
          <div className="mt-8 h-px bg-linear-to-r from-transparent via-border/40 to-transparent dark:via-border/20" />
        </header>

        <BlurFade delay={0.3} inView>
          <article className="prose prose-lg prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-5 prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-li:text-muted-foreground prose-ul:my-6 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground">
            {children}
          </article>
        </BlurFade>
      </div>
    </main>
  );
}

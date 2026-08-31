"use client";

import { type ReactNode } from "react";
import { Link } from "@/components/link";
import { ArrowLeft } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import DecryptedText from "@/components/DecryptedText";

interface NoirPageHeroProps {
  /** Uppercase small tagline above the title (e.g. "OUR WORK") */
  tagline?: string;
  /** Main page title — rendered with DecryptedText reveal */
  title: string;
  /** Optional subtitle text below the title */
  subtitle?: string | ReactNode;
  /** Back link destination (renders an arrow + label) */
  backHref?: string;
  /** Back link label text */
  backLabel?: string;
  /** Whether to use DecryptedText effect on the title (default: true) */
  decrypt?: boolean;
}

export function NoirPageHero({
  tagline,
  title,
  subtitle,
  backHref,
  backLabel,
  decrypt = true,
}: NoirPageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-32">
      {/* Glow orb behind title */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute start-1/4 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px] dark:bg-primary/3" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Back link */}
        {backHref && backLabel && (
          <BlurFade delay={0.05} inView>
            <Link
              href={backHref}
              className="mb-10 inline-flex items-center gap-2 text-xs tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              {backLabel}
            </Link>
          </BlurFade>
        )}

        {/* Tagline */}
        {tagline && (
          <BlurFade delay={0.1} inView>
            <p className="mb-6 text-[10px] tracking-[0.5em] text-primary/60 uppercase sm:mb-8 sm:text-xs">
              {tagline}
            </p>
          </BlurFade>
        )}

        {/* Main heading */}
        <BlurFade delay={0.2} inView>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-tighter text-foreground">
            {decrypt ? (
              <DecryptedText
                text={title}
                animateOn="view"
                speed={40}
                sequential
                revealDirection="start"
                className="text-foreground"
                encryptedClassName="text-primary/60"
              />
            ) : (
              title
            )}
          </h1>
        </BlurFade>

        {/* Subtitle */}
        {subtitle && (
          <BlurFade delay={0.35} inView>
            <div className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground/70 sm:mt-8 sm:text-lg dark:text-muted-foreground/60">
              {subtitle}
            </div>
          </BlurFade>
        )}
      </div>

      {/* Gradient fade at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
    </section>
  );
}

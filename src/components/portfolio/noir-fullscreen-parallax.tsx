"use client";

import { useRef, useState } from "react";
import { Image } from "@/components/image";
import { Link } from "@/components/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NumberTicker } from "@/components/ui/number-ticker";
import { NoirPageHero } from "@/components/noir/noir-page-hero";

interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  url: string;
  year: string;
  industry: string;
  duration: string;
  teamSize: string;
  technologies: string[];
}

interface Messages {
  pageTitle: string;
  pageSubtitle: string;
  backToHome: string;
  visitSite: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
}

export function NoirFullscreenParallax({
  projects,
  messages,
}: {
  projects: Project[];
  messages: Messages;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(
      Math.floor(latest * projects.length),
      projects.length - 1,
    );
    setCurrentIndex(idx);
  });

  return (
    <main id="main-content" ref={containerRef}>
      {/* Hero */}
      <NoirPageHero
        title={messages.pageTitle}
        subtitle={messages.pageSubtitle}
        backHref="/"
        backLabel={messages.backToHome}
      />

      {/* Project sections */}
      {projects.map((project, index) => (
        <ProjectSection
          key={project.id}
          project={project}
          index={index}
          total={projects.length}
          visitSite={messages.visitSite}
          isActive={currentIndex === index}
        />
      ))}

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div
          className="h-px bg-linear-to-r from-transparent via-border/30 to-transparent"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute start-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/4 blur-[150px]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-40 text-center sm:px-6">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto mb-12 h-px w-20 origin-center bg-primary/40"
          />
          <h2 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.85] tracking-[-0.03em] text-foreground">
            {messages.ctaTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground/50">
            {messages.ctaDescription}
          </p>
          <Link
            href="/contact"
            className={cn(
              "group relative mt-14 inline-flex items-center gap-3 overflow-hidden",
              "border border-primary/60 bg-primary/5 px-12 py-6",
              "text-[10px] tracking-[0.3em] text-primary uppercase",
              "transition-all duration-500",
              "hover:border-primary hover:bg-primary/15",
              "hover:shadow-[0_0_80px_-10px] hover:shadow-primary/20",
            )}
          >
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-primary/8 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">{messages.ctaButton}</span>
            <ArrowUpRight className="relative size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function ProjectSection({
  project,
  index,
  total,
  visitSite,
}: {
  project: Project;
  index: number;
  total: number;
  visitSite: string;
  isActive: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [1.15, 1, 1, 1.05],
  );
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.96, 0.88, 0.88, 0.96],
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Divider */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border/20 to-transparent"
        aria-hidden
      />

      {/* Fullscreen background image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover blur-sm"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-background"
        style={{ opacity: overlayOpacity }}
      />

      {/* Grain */}
      <div
        className="noir-grain pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden
        style={{
          backgroundImage:
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative flex min-h-screen items-end"
        style={{ y: textY }}
      >
        <div className="w-full px-4 pb-16 sm:px-8 md:pb-24 lg:px-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            {/* Left: project info */}
            <div className="max-w-2xl">
              {/* Index */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-6 flex items-center gap-4"
              >
                <span className="text-[clamp(5rem,10vw,9rem)] font-black leading-none tracking-tighter text-foreground/10">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-foreground/10" />
                <span className="text-[10px] tracking-[0.2em] text-foreground/30 uppercase">
                  / {String(total).padStart(2, "0")}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.9] tracking-[-0.03em] text-foreground"
              >
                {project.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-2 text-sm font-medium text-primary/70"
              >
                {project.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-4 max-w-md text-sm leading-relaxed text-foreground/50"
              >
                {project.description}
              </motion.p>

              {/* Tech */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 flex flex-wrap gap-2"
              >
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="border border-foreground/10 px-2.5 py-1 text-[9px] tracking-[0.15em] text-foreground/40 uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right: meta + link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-start gap-6 md:items-end"
            >
              <div className="flex gap-8 text-[10px] tracking-[0.15em] text-foreground/30 uppercase">
                <div className="flex flex-col gap-1">
                  <span className="text-foreground/50">{project.year}</span>
                  <span>{project.industry}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-foreground/50">{project.duration}</span>
                  <span>{project.teamSize}</span>
                </div>
              </div>

              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group inline-flex items-center gap-2",
                  "border border-foreground/20 px-8 py-4",
                  "text-[10px] tracking-[0.25em] text-foreground/70 uppercase",
                  "transition-all duration-500",
                  "hover:border-primary/60 hover:text-primary",
                  "hover:shadow-[0_0_40px_-8px] hover:shadow-primary/15",
                )}
              >
                {visitSite}
                <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Project stats ribbon */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute end-4 top-1/2 hidden -translate-y-1/2 md:block"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-16 w-px bg-foreground/10" />
          <NumberTicker
            value={index + 1}
            className="text-sm font-bold text-foreground/20"
          />
          <div className="h-16 w-px bg-foreground/10" />
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  Lightbulb,
  ShieldCheck,
  Eye,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MagicCard } from "@/components/ui/magic-card";
import { HyperText } from "@/components/ui/hyper-text";

const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  ShieldCheck,
  Eye,
  Heart,
};

interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

interface NoirValuesSectionProps {
  title: string;
  values: ValueItem[];
}

export function NoirValuesSection({ title, values }: NoirValuesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div ref={sectionRef}>
      {/* Oversized heading with scramble effect */}
      <div className="mb-20 overflow-hidden sm:mb-24">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <HyperText
            as="h2"
            startOnView
            animateOnHover
            duration={1200}
            className="text-5xl font-black uppercase tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]"
          >
            {title}
          </HyperText>
        </motion.div>

        {/* Animated underline */}
        <motion.div
          className="mt-4 h-1 origin-start bg-primary"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Values grid with MagicCard spotlight effect */}
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
        {values.map((value, index) => {
          const num = String(index + 1).padStart(2, "0");
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{
                duration: 0.7,
                delay: 0.2 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <MagicCard
                className="h-full rounded-none"
                gradientSize={300}
                gradientColor="hsl(var(--primary) / 0.12)"
                gradientFrom="hsl(var(--primary) / 0.5)"
                gradientTo="hsl(var(--primary) / 0.1)"
                gradientOpacity={0.15}
              >
                <div className="relative flex h-full flex-col justify-between p-8 sm:p-10 md:p-12">
                  {/* Giant decorative number */}
                  <motion.span
                    className="pointer-events-none absolute end-4 top-0 font-black leading-none text-foreground/[0.03] select-none sm:end-6"
                    style={{ fontSize: "clamp(8rem, 15vw, 14rem)" }}
                    animate={{
                      opacity: isHovered ? 0.08 : 0.03,
                      scale: isHovered ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    aria-hidden="true"
                  >
                    {num}
                  </motion.span>

                  <div className="relative">
                    {/* Icon with animated ring */}
                    <div className="relative mb-8 inline-flex">
                      <motion.div
                        className="flex size-14 items-center justify-center border border-primary/20 bg-primary/5 sm:size-16"
                        animate={{
                          borderColor: isHovered
                            ? "hsl(var(--primary) / 0.5)"
                            : "hsl(var(--primary) / 0.2)",
                          backgroundColor: isHovered
                            ? "hsl(var(--primary) / 0.1)"
                            : "hsl(var(--primary) / 0.05)",
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        {(() => {
                          const Icon = iconMap[value.icon];
                          return Icon ? (
                            <Icon
                              className={cn(
                                "size-6 text-primary/70 transition-all duration-500 sm:size-7",
                                isHovered && "scale-110 text-primary",
                              )}
                            />
                          ) : null;
                        })()}
                      </motion.div>
                      {/* Corner accents */}
                      <motion.div
                        className="absolute -end-1 -top-1 size-2 border-e border-t border-primary/40"
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div
                        className="absolute -bottom-1 -start-1 size-2 border-b border-s border-primary/40"
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Title - big and bold */}
                    <motion.h3
                      className="mb-3 text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl"
                      animate={{
                        x: isHovered ? 8 : 0,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {value.title}
                    </motion.h3>

                    {/* Animated accent bar */}
                    <motion.div
                      className="mb-5 h-0.5 bg-primary/60"
                      animate={{
                        width: isHovered ? "4rem" : "2rem",
                        opacity: isHovered ? 1 : 0.4,
                      }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Description */}
                    <motion.p
                      className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base"
                      animate={{
                        opacity: isHovered ? 1 : 0.7,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {value.description}
                    </motion.p>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

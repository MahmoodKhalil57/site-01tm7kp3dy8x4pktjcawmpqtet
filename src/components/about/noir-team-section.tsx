"use client";

import { useRef, useState } from "react";
import { Image } from "@/components/image";
import { Link } from "@/components/link";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Linkedin, Github, ArrowUpRight } from "lucide-react";
import { HyperText } from "@/components/ui/hyper-text";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  img_position: string;
  linkedin?: string;
  github?: string | null;
}

interface NoirTeamSectionProps {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

function TeamMemberCard({
  member,
  index,
  isInView,
}: {
  member: TeamMember;
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Card container */}
      <div className="relative overflow-hidden border border-border/30 bg-card/30 backdrop-blur-sm transition-colors duration-500 hover:border-primary/30 dark:border-border/15 dark:hover:border-primary/20">
        {/* Image section with dramatic crop */}
        <div className="relative aspect-4/5 overflow-hidden bg-muted">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
            style={{
              objectPosition: member.img_position
                .replace("object-position:", "")
                .replace(";", "")
                .trim(),
            }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Dark gradient overlay - always present, intensifies on hover */}
          <motion.div
            className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-transparent"
            animate={{
              opacity: isHovered ? 0.95 : 0.7,
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Colored tint overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-primary/10 mix-blend-overlay"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Scan line effect */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 3px)",
            }}
            aria-hidden="true"
          />

          {/* Member index number */}
          <motion.span
            className="absolute start-4 top-4 font-mono text-xs tracking-widest text-foreground/30"
            animate={{ opacity: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>

          {/* Bottom content overlay */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            {/* Name - bold noir typography */}
            <motion.h3
              className="text-xl font-black uppercase tracking-tight text-foreground sm:text-2xl"
              animate={{ y: isHovered ? -4 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {member.name}
            </motion.h3>

            {/* Role with animated reveal bar */}
            <div className="mt-1 flex items-center gap-3">
              <motion.div
                className="h-px bg-primary"
                animate={{ width: isHovered ? 24 : 12 }}
                transition={{ duration: 0.4 }}
              />
              <motion.p
                className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80 dark:text-primary/60"
                animate={{ opacity: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {member.role}
              </motion.p>
            </div>

            {/* Bio - slides in on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.p
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 10, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm"
                >
                  {member.bio}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Social links - slide up on hover */}
            <motion.div
              className="mt-3 flex items-center gap-2"
              initial={false}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
            >
              {member.linkedin && (
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-8 items-center justify-center border border-foreground/20 text-foreground/60 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin className="size-3.5" />
                </Link>
              )}
              {member.github && (
                <Link
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-8 items-center justify-center border border-foreground/20 text-foreground/60 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  aria-label={`${member.name} GitHub`}
                >
                  <Github className="size-3.5" />
                </Link>
              )}
              <div className="ms-auto">
                <ArrowUpRight className="size-4 text-primary/50" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function NoirTeamSection({
  title,
  subtitle,
  members,
}: NoirTeamSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <div ref={sectionRef}>
      {/* Header */}
      <div className="mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <HyperText
            as="h2"
            startOnView
            animateOnHover
            duration={1000}
            className="text-5xl font-black uppercase tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]"
          >
            {title}
          </HyperText>
        </motion.div>

        {/* Subtitle with staggered line reveal */}
        <motion.div
          className="mt-6 flex items-start gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="mt-2 h-px w-12 shrink-0 bg-primary/50" />
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground/70 sm:text-base dark:text-muted-foreground/50">
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* Team grid - asymmetric layout */}
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member, index) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  );
}

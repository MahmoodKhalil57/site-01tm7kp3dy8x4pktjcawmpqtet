import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { NoirPageHero } from "@/components/noir/noir-page-hero";
import { NoirSection } from "@/components/noir/noir-section";
import { NoirCta } from "@/components/noir/noir-cta";
import { BlurFade } from "@/components/ui/blur-fade";
import { NoirValuesSection } from "@/components/about/noir-values-section";
import { NoirTeamSection } from "@/components/about/noir-team-section";

const GRAIN_BG =
	"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')";

export interface AboutPageProps {
	pageTitle: string;
	pageSubtitle: string;
	missionTitle: string;
	missionDescription: string;
	stats: { value: string; label: string }[];
	valuesTitle: string;
	values: { icon: string; title: string; description: string }[];
	teamTitle: string;
	teamSubtitle: string;
	team: {
		id: string;
		name: string;
		role: string;
		bio: string;
		image: string;
		imagePosition: string;
		linkedin?: string | null;
		github?: string | null;
	}[];
	timelineTitle: string;
	timeline: { year: string; description: string }[];
	ctaTitle: string;
	ctaDescription: string;
	ctaButton: string;
	ctaHref: string;
}

/** Port of the Next.js `about/page.tsx`. */
export function AboutPage({ data: m }: { data: AboutPageProps }) {
	return (
		<>
			{/* Hero */}
			<NoirPageHero title={m.pageTitle} subtitle={m.pageSubtitle} backHref="/" backLabel="Back to home" />

			{/* Mission */}
			<NoirSection glow="start">
				<BlurFade delay={0.1} inView>
					<p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 sm:text-xs">{m.missionTitle}</p>
				</BlurFade>
				<BlurFade delay={0.2} inView>
					<div className="border-s-2 border-primary/30 ps-6 sm:ps-8">
						<p className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-bold leading-snug tracking-tight text-foreground/90">
							{m.missionDescription}
						</p>
					</div>
				</BlurFade>
			</NoirSection>

			{/* Stats */}
			{m.stats.length > 0 && (
				<section className="relative overflow-hidden border-y border-border/40 py-20 dark:border-border/20 sm:py-28">
					<div className="pointer-events-none absolute inset-0" aria-hidden="true">
						<div className="absolute -start-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/6 blur-[80px] dark:bg-primary/4" />
						<div className="absolute -end-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/4 blur-[80px] dark:bg-primary/3" />
					</div>

					<div
						className="noir-grain pointer-events-none absolute inset-0 opacity-[0.02]"
						style={{ backgroundImage: GRAIN_BG }}
						aria-hidden="true"
					/>

					<div className="relative mx-auto max-w-7xl px-4 sm:px-6">
						<div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0">
							{m.stats.map((stat, index) => (
								<BlurFade key={stat.label} delay={0.1 + index * 0.1} inView>
									<div
										className={cn(
											"relative flex flex-col items-center text-center",
											index < m.stats.length - 1 && "lg:border-e lg:border-border/40 dark:lg:border-border/20",
										)}
									>
										<span className="text-5xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
											{stat.value}
										</span>
										<span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:mt-3 sm:text-xs dark:text-muted-foreground/60">
											{stat.label}
										</span>
									</div>
								</BlurFade>
							))}
						</div>
					</div>
				</section>
			)}

			{/* Values */}
			{m.values.length > 0 && (
				<NoirSection glow="center">
					<NoirValuesSection title={m.valuesTitle} values={m.values} />
				</NoirSection>
			)}

			{/* Team */}
			{m.team.length > 0 && (
				<NoirSection glow="end">
					<NoirTeamSection
						title={m.teamTitle}
						subtitle={m.teamSubtitle}
						members={m.team.map((member, i) => ({
							id: i + 1,
							name: member.name,
							role: member.role,
							bio: member.bio,
							image: member.image,
							img_position: `object-position: ${member.imagePosition};`,
							linkedin: member.linkedin ?? undefined,
							github: member.github ?? null,
						}))}
					/>
				</NoirSection>
			)}

			{/* Timeline */}
			{m.timeline.length > 0 && (
				<NoirSection grain glow="start">
					<BlurFade delay={0.1} inView>
						<h2 className="mb-16 text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
							{m.timelineTitle}
						</h2>
					</BlurFade>

					<div className="relative border-s-2 border-border/40 ps-6 dark:border-border/20 sm:ps-8">
						{m.timeline.map((event, index) => (
							<BlurFade key={event.year + index} delay={0.15 + index * 0.08} inView>
								<div className={cn("relative", index < m.timeline.length - 1 ? "pb-10" : "")}>
									{/* Pulsing dot on the timeline line */}
									<div className="absolute -start-7.25 top-1 size-2.5 rounded-full bg-primary sm:-start-9.25" />
									<div className="absolute -start-7.25 top-1 size-2.5 animate-ping rounded-full bg-primary/40 sm:-start-9.25" />

									<div className="flex items-start gap-4">
										<div className="flex shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground/70">
											<Calendar className="size-3.5" />
											{event.year}
										</div>
										<p className="text-sm leading-relaxed text-foreground/80">{event.description}</p>
									</div>
								</div>
							</BlurFade>
						))}
					</div>
				</NoirSection>
			)}

			{/* CTA */}
			<NoirCta title={m.ctaTitle} subtitle={m.ctaDescription} buttonText={m.ctaButton} buttonHref={m.ctaHref} />
		</>
	);
}

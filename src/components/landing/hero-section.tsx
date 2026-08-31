import { lazy, Suspense } from "react";
import { HyperText } from "@/components/ui/hyper-text";
import DecryptedText from "@/components/DecryptedText";
import { Link } from "@/components/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";
import { WebGLBoundary } from "@/components/WebGLBoundary";
import { ClientOnly } from "@/components/client-only";

const Beams = lazy(() => import("../Beams"));

const HeroBeamsFallback = () => (
	<div
		aria-hidden="true"
		className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary)/20%,transparent_60%),radial-gradient(ellipse_at_bottom_left,var(--primary)/15%,transparent_55%)]"
	/>
);

export interface HeroCopy {
	tagline: string;
	title: string;
	titleFaded: string;
	description: string;
	primaryCta: string;
	primaryCtaHref: string;
	secondaryCta: string;
	secondaryCtaHref: string;
}

export function HeroSection({ copy: m }: { copy: HeroCopy }) {
	return (
		<section className="relative flex min-h-screen items-center overflow-hidden bg-background">
			{/* Beams background */}
			<div className="absolute inset-0 z-0">
				<ClientOnly fallback={<HeroBeamsFallback />}>
					<WebGLBoundary fallback={<HeroBeamsFallback />}>
						<Suspense fallback={<HeroBeamsFallback />}>
							<Beams
								beamWidth={3}
								beamHeight={30}
								beamNumber={30}
								speed={2}
								noiseIntensity={1.75}
								scale={0.2}
								rotation={30}
							/>
						</Suspense>
					</WebGLBoundary>
				</ClientOnly>
			</div>

			{/* Semi-transparent scrim so text reads over the animated beams */}
			<div className="absolute inset-0 z-[1] bg-background/60" />

			{/* Content — left-aligned for editorial impact */}
			<div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
				{/* Tagline */}
				<BlurFade delay={0.1} inView>
					<p className="mb-8 text-[10px] tracking-[0.5em] text-foreground/70 uppercase drop-shadow-sm sm:mb-10 sm:text-xs">
						{m.tagline}
					</p>
				</BlurFade>

				{/* Main heading — viewport-filling fluid type */}
				<BlurFade delay={0.25} inView>
					<h1 className="text-[clamp(3.5rem,11vw,11rem)] font-bold leading-[0.85] tracking-tighter drop-shadow-md">
						<DecryptedText
							text={m.title}
							animateOn="view"
							speed={40}
							sequential
							revealDirection="start"
							className="text-foreground"
							encryptedClassName="text-primary/60"
						/>
						<span
							className="animate-blink ms-2 inline-block h-[0.65em] w-0.75 align-middle bg-primary"
							aria-hidden="true"
						/>
					</h1>
				</BlurFade>

				{/* Faded heading */}
				<BlurFade delay={0.4} inView>
					<p
						className="text-[clamp(3.5rem,11vw,11rem)] font-bold leading-[0.85] tracking-tighter text-foreground/35 dark:text-foreground/20"
						aria-hidden="true"
					>
						<DecryptedText
							text={m.titleFaded}
							animateOn="view"
							speed={40}
							sequential
							revealDirection="start"
							className="text-foreground/35 dark:text-foreground/20"
							encryptedClassName="text-primary/40 dark:text-primary/25"
						/>
					</p>
				</BlurFade>

				{/* Subtitle */}
				<BlurFade delay={0.55} inView>
					<div className="mt-8 max-w-xl sm:mt-12">
						<HyperText
							className="text-sm tracking-wide text-foreground/70 drop-shadow-sm sm:text-base"
							duration={1200}
							startOnView
							animateOnHover={false}
						>
							{m.description}
						</HyperText>
					</div>
				</BlurFade>

				{/* CTA buttons */}
				<BlurFade delay={0.7} inView>
					<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
						<Link
							href={m.primaryCtaHref}
							className={cn(
								"group inline-flex items-center gap-2",
								"border border-foreground/20 bg-foreground/10 px-8 py-3.5 backdrop-blur-sm",
								"text-xs font-medium tracking-[0.2em] text-foreground uppercase",
								"transition-all duration-300",
								"hover:bg-foreground/20 hover:border-foreground/30",
							)}
						>
							{m.primaryCta}
							<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
						</Link>
						<Link
							href={m.secondaryCtaHref}
							className={cn(
								"inline-flex items-center gap-2",
								"border border-foreground/25 bg-background/30 px-8 py-3.5 backdrop-blur-sm",
								"text-xs tracking-[0.2em] text-foreground/80 uppercase",
								"transition-all duration-300",
								"hover:border-foreground/40 hover:text-foreground",
							)}
						>
							{m.secondaryCta}
						</Link>
					</div>
				</BlurFade>
			</div>

			{/* Gradient fade to page background */}
			<div className="absolute inset-x-0 bottom-0 z-5 h-32 bg-linear-to-t from-background to-transparent" />
		</section>
	);
}

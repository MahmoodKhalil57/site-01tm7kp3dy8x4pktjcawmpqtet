import { lazy, Suspense } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { WebGLBoundary } from "@/components/WebGLBoundary";
import { ClientOnly } from "@/components/client-only";

const Silk = lazy(() => import("@/components/Silk"));

const SilkFallback = () => (
	<div
		aria-hidden="true"
		className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--primary)/12%,transparent_70%)]"
	/>
);

export interface Testimonial {
	quote: string;
	name: string;
	company: string;
}

export function TestimonialsSection({
	title,
	titleFaded,
	testimonials,
}: {
	title: string;
	titleFaded: string;
	testimonials: Testimonial[];
}) {
	if (testimonials.length === 0) return null;
	const [featured, ...rest] = testimonials as [Testimonial, ...Testimonial[]];

	return (
		<section className="relative overflow-hidden py-24 sm:py-32">
			<div className="absolute inset-0 z-0">
				<ClientOnly fallback={<SilkFallback />}>
					<WebGLBoundary fallback={<SilkFallback />}>
						<Suspense fallback={<SilkFallback />}>
							<Silk speed={3} scale={0.8} noiseIntensity={1.2} rotation={0.2} />
						</Suspense>
					</WebGLBoundary>
				</ClientOnly>
			</div>

			{/* Overlay for legibility */}
			<div className="absolute inset-0 z-1 bg-background/80" />

			{/* Gradient edges */}
			<div className="absolute inset-x-0 top-0 z-2 h-24 bg-linear-to-b from-background to-transparent" />
			<div className="absolute inset-x-0 bottom-0 z-2 h-24 bg-linear-to-t from-background to-transparent" />

			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
				<BlurFade delay={0.1} inView>
					<h2 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
						{title} <span className="text-muted-foreground/50 dark:text-muted-foreground/30">{titleFaded}</span>
					</h2>
				</BlurFade>

				{/* Featured testimonial — oversized editorial quote */}
				<BlurFade delay={0.25} inView>
					<blockquote className="relative mt-16 ps-6 sm:mt-20 sm:ps-10">
						{/* Large decorative quotation mark */}
						<span
							className="absolute -top-2 start-0 font-serif text-[6rem] leading-none text-primary/15 select-none dark:text-primary/10 sm:-top-4 sm:text-[8rem]"
							aria-hidden="true"
						>
							&ldquo;
						</span>
						<p className="text-xl leading-relaxed tracking-tight text-foreground sm:text-2xl md:text-3xl lg:text-4xl">
							{featured.quote}
						</p>
						<footer className="mt-8 flex items-center gap-4">
							<div className="h-px w-8 bg-primary/50 dark:bg-primary/30" />
							<div>
								<p className="text-sm font-semibold tracking-wide text-foreground">{featured.name}</p>
								<p className="text-xs text-muted-foreground dark:text-muted-foreground/60">{featured.company}</p>
							</div>
						</footer>
					</blockquote>
				</BlurFade>

				{/* Secondary testimonials */}
				<div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
					{rest.map((t, i) => (
						<BlurFade key={t.name} delay={0.35 + i * 0.1} inView>
							<blockquote className="flex h-full flex-col justify-between border-s-2 border-primary/50 ps-4 dark:border-primary/30">
								<div>
									<span className="text-xs text-muted-foreground/60 dark:text-muted-foreground/40">{"// "}</span>
									<p className="mt-2 text-sm leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
								</div>
								<footer className="mt-6">
									<p className="text-xs font-medium tracking-wide text-foreground">{t.name}</p>
									<p className="text-[10px] text-muted-foreground dark:text-muted-foreground/60">{t.company}</p>
								</footer>
							</blockquote>
						</BlurFade>
					))}
				</div>
			</div>
		</section>
	);
}

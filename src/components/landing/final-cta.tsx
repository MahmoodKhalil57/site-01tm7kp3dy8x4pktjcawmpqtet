import { lazy, Suspense } from "react";
import { Link } from "@/components/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";
import { WebGLBoundary } from "@/components/WebGLBoundary";
import { ClientOnly } from "@/components/client-only";

const Aurora = lazy(() => import("@/components/Aurora"));

const AuroraFallback = () => (
	<div
		aria-hidden="true"
		className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--primary)/25%,transparent_65%)]"
	/>
);

export function FinalCta({
	title,
	titleFaded,
	button,
	buttonHref,
	footnote,
}: {
	title: string;
	titleFaded: string;
	button: string;
	buttonHref: string;
	footnote?: string;
}) {
	return (
		<section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
			{/* Aurora background */}
			<div className="absolute inset-0 z-0">
				<ClientOnly fallback={<AuroraFallback />}>
					<WebGLBoundary fallback={<AuroraFallback />}>
						<Suspense fallback={<AuroraFallback />}>
							<Aurora amplitude={1.2} blend={0.6} speed={0.8} />
						</Suspense>
					</WebGLBoundary>
				</ClientOnly>
			</div>

			{/* Dark overlay for text legibility */}
			<div className="absolute inset-0 z-1 bg-background/80" />

			{/* Gradient edges for seamless blending */}
			<div className="absolute inset-x-0 top-0 z-3 h-32 bg-linear-to-b from-background to-transparent" />
			<div className="absolute inset-x-0 bottom-0 z-3 h-32 bg-linear-to-t from-background to-transparent" />

			{/* Content */}
			<div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
				{/* Decorative line */}
				<BlurFade delay={0.1} inView>
					<div className="mx-auto mb-10 h-px w-16 bg-primary/50" />
				</BlurFade>

				{/* Main heading */}
				<BlurFade delay={0.2} inView>
					<h2 className="text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.9] tracking-tighter text-foreground">{title}</h2>
				</BlurFade>

				<BlurFade delay={0.35} inView>
					<p className="mt-2 text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.9] tracking-tighter text-foreground/25 dark:text-foreground/15">
						{titleFaded}
					</p>
				</BlurFade>

				{/* CTA button with glow */}
				<BlurFade delay={0.5} inView>
					<div className="mt-12 flex flex-col items-center gap-6 sm:mt-16">
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
							<span className="relative">{button}</span>
							<ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
						</Link>
						{footnote && <p className="text-xs text-muted-foreground/60 dark:text-muted-foreground/40">{footnote}</p>}
					</div>
				</BlurFade>
			</div>
		</section>
	);
}

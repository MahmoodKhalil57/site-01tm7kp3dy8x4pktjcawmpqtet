import { Link } from "@/components/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";
import { iconFor } from "@/components/icon-map";

export interface EngagementModel {
	icon: string;
	name: string;
	description: string;
	bestForLabel: string;
	bestFor: string;
	features: string[];
	cta: string;
	ctaHref: string;
	featured: boolean;
}

/** "How we work" — the engagement-model cards (the source's PricingSection). */
export function PricingSection({
	title,
	titleFaded,
	subtitle,
	models,
}: {
	title: string;
	titleFaded: string;
	subtitle: string;
	models: EngagementModel[];
}) {
	return (
		<section id="pricing" className="relative py-24 sm:py-32">
			<div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
				<div className="absolute start-1/2 top-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/4 blur-[100px] dark:bg-primary/3" />
			</div>

			<div className="relative mx-auto max-w-7xl px-4 sm:px-6">
				<BlurFade delay={0.1} inView>
					<h2 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
						{title} <span className="text-muted-foreground/30">{titleFaded}</span>
					</h2>
					<p className="mt-4 text-sm text-muted-foreground">{subtitle}</p>
				</BlurFade>

				<div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{models.map((model, index) => {
						const Icon = iconFor(model.icon);
						return (
							<BlurFade key={model.name} delay={0.2 + index * 0.1} inView>
								<div
									className={cn(
										"group relative flex h-full flex-col overflow-hidden rounded-sm border p-8 transition-all duration-500",
										model.featured
											? "border-primary/50 bg-card/80 dark:border-primary/30"
											: "border-border/40 bg-card/50 hover:border-border/60 dark:border-border/20 dark:hover:border-border/40",
										model.featured && "hover:shadow-[0_0_60px_-10px] hover:shadow-primary/20",
										!model.featured && "hover:-translate-y-0.5",
									)}
								>
									{model.featured && (
										<div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />
									)}

									{model.featured && (
										<div className="pointer-events-none absolute -top-20 start-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl dark:bg-primary/5" />
									)}

									<div className="mb-4 flex size-10 items-center justify-center rounded-md border border-border/40 bg-muted/50 dark:border-border/20">
										<Icon className="size-5 text-primary" />
									</div>

									<p className="text-xs tracking-[0.15em] text-muted-foreground uppercase">{model.name}</p>

									<p className="mt-3 text-sm leading-relaxed text-muted-foreground">{model.description}</p>

									<div className="mt-4 inline-flex items-baseline gap-1.5">
										<span className="text-[10px] font-medium tracking-widest text-primary/80 uppercase">
											{model.bestForLabel}:
										</span>
										<span className="text-xs text-muted-foreground/70 dark:text-muted-foreground/50">{model.bestFor}</span>
									</div>

									<ul className="mt-6 flex-1 space-y-3">
										{model.features.map((feature) => (
											<li key={feature} className="flex items-center gap-3 text-sm text-foreground">
												<span className="size-1 shrink-0 rounded-full bg-primary/70 dark:bg-primary/50" />
												{feature}
											</li>
										))}
									</ul>

									<Link
										href={model.ctaHref}
										className={cn(
											"mt-8 inline-flex w-full items-center justify-center gap-2",
											"border bg-transparent py-3",
											"text-xs tracking-[0.15em] uppercase",
											"transition-all duration-300",
											model.featured
												? "border-primary/80 text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_-5px] hover:shadow-primary/20 dark:border-primary/60"
												: "border-border/60 text-muted-foreground hover:border-border hover:text-foreground dark:border-border/40",
										)}
									>
										{model.cta}
										<ArrowRight className="h-3 w-3 rtl:rotate-180" />
									</Link>
								</div>
							</BlurFade>
						);
					})}
				</div>
			</div>
		</section>
	);
}

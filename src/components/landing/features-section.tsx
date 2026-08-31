import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";
import { iconFor } from "@/components/icon-map";

export interface ServiceCard {
	icon: string;
	title: string;
	description: string;
}

export function FeaturesSection({
	title,
	titleFaded,
	services,
}: {
	title: string;
	titleFaded: string;
	services: ServiceCard[];
}) {
	return (
		<section id="services" className="relative py-24 sm:py-32">
			{/* Subtle radial glow behind the grid */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
				<div className="absolute start-1/2 top-1/3 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px] dark:bg-primary/3" />
			</div>

			<div className="relative mx-auto max-w-7xl px-4 sm:px-6">
				{/* Section heading */}
				<BlurFade delay={0.1} inView>
					<div className="mb-16">
						<h2 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
							{title} <span className="text-muted-foreground/50 dark:text-muted-foreground/30">{titleFaded}</span>
						</h2>
					</div>
				</BlurFade>

				{/* Service cards grid */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{services.map((card, index) => {
						const Icon = iconFor(card.icon);
						const num = String(index + 1).padStart(2, "0");
						return (
							<BlurFade key={index} delay={0.15 + index * 0.08} inView>
								<div
									className={cn(
										"group relative h-full overflow-hidden rounded-sm",
										"border border-border/40 dark:border-border/20",
										"bg-card/50 backdrop-blur-sm",
										"p-6 transition-all duration-500 sm:p-8",
										"hover:border-primary/30 dark:hover:border-primary/20",
										"hover:shadow-[0_0_40px_-10px] hover:shadow-primary/10",
										"hover:-translate-y-1",
									)}
								>
									{/* Gradient accent line on hover */}
									<div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:via-primary/30" />

									{/* Hover glow orb */}
									<div className="pointer-events-none absolute -end-12 -top-12 size-32 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

									{/* Decorative number */}
									<span
										className="absolute end-4 top-4 text-5xl font-bold leading-none text-foreground/4 select-none dark:text-foreground/3 sm:text-6xl"
										aria-hidden="true"
									>
										{num}
									</span>

									{/* Icon */}
									<div className="mb-5 inline-flex size-10 items-center justify-center rounded-sm bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15 dark:bg-primary/5 dark:group-hover:bg-primary/10">
										<Icon className="h-5 w-5 text-primary/80 transition-colors duration-300 group-hover:text-primary dark:text-primary/60" />
									</div>

									{/* Title */}
									<h3 className="mb-2 text-base font-bold tracking-wide text-foreground sm:text-lg">{card.title}</h3>

									{/* Description */}
									<p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
								</div>
							</BlurFade>
						);
					})}
				</div>
			</div>
		</section>
	);
}

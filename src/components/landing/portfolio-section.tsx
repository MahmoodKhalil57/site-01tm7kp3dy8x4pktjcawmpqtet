import { Image } from "@/components/image";
import { Link } from "@/components/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";

export interface PortfolioProject {
	slug: string;
	title: string;
	subtitle: string;
	description: string;
	image: string;
	tags: string[];
	url: string;
	year: string;
}

export function PortfolioSection({
	title,
	titleFaded,
	viewAllLabel,
	projects,
}: {
	title: string;
	titleFaded: string;
	viewAllLabel: string;
	projects: PortfolioProject[];
}) {
	return (
		<section id="portfolio" className="py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-4 sm:px-6">
				{/* Section heading */}
				<BlurFade delay={0.1} inView>
					<div className="mb-16 flex items-end justify-between">
						<h2 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
							{title} <span className="text-muted-foreground/50 dark:text-muted-foreground/30">{titleFaded}</span>
						</h2>
						<Link
							href="/portfolio"
							className="hidden text-xs tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-primary sm:inline-flex"
						>
							{viewAllLabel}
						</Link>
					</div>
				</BlurFade>

				{/* Project grid — first project spans full width */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{projects.map((project, index) => (
						<BlurFade key={project.slug} delay={0.15 + index * 0.1} inView>
							<Link
								href={project.url}
								target="_blank"
								rel="noopener noreferrer"
								className={cn(
									"group relative block overflow-hidden rounded-sm",
									"border border-border/40 bg-card/50 dark:border-border/20 dark:bg-card/30",
									"transition-all duration-500",
									"hover:border-border/60 hover:bg-card/60 hover:-translate-y-1 dark:hover:border-border/40",
									"hover:shadow-[0_8px_40px_-12px] hover:shadow-primary/10",
									index === 0 && "md:col-span-2 h-full",
								)}
							>
								{/* Image container */}
								<div className={cn("relative overflow-hidden", index === 0 ? "aspect-21/9" : "aspect-16/10")}>
									<Image
										src={project.image}
										alt={project.title}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105 object-center"
									/>
									{/* Dark overlay */}
									<div className="absolute inset-0 bg-background/60 transition-opacity duration-500 group-hover:bg-background/40" />
									{/* Noise overlay on hover */}
									<div className="noir-grain absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
									{/* Arrow indicator */}
									<div className="absolute end-4 top-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
										<ArrowUpRight className="h-5 w-5 text-foreground" />
									</div>
								</div>

								{/* Content */}
								<div className={cn("p-5", index === 0 && "sm:p-8")}>
									<div className="mb-3 flex items-start justify-between gap-4">
										<div>
											<h3
												className={cn(
													"font-bold tracking-wide text-foreground",
													index === 0 ? "text-lg sm:text-xl" : "text-sm",
												)}
											>
												{project.title}
											</h3>
											<p className={cn("mt-1 text-muted-foreground", index === 0 ? "text-sm" : "text-xs")}>
												{project.subtitle}
											</p>
										</div>
										<span className="shrink-0 text-[10px] text-muted-foreground/70 dark:text-muted-foreground/50">
											[{project.year}]
										</span>
									</div>

									{/* Tags */}
									<div className="flex flex-wrap gap-2">
										{project.tags.slice(0, index === 0 ? 6 : 4).map((tag, tagIndex) => (
											<span
												key={tagIndex}
												className={cn(
													"text-[10px] tracking-wider text-muted-foreground uppercase dark:text-muted-foreground/60",
													"border border-border/40 px-2 py-0.5 dark:border-border/20",
												)}
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							</Link>
						</BlurFade>
					))}
				</div>

				{/* CTA button */}
				<BlurFade delay={0.15 + projects.length * 0.1} inView>
					<div className="mt-12 text-center">
						<Button variant="outline" size="lg" asChild>
							<Link href="/portfolio">
								{viewAllLabel}
								<ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
							</Link>
						</Button>
					</div>
				</BlurFade>
			</div>
		</section>
	);
}

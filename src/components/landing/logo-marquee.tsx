import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity";
import { cn } from "@/lib/utils";

export function LogoMarquee({ items }: { items: string[] }) {
	if (items.length === 0) return null;
	const Row = ({ list }: { list: string[] }) => (
		<div className="flex items-center">
			{list.map((service, i) => (
				<span key={i} className="flex items-center">
					<span
						className={cn(
							"text-4xl font-bold uppercase tracking-[0.08em] text-muted-foreground/25 whitespace-nowrap dark:text-muted-foreground/15",
							"sm:text-6xl md:text-7xl lg:text-8xl",
						)}
					>
						{service}
					</span>
					<span className="mx-4 text-4xl text-primary/30 dark:text-primary/20 sm:mx-8 sm:text-6xl md:text-7xl lg:text-8xl">
						{"·"}
					</span>
				</span>
			))}
		</div>
	);

	return (
		<section className="overflow-hidden border-y border-border/40 py-8 dark:border-border/20 sm:py-10">
			<ScrollVelocityContainer className="space-y-3 sm:space-y-4">
				<ScrollVelocityRow baseVelocity={2} direction={1}>
					<Row list={items} />
				</ScrollVelocityRow>
				<ScrollVelocityRow baseVelocity={2} direction={-1}>
					<Row list={[...items].reverse()} />
				</ScrollVelocityRow>
			</ScrollVelocityContainer>
		</section>
	);
}

import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";

export interface Stat {
	value: number;
	suffix?: string;
	label: string;
	/** Render the number as-is (e.g. a year) instead of counting up. */
	static?: boolean;
}

const GRAIN_BG =
	"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')";

export function StatsSection({ stats }: { stats: Stat[] }) {
	return (
		<section className="relative overflow-hidden border-y border-border/40 py-20 dark:border-border/20 sm:py-28">
			{/* Background glow orbs */}
			<div className="pointer-events-none absolute inset-0" aria-hidden="true">
				<div className="absolute -start-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/6 blur-[80px] dark:bg-primary/4" />
				<div className="absolute -end-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/4 blur-[80px] dark:bg-primary/3" />
			</div>

			{/* Noise texture */}
			<div
				className="noir-grain pointer-events-none absolute inset-0 opacity-[0.02]"
				style={{ backgroundImage: GRAIN_BG }}
				aria-hidden="true"
			/>

			<div className="relative mx-auto max-w-7xl px-4 sm:px-6">
				<div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0">
					{stats.map((stat, index) => (
						<BlurFade key={index} delay={0.1 + index * 0.1} inView>
							<div
								className={cn(
									"relative flex flex-col items-center text-center",
									index < stats.length - 1 && "lg:border-e lg:border-border/40 dark:lg:border-border/20",
								)}
							>
								<div className="flex items-baseline gap-0.5">
									{stat.static ? (
										<span className="text-5xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
											{stat.value}
										</span>
									) : (
										<NumberTicker
											value={stat.value}
											decimalPlaces={stat.value % 1 !== 0 ? 1 : 0}
											className="text-5xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
										/>
									)}
									<span className="text-2xl font-bold text-primary/80 dark:text-primary/60 sm:text-3xl md:text-4xl">
										{stat.suffix}
									</span>
								</div>
								<span className="mt-2 text-[10px] tracking-[0.3em] text-muted-foreground uppercase dark:text-muted-foreground/60 sm:mt-3 sm:text-xs">
									{stat.label}
								</span>
							</div>
						</BlurFade>
					))}
				</div>
			</div>
		</section>
	);
}

import { ArrowRight } from "lucide-react";
import { Image } from "@/components/image";
import { Link } from "@/components/link";
import { cn, formatDate } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";
import type { PostCard } from "./post-list";

/** "Next post" card at the end of an article (port of the inline block in `blogs/[slug]/page.tsx`). */
export function PostNext({ post: nextPost }: { post: PostCard }) {
	const isNextUpcoming = nextPost.upcoming;

	const inner = (
		<>
			{!isNextUpcoming && (
				<div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:via-primary/30" />
			)}

			{nextPost.coverImage && (
				<div className="relative hidden w-48 shrink-0 overflow-hidden sm:block">
					<Image
						src={nextPost.coverImage}
						alt={nextPost.coverImageAlt || nextPost.title}
						fill
						className={cn("object-cover", !isNextUpcoming && "transition-transform duration-700 group-hover:scale-105")}
					/>
					<div
						className={cn(
							"absolute inset-0",
							isNextUpcoming
								? "bg-background/60"
								: "bg-background/40 transition-opacity duration-500 group-hover:bg-background/20",
						)}
					/>
				</div>
			)}

			<div className="flex min-w-0 flex-1 items-center justify-between gap-4 p-5">
				<div className="min-w-0">
					<div className="flex items-center gap-3 text-[10px] text-muted-foreground/70 mb-2 dark:text-muted-foreground/50">
						<span className="font-bold uppercase tracking-[0.15em] text-primary/60">{nextPost.categoryLabel}</span>
						{nextPost.publishedAt && (
							<>
								<span className="text-border/60">/</span>
								<span>{isNextUpcoming ? "Coming Soon" : formatDate(nextPost.publishedAt)}</span>
							</>
						)}
					</div>
					<h3
						className={cn(
							"text-lg font-bold tracking-tight text-foreground line-clamp-1",
							!isNextUpcoming && "transition-colors group-hover:text-primary/80",
						)}
					>
						{nextPost.title}
					</h3>
					{nextPost.excerpt && (
						<p className="mt-1 text-sm text-muted-foreground/70 line-clamp-1 dark:text-muted-foreground/50">{nextPost.excerpt}</p>
					)}
				</div>
				{!isNextUpcoming && (
					<ArrowRight className="size-4 shrink-0 text-muted-foreground/40 transition-all duration-300 group-hover:text-primary/60 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
				)}
			</div>
		</>
	);

	const sharedClass = cn(
		"group mt-4 flex items-stretch gap-0 overflow-hidden rounded-sm",
		"border border-border/40 dark:border-border/20",
		"bg-card/50 backdrop-blur-sm",
		"transition-all duration-500",
		isNextUpcoming
			? "opacity-50 cursor-default"
			: [
					"hover:border-primary/30 dark:hover:border-primary/20",
					"hover:shadow-[0_0_40px_-10px] hover:shadow-primary/10",
					"hover:-translate-y-0.5",
				],
	);

	return (
		<BlurFade delay={0.2} inView>
			<div className="mt-16 border-t border-border/40 pt-10 dark:border-border/20">
				<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Next post</span>
				{isNextUpcoming ? (
					<div className={sharedClass}>{inner}</div>
				) : (
					<Link href={`/blogs/${nextPost.slug}`} className={sharedClass}>
						{inner}
					</Link>
				)}
			</div>
		</BlurFade>
	);
}

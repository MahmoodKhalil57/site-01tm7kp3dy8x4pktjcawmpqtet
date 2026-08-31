import { Image } from "@/components/image";
import { Link } from "@/components/link";
import { cn, formatDate } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";

export interface PostCard {
	slug: string;
	title: string;
	excerpt: string;
	coverImage: string | null;
	coverImageAlt: string;
	author: string;
	categoryLabel: string;
	publishedAt: string | null;
	upcoming: boolean;
}

const GRAIN =
	"bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]";

/** The blog index card grid (port of `blogs/page.tsx`). */
export function PostList({ posts }: { posts: PostCard[] }) {
	if (posts.length === 0) {
		return (
			<BlurFade delay={0.15} inView>
				<div className="text-center py-16">
					<h2 className="text-xl font-bold text-foreground mb-2">No posts yet</h2>
					<p className="text-muted-foreground">Check back soon for new content.</p>
				</div>
			</BlurFade>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{posts.map((post, index) => {
				const isUpcoming = post.upcoming;
				const href = `/blogs/${post.slug}`;

				return (
					<BlurFade key={post.slug} delay={0.1 + index * 0.06} inView>
						<article
							className={cn(
								"group relative h-full overflow-hidden rounded-sm",
								"border border-border/40 dark:border-border/20",
								"bg-card/50 backdrop-blur-sm",
								"transition-all duration-500",
								isUpcoming
									? "opacity-50 cursor-default"
									: [
											"hover:border-primary/30 dark:hover:border-primary/20",
											"hover:shadow-[0_0_40px_-10px] hover:shadow-primary/10",
											"hover:-translate-y-1",
										],
							)}
						>
							{/* Gradient accent line on hover (live posts only) */}
							{!isUpcoming && (
								<div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:via-primary/30" />
							)}

							{/* Coming soon badge */}
							{isUpcoming && (
								<div className="absolute end-3 top-3 z-10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] border border-border/60 bg-background/80 text-muted-foreground backdrop-blur-sm">
									Coming Soon
								</div>
							)}

							{/* Cover image */}
							{post.coverImage &&
								(isUpcoming ? (
									<div className="relative block aspect-video w-full overflow-hidden">
										<Image src={post.coverImage} alt={post.coverImageAlt || post.title} fill className="object-cover" />
										<div className="absolute inset-0 bg-background/60" />
									</div>
								) : (
									<Link href={href} className="relative block aspect-video w-full overflow-hidden">
										<Image
											src={post.coverImage}
											alt={post.coverImageAlt || post.title}
											fill
											className="object-cover transition-transform duration-700 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-background/40 transition-opacity duration-500 group-hover:bg-background/20" />
										<div
											className={cn(
												"noir-grain absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
												GRAIN,
											)}
										/>
									</Link>
								))}

							{/* Content */}
							<div className="p-5">
								<div className="flex items-center gap-3 text-[10px] text-muted-foreground/70 mb-3 dark:text-muted-foreground/50">
									<span className="font-bold uppercase tracking-[0.15em] text-primary/60">{post.categoryLabel}</span>
									{post.publishedAt && (
										<>
											<span className="text-border/60">/</span>
											<span>{formatDate(post.publishedAt)}</span>
										</>
									)}
									{post.author && (
										<>
											<span className="text-border/60">/</span>
											<span>{post.author}</span>
										</>
									)}
								</div>

								<h2 className="text-lg font-bold tracking-wide text-foreground">
									{isUpcoming ? (
										post.title
									) : (
										<Link href={href} className="transition-colors group-hover:text-primary/80">
											{post.title}
										</Link>
									)}
								</h2>

								<p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
							</div>
						</article>
					</BlurFade>
				);
			})}
		</div>
	);
}

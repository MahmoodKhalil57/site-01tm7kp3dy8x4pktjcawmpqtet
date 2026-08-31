import { Github, Linkedin, Twitter, Instagram, Facebook, Youtube } from "lucide-react";
import { Link } from "@/components/link";

export interface FooterColumn {
	title: string;
	links: { label: string; href: string; target?: string }[];
}

export interface SocialLink {
	label: string;
	href: string;
	icon: "github" | "linkedin" | "twitter" | "instagram" | "facebook" | "youtube";
}

const icons = { github: Github, linkedin: Linkedin, twitter: Twitter, instagram: Instagram, facebook: Facebook, youtube: Youtube };

export function Footer({
	siteTitle,
	tagline,
	copyright,
	columns,
	socialLinks,
}: {
	siteTitle: string;
	tagline: string;
	copyright: string;
	columns: FooterColumn[];
	socialLinks: SocialLink[];
}) {
	const Socials = () => (
		<div className="flex gap-1">
			{socialLinks.map((social) => {
				const Icon = icons[social.icon];
				return (
					<Link
						key={social.label}
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={social.label}
						className="inline-flex items-center justify-center size-8 rounded-sm text-muted-foreground hover:text-primary hover:bg-accent/50 transition-all duration-200"
					>
						<Icon className="size-3.5" />
					</Link>
				);
			})}
		</div>
	);

	return (
		<footer className="border-t border-border/40 dark:border-border/20 bg-background">
			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
				{/* Desktop layout */}
				<div className="hidden md:flex md:items-start md:justify-between md:gap-8">
					{/* Brand column */}
					<div className="space-y-4 max-w-xs">
						<Link
							href="/"
							className="text-xs font-semibold tracking-[0.25em] text-foreground hover:text-primary transition-colors"
						>
							{siteTitle}
						</Link>
						<p className="text-xs leading-relaxed text-muted-foreground">{tagline}</p>
						<Socials />
						<p className="text-[10px] tracking-wide text-muted-foreground/70 dark:text-muted-foreground/50">{copyright}</p>
					</div>

					{/* Link columns */}
					{columns.map((section) => (
						<div key={section.title} className="space-y-4">
							<h3 className="text-[10px] font-semibold tracking-[0.2em] text-foreground uppercase">{section.title}</h3>
							<ul className="space-y-2.5">
								{section.links.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											target={link.target}
											className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Mobile layout */}
				<div className="md:hidden space-y-8">
					<div className="space-y-4 flex flex-col items-center">
						<Link
							href="/"
							className="text-xs font-semibold tracking-[0.25em] text-foreground uppercase hover:text-primary transition-colors"
						>
							{siteTitle}
						</Link>
						<p className="text-xs leading-relaxed text-muted-foreground text-center">{tagline}</p>
						<Socials />
					</div>

					<div className="flex flex-wrap gap-x-12 gap-y-6 justify-center">
						{columns.map((section) => (
							<div key={section.title} className="space-y-3">
								<h3 className="text-[10px] font-semibold tracking-[0.2em] text-foreground uppercase">{section.title}</h3>
								<ul className="space-y-2">
									{section.links.map((link) => (
										<li key={link.href}>
											<Link
												href={link.href}
												target={link.target}
												className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					<p className="text-[10px] tracking-wide text-muted-foreground/70 dark:text-muted-foreground/50 pt-4 border-t border-border/40 dark:border-border/20 text-center">
						{copyright}
					</p>
				</div>
			</div>
		</footer>
	);
}

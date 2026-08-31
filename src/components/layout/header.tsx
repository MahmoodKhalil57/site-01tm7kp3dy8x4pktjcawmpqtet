import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Link } from "@/components/link";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";

export interface NavLink {
	href: string;
	label: string;
}

export function Header({
	siteTitle,
	links,
	pathname,
	initialTheme,
}: {
	siteTitle: string;
	links: NavLink[];
	pathname: string;
	initialTheme?: string;
}) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const isLinkActive = (href: string) => {
		if (href === "/") return pathname === "/";
		return pathname.startsWith(href);
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	return (
		<>
			{/* Skip to content */}
			<Link
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:text-sm focus:font-medium"
			>
				Skip to content
			</Link>

			<header className="header-scroll fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all">
				<div className="relative mx-auto max-w-7xl h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
					{/* Logo */}
					<Link
						href="/"
						className="header-logo text-lg font-semibold tracking-[0.25em] text-foreground hover:text-primary transition-colors"
					>
						{siteTitle}
					</Link>

					{/* Desktop Navigation - centered on screen */}
					<nav
						className="hidden lg:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
						aria-label="Main navigation"
					>
						{links.map((link) => {
							const isActive = isLinkActive(link.href);
							return (
								<Link
									key={link.href}
									href={link.href}
									className={`relative px-3 py-2 text-xs tracking-[0.15em] uppercase transition-colors group ${
										isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
									}`}
									aria-current={isActive ? "page" : undefined}
								>
									{link.label}
									<span
										className={`absolute inset-x-3 -bottom-px h-px bg-primary/80 dark:bg-primary/60 scale-x-0 transition-transform duration-300 origin-left ${!isActive ? "group-hover:scale-x-100" : ""}`}
									/>
								</Link>
							);
						})}
					</nav>

					{/* Desktop Actions */}
					<div className="header-actions hidden lg:flex items-center gap-1 border-s border-border/40 dark:border-border/20 ps-3">
						<DarkModeToggle
							initialMode={initialTheme}
							className="inline-flex items-center justify-center size-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
						/>
					</div>

					{/* Mobile Actions */}
					<div className="flex lg:hidden items-center gap-1">
						<DarkModeToggle
							initialMode={initialTheme}
							className="inline-flex items-center justify-center size-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
						/>

						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="inline-flex items-center justify-center size-9 text-[10px] tracking-[0.2em] text-muted-foreground uppercase hover:text-foreground transition-colors"
							aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
							aria-expanded={isMobileMenuOpen}
						>
							{isMobileMenuOpen ? <X className="size-5" /> : "MENU"}
						</button>
					</div>
				</div>
			</header>

			{/* Mobile Menu - Full Screen Overlay */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm lg:hidden"
					>
						{/* Top bar with logo and close */}
						<div className="flex h-14 items-center justify-between px-4 sm:px-6">
							<span className="text-lg font-semibold tracking-[0.25em] text-foreground">{siteTitle}</span>
							<button
								onClick={() => setIsMobileMenuOpen(false)}
								aria-label="Close menu"
								className="text-muted-foreground transition-colors hover:text-foreground"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						{/* Nav links centered */}
						<nav className="flex flex-col items-center gap-8 pt-16" aria-label="Mobile navigation">
							{links.map((link, i) => {
								const isActive = isLinkActive(link.href);
								return (
									<motion.div
										key={link.href}
										initial={{ y: 10, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ delay: i * 0.05 }}
									>
										<Link
											href={link.href}
											onClick={() => setIsMobileMenuOpen(false)}
											className={`text-sm tracking-[0.3em] uppercase transition-colors ${
												isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
											}`}
											aria-current={isActive ? "page" : undefined}
										>
											{link.label}
										</Link>
									</motion.div>
								);
							})}
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

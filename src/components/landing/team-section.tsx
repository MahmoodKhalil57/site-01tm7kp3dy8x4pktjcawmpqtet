import { useRef, useState } from "react";
import { Image } from "@/components/image";
import { Link } from "@/components/link";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Linkedin, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { HyperText } from "@/components/ui/hyper-text";

export interface TeamMemberCard {
	id: string;
	name: string;
	role: string;
	bio: string;
	image: string;
	/** CSS object-position, e.g. "50% 30%" */
	imagePosition?: string;
	linkedin?: string | null;
	github?: string | null;
}

function MemberCard({ member, index, isInView }: { member: TeamMemberCard; index: number; isInView: boolean }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, y: 60 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
			transition={{
				duration: 0.7,
				delay: 0.15 + index * 0.1,
				ease: [0.22, 1, 0.36, 1],
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="group relative"
		>
			<div className="relative overflow-hidden border border-border/30 bg-card/30 backdrop-blur-sm transition-colors duration-500 hover:border-primary/30 dark:border-border/15 dark:hover:border-primary/20">
				{/* Image with dramatic aspect ratio */}
				<div className="relative aspect-3/4 overflow-hidden bg-muted">
					<Image
						src={member.image}
						alt={member.name}
						fill
						className="object-cover transition-all duration-700 group-hover:scale-110"
						style={{ objectPosition: member.imagePosition || "50% 50%" }}
					/>

					{/* Dark gradient overlay */}
					<motion.div
						className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent"
						animate={{ opacity: isHovered ? 0.95 : 0.6 }}
						transition={{ duration: 0.5 }}
					/>

					{/* Primary tint on hover */}
					<motion.div
						className="absolute inset-0 bg-primary/10 mix-blend-overlay"
						animate={{ opacity: isHovered ? 1 : 0 }}
						transition={{ duration: 0.5 }}
					/>

					{/* Scan lines */}
					<div
						className="pointer-events-none absolute inset-0 opacity-[0.03]"
						style={{
							backgroundImage:
								"repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 3px)",
						}}
						aria-hidden="true"
					/>

					{/* Index number */}
					<motion.span
						className="absolute start-3 top-3 font-mono text-[10px] tracking-widest text-foreground/30"
						animate={{ opacity: isHovered ? 1 : 0.3 }}
						transition={{ duration: 0.3 }}
					>
						{String(index + 1).padStart(2, "0")}
					</motion.span>

					{/* Bottom content */}
					<div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
						<motion.h3
							className="text-lg font-black uppercase tracking-tight text-foreground sm:text-xl"
							animate={{ y: isHovered ? -2 : 0 }}
							transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
						>
							{member.name}
						</motion.h3>

						<div className="mt-0.5 flex items-center gap-2">
							<motion.div
								className="h-px bg-primary"
								animate={{ width: isHovered ? 20 : 10 }}
								transition={{ duration: 0.4 }}
							/>
							<p className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/80 dark:text-primary/60">
								{member.role}
							</p>
						</div>

						{/* Bio reveal on hover */}
						<AnimatePresence>
							{isHovered && (
								<motion.p
									initial={{ opacity: 0, y: 8, height: 0 }}
									animate={{ opacity: 1, y: 0, height: "auto" }}
									exit={{ opacity: 0, y: 8, height: 0 }}
									transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
									className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground"
								>
									{member.bio}
								</motion.p>
							)}
						</AnimatePresence>

						{/* Social links */}
						<motion.div
							className="mt-2 flex items-center gap-2"
							animate={{
								opacity: isHovered ? 1 : 0,
								y: isHovered ? 0 : 8,
							}}
							transition={{ duration: 0.3, delay: isHovered ? 0.08 : 0 }}
						>
							{member.linkedin && (
								<Link
									href={member.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className={cn(
										"inline-flex size-7 items-center justify-center border border-foreground/20",
										"text-foreground/60 transition-all duration-300",
										"hover:border-primary/50 hover:bg-primary/10 hover:text-primary",
									)}
									aria-label={`${member.name} LinkedIn`}
								>
									<Linkedin className="size-3" />
								</Link>
							)}
							{member.github && (
								<Link
									href={member.github}
									target="_blank"
									rel="noopener noreferrer"
									className={cn(
										"inline-flex size-7 items-center justify-center border border-foreground/20",
										"text-foreground/60 transition-all duration-300",
										"hover:border-primary/50 hover:bg-primary/10 hover:text-primary",
									)}
									aria-label={`${member.name} GitHub`}
								>
									<Github className="size-3" />
								</Link>
							)}
						</motion.div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export function TeamSection({
	title,
	titleFaded,
	members,
}: {
	title: string;
	titleFaded: string;
	members: TeamMemberCard[];
}) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

	return (
		<section id="team" className="py-24 sm:py-32" ref={sectionRef}>
			<div className="mx-auto max-w-7xl px-4 sm:px-6">
				{/* Heading with scramble animation */}
				<motion.div
					initial={{ opacity: 0, y: 60 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
					transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
					className="overflow-hidden"
				>
					<HyperText
						as="h2"
						startOnView
						animateOnHover
						duration={1000}
						className="text-4xl font-black uppercase tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
					>
						{title}
					</HyperText>
					<span className="mt-1 block text-4xl font-black uppercase tracking-tighter text-muted-foreground/30 sm:text-5xl md:text-6xl lg:text-7xl">
						{titleFaded}
					</span>
				</motion.div>

				{/* Animated divider */}
				<motion.div
					className="mt-4 h-px origin-start bg-primary/50"
					initial={{ scaleX: 0 }}
					animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
					transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
				/>

				{/* Team grid */}
				<div className="mt-14 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4 sm:mt-16">
					{members.map((member, index) => (
						<MemberCard key={member.id} member={member} index={index} isInView={isInView} />
					))}
				</div>
			</div>
		</section>
	);
}

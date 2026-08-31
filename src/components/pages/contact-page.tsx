import { Mail, MapPin, Clock } from "lucide-react";
import { Link } from "@/components/link";
import { cn } from "@/lib/utils";
import { NoirPageHero } from "@/components/noir/noir-page-hero";
import { BlurFade } from "@/components/ui/blur-fade";
import { WavesContainer } from "@/components/contact/waves-container";
import { ContactForm, type ContactFormLabels } from "@/components/contact/contact-form";

export interface ContactPageProps {
	pageTitle: string;
	pageSubtitle: string;
	email: string;
	emailNote: string;
	location: string;
	locationNote: string;
	hours: string;
	hoursNote: string;
	note: string;
	noteLinkLabel: string;
	noteLinkUrl: string;
	formTitle: string;
	formSubtitle: string;
}

const formLabels: ContactFormLabels = {
	nameLabel: "Name",
	namePlaceholder: "John Doe",
	emailLabel: "Email",
	emailPlaceholder: "john@example.com",
	subjectLabel: "Subject",
	subjectPlaceholder: "How can we help?",
	messageLabel: "Message",
	messagePlaceholder: "Tell us more about your question or project...",
	submitButton: "Send Message",
	submittingButton: "Sending...",
	submitError: "Something went wrong. Please try again.",
	successTitle: "Message sent!",
	successMessage: "Thank you for reaching out. We'll get back to you within 24 hours.",
	sendAnotherButton: "Send another message",
};

/** Port of the Next.js `contact/page.tsx` (map replaced by the waves canvas only — no Leaflet). */
export function ContactPage({ data: m }: { data: ContactPageProps }) {
	const contactInfo = [
		{ icon: Mail, value: m.email, description: m.emailNote, href: m.email ? `mailto:${m.email}` : undefined },
		{ icon: MapPin, value: m.location, description: m.locationNote },
		{ icon: Clock, value: m.hours, description: m.hoursNote },
	].filter((i) => i.value);

	return (
		<>
			{/* Hero */}
			<NoirPageHero title={m.pageTitle} subtitle={m.pageSubtitle} decrypt={false} backHref="/" backLabel="Back to Home" />

			{/* Waves playground */}
			<section className="relative overflow-hidden">
				<div className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 sm:pb-32">
					<BlurFade delay={0.5} inView>
						<WavesContainer />
					</BlurFade>
				</div>
			</section>

			{/* Content */}
			<section className="relative overflow-hidden">
				{/* Gradient divider */}
				<div className="h-px bg-linear-to-r from-transparent via-border/40 to-transparent dark:via-border/20" aria-hidden="true" />

				<div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
					<div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
						{/* Contact info */}
						<div className="lg:col-span-2 space-y-6">
							{contactInfo.map((item, index) => (
								<BlurFade key={item.value} delay={0.1 + index * 0.08} inView>
									<div
										className={cn(
											"group relative overflow-hidden rounded-sm",
											"border border-border/40 dark:border-border/20",
											"bg-card/50 backdrop-blur-sm",
											"p-5 transition-all duration-500",
											"hover:border-primary/30 dark:hover:border-primary/20",
										)}
									>
										{/* Gradient accent line on hover */}
										<div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:via-primary/30" />

										<div className="mb-3 inline-flex size-10 items-center justify-center rounded-sm bg-primary/10 dark:bg-primary/5">
											<item.icon className="h-5 w-5 text-primary/80 dark:text-primary/60" />
										</div>
										<p className="text-sm font-bold tracking-wide text-foreground">
											{item.href ? (
												<a href={item.href} className="transition-colors hover:text-primary">
													{item.value}
												</a>
											) : (
												item.value
											)}
										</p>
										<p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
									</div>
								</BlurFade>
							))}

							{m.note && (
								<BlurFade delay={0.35} inView>
									<div className="pt-2">
										<p className="text-sm text-muted-foreground/70 leading-relaxed dark:text-muted-foreground/50">
											{m.note}{" "}
											{m.noteLinkLabel && (
												<Link href={m.noteLinkUrl} className="text-foreground/80 transition-colors hover:text-primary">
													{m.noteLinkLabel}
												</Link>
											)}
											.
										</p>
									</div>
								</BlurFade>
							)}
						</div>

						{/* Contact form */}
						<div className="lg:col-span-3">
							<BlurFade delay={0.2} inView>
								<div
									className={cn(
										"rounded-sm border border-border/40 dark:border-border/20",
										"bg-card/50 backdrop-blur-sm",
										"p-6 sm:p-8",
									)}
								>
									<h2 className="text-xl font-bold tracking-wide text-foreground sm:text-2xl">{m.formTitle}</h2>
									<p className="mt-1 text-sm text-muted-foreground/70 mb-8 dark:text-muted-foreground/50">{m.formSubtitle}</p>
									<ContactForm labels={formLabels} />
								</div>
							</BlurFade>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

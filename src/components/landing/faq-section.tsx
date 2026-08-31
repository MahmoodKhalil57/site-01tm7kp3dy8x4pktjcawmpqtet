import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BlurFade } from "@/components/ui/blur-fade";

export interface FaqItem {
	id: string;
	question: string;
	answer: string;
}

export function FaqSection({ title, subtitle, faqs }: { title: string; subtitle: string; faqs: FaqItem[] }) {
	const midpoint = Math.ceil(faqs.length / 2);
	const leftColumn = faqs.slice(0, midpoint);
	const rightColumn = faqs.slice(midpoint);

	return (
		<section id="faq" className="relative py-24 sm:py-32">
			{/* Subtle top gradient separator */}
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border/40 to-transparent dark:via-border/20"
				aria-hidden="true"
			/>

			<div className="mx-auto max-w-7xl px-4 sm:px-6">
				<BlurFade delay={0.1} inView>
					<div className="mb-16">
						<h2 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
							{title}
						</h2>
						<p className="mt-4 text-sm text-muted-foreground sm:text-base">{subtitle}</p>
					</div>
				</BlurFade>

				<div className="grid grid-cols-1 gap-x-12 gap-y-0 md:grid-cols-2">
					<BlurFade delay={0.2} inView>
						<Accordion type="multiple">
							{leftColumn.map((faq) => (
								<AccordionItem key={faq.id} value={`left-${faq.id}`}>
									<AccordionTrigger className="text-start text-base font-semibold tracking-wide text-foreground hover:no-underline">
										{faq.question}
									</AccordionTrigger>
									<AccordionContent className="text-sm leading-relaxed text-muted-foreground">
										{faq.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</BlurFade>

					<BlurFade delay={0.3} inView>
						<Accordion type="multiple">
							{rightColumn.map((faq) => (
								<AccordionItem key={faq.id} value={`right-${faq.id}`}>
									<AccordionTrigger className="text-start text-base font-semibold tracking-wide text-foreground hover:no-underline">
										{faq.question}
									</AccordionTrigger>
									<AccordionContent className="text-sm leading-relaxed text-muted-foreground">
										{faq.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</BlurFade>
				</div>
			</div>
		</section>
	);
}

/** Two-column accordion without the section chrome — used by the /faq page. */
export function FaqList({ faqs }: { faqs: FaqItem[] }) {
	const midpoint = Math.ceil(faqs.length / 2);
	const leftColumn = faqs.slice(0, midpoint);
	const rightColumn = faqs.slice(midpoint);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
			<Accordion type="multiple">
				{leftColumn.map((faq) => (
					<AccordionItem key={faq.id} value={`left-${faq.id}`}>
						<AccordionTrigger className="text-left hover:no-underline text-foreground">{faq.question}</AccordionTrigger>
						<AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<Accordion type="multiple">
				{rightColumn.map((faq) => (
					<AccordionItem key={faq.id} value={`right-${faq.id}`}>
						<AccordionTrigger className="text-left hover:no-underline text-foreground">{faq.question}</AccordionTrigger>
						<AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}

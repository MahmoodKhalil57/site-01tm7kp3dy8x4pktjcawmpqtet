/**
 * Typed loaders over the CMS collections this site renders. Every collection
 * is git-backed (content/<collection>/<slug>.json); the shapes mirror
 * seed/collections/*.json. Loaders never throw — a missing entry yields
 * `null` / `[]` so a fresh site still builds.
 */
import { getEmDashCollection, getEmDashEntry } from "@premium-cms/emdash";

type Data = Record<string, unknown>;

/** Field slugs are snake_case in the CMS; the loaders read them by camelCase name. */
const snake = (k: string) => k.replace(/[A-Z]/g, (c) => "_" + c.toLowerCase());
const get = (d: Data, k: string): unknown => (k in d ? d[k] : d[snake(k)]);

const str = (d: Data, k: string, fallback = ""): string => {
	const v = get(d, k);
	return typeof v === "string" ? v : v == null ? fallback : String(v);
};
const num = (d: Data, k: string, fallback = 0): number => {
	const v = get(d, k);
	const n = typeof v === "number" ? v : Number(v);
	return Number.isFinite(n) ? n : fallback;
};
const bool = (d: Data, k: string): boolean => {
	const v = get(d, k);
	return v === true || v === 1 || v === "1" || v === "true";
};
/** "one per line" text fields → string[] */
const lines = (d: Data, k: string): string[] => {
	const v = get(d, k);
	if (Array.isArray(v)) return v.map(String).filter(Boolean);
	return str(d, k)
		.split(/\r?\n/)
		.map((s) => s.trim())
		.filter(Boolean);
};
/** repeater fields → object[] (stored as JSON text by the snapshot loader) */
const rows = (d: Data, k: string): Data[] => {
	let v = get(d, k);
	if (typeof v === "string") {
		try {
			v = JSON.parse(v);
		} catch {
			return [];
		}
	}
	return Array.isArray(v) ? (v.filter((r) => r && typeof r === "object") as Data[]) : [];
};

async function entryData(collection: string, slug: string): Promise<Data | null> {
	try {
		const { entry } = await getEmDashEntry(collection, slug);
		return (entry?.data as Data | undefined) ?? null;
	} catch {
		return null;
	}
}

interface Row {
	slug: string;
	data: Data;
	publishedAt?: string | null;
	updatedAt?: string | null;
}

async function collectionRows(collection: string): Promise<Row[]> {
	try {
		const { entries } = await getEmDashCollection(collection, { status: "published", limit: 500 });
		return (entries ?? []).map((e: any) => ({
			slug: String(e.slug ?? e.id ?? ""),
			data: (e.data ?? {}) as Data,
			publishedAt: (e.data?.publish_date as string | undefined) || e.publishedAt || null,
			updatedAt: e.updatedAt ?? null,
		}));
	} catch {
		return [];
	}
}

const byOrder = (a: Row, b: Row) => num(a.data, "order", 9999) - num(b.data, "order", 9999);

// ─── Home ───────────────────────────────────────────────────────────────
export async function getHome() {
	const d = await entryData("home", "home");
	if (!d) return null;
	return {
		metaTitle: str(d, "metaTitle"),
		metaDescription: str(d, "metaDescription"),
		hero: {
			tagline: str(d, "heroTagline"),
			title: str(d, "heroTitle"),
			titleFaded: str(d, "heroTitleFaded"),
			description: str(d, "heroDescription"),
			primaryCta: str(d, "heroPrimaryCta", "Start Your Project"),
			primaryCtaHref: str(d, "heroPrimaryCtaUrl", "/contact"),
			secondaryCta: str(d, "heroSecondaryCta", "View Our Work"),
			secondaryCtaHref: str(d, "heroSecondaryCtaUrl", "/portfolio"),
		},
		marquee: lines(d, "marquee"),
		servicesTitle: str(d, "servicesTitle"),
		servicesTitleFaded: str(d, "servicesTitleFaded"),
		services: rows(d, "services").map((r) => ({ icon: str(r, "icon"), title: str(r, "title"), description: str(r, "description") })),
		stats: rows(d, "stats").map((r) => ({ value: num(r, "value"), suffix: str(r, "suffix"), label: str(r, "label"), static: bool(r, "static") })),
		portfolioTitle: str(d, "portfolioTitle"),
		portfolioTitleFaded: str(d, "portfolioTitleFaded"),
		portfolioViewAll: str(d, "portfolioViewAll", "View All Projects"),
		engagementTitle: str(d, "engagementTitle"),
		engagementTitleFaded: str(d, "engagementTitleFaded"),
		engagementSubtitle: str(d, "engagementSubtitle"),
		engagementModels: rows(d, "engagementModels").map((r) => ({
			icon: str(r, "icon"),
			name: str(r, "name"),
			description: str(r, "description"),
			bestForLabel: str(r, "bestForLabel", "Best for"),
			bestFor: str(r, "bestFor"),
			features: lines(r, "features"),
			cta: str(r, "cta", "Get in touch"),
			ctaHref: str(r, "ctaUrl", "/contact"),
			featured: bool(r, "featured"),
		})),
		teamTitle: str(d, "teamTitle"),
		teamTitleFaded: str(d, "teamTitleFaded"),
		testimonialsTitle: str(d, "testimonialsTitle"),
		testimonialsTitleFaded: str(d, "testimonialsTitleFaded"),
		faqTitle: str(d, "faqTitle"),
		faqSubtitle: str(d, "faqSubtitle"),
		cta: {
			title: str(d, "ctaTitle"),
			titleFaded: str(d, "ctaTitleFaded"),
			button: str(d, "ctaButton", "Get in Touch"),
			buttonHref: str(d, "ctaUrl", "/contact"),
			footnote: str(d, "ctaFootnote"),
		},
	};
}

// ─── About ──────────────────────────────────────────────────────────────
export async function getAbout() {
	const d = await entryData("about", "about");
	if (!d) return null;
	return {
		metaTitle: str(d, "metaTitle"),
		metaDescription: str(d, "metaDescription"),
		pageTitle: str(d, "pageTitle"),
		pageSubtitle: str(d, "pageSubtitle"),
		missionTitle: str(d, "missionTitle"),
		missionDescription: str(d, "missionDescription"),
		stats: rows(d, "stats").map((r) => ({ value: str(r, "value"), label: str(r, "label") })),
		valuesTitle: str(d, "valuesTitle"),
		values: rows(d, "values").map((r) => ({ icon: str(r, "icon"), title: str(r, "title"), description: str(r, "description") })),
		teamTitle: str(d, "teamTitle"),
		teamSubtitle: str(d, "teamSubtitle"),
		timelineTitle: str(d, "timelineTitle"),
		timeline: rows(d, "timeline").map((r) => ({ year: str(r, "year"), description: str(r, "description") })),
		ctaTitle: str(d, "ctaTitle"),
		ctaDescription: str(d, "ctaDescription"),
		ctaButton: str(d, "ctaButton", "Get in touch"),
		ctaHref: str(d, "ctaUrl", "/contact"),
	};
}

// ─── Contact ────────────────────────────────────────────────────────────
export async function getContact() {
	const d = await entryData("contact", "contact");
	if (!d) return null;
	return {
		metaTitle: str(d, "metaTitle"),
		metaDescription: str(d, "metaDescription"),
		pageTitle: str(d, "pageTitle"),
		pageSubtitle: str(d, "pageSubtitle"),
		email: str(d, "email"),
		emailNote: str(d, "emailNote"),
		location: str(d, "location"),
		locationNote: str(d, "locationNote"),
		hours: str(d, "hours"),
		hoursNote: str(d, "hoursNote"),
		note: str(d, "note"),
		noteLinkLabel: str(d, "noteLinkLabel"),
		noteLinkUrl: str(d, "noteLinkUrl", "/faq"),
		formTitle: str(d, "formTitle"),
		formSubtitle: str(d, "formSubtitle"),
	};
}

// ─── Team ───────────────────────────────────────────────────────────────
export interface TeamMember {
	id: string;
	name: string;
	role: string;
	department: string;
	bio: string;
	fullBio: string;
	experience: string;
	image: string;
	imagePosition: string;
	location: string;
	joinDate: string;
	skills: string[];
	linkedin: string | null;
	github: string | null;
	homePage: boolean;
}

export async function getTeam(): Promise<TeamMember[]> {
	const list = await collectionRows("team");
	return list.sort(byOrder).map(({ slug, data: d }) => ({
		id: slug,
		name: str(d, "title"),
		role: str(d, "role"),
		department: str(d, "department"),
		bio: str(d, "bio"),
		fullBio: str(d, "fullBio"),
		experience: str(d, "experience"),
		image: str(d, "image"),
		imagePosition: str(d, "imagePosition", "50% 50%"),
		location: str(d, "location"),
		joinDate: str(d, "joinDate"),
		skills: lines(d, "skills"),
		linkedin: str(d, "linkedin") || null,
		github: str(d, "github") || null,
		homePage: bool(d, "homePage"),
	}));
}

// ─── Projects ───────────────────────────────────────────────────────────
export interface Project {
	id: number;
	slug: string;
	title: string;
	subtitle: string;
	description: string;
	fullDescription: string;
	image: string;
	url: string;
	tags: string[];
	region: string;
	country: string;
	industry: string;
	year: string;
	duration: string;
	teamSize: string;
	technologies: string[];
	features: string[];
	results: string[];
	homePage: boolean;
}

export async function getProjects(): Promise<Project[]> {
	const list = await collectionRows("projects");
	return list.sort(byOrder).map(({ slug, data: d }, i) => ({
		id: i + 1,
		slug,
		title: str(d, "title"),
		subtitle: str(d, "subtitle"),
		description: str(d, "description"),
		fullDescription: str(d, "fullDescription"),
		image: str(d, "image"),
		url: str(d, "url", "#"),
		tags: lines(d, "tags"),
		region: str(d, "region"),
		country: str(d, "country"),
		industry: str(d, "industry"),
		year: str(d, "year"),
		duration: str(d, "duration"),
		teamSize: str(d, "teamSize"),
		technologies: lines(d, "technologies"),
		features: lines(d, "features"),
		results: lines(d, "results"),
		homePage: bool(d, "homePage"),
	}));
}

// ─── Testimonials ───────────────────────────────────────────────────────
export async function getTestimonials() {
	const list = await collectionRows("testimonials");
	return list.sort(byOrder).map(({ data: d }) => ({ name: str(d, "title"), company: str(d, "company"), quote: str(d, "quote") }));
}

// ─── FAQ ────────────────────────────────────────────────────────────────
export async function getFaqs() {
	const list = await collectionRows("faq");
	return list
		.filter(({ data }) => get(data, "isActive") === undefined || bool(data, "isActive"))
		.sort(byOrder)
		.map(({ slug, data: d }) => ({ id: slug, question: str(d, "title"), answer: str(d, "answer") }));
}

// ─── Blog posts ─────────────────────────────────────────────────────────
export interface Post {
	slug: string;
	title: string;
	excerpt: string;
	coverImage: string | null;
	coverImageAlt: string;
	content: unknown[];
	author: string;
	category: string;
	tags: string[];
	publishedAt: string | null;
	updatedAt: string | null;
	/** publishedAt is in the future — listed as "coming soon", not linkable */
	upcoming: boolean;
}

function toPost({ slug, data: d, updatedAt, publishedAt: entryPublishedAt }: Row, now: string): Post {
	// `publish_date` is the editor-set date (may be in the future → "coming soon");
	// it falls back to the entry's own publish timestamp.
	const publishedAt = str(d, "publishDate") || entryPublishedAt || null;
	let content = d.content;
	if (typeof content === "string") {
		try {
			content = JSON.parse(content);
		} catch {
			content = [];
		}
	}
	return {
		slug,
		title: str(d, "title"),
		excerpt: str(d, "excerpt"),
		coverImage: str(d, "coverImage") || null,
		coverImageAlt: str(d, "coverImageAlt"),
		content: Array.isArray(content) ? content : [],
		author: str(d, "author"),
		category: str(d, "category", "engineering"),
		tags: lines(d, "tags"),
		publishedAt,
		updatedAt: updatedAt ?? null,
		upcoming: !!publishedAt && publishedAt > now,
	};
}

/** Live posts newest first, plus (at the front) the next upcoming one. */
export async function getPosts(): Promise<Post[]> {
	const now = new Date().toISOString();
	const posts = (await collectionRows("posts")).map((r) => toPost(r, now));
	const live = posts.filter((p) => !p.upcoming).sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
	const upcoming = posts.filter((p) => p.upcoming).sort((a, b) => (a.publishedAt ?? "").localeCompare(b.publishedAt ?? ""));
	return upcoming[0] ? [upcoming[0], ...live] : live;
}

/** Only posts whose date has passed, newest first (for routes + prev/next). */
export async function getLivePosts(): Promise<Post[]> {
	return (await getPosts()).filter((p) => !p.upcoming);
}

/** The post published right after `post`, or the next upcoming one. */
export function nextPost(posts: Post[], post: Post): Post | null {
	const later = posts
		.filter((p) => p.slug !== post.slug && (p.publishedAt ?? "") > (post.publishedAt ?? ""))
		.sort((a, b) => (a.publishedAt ?? "").localeCompare(b.publishedAt ?? ""));
	return later[0] ?? null;
}

export const CATEGORY_LABELS: Record<string, string> = {
	engineering: "Engineering",
	product: "Product",
	company: "Company",
	tutorial: "Tutorial",
	announcement: "Announcement",
};

export function categoryLabel(category: string): string {
	return CATEGORY_LABELS[category] ?? category;
}

// ─── Long-form pages ────────────────────────────────────────────────────
export async function getPage(slug: string) {
	const d = await entryData("pages", slug);
	if (!d) return null;
	let content = d.content;
	if (typeof content === "string") {
		try {
			content = JSON.parse(content);
		} catch {
			content = [];
		}
	}
	return {
		title: str(d, "title"),
		lastUpdated: str(d, "lastUpdated"),
		description: str(d, "description"),
		content: Array.isArray(content) ? content : [],
	};
}

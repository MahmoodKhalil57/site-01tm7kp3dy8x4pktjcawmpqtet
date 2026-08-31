import {
	Brain,
	Cloud,
	Code,
	Eye,
	Globe,
	Heart,
	Layers,
	Lightbulb,
	Palette,
	RefreshCw,
	Rocket,
	Shield,
	ShieldCheck,
	ShoppingCart,
	Smartphone,
	Sparkles,
	Star,
	Users,
	Zap,
	type LucideIcon,
} from "lucide-react";

/**
 * Icons editors can pick in the admin (the `icon` select fields of the
 * home/about collections). Keep this list in sync with
 * seed/collections/{home,about}.json `validation.options`.
 */
export const ICONS: Record<string, LucideIcon> = {
	Code,
	Smartphone,
	Brain,
	ShoppingCart,
	Cloud,
	Palette,
	Layers,
	RefreshCw,
	Users,
	Lightbulb,
	ShieldCheck,
	Eye,
	Heart,
	Globe,
	Rocket,
	Shield,
	Sparkles,
	Star,
	Zap,
};

export const ICON_NAMES = Object.keys(ICONS);

export function iconFor(name: string | undefined | null): LucideIcon {
	return (name && ICONS[name]) || Sparkles;
}

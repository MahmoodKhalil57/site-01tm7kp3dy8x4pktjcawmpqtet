import type { AnchorHTMLAttributes } from "react";

/**
 * Drop-in replacement for the Next.js <Link> used by the ported components:
 * a plain anchor. The static site has no client router, so full navigations
 * are the intended behaviour.
 */
export function Link({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
	return <a href={href} {...props} />;
}

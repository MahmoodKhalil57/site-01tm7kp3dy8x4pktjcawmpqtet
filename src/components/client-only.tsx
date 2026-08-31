import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders children only after mount — the replacement for Next's
 * `dynamic(..., { ssr: false })` around the WebGL backgrounds, which touch
 * `window`/`document` at import time.
 */
export function ClientOnly({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	return <>{mounted ? children : fallback}</>;
}

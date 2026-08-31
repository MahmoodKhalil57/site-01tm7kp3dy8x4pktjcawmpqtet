import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "./button";

interface DarkModeToggleProps extends React.ComponentPropsWithoutRef<"button"> {
	duration?: number;
	initialMode?: string;
}

/**
 * Animated light/dark toggle (view-transition circle reveal). The choice is
 * stored in the `theme` cookie + localStorage and mirrored on
 * `<html data-theme>`, which the layout's inline script applies before
 * first paint.
 */
export const DarkModeToggle = ({ className, duration = 400, initialMode, ...props }: DarkModeToggleProps) => {
	const [isDark, setIsDark] = useState(initialMode === "dark");
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const updateMode = () => {
			setIsDark(document.documentElement.dataset.theme === "dark");
		};

		updateMode();

		const observer = new MutationObserver(updateMode);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});

		return () => observer.disconnect();
	}, []);

	const toggleDarkMode = useCallback(async () => {
		if (!buttonRef.current) return;

		const apply = () => {
			flushSync(() => {
				const newMode = !isDark;
				setIsDark(newMode);
				const modeValue = newMode ? "dark" : "light";
				document.documentElement.dataset.theme = modeValue;
				try {
					localStorage.setItem("theme", modeValue);
				} catch {}
				const secure = location.protocol === "https:" ? "; Secure" : "";
				document.cookie = `theme=${modeValue}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax${secure}`;
			});
		};

		if (!document.startViewTransition) {
			apply();
			return;
		}

		await document.startViewTransition(apply).ready;

		const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
		const x = left + width / 2;
		const y = top + height / 2;
		const maxRadius = Math.hypot(
			Math.max(left, window.innerWidth - left),
			Math.max(top, window.innerHeight - top),
		);

		document.documentElement.animate(
			{
				clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
			},
			{
				duration,
				easing: "ease-in-out",
				pseudoElement: "::view-transition-new(root)",
			},
		);
	}, [isDark, duration]);

	return (
		<Button ref={buttonRef} onClick={toggleDarkMode} className={cn(className)} variant="ghost" {...props}>
			{isDark ? <Sun /> : <Moon />}
			<span className="sr-only">Toggle dark mode</span>
		</Button>
	);
};

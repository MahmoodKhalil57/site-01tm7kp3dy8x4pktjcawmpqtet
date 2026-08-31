import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
	src: string;
	alt: string;
	/** Mirrors next/image's `fill`: the image covers its positioned parent. */
	fill?: boolean;
	priority?: boolean;
}

/** Plain <img> standing in for next/image in the ported components. */
export function Image({ src, alt, fill, priority, className, sizes: _sizes, ...props }: ImageProps) {
	return (
		<img
			src={src}
			alt={alt}
			loading={priority ? "eager" : "lazy"}
			decoding="async"
			className={cn(fill && "absolute inset-0 h-full w-full", className)}
			{...props}
		/>
	);
}

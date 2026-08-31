"use client";

import {
  Component,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ErrorInfo,
} from "react";

let cachedWebGL: boolean | undefined;

function detectWebGL(): boolean {
  if (cachedWebGL !== undefined) return cachedWebGL;
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!gl) {
      cachedWebGL = false;
      return false;
    }
    (gl as WebGLRenderingContext)
      .getExtension("WEBGL_lose_context")
      ?.loseContext();
    cachedWebGL = true;
    return true;
  } catch {
    cachedWebGL = false;
    return false;
  }
}

const subscribeNoop = (): (() => void) => () => {};
const getWebGL = (): boolean => detectWebGL();
const getServerFalse = (): boolean => false;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}
function getReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(): { hasError: true } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[WebGLBoundary] WebGL render failed:", error, info);
    }
  }

  render(): ReactNode {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export function WebGLBoundary({
  children,
  fallback = null,
  rootMargin = "200px",
}: {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
}) {
  const supported = useSyncExternalStore(
    subscribeNoop,
    getWebGL,
    getServerFalse,
  );
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerFalse,
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const hasIntersectionObserver = typeof IntersectionObserver !== "undefined";

  useEffect(() => {
    const node = containerRef.current;
    if (!node || !supported || reducedMotion || !hasIntersectionObserver) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [supported, reducedMotion, hasIntersectionObserver, rootMargin]);

  const inView = hasIntersectionObserver ? visible : true;
  const shouldRender = supported && !reducedMotion && inView;

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      {shouldRender ? (
        <WebGLErrorBoundary fallback={fallback}>{children}</WebGLErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}

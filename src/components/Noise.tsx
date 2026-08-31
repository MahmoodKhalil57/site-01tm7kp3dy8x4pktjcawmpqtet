import React, { useRef, useEffect } from "react";

interface NoiseProps {
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number;
  /** Use percentage sizing (100%) to fill a positioned parent instead of 100vw/100vh */
  fill?: boolean;
}

const Noise: React.FC<NoiseProps> = ({
  patternSize = 250,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 2,
  patternAlpha = 15,
  fill = false,
}) => {
  const grainRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    let animationId = 0;
    let running = false;

    const canvasSize = 1024;

    const resize = () => {
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      canvas.style.width = fill ? "100%" : "100vw";
      canvas.style.height = fill ? "100%" : "100vh";
    };

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        drawGrain();
      }
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      animationId = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      if (animationId) {
        window.cancelAnimationFrame(animationId);
        animationId = 0;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    window.addEventListener("resize", resize);
    resize();
    drawGrain();

    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener("resize", resize);
      };
    }

    document.addEventListener("visibilitychange", handleVisibility);
    if (!document.hidden) start();

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      stop();
    };
  }, [
    patternSize,
    patternScaleX,
    patternScaleY,
    patternRefreshInterval,
    patternAlpha,
    fill,
  ]);

  return (
    <canvas
      className={
        fill
          ? "pointer-events-none absolute inset-0 h-full w-full"
          : "pointer-events-none absolute top-0 start-0 h-screen w-screen"
      }
      ref={grainRef}
      style={{
        imageRendering: "pixelated",
      }}
    />
  );
};

export default Noise;

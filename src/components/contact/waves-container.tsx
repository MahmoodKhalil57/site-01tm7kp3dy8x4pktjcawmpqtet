"use client";

import Waves from "@/components/Waves";

export function WavesContainer() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-sm border border-border/40 dark:border-border/20 sm:h-80">
      <Waves
        backgroundColor="transparent"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
        className="opacity-30 dark:opacity-20"
      />
    </div>
  );
}

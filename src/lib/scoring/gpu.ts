import { lookupGpu } from "@/lib/detection/hardware-db";
import type { GameRequirement } from "@/types/game";

export function scoreGpu(
  userGpu: string | null,
  userVram: number | null,
  req: GameRequirement
): number {
  if (!userGpu || !req.gpuMin) return 50;

  const userPerf = lookupGpu(userGpu);
  const reqPerf = lookupGpu(req.gpuMin);

  if (!userPerf || !reqPerf) return 50;

  const ratio = userPerf / reqPerf;
  let perfScore: number;

  if (ratio >= 1.5) perfScore = 100;
  else if (ratio >= 1.2) perfScore = 90;
  else if (ratio >= 1.0) perfScore = 80;
  else if (ratio >= 0.85) perfScore = 65;
  else if (ratio >= 0.7) perfScore = 50;
  else if (ratio >= 0.55) perfScore = 35;
  else if (ratio >= 0.4) perfScore = 20;
  else perfScore = 10;

  // VRAM penalty: if user VRAM < required, apply a multiplier
  if (userVram && req.gpuVramMinGb && userVram < req.gpuVramMinGb) {
    const vramRatio = userVram / req.gpuVramMinGb;
    const vramPenalty = Math.max(0.5, vramRatio); // 50%-100% of perf score
    perfScore = Math.round(perfScore * vramPenalty);
  }

  return Math.min(100, Math.max(0, perfScore));
}

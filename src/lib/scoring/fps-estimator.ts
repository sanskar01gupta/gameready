import { lookupGpu } from "@/lib/detection/hardware-db";
import type { HardwareInfo, FpsMatrix, FpsEstimate, Resolution, Quality } from "@/types/analysis";
import type { GameRequirement } from "@/types/game";

const RESOLUTION_FACTOR: Record<Resolution, number> = {
  "1080p": 1.0,
  "1440p": 0.6,
  "4k": 0.35,
};

const QUALITY_FACTOR: Record<Quality, number> = {
  low: 1.0,
  medium: 0.75,
  high: 0.55,
  ultra: 0.35,
};

const VRAM_BUDGETS: Record<Resolution, Record<Quality, number>> = {
  "1080p": { low: 2, medium: 3, high: 4, ultra: 6 },
  "1440p": { low: 3, medium: 4, high: 6, ultra: 8 },
  "4k": { low: 4, medium: 6, high: 8, ultra: 12 },
};

function fpsToLabel(fps: number): FpsEstimate["label"] {
  if (fps >= 60) return "Smooth";
  if (fps >= 30) return "Playable";
  if (fps >= 15) return "Choppy";
  return "Unplayable";
}

function roundTo5(n: number): number {
  return Math.max(0, Math.round(n / 5) * 5);
}

function calcVramPenalty(userVram: number | null, resolution: Resolution, quality: Quality): number {
  if (!userVram) return 1.0;
  const needed = VRAM_BUDGETS[resolution]?.[quality] ?? 4;
  if (userVram >= needed) return 1.0;
  const ratio = userVram / needed;
  return Math.max(0.6, ratio);
}

export function estimateFps(
  hardware: HardwareInfo,
  requirements: {
    minimum: GameRequirement | null;
    recommended: GameRequirement | null;
  },
  cpuScore: number,
  gpuScore: number
): FpsMatrix {
  const gpuPerf = hardware.gpu ? lookupGpu(hardware.gpu) ?? null : null;
  const refGpuPerf =
    requirements.minimum?.gpuMin
      ? lookupGpu(requirements.minimum.gpuMin) ?? null
      : null;

  if (!gpuPerf || !refGpuPerf) {
    return buildUnknownMatrix();
  }

  const gpuRatio = gpuPerf / refGpuPerf;
  const baseFpsAtMinSpec = 30;

  // CPU bottleneck factor
  const cpuBottleneck = cpuScore < gpuScore - 20 ? 0.85 : 1.0;

  const matrix = {} as FpsMatrix;
  const resolutions: Resolution[] = ["1080p", "1440p", "4k"];
  const qualities: Quality[] = ["low", "medium", "high", "ultra"];

  for (const res of resolutions) {
    const resData = {} as Record<Quality, FpsEstimate>;
    for (const qual of qualities) {
      const rawFps =
        baseFpsAtMinSpec *
        gpuRatio *
        RESOLUTION_FACTOR[res] *
        QUALITY_FACTOR[qual] *
        cpuBottleneck;

      const vramPenalty = calcVramPenalty(hardware.gpuVramGb, res, qual);
      const adjustedFps = rawFps * vramPenalty;

      const avg = roundTo5(adjustedFps);
      resData[qual] = {
        avg,
        min: roundTo5(adjustedFps * 0.7),
        confidence: hardware.gpu ? "medium" : "low",
        label: fpsToLabel(avg),
      };
    }
    matrix[res] = resData;
  }

  return matrix;
}

function buildUnknownMatrix(): FpsMatrix {
  const unknown: FpsEstimate = {
    avg: 0,
    min: null,
    confidence: "low",
    label: "Unplayable",
  };

  const resData = { low: unknown, medium: unknown, high: unknown, ultra: unknown };
  return { "1080p": { ...resData }, "1440p": { ...resData }, "4k": { ...resData } };
}

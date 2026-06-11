import type { FpsEstimate, Resolution, Quality } from "./analysis";

export interface Report {
  id: string;
  gameId: string;
  shareSlug: string;
  cpuDetected: string | null;
  cpuManual: string | null;
  cpuNormalized: string | null;
  gpuDetected: string | null;
  gpuManual: string | null;
  gpuNormalized: string | null;
  gpuVramGb: number | null;
  ramGb: number;
  detectionMethod: "auto" | "manual" | "mixed" | null;
  overallScore: number | null;
  cpuScore: number | null;
  gpuScore: number | null;
  ramScore: number | null;
  storageScore: number | null;
  osScore: number | null;
  fps1080pLow: number | null;
  fps1080pMedium: number | null;
  fps1080pHigh: number | null;
  fps1080pUltra: number | null;
  fps1440pLow: number | null;
  fps1440pMedium: number | null;
  fps1440pHigh: number | null;
  fps1440pUltra: number | null;
  fps4kLow: number | null;
  fps4kMedium: number | null;
  fps4kHigh: number | null;
  fps4kUltra: number | null;
  bottleneckComponent: string | null;
  bottleneckSeverity: string | null;
  viewerCount: number | null;
  createdAt: string | null;
  lastViewed: string | null;
}

export interface ReportWithGame extends Report {
  game: {
    slug: string;
    title: string;
    coverImageUrl: string | null;
    developer: string | null;
  };
}

export function fpsFromReport(
  report: Report
): Record<Resolution, Record<Quality, FpsEstimate>> {
  const makeEstimate = (
    avg: number | null,
    label: FpsEstimate["label"] = "Playable"
  ): FpsEstimate => ({
    avg: avg ?? 0,
    min: avg ? Math.round(avg * 0.7) : null,
    confidence: "medium",
    label,
  });

  const fpsToLabel = (fps: number): FpsEstimate["label"] => {
    if (fps >= 60) return "Smooth";
    if (fps >= 30) return "Playable";
    if (fps >= 15) return "Choppy";
    return "Unplayable";
  };

  return {
    "1080p": {
      low: makeEstimate(report.fps1080pLow, fpsToLabel(report.fps1080pLow ?? 0)),
      medium: makeEstimate(report.fps1080pMedium, fpsToLabel(report.fps1080pMedium ?? 0)),
      high: makeEstimate(report.fps1080pHigh, fpsToLabel(report.fps1080pHigh ?? 0)),
      ultra: makeEstimate(report.fps1080pUltra, fpsToLabel(report.fps1080pUltra ?? 0)),
    },
    "1440p": {
      low: makeEstimate(report.fps1440pLow, fpsToLabel(report.fps1440pLow ?? 0)),
      medium: makeEstimate(report.fps1440pMedium, fpsToLabel(report.fps1440pMedium ?? 0)),
      high: makeEstimate(report.fps1440pHigh, fpsToLabel(report.fps1440pHigh ?? 0)),
      ultra: makeEstimate(report.fps1440pUltra, fpsToLabel(report.fps1440pUltra ?? 0)),
    },
    "4k": {
      low: makeEstimate(report.fps4kLow, fpsToLabel(report.fps4kLow ?? 0)),
      medium: makeEstimate(report.fps4kMedium, fpsToLabel(report.fps4kMedium ?? 0)),
      high: makeEstimate(report.fps4kHigh, fpsToLabel(report.fps4kHigh ?? 0)),
      ultra: makeEstimate(report.fps4kUltra, fpsToLabel(report.fps4kUltra ?? 0)),
    },
  };
}

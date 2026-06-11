export interface HardwareInfo {
  cpu: string | null;
  gpu: string | null;
  gpuVramGb: number | null;
  ramGb: number;
  os: string | null;
  detectionMethod: "auto" | "manual" | "mixed";
}

export interface ComponentScores {
  cpu: number;
  gpu: number;
  ram: number;
  storage: number;
  os: number;
}

export interface CompatibilityResult {
  scores: ComponentScores;
  overall: number;
  tier: "excellent" | "good" | "fair" | "poor" | "insufficient";
  matchedTier: "ultra" | "recommended" | "minimum" | "insufficient";
}

export interface FpsEstimate {
  avg: number;
  min: number | null;
  confidence: "high" | "medium" | "low";
  label: "Smooth" | "Playable" | "Choppy" | "Unplayable";
}

export type Resolution = "1080p" | "1440p" | "4k";
export type Quality = "low" | "medium" | "high" | "ultra";

export type FpsMatrix = Record<Resolution, Record<Quality, FpsEstimate>>;

export interface BottleneckInfo {
  component: "cpu" | "gpu" | "ram" | "storage" | null;
  severity: "minor" | "moderate" | "severe" | null;
  description: string;
}

export interface UpgradeSuggestion {
  component: "cpu" | "gpu" | "ram" | "storage";
  current: string;
  recommended: string;
  improvementPercent: number;
  reason: string;
}

export interface AnalysisResult {
  game: {
    slug: string;
    title: string;
    coverImageUrl: string | null;
  };
  hardware: HardwareInfo;
  scores: ComponentScores;
  overall: number;
  tier: CompatibilityResult["tier"];
  matchedTier: CompatibilityResult["matchedTier"];
  fps: FpsMatrix;
  bottleneck: BottleneckInfo;
  upgrades: UpgradeSuggestion[];
}

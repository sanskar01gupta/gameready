import { scoreCpu } from "./cpu";
import { scoreGpu } from "./gpu";
import { scoreRam } from "./ram";
import type { GameRequirement, RequirementTier } from "@/types/game";
import type { ComponentScores, CompatibilityResult, HardwareInfo } from "@/types/analysis";

const WEIGHTS = {
  gpu: 0.35,
  cpu: 0.30,
  ram: 0.20,
  storage: 0.10,
  os: 0.05,
} as const;

function weightedOverall(scores: ComponentScores): number {
  const weighted =
    scores.cpu * WEIGHTS.cpu +
    scores.gpu * WEIGHTS.gpu +
    scores.ram * WEIGHTS.ram +
    scores.storage * WEIGHTS.storage +
    scores.os * WEIGHTS.os;

  // Weak-link penalty: if any component is severely lacking,
  // the overall cannot exceed that component's score + 25
  const minScore = Math.min(scores.cpu, scores.gpu, scores.ram, scores.storage);
  const capped = minScore < 30 ? Math.min(weighted, minScore + 25) : weighted;

  return Math.round(Math.max(0, Math.min(100, capped)));
}

function scoreToTier(score: number): CompatibilityResult["tier"] {
  if (score >= 90) return "excellent";
  if (score >= 70) return "good";
  if (score >= 50) return "fair";
  if (score >= 30) return "poor";
  return "insufficient";
}

export function compatibility(
  hardware: HardwareInfo,
  requirements: {
    minimum: GameRequirement | null;
    recommended: GameRequirement | null;
    ultra: GameRequirement | null;
  }
): CompatibilityResult {
  const tiers: RequirementTier[] = ["ultra", "recommended", "minimum"];
  let bestTier: CompatibilityResult["matchedTier"] = "insufficient";
  let bestScores: ComponentScores | null = null;
  let bestOverall = 0;

  for (const tier of tiers) {
    const req = requirements[tier];
    if (!req) continue;

    const scores: ComponentScores = {
      cpu: scoreCpu(hardware.cpu, req),
      gpu: scoreGpu(hardware.gpu, hardware.gpuVramGb, req),
      ram: scoreRam(hardware.ramGb, req),
      storage: 100, // Simplified for now
      os: 100, // Simplified for now
    };

    const overall = weightedOverall(scores);

    // Must clear minimum threshold for this tier
    const threshold = tier === "ultra" ? 70 : tier === "recommended" ? 50 : 30;
    const passes = Object.values(scores).every((s) => s >= threshold);

    if (passes && overall > bestOverall) {
      bestTier = tier;
      bestScores = scores;
      bestOverall = overall;
    }
  }

  // If no tier passed, compute against minimum anyway
  if (!bestScores) {
    const req = requirements.minimum;
    if (req) {
      bestScores = {
        cpu: scoreCpu(hardware.cpu, req),
        gpu: scoreGpu(hardware.gpu, hardware.gpuVramGb, req),
        ram: scoreRam(hardware.ramGb, req),
        storage: 100,
        os: 100,
      };
      bestOverall = weightedOverall(bestScores);
    } else {
      bestScores = { cpu: 50, gpu: 50, ram: 50, storage: 50, os: 50 };
      bestOverall = 50;
    }
    bestTier = "insufficient";
  }

  return {
    scores: bestScores,
    overall: bestOverall,
    tier: scoreToTier(bestOverall),
    matchedTier: bestTier,
  };
}

import type { ComponentScores, UpgradeSuggestion, HardwareInfo } from "@/types/analysis";
import type { GameRequirement } from "@/types/game";
import { lookupCpu, lookupGpu } from "@/lib/detection/hardware-db";

export function suggestUpgrades(
  hardware: HardwareInfo,
  scores: ComponentScores,
  requirements: {
    minimum: GameRequirement | null;
    recommended: GameRequirement | null;
  }
): UpgradeSuggestion[] {
  const suggestions: UpgradeSuggestion[] = [];
  const rec = requirements.recommended ?? requirements.minimum;
  if (!rec) return suggestions;

  // CPU upgrade
  if (scores.cpu < 70 && hardware.cpu && rec.cpuMin) {
    const userPerf = lookupCpu(hardware.cpu);
    const recPerf = lookupCpu(rec.cpuMin);
    const improvement =
      userPerf && recPerf ? Math.round(((recPerf - userPerf) / userPerf) * 100) : 25;

    suggestions.push({
      component: "cpu",
      current: hardware.cpu,
      recommended: rec.cpuRecommended ?? rec.cpuMin,
      improvementPercent: Math.max(10, improvement),
      reason:
        scores.cpu < 40
          ? "Your CPU is significantly below the recommended spec."
          : "A CPU upgrade would improve overall system balance.",
    });
  }

  // GPU upgrade
  if (scores.gpu < 70 && hardware.gpu && rec.gpuMin) {
    const userPerf = lookupGpu(hardware.gpu);
    const recPerf = lookupGpu(rec.gpuMin);
    const improvement =
      userPerf && recPerf ? Math.round(((recPerf - userPerf) / userPerf) * 100) : 30;

    suggestions.push({
      component: "gpu",
      current: hardware.gpu,
      recommended: rec.gpuRecommended ?? rec.gpuMin,
      improvementPercent: Math.max(10, improvement),
      reason:
        scores.gpu < 40
          ? "Your GPU is the main factor limiting gaming performance."
          : "Upgrading your GPU will deliver higher frame rates and better visual quality.",
    });
  }

  // RAM upgrade
  if (scores.ram < 70 && rec.ramMinGb > hardware.ramGb) {
    const improvement = Math.round(
      ((rec.ramMinGb - hardware.ramGb) / hardware.ramGb) * 100
    );
    suggestions.push({
      component: "ram",
      current: `${hardware.ramGb}GB`,
      recommended: `${rec.ramRecommendedGb ?? rec.ramMinGb}GB`,
      improvementPercent: Math.max(10, Math.min(50, improvement)),
      reason:
        "More RAM will reduce stuttering and allow smoother multitasking while gaming.",
    });
  }

  return suggestions;
}

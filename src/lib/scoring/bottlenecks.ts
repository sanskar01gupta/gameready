import type { ComponentScores, BottleneckInfo } from "@/types/analysis";

export function findBottleneck(scores: ComponentScores): BottleneckInfo {
  const components = [
    { key: "cpu" as const, score: scores.cpu, label: "Processor (CPU)" },
    { key: "gpu" as const, score: scores.gpu, label: "Graphics Card (GPU)" },
    { key: "ram" as const, score: scores.ram, label: "Memory (RAM)" },
    { key: "storage" as const, score: scores.storage, label: "Storage" },
  ];

  const sorted = [...components].sort((a, b) => a.score - b.score);
  const weakest = sorted[0];
  const secondWeakest = sorted[1];
  const strongest = sorted[sorted.length - 1];

  const gap = secondWeakest.score - weakest.score;
  const overallGap = strongest.score - weakest.score;

  if (overallGap < 15) {
    return {
      component: null,
      severity: null,
      description:
        "Your system is well-balanced! All components are performing at similar levels.",
    };
  }

  let severity: BottleneckInfo["severity"];
  if (gap >= 30) severity = "severe";
  else if (gap >= 15) severity = "moderate";
  else severity = "minor";

  const descriptions: Record<string, string> = {
    cpu: `Your ${weakest.label} is the limiting factor. Upgrading it would provide the biggest performance improvement for gaming.`,
    gpu: `Your ${weakest.label} is holding back your gaming performance. A GPU upgrade would give you the most noticeable FPS improvement.`,
    ram: `Your ${weakest.label} is the bottleneck. Adding more RAM or upgrading to faster memory could improve overall system responsiveness.`,
    storage: `Your ${weakest.label} is the weakest component. Consider upgrading to a larger or faster drive.`,
  };

  return {
    component: weakest.key,
    severity,
    description: descriptions[weakest.key],
  };
}

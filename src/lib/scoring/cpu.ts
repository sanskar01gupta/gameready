import { lookupCpu } from "@/lib/detection/hardware-db";
import type { GameRequirement } from "@/types/game";

export function scoreCpu(userCpu: string | null, req: GameRequirement): number {
  if (!userCpu || !req.cpuMin) return 50; // Unknown = neutral

  const userPerf = lookupCpu(userCpu);
  const reqPerf = lookupCpu(req.cpuMin);

  if (!userPerf || !reqPerf) return 50;

  const ratio = userPerf / reqPerf;

  if (ratio >= 1.5) return 100;
  if (ratio >= 1.2) return 90;
  if (ratio >= 1.0) return 80;
  if (ratio >= 0.85) return 65;
  if (ratio >= 0.7) return 50;
  if (ratio >= 0.55) return 35;
  if (ratio >= 0.4) return 20;
  return 10;
}

import type { GameRequirement } from "@/types/game";

export function scoreRam(userRamGb: number, req: GameRequirement): number {
  const required = req.ramMinGb;
  if (userRamGb >= required * 2) return 100;
  if (userRamGb >= required * 1.5) return 90;
  if (userRamGb >= required * 1.25) return 85;
  if (userRamGb >= required) return 75;
  if (userRamGb >= required * 0.75) return 50;
  if (userRamGb >= required * 0.5) return 30;
  return 10;
}

import { Cpu, Monitor, MemoryStick, HardDrive, MonitorCheck } from "lucide-react";
import type { ComponentScores } from "@/types/analysis";

interface RequirementBarsProps {
  scores: ComponentScores;
}

const COMPONENTS = [
  { key: "gpu" as const, label: "GPU", icon: Monitor, weight: "35%" },
  { key: "cpu" as const, label: "CPU", icon: Cpu, weight: "30%" },
  { key: "ram" as const, label: "RAM", icon: MemoryStick, weight: "20%" },
  { key: "storage" as const, label: "Storage", icon: HardDrive, weight: "10%" },
  { key: "os" as const, label: "OS", icon: MonitorCheck, weight: "5%" },
];

function scoreColor(score: number): string {
  if (score >= 90) return "bg-[var(--success)]";
  if (score >= 70) return "bg-[#65A30D]";
  if (score >= 50) return "bg-[var(--warning)]";
  if (score >= 30) return "bg-[#EA580C]";
  return "bg-[var(--danger)]";
}

export function RequirementBars({ scores }: RequirementBarsProps) {
  return (
    <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
      {COMPONENTS.map(({ key, label, icon: Icon, weight }) => (
        <div key={key} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-[var(--muted-foreground)]" />
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs text-[var(--muted-foreground)]">
                ({weight})
              </span>
            </div>
            <span className="text-sm font-semibold tabular-nums">
              {scores[key]}%
            </span>
          </div>
          <div
            className="h-2 rounded-full bg-[var(--border)] overflow-hidden"
            role="progressbar"
            aria-valuenow={scores[key]}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${label} score: ${scores[key]}%`}
          >
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${scoreColor(scores[key])}`}
              style={{ width: `${scores[key]}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

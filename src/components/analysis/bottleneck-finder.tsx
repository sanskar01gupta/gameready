import { AlertTriangle, Cpu, Monitor, MemoryStick, HardDrive } from "lucide-react";
import type { BottleneckInfo } from "@/types/analysis";

interface BottleneckFinderProps {
  bottleneck: BottleneckInfo;
}

const COMPONENT_ICONS: Record<string, React.FC<{ className?: string }>> = {
  cpu: Cpu,
  gpu: Monitor,
  ram: MemoryStick,
  storage: HardDrive,
};

const SEVERITY_COLORS: Record<string, string> = {
  minor: "border-[var(--warning)]/30 bg-[var(--warning)]/5",
  moderate: "border-[#EA580C]/30 bg-[#EA580C]/5",
  severe: "border-[var(--danger)]/30 bg-[var(--danger)]/5",
};

export function BottleneckFinder({ bottleneck }: BottleneckFinderProps) {
  if (!bottleneck.component) {
    return (
      <div className="rounded-xl border border-[var(--success)]/30 bg-[var(--success)]/5 p-4">
        <p className="text-sm text-[var(--muted)]">{bottleneck.description}</p>
      </div>
    );
  }

  const Icon = COMPONENT_ICONS[bottleneck.component] ?? AlertTriangle;
  const severityClass = SEVERITY_COLORS[bottleneck.severity ?? "minor"];

  return (
    <div className={`rounded-xl border p-4 ${severityClass}`}>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-[var(--background)]">
          <Icon className="h-5 w-5 text-[var(--warning)]" />
        </div>
        <div>
          <p className="text-sm font-semibold">
            {bottleneck.component.toUpperCase()} Bottleneck
            {bottleneck.severity && (
              <span className="ml-2 text-xs font-normal text-[var(--muted-foreground)] capitalize">
                ({bottleneck.severity})
              </span>
            )}
          </p>
          <p className="text-sm text-[var(--muted)] mt-1">
            {bottleneck.description}
          </p>
        </div>
      </div>
    </div>
  );
}

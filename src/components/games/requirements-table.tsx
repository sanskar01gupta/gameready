import { Cpu, Monitor, HardDrive, MemoryStick } from "lucide-react";
import type { GameRequirement } from "@/types/game";

interface RequirementsTableProps {
  requirements: {
    minimum: GameRequirement | null;
    recommended: GameRequirement | null;
    ultra: GameRequirement | null;
  };
}

export function RequirementsTable({ requirements }: RequirementsTableProps) {
  const tiers = [
    { key: "minimum" as const, label: "Minimum", color: "text-[var(--warning)]", borderColor: "border-[var(--warning)]/30" },
    { key: "recommended" as const, label: "Recommended", color: "text-[var(--success)]", borderColor: "border-[var(--success)]/30" },
    { key: "ultra" as const, label: "Ultra", color: "text-[var(--accent)]", borderColor: "border-[var(--accent)]/30" },
  ];

  const availableTiers = tiers.filter((t) => requirements[t.key]);

  if (availableTiers.length === 0) {
    return (
      <div className="text-center py-8 text-[var(--muted-foreground)]">
        Requirements not available for this game yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {availableTiers.map((tier) => {
        const req = requirements[tier.key]!;
        return (
          <div
            key={tier.key}
            className={`rounded-xl border ${tier.borderColor} bg-[var(--surface)] overflow-hidden`}
          >
            <div className={`px-4 py-3 border-b ${tier.borderColor}`}>
              <span className={`font-semibold text-sm ${tier.color}`}>
                {tier.label} Requirements
              </span>
            </div>
            <div className="p-4 space-y-3">
              <RequirementRow
                icon={<Cpu className="h-4 w-4" />}
                label="CPU"
                value={req.cpuRecommended ?? req.cpuMin ?? "—"}
              />
              <RequirementRow
                icon={<Monitor className="h-4 w-4" />}
                label="GPU"
                value={req.gpuRecommended ?? req.gpuMin ?? "—"}
              />
              <RequirementRow
                icon={<MemoryStick className="h-4 w-4" />}
                label="RAM"
                value={`${req.ramMinGb} GB${req.ramRecommendedGb ? ` (${req.ramRecommendedGb} GB rec.)` : ""}`}
              />
              <RequirementRow
                icon={<HardDrive className="h-4 w-4" />}
                label="Storage"
                value={`${req.storageMinGb ?? "—"} GB${req.storageType ? ` ${req.storageType}` : ""}`}
              />
              {req.osRequired && (
                <RequirementRow
                  icon={<Monitor className="h-4 w-4" />}
                  label="OS"
                  value={req.osRequired}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RequirementRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-[var(--muted-foreground)] shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-[var(--muted-foreground)]">{label}</p>
        <p className="text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  );
}

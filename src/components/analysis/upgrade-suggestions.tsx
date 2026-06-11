import { ArrowUpRight, TrendingUp } from "lucide-react";
import type { UpgradeSuggestion } from "@/types/analysis";

interface UpgradeSuggestionsProps {
  upgrades: UpgradeSuggestion[];
}

export function UpgradeSuggestions({ upgrades }: UpgradeSuggestionsProps) {
  if (upgrades.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--success)]/30 bg-[var(--success)]/5 p-4">
        <p className="text-sm text-[var(--muted)]">
          Your system meets or exceeds the recommended requirements. No upgrades needed!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {upgrades.map((upgrade, i) => (
        <div
          key={i}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold capitalize">
                {upgrade.component} Upgrade
              </p>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                {upgrade.reason}
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs">
                <span className="text-[var(--muted-foreground)]">
                  Current:{" "}
                  <span className="text-[var(--foreground)] font-medium">
                    {upgrade.current}
                  </span>
                </span>
                <ArrowUpRight className="h-3 w-3 text-[var(--muted-foreground)]" />
                <span className="text-[var(--muted-foreground)]">
                  Recommended:{" "}
                  <span className="text-[var(--foreground)] font-medium">
                    {upgrade.recommended}
                  </span>
                </span>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--accent)]/10">
              <TrendingUp className="h-4 w-4 text-[var(--accent)]" />
              <span className="text-sm font-bold text-[var(--accent)]">
                +{upgrade.improvementPercent}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

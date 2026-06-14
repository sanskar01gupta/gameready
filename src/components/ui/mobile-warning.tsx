"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

/**
 * Dismissible warning banner shown to mobile/tablet users on game pages.
 * Warns them that games are designed for desktop PCs, not mobile devices.
 *
 * Dismissed state is stored in sessionStorage — it resets when the tab/browser closes.
 */
export function MobileWarning() {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof sessionStorage === "undefined") return false;
    return sessionStorage.getItem("mobile-warning-dismissed") === "true";
  });

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("mobile-warning-dismissed", "true");
    } catch {
      // sessionStorage may be unavailable
    }
  };

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--warning)]/10 border border-[var(--warning)]/30">
      <AlertTriangle className="h-5 w-5 text-[var(--warning)] shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--warning)]">
          You&apos;re browsing on a mobile device
        </p>
        <p className="text-xs text-[var(--muted-foreground)] mt-1">
          You can configure hardware and check game compatibility below, but
          games are designed for desktop and laptop PCs — not phones or tablets.
        </p>
      </div>
      <button
        onClick={handleDismiss}
        className="shrink-0 p-1 rounded-lg hover:bg-[var(--warning)]/10 transition-colors"
        aria-label="Dismiss mobile warning"
      >
        <X className="h-4 w-4 text-[var(--muted-foreground)]" />
      </button>
    </div>
  );
}

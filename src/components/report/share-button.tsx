"use client";

import { useState } from "react";
import { Share2, Check, Loader2 } from "lucide-react";

interface ShareButtonProps {
  gameSlug: string;
  cpu: string | null;
  gpu: string | null;
  gpuVramGb: number | null;
  ramGb: number;
  detectionMethod: "auto" | "manual" | "mixed";
}

export function ShareButton({
  gameSlug,
  cpu,
  gpu,
  gpuVramGb,
  ramGb,
  detectionMethod,
}: ShareButtonProps) {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  async function handleShare() {
    if (shareUrl) {
      copyToClipboard(shareUrl);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameSlug,
          cpu,
          gpu,
          gpuVramGb,
          ramGb,
          detectionMethod,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const url = `${window.location.origin}${data.shareUrl}`;
        setShareUrl(url);
        copyToClipboard(url);
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <button
      onClick={handleShare}
      disabled={loading}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm font-medium hover:border-[var(--accent)]/50 hover:bg-[var(--surface-hover)] transition-all disabled:opacity-50"
      aria-label={copied ? "Link copied" : "Share this report"}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : copied ? (
        <Check className="h-4 w-4 text-[var(--success)]" />
      ) : (
        <Share2 className="h-4 w-4" />
      )}
      {copied ? "Copied!" : "Share Report"}
    </button>
  );
}

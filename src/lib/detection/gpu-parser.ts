/**
 * Parses the raw WebGL GPU renderer string into vendor + model.
 *
 * Typical raw strings from browsers:
 *   Chrome:  "ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Direct3D11 vs_5_0 ps_5_0, D3D11)"
 *   Firefox: "NVIDIA GeForce RTX 3060"
 *   Safari:  "Apple M1 Pro"
 *   Edge:    "ANGLE (Intel, Intel(R) UHD Graphics 630 Direct3D11 vs_5_0 ps_5_0, D3D11)"
 */
export function parseGpuString(raw: string): { vendor: string; model: string } | null {
  if (!raw || raw === "Unknown") return null;

  // Handle ANGLE wrapper (Chromium-based browsers)
  // Format: "ANGLE (vendor, GPU description Direct3D..., backend)"
  const angleMatch = raw.match(/^ANGLE\s*\((.+)\)$/);
  if (angleMatch) {
    const inner = angleMatch[1];
    // Split by comma, but be careful of commas in GPU names
    const parts = inner.split(",").map((p) => p.trim());

    if (parts.length >= 2) {
      const vendor = parts[0];
      // The GPU name is usually the second part, but strip Direct3D/OpenGL cruft
      let model = parts.slice(1).join(" ").trim();

      // Remove backend info in last parens
      model = model.replace(/\s*\([^)]*\)$/, "").trim();

      // Remove Direct3D / OpenGL / Vulkan references
      model = model
        .replace(/\s*Direct3D\d+\s*(vs_\d+_\d+\s*)?(ps_\d+_\d+\s*)?/i, "")
        .replace(/\s*OpenGL\s*(ES\s*)?[\d.]+\s*/i, "")
        .replace(/\s*Vulkan\s*[\d.]+\s*/i, "")
        .replace(/\s*D3D\d+\s*/i, "")
        .trim();

      // Remove trailing commas or leftover fragments
      model = model.replace(/,\s*$/, "").trim();

      if (model) {
        return { vendor: normalizeVendor(vendor), model };
      }
    }
  }

  // Direct GPU string (Firefox, Safari)
  return { vendor: detectVendor(raw), model: raw };
}

function normalizeVendor(vendor: string): string {
  const lower = vendor.toLowerCase();
  if (lower.includes("nvidia")) return "NVIDIA";
  if (lower.includes("amd") || lower.includes("ati")) return "AMD";
  if (lower.includes("intel")) return "Intel";
  if (lower.includes("apple")) return "Apple";
  if (lower.includes("qualcomm")) return "Qualcomm";
  return vendor;
}

function detectVendor(raw: string): string {
  const lower = raw.toLowerCase();
  if (lower.includes("nvidia") || lower.includes("geforce") || lower.includes("rtx") || lower.includes("gtx")) return "NVIDIA";
  if (lower.includes("amd") || lower.includes("radeon") || lower.includes("rx")) return "AMD";
  if (lower.includes("intel") || lower.includes("iris") || lower.includes("uhd")) return "Intel";
  if (lower.includes("apple") || lower.includes("m1") || lower.includes("m2") || lower.includes("m3") || lower.includes("m4")) return "Apple";
  return "Unknown";
}

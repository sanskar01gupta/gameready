/**
 * Browser hardware detection utilities.
 * All functions are client-side only — never call these on the server.
 */

export interface DetectedHardware {
  cpuCores: number | null;
  gpuRaw: string | null;
  ramGb: number | null;
  os: string | null;
  screenResolution: string | null;
}

/**
 * Detect CPU logical core count via navigator.hardwareConcurrency.
 * Available in all modern browsers.
 */
export function detectCpuCores(): number | null {
  if (typeof navigator === "undefined") return null;
  const cores = navigator.hardwareConcurrency;
  return cores && cores > 0 ? cores : null;
}

/**
 * Detect GPU model via WebGL renderer info.
 * Creates a hidden canvas, gets WebGL context, reads the renderer string.
 * Returns the raw GPU string (needs parsing via gpu-parser.ts).
 */
export function detectGpu(): string | null {
  if (typeof document === "undefined") return null;

  try {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;

    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return null;

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) return null;

    const renderer = (gl as WebGLRenderingContext & { getParameter(p: number): string }).getParameter(
      debugInfo.UNMASKED_RENDERER_WEBGL
    );

    return renderer ?? null;
  } catch {
    return null;
  }
}

/**
 * Detect system RAM via navigator.deviceMemory (Chromium-only).
 * Returns RAM in GB. Values are typically: 0.25, 0.5, 1, 2, 4, 8, 16, 32
 */
export function detectRam(): number | null {
  if (typeof navigator === "undefined") return null;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return mem && mem > 0 ? mem : null;
}

/**
 * Detect OS from user agent string.
 */
export function detectOS(): string {
  if (typeof navigator === "undefined") return "Unknown";

  const ua = navigator.userAgent;
  if (ua.includes("Windows NT 11") || ua.includes("Windows 11")) return "Windows 11";
  if (ua.includes("Windows NT 10") || ua.includes("Windows 10")) return "Windows 10";
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS X") || ua.includes("macOS")) return "macOS";
  if (ua.includes("Linux") && !ua.includes("Android")) return "Linux";
  if (ua.includes("Android")) return "Android";
  return "Unknown";
}

/**
 * Detect screen resolution.
 */
export function detectScreenResolution(): string {
  if (typeof screen === "undefined") return "Unknown";
  return `${screen.width}×${screen.height}`;
}

/**
 * Run all hardware detections. Returns whatever was found.
 * Some values may be null if the browser doesn't support the API.
 */
export function detectAll(): DetectedHardware {
  return {
    cpuCores: detectCpuCores(),
    gpuRaw: detectGpu(),
    ramGb: detectRam(),
    os: detectOS(),
    screenResolution: detectScreenResolution(),
  };
}

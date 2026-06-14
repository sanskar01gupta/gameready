import { headers } from "next/headers";

/**
 * Server-side mobile device detection from the User-Agent header.
 * Returns true for phones and tablets, false for desktop/laptop.
 *
 * This runs on the server so there's no client-side flicker.
 */
export async function isMobileDevice(): Promise<boolean> {
  try {
    const headersList = await headers();
    const ua = headersList.get("user-agent") || "";

    // Match common mobile/tablet user agent patterns
    const mobileRegex =
      /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i;

    // Exclude iPadOS 13+ which pretends to be desktop Safari
    // (iPadOS 13+ has "Macintosh" in UA but also "AppleWebKit" and no "Mac" platform)
    const isIpadDesktop =
      /Macintosh/i.test(ua) &&
      /AppleWebKit/i.test(ua) &&
      !/Mac\s*OS\s*X/i.test(ua);

    return mobileRegex.test(ua) || isIpadDesktop;
  } catch {
    // If headers() fails (e.g. edge runtime without support), default to false
    return false;
  }
}

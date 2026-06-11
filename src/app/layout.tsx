import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GameReady — Can Your PC Run Any Game?",
    template: "%s | GameReady",
  },
  description:
    "Instantly check if your PC can run any game. Get compatibility reports, FPS estimates, bottleneck analysis, and upgrade suggestions. Fast, free, and accurate.",
  keywords: [
    "PC game compatibility",
    "can I run it",
    "system requirements",
    "FPS estimate",
    "game requirements checker",
    "PC gaming",
    "hardware check",
  ],
  openGraph: {
    title: "GameReady — Can Your PC Run Any Game?",
    description:
      "Instantly check if your PC can run any game. Get compatibility reports, FPS estimates, and upgrade suggestions.",
    url: "https://gameready.app",
    siteName: "GameReady",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GameReady — Can Your PC Run Any Game?",
    description: "Instant compatibility reports and FPS estimates for any game.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

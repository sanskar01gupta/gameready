import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getGameBySlug } from "@/lib/db/queries";
import { RequirementsTable } from "@/components/games/requirements-table";
import { isMobileDevice } from "@/lib/utils/device-detect";

export const dynamic = "force-dynamic";
import { HardwareForm } from "@/components/detection/hardware-form";
import { ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return { title: "Game Not Found | GameReady" };

  const title = `Can I Run ${game.title}? System Requirements & Compatibility | GameReady`;
  const description = game.description
    ? `${game.description.slice(0, 155)} Check ${game.title} PC requirements — minimum and recommended specs for CPU, GPU, RAM, and storage.`
    : `Check if your PC can run ${game.title}. Compare system requirements against your hardware. Minimum and recommended specs for CPU, GPU, RAM, and storage.`;

  return {
    title,
    description,
    openGraph: {
      title: `Can I Run ${game.title}? | GameReady`,
      description,
      images: game.coverImageUrl ? [{ url: game.coverImageUrl, width: 600, height: 900 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `Can I Run ${game.title}?`,
      description,
    },
    alternates: { canonical: `https://gameready.app/games/${game.slug}` },
  };
}

export default async function GameDetailPage({ params }: Props) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  const isMobile = await isMobileDevice();

  if (!game) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-[var(--muted-foreground)]" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/games" className="hover:text-[var(--foreground)] transition-colors">
          Games
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)]">{game.title}</span>
      </nav>

      {/* Hero */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        {game.coverImageUrl && (
          <div className="shrink-0">
            <img
              src={game.coverImageUrl}
              alt={game.title}
              className="w-32 h-44 sm:w-40 sm:h-56 rounded-xl object-cover border border-[var(--border)]"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Can I Run {game.title}?
          </h1>
          {game.developer && (
            <p className="mt-2 text-sm text-[var(--muted)]">
              By {game.developer}
              {game.publisher && game.publisher !== game.developer
                ? ` • Published by ${game.publisher}`
                : ""}
            </p>
          )}
          {game.releaseDate && (
            <p className="text-sm text-[var(--muted-foreground)]">
              Released: {game.releaseDate}
            </p>
          )}
          {game.genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {game.genres.map((g) => (
                <span
                  key={g}
                  className="px-2.5 py-0.5 rounded-full text-xs bg-[var(--surface-hover)] text-[var(--muted)] border border-[var(--border)]"
                >
                  {g}
                </span>
              ))}
            </div>
          )}
          {game.description && (
            <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
              {game.description}
            </p>
          )}
        </div>
      </div>

      {/* System Requirements */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">System Requirements</h2>
        <RequirementsTable requirements={game.requirements} />
      </section>

      {/* Compatibility Checker */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-[var(--accent)]/10">
            <ArrowRight className="h-5 w-5 text-[var(--accent)]" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Check Your PC Compatibility</h2>
            <p className="text-sm text-[var(--muted)]">
              Enter your hardware specs below to see if you can run {game.title}
            </p>
          </div>
        </div>

        <HardwareForm gameSlug={game.slug} gameTitle={game.title} isMobile={isMobile} />
      </section>
    </div>
  );
}

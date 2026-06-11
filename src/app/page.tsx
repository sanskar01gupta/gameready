import { HeroSection } from "@/components/home/hero-section";
import { FAQ } from "@/components/home/faq";
import { TrendingGames } from "@/components/home/trending-games";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Trending Games Section */}
      <section className="py-16 sm:py-24 border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">Trending Games</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Popular games people are checking right now
            </p>
          </div>
          <TrendingGames />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-[var(--border)]">
        <FAQ />
      </section>

      {/* CTA Banner */}
      <section className="border-t border-[var(--border)] py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Check Your PC?
          </h2>
          <p className="text-[var(--muted)] mb-8 max-w-xl mx-auto">
            Search for any game above and get an instant compatibility report.
            No signup required.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--muted)]">
            🔍 Search any game in the bar above to get started
          </div>
        </div>
      </section>
    </>
  );
}

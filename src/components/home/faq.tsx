"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How accurate is the compatibility check?",
    a: "GameReady compares your hardware specifications against the official system requirements published by game developers. We use a weighted scoring model based on real-world gaming benchmarks. While we aim for high accuracy, actual performance may vary based on drivers, background processes, and specific game optimization.",
  },
  {
    q: "What if my PC can't be auto-detected?",
    a: "Browser auto-detection is limited — it can detect CPU cores, approximate RAM, and sometimes the GPU. If auto-detection doesn't work on your browser, you can manually enter your CPU, GPU, and RAM specs. This is actually the most accurate method!",
  },
  {
    q: "What do the FPS estimates mean?",
    a: "FPS (Frames Per Second) estimates show approximate performance at different resolutions and quality settings. 'Smooth' (60+ FPS) is ideal for most games, 'Playable' (30-60 FPS) is acceptable, 'Choppy' (15-30 FPS) may be frustrating, and 'Unplayable' (< 15 FPS) means the game will struggle.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account needed! GameReady is completely free and doesn't require registration. You can check compatibility for any game instantly. Shareable reports are generated with unique links that anyone can view.",
  },
  {
    q: "How often are game requirements updated?",
    a: "We update our database regularly with new game releases and requirement changes. If a game updates its system requirements, we reflect those changes as quickly as possible.",
  },
  {
    q: "Can I check games on my phone for my PC?",
    a: "Absolutely! GameReady is fully mobile-responsive. You can search for a game on your phone, manually enter your PC's specs, and get a full compatibility report — perfect for checking before you buy a game.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-24" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="font-medium text-sm pr-4">{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-[var(--muted-foreground)] shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

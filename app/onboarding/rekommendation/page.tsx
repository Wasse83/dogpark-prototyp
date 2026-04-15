"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { getProgramAlternatives, type Program } from "@/lib/mock-data";

/**
 * /onboarding/rekommendation — sista steget.
 * Designsystem v0.3 §14 + §17 (carousel):
 *  - Vi visar rekommendationen först, men användaren kan swipea till 2 alternativ.
 *  - Inga priser här (onboarding handlar om innehåll, inte plånbok; pris kommer i /bli-medlem).
 *  - Version C-metrik: 26px hero, tätt kort-innehåll.
 */

export default function OnboardingStep3() {
  const router = useRouter();
  const [programs, setPrograms] = useState<Program[] | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getProgramAlternatives().then(setPrograms);
  }, []);

  if (!programs) {
    return (
      <div className="h-full flex items-center justify-center">
        <span className="text-sm text-text-muted">Hämtar rekommendation...</span>
      </div>
    );
  }

  const program = programs[index];
  const isRecommended = index === 0;
  const total = programs.length;

  return (
    <div className="h-full flex flex-col">
      <ProgressBar percent={100} className="mx-5 mb-3.5" />

      <div className="px-5 mb-2 flex justify-between items-center">
        <span className="text-[11px] font-bold tracking-wider text-sage-800">
          ✓ ALLT KLART
        </span>
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
          aria-label="Tillbaka"
        >
          <Icon.ChevronRight size={14} className="rotate-180" />
        </button>
      </div>

      <div className="px-5 pt-5 flex-1 flex flex-col stagger">
        <h1 className="font-display text-[24px] leading-[1.2] mb-1">
          Vi tror Luna skulle gilla{" "}
          <em className="text-sage-600 italic">detta</em>.
        </h1>
        <p className="text-[13px] leading-relaxed text-text-muted mb-4">
          Baserat på vad du berättade. Swipea för att se två alternativ till.
        </p>

        {/* Rekommendations-kort */}
        <div
          className={`bg-white rounded-[22px] overflow-hidden mb-3 transition-all duration-200 ${
            isRecommended
              ? "border-[1.5px] border-sage-600"
              : "border border-charcoal-900/[0.08]"
          }`}
        >
          {/* Hero */}
          <div className="h-[110px] bg-sage-400 relative overflow-hidden flex items-end p-3">
            <svg
              viewBox="0 0 200 100"
              className="absolute -right-2.5 -bottom-2.5 w-[130px] h-[100px] opacity-85"
              fill="#3F5A3D"
              aria-hidden="true"
            >
              <ellipse cx={100} cy={80} rx={50} ry={22} />
              <circle cx={70} cy={55} r={28} />
              <ellipse cx={55} cy={38} rx={9} ry={18} transform="rotate(-25 55 38)" />
              <ellipse cx={85} cy={38} rx={9} ry={18} transform="rotate(25 85 38)" />
              <ellipse cx={64} cy={65} rx={11} ry={8} fill="#1A1714" />
              <circle cx={60} cy={50} r={2} fill="#FDFCF9" />
              <circle cx={78} cy={50} r={2} fill="#FDFCF9" />
            </svg>
            <span className="relative z-[2] bg-bone-50 text-sage-800 text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-pill">
              {isRecommended ? "REKOMMENDERAS FÖR ER" : "ETT ALTERNATIV"}
            </span>
          </div>

          <div className="p-3.5">
            <h2 className="font-display text-[20px] leading-tight mb-1">
              {program.name}
            </h2>
            <p className="text-[12px] text-text-muted mb-3">
              {program.description}
            </p>

            <div className="flex gap-4 mb-3">
              <div>
                <p className="text-[10px] text-text-muted font-bold tracking-wide uppercase">
                  Pass
                </p>
                <p className="text-[13px] font-semibold">
                  {program.totalSessions} st
                </p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted font-bold tracking-wide uppercase">
                  Upplägg
                </p>
                <p className="text-[13px] font-semibold">
                  Ett pass/vecka
                </p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted font-bold tracking-wide uppercase">
                  Start
                </p>
                <p className="text-[13px] font-semibold">Tis 22/4</p>
              </div>
            </div>

            {program.whyForYou && (
              <div className="bg-bone-100 rounded-[10px] p-2.5 text-[11px] leading-snug">
                <strong className="text-sage-800">Varför detta?</strong>{" "}
                {program.whyForYou}
              </div>
            )}
          </div>
        </div>

        {/* Carousel-kontroll */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setIndex((i) => (i - 1 + total) % total)}
            className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors disabled:opacity-40"
            aria-label="Föregående alternativ"
            disabled={total < 2}
          >
            <Icon.ChevronRight size={14} className="rotate-180" />
          </button>

          <div
            className="flex items-center gap-1.5"
            role="tablist"
            aria-label="Välj alternativ"
          >
            {programs.map((p, i) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={i === index}
                aria-label={`Visa ${p.name}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-pill transition-all duration-200 ${
                  i === index ? "w-6 bg-sage-600" : "w-1.5 bg-bone-200"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setIndex((i) => (i + 1) % total)}
            className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors disabled:opacity-40"
            aria-label="Nästa alternativ"
            disabled={total < 2}
          >
            <Icon.ChevronRight size={14} />
          </button>
        </div>

        <div className="flex-1" />

        <Button
          fullWidth
          onClick={() => router.push("/")}
          iconRight={<Icon.ArrowRight size={16} strokeWidth={2.5} />}
        >
          {isRecommended ? "Boka första passet" : `Välj ${program.name}`}
        </Button>
      </div>
    </div>
  );
}

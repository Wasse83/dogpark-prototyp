"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import {
  getRecommendedProgram,
  type Program,
} from "@/lib/mock-data";

export default function OnboardingStep3() {
  const router = useRouter();
  const [program, setProgram] = useState<Program | null>(null);

  useEffect(() => {
    getRecommendedProgram().then(setProgram);
  }, []);

  if (!program) {
    return (
      <div className="h-full flex items-center justify-center">
        <span className="text-sm text-text-muted">Hämtar rekommendation...</span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <ProgressBar percent={100} className="mx-5 mb-3.5" />

      <div className="px-5 mb-2 flex justify-between items-center">
        <span className="text-[11px] font-bold tracking-wider text-sage-800">
          ✓ ALLT KLART
        </span>
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center"
          aria-label="Tillbaka"
        >
          <Icon.ChevronRight size={14} className="rotate-180" />
        </button>
      </div>

      <div className="px-5 pt-5 flex-1 flex flex-col stagger">
        <h1 className="font-display text-[26px] leading-[1.2] mb-1.5">
          Vi tror Luna
          <br />
          skulle gilla detta.
        </h1>
        <p className="text-[13px] leading-relaxed text-text-muted mb-5">
          Baserat på vad du berättade. Du kan utforska allt annat sen.
        </p>

        {/* Rekommendations-kort */}
        <div className="bg-white rounded-[22px] overflow-hidden border-[1.5px] border-sage-600 mb-3.5">
          {/* Hero med stiliserad hund */}
          <div className="h-[110px] bg-sage-400 relative overflow-hidden flex items-end p-3">
            <svg
              viewBox="0 0 200 100"
              className="absolute -right-2.5 -bottom-2.5 w-[130px] h-[100px] opacity-85"
              fill="#3F5A3D"
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
              REKOMMENDERAS FÖR ER
            </span>
          </div>

          <div className="p-3.5">
            <h2 className="font-display text-xl leading-tight mb-1">
              {program.name}
            </h2>
            <p className="text-xs text-text-muted mb-3">
              {program.description}
            </p>

            <div className="flex gap-4 mb-3.5">
              <div>
                <p className="text-[10px] text-text-muted font-bold tracking-wide">
                  PASS
                </p>
                <p className="text-sm font-semibold">{program.totalSessions} st</p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted font-bold tracking-wide">
                  PRIS
                </p>
                <p className="text-sm font-semibold">
                  {program.priceSEK.toLocaleString("sv-SE")} kr
                </p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted font-bold tracking-wide">
                  START
                </p>
                <p className="text-sm font-semibold">Tis 22/4</p>
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

        <div className="text-center py-2 text-xs text-sage-600 font-semibold">
          Visa andra alternativ
        </div>

        <div className="flex-1" />

        <Button
          fullWidth
          onClick={() => router.push("/")}
          iconRight={<Icon.ArrowRight size={16} strokeWidth={2.5} />}
        >
          Boka första passet
        </Button>
      </div>
    </div>
  );
}

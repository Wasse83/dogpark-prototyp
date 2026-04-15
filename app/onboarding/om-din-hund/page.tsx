"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

type AgeGroup = "valp" | "ung" | "vuxen" | "senior";
type Experience = "nyborjare" | "har-grunderna" | "specifik-utmaning";

export default function OnboardingStep2() {
  const router = useRouter();
  const [breed, setBreed] = useState("Border collie");
  const [age, setAge] = useState<AgeGroup>("ung");
  const [experience, setExperience] = useState<Experience>("har-grunderna");

  return (
    <div className="h-full flex flex-col">
      <ProgressBar percent={66} className="mx-5 mb-3.5" />

      <div className="px-5 mb-2 flex justify-between items-center">
        <span className="text-[11px] font-bold tracking-wider text-text-muted">
          STEG 2 AV 3
        </span>
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center"
          aria-label="Tillbaka"
        >
          <Icon.ChevronRight size={14} className="rotate-180" />
        </button>
      </div>

      <div className="px-5 pt-6 flex-1 flex flex-col overflow-y-auto stagger">
        <h1 className="font-display text-[26px] leading-[1.15] mb-1.5">
          Berätta om Luna.
        </h1>
        <p className="text-[13px] leading-relaxed text-text-muted mb-5">
          Det här hjälper oss matcha er med rätt pass. Allt kan ändras senare.
        </p>

        {/* Foto */}
        <div className="flex gap-3 items-center mb-[18px]">
          <button
            className="w-16 h-16 rounded-[20px] flex items-center justify-center relative"
            style={{
              background: "linear-gradient(135deg, #C8D4C2, #95A892)",
            }}
            aria-label="Lägg till foto"
          >
            <svg width={28} height={28} viewBox="0 0 24 24" fill="#FDFCF9" aria-hidden>
              <circle cx={9} cy={8} r={1.5} />
              <circle cx={15} cy={8} r={1.5} />
              <ellipse cx={12} cy={13} rx={2} ry={1.5} />
              <path d="M8 16c0 2 2 3 4 3s4-1 4-3" stroke="#FDFCF9" strokeWidth={2} fill="none" />
            </svg>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center border-2 border-bone-50">
              <Icon.Plus size={12} className="text-bone-50" strokeWidth={3} />
            </div>
          </button>
          <div>
            <p className="text-[13px] font-semibold">Lägg till foto</p>
            <p className="text-[11px] text-text-muted">Valfritt, men kul</p>
          </div>
        </div>

        {/* Ras */}
        <div className="mb-3">
          <label className="text-[11px] font-semibold tracking-wide text-text-muted block mb-1.5">
            RAS
          </label>
          <div className="px-4 py-3.5 rounded-[14px] border border-charcoal-900/[0.12] bg-white text-base flex items-center justify-between">
            <span>{breed}</span>
            <Icon.ChevronDown size={14} className="text-text-muted" />
          </div>
        </div>

        {/* Ålder */}
        <div className="mb-3">
          <label className="text-[11px] font-semibold tracking-wide text-text-muted block mb-1.5">
            ÅLDER
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {(["valp", "ung", "vuxen", "senior"] as AgeGroup[]).map((opt) => (
              <button
                key={opt}
                onClick={() => setAge(opt)}
                className={`
                  py-2.5 rounded-xl text-xs text-center capitalize
                  ${
                    age === opt
                      ? "bg-sage-100 border-[1.5px] border-sage-600 text-sage-800 font-semibold"
                      : "bg-white border border-charcoal-900/[0.12] text-text-muted"
                  }
                `}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Erfarenhet */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold tracking-wide text-text-muted block mb-1.5">
            VAR VILL NI BÖRJA?
          </label>
          <div className="flex flex-col gap-1.5">
            {(
              [
                ["nyborjare", "Vi är nybörjare, behöver grunderna"],
                ["har-grunderna", "Hon kan grunderna, vill bygga vidare"],
                ["specifik-utmaning", "Vi har en specifik utmaning"],
              ] as [Experience, string][]
            ).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setExperience(value)}
                className={`
                  p-3 rounded-xl flex items-center gap-2.5 text-left
                  ${
                    experience === value
                      ? "bg-sage-100 border-[1.5px] border-sage-600"
                      : "bg-white border border-charcoal-900/[0.12]"
                  }
                `}
              >
                <span
                  className={`
                    w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${
                      experience === value
                        ? "border-sage-600"
                        : "border-charcoal-900/25"
                    }
                  `}
                >
                  {experience === value && (
                    <span className="w-[9px] h-[9px] rounded-full bg-sage-600" />
                  )}
                </span>
                <span
                  className={`text-[13px] ${
                    experience === value ? "font-semibold" : ""
                  }`}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Button
          fullWidth
          size="md"
          onClick={() => router.push("/onboarding/rekommendation")}
          className="mt-auto"
        >
          Hitta passande pass
        </Button>
      </div>
    </div>
  );
}

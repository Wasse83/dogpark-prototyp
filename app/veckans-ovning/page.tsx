"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import { getWeeklyExercise, type WeeklyExercise } from "@/lib/mock-data";

/**
 * /veckans-ovning — hemmaläxa som bygger på senaste passet.
 * Version C: 24px hero, videoplaceholder, stegvis guide, loggknapp.
 */

export default function VeckansOvningPage() {
  const [exercise, setExercise] = useState<WeeklyExercise | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    getWeeklyExercise().then((e) => {
      setExercise(e);
      setDone(e.doneThisWeek);
    });
  }, []);

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">Veckans övning</p>
      </div>

      <PhoneFrame>
        <div className="h-full overflow-y-auto px-5 pb-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/"
              aria-label="Tillbaka till start"
              className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
            >
              <Icon.ArrowLeft size={18} />
            </Link>
            <span className="text-[11px] font-bold tracking-wider text-text-muted uppercase">
              {exercise?.weekLabel ?? ""}
            </span>
          </div>

          {exercise ? (
            <>
              {/* Hero */}
              <div className="mb-4">
                <h1 className="font-display text-[24px] leading-[1.15]">
                  90 sekunder{" "}
                  <em className="text-sage-600 italic">hemmaläxa</em>
                </h1>
                <p className="text-[13px] text-text-muted mt-1">
                  Bygger på {exercise.buildsOn}
                </p>
              </div>

              {/* Videoplaceholder */}
              <div className="relative rounded-[20px] overflow-hidden bg-charcoal-900 mb-4 aspect-[4/3]">
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div className="w-full h-full bg-gradient-to-br from-sage-700 to-charcoal-900 flex items-center justify-center">
                    <button
                      type="button"
                      aria-label={`Spela upp video, ${exercise.videoLengthSec} sekunder`}
                      className="w-16 h-16 rounded-full bg-bone-50/95 text-charcoal-900 flex items-center justify-center active:scale-[0.97] transition-transform"
                    >
                      <Icon.Play size={28} />
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider text-bone-50 bg-charcoal-900/70 rounded-pill px-2 py-1 uppercase">
                    {exercise.videoLengthSec}s
                  </span>
                  <span className="text-[11px] font-bold tracking-wider text-bone-50 bg-charcoal-900/70 rounded-pill px-2 py-1 uppercase">
                    Nivå: {exercise.difficulty}
                  </span>
                </div>
              </div>

              {/* Titel + mål */}
              <div className="bg-bg-surface rounded-[16px] p-4 mb-4 border border-charcoal-900/[0.04]">
                <p className="text-[11px] font-bold tracking-wider text-sage-800 uppercase mb-1">
                  {exercise.targetSkill}
                </p>
                <p className="text-[15px] font-semibold text-charcoal-900 leading-snug">
                  {exercise.title}
                </p>
                <p className="text-[12px] text-text-muted leading-relaxed mt-2">
                  {exercise.whyItMatters}
                </p>
              </div>

              {/* Stegvis guide */}
              <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-3">
                Så gör ni
              </p>
              <ol className="flex flex-col gap-2 mb-5">
                {exercise.steps.map((step, i) => (
                  <li
                    key={i}
                    className="bg-bg-surface rounded-[14px] p-3 border border-charcoal-900/[0.04] flex gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sage-100 text-sage-800 text-[11px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-[13px] text-charcoal-900 leading-snug">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>

              {/* CTA: logga som gjord */}
              <button
                type="button"
                onClick={() => setDone((d) => !d)}
                aria-pressed={done}
                className={`w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-pill text-[14px] font-semibold transition-transform duration-150 active:scale-[0.97] ${
                  done
                    ? "bg-sage-100 text-sage-800 border border-sage-500/40"
                    : "bg-action-primary text-bone-50"
                }`}
              >
                {done ? (
                  <>
                    <Icon.Check size={16} />
                    Gjort den här veckan
                  </>
                ) : (
                  "Markera som gjord"
                )}
              </button>
              <p className="text-[11px] text-text-muted text-center mt-2">
                Ingen stress. Övningen ligger uppe hela veckan.
              </p>
            </>
          ) : (
            <div className="flex items-center justify-center h-40 text-text-muted text-[13px]">
              Laddar veckans övning…
            </div>
          )}
        </div>

        <BottomNav />
      </PhoneFrame>
    </div>
  );
}

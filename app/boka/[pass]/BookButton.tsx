"use client";

import { useState } from "react";
import Link from "next/link";
import type { GroupSession } from "@/lib/mock-data";

/**
 * Bokningsknapp med 3 states: default, loading, success.
 * Success = full-screen modal (designsystem §6 success-state nivå 3).
 * Voice: "Boka in oss" (varmt, inkluderande) istället för "Boka pass".
 */

type State = "default" | "loading" | "success";

export function BookButton({
  session,
  disabled,
}: {
  session: GroupSession;
  disabled: boolean;
}) {
  const [state, setState] = useState<State>("default");

  function handleBook() {
    if (disabled || state !== "default") return;
    setState("loading");
    // Simulerar nätverksanrop
    setTimeout(() => setState("success"), 900);
  }

  if (state === "success") {
    return <SuccessModal session={session} onClose={() => setState("default")} />;
  }

  return (
    <button
      onClick={handleBook}
      disabled={disabled || state === "loading"}
      className={`w-full flex items-center justify-center h-13 h-[52px] rounded-pill text-[15px] font-semibold transition-all duration-150 ${
        disabled
          ? "bg-bone-200 text-text-muted cursor-not-allowed"
          : "bg-action-primary text-bone-50 active:scale-[0.97] hover:bg-action-primary-hover"
      }`}
      aria-busy={state === "loading"}
    >
      {state === "loading" ? (
        <Spinner />
      ) : disabled ? (
        "Fullbokat"
      ) : (
        `Boka in oss · ${session.priceSEK === 0 ? "ingår" : `${session.priceSEK} kr`}`
      )}
    </button>
  );
}

function Spinner() {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        className="animate-spin"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx={12}
          cy={12}
          r={9}
          stroke="currentColor"
          strokeWidth={2.5}
          strokeOpacity={0.25}
        />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      </svg>
      Bokar...
    </span>
  );
}

function SuccessModal({
  session,
  onClose,
}: {
  session: GroupSession;
  onClose: () => void;
}) {
  const start = new Date(session.startsAt);
  const weekday = start.toLocaleDateString("sv-SE", { weekday: "long" });
  const dayLabel = `${weekday} ${start.getDate()} ${start.toLocaleDateString("sv-SE", { month: "short" }).replace(".", "")}`;
  const timeLabel = start.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="absolute inset-0 bg-bone-50 z-50 flex flex-col items-center justify-center px-8 text-center animate-fade-up"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-success-title"
    >
      {/* Success-cirkel */}
      <div
        className="w-20 h-20 rounded-full bg-sage-500 flex items-center justify-center mb-6"
        aria-hidden="true"
      >
        <svg
          width={40}
          height={40}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-bone-50"
        >
          <path d="M5 12l5 5L20 7" />
        </svg>
      </div>

      <p className="text-[10px] font-bold tracking-wider text-sage-800 uppercase mb-2">
        Bokat
      </p>
      <h2
        id="booking-success-title"
        className="font-display text-[26px] leading-[1.15] mb-3"
      >
        Bokningen är klar,
        <br />
        <em className="text-rose-700 italic">vi ses {dayLabel}</em>
      </h2>
      <p className="text-sm text-text-muted mb-7 max-w-[260px]">
        {session.title} kl {timeLabel} med {session.instructorName}.
        Du får en påminnelse dagen innan.
      </p>

      <div className="flex flex-col gap-2 w-full max-w-[260px]">
        <Link
          href="/mina-bokningar"
          className="flex items-center justify-center h-12 rounded-pill bg-action-primary text-bone-50 text-[15px] font-semibold transition-transform duration-150 active:scale-[0.97]"
        >
          Se mina bokningar
        </Link>
        <button
          onClick={onClose}
          className="flex items-center justify-center h-12 rounded-pill text-[14px] text-text-secondary font-semibold hover:text-charcoal-900 transition-colors"
        >
          Stäng
        </button>
      </div>
    </div>
  );
}

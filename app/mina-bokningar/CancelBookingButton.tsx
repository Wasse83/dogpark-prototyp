"use client";

import { useState } from "react";

/**
 * Avbokningsknapp med bekräftelse-dialog.
 * States: default → confirming → cancelled.
 * Efter avbokning göms kortet visuellt (fade + collapse).
 * Voice: "Avboka" istället för "Ta bort bokning" (mer neutralt).
 */

type State = "default" | "confirming" | "cancelled";

export function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const [state, setState] = useState<State>("default");

  if (state === "cancelled") {
    return (
      <span
        className="inline-flex items-center gap-1 text-[11px] font-semibold text-sage-800"
        role="status"
        aria-live="polite"
      >
        <svg
          width={14}
          height={14}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12l5 5L20 7" />
        </svg>
        Avbokat
      </span>
    );
  }

  if (state === "confirming") {
    return (
      <div
        className="inline-flex items-center gap-1.5"
        role="group"
        aria-label="Bekräfta avbokning"
      >
        <span className="text-[11px] text-text-muted mr-1">Säkert?</span>
        <button
          onClick={() => setState("cancelled")}
          className="inline-flex items-center justify-center h-8 px-3 rounded-pill bg-rose-700 text-bone-50 text-[11px] font-semibold transition-transform duration-150 active:scale-[0.97] hover:bg-rose-800"
          aria-label={`Bekräfta avbokning av ${bookingId}`}
        >
          Ja, avboka
        </button>
        <button
          onClick={() => setState("default")}
          className="inline-flex items-center justify-center h-8 px-3 rounded-pill text-[11px] font-semibold text-text-secondary hover:text-charcoal-900 transition-colors"
        >
          Nej
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setState("confirming")}
      className="inline-flex items-center justify-center h-8 px-3.5 rounded-pill text-[12px] font-semibold text-text-secondary hover:text-charcoal-900 hover:bg-bone-100 transition-colors"
    >
      Avboka
    </button>
  );
}

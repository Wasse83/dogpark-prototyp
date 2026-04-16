/**
 * WeekRhythm — sju dagar Mån–Sön, lugn version av streak.
 * Viloprick istället för rött kryss. Idag får mörkt kort + sage-ring.
 *
 * v0.5 §2.
 */

import { Icon } from "@/components/Icon";
import type { WeekDay } from "@/lib/mock-data";

export function WeekRhythm({ days }: { days: WeekDay[] }) {
  return (
    <ol className="grid grid-cols-7 gap-1.5" aria-label="Veckans rytm">
      {days.map((day, i) => (
        <li key={`${day.weekdayShort}-${i}`}>
          <DayCell day={day} />
        </li>
      ))}
    </ol>
  );
}

function DayCell({ day }: { day: WeekDay }) {
  const isToday = day.status === "idag";

  // Yttre kort
  const cardClass =
    isToday
      ? "bg-charcoal-900 border border-charcoal-900"
      : "bg-bg-surface border border-charcoal-900/[0.04]";

  // Label
  const labelClass = isToday
    ? "text-bone-200"
    : "text-text-muted";

  return (
    <div
      className={`${cardClass} rounded-[14px] py-2.5 px-0 flex flex-col items-center gap-2`}
    >
      <span
        className={`text-[10px] font-bold tracking-wider uppercase ${labelClass}`}
      >
        {day.weekdayShort}
      </span>
      <Circle day={day} />
    </div>
  );
}

function Circle({ day }: { day: WeekDay }) {
  if (day.status === "klar") {
    return (
      <span
        className="w-7 h-7 rounded-full bg-sage-500 text-bone-50 flex items-center justify-center"
        aria-label={`${day.weekdayShort}, klar`}
      >
        <Icon.Check size={14} strokeWidth={3} />
      </span>
    );
  }

  if (day.status === "idag") {
    return (
      <span
        className="w-7 h-7 rounded-full bg-sage-500 text-bone-50 flex items-center justify-center text-[11px] font-semibold"
        style={{ boxShadow: "0 0 0 4px rgba(94,125,83,0.25)" }}
        aria-label={`Idag, pass ${day.sessionNumber ?? ""}`}
      >
        {day.sessionNumber ?? "·"}
      </span>
    );
  }

  if (day.status === "bokad") {
    return (
      <span
        className="w-7 h-7 rounded-full bg-bone-100 text-text-muted flex items-center justify-center text-[11px] font-semibold border border-dashed border-bone-200"
        aria-label={`${day.weekdayShort}, bokat pass ${day.sessionNumber ?? ""}`}
      >
        {day.sessionNumber ?? "·"}
      </span>
    );
  }

  // vila
  return (
    <span
      className="w-7 h-7 rounded-full bg-bone-100 text-text-muted flex items-center justify-center text-[11px]"
      aria-label={`${day.weekdayShort}, vila`}
    >
      –
    </span>
  );
}

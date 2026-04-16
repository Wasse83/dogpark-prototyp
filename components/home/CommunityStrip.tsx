/**
 * CommunityStrip — mjuk social proof.
 * Visar antal hundar i hemmaparken denna vecka. Inga leaderboards, inga points.
 *
 * v0.5 §7.
 */

import type { ParkActivity } from "@/lib/mock-data";

export function CommunityStrip({ activity }: { activity: ParkActivity }) {
  // Fyra stiliserade "avatarer" — i produktion byts mot riktiga hundfoton.
  // Statiska klasser (Tailwind JIT kan inte analysera template-strängar).
  const seeds = [
    "bg-sage-500",
    "bg-rose-500",
    "bg-sage-700",
    "bg-rose-700",
  ] as const;

  return (
    <div
      className="bg-rose-100 rounded-[22px] p-4 flex items-center gap-3"
      role="region"
      aria-label={`Aktivitet i Dogpark ${activity.parkName}`}
    >
      <div className="flex">
        {seeds.map((toneClass, i) => (
          <span
            key={toneClass}
            aria-hidden="true"
            className={`w-8 h-8 rounded-full ${toneClass} border-2 border-rose-100 ${
              i > 0 ? "-ml-2" : ""
            }`}
          />
        ))}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] text-rose-700 leading-snug">
          <strong className="font-bold">
            {activity.dogsThisWeek} hundar
          </strong>{" "}
          tränar i {activity.parkName} den här veckan. {activity.note}.
        </p>
      </div>
    </div>
  );
}

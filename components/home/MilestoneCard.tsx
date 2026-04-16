/**
 * MilestoneCard — mörkt signatur-kort som visar nästa milstolpe.
 * Återanvänder samma dark-on-charcoal + sage-progress som JourneyCard,
 * men med fokus på nästa låsbara uppnåelse istället för aktuell resa.
 *
 * v0.5 §3.
 */

import Link from "next/link";

type MilestoneCardProps = {
  chip: string; // "Er resa"
  title: string; // "Luna klarar nivå 2 i lydnad"
  description: string; // "Tre pass kvar. Sen öppnar nivå 3 — och ett nytt mästarbevis."
  progressPct: number; // 0-100
  leftFoot: string; // "Pass 7 av 10"
  rightFoot: string; // "Klart runt 6 maj"
  href?: string;
};

export function MilestoneCard({
  chip,
  title,
  description,
  progressPct,
  leftFoot,
  rightFoot,
  href,
}: MilestoneCardProps) {
  const inner = (
    <div className="bg-charcoal-900 text-bone-50 rounded-[22px] p-[18px]">
      <div className="flex justify-between items-start mb-3">
        <span className="bg-charcoal-700 text-sage-500 text-[10px] font-bold tracking-wider px-[10px] py-1 rounded-pill">
          {chip}
        </span>
        <span className="font-display text-[24px] leading-none text-sage-500">
          {progressPct}%
        </span>
      </div>
      <p className="font-display text-[18px] leading-[1.25] mb-1 tracking-tight">
        {title}
      </p>
      <p className="text-[12px] text-text-on-inverse-muted leading-snug mb-3.5">
        {description}
      </p>
      <div className="h-2 bg-charcoal-700 rounded-pill overflow-hidden">
        <div
          className="h-full bg-sage-500 rounded-pill origin-left animate-progress-fill"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <div className="flex justify-between text-[11px] text-text-on-inverse-muted mt-2.5">
        <span>{leftFoot}</span>
        <span>{rightFoot}</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {inner}
      </Link>
    );
  }
  return inner;
}

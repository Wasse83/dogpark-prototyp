import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import {
  getDog,
  getJourney,
  getJourneySteps,
  getMilestones,
  type JourneyStep,
  type Milestone,
} from "@/lib/mock-data";

/**
 * /min-resa — programstruktur för aktuellt program.
 * Version C: 24px hero, kompakt tidslinje, nästa pass markerat.
 */

export default async function MinResaPage() {
  const [dog, journey, steps, milestones] = await Promise.all([
    getDog(),
    getJourney(),
    getJourneySteps(),
    getMilestones(),
  ]);

  const completed = steps.filter((s) => s.status === "klar").length;
  const total = steps.length;

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">Min resa</p>
      </div>

      <PhoneFrame>
        <div className="h-full overflow-y-auto px-5 pb-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/"
              aria-label="Tillbaka"
              className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
            >
              <Icon.ArrowLeft size={18} />
            </Link>
            <Link
              href="/dela"
              aria-label="Dela resan"
              className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
            >
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx={18} cy={5} r={3} />
                <circle cx={6} cy={12} r={3} />
                <circle cx={18} cy={19} r={3} />
                <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
              </svg>
            </Link>
          </div>

          {/* Hero */}
          <div className="mb-4">
            <h1 className="font-display text-[24px] leading-[1.15]">
              Er <em className="text-sage-600 italic">resa</em> genom{" "}
              {journey.programName}
            </h1>
            <p className="text-[13px] text-text-muted mt-1">
              {completed} av {total} pass klara · Nivå {journey.level} av{" "}
              {journey.totalLevels}
            </p>
          </div>

          {/* Progress-kort */}
          <div className="bg-charcoal-900 text-bone-50 rounded-[20px] p-4 mb-5">
            <div className="flex items-end justify-between mb-3">
              <p className="text-[11px] font-bold tracking-wider text-text-on-inverse-muted uppercase">
                {dog.name}s framsteg
              </p>
              <span className="font-display text-[24px] leading-none text-sage-500">
                {journey.progressPct}%
              </span>
            </div>
            <div className="h-2 bg-charcoal-700 rounded-pill overflow-hidden">
              <div
                className="h-full bg-sage-500 rounded-pill origin-left animate-progress-fill"
                style={{ width: `${journey.progressPct}%` }}
              />
            </div>
            <p className="text-[12px] text-text-on-inverse-muted mt-3 leading-snug">
              Tre pass kvar på säsongen. Efter det öppnas nivå 3 med nya utmaningar.
            </p>
          </div>

          {/* Tidslinje */}
          <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-3">
            Passen, i ordning
          </p>
          <ol className="relative">
            {/* Vertikal linje */}
            <div
              className="absolute left-[14px] top-1 bottom-1 w-0.5 bg-bone-200"
              aria-hidden="true"
            />
            {steps.map((step) => (
              <TimelineItem key={step.id} step={step} />
            ))}
          </ol>

          {/* Milstolpar */}
          {milestones.length > 0 && (
            <section className="mt-6">
              <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-3">
                Senaste milstolpar
              </p>
              <div className="flex flex-col gap-2">
                {milestones.map((m) => (
                  <MilestoneCard key={m.id} milestone={m} />
                ))}
              </div>
            </section>
          )}
        </div>

        <BottomNav />
      </PhoneFrame>
    </div>
  );
}

function TimelineItem({ step }: { step: JourneyStep }) {
  const isNow = step.status === "nu";
  const isDone = step.status === "klar";

  return (
    <li className="relative pl-10 pb-3">
      <span
        className={`absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center border-2 ${
          isNow
            ? "bg-sage-500 border-sage-500 text-bone-50"
            : isDone
              ? "bg-sage-100 border-sage-500 text-sage-800"
              : "bg-bone-100 border-bone-200 text-text-muted"
        }`}
        aria-hidden="true"
      >
        {isDone ? (
          <svg
            width={12}
            height={12}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <span className="text-[10px] font-bold">{step.sessionNumber}</span>
        )}
      </span>

      <div
        className={`rounded-[16px] p-3 ${
          isNow
            ? "bg-sage-100 border border-sage-500/40"
            : "bg-bg-surface border border-charcoal-900/[0.04]"
        }`}
      >
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <p
            className={`text-[14px] font-semibold leading-tight ${
              isDone ? "text-text-secondary" : "text-charcoal-900"
            }`}
          >
            {step.title}
          </p>
          <span
            className={`flex-shrink-0 text-[10px] font-bold tracking-wider uppercase ${
              isNow ? "text-sage-800" : "text-text-muted"
            }`}
          >
            {isNow ? "Nästa · " : ""}
            {step.dateLabel}
          </span>
        </div>
        <p className="text-[12px] text-text-muted leading-snug">
          {step.description}
        </p>
      </div>
    </li>
  );
}

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const icons: Record<Milestone["type"], string> = {
    achievement: "Klarade",
    love: "Milstolpe",
    level: "Nivå",
  };
  const bg: Record<Milestone["type"], string> = {
    achievement: "bg-sage-100 text-sage-800",
    love: "bg-rose-100 text-rose-700",
    level: "bg-bone-200 text-text-secondary",
  };

  return (
    <div className="bg-bg-surface rounded-[16px] p-3 border border-charcoal-900/[0.04] flex items-center gap-3">
      <span
        className={`text-[10px] font-bold tracking-wider uppercase rounded-pill px-2 py-0.5 flex-shrink-0 ${bg[milestone.type]}`}
      >
        {icons[milestone.type]}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold leading-tight">
          {milestone.title}
        </p>
        <p className="text-[11px] text-text-muted mt-0.5">
          {milestone.daysAgo === 1
            ? "Igår"
            : milestone.daysAgo < 7
              ? `${milestone.daysAgo} dagar sedan`
              : `${Math.round(milestone.daysAgo / 7)} veckor sedan`}
        </p>
      </div>
    </div>
  );
}

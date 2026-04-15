import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Icon } from "@/components/Icon";
import { BottomNav } from "@/components/BottomNav";
import {
  getDog,
  getOwner,
  getJourney,
  getNextSession,
} from "@/lib/mock-data";

export default async function HomePage() {
  const [dog, owner, journey, nextSession] = await Promise.all([
    getDog(),
    getOwner(),
    getJourney(),
    getNextSession(),
  ]);

  const sessionDate = new Date(nextSession.startsAt);
  const weekday = sessionDate
    .toLocaleDateString("sv-SE", { weekday: "short" })
    .slice(0, 3)
    .toUpperCase();
  const day = sessionDate.getDate();
  const time = sessionDate.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">
          Klickbar prototyp v0.1, fejkdata
        </p>
      </div>

      <PhoneFrame>
        <div className="h-full overflow-y-auto px-5 pb-24 stagger">
          {/* Top: avatar + greeting + bell */}
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full bg-rose-500 flex items-center justify-center text-bone-50 font-bold text-lg animate-breathe"
                aria-label={`Avatar för ${dog.name}`}
              >
                {dog.name[0]}
              </div>
              <div>
                <p className="text-xs text-text-muted">God morgon</p>
                <p className="font-semibold text-[15px]">
                  {dog.name} och {owner.name}
                </p>
              </div>
            </div>
            <button
              className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center"
              aria-label="Notiser"
            >
              <Icon.Bell size={16} />
            </button>
          </div>

          {/* Hero rubrik */}
          <div className="mb-6">
            <h1 className="font-display text-3xl leading-[1.1]">
              Dags för
              <br />
              <em className="text-sage-600 italic">{journey.programName}</em>
            </h1>
          </div>

          {/* Min resa kort */}
          <Link href="/min-resa" className="block mb-4">
            <div className="bg-charcoal-900 text-bone-50 rounded-[22px] p-[18px]">
              <div className="flex justify-between items-center mb-3.5">
                <span className="bg-charcoal-700 text-sage-500 text-[10px] font-bold tracking-wider px-[10px] py-1 rounded-pill">
                  DIN RESA
                </span>
                <span className="text-[11px] text-text-on-inverse-muted">
                  Nivå {journey.level} av {journey.totalLevels}
                </span>
              </div>
              <p className="font-semibold text-base mb-1">
                {journey.programName}, pass {journey.currentSession} av{" "}
                {journey.totalSessions}
              </p>
              <p className="text-xs text-text-on-inverse-muted mb-3.5">
                Snart är hela nivån klar, bra jobbat
              </p>
              <div className="h-2 bg-charcoal-700 rounded-pill overflow-hidden">
                <div
                  className="h-full bg-sage-500 rounded-pill origin-left animate-progress-fill"
                  style={{ width: `${journey.progressPct}%` }}
                />
              </div>
            </div>
          </Link>

          {/* Nästa pass */}
          <Link href="/pass" className="block mb-4">
            <div className="bg-bg-surface rounded-[22px] p-4 flex gap-3.5 items-center border border-charcoal-900/[0.04]">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-[10px] text-rose-700 font-bold tracking-wider">
                  {weekday}
                </span>
                <span className="font-display text-[22px] leading-none">
                  {day}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">
                  {nextSession.programName}
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  {time}, {nextSession.parkName}
                </p>
              </div>
              <Icon.ChevronRight size={18} className="text-text-muted" />
            </div>
          </Link>

          {/* Snabbåtgärder */}
          <div className="grid grid-cols-2 gap-3">
            <Link href="/boka">
              <div className="bg-bg-surface rounded-[18px] p-3.5 border border-charcoal-900/[0.04]">
                <div className="w-8 h-8 rounded-[10px] bg-sage-100 flex items-center justify-center mb-2 text-sage-800">
                  <Icon.Clock size={16} />
                </div>
                <p className="text-xs font-semibold">Boka pass</p>
                <p className="text-[11px] text-text-muted">8 lediga tider</p>
              </div>
            </Link>
            <Link href="/veckans-ovning">
              <div className="bg-bg-surface rounded-[18px] p-3.5 border border-charcoal-900/[0.04]">
                <div className="w-8 h-8 rounded-[10px] bg-rose-100 flex items-center justify-center mb-2 text-rose-700">
                  <Icon.Play size={16} />
                </div>
                <p className="text-xs font-semibold">Veckans övning</p>
                <p className="text-[11px] text-text-muted">90 sek video</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottennav */}
        <BottomNav />
      </PhoneFrame>

      {/* Demo-länkar utanför phone */}
      <div className="text-center text-sm text-text-muted max-w-[375px]">
        <p className="mb-3 font-semibold">Testa flödena:</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          <Link
            href="/onboarding"
            className="text-sage-600 font-semibold hover:underline"
          >
            Onboarding
          </Link>
          <Link
            href="/valj-park"
            className="text-sage-600 font-semibold hover:underline"
          >
            Välj park
          </Link>
          <Link
            href="/bli-medlem"
            className="text-sage-600 font-semibold hover:underline"
          >
            Bli medlem
          </Link>
          <Link
            href="/denna-finns-inte"
            className="text-rose-700 font-semibold hover:underline"
          >
            Testa 404
          </Link>
        </div>
      </div>
    </div>
  );
}

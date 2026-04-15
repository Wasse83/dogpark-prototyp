import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Icon } from "@/components/Icon";
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
      <div className="text-center text-sm text-text-muted">
        <p className="mb-2">Testa flödena:</p>
        <Link
          href="/onboarding"
          className="text-sage-600 font-semibold underline"
        >
          Gå till onboarding-flödet
        </Link>
      </div>
    </div>
  );
}

function BottomNav() {
  return (
    <div className="absolute bottom-0 inset-x-0 h-20 flex justify-around items-center pb-3 px-6 z-[5]"
         style={{
           background: "linear-gradient(to top, rgba(253,252,249,1) 60%, rgba(253,252,249,0))",
         }}>
      <NavIcon active>
        <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12l9-9 9 9" />
          <path d="M5 10v10h14V10" />
        </svg>
      </NavIcon>
      <NavIcon>
        <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x={3} y={4} width={18} height={18} rx={2} />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      </NavIcon>

      <button
        className="w-[60px] h-[60px] rounded-full bg-action-primary flex items-center justify-center -mt-7 transition-transform duration-200 ease-spring active:scale-90 active:-rotate-3 shadow-lg shadow-sage-500/30"
        aria-label="Lägg till"
      >
        <Icon.Plus size={24} className="text-bone-50" strokeWidth={2.5} />
      </button>

      <NavIcon>
        <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx={11} cy={11} r={8} />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </NavIcon>
      <NavIcon>
        <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx={12} cy={8} r={4} />
          <path d="M4 21v-1a7 7 0 0 1 14 0v1" />
        </svg>
      </NavIcon>
    </div>
  );
}

function NavIcon({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={active ? "text-sage-600 opacity-100" : "text-charcoal-900 opacity-50"}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </button>
  );
}

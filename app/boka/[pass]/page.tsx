import Link from "next/link";
import { notFound } from "next/navigation";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Icon } from "@/components/Icon";
import {
  mockGroupSessions,
  getGroupSession,
  getInstructor,
} from "@/lib/mock-data";
import { BookButton } from "./BookButton";

/**
 * /boka/[pass] — detaljvy för ett gruppass.
 * Server component som läser mock-data vid build time.
 * Dynamic routes med static export kräver generateStaticParams.
 */

export async function generateStaticParams() {
  return mockGroupSessions.map((s) => ({ pass: s.id }));
}

export default async function PassDetailPage({
  params,
}: {
  params: Promise<{ pass: string }>;
}) {
  const { pass } = await params;
  const session = await getGroupSession(pass);
  if (!session) notFound();

  const instructor = await getInstructor(session.instructorId);

  const start = new Date(session.startsAt);
  const weekday = start.toLocaleDateString("sv-SE", { weekday: "long" });
  const dayLabel = `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} ${start.getDate()} ${start.toLocaleDateString("sv-SE", { month: "long" })}`;
  const timeLabel = start.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = new Date(start.getTime() + session.durationMin * 60_000);
  const endLabel = endTime.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isFull = session.spotsLeft === 0;
  const isAlmostFull = session.spotsLeft > 0 && session.spotsLeft <= 2;

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">Passdetalj</p>
      </div>

      <PhoneFrame>
        <div className="h-full overflow-y-auto px-5 pb-28">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <Link
              href="/boka"
              aria-label="Tillbaka till passlista"
              className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
            >
              <Icon.ArrowLeft size={18} />
            </Link>
            <Link
              href="/dela"
              aria-label="Dela"
              className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx={18} cy={5} r={3} />
                <circle cx={6} cy={12} r={3} />
                <circle cx={18} cy={19} r={3} />
                <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
              </svg>
            </Link>
          </div>

          {/* Kategori-tagg + titel */}
          <p className="text-[10px] font-bold tracking-wider text-rose-700 uppercase mb-2">
            {categoryLabel(session.category)} · {levelLabel(session.level)}
          </p>
          <h1 className="font-display text-[28px] leading-[1.1] mb-4">
            {session.title}
          </h1>

          {/* Platsstatus */}
          <div className="mb-4">
            {isFull && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider bg-bone-200 text-text-secondary px-2.5 py-1 rounded-pill uppercase">
                Fullbokat just nu
              </span>
            )}
            {isAlmostFull && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider bg-rose-100 text-rose-700 px-2.5 py-1 rounded-pill uppercase">
                Bara {session.spotsLeft}{" "}
                {session.spotsLeft === 1 ? "plats" : "platser"} kvar
              </span>
            )}
            {!isFull && !isAlmostFull && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider bg-sage-100 text-sage-800 px-2.5 py-1 rounded-pill uppercase">
                {session.spotsLeft} platser lediga
              </span>
            )}
          </div>

          {/* Tid + plats */}
          <div className="bg-bg-surface rounded-[20px] p-4 mb-4 border border-charcoal-900/[0.04]">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-sage-100 flex items-center justify-center flex-shrink-0 text-sage-800">
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x={3} y={4} width={18} height={18} rx={2} />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold">{dayLabel}</p>
                <p className="text-[12px] text-text-muted">
                  {timeLabel} – {endLabel} · {session.durationMin} min
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0 text-rose-700">
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                  <circle cx={12} cy={10} r={3} />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold">{session.parkName}</p>
                <p className="text-[12px] text-text-muted">
                  Samling vid Vardagsrummet, entrén
                </p>
              </div>
            </div>
          </div>

          {/* Beskrivning */}
          <p className="text-[14px] leading-relaxed text-text-secondary mb-5">
            {session.description}
          </p>

          {/* Instruktör */}
          {instructor && (
            <div className="bg-bg-surface rounded-[20px] p-4 mb-5 border border-charcoal-900/[0.04]">
              <p className="text-[10px] font-bold tracking-wider text-text-muted uppercase mb-3">
                Din instruktör
              </p>
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-full bg-sage-500 flex items-center justify-center text-bone-50 font-bold text-lg flex-shrink-0"
                  aria-hidden="true"
                >
                  {instructor.initial}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[14px]">{instructor.name}</p>
                  <p className="text-[12px] text-text-muted">
                    {instructor.yearsAtDogpark} år på Dogpark ·{" "}
                    {instructor.totalSessions} pass
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {instructor.specialties.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-pill bg-sage-100 text-sage-800 text-[11px] font-semibold px-2 py-0.5"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-[13px] italic text-text-secondary leading-relaxed">
                &ldquo;{instructor.bio}&rdquo;
              </p>
            </div>
          )}

          {/* Prisrad */}
          <div className="flex items-center justify-between mb-1">
            <p className="text-[13px] text-text-muted">Kostnad</p>
            <p className="font-display text-[20px]">
              {session.priceSEK === 0 ? "Ingår" : `${session.priceSEK} kr`}
            </p>
          </div>
          <p className="text-[11px] text-text-muted">
            {session.priceSEK === 0
              ? "Alla gruppträningar ingår i PREMIUM-medlemskapet"
              : "Dras från ditt kort vid bokningstillfället"}
          </p>
        </div>

        {/* Sticky bottom booking */}
        <div className="absolute bottom-0 inset-x-0 p-4 pt-3 bg-gradient-to-t from-bone-50 via-bone-50 to-transparent">
          <BookButton session={session} disabled={isFull} />
        </div>
      </PhoneFrame>
    </div>
  );
}

function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    nosework: "Nosework",
    lydnad: "Lydnad",
    fys: "Fys",
    social: "Socialt",
    hundgym: "Hundgym",
    avslappning: "Lugn",
  };
  return map[cat] ?? cat;
}

function levelLabel(level: string): string {
  const map: Record<string, string> = {
    valp: "valp",
    grund: "grundnivå",
    medel: "medel",
    alla: "alla nivåer",
  };
  return map[level] ?? level;
}

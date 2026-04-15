import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import {
  getUpcomingBookings,
  getPastBookings,
  type GroupSession,
  type Booking,
  type PastBooking,
} from "@/lib/mock-data";
import { CancelBookingButton } from "./CancelBookingButton";

/**
 * /mina-bokningar — lista av kommande och tidigare pass.
 * Server component. CancelBookingButton sköter interaktion.
 */

export default async function MinaBokningarPage() {
  const [upcoming, past] = await Promise.all([
    getUpcomingBookings(),
    getPastBookings(),
  ]);

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">Mina bokningar</p>
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
              href="/boka"
              aria-label="Boka nytt pass"
              className="text-[12px] font-semibold text-sage-600 hover:text-sage-800 transition-colors"
            >
              Hitta fler pass
            </Link>
          </div>

          {/* Hero */}
          <div className="mb-5">
            <h1 className="font-display text-[26px] leading-[1.15]">
              Era
              <br />
              <em className="text-rose-700 italic">inbokade stunder</em>
            </h1>
            <p className="text-sm text-text-muted mt-2">
              {upcoming.length === 0
                ? "Inget inbokat just nu, dags att hitta något"
                : `${upcoming.length} ${upcoming.length === 1 ? "pass" : "pass"} framöver`}
            </p>
          </div>

          {/* Kommande */}
          {upcoming.length === 0 ? (
            <EmptyUpcoming />
          ) : (
            <section className="mb-7">
              <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2.5">
                Kommande
              </p>
              <div className="flex flex-col gap-2.5">
                {upcoming.map((b) => (
                  <UpcomingCard key={b.id} booking={b} />
                ))}
              </div>
            </section>
          )}

          {/* Tidigare */}
          {past.length > 0 && (
            <section>
              <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2.5">
                Tidigare pass
              </p>
              <div className="flex flex-col gap-2">
                {past.map((p) => (
                  <PastCard key={p.id} past={p} />
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

function UpcomingCard({
  booking,
}: {
  booking: Booking & { session: GroupSession };
}) {
  const { session } = booking;
  const start = new Date(session.startsAt);
  const weekday = start
    .toLocaleDateString("sv-SE", { weekday: "short" })
    .slice(0, 3)
    .toUpperCase();
  const day = start.getDate();
  const time = start.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const now = Date.now();
  const hoursUntil = Math.round(
    (start.getTime() - now) / (1000 * 60 * 60),
  );
  const dayDiff = Math.round(hoursUntil / 24);

  let relative: string;
  if (hoursUntil < 24) relative = `Om ${hoursUntil} h`;
  else if (dayDiff === 1) relative = "Imorgon";
  else relative = `Om ${dayDiff} dagar`;

  return (
    <div className="bg-bg-surface rounded-[20px] p-4 border border-charcoal-900/[0.04]">
      <div className="flex items-start gap-3.5">
        <div className="w-14 h-14 rounded-2xl bg-sage-100 flex flex-col items-center justify-center flex-shrink-0">
          <span className="text-[10px] text-sage-800 font-bold tracking-wider">
            {weekday}
          </span>
          <span className="font-display text-[22px] leading-none text-sage-800">
            {day}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <h3 className="font-semibold text-[15px] leading-tight">
              {session.title}
            </h3>
            <span className="flex-shrink-0 text-[10px] font-bold tracking-wider bg-rose-100 text-rose-700 px-2 py-0.5 rounded-pill uppercase">
              {relative}
            </span>
          </div>
          <p className="text-[12px] text-text-muted">
            kl {time} · {session.instructorName}
          </p>
          <p className="text-[11px] text-text-muted mt-0.5">
            {session.parkName}
          </p>

          <div className="flex items-center gap-2 mt-3">
            <Link
              href={`/boka/${session.id}`}
              className="inline-flex items-center justify-center h-8 px-3.5 rounded-pill bg-charcoal-900 text-bone-50 text-[12px] font-semibold transition-transform duration-150 active:scale-[0.97]"
            >
              Se pass
            </Link>
            <CancelBookingButton bookingId={booking.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PastCard({ past }: { past: PastBooking }) {
  const d = new Date(past.endedAt);
  const weekday = d
    .toLocaleDateString("sv-SE", { weekday: "short" })
    .slice(0, 3);
  const day = d.getDate();
  const month = d
    .toLocaleDateString("sv-SE", { month: "short" })
    .replace(".", "");

  return (
    <div className="bg-bg-surface rounded-[18px] p-3.5 border border-charcoal-900/[0.04] opacity-90">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-bone-200 flex flex-col items-center justify-center flex-shrink-0">
          <span className="font-display text-[15px] leading-none text-text-secondary">
            {day}
          </span>
          <span className="text-[9px] text-text-muted uppercase tracking-wider mt-0.5">
            {month}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[13px] leading-tight">
            {past.title}
          </p>
          <p className="text-[11px] text-text-muted mt-0.5">
            {weekday} · {past.instructorName} · {past.durationMin} min
          </p>
          {past.note && (
            <p className="text-[12px] italic text-text-secondary mt-1.5 leading-snug">
              &ldquo;{past.note}&rdquo;
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyUpcoming() {
  return (
    <div className="py-8 text-center bg-bg-surface rounded-[22px] border border-charcoal-900/[0.04] mb-7">
      <div
        className="w-16 h-16 rounded-full bg-sage-100 mx-auto mb-4 flex items-center justify-center"
        aria-hidden="true"
      >
        <svg
          width={28}
          height={28}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-sage-600"
        >
          <rect x={3} y={4} width={18} height={18} rx={2} />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      </div>
      <p className="font-display text-[18px] mb-1.5">Tomt i kalendern</p>
      <p className="text-sm text-text-muted mb-4 max-w-[240px] mx-auto">
        Inga kommande pass just nu. Ni har ju en hel vecka framför er.
      </p>
      <Link
        href="/boka"
        className="inline-flex items-center justify-center h-10 px-5 rounded-pill bg-action-primary text-bone-50 text-[13px] font-semibold transition-transform duration-150 active:scale-[0.97]"
      >
        Utforska veckans pass
      </Link>
    </div>
  );
}

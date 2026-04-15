"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import {
  mockGroupSessions,
  type GroupSession,
} from "@/lib/mock-data";

/**
 * /boka — utforska gruppträningar.
 * Filter-chips + scrollbar lista grupperad per dag.
 * Empty state (designsystem §6.2) när filter inte matchar.
 */

type Filter = "alla" | "nosework" | "lydnad" | "fys" | "avslappning";

const filters: { id: Filter; label: string }[] = [
  { id: "alla", label: "Alla" },
  { id: "nosework", label: "Nosework" },
  { id: "lydnad", label: "Lydnad" },
  { id: "fys", label: "Fys" },
  { id: "avslappning", label: "Lugn" },
];

export default function BokaPage() {
  const [filter, setFilter] = useState<Filter>("alla");

  const filteredSessions = useMemo(() => {
    if (filter === "alla") return mockGroupSessions;
    return mockGroupSessions.filter((s) => {
      if (filter === "fys") return s.category === "fys" || s.category === "hundgym";
      return s.category === filter;
    });
  }, [filter]);

  // Gruppera per dag (datumsträng).
  const grouped = useMemo(() => {
    const map = new Map<string, GroupSession[]>();
    for (const s of filteredSessions) {
      const d = new Date(s.startsAt);
      const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(s);
    }
    // Sortera nycklar stigande
    return Array.from(map.entries()).sort(([a], [b]) => (a < b ? -1 : 1));
  }, [filteredSessions]);

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">Boka pass</p>
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
              href="/sok"
              aria-label="Sök"
              className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx={11} cy={11} r={8} />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </Link>
          </div>

          {/* Hero */}
          <div className="mb-5">
            <h1 className="font-display text-[26px] leading-[1.15]">
              Utforska
              <br />
              <em className="text-sage-600 italic">veckans pass</em>
            </h1>
            <p className="text-sm text-text-muted mt-2">
              {mockGroupSessions.length} pass närmaste dagarna på Dogpark
              Uppsala
            </p>
          </div>

          {/* Filter-chips */}
          <div
            className="flex gap-2 overflow-x-auto -mx-5 px-5 mb-5 pb-2"
            role="tablist"
            aria-label="Filter pass-typ"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`flex-shrink-0 h-9 px-4 rounded-pill text-[13px] font-semibold transition-colors ${
                  filter === f.id
                    ? "bg-charcoal-900 text-bone-50"
                    : "bg-bone-200 text-text-secondary hover:bg-bone-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Lista */}
          {grouped.length === 0 ? (
            <EmptyState
              onReset={() => setFilter("alla")}
              filterLabel={filters.find((f) => f.id === filter)?.label ?? ""}
            />
          ) : (
            <div className="flex flex-col gap-5">
              {grouped.map(([dateKey, sessions]) => (
                <DayGroup key={dateKey} dateKey={dateKey} sessions={sessions} />
              ))}
            </div>
          )}
        </div>

        <BottomNav />
      </PhoneFrame>
    </div>
  );
}

function DayGroup({
  dateKey,
  sessions,
}: {
  dateKey: string;
  sessions: GroupSession[];
}) {
  const d = new Date(dateKey);
  const weekday = d.toLocaleDateString("sv-SE", { weekday: "long" });
  const dayLabel = `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} ${d.getDate()} ${d.toLocaleDateString("sv-SE", { month: "short" }).replace(".", "")}`;

  return (
    <div>
      <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2">
        {dayLabel}
      </p>
      <div className="flex flex-col gap-2">
        {sessions.map((s) => (
          <SessionCard key={s.id} session={s} />
        ))}
      </div>
    </div>
  );
}

function SessionCard({ session }: { session: GroupSession }) {
  const start = new Date(session.startsAt);
  const timeLabel = start.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const isFull = session.spotsLeft === 0;
  const isAlmostFull = session.spotsLeft > 0 && session.spotsLeft <= 2;

  return (
    <Link
      href={`/boka/${session.id}`}
      aria-disabled={isFull}
      className={`block bg-bg-surface rounded-[20px] p-4 border border-charcoal-900/[0.04] transition-all duration-200 ${
        isFull
          ? "opacity-60 pointer-events-none"
          : "hover:border-sage-500/30 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Tidsblock */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-sage-100">
          <span className="font-display text-[15px] leading-none text-sage-800">
            {timeLabel}
          </span>
          <span className="text-[10px] text-sage-800 mt-1">
            {session.durationMin} min
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-[15px] leading-tight">
              {session.title}
            </h3>
            <SpotsBadge
              spotsLeft={session.spotsLeft}
              isFull={isFull}
              isAlmostFull={isAlmostFull}
            />
          </div>
          <p className="text-[12px] text-text-muted">
            {session.instructorName} · {session.parkName}
          </p>
          <div className="flex items-center gap-2 mt-2">
            {session.priceSEK === 0 ? (
              <span className="text-[10px] font-bold tracking-wider text-sage-800 uppercase">
                Ingår i PREMIUM
              </span>
            ) : (
              <span className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                {session.priceSEK} kr
              </span>
            )}
            {session.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-text-muted"
                aria-hidden="true"
              >
                · {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function SpotsBadge({
  spotsLeft,
  isFull,
  isAlmostFull,
}: {
  spotsLeft: number;
  isFull: boolean;
  isAlmostFull: boolean;
}) {
  if (isFull) {
    return (
      <span className="flex-shrink-0 text-[10px] font-bold tracking-wider bg-bone-200 text-text-muted px-2 py-0.5 rounded-pill uppercase">
        Fullt
      </span>
    );
  }
  if (isAlmostFull) {
    return (
      <span className="flex-shrink-0 text-[10px] font-bold tracking-wider bg-rose-100 text-rose-700 px-2 py-0.5 rounded-pill uppercase">
        {spotsLeft} kvar
      </span>
    );
  }
  return (
    <span className="flex-shrink-0 text-[10px] font-semibold text-text-muted">
      {spotsLeft} platser
    </span>
  );
}

function EmptyState({
  onReset,
  filterLabel,
}: {
  onReset: () => void;
  filterLabel: string;
}) {
  return (
    <div className="py-10 text-center">
      <div
        className="w-20 h-20 rounded-full bg-bone-200 mx-auto mb-4 flex items-center justify-center"
        aria-hidden="true"
      >
        <svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-sage-500">
          <circle cx={11} cy={11} r={8} />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </div>
      <p className="font-display text-[18px] mb-2">
        Inga {filterLabel.toLowerCase()}-pass just nu
      </p>
      <p className="text-sm text-text-muted mb-5 max-w-[240px] mx-auto">
        Prova att visa alla pass så ser du vad som finns den här veckan.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center justify-center h-10 px-5 rounded-pill bg-action-primary text-bone-50 text-[13px] font-semibold transition-transform duration-150 active:scale-[0.97]"
      >
        Visa alla pass
      </button>
    </div>
  );
}

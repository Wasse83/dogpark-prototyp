"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import { PhotoThumb } from "@/components/PhotoThumb";
import {
  mockGroupSessions,
  type GroupSession,
} from "@/lib/mock-data";

/**
 * /boka — utforska gruppträningar.
 * Designsystem v0.3 §14, Version C (middle density):
 *  - display-md 24px hero
 *  - 72×72 PhotoThumb till vänster i varje pass-kort
 *  - Filter-chips med count-suffix
 *  - Sök är ikon-knapp, inte fält
 */

type Filter = "alla" | "nosework" | "lydnad" | "fys" | "avslappning";

const filters: { id: Filter; label: string }[] = [
  { id: "alla", label: "Alla" },
  { id: "nosework", label: "Nosework" },
  { id: "lydnad", label: "Lydnad" },
  { id: "fys", label: "Fys" },
  { id: "avslappning", label: "Lugn" },
];

function matchesFilter(s: GroupSession, f: Filter): boolean {
  if (f === "alla") return true;
  if (f === "fys") return s.category === "fys" || s.category === "hundgym";
  return s.category === f;
}

export default function BokaPage() {
  const [filter, setFilter] = useState<Filter>("alla");

  // Räkna pass per filter för count-suffix.
  const counts = useMemo(() => {
    const map: Record<Filter, number> = {
      alla: 0,
      nosework: 0,
      lydnad: 0,
      fys: 0,
      avslappning: 0,
    };
    for (const s of mockGroupSessions) {
      map.alla++;
      (Object.keys(map) as Filter[]).forEach((f) => {
        if (f !== "alla" && matchesFilter(s, f)) map[f]++;
      });
    }
    return map;
  }, []);

  const filteredSessions = useMemo(
    () => mockGroupSessions.filter((s) => matchesFilter(s, filter)),
    [filter],
  );

  // Gruppera per dag.
  const grouped = useMemo(() => {
    const map = new Map<string, GroupSession[]>();
    for (const s of filteredSessions) {
      const d = new Date(s.startsAt);
      const key = d.toISOString().slice(0, 10);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(s);
    }
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
          <div className="flex items-center justify-between mb-3">
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
                <circle cx={11} cy={11} r={8} />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </Link>
          </div>

          {/* Hero — display-md 24px, Version C */}
          <div className="mb-4">
            <h1 className="font-display text-[24px] leading-[1.15]">
              Utforska <em className="text-sage-600 italic">veckans pass</em>
            </h1>
            <p className="text-[13px] text-text-muted mt-1">
              {mockGroupSessions.length} pass närmaste veckan · Dogpark Uppsala
            </p>
          </div>

          {/* Filter-chips med count-suffix */}
          <div
            className="flex gap-2 overflow-x-auto -mx-5 px-5 mb-4 pb-2"
            role="tablist"
            aria-label="Filter pass-typ"
          >
            {filters.map((f) => {
              const active = filter === f.id;
              const count = counts[f.id];
              const disabled = count === 0 && !active;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  disabled={disabled}
                  className={`flex-shrink-0 h-8 px-3 rounded-pill text-[12px] font-semibold transition-colors ${
                    active
                      ? "bg-charcoal-900 text-bone-50"
                      : disabled
                        ? "bg-bone-200 text-text-muted opacity-50 cursor-not-allowed"
                        : "bg-bone-200 text-text-secondary hover:bg-bone-100"
                  }`}
                >
                  {f.label} · {count}
                </button>
              );
            })}
          </div>

          {/* Lista */}
          {grouped.length === 0 ? (
            <EmptyState
              onReset={() => setFilter("alla")}
              filterLabel={filters.find((f) => f.id === filter)?.label ?? ""}
            />
          ) : (
            <div className="flex flex-col gap-4">
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
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase">
          {dayLabel}
        </p>
        <p className="text-[10px] text-text-muted">
          {sessions.length} {sessions.length === 1 ? "pass" : "pass"}
        </p>
      </div>
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

  return (
    <Link
      href={`/boka/${session.id}`}
      aria-disabled={isFull}
      className={`block bg-bg-surface rounded-[20px] p-3 border border-charcoal-900/[0.04] transition-all duration-200 ${
        isFull
          ? "opacity-60 pointer-events-none"
          : "hover:border-sage-500/30 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* 72×72 thumbnail med tidsbadge */}
        <div className="relative flex-shrink-0">
          <PhotoThumb
            src={session.photoUrl}
            alt={session.title}
            size={72}
            rounded="2xl"
            variant="session"
          />
          <span
            className="absolute bottom-1.5 left-1.5 bg-charcoal-900/80 text-bone-50 text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded-pill"
            aria-hidden="true"
          >
            {timeLabel}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <h3 className="font-semibold text-[14px] leading-tight truncate">
              {session.title}
            </h3>
            <SpotsBadge spotsLeft={session.spotsLeft} spotsTotal={session.spotsTotal} />
          </div>
          <p className="text-[12px] text-text-muted leading-snug truncate">
            {session.durationMin} min · {session.instructorName}
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            {session.priceSEK === 0 ? (
              <span className="text-[10px] font-bold tracking-wider text-sage-800 uppercase">
                Ingår
              </span>
            ) : (
              <span className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                {session.priceSEK} kr
              </span>
            )}
            <span className="text-[10px] text-text-muted">
              · {levelLabel(session.level)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SpotsBadge({
  spotsLeft,
  spotsTotal,
}: {
  spotsLeft: number;
  spotsTotal: number;
}) {
  if (spotsLeft === 0) {
    return (
      <span className="flex-shrink-0 text-[10px] font-bold tracking-wider bg-charcoal-700 text-text-on-inverse-muted px-2 py-0.5 rounded-pill uppercase">
        Fullbokat
      </span>
    );
  }
  const ratio = spotsLeft / spotsTotal;
  if (ratio < 0.2) {
    return (
      <span className="flex-shrink-0 text-[10px] font-bold tracking-wider bg-rose-100 text-rose-700 px-2 py-0.5 rounded-pill uppercase">
        {spotsLeft === 1 ? "Bara 1 kvar" : `${spotsLeft} kvar`}
      </span>
    );
  }
  if (ratio < 0.5) {
    return (
      <span className="flex-shrink-0 text-[10px] font-semibold bg-bone-200 text-text-secondary px-2 py-0.5 rounded-pill">
        {spotsLeft} av {spotsTotal} kvar
      </span>
    );
  }
  return (
    <span className="flex-shrink-0 text-[10px] font-semibold bg-sage-100 text-sage-800 px-2 py-0.5 rounded-pill">
      {spotsLeft} av {spotsTotal} kvar
    </span>
  );
}

function levelLabel(level: string): string {
  const map: Record<string, string> = {
    valp: "Valp",
    grund: "Grund",
    medel: "Medel",
    alla: "Alla nivåer",
  };
  return map[level] ?? level;
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
        <svg
          width={36}
          height={36}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-sage-500"
        >
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

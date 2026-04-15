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
 * /sok — fritextsök över passen.
 * Designsystem v0.4 §5 + Version C-metrik.
 *
 * Skiljer sig från /boka genom att vara sök-först, inte lista-först.
 * Matchar på titel, instruktör, kategori och tags. Filtrerar klient-sidan
 * över mockGroupSessions — när backend kopplas in byter vi mot en
 * debounced fetch mot /api/sessions?q=... utan att UI ändras.
 */

type CategoryFilter = GroupSession["category"] | "alla";
type LevelFilter = GroupSession["level"];

const categories: { id: CategoryFilter; label: string }[] = [
  { id: "alla", label: "Alla" },
  { id: "nosework", label: "Nosework" },
  { id: "lydnad", label: "Lydnad" },
  { id: "fys", label: "Fys" },
  { id: "hundgym", label: "Hundgym" },
  { id: "social", label: "Social" },
  { id: "avslappning", label: "Lugn" },
];

const levels: { id: LevelFilter; label: string }[] = [
  { id: "alla", label: "Alla nivåer" },
  { id: "valp", label: "Valp" },
  { id: "grund", label: "Grund" },
  { id: "medel", label: "Medel" },
];

// Snabbförslag när sökfältet är tomt.
const quickSuggestions = [
  "Nosework",
  "Mira Bacova",
  "Inkallning",
  "Valpklass",
  "Lugn",
];

function normalize(s: string): string {
  return s
    .toLocaleLowerCase("sv-SE")
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o");
}

function matchesQuery(session: GroupSession, q: string): boolean {
  if (!q) return true;
  const haystack = [
    session.title,
    session.category,
    session.instructorName,
    session.description,
    ...session.tags,
  ]
    .map(normalize)
    .join(" ");
  return haystack.includes(normalize(q));
}

export default function SokPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("alla");
  const [level, setLevel] = useState<LevelFilter>("alla");

  const results = useMemo(() => {
    return mockGroupSessions.filter((s) => {
      if (!matchesQuery(s, query)) return false;
      if (category !== "alla" && s.category !== category) return false;
      if (level !== "alla" && s.level !== level) return false;
      return true;
    });
  }, [query, category, level]);

  const hasAnyFilter =
    query.length > 0 || category !== "alla" || level !== "alla";

  const resetAll = () => {
    setQuery("");
    setCategory("alla");
    setLevel("alla");
  };

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">Sök</p>
      </div>

      <PhoneFrame>
        <div className="h-full overflow-y-auto px-5 pb-28">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <Link
              href="/"
              aria-label="Tillbaka"
              className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
            >
              <Icon.ArrowLeft size={18} />
            </Link>
            {hasAnyFilter && (
              <button
                type="button"
                onClick={resetAll}
                className="text-[12px] font-semibold text-sage-700 hover:text-sage-800"
              >
                Rensa
              </button>
            )}
          </div>

          {/* Hero */}
          <div className="mb-4">
            <h1 className="font-display text-[24px] leading-[1.15]">
              Hitta <em className="text-sage-600 italic">rätt pass</em>
            </h1>
            <p className="text-[13px] text-text-muted mt-1">
              Sök på passtyp, instruktör eller ord ni känner igen
            </p>
          </div>

          {/* Sökfält */}
          <div className="relative mb-4">
            <span
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
              aria-hidden="true"
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
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Vad vill ni öva på?"
              aria-label="Sök pass"
              className="w-full h-11 pl-10 pr-10 rounded-[14px] bg-bg-surface border border-charcoal-900/[0.08] text-[14px] placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:border-sage-500/40"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Rensa sökning"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-bone-200 hover:bg-bone-100 flex items-center justify-center transition-colors"
              >
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  className="text-text-secondary"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            )}
          </div>

          {/* Snabbförslag — synliga när sökfältet är tomt */}
          {!query && (
            <div className="mb-4">
              <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2">
                Snabbförslag
              </p>
              <div className="flex flex-wrap gap-1.5">
                {quickSuggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQuery(s)}
                    className="h-8 px-3 rounded-pill bg-bone-200 hover:bg-bone-100 text-text-secondary text-[12px] font-semibold transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Kategori-filter */}
          <div className="mb-3">
            <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2">
              Kategori
            </p>
            <div
              className="flex gap-1.5 overflow-x-auto -mx-5 px-5 pb-1"
              role="tablist"
              aria-label="Filtrera kategori"
            >
              {categories.map((c) => {
                const active = category === c.id;
                return (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCategory(c.id)}
                    className={`flex-shrink-0 h-8 px-3 rounded-pill text-[12px] font-semibold transition-colors ${
                      active
                        ? "bg-charcoal-900 text-bone-50"
                        : "bg-bone-200 text-text-secondary hover:bg-bone-100"
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nivå-filter */}
          <div className="mb-4">
            <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2">
              Nivå
            </p>
            <div
              className="flex gap-1.5 overflow-x-auto -mx-5 px-5 pb-1"
              role="tablist"
              aria-label="Filtrera nivå"
            >
              {levels.map((l) => {
                const active = level === l.id;
                return (
                  <button
                    key={l.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setLevel(l.id)}
                    className={`flex-shrink-0 h-8 px-3 rounded-pill text-[12px] font-semibold transition-colors ${
                      active
                        ? "bg-charcoal-900 text-bone-50"
                        : "bg-bone-200 text-text-secondary hover:bg-bone-100"
                    }`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resultat */}
          <div className="mb-3 flex items-baseline justify-between">
            <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase">
              {results.length} {results.length === 1 ? "träff" : "träffar"}
            </p>
            {hasAnyFilter && (
              <p className="text-[10px] text-text-muted">
                av {mockGroupSessions.length} pass
              </p>
            )}
          </div>

          {results.length === 0 ? (
            <EmptyState onReset={resetAll} query={query} />
          ) : (
            <div className="flex flex-col gap-2">
              {results.map((s) => (
                <SearchResultCard key={s.id} session={s} query={query} />
              ))}
            </div>
          )}
        </div>

        <BottomNav />
      </PhoneFrame>
    </div>
  );
}

function SearchResultCard({
  session,
  query,
}: {
  session: GroupSession;
  query: string;
}) {
  const start = new Date(session.startsAt);
  const weekday = start.toLocaleDateString("sv-SE", { weekday: "short" });
  const dayLabel = `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} ${start.getDate()} ${start
    .toLocaleDateString("sv-SE", { month: "short" })
    .replace(".", "")}`;
  const timeLabel = start.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const isFull = session.spotsLeft === 0;

  return (
    <Link
      href={`/boka/${session.id}`}
      aria-disabled={isFull}
      className={`block bg-bg-surface rounded-[16px] p-3 border border-charcoal-900/[0.04] transition-all duration-200 ${
        isFull
          ? "opacity-60 pointer-events-none"
          : "hover:border-sage-500/30 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3">
        <PhotoThumb
          src={session.photoUrl}
          alt={session.title}
          size={56}
          rounded="2xl"
          variant="session"
        />
        <div className="flex-1 min-w-0 pt-0.5">
          <h3 className="font-semibold text-[14px] leading-tight truncate">
            <HighlightedText text={session.title} query={query} />
          </h3>
          <p className="text-[12px] text-text-muted leading-snug truncate">
            {dayLabel} · {timeLabel} · <HighlightedText text={session.instructorName} query={query} />
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-[10px] font-bold tracking-wider uppercase text-sage-800 bg-sage-100 px-1.5 py-0.5 rounded-pill">
              {categoryLabel(session.category)}
            </span>
            <span className="text-[10px] text-text-muted">
              · {levelLabel(session.level)}
            </span>
            {isFull ? (
              <span className="text-[10px] font-bold tracking-wider text-text-muted uppercase ml-auto">
                Fullbokat
              </span>
            ) : session.spotsLeft <= 2 ? (
              <span className="text-[10px] font-bold tracking-wider text-rose-700 uppercase ml-auto">
                {session.spotsLeft} kvar
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}

// Markerar matchande ord med sage-bakgrund. Case-insensitive och hanterar
// svenska bokstäver via samma normaliserings-funktion som sök-logiken.
function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const nText = normalize(text);
  const nQuery = normalize(query.trim());
  const idx = nText.indexOf(nQuery);
  if (idx === -1) return <>{text}</>;
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + nQuery.length);
  const after = text.slice(idx + nQuery.length);
  return (
    <>
      {before}
      <mark className="bg-sage-100 text-charcoal-900 rounded px-0.5">
        {match}
      </mark>
      {after}
    </>
  );
}

function categoryLabel(c: GroupSession["category"]): string {
  const map: Record<GroupSession["category"], string> = {
    nosework: "Nosework",
    lydnad: "Lydnad",
    fys: "Fys",
    social: "Social",
    hundgym: "Hundgym",
    avslappning: "Lugn",
  };
  return map[c];
}

function levelLabel(l: GroupSession["level"]): string {
  const map: Record<GroupSession["level"], string> = {
    valp: "Valp",
    grund: "Grund",
    medel: "Medel",
    alla: "Alla nivåer",
  };
  return map[l];
}

function EmptyState({
  onReset,
  query,
}: {
  onReset: () => void;
  query: string;
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
        {query ? `Inga träffar på "${query}"` : "Inga pass matchar"}
      </p>
      <p className="text-sm text-text-muted mb-5 max-w-[240px] mx-auto">
        Prova att rensa filtren eller söka bredare. Nya pass läggs upp varje
        vecka.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center justify-center h-10 px-5 rounded-pill bg-action-primary text-bone-50 text-[13px] font-semibold transition-transform duration-150 active:scale-[0.97]"
      >
        Rensa och visa alla
      </button>
    </div>
  );
}

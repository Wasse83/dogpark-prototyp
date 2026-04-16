/**
 * BadgeStrip — horisontell scroll av mästarbevis.
 * Tre tillstånd: earned (sage gradient), next (rose), locked (bone med streckad border).
 *
 * v0.5 §4.
 */

import type { Badge } from "@/lib/mock-data";

export function BadgeStrip({ badges }: { badges: Badge[] }) {
  return (
    <div
      className="flex gap-3 overflow-x-auto px-5 -mx-5 pb-1"
      style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
      role="list"
      aria-label="Mästarbevis"
    >
      {badges.map((b) => (
        <BadgeCell key={b.id} badge={b} />
      ))}
    </div>
  );
}

function BadgeCell({ badge }: { badge: Badge }) {
  const discClass =
    badge.status === "earned"
      ? "text-bone-50"
      : badge.status === "next"
        ? "bg-rose-100 text-rose-700"
        : "bg-bone-100 text-text-muted border-[1.5px] border-dashed border-bone-300";

  const discStyle =
    badge.status === "earned"
      ? {
          background:
            "linear-gradient(140deg, var(--sage-500), var(--sage-800))",
          boxShadow: "0 8px 20px -8px rgba(62,90,61,0.5)",
        }
      : badge.status === "next"
        ? { boxShadow: "0 8px 20px -8px rgba(184,117,99,0.4)" }
        : undefined;

  return (
    <div
      role="listitem"
      className="flex-shrink-0 w-[84px] text-center"
      style={{ scrollSnapAlign: "start" }}
      aria-label={`${badge.title}, ${badge.subtitle}`}
    >
      <div
        className={`w-[84px] h-[84px] rounded-full flex items-center justify-center mb-2 relative ${discClass}`}
        style={discStyle}
      >
        {badge.status === "earned" && (
          <span
            className="absolute inset-[4px] rounded-full pointer-events-none"
            style={{ border: "1.5px dashed rgba(253,252,249,0.3)" }}
            aria-hidden="true"
          />
        )}
        <BadgeIcon kind={badge.icon} />
      </div>
      <p className="text-[11px] font-semibold leading-tight mb-0.5">
        {badge.title}
      </p>
      <p className="text-[10px] text-text-muted leading-tight">{badge.subtitle}</p>
    </div>
  );
}

function BadgeIcon({ kind }: { kind: Badge["icon"] }) {
  const common = {
    width: 34,
    height: 34,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (kind) {
    case "star":
      return (
        <svg {...common}>
          <circle cx={12} cy={8} r={6} />
          <path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1" />
        </svg>
      );
    case "level":
      return (
        <svg {...common}>
          <path d="M6 9a6 6 0 0 0 12 0" />
          <path d="M6 9V3h12v6" />
          <path d="M12 15v6" />
          <path d="M8 21h8" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.7z" />
        </svg>
      );
    case "paw":
      return (
        <svg {...common}>
          <circle cx={11} cy={4} r={2} />
          <circle cx={18} cy={8} r={2} />
          <circle cx={20} cy={16} r={2} />
          <circle cx={7} cy={9} r={2} />
          <path d="M8 22c-2 0-3-2-2-4l3-4c2-3 6-3 8 0l3 4c1 2 0 4-2 4H8z" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x={3} y={11} width={18} height={11} rx={2} />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx={12} cy={12} r={10} />
          <path d="m16.2 7.8-2.9 6.3-6.3 2.9 2.9-6.3 6.3-2.9z" />
        </svg>
      );
  }
}

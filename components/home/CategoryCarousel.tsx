/**
 * CategoryCarousel — horisontell scroll med kategori-kort.
 * 4:5 format, gradient-överfläck för läsbarhet. SVG-illustration per kategori
 * (mappar till /public/photos/sessions/{category}.svg via mock-data).
 *
 * v0.5 §6.
 */

import Link from "next/link";
import type { CategoryCard, GroupSession } from "@/lib/mock-data";

// Mappar kategori-id till en gradient-bakgrund som matchar SVG-illustrationen.
// Används när kategori-SVG:n inte fyller hela kortet. CSS-vars enligt globals.css.
const gradientByCategory: Record<GroupSession["category"], string> = {
  nosework: "linear-gradient(160deg, var(--sage-400), var(--sage-800))",
  lydnad: "linear-gradient(160deg, var(--charcoal-700), var(--charcoal-900))",
  hundgym: "linear-gradient(160deg, var(--rose-500), var(--rose-700))",
  fys: "linear-gradient(160deg, var(--sage-500), var(--charcoal-700))",
  social: "linear-gradient(160deg, var(--rose-100), var(--rose-500))",
  avslappning: "linear-gradient(160deg, var(--bone-200), var(--sage-400))",
};

export function CategoryCarousel({ cards }: { cards: CategoryCard[] }) {
  return (
    <div
      className="flex gap-2.5 overflow-x-auto px-5 -mx-5 pb-1"
      style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
      role="list"
      aria-label="Passkategorier"
    >
      {cards.map((card) => (
        <CategoryCell key={card.id} card={card} />
      ))}
    </div>
  );
}

function CategoryCell({ card }: { card: CategoryCard }) {
  return (
    <Link
      href={card.href}
      role="listitem"
      className="flex-shrink-0 w-[132px] aspect-[4/5] rounded-[20px] overflow-hidden relative"
      style={{
        background: gradientByCategory[card.id],
        scrollSnapAlign: "start",
      }}
      aria-label={`${card.label}, ${card.sessionsThisWeek} pass denna vecka`}
    >
      {/* SVG-illustration som bakgrundslager — speglar kategori-foto-mönstret */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/photos/sessions/${card.id}.svg`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        aria-hidden="true"
      />

      {/* Gradient-överdrag för text-kontrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 45%, rgba(26,23,20,0.75) 100%)",
        }}
      />

      <div className="absolute left-3 right-3 bottom-2.5 z-[2] text-bone-50">
        <p className="font-display text-[15px] leading-[1.1] tracking-tight">
          {card.label}
        </p>
        <p className="text-[10px] text-bone-50/85 mt-0.5">
          {card.sessionsThisWeek} pass denna vecka
        </p>
      </div>
    </Link>
  );
}

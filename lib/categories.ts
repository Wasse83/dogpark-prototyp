/**
 * Delade visuella konstanter för passkategorier.
 * Importeras av både CategoryCarousel (hem) och kategori/[id]-sidan.
 * CSS-vars enligt globals.css (utan `--color-` prefix).
 */

import type { GroupSession } from "@/lib/mock-data";

export const gradientByCategory: Record<GroupSession["category"], string> = {
  nosework: "linear-gradient(160deg, var(--sage-400), var(--sage-800))",
  lydnad: "linear-gradient(160deg, var(--charcoal-700), var(--charcoal-900))",
  hundgym: "linear-gradient(160deg, var(--rose-500), var(--rose-700))",
  fys: "linear-gradient(160deg, var(--sage-500), var(--charcoal-700))",
  social: "linear-gradient(160deg, var(--rose-100), var(--rose-500))",
  avslappning: "linear-gradient(160deg, var(--bone-200), var(--sage-400))",
};

// Samma id-lista som GroupSession["category"] — används för
// generateStaticParams och validering.
export const CATEGORY_IDS = [
  "nosework",
  "lydnad",
  "hundgym",
  "fys",
  "social",
  "avslappning",
] as const satisfies readonly GroupSession["category"][];

export type CategoryId = (typeof CATEGORY_IDS)[number];

export function isCategoryId(v: string): v is CategoryId {
  return (CATEGORY_IDS as readonly string[]).includes(v);
}

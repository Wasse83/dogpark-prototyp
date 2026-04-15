"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "light" | "dark";
};

/**
 * PhoneFrame visar barnens innehåll i en mobil-look-alike.
 * Praktiskt under utveckling så vi ser hur skärmar verkligen ser ut.
 * I en riktig app (PWA installerad) finns inte ramen, så all layout
 * inom barnen ska vara responsiv på äkta mobil-viewport.
 */
export function PhoneFrame({ children, variant = "light" }: Props) {
  const bg = variant === "dark" ? "bg-charcoal-900" : "bg-bone-50";

  return (
    <div
      className={`relative mx-auto overflow-hidden border-[8px] border-charcoal-900 ${bg}`}
      style={{ width: 375, height: 780, borderRadius: 44 }}
    >
      {/* Notch */}
      <div
        className="absolute top-1.5 left-1/2 -translate-x-1/2 z-20 bg-charcoal-900"
        style={{ width: 110, height: 28, borderRadius: 16 }}
      />

      {/* Statusbar */}
      <div
        className={`absolute top-0 inset-x-0 h-10 flex items-center justify-between px-7 z-10 text-xs font-semibold ${
          variant === "dark" ? "text-bone-50" : "text-charcoal-900"
        }`}
      >
        <span>9:41</span>
        <span>● ● ●</span>
      </div>

      {/* Innehåll */}
      <div className="absolute inset-0 pt-12 overflow-hidden">{children}</div>
    </div>
  );
}

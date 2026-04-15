"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";

/**
 * Bottennav enligt designsystem v0.2 §5 (fyra ikoner + centrerad FAB).
 * Aktiv flik styrs av nuvarande pathname. FAB leder till bokning.
 */

type NavItem = {
  href: string;
  label: string;
  svg: React.ReactNode;
  // Pathname-prefix som ska räknas som aktivt för denna flik.
  // Exempel: /hem matchar både /hem och /hem/nagot.
  matchPrefix?: string;
};

const items: NavItem[] = [
  {
    href: "/hem",
    label: "Hem",
    matchPrefix: "/hem",
    svg: (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12l9-9 9 9" />
        <path d="M5 10v10h14V10" />
      </svg>
    ),
  },
  {
    href: "/mina-bokningar",
    label: "Mina bokningar",
    matchPrefix: "/mina-bokningar",
    svg: (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x={3} y={4} width={18} height={18} rx={2} />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    href: "/boka",
    label: "Utforska pass",
    matchPrefix: "/boka",
    svg: (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={11} cy={11} r={8} />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
  },
  {
    href: "/min-hund",
    label: "Min hund",
    matchPrefix: "/min-hund",
    svg: (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={12} cy={8} r={4} />
        <path d="M4 21v-1a7 7 0 0 1 14 0v1" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname() || "/";

  return (
    <nav
      aria-label="Huvudnavigation"
      className="absolute bottom-0 inset-x-0 h-20 flex justify-around items-center pb-3 px-6 z-[5]"
      style={{
        background:
          "linear-gradient(to top, rgba(253,252,249,1) 60%, rgba(253,252,249,0))",
      }}
    >
      {/* Första två ikoner */}
      {items.slice(0, 2).map((item) => {
        const active = isActive(pathname, item);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "text-sage-600 opacity-100"
                : "text-charcoal-900 opacity-50 hover:opacity-75 transition-opacity"
            }
          >
            {item.svg}
          </Link>
        );
      })}

      {/* FAB */}
      <Link
        href="/boka"
        aria-label="Boka nytt pass"
        className="w-[60px] h-[60px] rounded-full bg-action-primary flex items-center justify-center -mt-7 transition-transform duration-200 ease-spring active:scale-90 active:-rotate-3 shadow-lg shadow-sage-500/30"
      >
        <Icon.Plus size={24} className="text-bone-50" strokeWidth={2.5} />
      </Link>

      {/* Sista två ikoner */}
      {items.slice(2).map((item) => {
        const active = isActive(pathname, item);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "text-sage-600 opacity-100"
                : "text-charcoal-900 opacity-50 hover:opacity-75 transition-opacity"
            }
          >
            {item.svg}
          </Link>
        );
      })}
    </nav>
  );
}

function isActive(pathname: string, item: NavItem): boolean {
  if (!item.matchPrefix) return pathname === item.href;
  if (item.matchPrefix === "/hem") {
    return pathname === "/" || pathname.startsWith("/hem");
  }
  return pathname === item.matchPrefix || pathname.startsWith(item.matchPrefix + "/");
}

/**
 * Inline-SVG ikoner i Phosphor-stil (regular weight).
 * Använder vi för att slippa pakethantering och hålla bundle litet.
 * Lägg till fler vid behov, behåll stroke-width 2 som default.
 */

type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

function Svg({
  size = 24,
  className = "",
  strokeWidth = 2,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const Icon = {
  ArrowRight: (p: IconProps) => (
    <Svg {...p}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </Svg>
  ),
  ArrowLeft: (p: IconProps) => (
    <Svg {...p}>
      <path d="M19 12H5M11 19l-7-7 7-7" />
    </Svg>
  ),
  Bell: (p: IconProps) => (
    <Svg {...p}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </Svg>
  ),
  Check: (p: IconProps) => (
    <Svg {...p}>
      <polyline points="20 6 9 17 4 12" />
    </Svg>
  ),
  ChevronRight: (p: IconProps) => (
    <Svg {...p}>
      <path d="M9 18l6-6-6-6" />
    </Svg>
  ),
  ChevronDown: (p: IconProps) => (
    <Svg {...p}>
      <path d="M6 9l6 6 6-6" />
    </Svg>
  ),
  Plus: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  ),
  Clock: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </Svg>
  ),
  Play: (p: IconProps) => (
    <Svg {...p}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </Svg>
  ),
  Heart: (p: IconProps) => (
    <Svg {...p}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Svg>
  ),
  Star: (p: IconProps) => (
    <Svg {...p}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </Svg>
  ),
  Paw: (p: IconProps) => (
    <Svg {...p} strokeWidth={0}>
      <ellipse cx="6" cy="14" rx="2.5" ry="3" fill="currentColor" />
      <ellipse cx="18" cy="14" rx="2.5" ry="3" fill="currentColor" />
      <ellipse cx="9" cy="8" rx="2" ry="2.5" fill="currentColor" />
      <ellipse cx="15" cy="8" rx="2" ry="2.5" fill="currentColor" />
      <path d="M12 13c-3 0-5 2.5-5 5s2 3 5 3 5-1 5-3-2-5-5-5z" fill="currentColor" />
    </Svg>
  ),
};

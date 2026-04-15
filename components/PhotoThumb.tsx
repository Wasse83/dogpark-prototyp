/**
 * PhotoThumb — 72×72 (default) fyrkantig thumbnail med foto eller fallback.
 * Fallback = bone-200 bg + sage-silhouette-ikon. Designsystem v0.3 §10.
 *
 * Används på SessionCard, ParkCard, MinHund m.fl. när vi inte har foto ännu.
 * När src kommer in senare: Next/Image-byte sker bara här.
 */

import { Icon } from "./Icon";

type Variant = "session" | "park" | "instructor" | "dog";

type PhotoThumbProps = {
  src?: string | null;
  alt: string;
  size?: number;
  rounded?: "xl" | "2xl" | "full";
  variant?: Variant;
  className?: string;
};

const roundedMap = {
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
} as const;

export function PhotoThumb({
  src,
  alt,
  size = 72,
  rounded = "2xl",
  variant = "session",
  className = "",
}: PhotoThumbProps) {
  const radiusClass = roundedMap[rounded];

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`${radiusClass} object-cover flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  // Fallback
  const iconSize = Math.round(size * 0.44);

  return (
    <div
      className={`${radiusClass} bg-bone-200 flex items-center justify-center flex-shrink-0 text-sage-500 ${className}`}
      style={{ width: size, height: size }}
      aria-label={alt}
      role="img"
    >
      {variant === "park" ? (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 20h18" />
          <path d="M8 20V9l4-5 4 5v11" />
          <path d="M10 20v-4h4v4" />
        </svg>
      ) : (
        <Icon.Paw size={iconSize} />
      )}
    </div>
  );
}

import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";

/**
 * 404-sida enligt voice-guiden §7: varm, inte teknisk, hund-namn när möjligt.
 * Designsystem §12 (edge cases): fallback är bone-200 bg + sage-500 hund-siluett.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">404 &middot; sidan finns inte</p>
      </div>

      <PhoneFrame>
        <div className="h-full flex flex-col items-center justify-center px-8 text-center">
          {/* Hundsiluett som fallback-illustration */}
          <div
            className="w-40 h-40 rounded-full bg-bone-200 flex items-center justify-center mb-6"
            aria-hidden="true"
          >
            <DogSilhouette />
          </div>

          <p className="text-xs font-bold tracking-wider text-rose-700 uppercase mb-3">
            404
          </p>

          <h1 className="font-display text-[28px] leading-[1.15] mb-3">
            Här nosade
            <br />
            vi oss <em className="text-sage-600 italic">vilse</em>
          </h1>

          <p className="text-sm text-text-muted mb-8 max-w-[260px]">
            Sidan du letade efter finns inte än, eller så har vi gömt
            den bakom fel buske. Tillbaka till hemplanen?
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-7 rounded-pill bg-action-primary text-bone-50 text-[15px] font-semibold transition-transform duration-150 active:scale-[0.97]"
          >
            Hem igen
          </Link>

          <Link
            href="/boka"
            className="mt-4 text-sm text-sage-600 font-semibold underline-offset-4 hover:underline"
          >
            Eller utforska pass
          </Link>
        </div>
      </PhoneFrame>
    </div>
  );
}

function DogSilhouette() {
  return (
    <svg
      width={88}
      height={88}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-sage-500"
      aria-hidden="true"
    >
      {/* Enkel hundsiluett i Phosphor-stil */}
      <path d="M14 26c0-6 4-10 10-10h16c6 0 10 4 10 10v2" />
      <path d="M14 28v12c0 4 3 7 7 7h22c4 0 7-3 7-7V28" />
      {/* Öron */}
      <path d="M14 22l-4-6 2-2 6 4" />
      <path d="M50 22l4-6-2-2-6 4" />
      {/* Nos */}
      <path d="M28 34h8" />
      <circle cx={32} cy={33} r={1.4} fill="currentColor" />
      {/* Ögon */}
      <circle cx={24} cy={28} r={1.2} fill="currentColor" />
      <circle cx={40} cy={28} r={1.2} fill="currentColor" />
      {/* Tass-liten topp */}
      <path d="M24 47v4M40 47v4" />
    </svg>
  );
}

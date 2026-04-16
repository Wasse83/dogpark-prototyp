/**
 * HeroPhoto — 4:5 fotokort med ken-burns och gradient-overlay.
 * Används som första vy på hemskärmen (v0.5).
 *
 * Versionstagg: v0.5 §1.
 * Designregel: Hero-kursivens färg är ljus-beige här (inte sage-600), eftersom
 * texten ligger på mörk bildbotten. Sage-regeln från v0.3/v0.4 gäller på
 * ljusa ytor — detta är dokumenterat undantag för foto-hero.
 */

import Link from "next/link";
import { Icon } from "@/components/Icon";

type HeroPhotoProps = {
  photoUrl?: string;
  photoAlt: string;
  kicker: string; // "Pass 7 av 10 · Lydnad nivå 2"
  titleLead: string; // "Dags för"
  titleAccent: string; // "inkallning i park"
  subtitle: string; // "Tisdag 16 april · 18:00 · Uddevalla park"
  ctaLabel: string;
  ctaHref: string;
};

export function HeroPhoto({
  photoUrl,
  photoAlt,
  kicker,
  titleLead,
  titleAccent,
  subtitle,
  ctaLabel,
  ctaHref,
}: HeroPhotoProps) {
  return (
    <div className="relative mx-5 rounded-[22px] overflow-hidden bg-gradient-to-b from-sage-400 to-sage-800 aspect-[4/5]">
      {photoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoUrl}
          alt={photoAlt}
          className="absolute inset-0 w-full h-full object-cover animate-kenburns"
        />
      )}

      {/* Gradient-overlay för text-kontrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,23,20,0) 40%, rgba(26,23,20,0.85) 100%)",
        }}
      />

      <div className="absolute inset-0 z-[2] flex flex-col justify-between p-5 text-bone-50">
        <span
          className="self-start text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-pill border border-bone-50/20"
          style={{
            background: "rgba(253,252,249,0.15)",
            backdropFilter: "blur(8px)",
          }}
        >
          {kicker}
        </span>

        <div>
          <h1 className="font-display text-[28px] leading-[1.1] mb-1.5 tracking-tight">
            {titleLead}{" "}
            <em className="italic" style={{ color: "#E8D2B0" }}>
              {titleAccent}
            </em>
          </h1>
          <p className="text-[13px] text-bone-50/85 mb-3 leading-relaxed">
            {subtitle}
          </p>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 bg-bone-50 text-charcoal-900 text-[13px] font-semibold px-[18px] py-2.5 rounded-pill shadow-md hover:bg-white transition-colors"
          >
            {ctaLabel}
            <Icon.ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}

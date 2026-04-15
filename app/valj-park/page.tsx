import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Icon } from "@/components/Icon";
import { PhotoThumb } from "@/components/PhotoThumb";
import { getParks } from "@/lib/mock-data";

/**
 * /valj-park — välj hempark.
 * Designsystem v0.3 §14 Version C:
 *  - display-md 24px hero
 *  - 72×72 PhotoThumb (variant=park) till vänster i varje kort
 *  - Kompakt metarad, zoner på en rad
 */
export default async function ValjParkPage() {
  const parks = await getParks();

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">Välj park</p>
      </div>

      <PhoneFrame>
        <div className="h-full overflow-y-auto px-5 pb-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/"
              aria-label="Tillbaka"
              className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
            >
              <Icon.ArrowLeft size={18} />
            </Link>
            <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase">
              Steg 1 av 3
            </p>
            <div className="w-9" aria-hidden="true" />
          </div>

          {/* Hero — display-md 24px, Version C */}
          <div className="mb-4">
            <h1 className="font-display text-[24px] leading-[1.15]">
              Vilken park blir er{" "}
              <em className="text-rose-700 italic">hemma</em>?
            </h1>
            <p className="text-[13px] text-text-muted mt-1">
              {parks.length} parker · Du kan byta när du vill
            </p>
          </div>

          {/* Park-lista */}
          <div className="stagger flex flex-col gap-2">
            {parks.map((park) => (
              <Link
                key={park.id}
                href={`/bli-medlem?park=${park.id}`}
                aria-label={`Välj ${park.name}`}
                className="block bg-bg-surface rounded-[20px] p-3 border border-charcoal-900/[0.04] hover:border-sage-500/30 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <PhotoThumb
                      src={park.photoUrl}
                      alt={park.name}
                      size={72}
                      rounded="2xl"
                      variant="park"
                    />
                    <span
                      className="absolute bottom-1.5 left-1.5 bg-charcoal-900/80 text-bone-50 text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded-pill"
                      aria-hidden="true"
                    >
                      {park.city.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <h2 className="font-semibold text-[14px] leading-tight truncate">
                        {park.name}
                      </h2>
                      <Icon.ChevronRight
                        size={16}
                        className="text-text-muted flex-shrink-0 mt-0.5"
                      />
                    </div>
                    <p className="text-[12px] text-text-muted leading-snug truncate">
                      {park.sizeSqm.toLocaleString("sv-SE")} kvm ·{" "}
                      {park.instructors} instruktör
                      {park.instructors === 1 ? "" : "er"} · Öppen{" "}
                      {park.openedYear}
                    </p>
                    <p className="text-[11px] text-text-muted leading-snug mt-1 truncate">
                      {park.zones.slice(0, 3).join(" · ")}
                      {park.zones.length > 3
                        ? ` +${park.zones.length - 3}`
                        : ""}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Sekundär CTA */}
          <div className="mt-5 text-center">
            <Link
              href="/"
              className="text-[13px] text-text-muted hover:text-sage-600 transition-colors"
            >
              Jag bestämmer senare
            </Link>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

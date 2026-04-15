import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Icon } from "@/components/Icon";
import { getParks } from "@/lib/mock-data";

/**
 * /valj-park — välj hempark.
 * Enligt designsystem §5: kort-variant "surface", pill-taggar för zoner,
 * hero med andra raden i rose-italic. Voice: varm, inte teknisk.
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
          <div className="flex items-center justify-between mb-6">
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

          {/* Hero */}
          <div className="mb-7">
            <h1 className="font-display text-[28px] leading-[1.15]">
              Vilken park blir
              <br />
              er <em className="text-rose-700 italic">hemma</em>?
            </h1>
            <p className="text-sm text-text-muted mt-3">
              Du kan byta när du vill. Medlemskapet funkar i alla parker.
            </p>
          </div>

          {/* Park-lista */}
          <div className="stagger flex flex-col gap-3">
            {parks.map((park) => (
              <Link
                key={park.id}
                href={`/bli-medlem?park=${park.id}`}
                aria-label={`Välj ${park.name}`}
                className="block bg-bg-surface rounded-[22px] p-4 border border-charcoal-900/[0.04] hover:border-sage-500/30 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold tracking-wider text-sage-800 uppercase mb-1">
                      {park.city}
                    </p>
                    <h2 className="font-display text-[20px] leading-tight mb-1.5">
                      {park.name}
                    </h2>
                    <p className="text-[13px] text-text-secondary mb-3">
                      {park.tagline}
                    </p>

                    {/* Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <Pill>{park.sizeSqm.toLocaleString("sv-SE")} kvm</Pill>
                      <Pill>Öppen {park.openedYear}</Pill>
                      <Pill>
                        {park.instructors} instruktör
                        {park.instructors === 1 ? "" : "er"}
                      </Pill>
                    </div>

                    {/* Zoner */}
                    <p className="text-[11px] text-text-muted">
                      {park.zones.slice(0, 3).join(" · ")}
                      {park.zones.length > 3
                        ? ` och ${park.zones.length - 3} till`
                        : ""}
                    </p>
                  </div>
                  <Icon.ChevronRight
                    size={18}
                    className="text-text-muted mt-1 flex-shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Sekundär CTA */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-text-muted hover:text-sage-600 transition-colors"
            >
              Jag bestämmer senare
            </Link>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-pill bg-sage-100 text-sage-800 text-[11px] font-semibold px-2.5 py-1">
      {children}
    </span>
  );
}

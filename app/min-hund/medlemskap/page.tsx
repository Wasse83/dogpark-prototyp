import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Icon } from "@/components/Icon";
import { getDogProfile } from "@/lib/mock-data";

/**
 * /min-hund/medlemskap — hantera medlemskap.
 * Version C: 24px hero, aktivt medlemskap-kort, uppgradera/pausa/avsluta.
 */

const tierCompare: Array<{ name: string; id: string; price: number }> = [
  { name: "BAS", id: "bas", price: 349 },
  { name: "PLUS", id: "plus", price: 549 },
  { name: "PREMIUM", id: "premium", price: 849 },
];

function formatRenewDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function MedlemskapPage() {
  const profile = await getDogProfile();
  const current = profile.membership;

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">Medlemskap</p>
      </div>

      <PhoneFrame>
        <div className="h-full overflow-y-auto px-5 pb-8 pt-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/min-hund"
              aria-label="Tillbaka till Min hund"
              className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
            >
              <Icon.ArrowLeft size={18} />
            </Link>
          </div>

          {/* Hero */}
          <div className="mb-4">
            <h1 className="font-display text-[24px] leading-[1.15]">
              Ert{" "}
              <em className="text-sage-600 italic">medlemskap</em>
            </h1>
            <p className="text-[13px] text-text-muted mt-1">
              {current.parkName} · medlem sedan {profile.dog.memberSince}
            </p>
          </div>

          {/* Aktivt kort */}
          <div className="bg-charcoal-900 text-bone-50 rounded-[20px] p-4 mb-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[11px] font-bold tracking-wider text-text-on-inverse-muted uppercase">
                  Aktivt medlemskap
                </p>
                <p className="font-display text-[28px] leading-none mt-1">
                  {current.tierName}
                </p>
              </div>
              <span className="font-display text-[18px] text-sage-500 leading-none mt-1">
                {current.pricePerMonth} kr/mån
              </span>
            </div>
            <p className="text-[12px] text-text-on-inverse-muted leading-snug">
              Förnyas {formatRenewDate(current.renewsAt)}. Avslutas närsomhelst
              utan uppsägningstid.
            </p>
          </div>

          {/* Jämför nivåer */}
          <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2">
            Ändra nivå
          </p>
          <div className="flex flex-col gap-2 mb-5">
            {tierCompare.map((t) => {
              const active = t.id === current.tierId;
              return (
                <div
                  key={t.id}
                  className={`rounded-[14px] p-3 border flex items-center justify-between ${
                    active
                      ? "bg-sage-100 border-sage-500/40"
                      : "bg-bg-surface border-charcoal-900/[0.04]"
                  }`}
                >
                  <div>
                    <p
                      className={`text-[13px] font-bold tracking-wider ${
                        active ? "text-sage-800" : "text-charcoal-900"
                      }`}
                    >
                      {t.name}
                    </p>
                    <p className="text-[11px] text-text-muted mt-0.5">
                      {t.price} kr/mån
                    </p>
                  </div>
                  {active ? (
                    <span className="text-[11px] font-bold tracking-wider text-sage-800 uppercase flex items-center gap-1">
                      <Icon.Check size={14} />
                      Nuvarande
                    </span>
                  ) : (
                    <Link
                      href="/bli-medlem"
                      className="text-[12px] font-semibold text-sage-800 hover:text-sage-600 transition-colors"
                    >
                      Byt
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Åtgärder */}
          <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2">
            Pausa eller avsluta
          </p>
          <div className="flex flex-col gap-2 mb-6">
            <ActionRow
              label="Pausa medlemskapet"
              helper="I upp till 3 månader. Förlänger automatiskt förnyelsedatum."
              accent="bone"
            />
            <ActionRow
              label="Avsluta medlemskapet"
              helper="Gäller till nästa förnyelsedatum. Inga avgifter efter det."
              accent="rose"
            />
          </div>

          <p className="text-[11px] text-text-muted text-center">
            Frågor? Skriv till Anna i appen, eller{" "}
            <span className="underline decoration-dotted">
              hej@dogpark.se
            </span>
            .
          </p>
        </div>
      </PhoneFrame>
    </div>
  );
}

function ActionRow({
  label,
  helper,
  accent,
}: {
  label: string;
  helper: string;
  accent: "bone" | "rose";
}) {
  return (
    <button
      type="button"
      className="w-full bg-bg-surface rounded-[14px] border border-charcoal-900/[0.04] p-3 flex items-center justify-between hover:bg-bone-100 transition-colors text-left"
    >
      <div className="flex-1 min-w-0 mr-3">
        <p
          className={`text-[13px] font-semibold leading-tight ${
            accent === "rose" ? "text-rose-700" : "text-charcoal-900"
          }`}
        >
          {label}
        </p>
        <p className="text-[11px] text-text-muted leading-snug mt-0.5">
          {helper}
        </p>
      </div>
      <Icon.ChevronRight size={16} />
    </button>
  );
}

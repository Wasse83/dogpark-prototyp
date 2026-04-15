import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Icon } from "@/components/Icon";
import {
  getVaccinations,
  type VaccinationRecord,
} from "@/lib/mock-data";
import { UploadButton } from "./UploadButton";

/**
 * /min-hund/vaccinationsintyg — översikt över vacciner + uppladdning.
 * Version C: 24px hero, statusfärger per intyg, ladda upp nytt som primär CTA.
 */

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusMeta(status: VaccinationRecord["status"]): {
  label: string;
  chipBg: string;
  dot: string;
} {
  switch (status) {
    case "gäller":
      return {
        label: "Gäller",
        chipBg: "bg-sage-100 text-sage-800",
        dot: "bg-sage-500",
      };
    case "förnyelse-snart":
      return {
        label: "Förnyelse snart",
        chipBg: "bg-bone-200 text-text-secondary",
        dot: "bg-rose-500",
      };
    case "utgången":
      return {
        label: "Utgången",
        chipBg: "bg-rose-100 text-rose-700",
        dot: "bg-rose-500",
      };
  }
}

export default async function VaccinationsintygPage() {
  const records = await getVaccinations();
  const needsRenewal = records.filter(
    (r) => r.status === "förnyelse-snart" || r.status === "utgången",
  );

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">Vaccinationsintyg</p>
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
              Lunas{" "}
              <em className="text-sage-600 italic">vaccinationer</em>
            </h1>
            <p className="text-[13px] text-text-muted mt-1">
              Behövs för gruppass och gym. Vi kollar statusen vid inpassering.
            </p>
          </div>

          {/* Status-summering */}
          {needsRenewal.length > 0 && (
            <div className="bg-rose-100 border border-rose-700/20 rounded-[16px] p-3 mb-4 flex items-start gap-3">
              <span
                className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-[13px] font-semibold text-rose-700 leading-tight">
                  {needsRenewal.length === 1
                    ? "Ett intyg behöver ses över"
                    : `${needsRenewal.length} intyg behöver ses över`}
                </p>
                <p className="text-[12px] text-rose-700/80 mt-0.5 leading-snug">
                  Ladda upp nytt intyg innan nästa pass.
                </p>
              </div>
            </div>
          )}

          {/* Intyg-lista */}
          <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2">
            Befintliga intyg
          </p>
          <div className="flex flex-col gap-2 mb-5">
            {records.map((r) => {
              const s = statusMeta(r.status);
              return (
                <div
                  key={r.id}
                  className="bg-bg-surface rounded-[16px] border border-charcoal-900/[0.04] p-3"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-charcoal-900 leading-tight">
                        {r.name}
                      </p>
                      <p className="text-[11px] text-text-muted mt-0.5">
                        {r.short}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase rounded-pill px-2 py-0.5 flex-shrink-0 flex items-center gap-1 ${s.chipBg}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${s.dot}`}
                        aria-hidden="true"
                      />
                      {s.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-text-muted mt-2">
                    <span>Gavs {formatDate(r.lastGiven)}</span>
                    <span aria-hidden="true">·</span>
                    <span>Giltig till {formatDate(r.validUntil)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ladda upp nytt */}
          <UploadButton />

          <p className="text-[11px] text-text-muted text-center leading-snug mt-3">
            Foto, PDF eller länk från veterinären. Vi behåller intyget så länge
            medlemskapet är aktivt.
          </p>
        </div>
      </PhoneFrame>
    </div>
  );
}

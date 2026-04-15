"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Icon } from "@/components/Icon";
import {
  mockMembershipTiers,
  mockParks,
  type MembershipTier,
} from "@/lib/mock-data";

/**
 * /bli-medlem — välj BAS / PLUS / PREMIUM.
 * Enligt designsystem §5: tre kort stackade, PREMIUM highlightad med rose-accent.
 * Toggle månad/år påverkar prisraden. Voice: varm ("Välj medlemskap för Luna och dig").
 */

// Client-component wrapper kräver Suspense runt useSearchParams enligt Next 15.
export default function BliMedlemPage() {
  return (
    <Suspense fallback={null}>
      <BliMedlemContent />
    </Suspense>
  );
}

function BliMedlemContent() {
  const searchParams = useSearchParams();
  const parkId = searchParams.get("park");
  const selectedPark = mockParks.find((p) => p.id === parkId);

  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [selectedTier, setSelectedTier] = useState<MembershipTier["id"]>("plus");

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">Bli medlem</p>
      </div>

      <PhoneFrame>
        <div className="h-full overflow-y-auto px-5 pb-28">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href={selectedPark ? "/valj-park" : "/"}
              aria-label="Tillbaka"
              className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
            >
              <Icon.ArrowLeft size={18} />
            </Link>
            <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase">
              Steg 2 av 3
            </p>
            <div className="w-9" aria-hidden="true" />
          </div>

          {/* Hero */}
          <div className="mb-5">
            <h1 className="font-display text-[28px] leading-[1.15]">
              Välj medlemskap
              <br />
              för <em className="text-rose-700 italic">Luna</em> och dig
            </h1>
            {selectedPark && (
              <p className="text-sm text-text-muted mt-3">
                På {selectedPark.name}. Du kan byta park när du vill.
              </p>
            )}
            {!selectedPark && (
              <p className="text-sm text-text-muted mt-3">
                Funkar i alla Dogparker, välj hempark senare.
              </p>
            )}
          </div>

          {/* Toggle månad / år */}
          <div
            className="grid grid-cols-2 bg-bone-200 rounded-pill p-1 mb-5"
            role="tablist"
            aria-label="Välj betalrytm"
          >
            <button
              onClick={() => setBilling("monthly")}
              role="tab"
              aria-selected={billing === "monthly"}
              className={`h-9 rounded-pill text-[13px] font-semibold transition-colors ${
                billing === "monthly"
                  ? "bg-bg-surface text-charcoal-900 shadow-sm"
                  : "text-text-muted"
              }`}
            >
              Månadsvis
            </button>
            <button
              onClick={() => setBilling("annual")}
              role="tab"
              aria-selected={billing === "annual"}
              className={`h-9 rounded-pill text-[13px] font-semibold transition-colors relative ${
                billing === "annual"
                  ? "bg-bg-surface text-charcoal-900 shadow-sm"
                  : "text-text-muted"
              }`}
            >
              Årsvis
              {billing === "annual" && (
                <span className="absolute -top-1 -right-1 text-[9px] font-bold bg-rose-500 text-bone-50 px-1.5 py-0.5 rounded-pill">
                  Spara
                </span>
              )}
            </button>
          </div>

          {/* Tier-kort */}
          <div className="flex flex-col gap-3 mb-4">
            {mockMembershipTiers.map((tier) => {
              const price =
                billing === "monthly"
                  ? tier.pricePerMonth
                  : tier.pricePerMonthAnnual;
              const isSelected = selectedTier === tier.id;

              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  aria-pressed={isSelected}
                  className={`text-left bg-bg-surface rounded-[22px] p-4 border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-sage-500 shadow-md"
                      : "border-transparent hover:border-charcoal-900/[0.08]"
                  } ${tier.highlight ? "relative" : ""}`}
                >
                  {tier.highlight && (
                    <span className="absolute -top-2 right-4 text-[10px] font-bold tracking-wider bg-rose-500 text-bone-50 px-2 py-0.5 rounded-pill uppercase">
                      Populärast
                    </span>
                  )}

                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-display text-[22px] leading-none mb-1">
                        {tier.name}
                      </p>
                      <p className="text-[12px] text-text-muted">
                        {tier.tagline}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <p className="font-display text-[20px] leading-none">
                        {price}
                      </p>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">
                        kr/mån
                      </p>
                    </div>
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-[12px] text-text-secondary"
                      >
                        <CheckIcon className="text-sage-600 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-text-muted text-center leading-relaxed">
            Ingen bindningstid. Säg upp när du vill. Lokala prisavvikelser kan
            förekomma per ort.
          </p>
        </div>

        {/* Sticky bottom CTA */}
        <div className="absolute bottom-0 inset-x-0 p-4 pt-3 bg-gradient-to-t from-bone-50 via-bone-50 to-transparent">
          <Link
            href={`/onboarding/rekommendation?tier=${selectedTier}`}
            className="flex items-center justify-center h-12 rounded-pill bg-action-primary text-bone-50 text-[15px] font-semibold transition-transform duration-150 active:scale-[0.97]"
          >
            Fortsätt med{" "}
            {mockMembershipTiers.find((t) => t.id === selectedTier)?.name}
          </Link>
        </div>
      </PhoneFrame>
    </div>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

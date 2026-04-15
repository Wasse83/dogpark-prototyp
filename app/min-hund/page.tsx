import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import { getDogProfile } from "@/lib/mock-data";

/**
 * /min-hund — profil för Luna.
 * Hund + medlemskap + statistik + nästa milstolpe.
 * Server component, all data från getDogProfile().
 */

export default async function MinHundPage() {
  const profile = await getDogProfile();
  const { dog, owner, membership, stats, nextMilestone } = profile;

  const renewsDate = new Date(membership.renewsAt);
  const renewsLabel = `${renewsDate.getDate()} ${renewsDate
    .toLocaleDateString("sv-SE", { month: "long" })}`;

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">Min hund</p>
      </div>

      <PhoneFrame>
        <div className="h-full overflow-y-auto px-5 pb-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <Link
              href="/"
              aria-label="Tillbaka"
              className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
            >
              <Icon.ArrowLeft size={18} />
            </Link>
            <button
              aria-label="Inställningar"
              className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
            >
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx={12} cy={12} r={3} />
                <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
              </svg>
            </button>
          </div>

          {/* Avatar + namn */}
          <div className="flex flex-col items-center text-center mb-6">
            <div
              className="w-24 h-24 rounded-full bg-rose-500 flex items-center justify-center text-bone-50 font-bold text-4xl mb-3 animate-breathe"
              aria-label={`Avatar för ${dog.name}`}
            >
              {dog.name[0]}
            </div>
            <h1 className="font-display text-[30px] leading-[1.1]">
              {dog.name}
            </h1>
            <p className="text-[13px] text-text-muted mt-1">
              {dog.breed} · {dog.age} · {dog.weight}
            </p>
            <p className="text-[11px] text-text-muted mt-2">
              Medlem sedan {dog.memberSince} · med {owner.name}
            </p>
          </div>

          {/* Anteckning */}
          {dog.note && (
            <div className="bg-rose-100 rounded-[18px] p-3.5 mb-5 border border-rose-700/10 flex gap-2.5 items-start">
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-rose-700 flex-shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <div className="flex-1">
                <p className="text-[10px] font-bold tracking-wider text-rose-700 uppercase mb-0.5">
                  Din notering
                </p>
                <p className="text-[13px] text-text-secondary leading-snug">
                  {dog.note}
                </p>
              </div>
            </div>
          )}

          {/* Statistik-grid */}
          <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2.5">
            Sen ni började
          </p>
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            <StatCard value={stats.sessionsCompleted} label="Pass tillsammans" />
            <StatCard value={`${stats.hoursTrained} h`} label="Aktiv träningstid" />
            <StatCard value={stats.levelsUnlocked} label="Nivåer klarade" />
            <StatCard value={`${stats.streakWeeks} v`} label="Vecka i rad" />
          </div>

          {/* Nästa milstolpe */}
          <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2.5">
            Nästa milstolpe
          </p>
          <div className="bg-charcoal-900 text-bone-50 rounded-[22px] p-[18px] mb-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="font-semibold text-[15px] mb-1">
                  {nextMilestone.title}
                </p>
                <p className="text-[12px] text-text-on-inverse-muted leading-snug">
                  {nextMilestone.description}
                </p>
              </div>
              <span className="flex-shrink-0 ml-3 font-display text-[22px] leading-none text-sage-500">
                {nextMilestone.progress}%
              </span>
            </div>
            <div className="h-2 bg-charcoal-700 rounded-pill overflow-hidden">
              <div
                className="h-full bg-sage-500 rounded-pill origin-left animate-progress-fill"
                style={{ width: `${nextMilestone.progress}%` }}
              />
            </div>
          </div>

          {/* Medlemskap */}
          <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2.5">
            Medlemskap
          </p>
          <div className="bg-bg-surface rounded-[22px] p-[18px] mb-6 border border-charcoal-900/[0.04]">
            <div className="flex items-start justify-between mb-3.5">
              <div>
                <p className="text-[10px] font-bold tracking-wider text-sage-800 uppercase mb-1">
                  Aktivt
                </p>
                <p className="font-display text-[22px] leading-none mb-1">
                  {membership.tierName}
                </p>
                <p className="text-[12px] text-text-muted">
                  {membership.parkName}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-[20px] leading-none">
                  {membership.pricePerMonth} kr
                </p>
                <p className="text-[10px] text-text-muted mt-1">per månad</p>
              </div>
            </div>
            <div className="h-px bg-charcoal-900/[0.06] my-3" />
            <div className="flex items-center justify-between">
              <p className="text-[12px] text-text-muted">Förnyas</p>
              <p className="text-[12px] font-semibold">{renewsLabel}</p>
            </div>
          </div>

          {/* Åtgärder */}
          <div className="flex flex-col gap-2">
            <ActionRow
              label="Redigera Lunas profil"
              hint="Ras, ålder, allergier, anteckningar"
            />
            <ActionRow
              label="Hantera medlemskap"
              hint="Uppgradera, pausa eller avsluta"
            />
            <ActionRow
              label="Ladda upp vaccinationsintyg"
              hint="Krävs för gruppträning"
            />
            <ActionRow label="Logga ut" hint="" variant="muted" />
          </div>
        </div>

        <BottomNav />
      </PhoneFrame>
    </div>
  );
}

function StatCard({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <div className="bg-bg-surface rounded-[18px] p-3.5 border border-charcoal-900/[0.04]">
      <p className="font-display text-[26px] leading-none mb-1 text-sage-600">
        {value}
      </p>
      <p className="text-[11px] text-text-muted leading-snug">{label}</p>
    </div>
  );
}

function ActionRow({
  label,
  hint,
  variant = "default",
}: {
  label: string;
  hint: string;
  variant?: "default" | "muted";
}) {
  const textClass =
    variant === "muted" ? "text-text-muted" : "text-charcoal-900";
  return (
    <button
      className="w-full flex items-center justify-between bg-bg-surface rounded-[16px] p-3.5 border border-charcoal-900/[0.04] hover:border-sage-500/30 transition-colors text-left"
      type="button"
    >
      <div className="flex-1 min-w-0">
        <p className={`text-[13px] font-semibold ${textClass}`}>{label}</p>
        {hint && (
          <p className="text-[11px] text-text-muted mt-0.5">{hint}</p>
        )}
      </div>
      <Icon.ChevronRight size={16} className="text-text-muted flex-shrink-0" />
    </button>
  );
}

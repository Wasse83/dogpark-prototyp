/**
 * InstructorTip — tipskort från instruktören.
 * Knyter veckans hemmaläxa till en riktig människa, inte bara ett videoklipp.
 *
 * v0.5 §5.
 */

import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { InstructorTip as InstructorTipData } from "@/lib/mock-data";

export function InstructorTip({ tip }: { tip: InstructorTipData }) {
  return (
    <Link
      href={tip.href}
      className="block bg-bg-surface rounded-[22px] p-3.5 border border-charcoal-900/[0.04] flex items-center gap-3 hover:border-sage-500/30 transition-colors"
    >
      <InstructorAvatar
        photoUrl={tip.instructorPhotoUrl}
        initial={tip.instructorName[0]}
      />

      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold tracking-wider text-rose-700 uppercase mb-0.5">
          {tip.kicker}
        </p>
        <h4 className="font-display text-[14px] leading-[1.3] tracking-tight mb-0.5">
          {tip.title}
        </h4>
        <p className="text-[12px] text-text-muted leading-snug">
          {tip.description}
        </p>
      </div>

      <span
        className="w-[34px] h-[34px] rounded-full bg-charcoal-900 text-bone-50 flex items-center justify-center flex-shrink-0"
        aria-hidden="true"
      >
        <Icon.Play size={14} />
      </span>
    </Link>
  );
}

function InstructorAvatar({
  photoUrl,
  initial,
}: {
  photoUrl?: string;
  initial: string;
}) {
  if (photoUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={photoUrl}
        alt=""
        className="w-14 h-14 rounded-full object-cover flex-shrink-0"
      />
    );
  }
  return (
    <div
      className="w-14 h-14 rounded-full bg-sage-100 text-sage-800 flex items-center justify-center font-semibold text-lg flex-shrink-0"
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}

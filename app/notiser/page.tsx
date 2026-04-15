import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import {
  getNotifications,
  type NotificationItem,
} from "@/lib/mock-data";

/**
 * /notiser — notiscentral.
 * Version C: 24px hero, olästa har sage-dot, grupperas efter "nya" och "äldre".
 */

export default async function NotiserPage() {
  const items = await getNotifications();
  const unread = items.filter((n) => !n.read);
  const older = items.filter((n) => n.read);

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">Notiser</p>
      </div>

      <PhoneFrame>
        <div className="h-full overflow-y-auto px-5 pb-24 pt-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/"
              aria-label="Tillbaka till start"
              className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
            >
              <Icon.ArrowLeft size={18} />
            </Link>
            <button
              type="button"
              className="text-[12px] font-semibold text-sage-800 hover:text-sage-600 transition-colors"
            >
              Markera alla lästa
            </button>
          </div>

          {/* Hero */}
          <div className="mb-5">
            <h1 className="font-display text-[24px] leading-[1.15]">
              Era{" "}
              <em className="text-sage-600 italic">notiser</em>
            </h1>
            <p className="text-[13px] text-text-muted mt-1">
              {unread.length === 0
                ? "Allt läst. Fint jobbat."
                : `${unread.length} nya · ${older.length} äldre`}
            </p>
          </div>

          {unread.length > 0 && (
            <section className="mb-5">
              <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2">
                Nya
              </p>
              <div className="flex flex-col gap-2">
                {unread.map((n) => (
                  <NotificationRow key={n.id} n={n} />
                ))}
              </div>
            </section>
          )}

          {older.length > 0 && (
            <section>
              <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2">
                Äldre
              </p>
              <div className="flex flex-col gap-2">
                {older.map((n) => (
                  <NotificationRow key={n.id} n={n} />
                ))}
              </div>
            </section>
          )}
        </div>

        <BottomNav />
      </PhoneFrame>
    </div>
  );
}

function NotificationRow({ n }: { n: NotificationItem }) {
  const typeLabel: Record<NotificationItem["type"], string> = {
    "påminnelse": "Påminnelse",
    "nytt-pass": "Nytt pass",
    "milstolpe": "Milstolpe",
    "meddelande": "Meddelande",
  };
  const typeBg: Record<NotificationItem["type"], string> = {
    "påminnelse": "bg-bone-200 text-text-secondary",
    "nytt-pass": "bg-sage-100 text-sage-800",
    "milstolpe": "bg-rose-100 text-rose-700",
    "meddelande": "bg-charcoal-900 text-bone-50",
  };

  const card = (
    <div
      className={`relative rounded-[16px] p-3 border flex gap-3 items-start transition-colors ${
        n.read
          ? "bg-bg-surface border-charcoal-900/[0.04]"
          : "bg-bg-surface border-sage-500/30 shadow-sm"
      }`}
    >
      {!n.read && (
        <span
          className="absolute top-3.5 left-[-4px] w-2 h-2 rounded-full bg-sage-500"
          aria-label="Oläst"
        />
      )}
      <span
        className={`text-[10px] font-bold tracking-wider uppercase rounded-pill px-2 py-0.5 flex-shrink-0 mt-0.5 ${typeBg[n.type]}`}
      >
        {typeLabel[n.type]}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-charcoal-900 leading-tight">
          {n.title}
        </p>
        <p className="text-[12px] text-text-muted mt-0.5 leading-snug">
          {n.body}
        </p>
        <p className="text-[11px] text-text-muted mt-1">{n.ago} sedan</p>
      </div>
    </div>
  );

  if (n.href) {
    return (
      <Link href={n.href} aria-label={n.title}>
        {card}
      </Link>
    );
  }
  return card;
}

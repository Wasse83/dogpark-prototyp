"use client";

import { useState } from "react";
import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Icon } from "@/components/Icon";

/**
 * /dela — share sheet.
 * Version C: 24px hero, delningsalternativ i ikongrid, kopiera-länk som primär.
 */

const shareOptions: Array<{
  id: string;
  label: string;
  helper: string;
  accent: "bone" | "sage" | "rose" | "charcoal";
}> = [
  { id: "sms", label: "SMS", helper: "Till matte eller husse", accent: "bone" },
  { id: "whatsapp", label: "WhatsApp", helper: "Hundgänget", accent: "sage" },
  {
    id: "messenger",
    label: "Messenger",
    helper: "Familjen",
    accent: "charcoal",
  },
  {
    id: "instagram",
    label: "Instagram",
    helper: "Story eller DM",
    accent: "rose",
  },
];

export default function DelaPage() {
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://dogpark.se/r/luna-snifferquest-5";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Prototypen har ingen fallback, tyst fel.
    }
  };

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">Dela</p>
      </div>

      <PhoneFrame>
        <div className="h-full flex flex-col px-5 pb-6 pt-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/boka"
              aria-label="Tillbaka till pass"
              className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
            >
              <Icon.ArrowLeft size={18} />
            </Link>
          </div>

          {/* Hero */}
          <div className="mb-4">
            <h1 className="font-display text-[24px] leading-[1.15]">
              Skicka{" "}
              <em className="text-sage-600 italic">passet</em> vidare
            </h1>
            <p className="text-[13px] text-text-muted mt-1">
              En vän, familjen eller hundgänget. De öppnar länken direkt i sin
              app.
            </p>
          </div>

          {/* Förhandsvisning */}
          <div className="bg-charcoal-900 text-bone-50 rounded-[20px] p-4 mb-5">
            <p className="text-[11px] font-bold tracking-wider text-text-on-inverse-muted uppercase">
              Förhandsvisning
            </p>
            <p className="font-display text-[20px] leading-tight mt-1">
              Nosework: Tidspress med Anna
            </p>
            <p className="text-[12px] text-text-on-inverse-muted mt-1">
              22 april 18:00 · Dogpark Uppsala · 1 plats kvar
            </p>
          </div>

          {/* Kopiera-länk (primär) */}
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Kopiera delbar länk"
            className={`w-full inline-flex items-center justify-between gap-2 h-12 px-4 rounded-pill text-[13px] font-semibold transition-transform duration-150 active:scale-[0.97] mb-4 ${
              copied
                ? "bg-sage-100 text-sage-800 border border-sage-500/40"
                : "bg-bg-surface text-charcoal-900 border border-charcoal-900/10"
            }`}
          >
            <span className="truncate">
              {copied ? "Länk kopierad" : shareUrl}
            </span>
            {copied ? <Icon.Check size={16} /> : <CopyIcon size={16} />}
          </button>

          {/* Delningsalternativ */}
          <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-3">
            Eller skicka direkt
          </p>
          <div className="grid grid-cols-4 gap-3 mb-auto">
            {shareOptions.map((o) => (
              <button
                key={o.id}
                type="button"
                aria-label={`Dela via ${o.label}`}
                className="flex flex-col items-center gap-1.5 p-2 rounded-[14px] hover:bg-bone-100 transition-colors"
              >
                <span
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-[13px] font-bold ${accentClass(o.accent)}`}
                  aria-hidden="true"
                >
                  {o.label.slice(0, 2)}
                </span>
                <span className="text-[11px] font-semibold text-charcoal-900 leading-tight text-center">
                  {o.label}
                </span>
                <span className="text-[10px] text-text-muted leading-tight text-center">
                  {o.helper}
                </span>
              </button>
            ))}
          </div>

          {/* Avbryt */}
          <Link
            href="/boka"
            className="inline-flex items-center justify-center h-12 px-6 rounded-pill bg-bone-100 text-charcoal-900 text-[13px] font-semibold hover:bg-bone-200 transition-colors mt-4"
          >
            Avbryt
          </Link>
        </div>
      </PhoneFrame>
    </div>
  );
}

function accentClass(accent: "bone" | "sage" | "rose" | "charcoal"): string {
  switch (accent) {
    case "sage":
      return "bg-sage-100 text-sage-800";
    case "rose":
      return "bg-rose-100 text-rose-700";
    case "charcoal":
      return "bg-charcoal-900 text-bone-50";
    default:
      return "bg-bone-200 text-text-secondary";
  }
}

function CopyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

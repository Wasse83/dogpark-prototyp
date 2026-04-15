"use client";

import { useState } from "react";
import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Icon } from "@/components/Icon";

/**
 * /logga-ut — bekräftelsesteg före utloggning.
 * Version C: 24px hero, tydlig primär/sekundär, vänlig ton.
 */

export default function LoggaUtPage() {
  const [loggedOut, setLoggedOut] = useState(false);

  if (loggedOut) {
    return (
      <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
        <div className="text-center">
          <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
            Dogpark medlemsapp
          </p>
          <p className="text-sm text-text-muted mt-1">Utloggad</p>
        </div>

        <PhoneFrame>
          <div className="h-full flex flex-col items-center justify-center text-center px-5 pb-8 pt-6">
            <div
              className="w-20 h-20 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 mb-5"
              aria-hidden="true"
            >
              <Icon.Check size={36} />
            </div>
            <h1 className="font-display text-[24px] leading-[1.15] mb-2">
              Vi ses snart igen
            </h1>
            <p className="text-[13px] text-text-muted leading-relaxed max-w-[260px] mb-6">
              Luna är kvar hos er, medlemskapet pausas inte. Logga in när ni
              vill.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center h-12 px-6 rounded-pill bg-action-primary text-bone-50 text-[14px] font-semibold transition-transform duration-150 active:scale-[0.97] w-full"
            >
              Till startsidan
            </Link>
          </div>
        </PhoneFrame>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">Logga ut</p>
      </div>

      <PhoneFrame>
        <div className="h-full flex flex-col px-5 pb-8 pt-6">
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
          <div className="flex-1 flex flex-col items-center justify-center text-center -mt-4">
            <div
              className="w-20 h-20 rounded-full bg-bone-200 flex items-center justify-center text-text-secondary mb-5"
              aria-hidden="true"
            >
              <Icon.Paw size={36} />
            </div>
            <h1 className="font-display text-[24px] leading-[1.15] mb-2">
              Vill ni{" "}
              <em className="text-sage-600 italic">logga ut</em>?
            </h1>
            <p className="text-[13px] text-text-muted leading-relaxed max-w-[280px]">
              Ni loggar in igen med samma mejl nästa gång. Lunas profil och
              medlemskap ligger kvar.
            </p>
          </div>

          {/* Åtgärder */}
          <div className="flex flex-col gap-2 mt-4">
            <button
              type="button"
              onClick={() => setLoggedOut(true)}
              className="inline-flex items-center justify-center h-12 px-6 rounded-pill bg-rose-700 text-bone-50 text-[14px] font-semibold transition-transform duration-150 active:scale-[0.97]"
            >
              Logga ut
            </button>
            <Link
              href="/min-hund"
              className="inline-flex items-center justify-center h-12 px-6 rounded-pill bg-bone-100 text-charcoal-900 text-[14px] font-semibold hover:bg-bone-200 transition-colors"
            >
              Nej, stanna kvar
            </Link>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Icon } from "@/components/Icon";

/**
 * /installningar — toggle-baserad inställningssida.
 * Version C: 24px hero, grupperad lista, tydlig tillbakaknapp.
 */

type ToggleKey =
  | "passPaminnelse"
  | "veckansOvning"
  | "nyaPass"
  | "meddelandenFranInstruktor"
  | "marknad"
  | "dataDela";

const initialToggles: Record<ToggleKey, boolean> = {
  passPaminnelse: true,
  veckansOvning: true,
  nyaPass: false,
  meddelandenFranInstruktor: true,
  marknad: false,
  dataDela: true,
};

const sections: Array<{
  title: string;
  items: Array<{ key: ToggleKey; label: string; helper: string }>;
}> = [
  {
    title: "Notiser",
    items: [
      {
        key: "passPaminnelse",
        label: "Passpåminnelser",
        helper: "Dagen innan och 2 timmar innan.",
      },
      {
        key: "veckansOvning",
        label: "Veckans övning",
        helper: "När hemmaläxan ligger uppe.",
      },
      {
        key: "nyaPass",
        label: "Nya pass släpps",
        helper: "Om ett nytt pass dyker upp i er park.",
      },
      {
        key: "meddelandenFranInstruktor",
        label: "Meddelanden från instruktören",
        helper: "Anna och de andra.",
      },
    ],
  },
  {
    title: "Integritet",
    items: [
      {
        key: "marknad",
        label: "Marknadsföring",
        helper: "Tips, erbjudanden, events.",
      },
      {
        key: "dataDela",
        label: "Dela träningsdata med instruktör",
        helper: "Hjälper Anna att skräddarsy passen.",
      },
    ],
  },
];

export default function InstallningarPage() {
  const [toggles, setToggles] =
    useState<Record<ToggleKey, boolean>>(initialToggles);

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">Inställningar</p>
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
          <div className="mb-5">
            <h1 className="font-display text-[24px] leading-[1.15]">
              Era <em className="text-sage-600 italic">val</em>
            </h1>
            <p className="text-[13px] text-text-muted mt-1">
              Notiser, språk, integritet. Allt går att ändra när ni vill.
            </p>
          </div>

          {/* Språkval */}
          <div className="bg-bg-surface rounded-[16px] border border-charcoal-900/[0.04] p-3 mb-5 flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold text-charcoal-900">
                Språk
              </p>
              <p className="text-[11px] text-text-muted mt-0.5">
                Svenska, engelska kommer i sommar.
              </p>
            </div>
            <span className="text-[12px] font-bold text-text-secondary bg-bone-100 rounded-pill px-3 py-1">
              Svenska
            </span>
          </div>

          {/* Sektioner */}
          {sections.map((section) => (
            <section key={section.title} className="mb-5">
              <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2">
                {section.title}
              </p>
              <div className="bg-bg-surface rounded-[16px] border border-charcoal-900/[0.04] overflow-hidden">
                {section.items.map((item, i) => (
                  <div
                    key={item.key}
                    className={`flex items-center gap-3 p-3 ${
                      i > 0 ? "border-t border-charcoal-900/[0.04]" : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor={`tog-${item.key}`}
                        className="text-[13px] font-semibold text-charcoal-900 leading-tight"
                      >
                        {item.label}
                      </label>
                      <p className="text-[11px] text-text-muted leading-tight mt-0.5">
                        {item.helper}
                      </p>
                    </div>
                    <Toggle
                      id={`tog-${item.key}`}
                      checked={toggles[item.key]}
                      onChange={() =>
                        setToggles((t) => ({ ...t, [item.key]: !t[item.key] }))
                      }
                      label={item.label}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Sekundära länkar */}
          <div className="flex flex-col gap-2 mb-6">
            <Link
              href="/min-hund/medlemskap"
              className="flex items-center justify-between bg-bg-surface rounded-[14px] border border-charcoal-900/[0.04] p-3 hover:bg-bone-100 transition-colors"
            >
              <span className="text-[13px] font-semibold text-charcoal-900">
                Medlemskap
              </span>
              <Icon.ChevronRight size={16} />
            </Link>
            <Link
              href="/logga-ut"
              className="flex items-center justify-between bg-bg-surface rounded-[14px] border border-charcoal-900/[0.04] p-3 hover:bg-bone-100 transition-colors"
            >
              <span className="text-[13px] font-semibold text-rose-700">
                Logga ut
              </span>
              <Icon.ChevronRight size={16} />
            </Link>
          </div>

          <p className="text-[11px] text-text-muted text-center">
            Version 0.4 · prototyp
          </p>
        </div>
      </PhoneFrame>
    </div>
  );
}

function Toggle({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  // Flex-positionering istället för absolute+translate. Håller tumen
  // deterministiskt inuti spåret oavsett browser-defaults på
  // button-padding eller static-position för absolute-barn utan left.
  // Spårets px-[3px] garanterar att tumen aldrig vidrör spårets kant.
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`flex-shrink-0 inline-flex items-center w-11 h-[26px] px-[3px] rounded-full transition-colors duration-200 ${
        checked
          ? "bg-sage-500 justify-end"
          : "bg-bone-200 justify-start"
      }`}
    >
      <span
        aria-hidden="true"
        className="block w-5 h-5 rounded-full bg-bone-50 shadow-[0_1px_2px_rgba(26,23,20,0.15)] transition-all"
      />
    </button>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

export default function OnboardingStep1() {
  const router = useRouter();
  const [name, setName] = useState("Luna");

  const handleContinue = () => {
    // I en riktig app sparar vi state i context/store, här bara navigerar vi.
    router.push("/onboarding/om-din-hund");
  };

  return (
    <div className="h-full flex flex-col">
      <ProgressBar percent={33} className="mx-5 mb-3.5" />

      <div className="px-5 mb-2 flex justify-between items-center">
        <span className="text-[11px] font-bold tracking-wider text-text-muted">
          STEG 1 AV 3
        </span>
        <Link
          href="/"
          className="text-xs text-text-muted hover:text-sage-600 transition-colors"
        >
          Hoppa över
        </Link>
      </div>

      <div className="px-5 pt-8 flex-1 flex flex-col stagger">
        <div className="mb-5">
          <div className="w-16 h-16 rounded-[20px] bg-sage-100 flex items-center justify-center text-sage-600">
            <Icon.Paw size={32} />
          </div>
        </div>

        <h1 className="font-display text-[30px] leading-[1.15] mb-2">
          Välkommen
          <br />
          till Dogpark.
        </h1>

        <p className="text-sm leading-relaxed text-text-muted mb-7">
          Vi börjar med det viktigaste, vad heter din nya bästis?
        </p>

        <div className="mb-3">
          <label
            htmlFor="dogName"
            className="text-[11px] font-semibold tracking-wide text-text-muted block mb-1.5"
          >
            HUNDENS NAMN
          </label>
          <input
            id="dogName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            className="w-full px-4 py-3.5 rounded-[14px] border-[1.5px] border-charcoal-900/[0.12] bg-white text-base text-charcoal-900 focus:border-sage-600 focus:outline-none focus:shadow-[0_0_0_3px_rgba(143,166,137,0.15)]"
          />
        </div>

        <p className="text-xs text-text-muted leading-relaxed">
          Du kan lägga till fler hundar senare om ni är flera i familjen.
        </p>

        <div className="flex-1" />

        <Button
          fullWidth
          onClick={handleContinue}
          disabled={!name.trim()}
          iconRight={<Icon.ArrowRight size={16} strokeWidth={2.5} />}
        >
          Fortsätt
        </Button>
      </div>
    </div>
  );
}

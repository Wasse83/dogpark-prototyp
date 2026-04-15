"use client";

import { ReactNode } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">Onboarding-flöde</p>
      </div>

      <PhoneFrame>{children}</PhoneFrame>
    </div>
  );
}

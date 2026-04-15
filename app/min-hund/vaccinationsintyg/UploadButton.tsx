"use client";

import { Icon } from "@/components/Icon";

export function UploadButton() {
  return (
    <button
      type="button"
      onClick={() =>
        alert("Uppladdning kopplas mot veterinärsystem i nästa version.")
      }
      className="w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-pill bg-action-primary text-bone-50 text-[14px] font-semibold transition-transform duration-150 active:scale-[0.97]"
    >
      <Icon.Plus size={16} />
      Ladda upp nytt intyg
    </button>
  );
}

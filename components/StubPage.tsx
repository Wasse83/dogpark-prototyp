import Link from "next/link";
import { PhoneFrame } from "./PhoneFrame";
import { Icon } from "./Icon";

/**
 * StubPage — designsystem v0.3 §13 "Dead-link policy".
 * Används för funktioner vi inte byggt än men där vi redan har en tryckbar yta.
 *
 * Signalerar "medvetet ofullständigt", inte "trasigt".
 */

type StubPageProps = {
  title: string;
  body?: string;
  breadcrumb?: string; // visas ovanför telefonen
  backHref?: string;
  backLabel?: string;
};

export function StubPage({
  title,
  body = "Välkommen tillbaka om en vecka.",
  breadcrumb = "Kommer snart",
  backHref = "/",
  backLabel = "Tillbaka till start",
}: StubPageProps) {
  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">{breadcrumb}</p>
      </div>

      <PhoneFrame>
        <div className="h-full flex flex-col px-5 pb-8 pt-6">
          <Link
            href={backHref}
            aria-label="Tillbaka"
            className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
          >
            <Icon.ArrowLeft size={18} />
          </Link>

          <div className="flex-1 flex flex-col items-center justify-center text-center -mt-10">
            <div
              className="w-20 h-20 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 mb-5"
              aria-hidden="true"
            >
              <Icon.Paw size={36} />
            </div>
            <h1 className="font-display text-[24px] leading-[1.15] mb-2">
              {title}
            </h1>
            <p className="text-[14px] text-text-muted leading-relaxed max-w-[260px]">
              {body}
            </p>
          </div>

          <Link
            href={backHref}
            className="inline-flex items-center justify-center h-12 px-6 rounded-pill bg-action-primary text-bone-50 text-[14px] font-semibold transition-transform duration-150 active:scale-[0.97] w-full"
          >
            {backLabel}
          </Link>
        </div>
      </PhoneFrame>
    </div>
  );
}

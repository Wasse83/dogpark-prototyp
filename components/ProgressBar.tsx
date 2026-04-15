"use client";

type Props = {
  percent: number; // 0-100
  className?: string;
};

export function ProgressBar({ percent, className = "" }: Props) {
  return (
    <div
      className={`h-[3px] bg-charcoal-900/[0.08] rounded-pill overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-sage-600 rounded-pill origin-left animate-progress-fill"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

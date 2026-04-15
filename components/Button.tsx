"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "solid" | "outlined" | "ghost" | "accent";
type ButtonSize = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
};

/**
 * Knapp enligt designsystemet.
 * Default: solid sage, lg-storlek, pill-radius.
 * Pressed: scale(0.96), 150ms.
 *
 * Anatomi: leading-icon (valfri) + label + trailing-icon (valfri)
 * Innehåll: max 24 tecken, ingen radbryt.
 */
export function Button({
  variant = "solid",
  size = "lg",
  iconLeft,
  iconRight,
  fullWidth = false,
  className = "",
  children,
  ...rest
}: Props) {
  const sizeClasses = {
    sm: "h-10 px-5 text-sm",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-7 text-[15px]",
  }[size];

  const variantClasses = {
    solid: "bg-action-primary text-bone-50 hover:bg-action-primary-hover",
    outlined:
      "bg-transparent text-charcoal-900 border-[1.5px] border-charcoal-900 hover:bg-bone-100",
    ghost: "bg-transparent text-charcoal-900 hover:bg-bone-100",
    accent: "bg-accent-soft text-accent-on hover:bg-rose-300",
  }[variant];

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        rounded-pill font-semibold font-body
        transition-transform duration-150 ease-out
        active:scale-[0.96]
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-500
        ${sizeClasses}
        ${variantClasses}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...rest}
    >
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </button>
  );
}

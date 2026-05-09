import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-qing-ink text-qing-card shadow-soft-ink hover:bg-[#2E4D3B] active:scale-[0.98]",
  secondary:
    "border border-qing-cinnabar/30 bg-qing-card/82 text-qing-cinnabar shadow-[0_12px_30px_rgba(184,91,70,0.12)] hover:bg-white active:scale-[0.98]",
  ghost: "bg-transparent text-qing-muted hover:text-qing-ink",
};

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold tracking-[0.02em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-qing-ink/35 disabled:pointer-events-none disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

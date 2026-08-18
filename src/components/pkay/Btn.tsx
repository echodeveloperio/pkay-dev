import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

export function Btn({
  children,
  variant = "secondary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
}) {
  const variants: Record<Variant, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-hover border-transparent",
    secondary:
      "bg-card text-secondary-foreground border-border hover:border-primary/40 hover:text-foreground",
    ghost: "bg-transparent border-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
    danger: "bg-critical/10 text-critical border-critical/30 hover:bg-critical/15",
  };
  const sizes: Record<Size, string> = {
    sm: "h-7 px-2 text-[11px]",
    md: "h-8 px-3 text-[12px]",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-sm border font-medium transition-ui focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="label-mono">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-[11px] text-muted-foreground">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "h-8 w-full rounded-sm border border-border bg-card px-2 text-[12px] text-foreground placeholder:text-muted-foreground transition-ui focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none";

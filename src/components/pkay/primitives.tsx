import type { ReactNode } from "react";
import { Check, Circle, Loader2, Terminal as TerminalIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- Panel / Card ---------- */

export function Panel({
  title,
  actions,
  children,
  className,
  bodyClassName,
}: {
  title?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("flex min-h-0 flex-col panel", className)}>
      {(title || actions) && (
        <header className="flex h-10 shrink-0 items-center justify-between border-b border-border px-3">
          <span className="label-mono">{title}</span>
          <div className="flex items-center gap-1">{actions}</div>
        </header>
      )}
      <div className={cn("min-h-0 flex-1 p-3", bodyClassName)}>{children}</div>
    </section>
  );
}

/* ---------- Stat ---------- */

export function Stat({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "default" | "primary" | "critical" | "high" | "medium" | "success";
}) {
  const toneClass = {
    default: "text-foreground",
    primary: "text-primary",
    critical: "text-critical",
    high: "text-high",
    medium: "text-medium",
    success: "text-success",
  }[tone];
  return (
    <div className="panel p-4">
      <div className="label-mono">{label}</div>
      <div className={cn("mt-2 font-mono text-2xl font-semibold tabular-nums", toneClass)}>
        {value}
      </div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

/* ---------- Badge / Risk badge / Status ---------- */

export function Tag({
  children,
  variant = "neutral",
  className,
}: {
  children: ReactNode;
  variant?: "neutral" | "primary" | "outline";
  className?: string;
}) {
  const variants = {
    neutral: "bg-muted text-secondary-foreground border-border",
    primary: "bg-primary-soft text-accent-foreground border-transparent",
    outline: "bg-transparent text-muted-foreground border-border",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 font-mono text-[10px] tracking-wide uppercase",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export type Severity = "critical" | "high" | "medium" | "low" | "informational";

export function RiskBadge({ level, className }: { level: Severity; className?: string }) {
  const map: Record<Severity, string> = {
    critical: "border-critical/40 text-critical bg-critical/8",
    high: "border-high/40 text-high bg-high/8",
    medium: "border-medium/50 text-medium bg-medium/10",
    low: "border-low/40 text-low bg-low/8",
    informational: "border-border text-muted-foreground bg-muted",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-1.5 py-0.5 font-mono text-[10px] tracking-widest uppercase",
        map[level],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {level}
    </span>
  );
}

export function StatusIndicator({
  state,
  label,
}: {
  state: "online" | "busy" | "idle" | "error";
  label: string;
}) {
  const map = {
    online: "bg-success",
    busy: "bg-primary",
    idle: "bg-muted-foreground",
    error: "bg-critical",
  };
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
      <span className={cn("size-1.5 rounded-full", map[state])} />
      {label}
    </span>
  );
}

/* ---------- Code block / Terminal ---------- */

export function CodeBlock({
  code,
  filename,
  className,
}: {
  code: string;
  filename?: string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-sm border border-border bg-background-dark", className)}>
      {filename && (
        <div className="flex items-center justify-between border-b border-white/8 px-3 py-1.5">
          <span className="font-mono text-[11px] text-white/50">{filename}</span>
          <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">
            read only
          </span>
        </div>
      )}
      <pre className="overflow-x-auto p-3 font-mono text-[12px] leading-relaxed text-white/80">
        {code}
      </pre>
    </div>
  );
}

export function Terminal({ lines }: { lines: string[] }) {
  return (
    <div className="h-full overflow-auto rounded-sm border border-border bg-background-dark p-3">
      <div className="mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest text-white/40 uppercase">
        <TerminalIcon className="size-3" /> build output
      </div>
      <div className="space-y-0.5 font-mono text-[12px] text-white/70">
        {lines.map((l, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-white/25 select-none">{String(i + 1).padStart(2, "0")}</span>
            <span>{l}</span>
          </div>
        ))}
        <div className="flex gap-2">
          <span className="text-white/25 select-none">{String(lines.length + 1).padStart(2, "0")}</span>
          <span className="caret-blink text-primary">▍</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- AI message ---------- */

export function AIMessage({
  role,
  children,
  meta,
}: {
  role: "user" | "ai";
  children: ReactNode;
  meta?: string;
}) {
  if (role === "user") {
    return (
      <div className="border-l-2 border-border bg-muted/60 px-3 py-2">
        <div className="label-mono mb-1">you</div>
        <div className="text-[13px] leading-relaxed text-secondary-foreground">{children}</div>
      </div>
    );
  }
  return (
    <div className="border-l-2 border-primary bg-primary-soft/35 px-3 py-2">
      <div className="mb-1 flex items-center justify-between">
        <span className="label-mono flex items-center gap-1.5 text-accent-foreground">
          <Sparkles className="size-3" /> pkay ai
        </span>
        {meta && <span className="font-mono text-[10px] text-muted-foreground">{meta}</span>}
      </div>
      <div className="space-y-2 text-[13px] leading-relaxed text-secondary-foreground">
        {children}
      </div>
    </div>
  );
}

/* ---------- Build log ---------- */

export type BuildStep = { label: string; state: "done" | "active" | "pending" };

export function BuildLog({ steps }: { steps: BuildStep[] }) {
  return (
    <ol className="space-y-1.5 font-mono text-[12px]">
      {steps.map((s) => (
        <li key={s.label} className="flex items-center gap-2">
          {s.state === "done" && <Check className="size-3.5 text-success" />}
          {s.state === "active" && <Loader2 className="size-3.5 animate-spin text-primary" />}
          {s.state === "pending" && <Circle className="size-3.5 text-muted-foreground/50" />}
          <span
            className={cn(
              s.state === "done" && "text-secondary-foreground",
              s.state === "active" && "text-primary",
              s.state === "pending" && "text-muted-foreground/70",
            )}
          >
            {s.label}
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Security finding ---------- */

export function SecurityFinding({
  id,
  title,
  level,
  location,
  description,
}: {
  id: string;
  title: string;
  level: Severity;
  location: string;
  description: string;
}) {
  return (
    <div className="panel p-3 transition-ui hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-muted-foreground">{id}</span>
            <RiskBadge level={level} />
          </div>
          <h4 className="mt-1.5 text-sm font-semibold">{title}</h4>
        </div>
        <span className="font-mono text-[11px] whitespace-nowrap text-muted-foreground">
          {location}
        </span>
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

/* ---------- Section heading ---------- */

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        {description && (
          <p className="mt-1 max-w-2xl text-[13px] text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
}

import {
  createFileRoute,
  Link,
  Outlet,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  ArrowUp,
  Paperclip,
  Folder,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  PanelLeftClose,
  PanelRightClose,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/pkay/ThemeToggle";
import { PkayLogo } from "@/components/pkay/PkayLogo";

export const Route = createFileRoute("/security")({
  component: SecurityLayout,
});

const nav = [
  { label: "Overview", to: "/security" },
  { label: "Malware", to: "/security/malware" },
  { label: "Vulnerabilities", to: "/security/vulnerabilities" },
  { label: "Code Security", to: "/security/code" },
  { label: "Threats", to: "/security/threats" },
  { label: "AI Analyst", to: "/security/analyst" },
  { label: "Reports", to: "/security/reports" },
] as const;

const findings = [
  {
    id: "PK-1042",
    level: "high" as const,
    title: "Missing authorization check",
    loc: "src/lib/orders.functions.ts",
  },
  {
    id: "PK-1043",
    level: "high" as const,
    title: "Table exposed to anonymous reads",
    loc: "public.customer_profiles",
  },
  {
    id: "PK-1051",
    level: "medium" as const,
    title: "Dependency with known advisory",
    loc: "package.json",
  },
  {
    id: "PK-1058",
    level: "low" as const,
    title: "Missing security headers",
    loc: "deploy config",
  },
  {
    id: "PK-1060",
    level: "info" as const,
    title: "Verbose error output in preview",
    loc: "src/routes/api/webhook.ts",
  },
];

function SecurityLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const router = useRouter();
  const [aiPanelOpen, setAiPanelOpen] = useState(true);
  const [findingsOpen, setFindingsOpen] = useState(true);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="flex h-11 shrink-0 items-center gap-3 border-b border-border bg-card px-3">
        <Link to="/">
          <PkayLogo className="h-9 w-auto" />
        </Link>
        <span className="h-4 w-px bg-border" />
        <span className="label-mono">security lab</span>
        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />
          <Link
            to="/console"
            className="inline-flex h-7 items-center gap-1 rounded-sm border border-border bg-card px-2 font-mono text-[11px] text-muted-foreground transition-ui hover:border-primary/40 hover:text-foreground"
          >
            Console
          </Link>
          <div className="grid size-7 place-items-center rounded-sm bg-secondary-foreground font-mono text-[11px] text-primary-foreground">
            EK
          </div>
        </div>
      </header>

      {/* Navigation tabs */}
      <div className="flex items-center gap-0.5 border-b border-border bg-card px-3">
        {nav.map((n) => {
          const active = pathname === n.to || (n.to !== "/security" && pathname.startsWith(n.to));
          return (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "shrink-0 rounded-sm px-2.5 py-2 text-[12px] transition-ui",
                active
                  ? "bg-primary-soft text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {n.label}
            </Link>
          );
        })}
      </div>

      {/* Three-column layout */}
      <div className="flex min-h-0 flex-1">
        {/* Left — Security AI */}
        {aiPanelOpen && (
          <div className="flex w-[320px] min-w-[260px] shrink-0 flex-col border-r border-border">
            <div className="flex h-9 shrink-0 items-center justify-between border-b border-border px-3">
              <span className="label-mono flex items-center gap-1.5">
                <ShieldCheck className="size-3 text-primary" /> Security AI
              </span>
              <button
                onClick={() => setAiPanelOpen(false)}
                className="grid size-6 place-items-center rounded-sm text-muted-foreground transition-ui hover:bg-muted hover:text-foreground"
                title="Close Security AI"
              >
                <PanelLeftClose className="size-3.5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 space-y-3 overflow-auto p-3">
              <div className="border-l-2 border-border bg-muted/60 px-3 py-2">
                <div className="label-mono mb-1">you</div>
                <div className="text-[13px] leading-relaxed text-secondary-foreground">
                  Explain the missing authorization vulnerability in orders.functions.ts.
                </div>
              </div>
              <div className="border-l-2 border-primary bg-primary-soft/35 px-3 py-2">
                <div className="label-mono mb-1 flex items-center gap-1.5 text-accent-foreground">
                  <Sparkles className="size-3" /> security ai
                </div>
                <div className="space-y-2 text-[13px] leading-relaxed text-secondary-foreground">
                  <p>
                    The <code className="rounded-sm bg-background-dark px-1 py-0.5 font-mono text-[12px]">listAllOrders()</code> function lacks an auth middleware gate, allowing unauthenticated callers to read all order records.
                  </p>
                  <p className="text-[12px] text-muted-foreground">
                    <strong className="text-secondary-foreground">Mitigation:</strong> Wrap the function with the existing auth middleware and scope the query to <code className="font-mono">authenticated.user_id</code>.
                  </p>
                </div>
              </div>
            </div>
            <div className="shrink-0 border-t border-border bg-card p-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-sm border border-border bg-background px-3 py-2 text-[12px] text-muted-foreground">
                  Ask Security AI…
                </div>
                <button className="grid size-7 place-items-center rounded-sm bg-primary text-primary-foreground transition-ui hover:bg-primary-hover">
                  <ArrowUp className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Center — Security Analysis (Outlet) */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-1 border-b border-border px-2 py-1">
            {!aiPanelOpen && (
              <button
                onClick={() => setAiPanelOpen(true)}
                className="grid size-7 place-items-center rounded-sm text-muted-foreground transition-ui hover:bg-muted hover:text-foreground"
                title="Show Security AI"
              >
                <PanelLeftClose className="size-3.5 rotate-180" />
              </button>
            )}
            <span className="label-mono px-1">Security Analysis</span>
            {!findingsOpen && (
              <button
                onClick={() => setFindingsOpen(true)}
                className="ml-auto grid size-7 place-items-center rounded-sm text-muted-foreground transition-ui hover:bg-muted hover:text-foreground"
                title="Show Findings"
              >
                <PanelRightClose className="size-3.5 rotate-180" />
              </button>
            )}
          </div>
          <div className="min-h-0 flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>

        {/* Right — Findings */}
        {findingsOpen && (
          <div className="flex w-[260px] min-w-[220px] shrink-0 flex-col border-l border-border">
            <div className="flex h-9 shrink-0 items-center justify-between border-b border-border px-3">
              <span className="label-mono">Findings</span>
              <button
                onClick={() => setFindingsOpen(false)}
                className="grid size-6 place-items-center rounded-sm text-muted-foreground transition-ui hover:bg-muted hover:text-foreground"
                title="Close Findings"
              >
                <PanelRightClose className="size-3.5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto p-2">
              <div className="space-y-1.5">
                {findings.map((f) => {
                  const levelConfig = {
                    high: { icon: AlertTriangle, color: "text-high", bg: "bg-high/8" },
                    medium: { icon: AlertCircle, color: "text-medium", bg: "bg-medium/10" },
                    low: { icon: Info, color: "text-low", bg: "bg-low/8" },
                    info: { icon: CheckCircle, color: "text-muted-foreground", bg: "bg-muted" },
                  };
                  const config = levelConfig[f.level];
                  const Icon = config.icon;
                  return (
                    <button
                      key={f.id}
                      className="w-full rounded-sm border border-border p-2.5 text-left transition-ui hover:border-primary/40"
                    >
                      <div className="flex items-center gap-1.5">
                        <Icon className={cn("size-3", config.color)} />
                        <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                          {f.level}
                        </span>
                        <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                          {f.id}
                        </span>
                      </div>
                      <p className="mt-1 text-[12px] font-medium text-secondary-foreground">
                        {f.title}
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                        {f.loc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

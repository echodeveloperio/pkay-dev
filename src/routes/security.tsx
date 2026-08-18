import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AppShell } from "@/components/pkay/AppShell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/security")({
  component: SecurityLayout,
});

const nav = [
  { label: "Security Overview", to: "/security" },
  { label: "Malware Analysis", to: "/security/malware" },
  { label: "Vulnerability Analysis", to: "/security/vulnerabilities" },
  { label: "Code Security", to: "/security/code" },
  { label: "Threat Intelligence", to: "/security/threats" },
  { label: "AI Security Analyst", to: "/security/analyst" },
  { label: "Security Reports", to: "/security/reports" },
] as const;

function SecurityLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <AppShell>
      <div className="flex min-h-[calc(100vh-3rem)] flex-col xl:flex-row">
        <nav className="shrink-0 border-b border-border bg-card p-2 xl:w-56 xl:border-r xl:border-b-0">
          <div className="label-mono px-2 py-1.5">security lab</div>
          <div className="flex gap-1 overflow-x-auto xl:flex-col">
            {nav.map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "shrink-0 rounded-sm px-2 py-1.5 text-[12px] whitespace-nowrap transition-ui",
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
        </nav>
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </AppShell>
  );
}

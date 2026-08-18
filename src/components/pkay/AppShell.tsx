import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Command,
  Search,
  Plus,
  Star,
  Clock,
  ShieldAlert,
  Settings,
  LayoutDashboard,
  FolderCode,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandPalette } from "./CommandPalette";

const topNav = [
  { label: "Projects", to: "/projects" },
  { label: "AI Builder", to: "/builder" },
  { label: "Templates", to: "/templates" },
  { label: "Security Lab", to: "/security" },
  { label: "Docs", to: "/docs" },
];

const recentProjects = [
  { name: "orbit-marketing", to: "/builder" },
  { name: "vault-dashboard", to: "/builder" },
  { name: "api-status-page", to: "/builder" },
];

const favorites = [
  { name: "pkay-design-kit", to: "/templates" },
  { name: "threat-report-tpl", to: "/security/reports" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Topbar */}
      <header className="sticky top-0 z-30 flex h-12 shrink-0 items-center gap-4 border-b border-border bg-card px-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-sm bg-primary font-mono text-[11px] font-bold text-primary-foreground">
            P
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight">PKAY</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {topNav.map((item) => {
            const active = pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-sm px-2.5 py-1.5 text-[13px] transition-ui",
                  active
                    ? "bg-primary-soft text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setPaletteOpen(true)}
            className="hidden h-8 w-56 items-center gap-2 rounded-sm border border-border bg-background px-2 text-[12px] text-muted-foreground transition-ui hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none lg:flex"
          >
            <Search className="size-3.5" />
            Search projects, findings…
            <span className="ml-auto flex items-center gap-0.5 font-mono text-[10px]">
              <Command className="size-3" />K
            </span>
          </button>
          <IconButton label="Notifications">
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
          </IconButton>
          <div className="flex items-center gap-2 border-l border-border pl-2">
            <div className="hidden text-right leading-tight sm:block">
              <div className="text-[12px] font-medium">Error Kruz</div>
              <div className="font-mono text-[10px] text-muted-foreground">pro workspace</div>
            </div>
            <span className="grid size-7 place-items-center rounded-sm bg-secondary-foreground font-mono text-[11px] text-primary-foreground">
              EK
            </span>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
          <div className="p-3">
            <Link
              to="/builder"
              className="flex h-8 w-full items-center justify-center gap-1.5 rounded-sm bg-primary text-[12px] font-medium text-primary-foreground transition-ui hover:bg-primary-hover"
            >
              <Plus className="size-3.5" /> New Project
            </Link>
          </div>

          <SidebarGroup icon={<Clock className="size-3" />} title="Recent">
            {recentProjects.map((p) => (
              <SidebarLink key={p.name} to={p.to} label={p.name} mono />
            ))}
          </SidebarGroup>

          <SidebarGroup icon={<Star className="size-3" />} title="Favorites">
            {favorites.map((p) => (
              <SidebarLink key={p.name} to={p.to} label={p.name} mono />
            ))}
          </SidebarGroup>

          <SidebarGroup title="Workspace">
            <SidebarLink to="/" label="Dashboard" icon={<LayoutDashboard className="size-3.5" />} />
            <SidebarLink to="/projects" label="Projects" icon={<FolderCode className="size-3.5" />} />
            <SidebarLink to="/builder" label="AI Builder" icon={<Sparkles className="size-3.5" />} />
            <SidebarLink
              to="/security"
              label="Security Lab"
              icon={<ShieldAlert className="size-3.5" />}
            />
            <SidebarLink to="/settings" label="Settings" icon={<Settings className="size-3.5" />} />
          </SidebarGroup>

          <div className="mt-auto border-t border-border p-3">
            <div className="label-mono">system</div>
            <div className="mt-2 space-y-1.5">
              <StatusRow label="Build runners" value="operational" />
              <StatusRow label="AI gateway" value="operational" />
              <StatusRow label="Scanner" value="degraded" warn />
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>

      {/* Mobile nav */}
      <nav className="sticky bottom-0 z-30 flex h-12 items-center justify-around border-t border-border bg-card lg:hidden">
        {[
          { to: "/", label: "Home", icon: <LayoutDashboard className="size-4" /> },
          { to: "/projects", label: "Projects", icon: <FolderCode className="size-4" /> },
          { to: "/builder", label: "Build", icon: <Sparkles className="size-4" /> },
          { to: "/security", label: "Security", icon: <ShieldAlert className="size-4" /> },
          { to: "/settings", label: "Settings", icon: <Settings className="size-4" /> },
        ].map((i) => {
          const active = i.to === "/" ? pathname === "/" : pathname.startsWith(i.to);
          return (
            <Link
              key={i.to}
              to={i.to}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 text-[10px] transition-ui",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              {i.icon}
              {i.label}
            </Link>
          );
        })}
      </nav>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}

function SidebarGroup({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-border px-2 py-3">
      <div className="label-mono flex items-center gap-1.5 px-1 pb-1.5">
        {icon}
        {title}
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function SidebarLink({
  to,
  label,
  icon,
  mono,
}: {
  to: string;
  label: string;
  icon?: ReactNode;
  mono?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = to === "/" ? pathname === "/" : pathname === to;
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 rounded-sm px-2 py-1.5 text-[12px] transition-ui",
        mono && "font-mono text-[11px]",
        active
          ? "bg-primary-soft text-accent-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {icon}
      <span className="truncate">{label}</span>
    </Link>
  );
}

function StatusRow({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div className="flex items-center justify-between font-mono text-[10px]">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("flex items-center gap-1", warn ? "text-medium" : "text-success")}>
        <span className="size-1.5 rounded-full bg-current" />
        {value}
      </span>
    </div>
  );
}

export function IconButton({
  children,
  label,
  onClick,
  active,
  className,
}: {
  children: ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "relative grid size-8 place-items-center rounded-sm border transition-ui focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        active
          ? "border-primary/40 bg-primary-soft text-accent-foreground"
          : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40",
        className,
      )}
    >
      {children}
    </button>
  );
}

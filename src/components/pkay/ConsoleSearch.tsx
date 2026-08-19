import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Clock,
  FileCode,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  ShieldAlert,
  BookOpen,
  FolderCode,
  LayoutTemplate,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

const navItems = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Create a new project", to: "/builder", icon: Plus },
  { label: "Projects", to: "/projects", icon: FolderCode },
  { label: "Templates", to: "/templates", icon: LayoutTemplate },
  { label: "Security Lab", to: "/security", icon: ShieldAlert },
  { label: "Docs", to: "/docs", icon: BookOpen },
  { label: "Settings", to: "/settings", icon: Settings },
] as const;

const recent = [
  { name: "orbit-marketing", to: "/builder", updated: "4 min ago" },
  { name: "vault-dashboard", to: "/builder", updated: "1 hour ago" },
  { name: "api-status-page", to: "/builder", updated: "Yesterday" },
  { name: "saas-starter", to: "/builder", updated: "3 days ago" },
];

export function ConsoleSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const filteredNav = useMemo(
    () => navItems.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const filteredRecent = useMemo(
    () => recent.filter((i) => i.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  if (!open) return null;

  const go = (to: string) => {
    onOpenChange(false);
    navigate({ to });
  };

  const themes = [
    { key: "light", label: "Light", icon: Sun },
    { key: "dark", label: "Dark", icon: Moon },
    { key: "system", label: "System", icon: Monitor },
  ] as const;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[12vh]">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative flex w-full max-w-3xl overflow-hidden rounded-[4px] border border-border bg-card shadow-lg">
        {/* Recent projects sidebar */}
        <aside className="hidden w-52 shrink-0 flex-col border-r border-border bg-sidebar sm:flex">
          <div className="label-mono flex items-center gap-1.5 border-b border-border px-3 py-2.5">
            <Clock className="size-3" /> recent projects
          </div>
          <div className="space-y-0.5 p-2">
            {filteredRecent.length === 0 && (
              <div className="px-2 py-1.5 font-mono text-[11px] text-muted-foreground">
                no matches
              </div>
            )}
            {filteredRecent.map((p) => (
              <button
                key={p.name}
                onClick={() => go(p.to)}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left transition-ui hover:bg-muted"
              >
                <FileCode className="size-3 shrink-0 text-primary" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-mono text-[11px] text-foreground">
                    {p.name}
                  </span>
                  <span className="block truncate font-mono text-[10px] text-muted-foreground">
                    {p.updated}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Search + navigate */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-border px-3">
            <Search className="size-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, pages, actions…"
              className="h-11 w-full bg-transparent text-[13px] placeholder:text-muted-foreground focus:outline-none"
            />
            <kbd className="hidden rounded-sm border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
              esc
            </kbd>
          </div>

          <div className="max-h-[50vh] overflow-auto p-2">
            <div className="label-mono px-2 pb-1">navigate to</div>
            <div className="space-y-0.5">
              {filteredNav.length === 0 && (
                <div className="px-2 py-1.5 font-mono text-[11px] text-muted-foreground">
                  no results
                </div>
              )}
              {filteredNav.map((i) => (
                <button
                  key={i.label}
                  onClick={() => go(i.to)}
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[12px] text-muted-foreground transition-ui hover:bg-muted hover:text-foreground"
                >
                  <i.icon className="size-4 shrink-0" />
                  <span className="truncate">{i.label}</span>
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground/60">
                    {i.to}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="mt-auto border-t border-border p-2">
            <div className="label-mono px-2 pb-1.5">theme</div>
            <div className="flex gap-1 px-1 pb-1">
              {themes.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTheme(t.key)}
                  className={cn(
                    "inline-flex h-7 flex-1 items-center justify-center gap-1.5 rounded-sm border font-mono text-[11px] transition-ui",
                    theme === t.key
                      ? "border-primary/50 bg-primary-soft text-accent-foreground"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  <t.icon className="size-3.5" />
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

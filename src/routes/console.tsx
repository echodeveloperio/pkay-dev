import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  Search,
  Database,
  Plug,
  FolderCode,
  Star,
  User,
  Users,
  Clock,
  Paperclip,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  Plus,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeft,
  Settings,
  LogOut,
  Sparkles,
  ShieldAlert,
  FileCode,
  Folder,
  FolderOpen,
  X,
  Loader2,
  Check,
  Globe,
  Terminal,
  BookOpen,
  Zap,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/pkay/ThemeToggle";

export const Route = createFileRoute("/console")({
  head: () => ({
    meta: [
      { title: "Console — PKAY" },
      {
        name: "description",
        content: "PKAY Console: AI-powered development workspace.",
      },
    ],
  }),
  component: ConsoleDashboard,
});

/* ════════════════════════════════════════════════════════════════
   TYPES & DATA
   ════════════════════════════════════════════════════════════════ */

interface NavItem {
  icon: React.ElementType;
  label: string;
  shortcut?: string;
  active?: boolean;
}

interface Project {
  id: string;
  name: string;
  owner: string;
  updated: string;
  status: "live" | "draft" | "building";
  starred: boolean;
  thumbnail: "dashboard" | "landing" | "saas" | "portfolio" | "docs" | "api";
}

const mainNav: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Search, label: "Search", shortcut: "⌘K" },
  { icon: Database, label: "Resources" },
  { icon: Plug, label: "Connectors" },
];

const projectNav: NavItem[] = [
  { icon: FolderCode, label: "All Projects" },
  { icon: Star, label: "Starred" },
  { icon: User, label: "Owned by Me" },
  { icon: Users, label: "Shared with Me" },
];

const recentProjects = [
  { name: "orbit-marketing", to: "/builder" },
  { name: "vault-dashboard", to: "/builder" },
  { name: "api-status-page", to: "/builder" },
];

const projects: Project[] = [
  {
    id: "1",
    name: "Orbit Marketing",
    owner: "You",
    updated: "4 min ago",
    status: "live",
    starred: true,
    thumbnail: "landing",
  },
  {
    id: "2",
    name: "Vault Dashboard",
    owner: "You",
    updated: "1 hour ago",
    status: "building",
    starred: false,
    thumbnail: "dashboard",
  },
  {
    id: "3",
    name: "API Status Page",
    owner: "You",
    updated: "Yesterday",
    status: "live",
    starred: false,
    thumbnail: "api",
  },
  {
    id: "4",
    name: "SaaS Starter",
    owner: "You",
    updated: "3 days ago",
    status: "draft",
    starred: true,
    thumbnail: "saas",
  },
  {
    id: "5",
    name: "Portfolio Site",
    owner: "You",
    updated: "1 week ago",
    status: "live",
    starred: false,
    thumbnail: "portfolio",
  },
  {
    id: "6",
    name: "Docs Portal",
    owner: "You",
    updated: "2 weeks ago",
    status: "live",
    starred: false,
    thumbnail: "docs",
  },
];

/* ════════════════════════════════════════════════════════════════
   MAIN DASHBOARD
   ════════════════════════════════════════════════════════════════ */

function ConsoleDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-border bg-card transition-transform duration-200 lg:relative lg:z-auto lg:translate-x-0",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent onClose={() => setMobileSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-card px-4">
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setMobileSidebarOpen(true);
              } else {
                setSidebarOpen(!sidebarOpen);
              }
            }}
            className="grid size-7 place-items-center rounded-sm text-muted-foreground transition-ui hover:bg-muted hover:text-foreground"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? (
              <PanelLeftClose className="size-4" />
            ) : (
              <PanelLeft className="size-4" />
            )}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-sm bg-primary font-mono text-[11px] font-bold text-primary-foreground">
              P
            </span>
            <span className="font-mono text-[13px] font-semibold tracking-tight">
              PKAY
            </span>
          </Link>
          <span className="h-4 w-px bg-border" />
          <span className="text-[12px] text-muted-foreground">Console</span>
          <div className="ml-auto flex items-center gap-1.5">
            <button className="grid size-7 place-items-center rounded-sm text-muted-foreground transition-ui hover:bg-muted hover:text-foreground relative">
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
            </button>
            <ThemeToggle />
            <div className="flex items-center gap-2 border-l border-border pl-2">
              <span className="hidden text-right leading-tight sm:block">
                <div className="text-[12px] font-medium">Error Kruz</div>
                <div className="font-mono text-[10px] text-muted-foreground">
                  pro workspace
                </div>
              </span>
              <span className="grid size-7 place-items-center rounded-sm bg-secondary-foreground font-mono text-[11px] text-primary-foreground">
                EK
              </span>
            </div>
          </div>
        </header>

        {/* Scrollable main */}
        <main className="min-h-0 flex-1 overflow-auto">
          <div className="mx-auto max-w-5xl px-6 py-10">
            {/* Welcome */}
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Let's build something
              </h1>
              <p className="mt-2 text-[14px] text-muted-foreground">
                Describe your idea and PKAY will generate a production-ready
                application.
              </p>
            </div>

            {/* AI Build Input */}
            <div className="mx-auto mt-8 max-w-2xl">
              <AIBuildInput />
            </div>

            {/* Projects */}
            <div className="mt-14">
              <ProjectsSection />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   SIDEBAR
   ════════════════════════════════════════════════════════════════ */

function SidebarContent({ onClose }: { onClose: () => void }) {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  return (
    <>
      {/* Logo row */}
      <div className="flex h-12 items-center justify-between border-b border-border px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-sm bg-primary font-mono text-[11px] font-bold text-primary-foreground">
            P
          </span>
          <span className="font-mono text-[13px] font-semibold tracking-tight">
            PKAY
          </span>
        </Link>
        <button
          onClick={onClose}
          className="grid size-6 place-items-center rounded-sm text-muted-foreground transition-ui hover:bg-muted hover:text-foreground lg:hidden"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Workspace selector */}
      <div className="border-b border-border px-3 py-2">
        <button
          onClick={() => setWorkspaceOpen(!workspaceOpen)}
          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-[12px] transition-ui hover:bg-muted"
        >
          <span className="grid size-5 place-items-center rounded-sm bg-primary-soft font-mono text-[10px] font-bold text-accent-foreground">
            EK
          </span>
          <span className="truncate font-medium">Error Kruz</span>
          <ChevronDown
            className={cn(
              "ml-auto size-3 text-muted-foreground transition-transform",
              workspaceOpen && "rotate-180",
            )}
          />
        </button>
        {workspaceOpen && (
          <div className="mt-1 space-y-0.5 pl-7">
            {["Personal", "Team workspace", "Enterprise"].map((w) => (
              <button
                key={w}
                className="block w-full rounded-sm px-2 py-1 text-left text-[11px] text-muted-foreground transition-ui hover:bg-muted hover:text-foreground"
              >
                {w}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main nav */}
      <nav className="space-y-0.5 px-3 py-3">
        {mainNav.map((item) => (
          <SidebarNavItem key={item.label} item={item} />
        ))}
      </nav>

      {/* Projects section */}
      <div className="border-t border-border px-3 py-3">
        <div className="label-mono px-2 pb-1.5">projects</div>
        <div className="space-y-0.5">
          {projectNav.map((item) => (
            <SidebarNavItem key={item.label} item={item} />
          ))}
        </div>
      </div>

      {/* Recent */}
      <div className="border-t border-border px-3 py-3">
        <div className="label-mono flex items-center gap-1.5 px-2 pb-1.5">
          <Clock className="size-3" /> recent
        </div>
        <div className="space-y-0.5">
          {recentProjects.map((p) => (
            <Link
              key={p.name}
              to={p.to}
              className="flex items-center gap-2 rounded-sm px-2 py-1.5 font-mono text-[11px] text-muted-foreground transition-ui hover:bg-muted hover:text-foreground"
            >
              <FileCode className="size-3 shrink-0 text-primary/50" />
              <span className="truncate">{p.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-auto border-t border-border px-3 py-3">
        <div className="label-mono px-2 pb-1.5">workspace</div>
        <div className="space-y-0.5">
          <SidebarNavItem
            item={{ icon: ShieldAlert, label: "Security Lab" }}
            to="/security"
          />
          <SidebarNavItem
            item={{ icon: BookOpen, label: "Docs" }}
            to="/docs"
          />
          <SidebarNavItem
            item={{ icon: Settings, label: "Settings" }}
            to="/settings"
          />
        </div>
        <div className="mt-3 border-t border-border pt-3">
          <div className="flex items-center gap-2 px-2">
            <span className="grid size-7 place-items-center rounded-sm bg-secondary-foreground font-mono text-[11px] text-primary-foreground">
              EK
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12px] font-medium">
                Error Kruz
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">
                pro plan
              </div>
            </div>
            <button className="grid size-6 place-items-center rounded-sm text-muted-foreground transition-ui hover:bg-muted hover:text-foreground">
              <LogOut className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SidebarNavItem({
  item,
  to,
}: {
  item: NavItem;
  to?: string;
}) {
  const Icon = item.icon;
  const content = (
    <>
      <Icon className="size-4 shrink-0" />
      <span className="truncate text-[12px]">{item.label}</span>
      {item.shortcut && (
        <span className="ml-auto font-mono text-[10px] text-muted-foreground/60">
          {item.shortcut}
        </span>
      )}
    </>
  );

  const baseClass =
    "flex items-center gap-2 rounded-sm px-2 py-1.5 transition-ui";

  if (to) {
    return (
      <Link
        to={to}
        className={cn(
          baseClass,
          item.active
            ? "bg-primary-soft text-accent-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cn(
        baseClass,
        "w-full text-left",
        item.active
          ? "bg-primary-soft text-accent-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {content}
    </button>
  );
}

/* ════════════════════════════════════════════════════════════════
   AI BUILD INPUT
   ════════════════════════════════════════════════════════════════ */

type BuildMode = "standard" | "fast" | "thorough";

function AIBuildInput() {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState<BuildMode>("standard");
  const [modeOpen, setModeOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  function handleSubmit() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    // Simulate build then navigate to the builder console
    setTimeout(() => {
      setLoading(false);
      navigate({ to: "/builder" });
    }, 1200);
  }

  const modeLabels: Record<BuildMode, string> = {
    standard: "Standard",
    fast: "Fast",
    thorough: "Thorough",
  };

  return (
    <div
      className={cn(
        "rounded-sm border bg-card transition-ui",
        prompt ? "border-primary/40" : "border-border",
      )}
    >
      <div className="p-4">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          rows={3}
          placeholder="Describe what you want to build..."
          className="w-full resize-none bg-transparent text-[14px] leading-relaxed placeholder:text-muted-foreground focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-2 border-t border-border px-4 py-2.5">
        <button
          className="grid size-7 place-items-center rounded-sm text-muted-foreground transition-ui hover:bg-muted hover:text-foreground"
          title="Attach file"
        >
          <Paperclip className="size-4" />
        </button>
        <button
          className="grid size-7 place-items-center rounded-sm text-muted-foreground transition-ui hover:bg-muted hover:text-foreground"
          title="Add context"
        >
          <Plus className="size-4" />
        </button>

        {/* Mode selector */}
        <div className="relative">
          <button
            onClick={() => setModeOpen(!modeOpen)}
            className="flex h-7 items-center gap-1 rounded-sm border border-border px-2 font-mono text-[11px] text-muted-foreground transition-ui hover:text-foreground"
          >
            {modeLabels[mode]}
            <ChevronDown className="size-3" />
          </button>
          {modeOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setModeOpen(false)}
              />
              <div className="absolute bottom-full left-0 z-20 mb-1 w-36 rounded-sm border border-border bg-card py-1 shadow-sm">
                {(
                  ["standard", "fast", "thorough"] as BuildMode[]
                ).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMode(m);
                      setModeOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 px-3 py-1.5 text-[12px] transition-ui",
                      mode === m
                        ? "bg-primary-soft text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {modeLabels[m]}
                    {mode === m && <Check className="ml-auto size-3" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!prompt.trim() || loading}
          className={cn(
            "ml-auto inline-flex h-7 items-center gap-1.5 rounded-sm px-3 text-[12px] font-medium transition-ui",
            prompt.trim() && !loading
              ? "bg-primary text-primary-foreground hover:bg-primary-hover"
              : "cursor-not-allowed bg-muted text-muted-foreground",
          )}
        >
          {loading ? (
            <>
              <Loader2 className="size-3.5 animate-spin" /> Building…
            </>
          ) : (
            <>
              <Zap className="size-3.5" /> Build
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PROJECTS SECTION
   ════════════════════════════════════════════════════════════════ */

type FilterTab = "mine" | "recent" | "templates";

function ProjectsSection() {
  const [filter, setFilter] = useState<FilterTab>("mine");
  const [search, setSearch] = useState("");

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "mine", label: "My Projects" },
    { key: "recent", label: "Recently Viewed" },
    { key: "templates", label: "Templates" },
  ];

  const filtered = projects.filter((p) =>
    search ? p.name.toLowerCase().includes(search.toLowerCase()) : true,
  );

  return (
    <div className="rounded-sm border border-border bg-card">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3">
        <div className="relative">
          <Search className="absolute top-2 left-2 size-3.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects…"
            className="h-7 w-52 rounded-sm border border-border bg-background pl-7 pr-2 text-[12px] placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-0.5 rounded-sm border border-border bg-background p-0.5">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={cn(
                "rounded-sm px-2.5 py-1 text-[11px] font-medium transition-ui",
                filter === t.key
                  ? "bg-primary-soft text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <button className="ml-auto font-mono text-[11px] text-muted-foreground transition-ui hover:text-foreground">
          Browse All
        </button>
      </div>

      {/* Grid */}
      <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FolderCode className="mb-3 size-8 text-muted-foreground/40" />
          <p className="text-[13px] text-muted-foreground">
            No projects found.
          </p>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const statusConfig = {
    live: { label: "Live", className: "text-success" },
    draft: { label: "Draft", className: "text-muted-foreground" },
    building: { label: "Building", className: "text-primary" },
  };

  const status = statusConfig[project.status];

  return (
    <div className="group relative flex flex-col bg-card transition-ui hover:bg-muted/30">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-background p-3">
        <ProjectThumbnail variant={project.thumbnail} />
        {project.starred && (
          <span className="absolute top-2 right-2">
            <Star className="size-3.5 fill-primary text-primary" />
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-2 p-3">
        <div className="min-w-0">
          <h3 className="truncate text-[13px] font-semibold">
            {project.name}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <span className={cn("flex items-center gap-1 text-[11px]", status.className)}>
              <span className="size-1.5 rounded-full bg-current" />
              {status.label}
            </span>
            <span className="text-[11px] text-muted-foreground">·</span>
            <span className="font-mono text-[11px] text-muted-foreground">
              {project.updated}
            </span>
          </div>
        </div>

        <div className="relative shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid size-6 place-items-center rounded-sm text-muted-foreground transition-ui hover:bg-muted hover:text-foreground"
          >
            <MoreHorizontal className="size-3.5" />
          </button>
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-full z-20 mt-1 w-40 rounded-sm border border-border bg-card py-1 shadow-sm">
                {["Open", "Rename", "Duplicate", "Star", "Delete"].map((a) => (
                  <button
                    key={a}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex w-full items-center px-3 py-1.5 text-[12px] transition-ui hover:bg-muted",
                      a === "Delete"
                        ? "text-critical hover:bg-critical/10"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PROJECT THUMBNAILS (abstract wireframes, not real content)
   ════════════════════════════════════════════════════════════════ */

function ProjectThumbnail({ variant }: { variant: string }) {
  switch (variant) {
    case "dashboard":
      return (
        <div className="flex h-full gap-2">
          <div className="w-1/4 space-y-1.5">
            <div className="h-2 w-full rounded-sm bg-primary/30" />
            <div className="h-1.5 w-4/5 rounded-sm bg-muted" />
            <div className="h-1.5 w-3/5 rounded-sm bg-muted" />
            <div className="h-1.5 w-4/5 rounded-sm bg-muted" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="grid grid-cols-3 gap-1.5">
              <div className="h-6 rounded-sm bg-primary-soft" />
              <div className="h-6 rounded-sm bg-muted" />
              <div className="h-6 rounded-sm bg-muted" />
            </div>
            <div className="h-14 rounded-sm border border-border bg-muted/50" />
          </div>
        </div>
      );
    case "landing":
      return (
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <div className="h-2 w-24 rounded-sm bg-foreground/10" />
          <div className="h-1.5 w-40 rounded-sm bg-foreground/5" />
          <div className="mt-1 h-4 w-16 rounded-sm bg-primary/40" />
        </div>
      );
    case "saas":
      return (
        <div className="flex h-full gap-2">
          <div className="w-16 space-y-1">
            <div className="h-1.5 w-full rounded-sm bg-muted" />
            <div className="h-1.5 w-full rounded-sm bg-muted" />
            <div className="h-1.5 w-full rounded-sm bg-primary/30" />
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-20 rounded-sm bg-foreground/10" />
            <div className="grid grid-cols-2 gap-1">
              <div className="h-8 rounded-sm bg-primary-soft" />
              <div className="h-8 rounded-sm bg-muted" />
            </div>
            <div className="h-8 rounded-sm border border-border bg-muted/50" />
          </div>
        </div>
      );
    case "portfolio":
      return (
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <div className="size-8 rounded-full bg-muted" />
          <div className="h-2 w-20 rounded-sm bg-foreground/10" />
          <div className="h-1 w-32 rounded-sm bg-foreground/5" />
        </div>
      );
    case "docs":
      return (
        <div className="flex h-full gap-2">
          <div className="w-12 space-y-1">
            <div className="h-1 w-full rounded-sm bg-muted" />
            <div className="h-1 w-4/5 rounded-sm bg-primary/30" />
            <div className="h-1 w-3/5 rounded-sm bg-muted" />
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-16 rounded-sm bg-foreground/10" />
            <div className="h-1 w-full rounded-sm bg-foreground/5" />
            <div className="h-1 w-4/5 rounded-sm bg-foreground/5" />
            <div className="h-1 w-3/5 rounded-sm bg-foreground/5" />
          </div>
        </div>
      );
    case "api":
      return (
        <div className="flex h-full flex-col justify-center gap-1.5 px-2">
          <div className="flex items-center gap-1">
            <span className="h-3 w-8 rounded-sm bg-success/40 font-mono text-[6px]">
              GET
            </span>
            <div className="h-1.5 flex-1 rounded-sm bg-foreground/5" />
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-8 rounded-sm bg-primary/40 font-mono text-[6px]">
              POST
            </span>
            <div className="h-1.5 flex-1 rounded-sm bg-foreground/5" />
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-8 rounded-sm bg-high/40 font-mono text-[6px]">
              DEL
            </span>
            <div className="h-1.5 flex-1 rounded-sm bg-foreground/5" />
          </div>
        </div>
      );
    default:
      return (
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 rounded-sm bg-muted" />
        </div>
      );
  }
}

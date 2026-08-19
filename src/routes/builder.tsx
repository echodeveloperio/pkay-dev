import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Paperclip,
  ChevronDown,
  Undo2,
  Redo2,
  RefreshCw,
  ExternalLink,
  Share2,
  Rocket,
  Monitor,
  Tablet,
  Smartphone,
  ArrowUp,
  FileCode,
  Folder,
  FolderOpen,
  ChevronRight,
  Sparkles,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/pkay/ThemeToggle";
import { PkayLogo } from "@/components/pkay/PkayLogo";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "AI Builder — PKAY" },
      {
        name: "description",
        content:
          "Describe a website or app in natural language and watch PKAY generate code, run checks and stream a live preview.",
      },
    ],
  }),
  component: Builder,
});

/* ── Types ── */

interface BuildStep {
  label: string;
  state: "done" | "active" | "pending";
}

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  active?: boolean;
}

/* ── Data ── */

const initialSteps: BuildStep[] = [
  { label: "Created project", state: "done" },
  { label: "Generated layout", state: "done" },
  { label: "Added components", state: "done" },
  { label: "Connecting database", state: "active" },
  { label: "Running checks", state: "pending" },
  { label: "Preparing preview", state: "pending" },
];

const fileTree: FileNode[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "components",
        type: "folder",
        children: [
          { name: "Navbar.tsx", type: "file" },
          { name: "Hero.tsx", type: "file", active: true },
          { name: "Footer.tsx", type: "file" },
        ],
      },
      {
        name: "pages",
        type: "folder",
        children: [{ name: "index.tsx", type: "file" }],
      },
      { name: "styles.css", type: "file" },
      { name: "app.tsx", type: "file" },
    ],
  },
  {
    name: "public",
    type: "folder",
    children: [{ name: "logo.svg", type: "file" }],
  },
  { name: "package.json", type: "file" },
  { name: "README.md", type: "file" },
];

const sampleCode = `export function StatCard({ label, value }: Props) {
  return (
    <div className="panel p-4">
      <span className="label-mono">{label}</span>
      <p className="mt-2 font-mono text-2xl">{value}</p>
    </div>
  );
}`;

const streamText =
  "Added the orders dashboard route with a paginated table, four summary metrics and a server function for fetching orders. Checks are queued next.";

/* ════════════════════════════════════════════════════════════════
   BUILDER (3-column: AI Chat | Preview | Files)
   ════════════════════════════════════════════════════════════════ */

function Builder() {
  const [prompt, setPrompt] = useState("");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );
  const [steps, setSteps] = useState(initialSteps);
  const [streamed, setStreamed] = useState("");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    let i = 0;
    timer.current = window.setInterval(() => {
      i += 2;
      setStreamed(streamText.slice(0, i));
      if (i >= streamText.length && timer.current)
        window.clearInterval(timer.current);
    }, 30);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setSteps((s) =>
        s.map((step, i) =>
          i === 3
            ? { ...step, state: "done" }
            : i === 4
              ? { ...step, state: "active" }
              : step,
        ),
      );
    }, 4000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="flex h-11 shrink-0 items-center gap-3 border-b border-border bg-card px-3">
        <Link to="/console">
          <PkayLogo className="h-9 w-auto" />
        </Link>
        <span className="h-4 w-px bg-border" />
        <span className="font-mono text-[12px] font-semibold">
          vault-dashboard
        </span>
        <span className="inline-flex items-center gap-1 rounded-sm border border-primary/20 bg-primary-soft px-1.5 py-0.5 font-mono text-[10px] text-accent-foreground">
          preview
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          build #482
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <button className="grid size-7 place-items-center rounded-sm border border-border bg-card text-muted-foreground transition-ui hover:border-primary/40 hover:text-foreground">
            <Undo2 className="size-4" />
          </button>
          <button className="grid size-7 place-items-center rounded-sm border border-border bg-card text-muted-foreground transition-ui hover:border-primary/40 hover:text-foreground">
            <Redo2 className="size-4" />
          </button>
          <ThemeToggle />
          <button className="inline-flex h-7 items-center gap-1 rounded-sm border border-border bg-card px-2 font-mono text-[11px] text-muted-foreground transition-ui hover:border-primary/40 hover:text-foreground">
            <Share2 className="size-3.5" /> Share
          </button>
          <button className="inline-flex h-7 items-center gap-1 rounded-sm bg-primary px-2.5 font-mono text-[11px] font-medium text-primary-foreground transition-ui hover:bg-primary-hover">
            <Rocket className="size-3.5" /> Publish
          </button>
        </div>
      </header>

      {/* 3-column workspace */}
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[360px_1fr] xl:grid-cols-[360px_minmax(0,1fr)_minmax(0,1fr)]">
        {/* Pane 1 — AI Chat */}
        <div className="flex min-h-0 flex-col border-border lg:border-r">
          <div className="min-h-0 flex-1 space-y-3 overflow-auto p-3">
            <div className="border-l-2 border-border bg-muted/60 px-3 py-2">
              <div className="label-mono mb-1">you</div>
              <div className="text-[13px] leading-relaxed text-secondary-foreground">
                Build an orders dashboard with metrics, a filterable table and
                CSV export.
              </div>
            </div>
            <div className="border-l-2 border-primary bg-primary-soft/35 px-3 py-2">
              <div className="mb-1 flex items-center justify-between">
                <span className="label-mono flex items-center gap-1.5 text-accent-foreground">
                  <Sparkles className="size-3" /> pkay ai
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  pkay-build-pro · 8.4s
                </span>
              </div>
              <div className="space-y-2 text-[13px] leading-relaxed text-secondary-foreground">
                <p>
                  {streamed}
                  {streamed.length < streamText.length && (
                    <span className="caret-blink text-primary">▍</span>
                  )}
                </p>
                <div className="rounded-sm border border-border bg-card p-2">
                  <div className="label-mono mb-1.5">changes</div>
                  <ul className="space-y-1 font-mono text-[11px] text-muted-foreground">
                    <li>+ src/routes/orders.tsx</li>
                    <li>+ src/components/OrderTable.tsx</li>
                    <li>~ src/routes/index.tsx</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-border bg-card p-3">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              placeholder="Ask PKAY to change something…"
              className="w-full resize-none rounded-sm border border-border bg-background p-2.5 text-[13px] leading-relaxed placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
            <div className="mt-2 flex items-center gap-1.5">
              <button className="grid size-7 place-items-center rounded-sm border border-border bg-card text-muted-foreground transition-ui hover:border-primary/40 hover:text-foreground">
                <Paperclip className="size-4" />
              </button>
              <button className="flex h-7 items-center gap-1 rounded-sm border border-border px-2 font-mono text-[11px] text-muted-foreground transition-ui hover:text-foreground">
                <Folder className="size-3" /> context
                <ChevronDown className="size-3" />
              </button>
              <button className="flex h-7 items-center gap-1 rounded-sm border border-border px-2 font-mono text-[11px] text-muted-foreground transition-ui hover:text-foreground">
                pkay-build-pro <ChevronDown className="size-3" />
              </button>
              <button className="ml-auto inline-flex h-7 items-center gap-1 rounded-sm bg-primary px-2.5 font-mono text-[11px] font-medium text-primary-foreground transition-ui hover:bg-primary-hover">
                Generate <ArrowUp className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Pane 2 — Live Preview */}
        <div className="flex min-h-0 flex-col border-border xl:border-r">
          <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border bg-card px-3">
            <span className="label-mono">preview</span>
            <div className="ml-2 flex items-center gap-0.5">
              {(
                [
                  ["desktop", Monitor],
                  ["tablet", Tablet],
                  ["mobile", Smartphone],
                ] as const
              ).map(([k, Icon]) => (
                <button
                  key={k}
                  onClick={() => setDevice(k)}
                  aria-label={k}
                  className={cn(
                    "grid size-7 place-items-center rounded-sm transition-ui",
                    device === k
                      ? "bg-primary-soft text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="size-3.5" />
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-1">
              <button className="grid size-7 place-items-center rounded-sm text-muted-foreground transition-ui hover:text-foreground">
                <RefreshCw className="size-3.5" />
              </button>
              <button className="grid size-7 place-items-center rounded-sm text-muted-foreground transition-ui hover:text-foreground">
                <ExternalLink className="size-3.5" />
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-auto bg-background p-4">
            <div
              className={cn(
                "mx-auto border border-border bg-card transition-all duration-150",
                device === "desktop" && "w-full",
                device === "tablet" && "w-[600px] max-w-full",
                device === "mobile" && "w-[360px] max-w-full",
              )}
            >
              <PreviewMock />
            </div>
          </div>
        </div>

        {/* Pane 3 — Files & Folders */}
        <div className="hidden min-h-0 flex-col xl:flex">
          <div className="flex h-9 shrink-0 items-center justify-between border-b border-border bg-card px-3">
            <span className="label-mono">Files</span>
            <span className="font-mono text-[10px] text-muted-foreground">
              8 files
            </span>
          </div>
          <div className="min-h-0 flex-1 overflow-auto p-2">
            <div className="font-mono text-[11px]">
              <Tree nodes={fileTree} depth={0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── File Tree ── */

function Tree({ nodes, depth }: { nodes: FileNode[]; depth: number }) {
  const [openFolders, setOpenFolders] = useState<Set<string>>(
    new Set(nodes.filter((n) => n.type === "folder").map((n) => n.name)),
  );

  function toggle(name: string) {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <div className={cn(depth > 0 && "pl-3")}>
      {nodes.map((node) => {
        if (node.type === "file") {
          return (
            <div
              key={node.name}
              className={cn(
                "flex items-center gap-1.5 rounded-sm px-1.5 py-1 transition-ui cursor-pointer",
                node.active
                  ? "bg-primary-soft text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <FileCode
                className={cn(
                  "size-3 shrink-0",
                  node.active ? "text-primary" : "text-primary/40",
                )}
              />
              <span className="truncate">{node.name}</span>
            </div>
          );
        }

        const isOpen = openFolders.has(node.name);

        return (
          <div key={node.name}>
            <button
              onClick={() => toggle(node.name)}
              className="flex w-full items-center gap-1.5 rounded-sm px-1.5 py-1 text-muted-foreground transition-ui hover:bg-muted hover:text-foreground"
            >
              <ChevronRight
                className={cn(
                  "size-3 transition-transform",
                  isOpen && "rotate-90",
                )}
              />
              {isOpen ? (
                <FolderOpen className="size-3 shrink-0 text-primary/50" />
              ) : (
                <Folder className="size-3 shrink-0 text-primary/50" />
              )}
              <span className="truncate">{node.name}</span>
            </button>
            {isOpen && node.children && (
              <Tree nodes={node.children} depth={depth + 1} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Preview Mock ── */

function PreviewMock() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="text-[13px] font-semibold">Orders</span>
        <span className="rounded-sm bg-primary px-2 py-1 font-mono text-[10px] text-primary-foreground">
          Export CSV
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(
          [
            ["Revenue", "$48.2k"],
            ["Orders", "1,284"],
            ["Refunds", "12"],
            ["AOV", "$37.5"],
          ] as const
        ).map(([l, v]) => (
          <div key={l} className="border border-border p-2">
            <div className="label-mono">{l}</div>
            <div className="mt-1 font-mono text-sm">{v}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2 border border-border px-2 py-1.5"
          >
            <span className="font-mono text-[11px] text-muted-foreground">
              #{4210 + i}
            </span>
            <div className="h-1.5 w-24 bg-muted" />
            <div className="ml-auto h-1.5 w-10 bg-primary/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

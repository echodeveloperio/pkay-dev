import { createFileRoute } from "@tanstack/react-router";
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
} from "lucide-react";
import { AppShell, IconButton } from "@/components/pkay/AppShell";
import {
  AIMessage,
  BuildLog,
  CodeBlock,
  Panel,
  StatusIndicator,
  Tag,
  Terminal,
  type BuildStep,
} from "@/components/pkay/primitives";
import { Btn } from "@/components/pkay/Btn";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "AI Builder — PKAY" },
      {
        name: "description",
        content:
          "Describe a website or app in natural language and watch PKAY generate code, run checks and stream a live preview.",
      },
      { property: "og:title", content: "AI Builder — PKAY" },
      { property: "og:description", content: "Prompt to production: generate, review and publish in one workspace." },
    ],
  }),
  component: Builder,
});

const initialSteps: BuildStep[] = [
  { label: "Created project", state: "done" },
  { label: "Generated layout", state: "done" },
  { label: "Added components", state: "done" },
  { label: "Connecting database", state: "active" },
  { label: "Running checks", state: "pending" },
  { label: "Preparing preview", state: "pending" },
];

const files = [
  { path: "src/routes/index.tsx", active: true },
  { path: "src/routes/orders.tsx" },
  { path: "src/components/OrderTable.tsx" },
  { path: "src/components/StatCard.tsx" },
  { path: "src/lib/orders.functions.ts" },
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

function Builder() {
  const [prompt, setPrompt] = useState("");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [steps, setSteps] = useState(initialSteps);
  const [streamed, setStreamed] = useState("");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    let i = 0;
    timer.current = window.setInterval(() => {
      i += 2;
      setStreamed(streamText.slice(0, i));
      if (i >= streamText.length && timer.current) window.clearInterval(timer.current);
    }, 30);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setSteps((s) =>
        s.map((step, i) =>
          i === 3 ? { ...step, state: "done" } : i === 4 ? { ...step, state: "active" } : step,
        ),
      );
    }, 4000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AppShell>
      <div className="flex h-[calc(100vh-3rem)] flex-col">
        {/* Workspace toolbar */}
        <div className="flex h-11 shrink-0 items-center gap-2 border-b border-border bg-card px-3">
          <span className="font-mono text-[12px] font-semibold">vault-dashboard</span>
          <Tag variant="primary">preview</Tag>
          <StatusIndicator state="busy" label="build #482" />
          <div className="ml-auto flex items-center gap-1.5">
            <IconButton label="Undo">
              <Undo2 className="size-4" />
            </IconButton>
            <IconButton label="Redo">
              <Redo2 className="size-4" />
            </IconButton>
            <Btn size="sm" variant="secondary">
              <Share2 className="size-3.5" /> Share
            </Btn>
            <Btn size="sm" variant="primary">
              <Rocket className="size-3.5" /> Publish
            </Btn>
          </div>
        </div>

        {/* 3-pane workspace */}
        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[360px_1fr] xl:grid-cols-[360px_minmax(0,1fr)_minmax(0,1fr)]">
          {/* Pane 1 — AI conversation + composer */}
          <div className="flex min-h-0 flex-col border-border lg:border-r">
            <div className="min-h-0 flex-1 space-y-3 overflow-auto p-3">
              <AIMessage role="user">
                Build an orders dashboard with metrics, a filterable table and CSV export.
              </AIMessage>
              <AIMessage role="ai" meta="pkay-build-pro · 8.4s">
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
              </AIMessage>
            </div>

            <div className="shrink-0 border-t border-border bg-card p-3">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                placeholder="What do you want to build?"
                className="w-full resize-none rounded-sm border border-border bg-background p-2.5 text-[13px] leading-relaxed placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
              <div className="mt-2 flex items-center gap-1.5">
                <IconButton label="Attach file">
                  <Paperclip className="size-4" />
                </IconButton>
                <button className="flex h-8 items-center gap-1 rounded-sm border border-border px-2 font-mono text-[11px] text-muted-foreground transition-ui hover:text-foreground">
                  <Folder className="size-3.5" /> context: 3 files
                </button>
                <button className="flex h-8 items-center gap-1 rounded-sm border border-border px-2 font-mono text-[11px] text-muted-foreground transition-ui hover:text-foreground">
                  pkay-build-pro <ChevronDown className="size-3" />
                </button>
                <Btn variant="primary" className="ml-auto">
                  Generate <ArrowUp className="size-3.5" />
                </Btn>
              </div>
            </div>
          </div>

          {/* Pane 2 — editor + logs */}
          <div className="flex min-h-0 flex-col border-border xl:border-r">
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border bg-card px-3">
                <FileCode className="size-3.5 text-primary" />
                <span className="font-mono text-[11px]">src/components/StatCard.tsx</span>
              </div>
              <div className="grid min-h-0 flex-1 grid-cols-[150px_1fr]">
                <div className="min-h-0 overflow-auto border-r border-border bg-card p-2">
                  <div className="label-mono mb-1.5 px-1">files</div>
                  {files.map((f) => (
                    <div
                      key={f.path}
                      className={cn(
                        "truncate rounded-sm px-1.5 py-1 font-mono text-[11px] transition-ui",
                        f.active
                          ? "bg-primary-soft text-accent-foreground"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {f.path.split("/").pop()}
                    </div>
                  ))}
                </div>
                <div className="min-h-0 overflow-auto p-3">
                  <CodeBlock code={sampleCode} filename="StatCard.tsx" />
                </div>
              </div>
            </div>
            <div className="h-52 shrink-0 border-t border-border p-3">
              <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="panel p-3">
                  <div className="label-mono mb-2">build log</div>
                  <BuildLog steps={steps} />
                </div>
                <Terminal
                  lines={[
                    "pkay build --project vault-dashboard",
                    "resolved 42 modules",
                    "generated 3 routes, 6 components",
                    "migrating schema: orders, order_items",
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Pane 3 — live preview */}
          <div className="hidden min-h-0 flex-col xl:flex">
            <div className="flex h-9 shrink-0 items-center gap-1 border-b border-border bg-card px-3">
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
                <IconButton label="Refresh preview">
                  <RefreshCw className="size-3.5" />
                </IconButton>
                <IconButton label="Open preview">
                  <ExternalLink className="size-3.5" />
                </IconButton>
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
        </div>
      </div>
    </AppShell>
  );
}

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
        {[
          ["Revenue", "$48.2k"],
          ["Orders", "1,284"],
          ["Refunds", "12"],
          ["AOV", "$37.5"],
        ].map(([l, v]) => (
          <div key={l} className="border border-border p-2">
            <div className="label-mono">{l}</div>
            <div className="mt-1 font-mono text-sm">{v}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 border border-border px-2 py-1.5">
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

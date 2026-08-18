import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { AppShell } from "@/components/pkay/AppShell";
import { PageHeader, Panel, Tag, RiskBadge, type Severity } from "@/components/pkay/primitives";
import { Btn, inputClass } from "@/components/pkay/Btn";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — PKAY" },
      { name: "description", content: "All AI-generated projects, environments and security state." },
      { property: "og:title", content: "Projects — PKAY" },
      { property: "og:description", content: "Manage AI-generated web projects and their build history." },
    ],
  }),
  component: Projects,
});

const all = [
  { name: "orbit-marketing", stack: "TanStack · Postgres", env: "production", risk: "low", builds: 128 },
  { name: "vault-dashboard", stack: "TanStack · Auth", env: "preview", risk: "medium", builds: 482 },
  { name: "api-status-page", stack: "Static", env: "production", risk: "low", builds: 41 },
  { name: "internal-crm", stack: "TanStack · Postgres", env: "draft", risk: "high", builds: 76 },
  { name: "docs-portal", stack: "MDX", env: "production", risk: "informational", builds: 19 },
  { name: "pentest-tracker", stack: "TanStack · Postgres", env: "preview", risk: "medium", builds: 62 },
] as const;

function Projects() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "production" | "preview" | "draft">("all");
  const rows = all.filter(
    (p) =>
      p.name.includes(q.toLowerCase()) && (filter === "all" ? true : p.env === filter),
  );

  return (
    <AppShell>
      <div className="space-y-6 p-4 lg:p-6">
        <PageHeader
          title="Projects"
          description="Every workspace project with its environment, build count and current risk posture."
          actions={
            <Link to="/builder">
              <Btn variant="primary">
                <Plus className="size-3.5" /> New project
              </Btn>
            </Link>
          }
        />

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-72">
            <Search className="absolute top-2 left-2 size-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filter projects"
              className={inputClass + " pl-7 font-mono"}
            />
          </div>
          <div className="flex items-center gap-0.5 rounded-sm border border-border bg-card p-0.5">
            {(["all", "production", "preview", "draft"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={
                  "rounded-sm px-2.5 py-1 font-mono text-[11px] transition-ui " +
                  (filter === f
                    ? "bg-primary-soft text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((p) => (
            <Panel key={p.name} className="transition-ui hover:border-primary/40">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-mono text-[13px] font-semibold">{p.name}</h3>
                  <p className="mt-1 text-[12px] text-muted-foreground">{p.stack}</p>
                </div>
                <MoreHorizontal className="size-4 text-muted-foreground" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Tag variant={p.env === "production" ? "primary" : "outline"}>{p.env}</Tag>
                <RiskBadge level={p.risk as Severity} />
                <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                  {p.builds} builds
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <Link to="/builder" className="flex-1">
                  <Btn size="sm" className="w-full">
                    Open builder
                  </Btn>
                </Link>
                <Btn size="sm" variant="ghost">
                  Preview
                </Btn>
              </div>
            </Panel>
          ))}
          {rows.length === 0 && (
            <p className="font-mono text-[12px] text-muted-foreground">No projects match.</p>
          )}
        </div>
      </div>
    </AppShell>
  );
}

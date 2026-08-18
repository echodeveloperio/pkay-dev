import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, ShieldCheck, GitBranch } from "lucide-react";
import { AppShell } from "@/components/pkay/AppShell";
import {
  PageHeader,
  Panel,
  Stat,
  Tag,
  RiskBadge,
  BuildLog,
  StatusIndicator,
} from "@/components/pkay/primitives";
import { Btn } from "@/components/pkay/Btn";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PKAY — AI Builder & Security Workspace" },
      {
        name: "description",
        content:
          "PKAY is an AI-native developer workspace: generate web apps from prompts and analyze security in a dedicated Security Lab.",
      },
      { property: "og:title", content: "PKAY — AI Builder & Security Workspace" },
      {
        property: "og:description",
        content: "Generate web apps from natural language and run defensive security analysis.",
      },
    ],
  }),
  component: Dashboard,
});

const projects = [
  { name: "orbit-marketing", env: "production", updated: "4m ago", checks: "24/24", risk: "low" },
  { name: "vault-dashboard", env: "preview", updated: "1h ago", checks: "22/24", risk: "medium" },
  { name: "api-status-page", env: "production", updated: "yesterday", checks: "24/24", risk: "low" },
  { name: "internal-crm", env: "draft", updated: "2d ago", checks: "18/24", risk: "high" },
] as const;

function Dashboard() {
  return (
    <AppShell>
      <div className="space-y-6 p-4 lg:p-6">
        <PageHeader
          title="Workspace overview"
          description="Builds, deployments and security posture across your PKAY workspace."
          actions={
            <>
              <Btn variant="secondary">
                <GitBranch className="size-3.5" /> Import repo
              </Btn>
              <Link to="/builder">
                <Btn variant="primary">
                  <Sparkles className="size-3.5" /> New build
                </Btn>
              </Link>
            </>
          }
        />

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Stat label="Active projects" value="12" hint="3 deployed this week" />
          <Stat label="AI builds today" value="38" hint="avg 42s per build" tone="primary" />
          <Stat label="Security score" value="87" hint="of 100 · +4 this week" tone="success" />
          <Stat label="Open findings" value="6" hint="0 critical · 2 high" tone="high" />
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Panel
            className="xl:col-span-2"
            title="Projects"
            actions={
              <Link to="/projects" className="label-mono hover:text-foreground">
                view all
              </Link>
            }
            bodyClassName="p-0"
          >
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  {["Project", "Environment", "Checks", "Risk", "Updated"].map((h) => (
                    <th key={h} className="label-mono px-3 py-2 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.name} className="border-b border-border last:border-0 transition-ui hover:bg-muted/60">
                    <td className="px-3 py-2.5 font-mono text-[12px]">{p.name}</td>
                    <td className="px-3 py-2.5">
                      <Tag variant={p.env === "production" ? "primary" : "outline"}>{p.env}</Tag>
                    </td>
                    <td className="px-3 py-2.5 font-mono text-[12px] text-muted-foreground">
                      {p.checks}
                    </td>
                    <td className="px-3 py-2.5">
                      <RiskBadge level={p.risk as "low" | "medium" | "high"} />
                    </td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-muted-foreground">
                      {p.updated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <div className="space-y-4">
            <Panel title="Latest build" actions={<StatusIndicator state="busy" label="running" />}>
              <div className="mb-3 font-mono text-[12px] text-muted-foreground">
                vault-dashboard · #482
              </div>
              <BuildLog
                steps={[
                  { label: "Created project", state: "done" },
                  { label: "Generated layout", state: "done" },
                  { label: "Added components", state: "done" },
                  { label: "Connecting database", state: "active" },
                  { label: "Running checks", state: "pending" },
                  { label: "Preparing preview", state: "pending" },
                ]}
              />
            </Panel>

            <Panel title="Security lab">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-4 text-primary" />
                <div>
                  <p className="text-[13px] leading-relaxed text-secondary-foreground">
                    2 high-risk findings await triage in <span className="font-mono">internal-crm</span>.
                    The AI Security Analyst has drafted mitigations.
                  </p>
                  <Link
                    to="/security"
                    className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] text-primary hover:text-primary-hover"
                  >
                    Open Security Lab <ArrowUpRight className="size-3" />
                  </Link>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/pkay/AppShell";
import { PageHeader, Panel, Tag } from "@/components/pkay/primitives";
import { Btn } from "@/components/pkay/Btn";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — PKAY" },
      {
        name: "description",
        content: "Start from production-ready PKAY templates for dashboards, docs, SaaS and security tooling.",
      },
      { property: "og:title", content: "Templates — PKAY" },
      { property: "og:description", content: "Production-ready starting points for AI-generated builds." },
    ],
  }),
  component: Templates,
});

const templates = [
  { name: "Admin Console", tags: ["dashboard", "auth"], desc: "Table-dense admin shell with role-based access and audit trail." },
  { name: "Marketing Site", tags: ["landing", "seo"], desc: "Multi-route marketing site with SEO metadata per page." },
  { name: "Docs Portal", tags: ["mdx", "search"], desc: "Sidebar docs with command palette search and code samples." },
  { name: "SaaS Starter", tags: ["billing", "auth"], desc: "Subscription flow, org switcher and usage metering panels." },
  { name: "Security Report", tags: ["security", "pdf"], desc: "Structured finding reports with severity matrices." },
  { name: "Status Page", tags: ["monitoring"], desc: "Uptime timeline, incident log and subscriber notices." },
  { name: "Vuln Tracker", tags: ["security", "postgres"], desc: "Triage board for CVEs with owner assignment and SLA timers." },
  { name: "API Playground", tags: ["devtool"], desc: "Request composer, response viewer and generated snippets." },
];

function Templates() {
  return (
    <AppShell>
      <div className="space-y-6 p-4 lg:p-6">
        <PageHeader
          title="Templates"
          description="Each template seeds the AI builder with structure, tokens and starter prompts."
        />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {templates.map((t) => (
            <Panel key={t.name} className="transition-ui hover:border-primary/40">
              <div className="mb-3 h-24 rounded-sm border border-border bg-background p-2">
                <div className="mb-1.5 h-2 w-1/3 bg-primary/50" />
                <div className="grid h-[70px] grid-cols-3 gap-1.5">
                  <div className="col-span-1 bg-muted" />
                  <div className="col-span-2 space-y-1.5">
                    <div className="h-1/3 bg-muted" />
                    <div className="h-1/3 bg-muted" />
                  </div>
                </div>
              </div>
              <h3 className="text-[13px] font-semibold">{t.name}</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{t.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {t.tags.map((tag) => (
                  <Tag key={tag} variant="outline">
                    {tag}
                  </Tag>
                ))}
              </div>
              <Link to="/builder" className="mt-3 block">
                <Btn size="sm" variant="primary" className="w-full">
                  Use template
                </Btn>
              </Link>
            </Panel>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

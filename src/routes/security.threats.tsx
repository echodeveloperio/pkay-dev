import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, RiskBadge, Stat, Tag } from "@/components/pkay/primitives";

export const Route = createFileRoute("/security/threats")({
  head: () => ({
    meta: [
      { title: "Threat Intelligence — PKAY Security Lab" },
      {
        name: "description",
        content: "Tracked campaigns, affected technologies and defensive guidance relevant to your stack.",
      },
      { property: "og:title", content: "Threat Intelligence — PKAY Security Lab" },
      { property: "og:description", content: "Campaign tracking mapped to the technologies you actually ship." },
    ],
  }),
  component: Threats,
});

const items = [
  {
    name: "Credential phishing against CI providers",
    level: "high",
    relevance: "Affects: GitHub Actions, deploy tokens",
    note: "Operators clone login pages for CI dashboards and harvest session tokens. Enforce hardware-backed MFA and short-lived deploy tokens.",
  },
  {
    name: "Malicious package typosquats",
    level: "high",
    relevance: "Affects: npm dependency graph",
    note: "Packages mimic popular utility names and run install scripts. Pin versions, disable postinstall where possible, and review lockfile diffs.",
  },
  {
    name: "Exposed database policies",
    level: "medium",
    relevance: "Affects: managed Postgres projects",
    note: "Scanners sweep for tables readable by anonymous roles. Verify every policy scopes rows to an owner.",
  },
  {
    name: "Webhook replay abuse",
    level: "medium",
    relevance: "Affects: public API routes",
    note: "Unverified webhook endpoints get replayed with modified payloads. Verify signatures and reject stale timestamps.",
  },
  {
    name: "Commodity loader distribution via ads",
    level: "low",
    relevance: "Affects: workstation fleet",
    note: "Search ads lead to installer look-alikes. Restrict local install rights and block known staging hosts.",
  },
] as const;

function Threats() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader
        title="Threat intelligence"
        description="Curated, defensive summaries mapped to the technologies in your workspace."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Tracked campaigns" value="18" />
        <Stat label="Relevant to stack" value="5" tone="primary" />
        <Stat label="Mitigations applied" value="11" tone="success" />
      </div>

      <div className="space-y-3">
        {items.map((i) => (
          <Panel key={i.name}>
            <div className="flex flex-wrap items-center gap-2">
              <RiskBadge level={i.level} />
              <h3 className="text-[13px] font-semibold">{i.name}</h3>
              <Tag variant="outline" className="ml-auto">
                {i.relevance}
              </Tag>
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{i.note}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}

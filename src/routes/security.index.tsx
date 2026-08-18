import { createFileRoute } from "@tanstack/react-router";
import { AppShellFreeHeader } from "@/components/pkay/SecurityBits";
import { Panel, SecurityFinding, Stat, RiskBadge } from "@/components/pkay/primitives";

export const Route = createFileRoute("/security/")({
  head: () => ({
    meta: [
      { title: "Security Overview — PKAY Security Lab" },
      {
        name: "description",
        content: "Security score, severity breakdown and open findings across your PKAY projects.",
      },
      { property: "og:title", content: "Security Overview — PKAY Security Lab" },
      { property: "og:description", content: "Posture, findings and passed checks in one defensive workspace." },
    ],
  }),
  component: Overview,
});

function Overview() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <AppShellFreeHeader
        title="Security overview"
        description="Defensive posture across all projects. Findings are educational and mitigation-focused."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <Stat label="Security score" value="87 / 100" hint="+4 vs last scan" tone="primary" />
        <Stat label="Critical issues" value="0" tone="success" />
        <Stat label="High risk" value="2" tone="high" />
        <Stat label="Warnings" value="4" tone="medium" />
        <Stat label="Passed checks" value="24" tone="success" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-3 xl:col-span-2">
          <div className="label-mono">open findings</div>
          <SecurityFinding
            id="PK-1042"
            level="high"
            title="Missing authorization check on server function"
            location="src/lib/orders.functions.ts"
            description="listAllOrders() runs without an auth middleware, so any caller can read order records. Add the auth middleware and scope the query to the authenticated user."
          />
          <SecurityFinding
            id="PK-1043"
            level="high"
            title="Table exposed to anonymous reads"
            location="public.customer_profiles"
            description="A SELECT policy grants the anonymous role access to PII columns. Restrict the policy to authenticated users and scope rows by owner id."
          />
          <SecurityFinding
            id="PK-1051"
            level="medium"
            title="Dependency with known advisory"
            location="package.json · parse-path@5.0.0"
            description="Advisory describes URL parsing confusion that can bypass host allowlists. Upgrade to a patched release and re-run the dependency scan."
          />
          <SecurityFinding
            id="PK-1058"
            level="low"
            title="Missing security headers on published site"
            location="deploy config"
            description="Responses omit a Content-Security-Policy and Referrer-Policy. Adding both reduces the impact of injected content."
          />
          <SecurityFinding
            id="PK-1060"
            level="informational"
            title="Verbose error output in preview builds"
            location="src/routes/api/public/webhook.ts"
            description="Stack traces are returned to callers in preview. Harmless in preview, but should be suppressed in production responses."
          />
        </div>

        <div className="space-y-4">
          <Panel title="Severity legend">
            <div className="space-y-2">
              {(["critical", "high", "medium", "low", "informational"] as const).map((s) => (
                <div key={s} className="flex items-center justify-between">
                  <RiskBadge level={s} />
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {{ critical: "0", high: "2", medium: "4", low: "3", informational: "5" }[s]}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Recent scans">
            <div className="space-y-2 font-mono text-[11px]">
              {[
                ["deep scan", "vault-dashboard", "12m ago"],
                ["dependency scan", "workspace", "1h ago"],
                ["code security", "internal-crm", "3h ago"],
                ["secrets scan", "workspace", "yesterday"],
              ].map(([kind, target, when]) => (
                <div key={kind + target} className="flex items-center justify-between border border-border px-2 py-1.5">
                  <span>{kind}</span>
                  <span className="text-muted-foreground">{target}</span>
                  <span className="text-muted-foreground">{when}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

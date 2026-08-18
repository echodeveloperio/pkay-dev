import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, SecurityFinding, Stat } from "@/components/pkay/primitives";
import { Btn } from "@/components/pkay/Btn";

export const Route = createFileRoute("/security/vulnerabilities")({
  head: () => ({
    meta: [
      { title: "Vulnerability Analysis — PKAY Security Lab" },
      {
        name: "description",
        content: "Vulnerability classes, affected assets and remediation guidance across your projects.",
      },
      { property: "og:title", content: "Vulnerability Analysis — PKAY Security Lab" },
      { property: "og:description", content: "Triage vulnerability classes with plain-language explanations." },
    ],
  }),
  component: Vulnerabilities,
});

function Vulnerabilities() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader
        title="Vulnerability analysis"
        description="Grouped by class so remediation fixes the pattern, not a single instance."
        actions={<Btn variant="primary">Run deep scan</Btn>}
      />

      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Classes detected" value="5" />
        <Stat label="Assets affected" value="9" tone="medium" />
        <Stat label="Mean time to fix" value="1.8d" tone="primary" />
        <Stat label="Fixed this month" value="17" tone="success" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-3 xl:col-span-2">
          <SecurityFinding
            id="CWE-862"
            level="high"
            title="Missing authorization"
            location="2 server functions"
            description="Endpoints return data without verifying the caller. Fix by adding the auth middleware and scoping every query by the authenticated user id."
          />
          <SecurityFinding
            id="CWE-89"
            level="medium"
            title="Query built from unvalidated input"
            location="src/lib/search.server.ts"
            description="A filter string is interpolated into a query. Use parameterized queries and validate input with a schema before it reaches the database."
          />
          <SecurityFinding
            id="CWE-79"
            level="medium"
            title="Unescaped rich text rendering"
            location="src/components/NoteBody.tsx"
            description="User content is rendered as HTML. Sanitize on write and render as text, or restrict allowed tags through a sanitizer."
          />
          <SecurityFinding
            id="CWE-1104"
            level="low"
            title="Unmaintained dependency"
            location="package.json"
            description="One dependency has had no release in 3 years. Plan a replacement to avoid inheriting unpatched issues."
          />
          <SecurityFinding
            id="CWE-209"
            level="informational"
            title="Error messages leak internals"
            location="api routes"
            description="Responses include stack traces. Return generic messages in production and log details server-side."
          />
        </div>

        <Panel title="Remediation order">
          <ol className="space-y-2 text-[12px] leading-relaxed text-muted-foreground">
            <li>
              <span className="font-mono text-primary">01</span> Authorization gaps — highest blast
              radius, fix across all sibling endpoints at once.
            </li>
            <li>
              <span className="font-mono text-primary">02</span> Injection paths — parameterize and
              validate at the boundary.
            </li>
            <li>
              <span className="font-mono text-primary">03</span> Output encoding — sanitize rendered
              user content.
            </li>
            <li>
              <span className="font-mono text-primary">04</span> Dependencies — upgrade, then re-run
              the scan to confirm.
            </li>
            <li>
              <span className="font-mono text-primary">05</span> Hardening — headers, error handling,
              logging hygiene.
            </li>
          </ol>
        </Panel>
      </div>
    </div>
  );
}

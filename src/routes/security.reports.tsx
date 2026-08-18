import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";
import { PageHeader, Panel, RiskBadge, Tag } from "@/components/pkay/primitives";
import { Btn } from "@/components/pkay/Btn";

export const Route = createFileRoute("/security/reports")({
  head: () => ({
    meta: [
      { title: "Security Reports — PKAY Security Lab" },
      {
        name: "description",
        content: "Exportable security reports summarizing posture, findings and applied mitigations.",
      },
      { property: "og:title", content: "Security Reports — PKAY Security Lab" },
      { property: "og:description", content: "Share structured security reports with your team or auditors." },
    ],
  }),
  component: Reports,
});

const reports = [
  { id: "RPT-0091", title: "Workspace posture — August", scope: "workspace", level: "medium", date: "18 Aug 2026" },
  { id: "RPT-0090", title: "vault-dashboard deep scan", scope: "project", level: "high", date: "17 Aug 2026" },
  { id: "RPT-0088", title: "Dependency advisory review", scope: "workspace", level: "medium", date: "12 Aug 2026" },
  { id: "RPT-0085", title: "internal-crm code security", scope: "project", level: "high", date: "05 Aug 2026" },
  { id: "RPT-0081", title: "Quarterly summary — Q2", scope: "workspace", level: "low", date: "30 Jun 2026" },
] as const;

function Reports() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader
        title="Security reports"
        description="Snapshots of posture, findings and mitigations — versioned and shareable."
        actions={<Btn variant="primary">Generate report</Btn>}
      />

      <Panel bodyClassName="p-0">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border">
              {["Report", "Scope", "Highest severity", "Date", ""].map((h) => (
                <th key={h} className="label-mono px-3 py-2 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0 transition-ui hover:bg-muted/60">
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <FileText className="size-3.5 text-primary" />
                    <span className="text-[13px]">{r.title}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{r.id}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5">
                  <Tag variant="outline">{r.scope}</Tag>
                </td>
                <td className="px-3 py-2.5">
                  <RiskBadge level={r.level} />
                </td>
                <td className="px-3 py-2.5 font-mono text-[11px] text-muted-foreground">{r.date}</td>
                <td className="px-3 py-2.5 text-right">
                  <Btn size="sm" variant="ghost">
                    <Download className="size-3.5" /> PDF
                  </Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

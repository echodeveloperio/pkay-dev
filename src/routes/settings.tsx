import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/pkay/AppShell";
import { PageHeader, Panel, Tag } from "@/components/pkay/primitives";
import { Btn, Field, inputClass } from "@/components/pkay/Btn";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — PKAY" },
      { name: "description", content: "Workspace, model defaults, security policy and access settings for PKAY." },
      { property: "og:title", content: "Settings — PKAY" },
      { property: "og:description", content: "Configure workspace, AI defaults and security policy." },
    ],
  }),
  component: Settings,
});

function Settings() {
  return (
    <AppShell>
      <div className="space-y-6 p-4 lg:p-6">
        <PageHeader title="Settings" description="Workspace configuration, AI defaults and security policy." />
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel title="Workspace">
            <div className="space-y-4">
              <Field label="workspace name">
                <input className={inputClass} defaultValue="PKAY Pro" />
              </Field>
              <Field label="default region" hint="Applies to new build runners.">
                <select className={inputClass}>
                  <option>eu-central</option>
                  <option>us-east</option>
                  <option>ap-southeast</option>
                </select>
              </Field>
              <Btn variant="primary" size="sm">
                Save changes
              </Btn>
            </div>
          </Panel>

          <Panel title="AI defaults">
            <div className="space-y-4">
              <Field label="builder model">
                <select className={inputClass}>
                  <option>pkay-build-pro</option>
                  <option>pkay-build-fast</option>
                </select>
              </Field>
              <Field label="security analyst model">
                <select className={inputClass}>
                  <option>pkay-sec-analyst</option>
                  <option>pkay-sec-analyst-lite</option>
                </select>
              </Field>
              <Toggle label="Stream responses" on />
              <Toggle label="Auto-run checks after build" on />
            </div>
          </Panel>

          <Panel title="Security policy">
            <div className="space-y-3">
              <Toggle label="Block publish on critical findings" on />
              <Toggle label="Require review for dependency upgrades" />
              <Toggle label="Defensive-only analyst mode (locked)" on locked />
            </div>
          </Panel>

          <Panel title="Access tokens">
            <div className="space-y-2 font-mono text-[12px]">
              {[
                { name: "ci-runner", scope: "build", used: "2m ago" },
                { name: "scanner-bot", scope: "security:read", used: "1h ago" },
              ].map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between border border-border px-2.5 py-2"
                >
                  <span>{t.name}</span>
                  <Tag variant="outline">{t.scope}</Tag>
                  <span className="text-[10px] text-muted-foreground">{t.used}</span>
                </div>
              ))}
              <Btn size="sm">Generate token</Btn>
            </div>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}

function Toggle({ label, on, locked }: { label: string; on?: boolean; locked?: boolean }) {
  return (
    <div className="flex items-center justify-between border border-border px-2.5 py-2">
      <span className="text-[12px] text-secondary-foreground">{label}</span>
      <span
        className={
          "flex h-4.5 w-8 items-center rounded-sm border p-0.5 " +
          (on ? "border-primary/40 bg-primary/20 justify-end" : "border-border bg-muted justify-start") +
          (locked ? " opacity-60" : "")
        }
      >
        <span className={"size-3 rounded-[1px] " + (on ? "bg-primary" : "bg-muted-foreground/60")} />
      </span>
    </div>
  );
}

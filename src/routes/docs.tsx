import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/pkay/AppShell";
import { PageHeader, Panel, CodeBlock } from "@/components/pkay/primitives";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — PKAY" },
      { name: "description", content: "How to prompt, build, review and publish with the PKAY platform." },
      { property: "og:title", content: "Documentation — PKAY" },
      { property: "og:description", content: "Prompting guide, build pipeline and Security Lab reference." },
    ],
  }),
  component: Docs,
});

const sections = [
  {
    title: "Prompting the builder",
    body: "Describe outcome, structure and constraints. Name routes, data shape and states. Attach files for brand or schema context, then select the model that matches the task size.",
  },
  {
    title: "Build pipeline",
    body: "Every generation runs the same six stages: project, layout, components, data, checks, preview. Each stage streams into the build log and can be reverted independently.",
  },
  {
    title: "Security Lab",
    body: "The Security Lab is defensive-only. It explains malware behaviour, vulnerability classes and insecure code patterns, and always returns mitigations and safe next steps.",
  },
];

function Docs() {
  return (
    <AppShell>
      <div className="space-y-6 p-4 lg:p-6">
        <PageHeader title="Documentation" description="Reference for the PKAY builder and Security Lab." />
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {sections.map((s) => (
              <Panel key={s.title} title={s.title}>
                <p className="text-[13px] leading-relaxed text-secondary-foreground">{s.body}</p>
              </Panel>
            ))}
          </div>
          <Panel title="CLI">
            <CodeBlock
              filename="terminal"
              code={`$ pkay init vault-dashboard
$ pkay build --prompt "add audit log page"
$ pkay scan --deep
$ pkay publish --env production`}
            />
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}

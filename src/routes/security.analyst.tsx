import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUp, Paperclip, ShieldCheck } from "lucide-react";
import {
  AIMessage,
  CodeBlock,
  PageHeader,
  Panel,
  RiskBadge,
  StatusIndicator,
} from "@/components/pkay/primitives";
import { Btn } from "@/components/pkay/Btn";
import { IconButton } from "@/components/pkay/AppShell";

export const Route = createFileRoute("/security/analyst")({
  head: () => ({
    meta: [
      { title: "AI Security Analyst — PKAY Security Lab" },
      {
        name: "description",
        content:
          "A defensive AI analyst that explains vulnerabilities, malware behaviour and code-security issues with structured mitigations.",
      },
      { property: "og:title", content: "AI Security Analyst — PKAY Security Lab" },
      {
        property: "og:description",
        content: "Structured, defensive security analysis: summary, risk, indicators and mitigation.",
      },
    ],
  }),
  component: Analyst,
});

const sections = [
  {
    heading: "Summary",
    body: "The submitted script downloads a second-stage payload from a hardcoded host and schedules itself for persistence. It is consistent with a commodity loader family.",
  },
  {
    heading: "What Was Detected",
    body: "Obfuscated string concatenation, an outbound request to a raw IP address, and a persistence entry written to a user-level autostart location.",
  },
  {
    heading: "Why It Matters",
    body: "A loader gives an operator repeatable access. Any credential stored on the host should be treated as exposed until rotated, and the host should be isolated before further triage.",
  },
  {
    heading: "Technical Explanation",
    body: "Execution flow: decode strings at runtime, resolve the staging host, write the payload to a user-writable directory, then register autostart so the payload runs on each logon. No exploit is required — execution depends on user consent.",
  },
];

function Analyst() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex min-h-[calc(100vh-3rem)] flex-col">
      <div className="p-4 lg:p-6">
        <PageHeader
          title="AI Security Analyst"
          description="Defensive and educational only. Responses explain behaviour, impact and mitigation — never how to build or operate an attack."
          actions={<StatusIndicator state="online" label="pkay-sec-analyst" />}
        />
      </div>

      <div className="grid min-h-0 flex-1 gap-4 px-4 pb-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-6 lg:pb-6">
        <div className="flex min-h-0 flex-col panel">
          <div className="min-h-0 flex-1 space-y-3 overflow-auto p-3">
            <AIMessage role="user">
              Explain what this suspicious startup script is doing and how we should respond.
            </AIMessage>

            <AIMessage role="ai" meta="structured analysis">
              <div className="flex items-center gap-2">
                <span className="label-mono">risk level</span>
                <RiskBadge level="high" />
              </div>

              {sections.map((s) => (
                <div key={s.heading}>
                  <div className="label-mono mb-1">{s.heading}</div>
                  <p className="leading-relaxed">{s.body}</p>
                </div>
              ))}

              <div>
                <div className="label-mono mb-1">Indicators</div>
                <CodeBlock
                  code={`host        193.0.0.0/8 (raw IP, no TLS)
path        %APPDATA%\\Local\\svc-update\\
autostart   HKCU\\...\\Run\\svc-update
hash        sha256:9f2c…c41a (submitted sample)
behaviour   runtime string decode + staged download`}
                />
              </div>

              <div>
                <div className="label-mono mb-1">Recommended Mitigation</div>
                <ul className="list-inside list-disc space-y-1 leading-relaxed">
                  <li>Isolate the host from the network before further triage.</li>
                  <li>Block the staging host at the egress proxy and DNS layer.</li>
                  <li>Remove the autostart entry and the staged directory, then re-image.</li>
                  <li>Rotate credentials and tokens used on the host.</li>
                  <li>Add a detection rule for autostart writes by non-installer processes.</li>
                </ul>
              </div>

              <div>
                <div className="label-mono mb-1">Safe Next Steps</div>
                <p className="leading-relaxed">
                  Collect volatile evidence in a controlled environment, submit the hash to your
                  intelligence provider, and file an incident record. Do not execute the sample
                  outside an isolated analysis lab.
                </p>
              </div>
            </AIMessage>
          </div>

          <div className="shrink-0 border-t border-border p-3">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask about a vulnerability class, log excerpt, code snippet or malware behaviour…"
              className="w-full resize-none rounded-sm border border-border bg-background p-2.5 text-[13px] leading-relaxed placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
            <div className="mt-2 flex items-center gap-1.5">
              <IconButton label="Attach evidence">
                <Paperclip className="size-4" />
              </IconButton>
              <span className="font-mono text-[10px] text-muted-foreground">
                defensive mode locked
              </span>
              <Btn variant="primary" className="ml-auto">
                Analyze <ArrowUp className="size-3.5" />
              </Btn>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Panel title="Response structure">
            <ol className="space-y-1 font-mono text-[11px] text-muted-foreground">
              {[
                "Summary",
                "Risk Level",
                "What Was Detected",
                "Why It Matters",
                "Technical Explanation",
                "Indicators",
                "Recommended Mitigation",
                "Safe Next Steps",
              ].map((s, i) => (
                <li key={s} className="flex gap-2">
                  <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </li>
              ))}
            </ol>
          </Panel>

          <Panel title="Scope policy">
            <div className="flex gap-2">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="text-[12px] leading-relaxed text-muted-foreground">
                The analyst refuses offensive tooling, exploit weaponization and evasion guidance. It
                answers with detection, hardening and remediation content suitable for defenders and
                learners.
              </p>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

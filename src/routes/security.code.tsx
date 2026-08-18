import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, CodeBlock, RiskBadge } from "@/components/pkay/primitives";
import { Btn } from "@/components/pkay/Btn";

export const Route = createFileRoute("/security/code")({
  head: () => ({
    meta: [
      { title: "Code Security — PKAY Security Lab" },
      {
        name: "description",
        content: "AI code security review with insecure-versus-secure diffs and rule coverage.",
      },
      { property: "og:title", content: "Code Security — PKAY Security Lab" },
      { property: "og:description", content: "Review code for insecure patterns and apply hardened rewrites." },
    ],
  }),
  component: CodeSecurity,
});

function CodeSecurity() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader
        title="Code security"
        description="Every finding pairs the insecure pattern with a hardened rewrite you can apply directly."
        actions={<Btn variant="primary">Review current branch</Btn>}
      />

      <Panel
        title="PK-1042 · missing authorization"
        actions={<RiskBadge level="high" />}
      >
        <div className="grid gap-3 lg:grid-cols-2">
          <div>
            <div className="label-mono mb-1.5">insecure</div>
            <CodeBlock
              filename="orders.functions.ts"
              code={`export const listAllOrders = createServerFn({ method: "GET" })
  .handler(async () => {
    // no caller verification, no row scoping
    return db.from("orders").select("*");
  });`}
            />
          </div>
          <div>
            <div className="label-mono mb-1.5">hardened</div>
            <CodeBlock
              filename="orders.functions.ts"
              code={`export const listMyOrders = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    return context.db
      .from("orders")
      .select("id,total,status,created_at")
      .eq("user_id", context.userId);
  });`}
            />
          </div>
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
          Authorization belongs on the server boundary. Scope rows by the authenticated identity and
          select only the columns the client needs.
        </p>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Rule coverage">
          <div className="space-y-2 font-mono text-[11px]">
            {[
              ["authz-server-boundary", "pass"],
              ["sql-parameterization", "pass"],
              ["output-encoding", "warn"],
              ["secret-in-source", "pass"],
              ["dependency-advisories", "warn"],
              ["error-verbosity", "warn"],
            ].map(([rule, state]) => (
              <div key={rule} className="flex items-center justify-between border border-border px-2 py-1.5">
                <span>{rule}</span>
                <span className={state === "pass" ? "text-success" : "text-medium"}>{state}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Secrets scan">
          <CodeBlock
            filename="scan.log"
            code={`scanning 412 files…
0 hardcoded credentials
1 env var referenced at module scope  → move into handler
2 publishable keys in client code     → expected, no action`}
          />
        </Panel>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Eye,
  MessageSquare,
  FolderCode,
  ChevronRight,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/pkay/ThemeToggle";
import { PkayLogo } from "@/components/pkay/PkayLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PKAY — Build the web with AI" },
      {
        name: "description",
        content:
          "PKAY is an AI-powered website and application builder with an integrated cybersecurity workspace. Describe what you want to build.",
      },
      { property: "og:title", content: "PKAY — Build the web with AI" },
      {
        property: "og:description",
        content:
          "AI-powered website and application builder with integrated cybersecurity workspace.",
      },
    ],
  }),
  component: Homepage,
});

function Homepage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <ProductPreview />
        <FeaturesSection />
        <SecuritySection />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ─── Header ─── */

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-sm bg-primary font-mono text-[12px] font-bold text-primary-foreground">
              P
            </span>
            <span className="font-mono text-[15px] font-semibold tracking-tight">
              PKAY
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {[
              { label: "Product", href: "#features" },
              { label: "Security", href: "#security" },
              { label: "Pricing", href: "#" },
              { label: "Docs", to: "/docs" },
            ].map((item) =>
              "to" in item ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="rounded-sm px-3 py-1.5 text-[13px] text-muted-foreground transition-ui hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-sm px-3 py-1.5 text-[13px] text-muted-foreground transition-ui hover:text-foreground"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/console"
            className="hidden rounded-sm px-3 py-1.5 text-[13px] text-muted-foreground transition-ui hover:text-foreground sm:block"
          >
            Sign In
          </Link>
          <ThemeToggle />
          <Link
            to="/console"
            className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-3.5 py-1.5 text-[13px] font-medium text-primary-foreground transition-ui hover:bg-primary-hover"
          >
            Open Console <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ─── Hero ─── */

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-24 text-center lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Build the web{" "}
            <span className="text-primary">with AI.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Describe what you want to build. PKAY turns your ideas into
            production-ready websites and applications.
          </p>
        </div>

        {/* AI prompt box */}
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="rounded-sm border border-border bg-card p-1.5 shadow-sm">
            <div className="flex items-center gap-2 rounded-sm bg-background px-4 py-3">
              <Sparkles className="size-4 shrink-0 text-primary" />
              <input
                type="text"
                readOnly
                placeholder='Build a modern SaaS dashboard with authentication, analytics, and a responsive design.'
                className="flex-1 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between px-3 pt-2 pb-1">
              <span className="font-mono text-[11px] text-muted-foreground">
                Describe your project, app, or website…
              </span>
              <Link
                to="/console"
                className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-4 py-1.5 text-[13px] font-medium text-primary-foreground transition-ui hover:bg-primary-hover"
              >
                Build with PKAY <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick example prompts */}
        <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2">
          {[
            "Landing page",
            "SaaS dashboard",
            "Portfolio site",
            "Admin panel",
          ].map((prompt) => (
            <span
              key={prompt}
              className="rounded-sm border border-border bg-card px-3 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {prompt}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Product Preview ─── */

function ProductPreview() {
  return (
    <section className="border-y border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <span className="label-mono">inside the console</span>
          <h2 className="mt-2 text-2xl font-semibold">
            AI Chat · Live Preview · Files
          </h2>
        </div>
        <div className="rounded-sm border border-border bg-card shadow-sm">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-border" />
              <span className="size-2.5 rounded-full bg-border" />
              <span className="size-2.5 rounded-full bg-border" />
            </div>
            <div className="ml-2 flex-1 rounded-sm bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground">
              pkay.dev/console
            </div>
          </div>
          {/* Console preview mockup */}
          <div className="grid min-h-[400px] grid-cols-1 lg:grid-cols-[280px_1fr_220px]">
            {/* Left — AI Chat */}
            <div className="flex flex-col border-r border-border">
              <div className="border-b border-border px-3 py-2">
                <span className="label-mono flex items-center gap-1.5">
                  <Sparkles className="size-3 text-primary" /> PKAY AI
                </span>
              </div>
              <div className="flex-1 space-y-3 overflow-auto p-3">
                <div className="border-l-2 border-border bg-muted/60 px-3 py-2">
                  <div className="label-mono mb-1">you</div>
                  <div className="text-[12px] text-secondary-foreground">
                    Create a modern landing page for a cybersecurity startup.
                  </div>
                </div>
                <div className="border-l-2 border-primary bg-primary-soft/35 px-3 py-2">
                  <div className="label-mono mb-1 flex items-center gap-1.5 text-accent-foreground">
                    <Sparkles className="size-3" /> pkay ai
                  </div>
                  <div className="space-y-1.5 text-[12px] text-secondary-foreground">
                    <p>
                      I'll create the landing page with a sharp developer-focused
                      design, responsive layout, and security-focused sections.
                    </p>
                    <div className="space-y-0.5 font-mono text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <span className="text-success">✓</span> Created page
                        structure
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-success">✓</span> Added hero
                        section
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-success">✓</span> Added navigation
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-primary">●</span> Refining
                        responsive layout
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-border p-3">
                <div className="flex items-center gap-2 rounded-sm border border-border bg-background px-3 py-2">
                  <span className="text-[12px] text-muted-foreground">
                    Ask PKAY…
                  </span>
                </div>
              </div>
            </div>

            {/* Center — Live Preview */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 border-b border-border px-3 py-2">
                <span className="label-mono">Preview</span>
                <div className="ml-auto flex items-center gap-1">
                  {["desktop", "tablet", "mobile"].map((d) => (
                    <span
                      key={d}
                      className={`rounded-sm px-2 py-0.5 font-mono text-[10px] ${
                        d === "desktop"
                          ? "bg-primary-soft text-accent-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1 bg-background p-6">
                <div className="rounded-sm border border-border bg-card p-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-[13px] font-semibold">
                      CyberShield Security
                    </span>
                    <div className="flex gap-2">
                      <span className="h-2 w-16 rounded-sm bg-primary/40" />
                      <span className="h-2 w-8 rounded-sm bg-muted" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="h-3 w-48 rounded-sm bg-foreground/10" />
                    <div className="h-2 w-72 rounded-sm bg-foreground/5" />
                    <div className="h-2 w-56 rounded-sm bg-foreground/5" />
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="h-20 rounded-sm border border-border bg-muted" />
                      <div className="h-20 rounded-sm border border-border bg-muted" />
                      <div className="h-20 rounded-sm border border-border bg-muted" />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="h-12 rounded-sm border border-border bg-primary-soft/30" />
                      <div className="h-12 rounded-sm border border-border bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Files */}
            <div className="flex flex-col border-l border-border">
              <div className="flex items-center justify-between border-b border-border px-3 py-2">
                <span className="label-mono">Files</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  6 files
                </span>
              </div>
              <div className="flex-1 overflow-auto p-3 font-mono text-[11px]">
                <div className="space-y-0.5">
                  <div className="text-muted-foreground">▾ src</div>
                  <div className="pl-3 text-foreground">
                    ├─ components
                  </div>
                  <div className="pl-6 text-foreground">
                    ├─ Hero.tsx
                  </div>
                  <div className="pl-6 text-foreground">
                    ├─ Navbar.tsx
                  </div>
                  <div className="pl-6 text-foreground">
                    └─ Footer.tsx
                  </div>
                  <div className="pl-3 text-foreground">
                    └─ pages
                  </div>
                  <div className="pl-6 text-foreground">
                    └─ index.tsx
                  </div>
                  <div className="pt-1 text-foreground">▾ public</div>
                  <div className="pl-3 text-foreground">
                    └─ logo.svg
                  </div>
                  <div className="pt-1 text-foreground">
                    package.json
                  </div>
                  <div className="text-foreground">README.md</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Features ─── */

const features = [
  {
    icon: Sparkles,
    title: "AI App Builder",
    description:
      "Generate websites and applications from natural language. Describe what you need and PKAY produces production-ready code.",
  },
  {
    icon: Eye,
    title: "Live Preview",
    description:
      "See changes instantly while PKAY builds your application. The preview updates in real time as the AI generates and modifies code.",
  },
  {
    icon: ShieldCheck,
    title: "AI Security",
    description:
      "Analyze code and applications for security risks. The integrated Security Lab explains vulnerabilities and provides mitigations.",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <span className="label-mono">capabilities</span>
          <h2 className="mt-2 text-2xl font-semibold">
            Everything you need to build and ship
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-sm border border-border bg-card p-6 transition-ui hover:border-primary/40"
            >
              <div className="mb-4 grid size-10 place-items-center rounded-sm bg-primary-soft">
                <f.icon className="size-5 text-primary" />
              </div>
              <h3 className="text-[15px] font-semibold">{f.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Security Section ─── */

function SecuritySection() {
  return (
    <section
      id="security"
      className="border-y border-border bg-background-dark py-20"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="label-mono text-white/40">security lab</span>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Build faster. Ship safer.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-white/60">
              PKAY includes an AI-powered cybersecurity workspace for defensive
              security analysis, code security, vulnerability explanations, and
              security reviews. Every project gets scanned automatically.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "Vulnerability analysis and explanation",
                "Code security reviews",
                "Dependency scanning",
                "Security report generation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <Zap className="size-3.5 text-primary" />
                  <span className="text-[13px] text-white/70">{item}</span>
                </div>
              ))}
            </div>
            <Link
              to="/security"
              className="mt-8 inline-flex items-center gap-1.5 rounded-sm bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-ui hover:bg-primary-hover"
            >
              Open Security Lab <ChevronRight className="size-3.5" />
            </Link>
          </div>

          {/* Security findings preview */}
          <div className="space-y-3">
            {[
              {
                level: "high",
                title: "Missing authorization check",
                loc: "src/lib/orders.functions.ts",
              },
              {
                level: "medium",
                title: "Dependency with known advisory",
                loc: "package.json · parse-path@5.0.0",
              },
              {
                level: "low",
                title: "Missing security headers",
                loc: "deploy config",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-sm border border-white/10 bg-white/5 p-4 transition-ui hover:border-primary/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-1.5 rounded-full ${
                          f.level === "high"
                            ? "bg-high"
                            : f.level === "medium"
                              ? "bg-medium"
                              : "bg-low"
                        }`}
                      />
                      <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                        {f.level}
                      </span>
                    </div>
                    <h4 className="mt-1.5 text-[13px] font-semibold text-white/90">
                      {f.title}
                    </h4>
                  </div>
                  <span className="font-mono text-[10px] text-white/30 whitespace-nowrap">
                    {f.loc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <PkayLogo className="h-10 w-auto" />
        </div>
        <div className="flex items-center gap-6">
          <Link
            to="/docs"
            className="text-[12px] text-muted-foreground transition-ui hover:text-foreground"
          >
            Docs
          </Link>
          <Link
            to="/security"
            className="text-[12px] text-muted-foreground transition-ui hover:text-foreground"
          >
            Security
          </Link>
          <a
            href="#"
            className="text-[12px] text-muted-foreground transition-ui hover:text-foreground"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-[12px] text-muted-foreground transition-ui hover:text-foreground"
          >
            Terms
          </a>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          © 2026 PKAY
        </span>
      </div>
    </footer>
  );
}

import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const next =
    theme === "light" ? "dark" : theme === "dark" ? "system" : "light";

  const label = theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System";
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <button
      onClick={() => setTheme(next)}
      title={`Theme: ${label} — click to switch to ${next}`}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-sm border border-border bg-card px-2 font-mono text-[11px] text-muted-foreground transition-ui hover:border-primary/40 hover:text-foreground",
        className,
      )}
    >
      <Icon className="size-3.5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

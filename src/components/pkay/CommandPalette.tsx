import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const items = [
  { group: "Navigate", label: "Dashboard", to: "/" },
  { group: "Navigate", label: "Projects", to: "/projects" },
  { group: "Navigate", label: "AI Builder", to: "/builder" },
  { group: "Navigate", label: "Templates", to: "/templates" },
  { group: "Navigate", label: "Documentation", to: "/docs" },
  { group: "Navigate", label: "Settings", to: "/settings" },
  { group: "Security Lab", label: "Security Overview", to: "/security" },
  { group: "Security Lab", label: "Malware Analysis", to: "/security/malware" },
  { group: "Security Lab", label: "Vulnerability Analysis", to: "/security/vulnerabilities" },
  { group: "Security Lab", label: "Code Security", to: "/security/code" },
  { group: "Security Lab", label: "Threat Intelligence", to: "/security/threats" },
  { group: "Security Lab", label: "AI Security Analyst", to: "/security/analyst" },
  { group: "Security Lab", label: "Security Reports", to: "/security/reports" },
] as const;

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const groups = ["Navigate", "Security Lab"] as const;

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Run a command or jump to a workspace…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        {groups.map((g) => (
          <CommandGroup key={g} heading={g}>
            {items
              .filter((i) => i.group === g)
              .map((i) => (
                <CommandItem
                  key={i.to}
                  value={i.label}
                  onSelect={() => {
                    onOpenChange(false);
                    navigate({ to: i.to });
                  }}
                  className="font-mono text-[12px]"
                >
                  {i.label}
                  <span className="ml-auto text-[10px] text-muted-foreground">{i.to}</span>
                </CommandItem>
              ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

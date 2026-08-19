import { useTheme } from "@/hooks/use-theme";

interface PkayLogoProps {
  className?: string;
  showText?: boolean;
}

export function PkayLogo({ className = "h-9 w-auto", showText = true }: PkayLogoProps) {
  const { resolved } = useTheme();
  const src = resolved === "dark" ? "/pkay-dark.jpg" : "/pkay-light.jpg";

  return (
    <div className="flex items-center gap-1">
      <img src={src} alt="Pkay" className={className} />
      {showText && (
        <span className="text-lg font-bold tracking-tight">Pkay</span>
      )}
    </div>
  );
}

import { cn } from "@/lib/utils";

interface SportIconProps {
  sport: "FUTEBOL" | "BASQUETE";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SportIcon({ sport, size = "md", className }: SportIconProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  if (sport === "BASQUETE") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(sizeClasses[size], className)}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M4.93 4.93c4.08 4.08 5.07 10.07 2.12 15.07" />
        <path d="M19.07 4.93c-4.08 4.08-5.07 10.07-2.12 15.07" />
        <path d="M2 12h20" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(sizeClasses[size], className)}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  );
}

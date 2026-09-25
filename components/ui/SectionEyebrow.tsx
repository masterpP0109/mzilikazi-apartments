import { cn } from "@/lib/utils";

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
  /** 'light' for use on dark backgrounds, 'dark' for use on light backgrounds */
  theme?: "light" | "dark";
}

export default function SectionEyebrow({
  children,
  className,
  theme = "dark",
}: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        "eyebrow",
        theme === "dark" ? "text-[var(--muted)]" : "text-[var(--surface)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

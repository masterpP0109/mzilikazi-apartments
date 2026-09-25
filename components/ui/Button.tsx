import Link from "next/link";
import { cn } from "@/lib/utils";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "dark" | "ochre-outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}
export default function Button({
  href,
  variant = "primary",
  size,
  className,
  children,
  ...props
}: Props) {
  const classes = cn(
    variant === "ghost"
      ? "text-link"
      : `button button-${variant === "secondary" || variant === "ochre-outline" ? "secondary" : "primary"}`,
    className,
  );
  return href ? (
    <Link href={href} className={classes} data-size={size}>
      {children}
    </Link>
  ) : (
    <button className={classes} data-size={size} {...props}>
      {children}
    </button>
  );
}

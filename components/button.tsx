import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlowButton({
  children,
  className,
  variant = "primary",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  return (
    <a
      className={cn(
        "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-6 text-sm font-semibold transition duration-300",
        variant === "primary"
          ? "bg-foreground text-background shadow-[0_14px_40px_var(--shadow)] hover:shadow-[0_18px_55px_var(--shadow)]"
          : "border border-line bg-background/35 text-foreground hover:border-cyan-glow/40 hover:bg-cyan-glow/10",
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
      <span className="relative flex items-center gap-2">{children}</span>
    </a>
  );
}

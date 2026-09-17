import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "ghost" | "icon" | "nav";
};

export function Button({ className, variant = "ghost", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex shrink-0 items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
        variant === "ghost" && "rounded-md text-muted-foreground hover:bg-accent hover:text-foreground",
        variant === "icon" && "size-9 rounded-full border border-border bg-secondary text-muted-foreground hover:text-foreground",
        variant === "nav" && "w-full rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
import { cn } from "@/lib/utils";
import { formatPKR } from "@/lib/format";

interface AmountProps {
  value: number;
  tone?: "in" | "out" | "neutral" | "pending";
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  showSign?: boolean;
  className?: string;
}

const sizeClasses: Record<NonNullable<AmountProps["size"]>, string> = {
  sm: "text-sm font-semibold",
  md: "text-base font-semibold",
  lg: "text-xl font-bold",
  xl: "text-3xl font-bold tracking-tight",
  hero: "text-5xl font-bold tracking-tight",
};

const toneClasses: Record<NonNullable<AmountProps["tone"]>, string> = {
  in: "text-money-in",
  out: "text-money-out",
  pending: "text-pending",
  neutral: "text-foreground",
};

export function Amount({
  value,
  tone = "neutral",
  size = "md",
  showSign = false,
  className,
}: AmountProps) {
  return (
    <span
      className={cn(
        "tabular whitespace-nowrap",
        sizeClasses[size],
        toneClasses[tone],
        className
      )}
    >
      {formatPKR(value, { sign: showSign })}
    </span>
  );
}

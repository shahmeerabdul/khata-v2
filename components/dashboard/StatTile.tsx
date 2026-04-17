import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Amount } from "@/components/money/Amount";

interface StatTileProps {
  label: string;
  sublabel?: string;
  amount: number;
  tone: "in" | "out" | "neutral" | "pending";
  icon: ReactNode;
  href?: string;
}

const toneBg: Record<StatTileProps["tone"], string> = {
  in: "bg-money-in-bg",
  out: "bg-money-out-bg",
  pending: "bg-pending-bg",
  neutral: "bg-sage-soft",
};

export function StatTile({
  label,
  sublabel,
  amount,
  tone,
  icon,
}: StatTileProps) {
  return (
    <div className="flex-1 rounded-[22px] bg-white p-4 shadow-[0_6px_18px_-10px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "flex size-8 items-center justify-center rounded-full",
            toneBg[tone]
          )}
        >
          {icon}
        </span>
        <div className="leading-tight">
          <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
          {sublabel ? (
            <p className="text-[10px] text-muted-foreground/80">{sublabel}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-3">
        <Amount value={amount} tone={tone} size="lg" />
      </div>
    </div>
  );
}

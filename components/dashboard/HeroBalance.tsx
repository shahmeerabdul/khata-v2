import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Amount } from "@/components/money/Amount";

interface HeroBalanceProps {
  totalReceivable: number;
  pendingDebtCount: number;
}

export function HeroBalance({ totalReceivable, pendingDebtCount }: HeroBalanceProps) {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-hero p-6 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-hero-foreground/70">
            To collect · Bakaya
          </p>
          <p className="text-[11px] text-hero-foreground/60">
            {pendingDebtCount} pending {pendingDebtCount === 1 ? "customer" : "customers"}
          </p>
        </div>
        <Link
          href="/debt"
          aria-label="See all debts"
          className="flex size-10 items-center justify-center rounded-full bg-hero-foreground/10 text-hero-foreground backdrop-blur-sm hover:bg-hero-foreground/20 transition"
        >
          <ArrowUpRight className="size-5" />
        </Link>
      </div>

      <div className="mt-6">
        <Amount
          value={totalReceivable}
          size="hero"
          className="text-hero-foreground"
        />
      </div>

      {/* Decorative dots in the style of the inspo */}
      <div className="pointer-events-none absolute -right-10 -bottom-10 size-40 rounded-full bg-hero-foreground/5" />
      <div className="pointer-events-none absolute -right-4 -bottom-4 size-20 rounded-full bg-hero-foreground/5" />
    </section>
  );
}

import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactAvatar } from "@/components/shared/ContactAvatar";
import { Amount } from "@/components/money/Amount";
import { timeAgo, CATEGORY_LABELS } from "@/lib/format";
import type { Transaction } from "@/lib/types";

interface RecentListProps {
  transactions: Transaction[];
}

const iconFor = {
  debt: ArrowDownLeft,
  payable: ArrowUpRight,
  sale: ShoppingBag,
} as const;

const toneFor = {
  debt: "pending",
  payable: "out",
  sale: "in",
} as const;

const chipBgFor = {
  debt: "bg-pending-bg text-pending",
  payable: "bg-money-out-bg text-money-out",
  sale: "bg-money-in-bg text-money-in",
} as const;

export function RecentList({ transactions }: RecentListProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-[24px] bg-white/80 p-6 text-center ring-1 ring-black/5">
        <p className="text-sm text-muted-foreground">
          No activity yet. Tap the mic to record your first entry.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {transactions.map((t) => {
        const Icon = iconFor[t.category];
        const label = CATEGORY_LABELS[t.category];
        const tone = toneFor[t.category];
        const showSign = t.category !== "debt";
        const amountValue = t.category === "payable" ? -t.amount : t.amount;
        return (
          <li key={t.id}>
            <Link
              href={`/t/${t.id}`}
              className="flex items-center gap-3 rounded-[22px] bg-white p-3.5 shadow-[0_6px_16px_-12px_rgba(0,0,0,0.15)] ring-1 ring-black/5 active:scale-[0.99] transition"
            >
              {t.contactName ? (
                <ContactAvatar name={t.contactName} photoUrl={t.contactPhotoUrl} />
              ) : (
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full",
                    chipBgFor[t.category]
                  )}
                >
                  <Icon className="size-5" strokeWidth={2.25} />
                </span>
              )}
              <div className="flex-1 leading-tight min-w-0">
                <p className="truncate text-sm font-semibold">
                  {t.contactName ?? label.en}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {label.en} · {timeAgo(t.createdAt)}
                  {t.source === "voice" ? " · 🎙" : ""}
                </p>
              </div>
              <Amount
                value={amountValue}
                tone={tone}
                size="md"
                showSign={showSign}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

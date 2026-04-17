import type { Category } from "./types";

export function formatPKR(amount: number, options?: { sign?: boolean }): string {
  const abs = Math.abs(amount);
  const formatted = new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(abs);
  const sign = options?.sign ? (amount < 0 ? "−" : "+") : "";
  return `${sign}Rs. ${formatted}`;
}

export function formatPKRCompact(amount: number): string {
  if (Math.abs(amount) >= 100000) {
    return `Rs. ${(amount / 100000).toFixed(1)}L`;
  }
  if (Math.abs(amount) >= 1000) {
    return `Rs. ${(amount / 1000).toFixed(1)}k`;
  }
  return formatPKR(amount);
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export const CATEGORY_LABELS: Record<
  Category,
  { en: string; ur: string; verb: string; href: string }
> = {
  debt: {
    en: "Debt",
    ur: "Bakaya",
    verb: "owes you",
    href: "/debt",
  },
  payable: {
    en: "Payables",
    ur: "Denay",
    verb: "you owe",
    href: "/payables",
  },
  sale: {
    en: "Sales",
    ur: "Bikri",
    verb: "received",
    href: "/sales",
  },
};

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

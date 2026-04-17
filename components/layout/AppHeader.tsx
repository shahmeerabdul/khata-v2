import Link from "next/link";
import { Bell, Users, ChevronLeft } from "lucide-react";
import { ContactAvatar } from "@/components/shared/ContactAvatar";

interface AppHeaderProps {
  variant?: "home" | "page";
  title?: string;
  subtitle?: string;
  backHref?: string;
}

export function AppHeader({
  variant = "home",
  title,
  subtitle,
  backHref,
}: AppHeaderProps) {
  if (variant === "page") {
    return (
      <header className="flex items-center gap-3 px-5 pt-6 pb-3">
        <Link
          href={backHref ?? "/"}
          aria-label="Back"
          className="flex size-10 items-center justify-center rounded-full bg-white ring-1 ring-border shadow-sm active:scale-95 transition"
        >
          <ChevronLeft className="size-5" />
        </Link>
        <div className="flex-1">
          {title ? (
            <h1 className="text-lg font-bold leading-tight">{title}</h1>
          ) : null}
          {subtitle ? (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between gap-3 px-5 pt-6 pb-2">
      <Link href="/contacts" className="flex items-center gap-3">
        <ContactAvatar name="Shopkeeper" size="md" />
        <div className="leading-tight">
          <p className="text-xs text-muted-foreground">Assalam-o-Alaikum</p>
          <p className="text-sm font-semibold">Shopkeeper</p>
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <Link
          href="/contacts"
          aria-label="Contacts"
          className="flex size-10 items-center justify-center rounded-full bg-white ring-1 ring-border shadow-sm active:scale-95 transition"
        >
          <Users className="size-5" />
        </Link>
        <button
          aria-label="Notifications"
          className="flex size-10 items-center justify-center rounded-full bg-white ring-1 ring-border shadow-sm active:scale-95 transition"
        >
          <Bell className="size-5" />
        </button>
      </div>
    </header>
  );
}

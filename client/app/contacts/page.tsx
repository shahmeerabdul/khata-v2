import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { MobileShell } from "@/components/layout/MobileShell";
import { ContactAvatar } from "@/components/shared/ContactAvatar";
import { listContacts } from "@/lib/actions";

export default async function ContactsPage() {
  const contacts = await listContacts();
  return (
    <>
      <AppHeader variant="page" title="Contacts" subtitle="Customers you transact with" backHref="/" />
      <MobileShell>
        <ul className="space-y-2">
          {contacts.map((c) => (
            <li key={c.id}>
              <Link
                href={`/contacts/${c.id}`}
                className="flex items-center gap-3 rounded-[22px] bg-white p-3.5 shadow-[0_6px_16px_-12px_rgba(0,0,0,0.15)] ring-1 ring-black/5 active:scale-[0.99] transition"
              >
                <ContactAvatar name={c.name} />
                <div className="flex-1 leading-tight min-w-0">
                  <p className="truncate text-sm font-semibold">{c.name}</p>
                  <p className="text-[11px] text-muted-foreground">{c.phone}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </MobileShell>
    </>
  );
}

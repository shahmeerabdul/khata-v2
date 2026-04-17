import { AppHeader } from "@/components/layout/AppHeader";
import { MobileShell } from "@/components/layout/MobileShell";
import { RecentList } from "@/components/dashboard/RecentList";
import { listTransactions } from "@/lib/actions";

export default async function PayablesPage() {
  const items = await listTransactions("payable");
  return (
    <>
      <AppHeader variant="page" title="Payables · Denay" subtitle="What you owe suppliers" backHref="/" />
      <MobileShell>
        <RecentList transactions={items} />
      </MobileShell>
    </>
  );
}

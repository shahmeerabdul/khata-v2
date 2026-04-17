import { AppHeader } from "@/components/layout/AppHeader";
import { MobileShell } from "@/components/layout/MobileShell";
import { RecentList } from "@/components/dashboard/RecentList";
import { listTransactions } from "@/lib/actions";

export default async function SalesPage() {
  const items = await listTransactions("sale");
  return (
    <>
      <AppHeader variant="page" title="Sales · Bikri" subtitle="Cash sales today" backHref="/" />
      <MobileShell>
        <RecentList transactions={items} />
      </MobileShell>
    </>
  );
}

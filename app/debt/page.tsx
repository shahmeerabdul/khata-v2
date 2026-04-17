import { AppHeader } from "@/components/layout/AppHeader";
import { MobileShell } from "@/components/layout/MobileShell";
import { RecentList } from "@/components/dashboard/RecentList";
import { listTransactions } from "@/lib/actions";

export default async function DebtPage() {
  const items = await listTransactions("debt");
  return (
    <>
      <AppHeader variant="page" title="Debt · Bakaya" subtitle="What customers owe you" backHref="/" />
      <MobileShell>
        <RecentList transactions={items} />
      </MobileShell>
    </>
  );
}

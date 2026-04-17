import { AppHeader } from "@/components/layout/AppHeader";
import { MobileShell } from "@/components/layout/MobileShell";
import { RecentList } from "@/components/dashboard/RecentList";
import { listLedger } from "@/lib/actions";

export default async function DebtPage() {
  const entries = await listLedger("debt");
  return (
    <>
      <AppHeader variant="page" title="Debt · Bakaya" subtitle="What customers owe you" backHref="/" />
      <MobileShell>
        <RecentList entries={entries} />
      </MobileShell>
    </>
  );
}

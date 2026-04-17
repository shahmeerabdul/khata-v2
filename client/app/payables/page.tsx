import { AppHeader } from "@/components/layout/AppHeader";
import { MobileShell } from "@/components/layout/MobileShell";
import { RecentList } from "@/components/dashboard/RecentList";
import { listLedger } from "@/lib/actions";

export default async function PayablesPage() {
  const entries = await listLedger("payable");
  return (
    <>
      <AppHeader variant="page" title="Payables · Denay" subtitle="What you owe suppliers" backHref="/" />
      <MobileShell>
        <RecentList entries={entries} />
      </MobileShell>
    </>
  );
}

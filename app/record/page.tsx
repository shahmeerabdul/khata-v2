import { AppHeader } from "@/components/layout/AppHeader";
import { MobileShell } from "@/components/layout/MobileShell";
import { Mic } from "lucide-react";

export default function RecordPage() {
  return (
    <>
      <AppHeader variant="page" title="Record" subtitle="Press and hold to speak" backHref="/" />
      <MobileShell>
        <div className="flex flex-1 flex-col items-center justify-center gap-6 pt-10 pb-24 text-center">
          <p className="max-w-[18rem] text-sm text-muted-foreground">
            Voice capture UI will live here. Hold the button, speak naturally in Urdu or Pashto, release to parse.
          </p>
          <button
            type="button"
            className="group relative flex size-40 items-center justify-center rounded-full bg-ink text-background shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] active:scale-95 transition"
          >
            <span className="absolute inset-0 rounded-full bg-ink animate-ping opacity-20" />
            <Mic className="size-16" strokeWidth={2} />
          </button>
          <p className="text-xs text-muted-foreground">
            Coming up next: recording states, live transcript, and confirmation screen.
          </p>
        </div>
      </MobileShell>
    </>
  );
}

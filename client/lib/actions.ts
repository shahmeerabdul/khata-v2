/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  FRONTEND-LOCAL STUB ACTIONS.
 *
 *  ⚠️  These are temporary placeholders that return mock data so the UI
 *      renders during development. Real actions live in `@khata/server`
 *      and expose an import surface like:
 *
 *        import { transcribeAudio } from "@khata/server/actions/stt";
 *        import { parseIntent } from "@khata/server/actions/parser";
 *        import { listRecords } from "@khata/server/actions/records";
 *
 *      Once the backend teammate lands Part 2 (server/src/actions/*), replace
 *      the bodies below with thin wrappers that call the real actions and
 *      `openRecord()` from `@khata/server/encryption` before returning data
 *      to the UI. Keep the exported function SIGNATURES stable if possible.
 *
 *      Every real server action returns `ActionResult<T>`. These mocks do
 *      NOT yet — they return plain values — so the eventual replacement
 *      will tighten the types and add error handling at call-sites.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use server";

import type {
  Contact,
  Debt,
  Payable,
  Sale,
  LedgerCategory,
  LedgerEntry,
  DashboardStats,
  ParsedIntent,
  ConfirmationPayload,
} from "./types";
import { debtToEntry, payableToEntry, saleToEntry } from "./types";

const NOW = Date.now();
const MIN = 60_000;
const HOUR = 60 * MIN;

/* -------------------------------------------------------------------------- */
/*  Mock data — delete once real actions land.                                */
/* -------------------------------------------------------------------------- */

const MOCK_CONTACTS: Contact[] = [
  {
    id: "c_ahmed",
    name: "Ahmed Khan",
    phone: "+923001234567",
    createdAt: NOW - 30 * 24 * HOUR,
    updatedAt: NOW,
  },
  {
    id: "c_zainab",
    name: "Zainab Bibi",
    phone: "+923217654321",
    createdAt: NOW - 10 * 24 * HOUR,
    updatedAt: NOW,
  },
];

const MOCK_DEBTS: Debt[] = [
  {
    id: "d_1",
    contactId: "c_ahmed",
    amount: 500,
    date: NOW - 2 * HOUR,
    notes: "Morning purchase",
    settled: false,
    createdAt: NOW - 2 * HOUR,
    updatedAt: NOW - 2 * HOUR,
  },
  {
    id: "d_2",
    contactId: "c_zainab",
    amount: 320,
    date: NOW - 5 * HOUR,
    settled: false,
    createdAt: NOW - 5 * HOUR,
    updatedAt: NOW - 5 * HOUR,
  },
];

const MOCK_PAYABLES: Payable[] = [
  {
    id: "p_1",
    wholesalerName: "Bilal Wholesale",
    amount: 8400,
    date: NOW - 3 * HOUR,
    notes: "Weekly restock",
    paid: false,
    createdAt: NOW - 3 * HOUR,
    updatedAt: NOW - 3 * HOUR,
  },
];

const MOCK_SALES: Sale[] = [
  {
    id: "s_1",
    items: [
      { name: "tea", quantity: 2, unitPrice: 300, lineTotal: 600 },
      { name: "sugar", quantity: 1, unitPrice: 600, lineTotal: 600 },
    ],
    total: 1200,
    date: NOW - HOUR,
    createdAt: NOW - HOUR,
    updatedAt: NOW - HOUR,
  },
];

const contactById = (id?: string) =>
  id ? MOCK_CONTACTS.find((c) => c.id === id) : undefined;

/* -------------------------------------------------------------------------- */
/*  Dashboard                                                                 */
/* -------------------------------------------------------------------------- */

export async function getDashboardStats(): Promise<DashboardStats> {
  const openDebts = MOCK_DEBTS.filter((d) => !d.settled);
  const openPayables = MOCK_PAYABLES.filter((p) => !p.paid);
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const todaySales = MOCK_SALES.filter(
    (s) => s.date >= startOfDay.getTime()
  ).reduce((sum, s) => sum + s.total, 0);
  return {
    totalReceivable: openDebts.reduce((s, d) => s + d.amount, 0),
    totalPayable: openPayables.reduce((s, p) => s + p.amount, 0),
    todaySales,
    pendingDebtCount: openDebts.length,
    pendingPayableCount: openPayables.length,
  };
}

/* -------------------------------------------------------------------------- */
/*  Unified ledger (view model)                                               */
/* -------------------------------------------------------------------------- */

export async function listLedger(
  category?: LedgerCategory
): Promise<LedgerEntry[]> {
  const all: LedgerEntry[] = [
    ...MOCK_DEBTS.map((d) => debtToEntry(d, contactById(d.contactId))),
    ...MOCK_PAYABLES.map((p) => payableToEntry(p)),
    ...MOCK_SALES.map((s) => saleToEntry(s, contactById(s.customerContactId))),
  ].sort((a, b) => b.date - a.date);
  return category ? all.filter((e) => e.category === category) : all;
}

/* -------------------------------------------------------------------------- */
/*  Contacts                                                                  */
/* -------------------------------------------------------------------------- */

export async function listContacts(): Promise<Contact[]> {
  return [...MOCK_CONTACTS].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getContact(id: string): Promise<Contact | null> {
  return MOCK_CONTACTS.find((c) => c.id === id) ?? null;
}

/* -------------------------------------------------------------------------- */
/*  Voice pipeline (placeholder — real pipeline is server/src/actions/*)      */
/* -------------------------------------------------------------------------- */

export async function previewVoice(transcript: string): Promise<ParsedIntent> {
  return {
    action: "add_debt",
    payload: {
      contactName: "Ahmed",
      amount: 500,
      notes: transcript,
    },
    confidence: 0.92,
  };
}

export async function buildConfirmation(
  intent: ParsedIntent
): Promise<ConfirmationPayload> {
  if (intent.action === "add_debt") {
    return {
      intent,
      summary: `Debt of Rs. ${intent.payload.amount} from ${intent.payload.contactName}`,
      suggestedContactMatches: [
        { contactId: "c_ahmed", name: "Ahmed Khan", similarity: 0.91 },
      ],
      draftRecord: {
        kind: "debt",
        value: {
          contactId: "c_ahmed",
          amount: intent.payload.amount,
          date: Date.now(),
          notes: intent.payload.notes,
          settled: false,
        },
      },
      autoConfirm: false,
    };
  }
  return {
    intent,
    summary: "Unrecognized intent",
    autoConfirm: false,
  };
}

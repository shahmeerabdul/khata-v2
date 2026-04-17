/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️  FRONTEND PLACEHOLDER SERVER ACTIONS — BACKEND TEAMMATE OWNS THIS FILE.
 *
 *  Every function here is a STUB returning mock data so the UI can render
 *  during frontend development. Replace each function body with your real
 *  server action (encryption + decryption handled inside, NOT at the
 *  call-site).
 *
 *  The UI will call these via `import { ... } from "@/lib/actions"`.
 *  Keep the exported names and signatures stable if at all possible.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use server";

import type {
  Contact,
  ContactInput,
  DashboardStats,
  Transaction,
  TransactionInput,
  VoiceParseResult,
  Category,
} from "./types";

/* -------------------------------------------------------------------------- */
/*  Mock data — delete once real actions land.                                */
/* -------------------------------------------------------------------------- */

const MOCK_CONTACTS: Contact[] = [
  {
    id: "c_ahmed",
    name: "Ahmed Khan",
    phone: "0300-1234567",
    kind: "customer",
    balance: 1250,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "c_bilal",
    name: "Bilal Store",
    phone: "0321-7654321",
    kind: "supplier",
    balance: -8400,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "c_zainab",
    name: "Zainab Bibi",
    kind: "customer",
    balance: 320,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "t_1",
    category: "debt",
    amount: 500,
    currency: "PKR",
    contactId: "c_ahmed",
    contactName: "Ahmed Khan",
    items: [{ name: "sugar", quantity: 2, unit: "kg" }],
    note: "Morning purchase",
    source: "voice",
    rawTranscript: "Ahmed ko paanch sau ka udhaar, do kilo chini",
    settled: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "t_2",
    category: "sale",
    amount: 1200,
    currency: "PKR",
    source: "manual",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "t_3",
    category: "payable",
    amount: 8400,
    currency: "PKR",
    contactId: "c_bilal",
    contactName: "Bilal Store",
    note: "Weekly restock",
    source: "manual",
    settled: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "t_4",
    category: "debt",
    amount: 320,
    currency: "PKR",
    contactId: "c_zainab",
    contactName: "Zainab Bibi",
    source: "voice",
    rawTranscript: "Zainab ko teen sau bees udhaar",
    settled: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

/* -------------------------------------------------------------------------- */
/*  Dashboard                                                                 */
/* -------------------------------------------------------------------------- */

export async function getDashboardStats(): Promise<DashboardStats> {
  return {
    totalReceivable: 1570,
    totalPayable: 8400,
    todaySales: 1200,
    pendingDebtCount: 2,
    currency: "PKR",
  };
}

/* -------------------------------------------------------------------------- */
/*  Transactions                                                              */
/* -------------------------------------------------------------------------- */

export async function listTransactions(
  category?: Category
): Promise<Transaction[]> {
  const all = [...MOCK_TRANSACTIONS].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
  return category ? all.filter((t) => t.category === category) : all;
}

export async function getTransaction(id: string): Promise<Transaction | null> {
  return MOCK_TRANSACTIONS.find((t) => t.id === id) ?? null;
}

export async function createTransaction(
  input: TransactionInput
): Promise<Transaction> {
  const now = new Date().toISOString();
  return {
    id: `t_${Math.random().toString(36).slice(2, 9)}`,
    category: input.category,
    amount: input.amount,
    currency: input.currency ?? "PKR",
    contactId: input.contactId,
    contactName: input.contactName,
    items: input.items,
    note: input.note,
    source: input.source,
    rawTranscript: input.rawTranscript,
    settled: false,
    createdAt: now,
    updatedAt: now,
  };
}

export async function updateTransaction(
  id: string,
  input: Partial<TransactionInput> & { settled?: boolean }
): Promise<Transaction> {
  const existing =
    MOCK_TRANSACTIONS.find((t) => t.id === id) ?? MOCK_TRANSACTIONS[0];
  return {
    ...existing,
    ...input,
    updatedAt: new Date().toISOString(),
  } as Transaction;
}

export async function deleteTransaction(id: string): Promise<void> {
  void id;
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

export async function upsertContact(input: ContactInput): Promise<Contact> {
  const now = new Date().toISOString();
  return {
    id: input.id ?? `c_${Math.random().toString(36).slice(2, 9)}`,
    name: input.name,
    phone: input.phone,
    photoUrl: input.photoUrl,
    aliases: input.aliases,
    kind: input.kind,
    balance: 0,
    createdAt: now,
    updatedAt: now,
  };
}

/* -------------------------------------------------------------------------- */
/*  Voice pipeline                                                            */
/* -------------------------------------------------------------------------- */

export async function processVoice(args: {
  transcript?: string;
  audioBase64?: string;
}): Promise<VoiceParseResult> {
  const transcript =
    args.transcript ?? "Ahmed ko paanch sau ka udhaar, do kilo chini";
  return {
    parseId: `p_${Math.random().toString(36).slice(2, 9)}`,
    category: "debt",
    amount: 500,
    currency: "PKR",
    suggestedContact: MOCK_CONTACTS[0],
    alternativeContacts: [MOCK_CONTACTS[2]],
    items: [{ name: "sugar", quantity: 2, unit: "kg" }],
    note: undefined,
    rawTranscript: transcript,
    confidence: 0.92,
    warnings: [],
  };
}

export async function confirmVoiceTransaction(
  parseId: string,
  edits?: Partial<TransactionInput>
): Promise<Transaction> {
  void parseId;
  return createTransaction({
    category: edits?.category ?? "debt",
    amount: edits?.amount ?? 500,
    currency: "PKR",
    contactId: edits?.contactId ?? "c_ahmed",
    contactName: edits?.contactName ?? "Ahmed Khan",
    items: edits?.items,
    note: edits?.note,
    source: "voice",
    rawTranscript: edits?.rawTranscript,
  });
}

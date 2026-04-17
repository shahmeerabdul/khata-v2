/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Client-side type bridge.
 *
 *  The authoritative domain types live in `@khata/server` (see
 *  `server/src/types.ts`). This file:
 *    1. Re-exports those types so UI code can `import { Contact, Debt, ... }
 *       from "@/lib/types"` without reaching across the workspace.
 *    2. Adds UI-only view-model types (LedgerEntry, DashboardStats, etc.)
 *       that the components render against.
 *
 *  NEVER add persistence or crypto logic here — that lives in @khata/server.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type {
  // Primitives
  Id,
  EpochMs,
  PakistanPhone,
  RupeeAmount,
  // Domain records
  Contact,
  Debt,
  Payable,
  Sale,
  SaleItem,
  // Union helpers
  RecordKind,
  RecordOfKind,
  AnyRecord,
  // Encryption envelope
  EncryptedRecord,
  VaultMeta,
  // LLM parser
  ParsedIntent,
  IntentAction,
  // Server action wire types
  ActionResult,
  ActionErrorCode,
  STTInput,
  STTResult,
  WhatsAppSendInput,
  WhatsAppSendResult,
  ConfirmationPayload,
  ContactMatch,
  DraftRecord,
  NewRecordInput,
  UpdateRecordInput,
} from "@khata/server/types";

import type {
  Contact,
  Debt,
  Payable,
  Sale,
  SaleItem,
  EpochMs,
  Id,
  RupeeAmount,
} from "@khata/server/types";

/* -------------------------------------------------------------------------- */
/*  UI-only view model                                                        */
/* -------------------------------------------------------------------------- */

/** The three top-level record kinds the UI surfaces in lists/tabs. */
export type LedgerCategory = "debt" | "payable" | "sale";

/**
 * Flat display shape used across lists, recent activity, dashboard cards.
 * Produced by `toLedgerEntry()` from any Debt | Payable | Sale.
 */
export interface LedgerEntry {
  id: Id;
  category: LedgerCategory;
  amount: RupeeAmount;
  date: EpochMs;
  /** Customer name (debt/sale) or wholesaler name (payable). */
  displayName?: string;
  contactId?: Id;
  wholesalerName?: string;
  items?: SaleItem[];
  notes?: string;
  /** True when a debt is fully paid back. */
  settled?: boolean;
  /** True when a payable has been paid to the wholesaler. */
  paid?: boolean;
  /** Whether this entry was recorded via voice (for the 🎙 badge). */
  viaVoice?: boolean;
}

export interface DashboardStats {
  /** Sum of open (unsettled) debts — money customers owe you. */
  totalReceivable: RupeeAmount;
  /** Sum of open (unpaid) payables — money you owe suppliers. */
  totalPayable: RupeeAmount;
  /** Sum of today's sales totals. */
  todaySales: RupeeAmount;
  /** Count of open debts. */
  pendingDebtCount: number;
  /** Count of open payables. */
  pendingPayableCount: number;
}

/* -------------------------------------------------------------------------- */
/*  Converters (pure, no side effects)                                        */
/* -------------------------------------------------------------------------- */

export function debtToEntry(d: Debt, contact?: Contact): LedgerEntry {
  return {
    id: d.id,
    category: "debt",
    amount: d.amount,
    date: d.date,
    contactId: d.contactId,
    displayName: contact?.name,
    notes: d.notes,
    settled: d.settled,
  };
}

export function payableToEntry(p: Payable): LedgerEntry {
  return {
    id: p.id,
    category: "payable",
    amount: p.amount,
    date: p.date,
    wholesalerName: p.wholesalerName,
    displayName: p.wholesalerName,
    notes: p.notes,
    paid: p.paid,
  };
}

export function saleToEntry(s: Sale, contact?: Contact): LedgerEntry {
  return {
    id: s.id,
    category: "sale",
    amount: s.total,
    date: s.date,
    contactId: s.customerContactId,
    displayName: contact?.name,
    items: s.items,
    notes: s.notes,
  };
}

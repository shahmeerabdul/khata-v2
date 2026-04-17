/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️  FRONTEND PLACEHOLDER — BACKEND TEAMMATE OWNS THIS FILE.
 *
 *  These types are a best-guess contract so the UI can compile and render.
 *  Replace every type in this file with your real, authoritative shapes.
 *  Try to keep field names the same where reasonable so the UI stays stable.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** The three top-level record categories in the app. */
export type Category = "debt" | "payable" | "sale";

/** Currency — PKR only for MVP. */
export type Currency = "PKR";

/** How a transaction was recorded. */
export type TransactionSource = "voice" | "manual";

/** A single line-item inside a transaction (e.g. "sugar × 2 kg"). */
export interface LineItem {
  name: string;
  quantity?: number;
  unit?: string;
}

/** A person the shopkeeper transacts with. */
export interface Contact {
  id: string;
  name: string;
  /** Optional phone in E.164-ish form or local format. */
  phone?: string;
  /** Data-URL or remote URL — keep flexible for MVP. */
  photoUrl?: string;
  /** Known aliases / misspellings used for fuzzy matching. */
  aliases?: string[];
  kind: "customer" | "supplier" | "other";
  /** Net outstanding with this contact in PKR. Positive = they owe us. */
  balance?: number;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

/** A single ledger entry. */
export interface Transaction {
  id: string;
  category: Category;
  amount: number; // always positive; sign is implied by category
  currency: Currency;
  contactId?: string;
  /** Snapshot of contact info at time of creation (denormalised for UI). */
  contactName?: string;
  contactPhotoUrl?: string;
  items?: LineItem[];
  note?: string;
  source: TransactionSource;
  /** Raw transcript if source === 'voice'. */
  rawTranscript?: string;
  /** Whether a payable/debt is settled. Not applicable to sales. */
  settled?: boolean;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

/** Aggregated numbers shown on the dashboard. */
export interface DashboardStats {
  /** Total money customers owe the shop (sum of open debts). */
  totalReceivable: number;
  /** Total money the shop owes suppliers (sum of open payables). */
  totalPayable: number;
  /** Sum of sales recorded today. */
  todaySales: number;
  /** Number of unpaid debts across all customers. */
  pendingDebtCount: number;
  currency: Currency;
}

/**
 * Result of sending audio/transcript to the AI parsing layer.
 * Returned by the /api/process-audio server action.
 */
export interface VoiceParseResult {
  /** Temporary id for this parse session — used on confirm. */
  parseId: string;
  /** Best guess of category. */
  category: Category;
  /** Amount in PKR. */
  amount: number;
  currency: Currency;
  /** Matched/suggested contact; may be null if nothing matched. */
  suggestedContact: Contact | null;
  /** Alternative contact matches, ranked by confidence. */
  alternativeContacts?: Contact[];
  items?: LineItem[];
  note?: string;
  rawTranscript: string;
  /** 0–1 confidence of the overall parse. */
  confidence: number;
  /** Human-readable warnings (e.g. "couldn't identify customer"). */
  warnings?: string[];
}

/** Input for creating a transaction manually or confirming a voice parse. */
export interface TransactionInput {
  category: Category;
  amount: number;
  currency?: Currency;
  contactId?: string;
  /** If no contactId given, create/find contact by this name. */
  contactName?: string;
  items?: LineItem[];
  note?: string;
  source: TransactionSource;
  rawTranscript?: string;
}

/** Input for creating or upserting a contact. */
export interface ContactInput {
  id?: string;
  name: string;
  phone?: string;
  photoUrl?: string;
  aliases?: string[];
  kind: Contact["kind"];
}

import type { BadgeProps } from "@/components/ui/badge";
import type { AccountType } from "@/types";

export const BANKS: { value: string; label: string }[] = [
  { value: "boursorama", label: "Boursorama" },
  { value: "revolut", label: "Revolut" },
  { value: "caisse_depargne", label: "Caisse d'Épargne" },
];

export const BANK_LABELS: Record<string, string> = Object.fromEntries(
  BANKS.map((b) => [b.value, b.label]),
);

export const ACCOUNT_TYPES: { value: AccountType; label: string }[] = [
  { value: "checking", label: "Courant" },
  { value: "savings", label: "Épargne" },
  { value: "brokerage", label: "Bourse" },
  { value: "crypto", label: "Crypto" },
];

const ACCOUNT_TYPE_ALIASES: Record<string, AccountType> = {
  checking: "checking",
  current: "checking",
  courant: "checking",
  savings: "savings",
  saving: "savings",
  epargne: "savings",
  brokerage: "brokerage",
  investment: "brokerage",
  investments: "brokerage",
  trading: "brokerage",
  crypto: "crypto",
};

type AccountTypeMeta = {
  label: string;
  badgeVariant: BadgeProps["variant"];
  badgeClass: string;
};

const ACCOUNT_TYPE_META: Record<AccountType, AccountTypeMeta> = {
  checking: {
    label: "Courant",
    badgeVariant: "default",
    badgeClass: "bg-primary/15 text-primary",
  },
  savings: {
    label: "Épargne",
    badgeVariant: "success",
    badgeClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  brokerage: {
    label: "Bourse",
    badgeVariant: "warning",
    badgeClass: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  },
  crypto: {
    label: "Crypto",
    badgeVariant: "secondary",
    badgeClass: "bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300",
  },
};

export const TYPE_LABELS: Record<string, string> = Object.fromEntries(
  Object.entries(ACCOUNT_TYPE_META).map(([type, meta]) => [type, meta.label]),
);

export const TYPE_BADGE_VARIANT: Record<string, BadgeProps["variant"]> =
  Object.fromEntries(
    Object.entries(ACCOUNT_TYPE_META).map(([type, meta]) => [
      type,
      meta.badgeVariant,
    ]),
  );

export const TYPE_BADGE_STYLES: Record<string, string> = Object.fromEntries(
  Object.entries(ACCOUNT_TYPE_META).map(([type, meta]) => [type, meta.badgeClass]),
);

function normalizeAccountType(type: string): string {
  return type.trim().toLowerCase().replace(/[-\s]+/g, "_");
}

export function getAccountTypeLabel(type: string): string {
  const normalizedType = normalizeAccountType(type);
  const key = ACCOUNT_TYPE_ALIASES[normalizedType];
  return key ? ACCOUNT_TYPE_META[key].label : type;
}

export function getAccountTypeBadgeVariant(type: string): BadgeProps["variant"] {
  const normalizedType = normalizeAccountType(type);
  const key = ACCOUNT_TYPE_ALIASES[normalizedType];
  return key ? ACCOUNT_TYPE_META[key].badgeVariant : "secondary";
}

export function getAccountTypeBadgeClass(type: string): string {
  const normalizedType = normalizeAccountType(type);
  const key = ACCOUNT_TYPE_ALIASES[normalizedType];
  return key ? ACCOUNT_TYPE_META[key].badgeClass : "bg-secondary text-secondary-foreground";
}

import { cn } from "@/lib/utils";

interface TransactionAmountProps {
  amount: string;
  currency?: string;
  className?: string;
}

function formatAmount(amount: number, currency = "EUR"): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
  }).format(amount);
}

export function TransactionAmount({
  amount,
  currency = "EUR",
  className,
}: TransactionAmountProps) {
  const numericAmount = parseFloat(amount);
  const amountColorClass =
    numericAmount > 0
      ? "text-emerald-600 dark:text-emerald-400"
      : numericAmount < 0
        ? "text-red-600 dark:text-red-400"
        : "text-foreground";

  return (
    <div
      className={cn(
        "block w-full whitespace-nowrap text-right font-medium tabular-nums",
        amountColorClass,
        className,
      )}
    >
      {numericAmount > 0 ? "+" : ""}
      {formatAmount(numericAmount, currency)}
    </div>
  );
}

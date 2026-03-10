import type { MileageOutput } from "@/engine/us/mileage";

interface Props {
  result: MileageOutput;
}

export default function MileageResult({ result }: Props) {
  const bestDeduction = Math.max(result.standardDeduction, result.actualDeduction);

  return (
    <div className="space-y-6">
      {/* Recommendation */}
      <div className="rounded-xl p-6 text-center bg-green-50 border-2 border-green-200 dark:bg-green-900/20 dark:border-green-800">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Recommended: {result.recommendedMethod === "actual" ? "Actual Expenses" : "Standard Mileage Rate"}
        </p>
        <p className="mt-2 text-4xl font-bold text-green-600 dark:text-green-400">
          ${formatUSD(bestDeduction)}
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          maximum deduction per year
        </p>
      </div>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-2 gap-3">
        <MethodCard
          title="Standard Mileage"
          amount={result.standardDeduction}
          recommended={result.recommendedMethod === "standard"}
          details={[
            `$${result.standardRate}/mile`,
            "Simple tracking (just log miles)",
            "Includes gas, insurance, depreciation",
          ]}
        />
        <MethodCard
          title="Actual Expenses"
          amount={result.actualDeduction}
          recommended={result.recommendedMethod === "actual"}
          details={[
            `${Math.round(result.totalActualExpenses > 0 ? (result.actualDeduction / result.totalActualExpenses) * 100 : 0)}% business use applied`,
            `$${formatUSD(result.totalActualExpenses)} total expenses`,
            "Requires all receipts",
          ]}
        />
      </div>

      {result.actualAdvantage !== 0 && result.totalActualExpenses > 0 && (
        <div className="rounded-lg bg-blue-50 px-4 py-3 text-sm dark:bg-blue-900/15">
          {result.actualAdvantage > 0 ? (
            <p className="text-blue-700 dark:text-blue-300">
              Actual Expenses saves <strong>${formatUSD(result.actualAdvantage)}</strong> more,
              but requires tracking all vehicle expenses with receipts.
            </p>
          ) : (
            <p className="text-blue-700 dark:text-blue-300">
              Standard Mileage saves <strong>${formatUSD(Math.abs(result.actualAdvantage))}</strong> more
              and only requires a mileage log — much simpler!
            </p>
          )}
        </div>
      )}

      {/* Breakdown */}
      <div className="rounded-xl border border-gray-200 divide-y divide-gray-100 dark:border-dark-border dark:divide-dark-border">
        <Row label="Standard Mileage Deduction" value={result.standardDeduction} />
        {result.totalActualExpenses > 0 && (
          <>
            <Row label="Total Vehicle Expenses" value={result.totalActualExpenses} />
            <Row label="Actual Expense Deduction" value={result.actualDeduction} />
          </>
        )}
        <Row label="Best Deduction" value={bestDeduction} bold accent />
      </div>
    </div>
  );
}

function MethodCard({
  title,
  amount,
  recommended,
  details,
}: {
  title: string;
  amount: number;
  recommended: boolean;
  details: string[];
}) {
  return (
    <div className={`rounded-xl border p-4 ${
      recommended
        ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10"
        : "border-gray-200 dark:border-dark-border"
    }`}>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
      {recommended && (
        <span className="text-xs font-medium text-green-600 dark:text-green-400">Recommended</span>
      )}
      <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
        ${formatUSD(amount)}
      </p>
      <ul className="mt-2 space-y-1">
        {details.map((d, i) => (
          <li key={i} className="text-xs text-gray-500 dark:text-gray-400">{d}</li>
        ))}
      </ul>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  accent,
}: {
  label: string;
  value: number;
  bold?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between px-5 py-3">
      <span className={`text-sm ${bold ? "font-semibold text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
        {label}
      </span>
      <span className={`text-sm tabular-nums ${bold ? "font-semibold" : ""} ${accent ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-white"}`}>
        ${formatUSD(value)}
      </span>
    </div>
  );
}

function formatUSD(value: number): string {
  return value.toLocaleString("en-US");
}

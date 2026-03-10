import type { HomeOfficeOutput } from "@/engine/us/home-office";

interface Props {
  result: HomeOfficeOutput;
}

export default function HomeOfficeResult({ result }: Props) {
  const bestDeduction = Math.max(result.simplifiedDeduction, result.regularDeduction);

  return (
    <div className="space-y-6">
      {/* Recommendation */}
      <div className="rounded-xl p-6 text-center bg-green-50 border-2 border-green-200 dark:bg-green-900/20 dark:border-green-800">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Recommended: {result.recommendedMethod === "regular" ? "Regular Method" : "Simplified Method"}
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
          title="Simplified Method"
          amount={result.simplifiedDeduction}
          recommended={result.recommendedMethod === "simplified"}
          details={[
            `$5 × ${Math.min(300, Math.round(result.simplifiedDeduction / 5))} sq ft`,
            "No expense tracking needed",
            "Max $1,500/year",
          ]}
        />
        <MethodCard
          title="Regular Method"
          amount={result.regularDeduction}
          recommended={result.recommendedMethod === "regular"}
          details={[
            `${result.businessUsePercentage}% business use`,
            `$${formatUSD(result.totalHomeExpenses)} total expenses`,
            "Requires expense records",
          ]}
        />
      </div>

      {result.regularAdvantage !== 0 && (
        <div className="rounded-lg bg-blue-50 px-4 py-3 text-sm dark:bg-blue-900/15">
          {result.regularAdvantage > 0 ? (
            <p className="text-blue-700 dark:text-blue-300">
              The Regular Method saves you <strong>${formatUSD(result.regularAdvantage)}</strong> more
              than Simplified, but requires keeping detailed expense records.
            </p>
          ) : (
            <p className="text-blue-700 dark:text-blue-300">
              The Simplified Method gives you <strong>${formatUSD(Math.abs(result.regularAdvantage))}</strong> more
              and is easier — no expense tracking required.
            </p>
          )}
        </div>
      )}

      {/* Detailed breakdown */}
      <div className="rounded-xl border border-gray-200 divide-y divide-gray-100 dark:border-dark-border dark:divide-dark-border">
        <Row label="Business Use Percentage" text={`${result.businessUsePercentage}%`} />
        <Row label="Total Home Expenses" value={result.totalHomeExpenses} />
        <Row label="Simplified Deduction" value={result.simplifiedDeduction} />
        <Row label="Regular Deduction" value={result.regularDeduction} />
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
  text,
  bold,
  accent,
}: {
  label: string;
  value?: number;
  text?: string;
  bold?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between px-5 py-3">
      <span className={`text-sm ${bold ? "font-semibold text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
        {label}
      </span>
      <span className={`text-sm tabular-nums ${bold ? "font-semibold" : ""} ${accent ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-white"}`}>
        {text ?? `$${formatUSD(value ?? 0)}`}
      </span>
    </div>
  );
}

function formatUSD(value: number): string {
  return value.toLocaleString("en-US");
}

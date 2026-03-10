import type { W2vs1099Output } from "@/engine/us/w2-vs-1099";

interface Props {
  result: W2vs1099Output;
}

export default function W2vs1099Result({ result }: Props) {
  const { w2, self1099, taxDifference, netIncomeDifference } = result;
  const w2Better = netIncomeDifference < 0;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className={`rounded-xl p-6 text-center border-2 ${
        w2Better
          ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
          : "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
      }`}>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {w2Better ? "W-2 gives you more take-home pay" : "1099 gives you more take-home pay"}
        </p>
        <p className={`mt-2 text-3xl font-bold ${
          w2Better ? "text-blue-600 dark:text-blue-400" : "text-green-600 dark:text-green-400"
        }`}>
          ${formatUSD(Math.abs(netIncomeDifference))} more/year
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Tax difference: ${formatUSD(Math.abs(taxDifference))}/year
          {taxDifference > 0 ? " (1099 pays more)" : " (W-2 pays more)"}
        </p>
      </div>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-blue-200 p-4 dark:border-blue-800">
          <h3 className="text-center text-sm font-semibold text-blue-600 dark:text-blue-400">W-2 Employee</h3>
          <p className="mt-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
            ${formatUSD(w2.netIncome)}
          </p>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">net/year</p>
        </div>
        <div className="rounded-xl border border-green-200 p-4 dark:border-green-800">
          <h3 className="text-center text-sm font-semibold text-green-600 dark:text-green-400">1099 Contractor</h3>
          <p className="mt-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
            ${formatUSD(self1099.netIncome)}
          </p>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">net/year</p>
        </div>
      </div>

      {/* W-2 Breakdown */}
      <div className="rounded-xl border border-gray-200 dark:border-dark-border">
        <div className="border-b border-gray-200 px-5 py-3 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">W-2 Employee Breakdown</h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-dark-border">
          <Row label="Gross Income" value={w2.grossIncome} />
          <Row label="FICA Tax (7.65%)" value={w2.ficaTax} negative />
          <Row label="Federal Income Tax" value={w2.federalTax} negative />
          <Row label="State Income Tax" value={w2.stateTax} negative />
          <Row label="Total Tax" value={w2.totalTax} bold negative />
          <Row label="Net Income" value={w2.netIncome} bold />
          <Row label="Effective Rate" text={`${w2.effectiveRate}%`} />
        </div>
      </div>

      {/* 1099 Breakdown */}
      <div className="rounded-xl border border-gray-200 dark:border-dark-border">
        <div className="border-b border-gray-200 px-5 py-3 dark:border-dark-border">
          <h3 className="text-sm font-semibold text-green-600 dark:text-green-400">1099 Contractor Breakdown</h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-dark-border">
          <Row label="Gross Income" value={self1099.grossIncome} />
          {self1099.businessExpenses > 0 && (
            <Row label="Business Expenses" value={self1099.businessExpenses} negative />
          )}
          <Row label="Net Business Income" value={self1099.netBusinessIncome} bold />
          <Row label="Self-Employment Tax (15.3%)" value={self1099.selfEmploymentTax} negative />
          <Row label="SE Tax Deduction (50%)" value={self1099.seTaxDeduction} accent />
          <Row label="Federal Income Tax" value={self1099.federalTax} negative />
          <Row label="State Income Tax" value={self1099.stateTax} negative />
          <Row label="Total Tax" value={self1099.totalTax} bold negative />
          <Row label="Net Income" value={self1099.netIncome} bold />
          <Row label="Effective Rate" text={`${self1099.effectiveRate}%`} />
          <Row label="Quarterly Payment" value={self1099.quarterlyPayment} />
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  text,
  bold,
  accent,
  negative,
}: {
  label: string;
  value?: number;
  text?: string;
  bold?: boolean;
  accent?: boolean;
  negative?: boolean;
}) {
  return (
    <div className="flex justify-between px-5 py-3">
      <span className={`text-sm ${bold ? "font-semibold text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
        {label}
      </span>
      <span
        className={`text-sm tabular-nums ${bold ? "font-semibold" : ""} ${
          accent ? "text-green-600 dark:text-green-400" : negative ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white"
        }`}
      >
        {text ?? `${negative ? "-" : ""}$${formatUSD(value ?? 0)}`}
      </span>
    </div>
  );
}

function formatUSD(value: number): string {
  return value.toLocaleString("en-US");
}

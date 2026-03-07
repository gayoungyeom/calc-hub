import type { UsCalculatorOutput } from "@/engine/types";

interface Props {
  result: UsCalculatorOutput;
}

export default function UsResultDisplay({ result }: Props) {
  return (
    <div className="space-y-6">
      {/* 핵심 결과 — Total Tax & Net Income */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-red-50 border-2 border-red-200 p-5 text-center">
          <p className="text-sm font-medium text-gray-600">Total Tax</p>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {formatUSD(result.totalTax)}
          </p>
        </div>
        <div className="rounded-xl bg-green-50 border-2 border-green-200 p-5 text-center">
          <p className="text-sm font-medium text-gray-600">Net Income</p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {formatUSD(result.netIncome)}
          </p>
        </div>
      </div>

      {/* Quarterly Payment */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-5 text-center">
        <p className="text-sm font-medium text-gray-600">
          Estimated Quarterly Payment
        </p>
        <p className="mt-1 text-2xl font-bold text-amber-700">
          {formatUSD(result.quarterlyPayment)} / quarter
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Pay this amount each quarter to avoid underpayment penalties
        </p>
      </div>

      {/* 상세 내역 */}
      <div className="rounded-xl border border-gray-200 divide-y divide-gray-100">
        <ResultRow label="Net Business Income" value={result.netBusinessIncome} />
        <ResultRow label="Self-Employment Tax (15.3%)" value={result.selfEmploymentTax} />
        <ResultRow label="SE Tax Deduction (50%)" value={result.seTaxDeduction} muted />
        <ResultRow label="Federal Income Tax" value={result.federalTax} />
        <ResultRow label="State Income Tax" value={result.stateTax} />
        <ResultRow label="Total Tax" value={result.totalTax} bold />
        <ResultRow label="Effective Tax Rate" percentage={result.effectiveRate} bold />
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  percentage,
  bold,
  muted,
}: {
  label: string;
  value?: number;
  percentage?: number;
  bold?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex justify-between px-5 py-3">
      <span
        className={`text-sm ${
          bold
            ? "font-semibold text-gray-900"
            : muted
              ? "text-gray-400"
              : "text-gray-600"
        }`}
      >
        {label}
      </span>
      <span
        className={`text-sm tabular-nums ${
          bold
            ? "font-semibold text-gray-900"
            : muted
              ? "text-gray-400"
              : "text-gray-900"
        }`}
      >
        {percentage !== undefined ? `${percentage}%` : formatUSD(value ?? 0)}
      </span>
    </div>
  );
}

function formatUSD(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

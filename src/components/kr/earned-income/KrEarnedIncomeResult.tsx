import type { KrEarnedIncomeOutput } from "@/engine/kr/earned-income-tax";

interface Props {
  result: KrEarnedIncomeOutput;
  annualSalary: number;
}

export default function KrEarnedIncomeResult({ result, annualSalary }: Props) {
  return (
    <div className="space-y-6">
      {/* 핵심 결과 — 실수령액 */}
      <div className="rounded-xl p-6 text-center bg-blue-50 border-2 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          연간 예상 실수령액
        </p>
        <p className="mt-2 text-4xl font-bold text-blue-600 dark:text-blue-400">
          {formatKRW(result.netIncome)}원
        </p>
        <p className="mt-1 text-lg text-gray-700 dark:text-gray-300">
          월 {formatKRW(Math.round(result.netIncome / 12))}원
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          세금 + 4대보험 공제 후 실수령액 (유효세율 {result.effectiveRate}%)
        </p>
      </div>

      {/* 월 원천징수 예상 */}
      <div className="rounded-xl p-4 text-center bg-gray-50 border border-gray-200 dark:bg-dark-card dark:border-dark-border">
        <p className="text-sm text-gray-600 dark:text-gray-400">월 예상 원천징수액</p>
        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
          {formatKRW(result.monthlyWithholding)}원
        </p>
      </div>

      {/* 상세 내역 */}
      <div className="rounded-xl border border-gray-200 divide-y divide-gray-100 dark:border-dark-border dark:divide-dark-border">
        <ResultRow label="세전 연봉" value={annualSalary} />
        <ResultRow label="비과세 소득" value={annualSalary - result.totalSalary} />
        <ResultRow label="총급여 (과세 대상)" value={result.totalSalary} />
        <ResultRow label="근로소득공제" value={result.earnedIncomeDeduction} indent />
        <ResultRow label="근로소득금액" value={result.earnedIncome} bold />
        <ResultRow label="인적공제" value={result.personalDeduction} indent />
        <ResultRow label="4대보험 공제" value={result.socialInsuranceDeduction} indent />
        <ResultRow label="과세표준" value={result.taxableIncome} bold />
        <ResultRow label="산출세액" value={result.calculatedTax} />
        <ResultRow label="근로소득세액공제" value={result.earnedIncomeTaxCredit} indent accent />
        {result.childTaxCredit > 0 && (
          <ResultRow label="자녀세액공제" value={result.childTaxCredit} indent accent />
        )}
        <ResultRow label="결정세액 (소득세)" value={result.determinedTax} bold />
        <ResultRow label="지방소득세 (10%)" value={result.localTax} />
        <ResultRow label="총 세액" value={result.totalTax} bold negative />
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  bold,
  accent,
  negative,
  indent,
}: {
  label: string;
  value: number;
  bold?: boolean;
  accent?: boolean;
  negative?: boolean;
  indent?: boolean;
}) {
  return (
    <div className={`flex justify-between px-5 py-3 ${indent ? "pl-8" : ""}`}>
      <span className={`text-sm ${bold ? "font-semibold text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
        {label}
      </span>
      <span
        className={`text-sm tabular-nums ${
          bold ? "font-semibold" : ""
        } ${accent ? "text-green-600 dark:text-green-400" : negative ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white"}`}
      >
        {accent ? "-" : ""}{formatKRW(value)}원
      </span>
    </div>
  );
}

function formatKRW(value: number): string {
  return value.toLocaleString("ko-KR");
}

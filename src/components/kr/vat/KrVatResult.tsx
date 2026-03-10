import type { KrVatOutput } from "@/engine/kr/vat";

interface Props {
  result: KrVatOutput;
}

export default function KrVatResult({ result }: Props) {
  const isExempt = result.taxpayerTypeLabel === "면세사업자";

  if (isExempt) {
    return (
      <div className="rounded-xl p-6 text-center bg-gray-50 border-2 border-gray-200 dark:bg-dark-card dark:border-dark-border">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">면세사업자</p>
        <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
          부가가치세 납부 의무 없음
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          면세사업자는 부가가치세가 면제됩니다. 매년 2월 사업장 현황 신고를 하세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 핵심 결과 — 납부세액 */}
      <div className="rounded-xl p-6 text-center bg-blue-50 border-2 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {result.taxpayerTypeLabel} 부가가치세 납부 예상액
        </p>
        <p className="mt-2 text-4xl font-bold text-blue-600 dark:text-blue-400">
          {formatKRW(result.finalVatDue)}원
        </p>
        {result.simplifiedCredit > 0 && (
          <p className="mt-1 text-sm text-green-600 dark:text-green-400">
            신용카드 세액공제 {formatKRW(result.simplifiedCredit)}원 적용
          </p>
        )}
      </div>

      {/* 상세 내역 */}
      <div className="rounded-xl border border-gray-200 divide-y divide-gray-100 dark:border-dark-border dark:divide-dark-border">
        <ResultRow label="매출액 (공급가액)" value={result.totalRevenueWithVat - result.outputTax > 0 ? result.totalRevenueWithVat - result.outputTax : result.totalRevenueWithVat} />
        <ResultRow label="매출세액" value={result.outputTax} />
        {result.taxpayerTypeLabel === "일반과세자" && (
          <ResultRow label="부가세 포함 매출 총액" value={result.totalRevenueWithVat} bold />
        )}
        <ResultRow label="매입액 (공급가액)" value={result.totalPurchasesWithVat - result.inputTax > 0 ? result.totalPurchasesWithVat - result.inputTax : result.totalPurchasesWithVat} />
        <ResultRow label="매입세액 공제" value={result.inputTax} accent />
        <ResultRow label="납부세액" value={result.vatDue} bold />
        {result.simplifiedCredit > 0 && (
          <ResultRow label="신용카드 세액공제" value={result.simplifiedCredit} accent />
        )}
        <ResultRow label="최종 납부세액" value={result.finalVatDue} bold negative />
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
}: {
  label: string;
  value: number;
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

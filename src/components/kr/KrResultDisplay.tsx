import type { KrCalculatorOutput } from "@/engine/types";

interface Props {
  result: KrCalculatorOutput;
  grossIncome: number;
}

export default function KrResultDisplay({ result, grossIncome }: Props) {
  const isRefund = result.refundOrDue > 0;

  return (
    <div className="space-y-6">
      {/* 핵심 결과 — 환급/추가납부 */}
      <div
        className={`rounded-xl p-6 text-center ${
          isRefund
            ? "bg-green-50 border-2 border-green-200"
            : "bg-red-50 border-2 border-red-200"
        }`}
      >
        <p className="text-sm font-medium text-gray-600">
          {isRefund ? "예상 환급액" : "추가 납부 예상액"}
        </p>
        <p
          className={`mt-2 text-4xl font-bold ${
            isRefund ? "text-green-600" : "text-red-600"
          }`}
        >
          {isRefund ? "+" : "-"}
          {formatKRW(Math.abs(result.refundOrDue))}원
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {isRefund
            ? "5월 종합소득세 신고 시 돌려받을 수 있는 금액입니다"
            : "5월 종합소득세 신고 시 추가로 납부해야 하는 금액입니다"}
        </p>
      </div>

      {/* 상세 내역 */}
      <div className="rounded-xl border border-gray-200 divide-y divide-gray-100">
        <ResultRow label="연간 총수입" value={grossIncome} />
        <ResultRow label="종합소득금액" value={result.totalIncome} />
        <ResultRow label="과세표준" value={result.taxableIncome} />
        <ResultRow label="종합소득세" value={result.incomeTax} />
        <ResultRow label="지방소득세 (10%)" value={result.localTax} />
        <ResultRow
          label="총 세액"
          value={result.incomeTax + result.localTax}
          bold
        />
        <ResultRow label="기납부세액 (3.3%)" value={result.prepaidTax} accent />
        <ResultRow
          label={isRefund ? "환급 예상액" : "추가 납부액"}
          value={Math.abs(result.refundOrDue)}
          bold
          accent={isRefund}
          negative={!isRefund}
        />
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
      <span className={`text-sm ${bold ? "font-semibold text-gray-900" : "text-gray-600"}`}>
        {label}
      </span>
      <span
        className={`text-sm tabular-nums ${
          bold ? "font-semibold" : ""
        } ${accent ? "text-green-600" : negative ? "text-red-600" : "text-gray-900"}`}
      >
        {formatKRW(value)}원
      </span>
    </div>
  );
}

function formatKRW(value: number): string {
  return value.toLocaleString("ko-KR");
}

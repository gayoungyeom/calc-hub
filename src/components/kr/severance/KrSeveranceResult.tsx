import type { KrSeveranceOutput } from "@/engine/kr/severance";

interface Props {
  result: KrSeveranceOutput;
}

export default function KrSeveranceResult({ result }: Props) {
  if (result.totalDays <= 0) {
    return (
      <div className="rounded-xl p-6 text-center bg-yellow-50 border-2 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
        <p className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
          입사일과 퇴사일을 확인해주세요
        </p>
        <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-500">
          퇴사일이 입사일보다 이후여야 합니다.
        </p>
      </div>
    );
  }

  const hasMinimumService = result.totalDays >= 365;

  return (
    <div className="space-y-6">
      {/* 핵심 결과 — 퇴직금 */}
      <div className="rounded-xl p-6 text-center bg-blue-50 border-2 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          예상 퇴직금 (세전)
        </p>
        <p className="mt-2 text-4xl font-bold text-blue-600 dark:text-blue-400">
          {formatKRW(result.severancePay)}원
        </p>
        {result.severanceTax > 0 && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            퇴직소득세 {formatKRW(result.severanceTax)}원 → 세후{" "}
            <span className="font-semibold text-green-600 dark:text-green-400">
              {formatKRW(result.netSeverancePay)}원
            </span>
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          재직기간 {result.yearsOfService}년 ({result.totalDays}일) 기준
        </p>
      </div>

      {!hasMinimumService && (
        <div className="rounded-lg bg-yellow-50 px-4 py-3 text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
          근로기준법상 퇴직금은 계속 근로기간 1년 이상인 근로자에게 지급됩니다.
          현재 재직기간이 1년 미만이므로 법정 퇴직금 수급 대상이 아닐 수 있습니다.
        </div>
      )}

      {/* 상세 내역 */}
      <div className="rounded-xl border border-gray-200 divide-y divide-gray-100 dark:border-dark-border dark:divide-dark-border">
        <ResultRow label="총 재직일수" value={`${result.totalDays.toLocaleString()}일`} />
        <ResultRow label="재직연수" value={`${result.yearsOfService}년`} />
        <ResultRow label="1일 평균임금" value={`${formatKRW(result.dailyAverageWage)}원`} />
        <ResultRow label="월 평균임금" value={`${formatKRW(result.monthlyAverageWage)}원`} />
        <ResultRow label="퇴직금 (세전)" value={`${formatKRW(result.severancePay)}원`} bold />
        <ResultRow label="퇴직소득세 (지방세 포함)" value={`-${formatKRW(result.severanceTax)}원`} negative />
        <ResultRow label="세후 퇴직금" value={`${formatKRW(result.netSeverancePay)}원`} bold accent />
      </div>

      {/* 계산 방법 안내 */}
      <div className="rounded-lg bg-gray-50 px-4 py-3 text-xs text-gray-500 dark:bg-dark-card dark:text-gray-400">
        <p className="font-medium text-gray-700 dark:text-gray-300">퇴직금 계산 공식</p>
        <p className="mt-1">1일 평균임금 = (퇴직 전 3개월 급여 + 상여금 가산 + 연차수당 가산) ÷ 91일</p>
        <p>퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365일)</p>
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
  value: string;
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
        {value}
      </span>
    </div>
  );
}

function formatKRW(value: number): string {
  return value.toLocaleString("ko-KR");
}

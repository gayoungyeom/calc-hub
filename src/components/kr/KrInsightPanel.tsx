import type { KrCalculatorOutput } from "@/engine/types";

interface Props {
  result: KrCalculatorOutput;
  grossIncome: number;
  expenses: number;
}

export default function KrInsightPanel({ result, grossIncome, expenses }: Props) {
  const totalTax = result.incomeTax + result.localTax;
  const expenseRatio = grossIncome > 0 ? (expenses / grossIncome) * 100 : 0;

  // 경비율 5% 추가 시 절세 시뮬레이션
  const additionalExpenseSaving = estimateExpenseSaving(grossIncome, expenses, result);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">세금 인사이트</h3>

      <div className="grid gap-3">
        {/* 유효세율 */}
        <InsightCard
          emoji="📊"
          title="유효세율"
          description={`당신의 실질 세율은 ${result.effectiveRate}%입니다.`}
          detail={`총수입 대비 실제 납부 세금 비율 (${formatKRW(totalTax)}원 / ${formatKRW(grossIncome)}원)`}
        />

        {/* 환급 가능성 */}
        {result.refundOrDue > 0 && (
          <InsightCard
            emoji="💰"
            title="환급 가능성"
            description={`약 ${formatKRW(result.refundOrDue)}원을 돌려받을 수 있습니다.`}
            detail="3.3% 원천징수액이 실제 세액보다 많아 환급이 예상됩니다."
          />
        )}

        {/* 직장인 대비 세부담 비교 */}
        <InsightCard
          emoji="⚖️"
          title="직장인 대비 세부담"
          description={
            result.effectiveRate > 10
              ? `동일 소득 직장인 대비 세부담이 높은 편입니다.`
              : `동일 소득 직장인과 비슷한 수준의 세부담입니다.`
          }
          detail="프리랜서는 4대보험 사업주 부담분이 없는 대신 종합소득세로 납부합니다."
        />

        {/* 절세 여지 가이드 */}
        {additionalExpenseSaving > 0 && (
          <InsightCard
            emoji="💡"
            title="절세 팁"
            description={`경비율을 5%p 올리면 약 ${formatKRW(additionalExpenseSaving)}원 추가 절세가 가능합니다.`}
            detail={`현재 경비율: ${expenseRatio.toFixed(1)}% → 사업 관련 지출 영수증을 꼼꼼히 챙기세요.`}
          />
        )}
      </div>
    </div>
  );
}

function InsightCard({
  emoji,
  title,
  description,
  detail,
}: {
  emoji: string;
  title: string;
  description: string;
  detail: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-start gap-3">
        <span className="text-xl">{emoji}</span>
        <div>
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-700">{description}</p>
          <p className="mt-1 text-xs text-gray-500">{detail}</p>
        </div>
      </div>
    </div>
  );
}

function estimateExpenseSaving(
  grossIncome: number,
  expenses: number,
  currentResult: KrCalculatorOutput
): number {
  if (grossIncome <= 0) return 0;
  // 경비 5%p 추가 시 세금 차이 간이 추정
  const additionalExpense = grossIncome * 0.05;
  const currentTax = currentResult.incomeTax + currentResult.localTax;
  // 간이 추정: 추가 경비 × 최고 적용 세율 × 1.1 (지방소득세 포함)
  const marginalRate = getMarginalRate(currentResult.taxableIncome);
  const estimatedSaving = Math.round(additionalExpense * marginalRate * 1.1);
  return Math.min(estimatedSaving, currentTax);
}

function getMarginalRate(taxableIncome: number): number {
  if (taxableIncome <= 14000000) return 0.06;
  if (taxableIncome <= 50000000) return 0.15;
  if (taxableIncome <= 88000000) return 0.24;
  if (taxableIncome <= 150000000) return 0.35;
  if (taxableIncome <= 300000000) return 0.38;
  if (taxableIncome <= 500000000) return 0.40;
  if (taxableIncome <= 1000000000) return 0.42;
  return 0.45;
}

function formatKRW(value: number): string {
  return value.toLocaleString("ko-KR");
}

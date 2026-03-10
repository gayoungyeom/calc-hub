import type { KrEarnedIncomeOutput } from "@/engine/kr/earned-income-tax";

interface Props {
  result: KrEarnedIncomeOutput;
  annualSalary: number;
}

export default function KrEarnedIncomeInsight({ result, annualSalary }: Props) {
  const bracketInfo = getBracketInfo(result.taxableIncome);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">세금 인사이트</h3>

      <div className="grid gap-3">
        {/* 유효세율 */}
        <InsightCard
          emoji="📊"
          title="유효세율"
          description={`실질 세율은 ${result.effectiveRate}%입니다.`}
          detail={`연봉 대비 실제 납부 세금 비율 (${formatKRW(result.totalTax)}원 / ${formatKRW(annualSalary)}원)`}
        />

        {/* 소득 구간 */}
        {bracketInfo && (
          <InsightCard
            emoji="📈"
            title="소득 구간"
            description={`현재 ${bracketInfo.currentRate}% 세율 구간에 해당합니다.`}
            detail={
              bracketInfo.toNextBracket !== null
                ? `다음 ${bracketInfo.nextRate}% 구간까지 과세표준 ${formatKRW(bracketInfo.toNextBracket)}원 남았습니다.`
                : "최고 세율 구간에 해당합니다."
            }
          />
        )}

        {/* 근로소득공제 */}
        <InsightCard
          emoji="💼"
          title="근로소득공제"
          description={`${formatKRW(result.earnedIncomeDeduction)}원이 자동 공제되었습니다.`}
          detail="근로소득공제는 총급여에 따라 자동 계산되며 별도 신청이 필요 없습니다."
        />

        {/* 세액공제 효과 */}
        <InsightCard
          emoji="💰"
          title="세액공제 효과"
          description={`근로소득세액공제 ${formatKRW(result.earnedIncomeTaxCredit)}원${result.childTaxCredit > 0 ? ` + 자녀세액공제 ${formatKRW(result.childTaxCredit)}원` : ""}이 적용되었습니다.`}
          detail={`산출세액 ${formatKRW(result.calculatedTax)}원에서 세액공제를 차감하여 결정세액이 산출됩니다.`}
        />

        {/* 연말정산 팁 */}
        <InsightCard
          emoji="💡"
          title="연말정산 절세 팁"
          description="추가 공제 항목을 활용하면 세금을 더 줄일 수 있습니다."
          detail="신용카드 소득공제, 의료비·교육비 세액공제, 주택자금공제, 연금저축 세액공제 등을 챙기세요. 이 계산기는 기본공제만 반영합니다."
        />

        {/* 프리랜서 비교 */}
        <InsightCard
          emoji="⚖️"
          title="프리랜서 대비 세부담"
          description="근로소득자는 4대보험 사업주 부담분이 있어 실질 부담이 다릅니다."
          detail="같은 소득의 프리랜서(3.3%)와 비교하면, 근로소득자는 근로소득공제와 세액공제로 세부담이 낮은 편입니다."
        />
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
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-dark-border dark:bg-dark-card">
      <div className="flex items-start gap-3">
        <span className="text-xl">{emoji}</span>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{title}</p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{description}</p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{detail}</p>
        </div>
      </div>
    </div>
  );
}

interface BracketInfo {
  currentRate: number;
  nextRate: number | null;
  toNextBracket: number | null;
}

function getBracketInfo(taxableIncome: number): BracketInfo | null {
  if (taxableIncome <= 0) return null;

  const brackets = [
    { min: 0, max: 14000000, rate: 6 },
    { min: 14000000, max: 50000000, rate: 15 },
    { min: 50000000, max: 88000000, rate: 24 },
    { min: 88000000, max: 150000000, rate: 35 },
    { min: 150000000, max: 300000000, rate: 38 },
    { min: 300000000, max: 500000000, rate: 40 },
    { min: 500000000, max: 1000000000, rate: 42 },
    { min: 1000000000, max: null as number | null, rate: 45 },
  ];

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];
    const upper = bracket.max ?? Infinity;
    if (taxableIncome <= upper) {
      return {
        currentRate: bracket.rate,
        nextRate: i < brackets.length - 1 ? brackets[i + 1].rate : null,
        toNextBracket: bracket.max !== null ? bracket.max - taxableIncome : null,
      };
    }
  }
  return null;
}

function formatKRW(value: number): string {
  return value.toLocaleString("ko-KR");
}

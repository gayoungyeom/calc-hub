import type { KrCalculatorOutput } from "@/engine/types";
import { calculateKrIncomeTax } from "@/engine/kr/income-tax";
import { getKrConfig } from "@/config/loader";

interface Props {
  result: KrCalculatorOutput;
  grossIncome: number;
  expenses: number;
  dependents: number;
  nationalPension: number;
  healthInsurance: number;
}

export default function KrInsightPanel({
  result,
  grossIncome,
  expenses,
  dependents,
  nationalPension,
  healthInsurance,
}: Props) {
  const totalTax = result.incomeTax + result.localTax;
  const expenseRatio = grossIncome > 0 ? (expenses / grossIncome) * 100 : 0;

  // 경비율 시뮬레이션 (5%p, 10%p, 15%p)
  const expenseSimulations = simulateExpenseRatios(grossIncome, expenses, result);

  // 소득 구간 정보
  const bracketInfo = getBracketInfo(result.taxableIncome);

  // 연도별 비교 (2025 vs 2026)
  const yearComparison = compareWithPreviousYear({
    grossIncome,
    expenses,
    dependents,
    nationalPension,
    healthInsurance,
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">세금 인사이트</h3>

      <div className="grid gap-3">
        {/* 유효세율 */}
        <InsightCard
          emoji="📊"
          title="유효세율"
          description={`당신의 실질 세율은 ${result.effectiveRate}%입니다.`}
          detail={`총수입 대비 실제 납부 세금 비율 (${formatKRW(totalTax)}원 / ${formatKRW(grossIncome)}원)`}
        />

        {/* 소득 구간 위치 */}
        {bracketInfo && (
          <InsightCard
            emoji="📈"
            title="소득 구간"
            description={`현재 ${bracketInfo.currentRate}% 세율 구간에 해당합니다.`}
            detail={
              bracketInfo.toNextBracket !== null
                ? `다음 ${bracketInfo.nextRate}% 구간까지 ${formatKRW(bracketInfo.toNextBracket)}원 남았습니다.`
                : "최고 세율 구간에 해당합니다."
            }
          />
        )}

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

        {/* 경비율 시뮬레이션 */}
        {expenseSimulations.length > 0 && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-dark-border dark:bg-dark-card">
            <div className="flex items-start gap-3">
              <span className="text-xl">💡</span>
              <div className="w-full">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">경비율별 절세 시뮬레이션</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  현재 경비율: {expenseRatio.toFixed(1)}%
                </p>
                <div className="mt-2 space-y-1">
                  {expenseSimulations.map((sim) => (
                    <div
                      key={sim.addedPercent}
                      className="flex justify-between text-xs text-gray-600 dark:text-gray-400"
                    >
                      <span>경비율 +{sim.addedPercent}%p ({(expenseRatio + sim.addedPercent).toFixed(1)}%)</span>
                      <span className="font-medium text-blue-600 dark:text-dark-blue">
                        약 {formatKRW(sim.saving)}원 절세
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  사업 관련 지출 영수증을 꼼꼼히 챙기세요.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 연도별 비교 */}
        {yearComparison && (
          <InsightCard
            emoji="📅"
            title="전년도 비교 (2025 vs 2026)"
            description={
              yearComparison.difference === 0
                ? "2025년과 동일한 세율이 적용되어 세금 변동이 없습니다."
                : yearComparison.difference > 0
                  ? `2025년 대비 약 ${formatKRW(Math.abs(yearComparison.difference))}원 세금이 증가했습니다.`
                  : `2025년 대비 약 ${formatKRW(Math.abs(yearComparison.difference))}원 세금이 감소했습니다.`
            }
            detail={`2025년 세금: ${formatKRW(yearComparison.prevTax)}원 → 2026년 세금: ${formatKRW(yearComparison.currentTax)}원`}
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

interface ExpenseSimulation {
  addedPercent: number;
  saving: number;
}

function simulateExpenseRatios(
  grossIncome: number,
  expenses: number,
  currentResult: KrCalculatorOutput
): ExpenseSimulation[] {
  if (grossIncome <= 0) return [];

  const currentTax = currentResult.incomeTax + currentResult.localTax;
  if (currentTax <= 0) return [];

  const marginalRate = getMarginalRate(currentResult.taxableIncome);
  const simulations: ExpenseSimulation[] = [];

  for (const addedPercent of [5, 10, 15]) {
    const additionalExpense = grossIncome * (addedPercent / 100);
    const saving = Math.min(
      Math.round(additionalExpense * marginalRate * 1.1),
      currentTax
    );
    if (saving > 0) {
      simulations.push({ addedPercent, saving });
    }
  }

  return simulations;
}

function compareWithPreviousYear(input: {
  grossIncome: number;
  expenses: number;
  dependents: number;
  nationalPension: number;
  healthInsurance: number;
}): { prevTax: number; currentTax: number; difference: number } | null {
  try {
    const config2025 = getKrConfig(2025);
    const config2026 = getKrConfig(2026);

    const result2025 = calculateKrIncomeTax(input, config2025);
    const result2026 = calculateKrIncomeTax(input, config2026);

    const prevTax = result2025.incomeTax + result2025.localTax;
    const currentTax = result2026.incomeTax + result2026.localTax;

    return {
      prevTax,
      currentTax,
      difference: currentTax - prevTax,
    };
  } catch {
    return null;
  }
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

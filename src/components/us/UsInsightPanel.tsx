import type { UsCalculatorOutput } from "@/engine/types";
import { calculateProgressiveTax } from "@/engine/calculator";
import { getUsConfig } from "@/config/loader";

interface Props {
  result: UsCalculatorOutput;
  grossIncome: number;
  expenses: number;
  state: string;
  filingStatus: string;
}

export default function UsInsightPanel({ result, grossIncome, expenses, state, filingStatus }: Props) {
  const sepIraSimulations = simulateSepIra(result);
  const stateComparison = compareStates(grossIncome, expenses, state);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tax Insights</h3>

      <div className="grid gap-3">
        {/* Effective Tax Rate */}
        <InsightCard
          emoji="📊"
          title="Effective Tax Rate"
          description={`Your effective tax rate is ${result.effectiveRate}%.`}
          detail={`Total tax ${formatUSD(result.totalTax)} on ${formatUSD(result.netBusinessIncome)} net business income.`}
        />

        {/* Tax Bracket Position */}
        <InsightCard
          emoji="📈"
          title="Federal Tax Bracket"
          description={`You're in the ${getFederalBracket(result.netBusinessIncome - result.seTaxDeduction)}% federal bracket.`}
          detail="This is your marginal rate — only income above the bracket threshold is taxed at this rate."
        />

        {/* Quarterly Payment Schedule */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-dark-border dark:bg-dark-card">
          <div className="flex items-start gap-3">
            <span className="text-xl">📅</span>
            <div className="w-full">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Quarterly Payment Schedule</p>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                Pay {formatUSD(result.quarterlyPayment)} per quarter to avoid penalties.
              </p>
              <div className="mt-2 space-y-1">
                {[
                  { quarter: "Q1", date: "Apr 15, 2026", amount: result.quarterlyPayment },
                  { quarter: "Q2", date: "Jun 15, 2026", amount: result.quarterlyPayment },
                  { quarter: "Q3", date: "Sep 15, 2026", amount: result.quarterlyPayment },
                  { quarter: "Q4", date: "Jan 15, 2027", amount: result.quarterlyPayment },
                ].map((q) => (
                  <div
                    key={q.quarter}
                    className="flex justify-between text-xs text-gray-600 dark:text-gray-400"
                  >
                    <span>{q.quarter} — {q.date}</span>
                    <span className="font-medium text-blue-600 dark:text-dark-blue">
                      {formatUSD(q.amount)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Use Form 1040-ES to make estimated tax payments.
              </p>
            </div>
          </div>
        </div>

        {/* SEP IRA Simulation */}
        {sepIraSimulations.length > 0 && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-dark-border dark:bg-dark-card">
            <div className="flex items-start gap-3">
              <span className="text-xl">💰</span>
              <div className="w-full">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">SEP IRA Tax Savings</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  Contribute to a SEP IRA to reduce your taxable income.
                </p>
                <div className="mt-2 space-y-1">
                  {sepIraSimulations.map((sim) => (
                    <div
                      key={sim.percent}
                      className="flex justify-between text-xs text-gray-600 dark:text-gray-400"
                    >
                      <span>{sim.percent}% contribution ({formatUSD(sim.contribution)})</span>
                      <span className="font-medium text-blue-600 dark:text-dark-blue">
                        Save {formatUSD(sim.saving)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Max contribution: 25% of net earnings (up to $69,000 for 2026).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Penalty Risk */}
        {result.totalTax > 1000 && (
          <InsightCard
            emoji="⚠️"
            title="Estimated Penalty Risk"
            description="You may owe underpayment penalties if you don't pay quarterly."
            detail="The IRS requires quarterly payments if you expect to owe $1,000+ in taxes."
          />
        )}

        {/* State Comparison */}
        {stateComparison && stateComparison.length > 0 && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-dark-border dark:bg-dark-card">
            <div className="flex items-start gap-3">
              <span className="text-xl">🗺️</span>
              <div className="w-full">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">State Tax Comparison</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  Your {state} state tax: {formatUSD(result.stateTax)}
                </p>
                <div className="mt-2 space-y-1">
                  {stateComparison.map((comp) => (
                    <div
                      key={comp.state}
                      className="flex justify-between text-xs text-gray-600 dark:text-gray-400"
                    >
                      <span>{comp.stateName} ({comp.state})</span>
                      <span className={`font-medium ${comp.saving > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                        {comp.saving > 0 ? `Save ${formatUSD(comp.saving)}` : `+${formatUSD(Math.abs(comp.saving))}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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

interface SepIraSimulation {
  percent: number;
  contribution: number;
  saving: number;
}

function simulateSepIra(result: UsCalculatorOutput): SepIraSimulation[] {
  if (result.netBusinessIncome <= 0) return [];

  const marginalRate = getFederalBracketRate(result.netBusinessIncome - result.seTaxDeduction);
  const maxPercent = 25;
  const maxAmount = 69000;
  const simulations: SepIraSimulation[] = [];

  for (const percent of [10, 15, 25]) {
    if (percent > maxPercent) continue;
    const contribution = Math.min(
      Math.round(result.netBusinessIncome * (percent / 100)),
      maxAmount
    );
    const saving = Math.round(contribution * marginalRate);
    if (saving > 0) {
      simulations.push({ percent, contribution, saving });
    }
  }

  return simulations;
}

interface StateComparison {
  state: string;
  stateName: string;
  tax: number;
  saving: number;
}

function compareStates(
  grossIncome: number,
  expenses: number,
  currentState: string
): StateComparison[] | null {
  try {
    const config = getUsConfig(2026);
    const netIncome = Math.max(0, grossIncome - expenses);
    if (netIncome <= 0) return null;

    const currentTax = calculateStateTaxForComparison(netIncome, currentState, config.states);
    const comparisons: StateComparison[] = [];

    for (const [code, stateConfig] of Object.entries(config.states)) {
      if (code === currentState) continue;
      const tax = calculateStateTaxForComparison(netIncome, code, config.states);
      comparisons.push({
        state: code,
        stateName: stateConfig.name,
        tax,
        saving: currentTax - tax,
      });
    }

    return comparisons.sort((a, b) => b.saving - a.saving);
  } catch {
    return null;
  }
}

function calculateStateTaxForComparison(
  netIncome: number,
  stateCode: string,
  states: Record<string, { noIncomeTax: boolean; brackets: { min: number; max: number | null; rate: number }[]; standardDeduction?: number }>
): number {
  const stateConfig = states[stateCode];
  if (!stateConfig || stateConfig.noIncomeTax) return 0;

  const deduction = stateConfig.standardDeduction ?? 0;
  const taxableIncome = Math.max(0, netIncome - deduction);

  return calculateProgressiveTax(taxableIncome, stateConfig.brackets);
}

function getFederalBracket(taxableIncome: number): number {
  return Math.round(getFederalBracketRate(taxableIncome) * 100);
}

function getFederalBracketRate(taxableIncome: number): number {
  if (taxableIncome <= 11600) return 0.10;
  if (taxableIncome <= 47150) return 0.12;
  if (taxableIncome <= 100525) return 0.22;
  if (taxableIncome <= 191950) return 0.24;
  if (taxableIncome <= 243725) return 0.32;
  if (taxableIncome <= 609350) return 0.35;
  return 0.37;
}

function formatUSD(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

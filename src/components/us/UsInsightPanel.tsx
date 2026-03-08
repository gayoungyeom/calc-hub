import type { UsCalculatorOutput } from "@/engine/types";

interface Props {
  result: UsCalculatorOutput;
  grossIncome: number;
  state: string;
}

export default function UsInsightPanel({ result, grossIncome, state }: Props) {
  const sepIraSaving = estimateSepIraSaving(result);

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

        {/* Quarterly Payment */}
        <InsightCard
          emoji="📅"
          title="Quarterly Estimated Tax"
          description={`Pay ${formatUSD(result.quarterlyPayment)} per quarter to avoid penalties.`}
          detail="Due dates: Apr 15, Jun 15, Sep 15, Jan 15 (next year). Late payments may incur penalties."
        />

        {/* SEP IRA Saving */}
        {sepIraSaving > 0 && (
          <InsightCard
            emoji="💰"
            title="SEP IRA Savings"
            description={`Contributing to a SEP IRA could save you up to ${formatUSD(sepIraSaving)} in taxes.`}
            detail={`Self-employed individuals can contribute up to 25% of net earnings (max $69,000 for 2026).`}
          />
        )}

        {/* Penalty Risk */}
        {result.totalTax > 1000 && (
          <InsightCard
            emoji="⚠️"
            title="Estimated Penalty Risk"
            description={
              result.totalTax > 1000
                ? "You may owe underpayment penalties if you don't pay quarterly."
                : "Your tax liability is low — penalties are unlikely."
            }
            detail="The IRS requires quarterly payments if you expect to owe $1,000+ in taxes."
          />
        )}

        {/* Tax Bracket Position */}
        <InsightCard
          emoji="📈"
          title="Federal Tax Bracket"
          description={`You're in the ${getFederalBracket(result.netBusinessIncome - result.seTaxDeduction)}% federal bracket.`}
          detail="This is your marginal rate — only income above the bracket threshold is taxed at this rate."
        />

        {/* State comparison hint */}
        {state !== "TX" && (
          <InsightCard
            emoji="🗺️"
            title="State Tax Impact"
            description={`You're paying ${formatUSD(result.stateTax)} in ${state} state tax.`}
            detail="States like Texas, Florida, and Washington have no state income tax."
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
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
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

function estimateSepIraSaving(result: UsCalculatorOutput): number {
  if (result.netBusinessIncome <= 0) return 0;
  // SEP IRA: up to 25% of net earnings, max $69,000
  const maxContribution = Math.min(result.netBusinessIncome * 0.25, 69000);
  // Approximate saving: contribution × marginal rate
  const marginalRate = getFederalBracketRate(result.netBusinessIncome - result.seTaxDeduction);
  return Math.round(maxContribution * marginalRate);
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

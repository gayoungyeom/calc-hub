import type { UsCalculatorInput, UsCalculatorOutput, UsTaxConfig } from "../types";
import { calculateProgressiveTax } from "../calculator";

/**
 * US 1099 Self-Employed Tax 계산
 *
 * 계산 흐름:
 * 1. Gross Income - Expenses = Net Business Income
 * 2. Net Business Income × 92.35% × 15.3% = SE Tax
 * 3. SE Tax × 50% = SE Tax Deduction (AGI에서 차감)
 * 4. AGI - Deduction = Taxable Income
 * 5. Taxable Income × Federal Bracket = Federal Tax
 * 6. State Tax 별도 계산
 * 7. 합산 → Total Tax → Net Income
 */
export function calculateUsTax(
  input: UsCalculatorInput,
  config: UsTaxConfig
): UsCalculatorOutput {
  const { grossIncome, expenses, filingStatus, state, deductionType, itemizedDeduction } =
    input;
  const { rules, states } = config;

  // 1. Net Business Income
  const netBusinessIncome = Math.max(0, grossIncome - expenses);

  // 2. Self-Employment Tax
  // SE tax base = 92.35% of net business income
  const seTaxBase = netBusinessIncome * 0.9235;
  const selfEmploymentTax = Math.round(seTaxBase * rules.selfEmploymentTax);

  // 3. SE Tax Deduction (50% of SE tax)
  const seTaxDeduction = Math.round(selfEmploymentTax * 0.5);

  // 4. Adjusted Gross Income → Taxable Income
  const agi = netBusinessIncome - seTaxDeduction;
  const deduction =
    deductionType === "itemized" && itemizedDeduction !== undefined
      ? itemizedDeduction
      : rules.standardDeduction[filingStatus];
  const taxableIncome = Math.max(0, agi - deduction);

  // 5. Federal Income Tax
  const brackets = rules.brackets[filingStatus];
  const federalTax = calculateProgressiveTax(taxableIncome, brackets);

  // 6. State Tax
  const stateTax = calculateStateTax(netBusinessIncome, state, states);

  // 7. Total
  const totalTax = federalTax + selfEmploymentTax + stateTax;
  const netIncome = netBusinessIncome - totalTax;
  const effectiveRate =
    netBusinessIncome > 0
      ? Math.round((totalTax / netBusinessIncome) * 10000) / 100
      : 0;
  const quarterlyPayment = Math.round(totalTax / 4);

  return {
    netBusinessIncome,
    selfEmploymentTax,
    seTaxDeduction,
    federalTax,
    stateTax,
    totalTax,
    netIncome,
    effectiveRate,
    quarterlyPayment,
  };
}

function calculateStateTax(
  netIncome: number,
  stateCode: string,
  states: UsTaxConfig["states"]
): number {
  const stateConfig = states[stateCode];
  if (!stateConfig || stateConfig.noIncomeTax) return 0;

  const deduction = stateConfig.standardDeduction ?? 0;
  const taxableIncome = Math.max(0, netIncome - deduction);

  return calculateProgressiveTax(taxableIncome, stateConfig.brackets);
}

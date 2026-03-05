import type { KrCalculatorInput, KrCalculatorOutput, KrTaxConfig } from "../types";
import { calculateProgressiveTax } from "../calculator";

/**
 * KR 프리랜서 종합소득세 계산
 *
 * 계산 흐름:
 * 1. 총수입 - 필요경비 = 소득금액
 * 2. 소득금액 - 소득공제 = 과세표준
 * 3. 과세표준 × 세율 = 산출세액 (누진세)
 * 4. 산출세액 = 종합소득세
 * 5. 종합소득세 × 10% = 지방소득세
 * 6. (종합소득세 + 지방소득세) - 기납부세액 = 환급/추가납부
 */
export function calculateKrIncomeTax(
  input: KrCalculatorInput,
  config: KrTaxConfig
): KrCalculatorOutput {
  const { grossIncome, expenses, dependents, nationalPension, healthInsurance } =
    input;
  const { rules } = config;

  // 1. 소득금액 = 총수입 - 필요경비
  const totalIncome = Math.max(0, grossIncome - expenses);

  // 2. 소득공제
  const personalDeduction = rules.personalDeduction * Math.max(1, dependents);
  const socialInsuranceDeduction = nationalPension + healthInsurance;
  const totalDeduction = personalDeduction + socialInsuranceDeduction;

  // 3. 과세표준
  const taxableIncome = Math.max(0, totalIncome - totalDeduction);

  // 4. 산출세액 (종합소득세)
  const incomeTax = calculateProgressiveTax(taxableIncome, rules.brackets);

  // 5. 지방소득세
  const localTax = Math.round(incomeTax * rules.localTaxRate);

  // 6. 기납부세액 (원천징수 3.3% = 소득세 3% + 지방소득세 0.3%)
  const prepaidTax = Math.round(grossIncome * rules.withholdingRate);

  // 7. 환급/추가납부
  const totalTaxDue = incomeTax + localTax;
  const refundOrDue = prepaidTax - totalTaxDue;

  // 유효세율
  const effectiveRate =
    grossIncome > 0 ? Math.round((totalTaxDue / grossIncome) * 10000) / 100 : 0;

  return {
    totalIncome,
    taxableIncome,
    incomeTax,
    localTax,
    prepaidTax,
    refundOrDue,
    effectiveRate,
  };
}

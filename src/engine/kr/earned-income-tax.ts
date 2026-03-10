import type { TaxBracket } from "../types";
import { calculateProgressiveTax } from "../calculator";

// === 근로소득세 입출력 타입 ===

export interface KrEarnedIncomeInput {
  /** 연간 총급여 (비과세 제외 전) */
  annualSalary: number;
  /** 비과세 소득 (식대, 차량유지비 등) */
  nonTaxableIncome: number;
  /** 부양가족 수 (본인 포함) */
  dependents: number;
  /** 20세 이하 자녀 수 */
  childrenUnder20: number;
  /** 국민연금 납부액 */
  nationalPension: number;
  /** 건강보험 납부액 (장기요양보험 포함) */
  healthInsurance: number;
  /** 고용보험 납부액 */
  employmentInsurance: number;
}

export interface KrEarnedIncomeOutput {
  /** 총급여 (비과세 제외) */
  totalSalary: number;
  /** 근로소득공제 금액 */
  earnedIncomeDeduction: number;
  /** 근로소득금액 */
  earnedIncome: number;
  /** 인적공제 금액 */
  personalDeduction: number;
  /** 사회보험료 공제 */
  socialInsuranceDeduction: number;
  /** 과세표준 */
  taxableIncome: number;
  /** 산출세액 */
  calculatedTax: number;
  /** 근로소득세액공제 */
  earnedIncomeTaxCredit: number;
  /** 자녀세액공제 */
  childTaxCredit: number;
  /** 결정세액 (종합소득세) */
  determinedTax: number;
  /** 지방소득세 */
  localTax: number;
  /** 총 세액 */
  totalTax: number;
  /** 월 예상 원천징수액 */
  monthlyWithholding: number;
  /** 유효세율 */
  effectiveRate: number;
  /** 실수령액 (연간) */
  netIncome: number;
}

// === 근로소득공제 구간 (소득세법 제47조) ===

interface EarnedIncomeDeductionBracket {
  min: number;
  max: number | null;
  baseDeduction: number;
  rate: number;
}

const EARNED_INCOME_DEDUCTION_BRACKETS: EarnedIncomeDeductionBracket[] = [
  { min: 0, max: 5000000, baseDeduction: 0, rate: 0.7 },
  { min: 5000000, max: 15000000, baseDeduction: 3500000, rate: 0.4 },
  { min: 15000000, max: 45000000, baseDeduction: 7500000, rate: 0.15 },
  { min: 45000000, max: 100000000, baseDeduction: 12000000, rate: 0.05 },
  { min: 100000000, max: null, baseDeduction: 14750000, rate: 0.02 },
];

// === 소득세 과세 구간 (종합소득세와 동일) ===

const TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 14000000, rate: 0.06 },
  { min: 14000000, max: 50000000, rate: 0.15 },
  { min: 50000000, max: 88000000, rate: 0.24 },
  { min: 88000000, max: 150000000, rate: 0.35 },
  { min: 150000000, max: 300000000, rate: 0.38 },
  { min: 300000000, max: 500000000, rate: 0.40 },
  { min: 500000000, max: 1000000000, rate: 0.42 },
  { min: 1000000000, max: null, rate: 0.45 },
];

/**
 * 근로소득공제 계산 (소득세법 제47조)
 */
export function calculateEarnedIncomeDeduction(totalSalary: number): number {
  if (totalSalary <= 0) return 0;

  for (const bracket of EARNED_INCOME_DEDUCTION_BRACKETS) {
    const upper = bracket.max ?? Infinity;
    if (totalSalary <= upper) {
      return Math.round(
        bracket.baseDeduction + (totalSalary - bracket.min) * bracket.rate
      );
    }
  }

  // 최고 구간
  const last =
    EARNED_INCOME_DEDUCTION_BRACKETS[
      EARNED_INCOME_DEDUCTION_BRACKETS.length - 1
    ];
  return Math.round(
    last.baseDeduction + (totalSalary - last.min) * last.rate
  );
}

/**
 * 근로소득세액공제 계산 (소득세법 제59조)
 *
 * 산출세액 130만원 이하: 산출세액 × 55%
 * 산출세액 130만원 초과: 71.5만 + (산출세액 - 130만) × 30%
 * 한도: 총급여 3,300만 이하 74만, 7,000만 이하 66만, 7,000만 초과 50만
 */
export function calculateEarnedIncomeTaxCredit(
  calculatedTax: number,
  totalSalary: number
): number {
  if (calculatedTax <= 0) return 0;

  let credit: number;
  if (calculatedTax <= 1300000) {
    credit = Math.round(calculatedTax * 0.55);
  } else {
    credit = Math.round(715000 + (calculatedTax - 1300000) * 0.3);
  }

  // 한도 적용
  let limit: number;
  if (totalSalary <= 33000000) {
    limit = 740000;
  } else if (totalSalary <= 70000000) {
    limit = 660000;
  } else {
    limit = 500000;
  }

  return Math.min(credit, limit);
}

/**
 * 자녀세액공제 (소득세법 제59조의2)
 * 기본: 1명 15만, 2명 30만, 3명 이상 30만 + (N-2)×30만
 */
function calculateChildTaxCredit(children: number): number {
  if (children <= 0) return 0;
  if (children === 1) return 150000;
  if (children === 2) return 300000;
  return 300000 + (children - 2) * 300000;
}

const LOCAL_TAX_RATE = 0.1;

/**
 * KR 근로소득세 계산
 *
 * 계산 흐름:
 * 1. 총급여 = 연봉 - 비과세소득
 * 2. 근로소득공제 적용 → 근로소득금액
 * 3. 인적공제 + 사회보험료 공제 → 과세표준
 * 4. 과세표준 × 누진세율 = 산출세액
 * 5. 세액공제 (근로소득세액공제 + 자녀세액공제) → 결정세액
 * 6. 결정세액 × 10% = 지방소득세
 */
export function calculateKrEarnedIncomeTax(
  input: KrEarnedIncomeInput
): KrEarnedIncomeOutput {
  const {
    annualSalary,
    nonTaxableIncome,
    dependents,
    childrenUnder20,
    nationalPension,
    healthInsurance,
    employmentInsurance,
  } = input;

  // 1. 총급여 (비과세소득 차감)
  const totalSalary = Math.max(0, annualSalary - nonTaxableIncome);

  // 2. 근로소득공제
  const earnedIncomeDeduction = calculateEarnedIncomeDeduction(totalSalary);
  const earnedIncome = Math.max(0, totalSalary - earnedIncomeDeduction);

  // 3. 소득공제
  const personalDeduction = 1500000 * Math.max(1, dependents);
  const socialInsuranceDeduction =
    nationalPension + healthInsurance + employmentInsurance;
  const totalDeductions = personalDeduction + socialInsuranceDeduction;

  // 4. 과세표준
  const taxableIncome = Math.max(0, earnedIncome - totalDeductions);

  // 5. 산출세액
  const calculatedTax = calculateProgressiveTax(taxableIncome, TAX_BRACKETS);

  // 6. 세액공제
  const earnedIncomeTaxCredit = calculateEarnedIncomeTaxCredit(
    calculatedTax,
    totalSalary
  );
  const childTaxCredit = calculateChildTaxCredit(childrenUnder20);
  const totalTaxCredit = earnedIncomeTaxCredit + childTaxCredit;

  // 7. 결정세액
  const determinedTax = Math.max(0, calculatedTax - totalTaxCredit);

  // 8. 지방소득세
  const localTax = Math.round(determinedTax * LOCAL_TAX_RATE);

  // 9. 총 세액
  const totalTax = determinedTax + localTax;

  // 10. 월 예상 원천징수액
  const monthlyWithholding = Math.round(totalTax / 12);

  // 유효세율
  const effectiveRate =
    annualSalary > 0
      ? Math.round((totalTax / annualSalary) * 10000) / 100
      : 0;

  // 실수령액
  const netIncome =
    annualSalary - totalTax - socialInsuranceDeduction;

  return {
    totalSalary,
    earnedIncomeDeduction,
    earnedIncome,
    personalDeduction,
    socialInsuranceDeduction,
    taxableIncome,
    calculatedTax,
    earnedIncomeTaxCredit,
    childTaxCredit,
    determinedTax,
    localTax,
    totalTax,
    monthlyWithholding,
    effectiveRate,
    netIncome,
  };
}

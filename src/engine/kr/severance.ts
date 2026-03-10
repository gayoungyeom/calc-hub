// === 퇴직금 입출력 타입 ===

export interface KrSeveranceInput {
  /** 입사일 (YYYY-MM-DD) */
  startDate: string;
  /** 퇴사일 (YYYY-MM-DD) */
  endDate: string;
  /** 월 기본급 */
  monthlyBaseSalary: number;
  /** 연간 상여금 총액 */
  annualBonus: number;
  /** 연차수당 (미사용 연차에 대한 수당) */
  annualLeavePay: number;
}

export interface KrSeveranceOutput {
  /** 총 재직일수 */
  totalDays: number;
  /** 재직연수 */
  yearsOfService: number;
  /** 1일 평균임금 */
  dailyAverageWage: number;
  /** 퇴직금 */
  severancePay: number;
  /** 월 평균임금 */
  monthlyAverageWage: number;
  /** 퇴직소득세 (간이 계산) */
  severanceTax: number;
  /** 세후 퇴직금 */
  netSeverancePay: number;
}

/**
 * 두 날짜 사이의 일수 계산
 */
function daysBetween(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  const diff = e.getTime() - s.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * 퇴직소득세 간이 계산 (소득세법 제48조)
 *
 * 간소화 계산:
 * 1. 환산급여 = (퇴직금 - 근속연수 공제) × 12 / 근속연수
 * 2. 환산급여에 대해 누진세율 적용
 * 3. 환산세액 × 근속연수 / 12 = 퇴직소득세
 */
function calculateSeveranceTax(severancePay: number, yearsOfService: number): number {
  if (severancePay <= 0 || yearsOfService <= 0) return 0;

  const years = Math.max(1, Math.floor(yearsOfService));

  // 근속연수 공제
  let serviceDeduction: number;
  if (years <= 5) {
    serviceDeduction = 1000000 * years;
  } else if (years <= 10) {
    serviceDeduction = 5000000 + 2000000 * (years - 5);
  } else if (years <= 20) {
    serviceDeduction = 15000000 + 2500000 * (years - 10);
  } else {
    serviceDeduction = 40000000 + 3000000 * (years - 20);
  }

  const taxBase = Math.max(0, severancePay - serviceDeduction);
  if (taxBase <= 0) return 0;

  // 환산급여
  const convertedIncome = Math.round((taxBase * 12) / years);

  // 환산급여 공제 (2026년 기준)
  let convertedDeduction: number;
  if (convertedIncome <= 8000000) {
    convertedDeduction = convertedIncome;
  } else if (convertedIncome <= 70000000) {
    convertedDeduction = 8000000 + (convertedIncome - 8000000) * 0.6;
  } else if (convertedIncome <= 100000000) {
    convertedDeduction = 45200000 + (convertedIncome - 70000000) * 0.55;
  } else {
    convertedDeduction = 61700000 + (convertedIncome - 100000000) * 0.45;
  }

  const convertedTaxBase = Math.max(0, convertedIncome - convertedDeduction);

  // 누진세율 적용
  let convertedTax: number;
  if (convertedTaxBase <= 14000000) {
    convertedTax = convertedTaxBase * 0.06;
  } else if (convertedTaxBase <= 50000000) {
    convertedTax = 840000 + (convertedTaxBase - 14000000) * 0.15;
  } else if (convertedTaxBase <= 88000000) {
    convertedTax = 6240000 + (convertedTaxBase - 50000000) * 0.24;
  } else if (convertedTaxBase <= 150000000) {
    convertedTax = 15360000 + (convertedTaxBase - 88000000) * 0.35;
  } else {
    convertedTax = 37060000 + (convertedTaxBase - 150000000) * 0.38;
  }

  // 퇴직소득세 = 환산세액 × 근속연수 / 12
  const severanceTax = Math.round((convertedTax * years) / 12);

  // 지방소득세 포함 (10%)
  return Math.round(severanceTax * 1.1);
}

/**
 * KR 퇴직금 계산
 *
 * 계산 흐름:
 * 1. 재직일수 계산
 * 2. 1일 평균임금 = (퇴직 전 3개월 급여 + 상여금 비례 + 연차수당 비례) / 퇴직 전 3개월 일수
 * 3. 퇴직금 = 1일 평균임금 × 30 × (재직일수 / 365)
 */
export function calculateKrSeverance(input: KrSeveranceInput): KrSeveranceOutput {
  const { startDate, endDate, monthlyBaseSalary, annualBonus, annualLeavePay } = input;

  // 1. 재직일수
  const totalDays = daysBetween(startDate, endDate);
  if (totalDays <= 0) {
    return {
      totalDays: 0,
      yearsOfService: 0,
      dailyAverageWage: 0,
      severancePay: 0,
      monthlyAverageWage: 0,
      severanceTax: 0,
      netSeverancePay: 0,
    };
  }

  const yearsOfService = totalDays / 365;

  // 2. 평균임금 계산 (퇴직 전 3개월 기준)
  // 3개월 급여
  const threeMonthSalary = monthlyBaseSalary * 3;
  // 상여금 가산 (연간 상여금의 3/12)
  const bonusPortion = Math.round((annualBonus * 3) / 12);
  // 연차수당 가산 (연간의 3/12)
  const annualLeavePortion = Math.round((annualLeavePay * 3) / 12);

  const threeMonthTotal = threeMonthSalary + bonusPortion + annualLeavePortion;
  const dailyAverageWage = Math.round(threeMonthTotal / 91); // 3개월 = 약 91일

  // 3. 퇴직금 = 1일 평균임금 × 30 × (재직일수 / 365)
  const severancePay = Math.round(dailyAverageWage * 30 * (totalDays / 365));

  // 월 평균임금
  const monthlyAverageWage = Math.round(threeMonthTotal / 3);

  // 퇴직소득세
  const severanceTax = calculateSeveranceTax(severancePay, yearsOfService);
  const netSeverancePay = severancePay - severanceTax;

  return {
    totalDays,
    yearsOfService: Math.round(yearsOfService * 10) / 10,
    dailyAverageWage,
    severancePay,
    monthlyAverageWage,
    severanceTax,
    netSeverancePay,
  };
}

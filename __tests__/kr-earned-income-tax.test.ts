import {
  calculateKrEarnedIncomeTax,
  calculateEarnedIncomeDeduction,
  calculateEarnedIncomeTaxCredit,
} from "@/engine/kr/earned-income-tax";
import type { KrEarnedIncomeInput } from "@/engine/kr/earned-income-tax";

function makeInput(overrides: Partial<KrEarnedIncomeInput> & { annualSalary: number }): KrEarnedIncomeInput {
  return {
    annualSalary: overrides.annualSalary,
    nonTaxableIncome: overrides.nonTaxableIncome ?? 0,
    dependents: overrides.dependents ?? 1,
    childrenUnder20: overrides.childrenUnder20 ?? 0,
    nationalPension: overrides.nationalPension ?? 0,
    healthInsurance: overrides.healthInsurance ?? 0,
    employmentInsurance: overrides.employmentInsurance ?? 0,
  };
}

describe("근로소득공제 계산", () => {
  test("총급여 500만원 이하 — 70% 공제", () => {
    expect(calculateEarnedIncomeDeduction(3000000)).toBe(2100000);
    expect(calculateEarnedIncomeDeduction(5000000)).toBe(3500000);
  });

  test("총급여 500만~1,500만원 — 350만 + 초과분 40%", () => {
    expect(calculateEarnedIncomeDeduction(10000000)).toBe(3500000 + 5000000 * 0.4);
  });

  test("총급여 1,500만~4,500만원 — 750만 + 초과분 15%", () => {
    expect(calculateEarnedIncomeDeduction(30000000)).toBe(7500000 + 15000000 * 0.15);
  });

  test("총급여 4,500만~1억원 — 1,200만 + 초과분 5%", () => {
    expect(calculateEarnedIncomeDeduction(70000000)).toBe(12000000 + 25000000 * 0.05);
  });

  test("총급여 1억원 초과 — 1,475만 + 초과분 2%", () => {
    expect(calculateEarnedIncomeDeduction(120000000)).toBe(14750000 + 20000000 * 0.02);
  });

  test("총급여 0원 → 공제 0원", () => {
    expect(calculateEarnedIncomeDeduction(0)).toBe(0);
  });
});

describe("근로소득세액공제 계산", () => {
  test("산출세액 130만원 이하 — 55% 공제", () => {
    expect(calculateEarnedIncomeTaxCredit(1000000, 30000000)).toBe(550000);
  });

  test("산출세액 130만원 초과 — 71.5만 + 초과분 30% (한도 적용)", () => {
    // credit = 71.5만 + (200만-130만)×30% = 71.5만 + 21만 = 92.5만
    // 총급여 3,000만 한도 74만 적용
    expect(calculateEarnedIncomeTaxCredit(2000000, 30000000)).toBe(740000);
    // 총급여 8,000만원이면 한도 50만, credit 자체는 92.5만이지만 50만 한도
    expect(calculateEarnedIncomeTaxCredit(2000000, 80000000)).toBe(500000);
  });

  test("한도 적용 — 총급여 3,300만 이하 74만원", () => {
    // 산출세액이 크더라도 74만 한도
    expect(calculateEarnedIncomeTaxCredit(5000000, 30000000)).toBe(740000);
  });

  test("한도 적용 — 총급여 7,000만 이하 66만원", () => {
    expect(calculateEarnedIncomeTaxCredit(5000000, 50000000)).toBe(660000);
  });

  test("한도 적용 — 총급여 7,000만 초과 50만원", () => {
    expect(calculateEarnedIncomeTaxCredit(5000000, 80000000)).toBe(500000);
  });
});

describe("KR 근로소득세 계산", () => {
  test("소득 0원 → 세금 0원", () => {
    const result = calculateKrEarnedIncomeTax(makeInput({ annualSalary: 0 }));
    expect(result.totalTax).toBe(0);
    expect(result.effectiveRate).toBe(0);
  });

  test("연봉 3,000만원 — 기본 계산 흐름 검증", () => {
    const result = calculateKrEarnedIncomeTax(makeInput({ annualSalary: 30000000 }));

    // 근로소득공제: 750만 + (3000만-1500만)×15% = 750만 + 225만 = 975만
    expect(result.earnedIncomeDeduction).toBe(9750000);
    // 근로소득금액: 3000만 - 975만 = 2025만
    expect(result.earnedIncome).toBe(20250000);
    // 과세표준: 2025만 - 150만(인적공제) = 1875만
    expect(result.taxableIncome).toBe(18750000);
    // 산출세액: 1400만×6% + 475만×15% = 84만 + 71.25만 = 155.25만
    expect(result.calculatedTax).toBe(1552500);
    // 세액공제 적용 후 결정세액 > 0
    expect(result.determinedTax).toBeGreaterThan(0);
    expect(result.localTax).toBe(Math.round(result.determinedTax * 0.1));
    expect(result.effectiveRate).toBeGreaterThan(0);
    expect(result.effectiveRate).toBeLessThan(100);
  });

  test("연봉 5,000만원 — 중간 소득 구간", () => {
    const result = calculateKrEarnedIncomeTax(makeInput({ annualSalary: 50000000 }));

    // 근로소득공제: 1200만 + (5000만-4500만)×5% = 1200만 + 25만 = 1225만
    expect(result.earnedIncomeDeduction).toBe(12250000);
    expect(result.earnedIncome).toBe(37750000);
    expect(result.taxableIncome).toBe(37750000 - 1500000);
    expect(result.totalTax).toBeGreaterThan(0);
  });

  test("연봉 7,000만원 — 고소득 구간", () => {
    const result = calculateKrEarnedIncomeTax(makeInput({ annualSalary: 70000000 }));

    // 근로소득공제: 1200만 + (7000만-4500만)×5% = 1200만 + 125만 = 1325만
    expect(result.earnedIncomeDeduction).toBe(13250000);
    expect(result.totalTax).toBeGreaterThan(0);
    expect(result.effectiveRate).toBeGreaterThan(5);
  });

  test("연봉 1억원 — 고소득 구간", () => {
    const result = calculateKrEarnedIncomeTax(makeInput({ annualSalary: 100000000 }));

    // 근로소득공제: 1200만 + (1억-4500만)×5% = 1200만 + 275만 = 1475만
    expect(result.earnedIncomeDeduction).toBe(14750000);
    expect(result.totalTax).toBeGreaterThan(0);
    expect(result.monthlyWithholding).toBe(Math.round(result.totalTax / 12));
  });

  test("부양가족 4명 — 인적공제 증가", () => {
    const result = calculateKrEarnedIncomeTax(
      makeInput({ annualSalary: 50000000, dependents: 4 })
    );
    expect(result.personalDeduction).toBe(6000000);
    const singleResult = calculateKrEarnedIncomeTax(
      makeInput({ annualSalary: 50000000, dependents: 1 })
    );
    expect(result.totalTax).toBeLessThan(singleResult.totalTax);
  });

  test("비과세 소득 적용 — 식대 월 20만원", () => {
    const result = calculateKrEarnedIncomeTax(
      makeInput({ annualSalary: 50000000, nonTaxableIncome: 2400000 })
    );
    expect(result.totalSalary).toBe(47600000);
    const noExempt = calculateKrEarnedIncomeTax(
      makeInput({ annualSalary: 50000000 })
    );
    expect(result.totalTax).toBeLessThan(noExempt.totalTax);
  });

  test("자녀 2명 — 자녀세액공제 30만원", () => {
    const result = calculateKrEarnedIncomeTax(
      makeInput({ annualSalary: 50000000, dependents: 3, childrenUnder20: 2 })
    );
    expect(result.childTaxCredit).toBe(300000);
  });

  test("사회보험료 공제 적용", () => {
    const result = calculateKrEarnedIncomeTax(
      makeInput({
        annualSalary: 50000000,
        nationalPension: 2250000,
        healthInsurance: 1750000,
        employmentInsurance: 450000,
      })
    );
    expect(result.socialInsuranceDeduction).toBe(4450000);
    const noInsurance = calculateKrEarnedIncomeTax(
      makeInput({ annualSalary: 50000000 })
    );
    expect(result.totalTax).toBeLessThan(noInsurance.totalTax);
  });

  test("실수령액 검증", () => {
    const result = calculateKrEarnedIncomeTax(
      makeInput({
        annualSalary: 50000000,
        nationalPension: 2250000,
        healthInsurance: 1750000,
        employmentInsurance: 450000,
      })
    );
    expect(result.netIncome).toBe(
      50000000 - result.totalTax - result.socialInsuranceDeduction
    );
  });

  test("유효세율 0~100% 범위 검증", () => {
    const salaries = [20000000, 30000000, 50000000, 70000000, 100000000, 200000000];
    for (const salary of salaries) {
      const result = calculateKrEarnedIncomeTax(makeInput({ annualSalary: salary }));
      expect(result.effectiveRate).toBeGreaterThanOrEqual(0);
      expect(result.effectiveRate).toBeLessThan(50);
    }
  });
});

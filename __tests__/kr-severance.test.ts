import { calculateKrSeverance } from "@/engine/kr/severance";
import type { KrSeveranceInput } from "@/engine/kr/severance";

function makeInput(overrides: Partial<KrSeveranceInput> & {
  startDate: string;
  endDate: string;
  monthlyBaseSalary: number;
}): KrSeveranceInput {
  return {
    startDate: overrides.startDate,
    endDate: overrides.endDate,
    monthlyBaseSalary: overrides.monthlyBaseSalary,
    annualBonus: overrides.annualBonus ?? 0,
    annualLeavePay: overrides.annualLeavePay ?? 0,
  };
}

describe("KR 퇴직금 계산", () => {
  test("재직일수 0일 → 퇴직금 0원", () => {
    const result = calculateKrSeverance(makeInput({
      startDate: "2025-01-01",
      endDate: "2025-01-01",
      monthlyBaseSalary: 3000000,
    }));
    expect(result.totalDays).toBe(0);
    expect(result.severancePay).toBe(0);
  });

  test("1년 근속, 월급 300만원 — 기본 퇴직금 계산", () => {
    const result = calculateKrSeverance(makeInput({
      startDate: "2025-01-01",
      endDate: "2026-01-01",
      monthlyBaseSalary: 3000000,
    }));
    // 재직일수: 365일
    expect(result.totalDays).toBe(365);
    // 1일 평균임금 = (300만 × 3) / 91 ≈ 98,901
    expect(result.dailyAverageWage).toBe(Math.round(9000000 / 91));
    // 퇴직금 = 1일 평균임금 × 30 × (365/365) ≈ 296.7만
    const expectedSeverance = Math.round(Math.round(9000000 / 91) * 30 * (365 / 365));
    expect(result.severancePay).toBe(expectedSeverance);
    expect(result.yearsOfService).toBe(1);
  });

  test("3년 근속, 월급 400만원 + 상여금 — 퇴직금 계산", () => {
    const result = calculateKrSeverance(makeInput({
      startDate: "2023-01-01",
      endDate: "2026-01-01",
      monthlyBaseSalary: 4000000,
      annualBonus: 4000000,
    }));
    // 재직일수: 365 × 3 + 1 (윤년) = 1096
    expect(result.totalDays).toBe(1096);
    expect(result.yearsOfService).toBe(3);
    // 3개월 급여 = 1200만 + 상여금(400만×3/12=100만) = 1300만
    // 1일 평균임금 = 1300만 / 91 ≈ 142,857
    expect(result.dailyAverageWage).toBe(Math.round(13000000 / 91));
    // 퇴직금 ≈ 142,857 × 30 × (1096/365)
    expect(result.severancePay).toBeGreaterThan(0);
  });

  test("10년 근속, 월급 500만원 — 장기 근속 계산", () => {
    const result = calculateKrSeverance(makeInput({
      startDate: "2016-01-01",
      endDate: "2026-01-01",
      monthlyBaseSalary: 5000000,
    }));
    expect(result.totalDays).toBeGreaterThan(3600);
    expect(result.yearsOfService).toBe(10);
    // 퇴직금 ≈ 500만 × 10 = 5000만 (대략치)
    expect(result.severancePay).toBeGreaterThan(40000000);
    expect(result.severancePay).toBeLessThan(60000000);
  });

  test("상여금 + 연차수당 포함 시 퇴직금 증가", () => {
    const base = calculateKrSeverance(makeInput({
      startDate: "2025-01-01",
      endDate: "2026-01-01",
      monthlyBaseSalary: 3000000,
    }));

    const withBonus = calculateKrSeverance(makeInput({
      startDate: "2025-01-01",
      endDate: "2026-01-01",
      monthlyBaseSalary: 3000000,
      annualBonus: 3000000,
      annualLeavePay: 500000,
    }));

    expect(withBonus.severancePay).toBeGreaterThan(base.severancePay);
    expect(withBonus.dailyAverageWage).toBeGreaterThan(base.dailyAverageWage);
  });

  test("퇴직소득세 계산 — 소액 퇴직금은 세금 적음", () => {
    const result = calculateKrSeverance(makeInput({
      startDate: "2025-01-01",
      endDate: "2026-01-01",
      monthlyBaseSalary: 2000000,
    }));
    // 1년 근속 200만원 월급 → 퇴직금 약 200만원
    // 근속연수공제 100만원 적용 시 세금 매우 적음
    expect(result.severanceTax).toBeGreaterThanOrEqual(0);
    expect(result.netSeverancePay).toBe(result.severancePay - result.severanceTax);
  });

  test("세후 퇴직금 = 퇴직금 - 퇴직소득세", () => {
    const result = calculateKrSeverance(makeInput({
      startDate: "2021-01-01",
      endDate: "2026-01-01",
      monthlyBaseSalary: 5000000,
      annualBonus: 5000000,
    }));
    expect(result.netSeverancePay).toBe(result.severancePay - result.severanceTax);
    expect(result.netSeverancePay).toBeGreaterThan(0);
  });

  test("월 평균임금 검증", () => {
    const result = calculateKrSeverance(makeInput({
      startDate: "2025-01-01",
      endDate: "2026-01-01",
      monthlyBaseSalary: 3000000,
      annualBonus: 1200000,
    }));
    // 3개월 급여 900만 + 상여금 30만 = 930만 → 월 평균 310만
    expect(result.monthlyAverageWage).toBe(Math.round(9300000 / 3));
  });
});

import { calculateKrIncomeTax } from "@/engine/kr/income-tax";
import { getKrConfig } from "@/config/loader";

const config = getKrConfig(2026);

/** 기본 입력 헬퍼 */
function makeInput(overrides: {
  grossIncome: number;
  expenses?: number;
  dependents?: number;
  nationalPension?: number;
  healthInsurance?: number;
}) {
  return {
    grossIncome: overrides.grossIncome,
    expenses: overrides.expenses ?? 0,
    dependents: overrides.dependents ?? 1,
    nationalPension: overrides.nationalPension ?? 0,
    healthInsurance: overrides.healthInsurance ?? 0,
  };
}

describe("KR 종합소득세 계산", () => {
  test("소득 0원 → 세금 0원, 환급 0원", () => {
    const result = calculateKrIncomeTax(makeInput({ grossIncome: 0 }), config);
    expect(result.incomeTax).toBe(0);
    expect(result.localTax).toBe(0);
    expect(result.refundOrDue).toBe(0);
    expect(result.effectiveRate).toBe(0);
  });

  test("연 2,400만 원 (월 200만) — 1구간 (6%)", () => {
    const result = calculateKrIncomeTax(
      makeInput({ grossIncome: 24000000 }),
      config
    );
    // 소득금액 2400만, 기본공제 150만 → 과세표준 2250만
    // 1400만 × 6% + 850만 × 15% = 84만 + 127.5만 = 211.5만
    expect(result.totalIncome).toBe(24000000);
    expect(result.taxableIncome).toBe(22500000);
    expect(result.incomeTax).toBe(2115000);
    expect(result.localTax).toBe(211500);
    // 기납부: 2400만 × 3.3% = 79.2만
    expect(result.prepaidTax).toBe(792000);
    // 환급: 79.2만 - (211.5만 + 21.15만) = 79.2만 - 232.65만 = -153.45만
    expect(result.refundOrDue).toBe(792000 - 2115000 - 211500);
  });

  test("연 3,600만 원 (월 300만) — 경비 적용", () => {
    const result = calculateKrIncomeTax(
      makeInput({ grossIncome: 36000000, expenses: 6000000 }),
      config
    );
    // 소득금액 3000만, 기본공제 150만 → 과세표준 2850만
    expect(result.totalIncome).toBe(30000000);
    expect(result.taxableIncome).toBe(28500000);
    expect(result.prepaidTax).toBe(Math.round(36000000 * 0.033));
  });

  test("연 6,000만 원 — 부양가족 3명", () => {
    const result = calculateKrIncomeTax(
      makeInput({ grossIncome: 60000000, dependents: 3 }),
      config
    );
    // 기본공제 150만 × 3 = 450만
    expect(result.taxableIncome).toBe(60000000 - 4500000);
  });

  test("연 1억 원 — 고소득 구간", () => {
    const result = calculateKrIncomeTax(
      makeInput({ grossIncome: 100000000 }),
      config
    );
    // 과세표준: 1억 - 150만 = 9850만
    expect(result.taxableIncome).toBe(98500000);
    // 3구간까지 (6%, 15%, 24%) + 4구간 (35%) 일부
    // 1400만 × 6% = 84만
    // 3600만 × 15% = 540만
    // 3800만 × 24% = 912만
    // 1050만 × 35% = 367.5만
    // 합계: 1903.5만
    expect(result.incomeTax).toBe(19035000);
    expect(result.effectiveRate).toBeGreaterThan(0);
  });

  test("연 2,000만 원 — 사회보험료 공제 적용", () => {
    const result = calculateKrIncomeTax(
      makeInput({
        grossIncome: 20000000,
        nationalPension: 900000,
        healthInsurance: 600000,
      }),
      config
    );
    // 기본공제 150만 + 국민연금 90만 + 건보 60만 = 300만
    expect(result.taxableIncome).toBe(20000000 - 3000000);
  });

  test("유효세율이 0~100% 범위 내인지 검증", () => {
    const incomes = [10000000, 30000000, 50000000, 80000000, 200000000];
    for (const income of incomes) {
      const result = calculateKrIncomeTax(
        makeInput({ grossIncome: income }),
        config
      );
      expect(result.effectiveRate).toBeGreaterThanOrEqual(0);
      expect(result.effectiveRate).toBeLessThan(100);
    }
  });
});

describe("KR 종합소득세 — 홈택스 대조 검증 (경비 0, 부양 1인)", () => {
  test("연 2,000만 원 → 종합소득세 1,515,000원", () => {
    const result = calculateKrIncomeTax(
      makeInput({ grossIncome: 20000000 }),
      config
    );
    expect(result.taxableIncome).toBe(18500000);
    expect(result.incomeTax).toBe(1515000);
    expect(result.localTax).toBe(151500);
    expect(result.prepaidTax).toBe(660000);
    expect(result.refundOrDue).toBe(-1006500);
  });

  test("연 3,000만 원 → 종합소득세 3,015,000원", () => {
    const result = calculateKrIncomeTax(
      makeInput({ grossIncome: 30000000 }),
      config
    );
    expect(result.taxableIncome).toBe(28500000);
    expect(result.incomeTax).toBe(3015000);
    expect(result.localTax).toBe(301500);
    expect(result.prepaidTax).toBe(990000);
    expect(result.refundOrDue).toBe(-2326500);
  });

  test("연 5,000만 원 → 종합소득세 6,015,000원", () => {
    const result = calculateKrIncomeTax(
      makeInput({ grossIncome: 50000000 }),
      config
    );
    expect(result.taxableIncome).toBe(48500000);
    expect(result.incomeTax).toBe(6015000);
    expect(result.localTax).toBe(601500);
    expect(result.prepaidTax).toBe(1650000);
    expect(result.refundOrDue).toBe(-4966500);
  });

  test("연 8,000만 원 → 종합소득세 13,080,000원", () => {
    const result = calculateKrIncomeTax(
      makeInput({ grossIncome: 80000000 }),
      config
    );
    expect(result.taxableIncome).toBe(78500000);
    expect(result.incomeTax).toBe(13080000);
    expect(result.localTax).toBe(1308000);
    expect(result.prepaidTax).toBe(2640000);
    expect(result.refundOrDue).toBe(-11748000);
  });

  test("연 1억 원 → 종합소득세 19,035,000원", () => {
    const result = calculateKrIncomeTax(
      makeInput({ grossIncome: 100000000 }),
      config
    );
    expect(result.taxableIncome).toBe(98500000);
    expect(result.incomeTax).toBe(19035000);
    expect(result.localTax).toBe(1903500);
    expect(result.prepaidTax).toBe(3300000);
    expect(result.refundOrDue).toBe(-17638500);
  });
});

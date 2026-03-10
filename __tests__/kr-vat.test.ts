import { calculateKrVat } from "@/engine/kr/vat";
import type { KrVatInput } from "@/engine/kr/vat";

function makeInput(overrides: Partial<KrVatInput> & { revenue: number }): KrVatInput {
  return {
    taxpayerType: overrides.taxpayerType ?? "general",
    revenue: overrides.revenue,
    purchases: overrides.purchases ?? 0,
    creditCardRatio: overrides.creditCardRatio ?? 0,
  };
}

describe("KR 부가가치세 계산 — 일반과세자", () => {
  test("매출 1,000만원, 매입 0원 → 부가세 100만원", () => {
    const result = calculateKrVat(makeInput({ revenue: 10000000 }));
    expect(result.outputTax).toBe(1000000);
    expect(result.inputTax).toBe(0);
    expect(result.finalVatDue).toBe(1000000);
    expect(result.taxpayerTypeLabel).toBe("일반과세자");
  });

  test("매출 5,000만원, 매입 3,000만원 → 부가세 200만원", () => {
    const result = calculateKrVat(makeInput({ revenue: 50000000, purchases: 30000000 }));
    expect(result.outputTax).toBe(5000000);
    expect(result.inputTax).toBe(3000000);
    expect(result.finalVatDue).toBe(2000000);
  });

  test("매입이 매출보다 큰 경우 → 납부세액 0원 (환급)", () => {
    const result = calculateKrVat(makeInput({ revenue: 10000000, purchases: 20000000 }));
    expect(result.finalVatDue).toBe(0);
  });

  test("매출 0원 → 세금 0원", () => {
    const result = calculateKrVat(makeInput({ revenue: 0 }));
    expect(result.finalVatDue).toBe(0);
  });

  test("부가세 포함 총액 계산", () => {
    const result = calculateKrVat(makeInput({ revenue: 10000000, purchases: 5000000 }));
    expect(result.totalRevenueWithVat).toBe(11000000);
    expect(result.totalPurchasesWithVat).toBe(5500000);
  });
});

describe("KR 부가가치세 계산 — 간이과세자", () => {
  test("매출 4,800만원, 매입 0원", () => {
    const result = calculateKrVat(makeInput({
      taxpayerType: "simplified",
      revenue: 48000000,
    }));
    // 납부세액 = 4800만 × 30% × 10% = 144만
    expect(result.outputTax).toBe(1440000);
    expect(result.finalVatDue).toBe(1440000);
    expect(result.taxpayerTypeLabel).toBe("간이과세자");
  });

  test("매출 4,800만원, 매입 2,000만원 → 매입공제 적용", () => {
    const result = calculateKrVat(makeInput({
      taxpayerType: "simplified",
      revenue: 48000000,
      purchases: 20000000,
    }));
    // 매입세액 공제 = 2000만 × 0.5% = 10만
    expect(result.inputTax).toBe(100000);
    expect(result.vatDue).toBe(1440000 - 100000);
  });

  test("신용카드 매출 세액공제 적용", () => {
    const result = calculateKrVat(makeInput({
      taxpayerType: "simplified",
      revenue: 48000000,
      creditCardRatio: 50,
    }));
    // 신용카드 매출 = 4800만 × 50% = 2400만
    // 공제 = 2400만 × 2.6% = 62.4만
    expect(result.simplifiedCredit).toBe(624000);
    expect(result.finalVatDue).toBe(result.vatDue - result.simplifiedCredit);
  });

  test("매출 0원 → 세금 0원", () => {
    const result = calculateKrVat(makeInput({
      taxpayerType: "simplified",
      revenue: 0,
    }));
    expect(result.finalVatDue).toBe(0);
  });
});

describe("KR 부가가치세 계산 — 면세사업자", () => {
  test("면세사업자 → 부가세 0원", () => {
    const result = calculateKrVat(makeInput({
      taxpayerType: "exempt",
      revenue: 100000000,
      purchases: 50000000,
    }));
    expect(result.outputTax).toBe(0);
    expect(result.inputTax).toBe(0);
    expect(result.finalVatDue).toBe(0);
    expect(result.taxpayerTypeLabel).toBe("면세사업자");
  });

  test("면세사업자 매출/매입 총액은 원래 금액 그대로", () => {
    const result = calculateKrVat(makeInput({
      taxpayerType: "exempt",
      revenue: 50000000,
      purchases: 20000000,
    }));
    expect(result.totalRevenueWithVat).toBe(50000000);
    expect(result.totalPurchasesWithVat).toBe(20000000);
  });
});

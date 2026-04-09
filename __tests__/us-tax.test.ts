import { calculateUsTax } from "@/engine/us/federal-tax";
import { getUsConfig } from "@/config/loader";
import type { UsFilingStatus } from "@/engine/types";

const config = getUsConfig(2026);

function makeInput(overrides: {
  grossIncome: number;
  expenses?: number;
  filingStatus?: UsFilingStatus;
  state?: string;
  deductionType?: "standard" | "itemized";
  itemizedDeduction?: number;
}) {
  return {
    grossIncome: overrides.grossIncome,
    expenses: overrides.expenses ?? 0,
    filingStatus: overrides.filingStatus ?? "single",
    state: overrides.state ?? "TX",
    deductionType: overrides.deductionType ?? ("standard" as const),
    itemizedDeduction: overrides.itemizedDeduction,
  };
}

describe("US 1099 Self-Employed Tax 계산", () => {
  test("소득 $0 → 세금 $0", () => {
    const result = calculateUsTax(makeInput({ grossIncome: 0 }), config);
    expect(result.totalTax).toBe(0);
    expect(result.netIncome).toBe(0);
    expect(result.effectiveRate).toBe(0);
  });

  test("$50,000 / Single / TX — SE Tax 계산 검증", () => {
    const result = calculateUsTax(
      makeInput({ grossIncome: 50000, state: "TX" }),
      config
    );
    // SE Tax: 50000 × 0.9235 × 0.153 = 7064.78 ≈ 7065
    expect(result.selfEmploymentTax).toBe(Math.round(50000 * 0.9235 * 0.153));
    // SE Deduction: SE Tax / 2
    expect(result.seTaxDeduction).toBe(Math.round(result.selfEmploymentTax / 2));
    // TX = no state tax
    expect(result.stateTax).toBe(0);
    expect(result.netIncome).toBe(result.netBusinessIncome - result.totalTax);
  });

  test("$100,000 / Single / CA — State Tax 발생", () => {
    const result = calculateUsTax(
      makeInput({ grossIncome: 100000, state: "CA" }),
      config
    );
    expect(result.stateTax).toBeGreaterThan(0);
    expect(result.federalTax).toBeGreaterThan(0);
    expect(result.totalTax).toBe(
      result.federalTax + result.selfEmploymentTax + result.stateTax
    );
  });

  test("$100,000 / Married Jointly / TX — 더 높은 Standard Deduction", () => {
    const single = calculateUsTax(
      makeInput({ grossIncome: 100000, filingStatus: "single", state: "TX" }),
      config
    );
    const married = calculateUsTax(
      makeInput({
        grossIncome: 100000,
        filingStatus: "married_jointly",
        state: "TX",
      }),
      config
    );
    // MFJ는 Standard Deduction이 높으므로 Federal Tax가 낮아야 함
    expect(married.federalTax).toBeLessThan(single.federalTax);
    // SE Tax는 Filing Status와 무관하므로 동일
    expect(married.selfEmploymentTax).toBe(single.selfEmploymentTax);
  });

  test("$80,000 / Single / NY — State Tax 발생", () => {
    const result = calculateUsTax(
      makeInput({ grossIncome: 80000, state: "NY" }),
      config
    );
    expect(result.stateTax).toBeGreaterThan(0);
  });

  test("$80,000 / TX vs CA vs NY — TX가 가장 낮은 Total Tax", () => {
    const tx = calculateUsTax(
      makeInput({ grossIncome: 80000, state: "TX" }),
      config
    );
    const ca = calculateUsTax(
      makeInput({ grossIncome: 80000, state: "CA" }),
      config
    );
    const ny = calculateUsTax(
      makeInput({ grossIncome: 80000, state: "NY" }),
      config
    );
    expect(tx.totalTax).toBeLessThan(ca.totalTax);
    expect(tx.totalTax).toBeLessThan(ny.totalTax);
  });

  test("경비 차감 검증 — $100,000 수입, $20,000 경비", () => {
    const noExpense = calculateUsTax(
      makeInput({ grossIncome: 100000, state: "TX" }),
      config
    );
    const withExpense = calculateUsTax(
      makeInput({ grossIncome: 100000, expenses: 20000, state: "TX" }),
      config
    );
    expect(withExpense.netBusinessIncome).toBe(80000);
    expect(withExpense.totalTax).toBeLessThan(noExpense.totalTax);
  });

  test("Quarterly Payment = Total Tax / 4", () => {
    const result = calculateUsTax(
      makeInput({ grossIncome: 120000, state: "CA" }),
      config
    );
    expect(result.quarterlyPayment).toBe(Math.round(result.totalTax / 4));
  });

  test("유효세율이 0~100% 범위 내인지 검증", () => {
    const incomes = [20000, 50000, 100000, 200000, 500000];
    for (const income of incomes) {
      const result = calculateUsTax(
        makeInput({ grossIncome: income, state: "CA" }),
        config
      );
      expect(result.effectiveRate).toBeGreaterThanOrEqual(0);
      expect(result.effectiveRate).toBeLessThan(100);
    }
  });

  test("$80,000 / FL — State Tax 없음 (TX와 동일)", () => {
    const fl = calculateUsTax(
      makeInput({ grossIncome: 80000, state: "FL" }),
      config
    );
    const tx = calculateUsTax(
      makeInput({ grossIncome: 80000, state: "TX" }),
      config
    );
    expect(fl.stateTax).toBe(0);
    expect(fl.totalTax).toBe(tx.totalTax);
  });

  test("$80,000 / WA — State Tax 없음 (TX와 동일)", () => {
    const wa = calculateUsTax(
      makeInput({ grossIncome: 80000, state: "WA" }),
      config
    );
    const tx = calculateUsTax(
      makeInput({ grossIncome: 80000, state: "TX" }),
      config
    );
    expect(wa.stateTax).toBe(0);
    expect(wa.totalTax).toBe(tx.totalTax);
  });

  test("Head of Household Filing Status", () => {
    const result = calculateUsTax(
      makeInput({
        grossIncome: 75000,
        filingStatus: "head_of_household",
        state: "TX",
      }),
      config
    );
    expect(result.federalTax).toBeGreaterThan(0);
    expect(result.totalTax).toBeGreaterThan(0);
  });
});

describe("US 1099 Tax — IRS 대조 검증 (Single / TX / no expenses)", () => {
  test("$50,000 → SE Tax $7,065 / Federal $3,544 / Total $10,609", () => {
    const result = calculateUsTax(
      makeInput({ grossIncome: 50000, state: "TX" }),
      config
    );
    expect(result.selfEmploymentTax).toBe(7065);
    expect(result.seTaxDeduction).toBe(3533); // Math.round(7065/2) = 3533 (JS rounds .5 up)
    expect(result.federalTax).toBe(3544);
    expect(result.stateTax).toBe(0);
    expect(result.totalTax).toBe(10609);
  });

  test("$100,000 → SE Tax $14,130 / Federal $12,199 / Total $26,329", () => {
    const result = calculateUsTax(
      makeInput({ grossIncome: 100000, state: "TX" }),
      config
    );
    expect(result.selfEmploymentTax).toBe(14130);
    expect(result.seTaxDeduction).toBe(7065);
    expect(result.federalTax).toBe(12199);
    expect(result.stateTax).toBe(0);
    expect(result.totalTax).toBe(26329);
  });

  test("$200,000 → SE Tax $28,259 / Federal $34,051 / Total $62,310", () => {
    const result = calculateUsTax(
      makeInput({ grossIncome: 200000, state: "TX" }),
      config
    );
    expect(result.selfEmploymentTax).toBe(28259);
    expect(result.seTaxDeduction).toBe(14130);
    expect(result.federalTax).toBe(34051);
    expect(result.stateTax).toBe(0);
    expect(result.totalTax).toBe(62310);
  });
});

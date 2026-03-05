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

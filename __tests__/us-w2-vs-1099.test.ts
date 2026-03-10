import { calculateW2vs1099 } from "@/engine/us/w2-vs-1099";
import { getUsConfig } from "@/config/loader";

const config = getUsConfig(2026);

describe("W-2 vs 1099 Comparison Calculator", () => {
  test("$0 income → zero taxes for both", () => {
    const result = calculateW2vs1099({
      annualIncome: 0,
      filingStatus: "single",
      state: "TX",
      businessExpenses: 0,
    }, config);
    expect(result.w2.totalTax).toBe(0);
    expect(result.self1099.totalTax).toBe(0);
    expect(result.taxDifference).toBe(0);
  });

  test("$50K single, TX — 1099 pays more tax than W-2", () => {
    const result = calculateW2vs1099({
      annualIncome: 50000,
      filingStatus: "single",
      state: "TX",
      businessExpenses: 0,
    }, config);
    // W-2: FICA 7.65% only employee portion
    expect(result.w2.ficaTax).toBe(Math.round(50000 * 0.0765));
    expect(result.w2.stateTax).toBe(0); // TX no income tax
    // 1099 pays full SE tax (15.3%), so more total tax
    expect(result.self1099.selfEmploymentTax).toBeGreaterThan(result.w2.ficaTax);
    expect(result.taxDifference).toBeGreaterThan(0);
  });

  test("$100K single, CA — both sides have state tax", () => {
    const result = calculateW2vs1099({
      annualIncome: 100000,
      filingStatus: "single",
      state: "CA",
      businessExpenses: 0,
    }, config);
    expect(result.w2.stateTax).toBeGreaterThan(0);
    expect(result.self1099.stateTax).toBeGreaterThan(0);
    expect(result.w2.effectiveRate).toBeGreaterThan(0);
    expect(result.self1099.effectiveRate).toBeGreaterThan(0);
  });

  test("$100K with $20K expenses — 1099 net income improves", () => {
    const noExpenses = calculateW2vs1099({
      annualIncome: 100000,
      filingStatus: "single",
      state: "TX",
      businessExpenses: 0,
    }, config);
    const withExpenses = calculateW2vs1099({
      annualIncome: 100000,
      filingStatus: "single",
      state: "TX",
      businessExpenses: 20000,
    }, config);
    expect(withExpenses.self1099.totalTax).toBeLessThan(noExpenses.self1099.totalTax);
    expect(withExpenses.self1099.netBusinessIncome).toBe(80000);
  });

  test("$150K married_jointly — filing status affects brackets", () => {
    const single = calculateW2vs1099({
      annualIncome: 150000,
      filingStatus: "single",
      state: "TX",
      businessExpenses: 0,
    }, config);
    const married = calculateW2vs1099({
      annualIncome: 150000,
      filingStatus: "married_jointly",
      state: "TX",
      businessExpenses: 0,
    }, config);
    expect(married.w2.federalTax).toBeLessThan(single.w2.federalTax);
  });

  test("netIncomeDifference = 1099 netIncome - W2 netIncome", () => {
    const result = calculateW2vs1099({
      annualIncome: 75000,
      filingStatus: "single",
      state: "NY",
      businessExpenses: 5000,
    }, config);
    expect(result.netIncomeDifference).toBe(
      result.self1099.netIncome - result.w2.netIncome
    );
  });

  test("quarterly payment = totalTax / 4", () => {
    const result = calculateW2vs1099({
      annualIncome: 80000,
      filingStatus: "single",
      state: "CA",
      businessExpenses: 0,
    }, config);
    expect(result.self1099.quarterlyPayment).toBe(
      Math.round(result.self1099.totalTax / 4)
    );
  });

  test("effective rates are within 0-50%", () => {
    const incomes = [30000, 50000, 100000, 150000, 200000];
    for (const income of incomes) {
      const result = calculateW2vs1099({
        annualIncome: income,
        filingStatus: "single",
        state: "CA",
        businessExpenses: 0,
      }, config);
      expect(result.w2.effectiveRate).toBeGreaterThanOrEqual(0);
      expect(result.w2.effectiveRate).toBeLessThan(50);
      expect(result.self1099.effectiveRate).toBeGreaterThanOrEqual(0);
      expect(result.self1099.effectiveRate).toBeLessThan(50);
    }
  });
});

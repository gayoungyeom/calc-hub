import { calculateHomeOfficeDeduction } from "@/engine/us/home-office";
import type { HomeOfficeInput } from "@/engine/us/home-office";

function makeInput(overrides: Partial<HomeOfficeInput>): HomeOfficeInput {
  return {
    totalHomeSqft: overrides.totalHomeSqft ?? 1000,
    officeSqft: overrides.officeSqft ?? 200,
    annualRentOrMortgage: overrides.annualRentOrMortgage ?? 0,
    annualUtilities: overrides.annualUtilities ?? 0,
    annualInsurance: overrides.annualInsurance ?? 0,
    annualRepairs: overrides.annualRepairs ?? 0,
  };
}

describe("Home Office Deduction Calculator", () => {
  test("Simplified method: $5 × office sqft", () => {
    const result = calculateHomeOfficeDeduction(makeInput({ officeSqft: 200 }));
    expect(result.simplifiedDeduction).toBe(1000); // 200 × $5
  });

  test("Simplified method: capped at 300 sqft ($1,500)", () => {
    const result = calculateHomeOfficeDeduction(makeInput({ officeSqft: 500 }));
    expect(result.simplifiedDeduction).toBe(1500); // 300 × $5
  });

  test("Regular method: expenses × business use %", () => {
    const result = calculateHomeOfficeDeduction(makeInput({
      totalHomeSqft: 1000,
      officeSqft: 200,
      annualRentOrMortgage: 24000,
      annualUtilities: 3600,
      annualInsurance: 1200,
      annualRepairs: 1200,
    }));
    // Business use: 200/1000 = 20%
    expect(result.businessUsePercentage).toBe(20);
    // Total expenses: $30,000 × 20% = $6,000
    expect(result.totalHomeExpenses).toBe(30000);
    expect(result.regularDeduction).toBe(6000);
  });

  test("Recommends regular method when it gives higher deduction", () => {
    const result = calculateHomeOfficeDeduction(makeInput({
      totalHomeSqft: 1000,
      officeSqft: 200,
      annualRentOrMortgage: 24000,
      annualUtilities: 3600,
    }));
    // Simplified: 200 × $5 = $1,000
    // Regular: $27,600 × 20% = $5,520
    expect(result.recommendedMethod).toBe("regular");
    expect(result.regularAdvantage).toBeGreaterThan(0);
  });

  test("Recommends simplified when expenses are low", () => {
    const result = calculateHomeOfficeDeduction(makeInput({
      totalHomeSqft: 1000,
      officeSqft: 200,
      annualRentOrMortgage: 3000,
      annualUtilities: 600,
    }));
    // Simplified: $1,000
    // Regular: $3,600 × 20% = $720
    expect(result.recommendedMethod).toBe("simplified");
  });

  test("Zero sqft → zero deductions", () => {
    const result = calculateHomeOfficeDeduction(makeInput({
      totalHomeSqft: 0,
      officeSqft: 0,
    }));
    expect(result.simplifiedDeduction).toBe(0);
    expect(result.regularDeduction).toBe(0);
    expect(result.businessUsePercentage).toBe(0);
  });

  test("regularAdvantage = regular - simplified", () => {
    const result = calculateHomeOfficeDeduction(makeInput({
      totalHomeSqft: 800,
      officeSqft: 150,
      annualRentOrMortgage: 18000,
      annualUtilities: 2400,
      annualInsurance: 1000,
      annualRepairs: 600,
    }));
    expect(result.regularAdvantage).toBe(
      result.regularDeduction - result.simplifiedDeduction
    );
  });
});

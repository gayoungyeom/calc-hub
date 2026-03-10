import { calculateMileageDeduction } from "@/engine/us/mileage";
import type { MileageInput } from "@/engine/us/mileage";

function makeInput(overrides: Partial<MileageInput>): MileageInput {
  return {
    annualMiles: overrides.annualMiles ?? 0,
    actualGasExpense: overrides.actualGasExpense ?? 0,
    actualInsurance: overrides.actualInsurance ?? 0,
    actualRepairs: overrides.actualRepairs ?? 0,
    actualDepreciation: overrides.actualDepreciation ?? 0,
    businessUsePercentage: overrides.businessUsePercentage ?? 100,
  };
}

describe("Mileage Deduction Calculator", () => {
  test("Standard mileage rate: miles × $0.67", () => {
    const result = calculateMileageDeduction(makeInput({ annualMiles: 10000 }));
    expect(result.standardDeduction).toBe(6700);
    expect(result.standardRate).toBe(0.67);
  });

  test("20,000 miles → $13,400 standard deduction", () => {
    const result = calculateMileageDeduction(makeInput({ annualMiles: 20000 }));
    expect(result.standardDeduction).toBe(13400);
  });

  test("Actual expenses with 100% business use", () => {
    const result = calculateMileageDeduction(makeInput({
      annualMiles: 10000,
      actualGasExpense: 3000,
      actualInsurance: 1500,
      actualRepairs: 500,
      actualDepreciation: 3000,
      businessUsePercentage: 100,
    }));
    expect(result.totalActualExpenses).toBe(8000);
    expect(result.actualDeduction).toBe(8000);
  });

  test("Actual expenses with 50% business use", () => {
    const result = calculateMileageDeduction(makeInput({
      annualMiles: 10000,
      actualGasExpense: 3000,
      actualInsurance: 1500,
      actualRepairs: 500,
      actualDepreciation: 3000,
      businessUsePercentage: 50,
    }));
    expect(result.actualDeduction).toBe(4000);
  });

  test("Recommends standard when actual is lower", () => {
    const result = calculateMileageDeduction(makeInput({
      annualMiles: 15000,
      actualGasExpense: 2000,
      actualInsurance: 1200,
      actualRepairs: 300,
      actualDepreciation: 2000,
      businessUsePercentage: 100,
    }));
    // Standard: 15000 × 0.67 = $10,050
    // Actual: $5,500
    expect(result.recommendedMethod).toBe("standard");
    expect(result.actualAdvantage).toBeLessThan(0);
  });

  test("Recommends actual when expenses are high", () => {
    const result = calculateMileageDeduction(makeInput({
      annualMiles: 10000,
      actualGasExpense: 5000,
      actualInsurance: 2000,
      actualRepairs: 1000,
      actualDepreciation: 5000,
      businessUsePercentage: 100,
    }));
    // Standard: $6,700
    // Actual: $13,000
    expect(result.recommendedMethod).toBe("actual");
    expect(result.actualAdvantage).toBeGreaterThan(0);
  });

  test("Zero miles → zero standard deduction", () => {
    const result = calculateMileageDeduction(makeInput({ annualMiles: 0 }));
    expect(result.standardDeduction).toBe(0);
  });

  test("actualAdvantage = actual - standard", () => {
    const result = calculateMileageDeduction(makeInput({
      annualMiles: 12000,
      actualGasExpense: 4000,
      actualInsurance: 1500,
      actualRepairs: 800,
      actualDepreciation: 3000,
      businessUsePercentage: 80,
    }));
    expect(result.actualAdvantage).toBe(
      Math.round((result.actualDeduction - result.standardDeduction) * 100) / 100
    );
  });
});

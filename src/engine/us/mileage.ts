export interface MileageInput {
  /** Annual business miles driven */
  annualMiles: number;
  /** Actual vehicle expenses (gas, insurance, repairs, depreciation) */
  actualGasExpense: number;
  actualInsurance: number;
  actualRepairs: number;
  actualDepreciation: number;
  /** Percentage of total miles that are business miles */
  businessUsePercentage: number;
}

export interface MileageOutput {
  /** Standard mileage rate deduction */
  standardDeduction: number;
  /** Actual expense deduction */
  actualDeduction: number;
  /** Total actual expenses */
  totalActualExpenses: number;
  /** Recommended method */
  recommendedMethod: "standard" | "actual";
  /** Difference (actual - standard) */
  actualAdvantage: number;
  /** Standard mileage rate used */
  standardRate: number;
}

// 2026 IRS standard mileage rate (estimated)
const STANDARD_MILEAGE_RATE = 0.67; // $0.67 per mile

/**
 * Mileage Deduction Calculator
 *
 * Standard Mileage Rate: miles × $0.67
 * Actual Expenses: (gas + insurance + repairs + depreciation) × business use %
 */
export function calculateMileageDeduction(input: MileageInput): MileageOutput {
  const {
    annualMiles,
    actualGasExpense,
    actualInsurance,
    actualRepairs,
    actualDepreciation,
    businessUsePercentage,
  } = input;

  // Standard mileage rate
  const standardDeduction = Math.round(annualMiles * STANDARD_MILEAGE_RATE * 100) / 100;

  // Actual expenses
  const totalActualExpenses =
    actualGasExpense + actualInsurance + actualRepairs + actualDepreciation;
  const businessRatio = businessUsePercentage / 100;
  const actualDeduction = Math.round(totalActualExpenses * businessRatio * 100) / 100;

  const recommendedMethod = actualDeduction > standardDeduction ? "actual" : "standard";
  const actualAdvantage = Math.round((actualDeduction - standardDeduction) * 100) / 100;

  return {
    standardDeduction,
    actualDeduction,
    totalActualExpenses,
    recommendedMethod,
    actualAdvantage,
    standardRate: STANDARD_MILEAGE_RATE,
  };
}

export interface HomeOfficeInput {
  /** Total home square footage */
  totalHomeSqft: number;
  /** Office/workspace square footage */
  officeSqft: number;
  /** Annual rent or mortgage interest */
  annualRentOrMortgage: number;
  /** Annual utilities (electricity, water, internet, etc.) */
  annualUtilities: number;
  /** Annual home insurance */
  annualInsurance: number;
  /** Annual repairs/maintenance */
  annualRepairs: number;
}

export interface HomeOfficeOutput {
  /** Simplified method deduction ($5/sqft, max 300 sqft) */
  simplifiedDeduction: number;
  /** Regular method deduction (actual expenses × business %) */
  regularDeduction: number;
  /** Business use percentage */
  businessUsePercentage: number;
  /** Total home expenses (for regular method) */
  totalHomeExpenses: number;
  /** Recommended method */
  recommendedMethod: "simplified" | "regular";
  /** Additional deduction from regular method vs simplified */
  regularAdvantage: number;
}

const SIMPLIFIED_RATE = 5; // $5 per sqft
const SIMPLIFIED_MAX_SQFT = 300;

/**
 * Home Office Deduction Calculator
 *
 * Simplified Method: $5 × office sqft (max 300 sqft = $1,500)
 * Regular Method: actual expenses × (office sqft / total home sqft)
 */
export function calculateHomeOfficeDeduction(input: HomeOfficeInput): HomeOfficeOutput {
  const {
    totalHomeSqft,
    officeSqft,
    annualRentOrMortgage,
    annualUtilities,
    annualInsurance,
    annualRepairs,
  } = input;

  // Simplified method
  const qualifiedSqft = Math.min(officeSqft, SIMPLIFIED_MAX_SQFT);
  const simplifiedDeduction = qualifiedSqft * SIMPLIFIED_RATE;

  // Regular method
  const businessUsePercentage = totalHomeSqft > 0
    ? Math.round((officeSqft / totalHomeSqft) * 10000) / 100
    : 0;
  const businessUseRatio = totalHomeSqft > 0 ? officeSqft / totalHomeSqft : 0;

  const totalHomeExpenses =
    annualRentOrMortgage + annualUtilities + annualInsurance + annualRepairs;
  const regularDeduction = Math.round(totalHomeExpenses * businessUseRatio);

  const recommendedMethod = regularDeduction > simplifiedDeduction ? "regular" : "simplified";
  const regularAdvantage = regularDeduction - simplifiedDeduction;

  return {
    simplifiedDeduction,
    regularDeduction,
    businessUsePercentage,
    totalHomeExpenses,
    recommendedMethod,
    regularAdvantage,
  };
}

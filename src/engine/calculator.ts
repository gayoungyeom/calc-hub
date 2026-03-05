import type { TaxBracket } from "./types";

/**
 * 누진세 계산 (공통)
 * 과세표준에 대해 bracket별 세율을 적용하여 산출세액을 반환한다.
 */
export function calculateProgressiveTax(
  taxableIncome: number,
  brackets: TaxBracket[]
): number {
  if (taxableIncome <= 0) return 0;

  let tax = 0;

  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break;

    const upper = bracket.max !== null ? bracket.max : Infinity;
    const taxableInBracket = Math.min(taxableIncome, upper) - bracket.min;
    tax += taxableInBracket * bracket.rate;
  }

  return Math.round(tax);
}

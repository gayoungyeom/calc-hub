import type { UsFilingStatus, UsTaxConfig } from "../types";
import { calculateProgressiveTax } from "../calculator";

export interface W2vs1099Input {
  /** Annual income */
  annualIncome: number;
  /** Filing status */
  filingStatus: UsFilingStatus;
  /** State code */
  state: string;
  /** Business expenses (1099 only) */
  businessExpenses: number;
}

export interface W2TaxBreakdown {
  /** Gross income */
  grossIncome: number;
  /** FICA (employee portion: 7.65%) */
  ficaTax: number;
  /** Federal income tax */
  federalTax: number;
  /** State income tax */
  stateTax: number;
  /** Total tax */
  totalTax: number;
  /** Net income (after all taxes) */
  netIncome: number;
  /** Effective tax rate */
  effectiveRate: number;
}

export interface Self1099TaxBreakdown {
  /** Gross income */
  grossIncome: number;
  /** Business expenses */
  businessExpenses: number;
  /** Net business income */
  netBusinessIncome: number;
  /** Self-employment tax (15.3%) */
  selfEmploymentTax: number;
  /** SE tax deduction (50% of SE tax) */
  seTaxDeduction: number;
  /** Federal income tax */
  federalTax: number;
  /** State income tax */
  stateTax: number;
  /** Total tax */
  totalTax: number;
  /** Net income (after all taxes) */
  netIncome: number;
  /** Effective tax rate */
  effectiveRate: number;
  /** Quarterly estimated payment */
  quarterlyPayment: number;
}

export interface W2vs1099Output {
  w2: W2TaxBreakdown;
  self1099: Self1099TaxBreakdown;
  /** Difference: 1099 total tax - W-2 total tax */
  taxDifference: number;
  /** Difference: 1099 net income - W-2 net income */
  netIncomeDifference: number;
}

const FICA_RATE = 0.0765; // Employee portion: SS 6.2% + Medicare 1.45%
const SE_TAX_RATE = 0.153;
const SE_TAX_BASE_RATE = 0.9235;

export function calculateW2vs1099(
  input: W2vs1099Input,
  config: UsTaxConfig
): W2vs1099Output {
  const { annualIncome, filingStatus, state, businessExpenses } = input;
  const { rules, states } = config;

  // === W-2 Calculation ===
  const w2FicaTax = Math.round(annualIncome * FICA_RATE);
  const w2Deduction = rules.standardDeduction[filingStatus];
  const w2TaxableIncome = Math.max(0, annualIncome - w2Deduction);
  const w2FederalTax = calculateProgressiveTax(w2TaxableIncome, rules.brackets[filingStatus]);
  const w2StateTax = calculateStateTax(annualIncome, state, states);
  const w2TotalTax = w2FicaTax + w2FederalTax + w2StateTax;
  const w2NetIncome = annualIncome - w2TotalTax;
  const w2EffectiveRate = annualIncome > 0
    ? Math.round((w2TotalTax / annualIncome) * 10000) / 100
    : 0;

  // === 1099 Calculation ===
  const netBusinessIncome = Math.max(0, annualIncome - businessExpenses);
  const seTaxBase = netBusinessIncome * SE_TAX_BASE_RATE;
  const selfEmploymentTax = Math.round(seTaxBase * SE_TAX_RATE);
  const seTaxDeduction = Math.round(selfEmploymentTax * 0.5);
  const agi1099 = netBusinessIncome - seTaxDeduction;
  const deduction1099 = rules.standardDeduction[filingStatus];
  const taxableIncome1099 = Math.max(0, agi1099 - deduction1099);
  const federalTax1099 = calculateProgressiveTax(taxableIncome1099, rules.brackets[filingStatus]);
  const stateTax1099 = calculateStateTax(netBusinessIncome, state, states);
  const totalTax1099 = selfEmploymentTax + federalTax1099 + stateTax1099;
  const netIncome1099 = netBusinessIncome - totalTax1099;
  const effectiveRate1099 = netBusinessIncome > 0
    ? Math.round((totalTax1099 / netBusinessIncome) * 10000) / 100
    : 0;
  const quarterlyPayment = Math.round(totalTax1099 / 4);

  const w2: W2TaxBreakdown = {
    grossIncome: annualIncome,
    ficaTax: w2FicaTax,
    federalTax: w2FederalTax,
    stateTax: w2StateTax,
    totalTax: w2TotalTax,
    netIncome: w2NetIncome,
    effectiveRate: w2EffectiveRate,
  };

  const self1099: Self1099TaxBreakdown = {
    grossIncome: annualIncome,
    businessExpenses,
    netBusinessIncome,
    selfEmploymentTax,
    seTaxDeduction,
    federalTax: federalTax1099,
    stateTax: stateTax1099,
    totalTax: totalTax1099,
    netIncome: netIncome1099,
    effectiveRate: effectiveRate1099,
    quarterlyPayment,
  };

  return {
    w2,
    self1099,
    taxDifference: totalTax1099 - w2TotalTax,
    netIncomeDifference: netIncome1099 - w2NetIncome,
  };
}

function calculateStateTax(
  income: number,
  stateCode: string,
  states: UsTaxConfig["states"]
): number {
  const stateConfig = states[stateCode];
  if (!stateConfig || stateConfig.noIncomeTax) return 0;
  const deduction = stateConfig.standardDeduction ?? 0;
  const taxableIncome = Math.max(0, income - deduction);
  return calculateProgressiveTax(taxableIncome, stateConfig.brackets);
}

// === Country Config 타입 ===

export interface TaxBracket {
  /** 구간 시작 금액 */
  min: number;
  /** 구간 종료 금액 (최고 구간은 null) */
  max: number | null;
  /** 세율 (0~1) */
  rate: number;
}

export interface KrTaxRules {
  /** 원천징수율 (3.3% = 0.033) */
  withholdingRate: number;
  /** 지방소득세율 (종합소득세의 10% = 0.1) */
  localTaxRate: number;
  /** 기본공제 금액 */
  personalDeduction: number;
  /** 종합소득세 과세 구간 */
  brackets: TaxBracket[];
}

export interface UsTaxRules {
  /** Self-Employment Tax 세율 (15.3% = 0.153) */
  selfEmploymentTax: number;
  /** Filing Status별 Standard Deduction */
  standardDeduction: Record<UsFilingStatus, number>;
  /** Federal 소득세 과세 구간 (Filing Status별) */
  brackets: Record<UsFilingStatus, TaxBracket[]>;
}

export interface UsStateTaxRules {
  /** 주 이름 */
  name: string;
  /** 소득세 없는 주 여부 */
  noIncomeTax: boolean;
  /** 주 소득세 과세 구간 (없으면 빈 배열) */
  brackets: TaxBracket[];
  /** 주별 Standard Deduction (있는 경우) */
  standardDeduction?: number;
}

export interface ConfigMeta {
  lastUpdated: string;
  sources: string[];
}

export interface KrTaxConfig {
  country: "KR";
  taxYear: number;
  currency: "KRW";
  rules: KrTaxRules;
  meta: ConfigMeta;
}

export interface UsTaxConfig {
  country: "US";
  taxYear: number;
  currency: "USD";
  rules: UsTaxRules;
  states: Record<string, UsStateTaxRules>;
  meta: ConfigMeta;
}

export type TaxConfig = KrTaxConfig | UsTaxConfig;

// === 계산기 입출력 타입 ===

export type UsFilingStatus = "single" | "married_jointly" | "head_of_household";

export interface KrCalculatorInput {
  /** 연간 총수입 (3.3% 원천징수 전) */
  grossIncome: number;
  /** 필요경비 */
  expenses: number;
  /** 부양가족 수 (본인 포함) */
  dependents: number;
  /** 국민연금 납부액 */
  nationalPension: number;
  /** 건강보험 납부액 */
  healthInsurance: number;
}

export interface KrCalculatorOutput {
  /** 종합소득금액 */
  totalIncome: number;
  /** 과세표준 */
  taxableIncome: number;
  /** 산출 세액 (종합소득세) */
  incomeTax: number;
  /** 지방소득세 */
  localTax: number;
  /** 기납부세액 (원천징수 3.3%) */
  prepaidTax: number;
  /** 환급(+) 또는 추가납부(-) 예상액 */
  refundOrDue: number;
  /** 유효세율 */
  effectiveRate: number;
}

export interface UsCalculatorInput {
  /** 연간 총수입 (1099) */
  grossIncome: number;
  /** 사업 경비 */
  expenses: number;
  /** Filing Status */
  filingStatus: UsFilingStatus;
  /** 주 코드 (CA, NY, TX 등) */
  state: string;
  /** 공제 방식 */
  deductionType: "standard" | "itemized";
  /** Itemized Deduction 금액 (deductionType이 itemized일 때) */
  itemizedDeduction?: number;
}

export interface UsCalculatorOutput {
  /** 순사업소득 (Gross - Expenses) */
  netBusinessIncome: number;
  /** Self-Employment Tax */
  selfEmploymentTax: number;
  /** SE Tax Deduction (SE Tax의 50%) */
  seTaxDeduction: number;
  /** Federal Income Tax */
  federalTax: number;
  /** State Income Tax */
  stateTax: number;
  /** Total Tax Liability */
  totalTax: number;
  /** Net Income (after all taxes) */
  netIncome: number;
  /** Effective Tax Rate */
  effectiveRate: number;
  /** 분기별 예상 납부액 */
  quarterlyPayment: number;
}

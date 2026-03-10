// === 부가가치세 입출력 타입 ===

export type VatTaxpayerType = "general" | "simplified" | "exempt";

export interface KrVatInput {
  /** 과세 유형 */
  taxpayerType: VatTaxpayerType;
  /** 매출액 (공급가액) */
  revenue: number;
  /** 매입액 (공급가액) */
  purchases: number;
  /** 신용카드 매출 비율 (0~100) — 간이과세자 세액공제용 */
  creditCardRatio: number;
}

export interface KrVatOutput {
  /** 매출세액 */
  outputTax: number;
  /** 매입세액 */
  inputTax: number;
  /** 납부세액 (일반과세자) 또는 간이 납부세액 */
  vatDue: number;
  /** 간이과세자 세액공제 (신용카드 발행 공제) */
  simplifiedCredit: number;
  /** 최종 납부세액 */
  finalVatDue: number;
  /** 부가세 포함 매출 총액 */
  totalRevenueWithVat: number;
  /** 부가세 포함 매입 총액 */
  totalPurchasesWithVat: number;
  /** 과세 유형 설명 */
  taxpayerTypeLabel: string;
}

const VAT_RATE = 0.1;

/** 간이과세자 업종별 부가가치율 (평균치 적용) */
const SIMPLIFIED_VALUE_ADDED_RATE = 0.3; // 소매업 등 평균

/** 간이과세자 신용카드 매출 세액공제율 */
const SIMPLIFIED_CREDIT_CARD_CREDIT_RATE = 0.026;

/**
 * KR 부가가치세 계산
 *
 * 일반과세자: 매출세액(10%) - 매입세액(10%) = 납부세액
 * 간이과세자: 매출액 × 업종별 부가가치율 × 10% - 매입세액 × 업종별 부가가치율
 * 면세사업자: 부가가치세 없음
 */
export function calculateKrVat(input: KrVatInput): KrVatOutput {
  const { taxpayerType, revenue, purchases, creditCardRatio } = input;

  if (taxpayerType === "exempt") {
    return {
      outputTax: 0,
      inputTax: 0,
      vatDue: 0,
      simplifiedCredit: 0,
      finalVatDue: 0,
      totalRevenueWithVat: revenue,
      totalPurchasesWithVat: purchases,
      taxpayerTypeLabel: "면세사업자",
    };
  }

  if (taxpayerType === "simplified") {
    // 간이과세자
    // 납부세액 = 매출액 × 업종별 부가가치율 × 10%
    const outputTax = Math.round(revenue * SIMPLIFIED_VALUE_ADDED_RATE * VAT_RATE);
    // 매입세액 공제 = 매입액 × 0.5%
    const inputTax = Math.round(purchases * 0.005);
    const vatDue = Math.max(0, outputTax - inputTax);

    // 신용카드 매출 세액공제
    const creditCardRevenue = Math.round(revenue * (creditCardRatio / 100));
    const simplifiedCredit = Math.min(
      Math.round(creditCardRevenue * SIMPLIFIED_CREDIT_CARD_CREDIT_RATE),
      vatDue,
      10000000 // 연간 한도 1,000만원
    );

    const finalVatDue = Math.max(0, vatDue - simplifiedCredit);

    return {
      outputTax,
      inputTax,
      vatDue,
      simplifiedCredit,
      finalVatDue,
      totalRevenueWithVat: revenue, // 간이과세자는 부가세 별도 표기 안 함
      totalPurchasesWithVat: purchases,
      taxpayerTypeLabel: "간이과세자",
    };
  }

  // 일반과세자
  const outputTax = Math.round(revenue * VAT_RATE);
  const inputTax = Math.round(purchases * VAT_RATE);
  const vatDue = Math.max(0, outputTax - inputTax);

  return {
    outputTax,
    inputTax,
    vatDue,
    simplifiedCredit: 0,
    finalVatDue: vatDue,
    totalRevenueWithVat: revenue + outputTax,
    totalPurchasesWithVat: purchases + inputTax,
    taxpayerTypeLabel: "일반과세자",
  };
}

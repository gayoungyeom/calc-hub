import type { Metadata } from "next";
import KrVatCalculator from "@/components/kr/vat/KrVatCalculator";
import AuthorityBlock from "@/components/authority/AuthorityBlock";
import RelatedLink from "@/components/common/RelatedLink";
import FaqSection from "@/components/common/FaqSection";
import FaqSchema from "@/components/common/FaqSchema";

const mainFaq = [
  {
    question: "부가가치세 신고는 언제 하나요?",
    answer: "일반과세자는 1기(1~6월분) 7월 25일까지, 2기(7~12월분) 다음 해 1월 25일까지 신고합니다. 간이과세자는 연 1회, 다음 해 1월 25일까지 신고합니다. 각 기 중간에 예정신고(4월, 10월)도 있습니다.",
  },
  {
    question: "일반과세자와 간이과세자의 차이는 무엇인가요?",
    answer: "일반과세자는 매출세액(10%)에서 매입세액을 공제하여 납부합니다. 간이과세자(연매출 8,000만원 미만)는 매출액에 업종별 부가가치율(15~40%)을 곱해 세금을 계산하여 세 부담이 낮습니다. 세금계산서 발행 의무도 다릅니다.",
  },
  {
    question: "매입세액 공제를 받으려면 어떻게 해야 하나요?",
    answer: "사업과 관련된 매입에 대해 적격 증빙(세금계산서, 신용카드 매출전표 등)을 수취해야 합니다. 접대비, 비영업용 소형 승용차 관련 비용 등은 매입세액 공제가 불가능합니다.",
  },
  {
    question: "면세사업자도 부가세 신고를 해야 하나요?",
    answer: "면세사업자는 부가가치세 신고 의무가 없습니다. 다만, 매년 2월 10일까지 사업장 현황 신고서를 제출해야 합니다. 의료업, 교육 서비스업, 금융·보험업 등이 면세 업종에 해당합니다.",
  },
  {
    question: "간이과세자에서 일반과세자로 전환되는 기준은?",
    answer: "직전 연도 매출이 8,000만원 이상이면 다음 해 7월 1일부터 일반과세자로 전환됩니다. 전환 시 세금계산서 발행 의무가 생기고, 매입세액 전액 공제가 가능해집니다.",
  },
];

export const metadata: Metadata = {
  title: "부가가치세 계산기 2026 — CalcHub",
  description:
    "일반과세자·간이과세자 부가가치세 계산기. 매출세액, 매입세액 공제, 납부세액을 간편하게 계산하세요. 2026년 기준.",
  keywords: [
    "부가가치세 계산기",
    "부가세 계산기",
    "일반과세자 부가세",
    "간이과세자 부가세",
    "매출세액 매입세액",
    "VAT 계산기",
  ],
  alternates: {
    languages: {
      ko: "/kr/vat-calculator",
      en: "/us/1099-tax-calculator",
      "x-default": "/",
    },
  },
};

export default function KrVatCalculatorPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          부가가치세 계산기
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          일반과세자·간이과세자를 위한 부가가치세 간편 계산기입니다.
          매출·매입액을 입력하고 납부할 부가세를 확인하세요.
        </p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">2026년 세법 기준</p>
      </div>

      <KrVatCalculator />

      {/* 관련 계산기 */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          관련 세금 계산기
        </h2>
        <ul className="mt-4 space-y-2">
          <li>
            <RelatedLink
              href="/kr/freelancer-tax-calculator"
              label="프리랜서 종합소득세 계산기"
              from="vat-calculator"
            />
          </li>
          <li>
            <RelatedLink
              href="/kr/earned-income-tax-calculator"
              label="근로소득세 계산기"
              from="vat-calculator"
            />
          </li>
          <li>
            <RelatedLink
              href="/kr/severance-calculator"
              label="퇴직금 계산기"
              from="vat-calculator"
            />
          </li>
        </ul>
      </section>

      <FaqSection title="자주 묻는 질문" items={mainFaq} />
      <FaqSchema items={mainFaq} />

      <AuthorityBlock
        taxYear={2026}
        lastUpdated="2026-01-10"
        sources={[
          {
            label: "국세청 부가가치세 안내",
            url: "https://www.nts.go.kr",
          },
          {
            label: "부가가치세법 제29조~제37조",
            url: "https://www.law.go.kr",
          },
        ]}
        calculationMethod="일반: 매출세액(10%) - 매입세액(10%) = 납부세액 | 간이: 매출 × 부가가치율 × 10% - 매입공제"
      />
    </main>
  );
}

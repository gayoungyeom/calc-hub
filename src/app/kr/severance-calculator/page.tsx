import type { Metadata } from "next";
import KrSeveranceCalculator from "@/components/kr/severance/KrSeveranceCalculator";
import AuthorityBlock from "@/components/authority/AuthorityBlock";
import RelatedLink from "@/components/common/RelatedLink";
import FaqSection from "@/components/common/FaqSection";
import FaqSchema from "@/components/common/FaqSchema";

const mainFaq = [
  {
    question: "퇴직금은 언제부터 받을 수 있나요?",
    answer: "근로기준법상 계속 근로기간이 1년 이상인 근로자가 퇴직할 때 퇴직금을 받을 수 있습니다. 1년 미만 근무 시에는 법정 퇴직금 수급 대상이 아닙니다. 퇴직일로부터 14일 이내에 지급되어야 합니다.",
  },
  {
    question: "퇴직금 계산에 포함되는 임금 항목은?",
    answer: "기본급, 상여금(정기적·일률적 지급분), 연차수당, 직무수당, 고정 잔업수당 등 근로의 대가로 정기적·일률적으로 지급되는 모든 금품이 포함됩니다. 실비변상적 수당(출장비, 교통비)은 제외됩니다.",
  },
  {
    question: "퇴직금과 퇴직연금(DC/DB)의 차이는?",
    answer: "법정 퇴직금은 퇴직 시 일시금으로 받습니다. DB형 퇴직연금은 퇴직 시 급여가 확정(최종 3개월 평균임금 기준)되며, DC형은 매년 연봉의 1/12 이상을 적립하여 운용 수익에 따라 수령액이 달라집니다.",
  },
  {
    question: "퇴직금에 세금이 부과되나요?",
    answer: "네, 퇴직소득세가 부과됩니다. 다만 근속연수 공제, 환산급여 공제 등으로 일반 소득세보다 세 부담이 낮습니다. 퇴직금을 IRP(개인형 퇴직연금)로 이체하면 퇴직소득세가 이연(30~40% 감면)됩니다.",
  },
  {
    question: "중간정산 퇴직금도 계산할 수 있나요?",
    answer: "네, 이 계산기로 중간정산 퇴직금도 계산할 수 있습니다. 입사일~중간정산일을 입력하면 됩니다. 중간정산은 무주택 주택 구입, 6개월 이상 요양 등 법정 사유에 해당할 때만 가능합니다.",
  },
];

export const metadata: Metadata = {
  title: "퇴직금 계산기 2026 — 예상 퇴직금·퇴직소득세 즉시 확인 | CalcHub",
  description:
    "2026년 퇴직금 자동 계산기. 입사일·퇴사일·월급 입력만으로 예상 퇴직금, 퇴직소득세, 세후 실수령액을 무료로 확인하세요. 근속연수별 퇴직금 비교.",
  keywords: [
    "퇴직금 계산기",
    "퇴직금 계산 방법",
    "퇴직금 세금",
    "퇴직소득세 계산",
    "평균임금 계산",
    "퇴직연금 계산",
  ],
  alternates: {
    languages: {
      ko: "/kr/severance-calculator",
      en: "/us/1099-tax-calculator",
      "x-default": "/",
    },
  },
};

export default function KrSeveranceCalculatorPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          퇴직금 계산기
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          입사일, 퇴사일, 월급을 입력하면 예상 퇴직금을 자동으로 계산합니다.
          퇴직소득세와 세후 수령액도 함께 확인하세요.
        </p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">근로기준법 기준</p>
      </div>

      <KrSeveranceCalculator />

      {/* 관련 계산기 */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          관련 세금 계산기
        </h2>
        <ul className="mt-4 space-y-2">
          <li>
            <RelatedLink
              href="/kr/earned-income-tax-calculator"
              label="근로소득세 계산기"
              from="severance-calculator"
            />
          </li>
          <li>
            <RelatedLink
              href="/kr/freelancer-tax-calculator"
              label="프리랜서 종합소득세 계산기"
              from="severance-calculator"
            />
          </li>
          <li>
            <RelatedLink
              href="/kr/vat-calculator"
              label="부가가치세 계산기"
              from="severance-calculator"
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
            label: "근로기준법 제34조 (퇴직급여)",
            url: "https://www.law.go.kr",
          },
          {
            label: "고용노동부 퇴직금 계산 안내",
            url: "https://www.moel.go.kr",
          },
        ]}
        calculationMethod="1일 평균임금 × 30일 × (재직일수 ÷ 365일)"
      />
    </main>
  );
}

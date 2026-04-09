import type { Metadata } from "next";
import KrEarnedIncomeCalculator from "@/components/kr/earned-income/KrEarnedIncomeCalculator";
import AuthorityBlock from "@/components/authority/AuthorityBlock";
import RelatedLink from "@/components/common/RelatedLink";
import FaqSection from "@/components/common/FaqSection";
import FaqSchema from "@/components/common/FaqSchema";

const mainFaq = [
  {
    question: "근로소득세와 종합소득세의 차이는 무엇인가요?",
    answer: "근로소득세는 직장에서 받는 급여에 대한 세금으로 매월 원천징수됩니다. 종합소득세는 프리랜서·사업자 등의 소득에 대한 세금으로 매년 5월에 신고합니다. 직장인은 연말정산으로 세금을 정산하고, 프리랜서는 종합소득세 신고를 합니다.",
  },
  {
    question: "연말정산은 언제 하나요?",
    answer: "연말정산은 매년 1월~2월에 진행됩니다. 회사에서 전년도 소득과 공제 내역을 정리하여 세금을 재계산하며, 원천징수한 세금이 결정세액보다 많으면 환급받고, 적으면 추가 납부합니다.",
  },
  {
    question: "근로소득공제란 무엇인가요?",
    answer: "근로소득공제는 총급여에서 자동으로 차감되는 공제입니다. 총급여 구간에 따라 70%~2%의 비율이 적용되며, 별도 신청 없이 자동 계산됩니다. 소득세법 제47조에 규정되어 있습니다.",
  },
  {
    question: "비과세 소득에는 어떤 것들이 있나요?",
    answer: "대표적인 비과세 소득으로는 식대(월 20만원 한도), 자가운전보조금(월 20만원), 출산·보육수당(월 10만원), 야간근로수당(생산직, 연 240만원 한도) 등이 있습니다. 비과세 소득은 과세 대상에서 제외됩니다.",
  },
  {
    question: "연봉이 같아도 세금이 다른 이유는 무엇인가요?",
    answer: "부양가족 수, 20세 이하 자녀 수, 비과세 소득 규모, 4대보험 납부액, 연말정산 시 추가 공제(신용카드, 의료비 등)에 따라 세금이 달라집니다. 이 계산기는 기본 공제를 기준으로 예상 세금을 계산합니다.",
  },
];

export const metadata: Metadata = {
  title: "근로소득세 계산기 2026 — 연봉 실수령액·세금 즉시 확인 | CalcHub",
  description:
    "직장인을 위한 2026년 근로소득세 계산기. 연봉별 실수령액, 월 원천징수액, 4대보험료, 유효세율을 무료로 확인하세요. 연봉 3,000만~1억 구간별 세금 비교.",
  keywords: [
    "근로소득세 계산기",
    "연봉 실수령액 계산기",
    "연봉 세금 계산",
    "직장인 세금 계산기",
    "연말정산 계산기",
    "월급 실수령액",
  ],
  alternates: {
    languages: {
      ko: "/kr/earned-income-tax-calculator",
      en: "/us/1099-tax-calculator",
      "x-default": "/",
    },
  },
};

export default function KrEarnedIncomeTaxCalculatorPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          근로소득세 계산기
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          직장인을 위한 연봉별 근로소득세 간편 계산기입니다.
          실수령액, 월 원천징수액, 세액공제를 한눈에 확인하세요.
        </p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">2026년 세법 기준</p>
      </div>

      <KrEarnedIncomeCalculator />

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
              from="earned-income-tax-calculator"
            />
          </li>
          <li>
            <RelatedLink
              href="/kr/vat-calculator"
              label="부가가치세 계산기"
              from="earned-income-tax-calculator"
            />
          </li>
          <li>
            <RelatedLink
              href="/kr/severance-calculator"
              label="퇴직금 계산기"
              from="earned-income-tax-calculator"
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
            label: "국세청 근로소득세 안내",
            url: "https://www.nts.go.kr",
          },
          {
            label: "소득세법 제47조 (근로소득공제)",
            url: "https://www.law.go.kr",
          },
          {
            label: "소득세법 제59조 (근로소득세액공제)",
            url: "https://www.law.go.kr",
          },
        ]}
        calculationMethod="총급여 → 근로소득공제 → 소득공제 → 과세표준 × 누진세율 → 산출세액 → 세액공제 → 결정세액"
      />
    </main>
  );
}

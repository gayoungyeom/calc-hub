import type { Metadata } from "next";
import KrCalculator from "@/components/kr/KrCalculator";
import AuthorityBlock from "@/components/authority/AuthorityBlock";
import RelatedLink from "@/components/common/RelatedLink";
import FaqSection from "@/components/common/FaqSection";
import FaqSchema from "@/components/common/FaqSchema";
import krPages from "@/config/longtail/kr-pages.json";

const mainFaq = [
  {
    question: "프리랜서 종합소득세 신고는 언제 하나요?",
    answer: "매년 5월 1일부터 5월 31일까지 전년도 소득에 대한 종합소득세를 신고·납부합니다. 성실신고확인 대상자(수입 7,500만 원 초과)는 6월 30일까지 연장됩니다.",
  },
  {
    question: "3.3% 원천징수란 무엇인가요?",
    answer: "프리랜서에게 대가를 지급할 때 소득세 3%와 지방소득세 0.3%를 합한 3.3%를 미리 떼고 지급하는 제도입니다. 이는 중간 예납 성격이며, 종합소득세 신고 시 기납부세액으로 공제됩니다.",
  },
  {
    question: "종합소득세 신고를 안 하면 어떻게 되나요?",
    answer: "무신고 시 납부할 세액의 20%(부정 무신고 시 40%)의 가산세가 부과됩니다. 또한 3.3% 원천징수로 이미 납부한 세금에 대한 환급도 받을 수 없습니다. 기한 후 신고도 가능하지만, 가산세가 줄어들 뿐 면제되지는 않습니다.",
  },
  {
    question: "프리랜서도 연말정산을 하나요?",
    answer: "아니요. 연말정산은 근로소득자(직장인)만 해당됩니다. 프리랜서는 사업소득자로 매년 5월에 종합소득세 신고를 직접 해야 합니다. 직장과 프리랜서를 병행하는 경우, 연말정산 후 5월에 사업소득을 합산하여 종합소득세를 신고합니다.",
  },
  {
    question: "세금 환급은 언제 받나요?",
    answer: "5월에 종합소득세 신고를 완료하면 보통 6월 말~7월 중에 신고한 계좌로 환급금이 입금됩니다. 기한 후 신고의 경우 신고일로부터 약 2개월 내에 환급됩니다.",
  },
];

export const metadata: Metadata = {
  title: "프리랜서 종합소득세 계산기 2026 — 3.3% 환급액 즉시 확인 | CalcHub",
  description:
    "프리랜서·N잡러를 위한 2026년 종합소득세 계산기. 3.3% 원천징수 환급 예상액, 유효세율, 직군별 경비처리 방법, 절세 팁까지 무료로 확인하세요.",
  keywords: [
    "프리랜서 종합소득세 계산기",
    "3.3% 세금 환급 계산기",
    "N잡 세금 계산",
    "프리랜서 실수령액 계산",
    "종합소득세 환급",
  ],
  alternates: {
    languages: {
      ko: "/kr/freelancer-tax-calculator",
      en: "/us/1099-tax-calculator",
      "x-default": "/",
    },
  },
};

export default function KrFreelancerTaxCalculatorPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          프리랜서 종합소득세 계산기
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          3.3% 원천징수 기반 프리랜서·N잡러를 위한 종합소득세 간편 계산기입니다.
          예상 환급액과 절세 팁을 확인하세요.
        </p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">2026년 세법 기준</p>
      </div>

      <KrCalculator />

      {/* 관련 계산기 */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          관련 세금 계산기
        </h2>
        <ul className="mt-4 space-y-2">
          <li>
            <RelatedLink href="/kr/earned-income-tax-calculator" label="근로소득세 계산기" from="freelancer-tax-calculator" />
          </li>
          <li>
            <RelatedLink href="/kr/vat-calculator" label="부가가치세 계산기" from="freelancer-tax-calculator" />
          </li>
          <li>
            <RelatedLink href="/kr/severance-calculator" label="퇴직금 계산기" from="freelancer-tax-calculator" />
          </li>
          {krPages.slice(0, 4).map((p) => (
            <li key={p.slug}>
              <RelatedLink
                href={`/kr/${p.slug}`}
                label={p.h1}
                from="freelancer-tax-calculator"
              />
            </li>
          ))}
        </ul>
      </section>

      <FaqSection title="자주 묻는 질문" items={mainFaq} />
      <FaqSchema items={mainFaq} />

      <AuthorityBlock
        taxYear={2026}
        lastUpdated="2026-01-10"
        sources={[
          {
            label: "국세청 종합소득세 세율표",
            url: "https://www.nts.go.kr",
          },
          {
            label: "소득세법 제55조 (세율)",
            url: "https://www.law.go.kr",
          },
        ]}
        calculationMethod="총수입 → 필요경비 차감 → 소득공제 → 과세표준 × 누진세율 → 산출세액 → 기납부세액 차감"
      />
    </main>
  );
}

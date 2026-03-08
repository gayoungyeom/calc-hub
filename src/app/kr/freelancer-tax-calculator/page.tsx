import type { Metadata } from "next";
import KrCalculator from "@/components/kr/KrCalculator";
import AuthorityBlock from "@/components/authority/AuthorityBlock";

export const metadata: Metadata = {
  title: "프리랜서 종합소득세 계산기 2026 — CalcHub",
  description:
    "3.3% 원천징수 프리랜서를 위한 종합소득세 간편 계산기. 환급 예상액, 유효세율, 절세 팁까지 5초 만에 확인하세요.",
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
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          프리랜서 종합소득세 계산기
        </h1>
        <p className="mt-2 text-gray-600">
          3.3% 원천징수 기반 프리랜서·N잡러를 위한 종합소득세 간편 계산기입니다.
          예상 환급액과 절세 팁을 확인하세요.
        </p>
        <p className="mt-1 text-sm text-gray-400">2026년 세법 기준</p>
      </div>

      <KrCalculator />

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

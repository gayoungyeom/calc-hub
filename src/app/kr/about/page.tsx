import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개 — CalcHub",
  description:
    "CalcHub은 프리랜서, 직장인, 사업자를 위한 무료 세금 계산기 플랫폼입니다. 공식 세법 기반의 정확한 계산과 투명한 데이터 출처를 제공합니다.",
};

export default function KrAboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        CalcHub 소개
      </h1>

      <div className="mt-8 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          CalcHub은 프리랜서, 직장인, 사업자들이 복잡한 세금 계산을 간편하게 할
          수 있도록 만들어진 무료 세금 계산기 플랫폼입니다.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8">
          우리의 목표
        </h2>
        <p>
          세금 계산은 복잡하고, 홈택스나 IRS 도구는 직관적이지 않습니다. CalcHub은
          정확한 계산 결과뿐 아니라, 절세 팁과 인사이트까지 함께 제공하여
          사용자가 더 나은 재무 결정을 내릴 수 있도록 돕습니다.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8">
          전문성과 신뢰성
        </h2>
        <p>
          CalcHub 팀은 한국과 미국의 세법을 지속적으로 연구하고, 각국 공식 세법
          문서를 직접 분석하여 계산 엔진을 개발합니다. 모든 계산 로직은 공개된
          세법 조문과 공식 가이드라인에 근거하며, 세법 개정 시 신속하게
          반영합니다.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8">
          계산의 정확성
        </h2>
        <p>
          모든 계산은 각국의 공식 세법을 기반으로 합니다. 한국은 국세청
          종합소득세 세율표와 소득세법을, 미국은 IRS Publication 334와 Schedule SE를
          참조합니다. 세법 변경 시 신속하게 업데이트합니다.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8">
          데이터 출처
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>
            <strong>한국:</strong> 국세청 종합소득세 세율표 (2026년), 소득세법 시행령, 국민건강보험법
          </li>
          <li>
            <strong>미국:</strong> IRS Revenue Procedure 2025-11, IRS Publication 334, Schedule SE, State Tax Agency 공식 자료
          </li>
          <li>
            모든 Config 데이터는{" "}
            <a
              href="https://github.com/gayoungyeom/calc-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              GitHub 저장소
            </a>
            에서 투명하게 확인할 수 있습니다.
          </li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8">
          면책 사항
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          CalcHub에서 제공하는 모든 계산 결과는 참고용이며, 법적 효력이 없습니다.
          정확한 세금 신고 및 납부는 반드시 공인 세무사 또는 회계사와 상담하시기
          바랍니다. CalcHub은 계산 결과의 오류로 인한 어떠한 손해에도 책임을 지지
          않습니다.
        </p>
      </div>
    </main>
  );
}

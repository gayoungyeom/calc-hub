import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 — CalcHub",
  description:
    "CalcHub 개인정보처리방침. 수집하는 정보, 쿠키 사용, 광고 데이터 처리에 대해 안내합니다.",
};

export default function KrPrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        개인정보처리방침
      </h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        최종 수정일: 2026년 3월 7일
      </p>

      <div className="mt-8 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            1. 개요
          </h2>
          <p className="mt-2">
            CalcHub(&quot;당사&quot;)는 calchubs.org 웹사이트를 운영합니다. 본
            페이지는 서비스 이용 시 정보의 수집, 사용 및 공개에 관한 정책을
            안내합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            2. 수집하는 정보
          </h2>
          <p className="mt-2">
            CalcHub은 회원가입이나 로그인을 요구하지 않습니다. 이름, 이메일 주소,
            전화번호 등의 개인 식별 정보를 수집하지 않습니다.
          </p>
          <p className="mt-2">
            모든 세금 계산은 사용자의 브라우저에서 수행됩니다. 소득 데이터 및 계산
            입력값은 당사 서버로 전송되거나 저장되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            3. 분석 도구 (Google Analytics 4)
          </h2>
          <p className="mt-2">
            당사는 방문자의 웹사이트 이용 방식을 파악하기 위해 Google Analytics
            4(GA4)를 사용합니다. GA4는 다음 정보를 자동으로 수집할 수 있습니다:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>방문한 페이지 및 각 페이지 체류 시간</li>
            <li>유입 웹사이트 또는 검색어</li>
            <li>브라우저 종류, 운영체제, 기기 유형</li>
            <li>대략적인 지리적 위치 (국가/도시 수준)</li>
            <li>상호작용 이벤트 (버튼 클릭, 계산기 사용 등)</li>
          </ul>
          <p className="mt-2">
            이 데이터는 집계 및 익명화됩니다. 개별 사용자를 식별하는 데
            사용하지 않습니다. 자세한 내용은{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-dark-blue"
            >
              Google 개인정보처리방침
            </a>
            을 참조하세요.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            4. 광고 (Google AdSense)
          </h2>
          <p className="mt-2">
            당사는 Google AdSense를 통해 웹사이트에 광고를 게재할 수 있습니다.
            Google AdSense는 쿠키 및 유사 기술을 사용하여 사용자의 이전 방문
            기록을 기반으로 광고를 제공합니다.
          </p>
          <p className="mt-2">
            맞춤 광고를 원하지 않으시면{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-dark-blue"
            >
              Google 광고 설정
            </a>
            에서 설정을 변경하거나,{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-dark-blue"
            >
              aboutads.info
            </a>
            에서 제3자 쿠키를 거부할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            5. 쿠키
          </h2>
          <p className="mt-2">
            쿠키는 기기에 저장되는 소규모 데이터 파일입니다. 당사는 위에 설명된
            제3자 서비스(Google Analytics, Google AdSense)를 통해 쿠키를
            사용합니다. CalcHub 자체적으로 자사 쿠키를 설정하지 않습니다.
          </p>
          <p className="mt-2">
            브라우저에서 모든 쿠키를 거부하거나, 쿠키 전송 시 알림을 받도록 설정할
            수 있습니다. 다만 쿠키 없이는 일부 서비스 기능이 정상적으로 동작하지
            않을 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            6. 외부 링크
          </h2>
          <p className="mt-2">
            당사 웹사이트에는 참고 목적으로 외부 사이트(예: IRS.gov,
            국세청)로의 링크가 포함될 수 있습니다. 외부 사이트의 개인정보 보호
            관행에 대해서는 당사가 책임지지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            7. 아동의 개인정보
          </h2>
          <p className="mt-2">
            당사 서비스는 만 13세 미만의 아동을 대상으로 하지 않습니다. 만 13세
            미만 아동의 개인 식별 정보를 의도적으로 수집하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            8. 방침 변경
          </h2>
          <p className="mt-2">
            본 개인정보처리방침은 수시로 업데이트될 수 있습니다. 변경 사항은 이
            페이지에 수정된 &quot;최종 수정일&quot;과 함께 게시됩니다. 변경 후
            웹사이트를 계속 사용하면 수정된 방침에 동의한 것으로 간주됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            9. 문의
          </h2>
          <p className="mt-2">
            본 개인정보처리방침에 대한 문의 사항은{" "}
            <a
              href="https://github.com/gayoungyeom/calc-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-dark-blue"
            >
              GitHub 저장소
            </a>
            를 통해 연락해 주세요.
          </p>
        </section>
      </div>
    </main>
  );
}

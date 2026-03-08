import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 — CalcHub',
  description:
    'CalcHub 이용약관. 서비스 이용 조건, 면책 사항, 지적재산권에 대해 안내합니다.',
};

export default function KrTermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        이용약관
      </h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        최종 수정일: 2026년 3월 8일
      </p>

      <div className="mt-8 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            1. 약관의 동의
          </h2>
          <p className="mt-2">
            CalcHub(calchubs.org)에 접속하고 이용함으로써, 귀하는 본 이용약관에
            동의하는 것으로 간주됩니다. 본 약관에 동의하지 않으시면 웹사이트를
            이용하지 마시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            2. 서비스 설명
          </h2>
          <p className="mt-2">
            CalcHub은 프리랜서 및 자영업자를 위한 무료 온라인 세금 계산기를
            제공합니다. 한국 종합소득세 및 미국 1099 자영업 세금 계산을
            지원합니다. 모든 계산은 브라우저에서 수행되며, 정보 제공 및 교육
            목적으로만 사용됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            3. 정확성에 대한 면책
          </h2>
          <p className="mt-2">
            당사는 공식 세법 및 규정에 기반하여 세금 계산의 정확성을 보장하기
            위해 노력하지만, 계산 결과의 정확성, 완전성 또는 적시성을 보장하지
            않습니다.
          </p>
          <p className="mt-2">
            세법은 자주 변경되며, 개인의 상황은 다양합니다. 본 계산기의 결과는
            세무 자문, 법률 자문 또는 공인 세무 전문가와의 상담을 대체할 수
            없습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            4. 책임의 제한
          </h2>
          <p className="mt-2">
            CalcHub, 그 운영자 및 기여자는 서비스의 사용 또는 사용 불능으로 인해
            발생하는 직접적, 간접적, 우발적 또는 결과적 손해에 대해 책임을 지지
            않습니다. 이는 계산 결과에 대한 의존으로 인한 재정적 손실을
            포함합니다.
          </p>
          <p className="mt-2">
            귀하는 CalcHub을 본인의 책임 하에 사용하며, 세금 신고 결정에 대해
            전적으로 책임을 지는 것에 동의합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            5. 지적재산권
          </h2>
          <p className="mt-2">
            CalcHub의 모든 콘텐츠(텍스트, 디자인, 로고, 코드 포함)는 CalcHub의
            자산이며, 관련 지적재산권법의 보호를 받습니다. 사전 서면 동의 없이
            복제, 배포 또는 2차 저작물을 제작할 수 없습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            6. 제3자 서비스
          </h2>
          <p className="mt-2">
            CalcHub은 웹사이트 분석을 위한 Google Analytics와 광고를 위한 Google
            AdSense를 포함한 제3자 서비스를 사용합니다. 웹사이트 이용 시 해당
            제3자 서비스의 약관 및 개인정보처리방침도 적용됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            7. 약관 변경
          </h2>
          <p className="mt-2">
            당사는 언제든지 본 이용약관을 변경할 수 있습니다. 변경 사항은 이
            페이지에 수정된 날짜와 함께 게시됩니다. 변경 후 웹사이트를 계속
            사용하면 수정된 약관에 동의한 것으로 간주됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            8. 문의
          </h2>
          <p className="mt-2">
            본 이용약관에 대한 문의 사항은{' '}
            <a
              href="mailto: gayoungyeom@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-dark-blue"
            >
              gayoungyeom@gmail.com
            </a>
            을 통해 연락해 주세요.
          </p>
        </section>
      </div>
    </main>
  );
}

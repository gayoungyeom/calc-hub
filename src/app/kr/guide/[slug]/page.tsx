import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import AuthorityBlock from "@/components/authority/AuthorityBlock";
import FaqSection from "@/components/common/FaqSection";
import FaqSchema from "@/components/common/FaqSchema";
import guidePages from "@/config/longtail/kr-guide-pages.json";

interface GuideSection {
  heading: string;
  content: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface GuidePage {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  calculatorLink: string;
  calculatorLabel: string;
  sections: GuideSection[];
  faq: FaqItem[];
}

const pages = guidePages as GuidePage[];

export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = pages.find((p) => p.slug === slug);
    if (!page) return {};
    return {
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      alternates: {
        languages: {
          ko: `/kr/guide/${slug}`,
          en: "/us",
          "x-default": "/",
        },
      },
    };
  });
}

export default async function KrGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages.find((p) => p.slug === slug);
  if (!page) notFound();

  const otherGuides = pages.filter((p) => p.slug !== slug);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          {page.h1}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {page.description}
        </p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
          2026년 세법 기준 · 마지막 업데이트 2026-04-10
        </p>
      </div>

      {/* 계산기 CTA 배너 */}
      <div className="mb-10 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
        <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
          내 세금이 궁금하신가요?
        </p>
        <Link
          href={page.calculatorLink}
          className="mt-1 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          → {page.calculatorLabel}
        </Link>
      </div>

      {/* 본문 섹션 */}
      <article className="space-y-10">
        {page.sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {section.heading}
            </h2>
            <div className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {section.content}
            </div>
          </section>
        ))}
      </article>

      {/* 하단 계산기 CTA */}
      <div className="mt-12 rounded-lg border border-green-200 bg-green-50 p-5 text-center dark:border-green-800 dark:bg-green-900/20">
        <p className="text-base font-semibold text-green-800 dark:text-green-300">
          지금 바로 내 세금을 계산해보세요
        </p>
        <Link
          href={page.calculatorLink}
          className="mt-2 inline-block rounded-md bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          {page.calculatorLabel}
        </Link>
      </div>

      {/* FAQ */}
      {page.faq && page.faq.length > 0 && (
        <>
          <FaqSection title="자주 묻는 질문" items={page.faq} />
          <FaqSchema items={page.faq} />
        </>
      )}

      {/* 관련 가이드 */}
      {otherGuides.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            관련 세금 가이드
          </h2>
          <ul className="mt-4 space-y-3">
            {otherGuides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/kr/guide/${g.slug}`}
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  {g.h1}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 관련 계산기 */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          세금 계산기
        </h2>
        <ul className="mt-4 space-y-2">
          <li>
            <Link
              href="/kr/freelancer-tax-calculator"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              프리랜서 종합소득세 계산기
            </Link>
          </li>
          <li>
            <Link
              href="/kr/earned-income-tax-calculator"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              근로소득세 계산기
            </Link>
          </li>
          <li>
            <Link
              href="/kr/vat-calculator"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              부가가치세 계산기
            </Link>
          </li>
        </ul>
      </section>

      <AuthorityBlock
        taxYear={2026}
        lastUpdated="2026-04-10"
        sources={[
          { label: "국세청 종합소득세 안내", url: "https://www.nts.go.kr" },
          { label: "소득세법", url: "https://www.law.go.kr" },
          { label: "홈택스 전자신고", url: "https://www.hometax.go.kr" },
        ]}
        calculationMethod="총수입 → 필요경비 차감 → 소득공제 → 과세표준 × 누진세율 → 산출세액 → 세액공제 → 결정세액"
      />
    </main>
  );
}

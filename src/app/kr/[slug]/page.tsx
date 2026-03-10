import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import KrCalculator from "@/components/kr/KrCalculator";
import AuthorityBlock from "@/components/authority/AuthorityBlock";
import RelatedLink from "@/components/common/RelatedLink";
import FaqSection from "@/components/common/FaqSection";
import FaqSchema from "@/components/common/FaqSchema";
import krPages from "@/config/longtail/kr-pages.json";

interface DeductionGuide {
  title: string;
  items: string[];
}

interface FaqItem {
  question: string;
  answer: string;
}

interface PageData {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  deductionGuide?: DeductionGuide;
  faq?: FaqItem[];
}

export function generateStaticParams() {
  return krPages.map((page: PageData) => ({ slug: page.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = krPages.find((p: PageData) => p.slug === slug);
    if (!page) return {};
    return {
      title: `${page.title} — CalcHub`,
      description: page.description,
      keywords: page.keywords,
      alternates: {
        languages: {
          ko: `/kr/${slug}`,
          en: "/us",
          "x-default": "/",
        },
      },
    };
  });
}

export default async function KrLongtailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = krPages.find((p: PageData) => p.slug === slug);
  if (!page) notFound();

  const otherPages = krPages
    .filter((p: PageData) => p.slug !== slug)
    .slice(0, 5);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          {page.h1}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{page.description}</p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">2026년 세법 기준</p>
      </div>

      <KrCalculator />

      {/* 경비 항목 가이드 */}
      {page.deductionGuide && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {page.deductionGuide.title}
          </h2>
          <ul className="mt-4 space-y-2">
            {page.deductionGuide.items.map((item: string, i: number) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <span className="mt-1 text-green-500">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            경비 처리 시 증빙 서류(영수증, 세금계산서)를 반드시 보관하세요. 정확한 경비 인정 범위는 세무사와 상담하시기 바랍니다.
          </p>
        </section>
      )}

      {/* FAQ */}
      {page.faq && page.faq.length > 0 && (
        <>
          <FaqSection title="자주 묻는 질문" items={page.faq} />
          <FaqSchema items={page.faq} />
        </>
      )}

      {/* 관련 계산기 내부 링크 */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          관련 세금 계산기
        </h2>
        <ul className="mt-4 space-y-2">
          <li>
            <RelatedLink
              href="/kr/freelancer-tax-calculator"
              label="프리랜서 종합소득세 계산기"
              from={slug}
            />
          </li>
          {otherPages.map((p: PageData) => (
            <li key={p.slug}>
              <RelatedLink
                href={`/kr/${p.slug}`}
                label={p.h1}
                from={slug}
              />
            </li>
          ))}
        </ul>
      </section>

      <AuthorityBlock
        taxYear={2026}
        lastUpdated="2026-01-10"
        sources={[
          { label: "국세청 종합소득세 세율표", url: "https://www.nts.go.kr" },
          { label: "소득세법 제55조 (세율)", url: "https://www.law.go.kr" },
        ]}
        calculationMethod="총수입 → 필요경비 차감 → 소득공제 → 과세표준 × 누진세율 → 산출세액 → 기납부세액 차감"
      />
    </main>
  );
}
